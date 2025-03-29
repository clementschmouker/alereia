import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

import PillarComponent from './pillarComponent';
import Door from './Door';

const Universe = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const htmlDoors = document.querySelectorAll('.univers__door');

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -10, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#univers')?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 20, 10);
    scene.add(ambientLight, pointLight);

    // Load Background Texture
    new THREE.TextureLoader().load('../images/stars.jpg', (texture) => {
        scene.background = texture;
    });

    // Add Pillar
    const pillar = new PillarComponent().element;
    scene.add(pillar);

    // Add Doors
    let doors: Door[] = [];
    const createDoors = () => {
        doors = [];
        for (let i = 0; i < htmlDoors.length; i++) {
            const door = new Door();
            scene.add(door.element);
            doors.push(door);
        }
    };

    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;
    let isZoomed = false;
    let initialCameraPosition = camera.position.clone();
    const baseLookAt = new THREE.Vector3(0, 5, 0);
    camera.lookAt(baseLookAt);
    
    // Setup event listeners
    const setupEventListeners = () => {
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(doors.map(d => d.element));
            isHovering = intersects.length > 0;
    
            if (!isZoomed) {
                rotateCameraWithMouse();
            }
        });
    
        window.addEventListener('click', () => {
            if (isZoomed) return;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(doors.map(d => d.element));
    
            if (intersects.length > 0) {
                zoomToDoor(intersects[0].object);
            }
        });
    
        document.querySelector('.closeInfoButton')?.addEventListener('click', closeInfoDiv);
    };
    

    let currentLookAt = baseLookAt.clone();
    
    const rotateCameraWithMouse = () => {
        if (isZoomed) return;
    
        const rotationAmount = 0.1;
        const offsetX = -mouse.y * rotationAmount;
        const offsetY = -mouse.x * rotationAmount;
    
        const newLookAt = baseLookAt.clone().add(new THREE.Vector3(offsetY, offsetX, 0));
    
        gsap.to(currentLookAt, {
            x: newLookAt.x,
            y: newLookAt.y,
            z: newLookAt.z,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => camera.lookAt(currentLookAt)
        });
    };
    
    const zoomToDoor = (door: THREE.Object3D) => {
        isZoomed = true;
    
        const targetPosition = new THREE.Vector3();
        door.getWorldPosition(targetPosition);
    
        const doorNormal = new THREE.Vector3();
        door.getWorldDirection(doorNormal);
    
        const frontPosition = targetPosition.clone().addScaledVector(doorNormal, 2);
        const insidePosition = targetPosition.clone().addScaledVector(doorNormal, 0.1);
        const lookAtTarget = targetPosition.clone();
    
        gsap.to(currentLookAt, {
            x: lookAtTarget.x,
            y: lookAtTarget.y,
            z: lookAtTarget.z,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => camera.lookAt(currentLookAt),
        });
    
        gsap.to(camera.position, {
            x: frontPosition.x,
            y: frontPosition.y,
            z: frontPosition.z,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => camera.lookAt(currentLookAt),
            onComplete: () => {
                gsap.to(camera.position, {
                    x: insidePosition.x,
                    y: insidePosition.y,
                    z: insidePosition.z,
                    duration: 1,
                    ease: "power2.inOut",
                    onUpdate: () => camera.lookAt(currentLookAt),
                    onComplete: () => {
                        camera.lookAt(lookAtTarget);
                        currentLookAt.copy(lookAtTarget);
                        openInfoDiv();
                    }
                });
            }
        });
    };
    
    
    
    const returnToInitialPosition = () => {
        const exitPosition = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-2));
    
        const pillarLookAt = pillar.position.clone();
    
        gsap.to(camera.position, {
            x: exitPosition.x,
            y: exitPosition.y,
            z: exitPosition.z,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(camera.position, {
                    x: initialCameraPosition.x,
                    y: initialCameraPosition.y,
                    z: initialCameraPosition.z,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onUpdate: () => camera.lookAt(pillarLookAt),
                });
    
                gsap.to(currentLookAt, {
                    x: baseLookAt.x,
                    y: baseLookAt.y,
                    z: baseLookAt.z,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onUpdate: () => camera.lookAt(currentLookAt),
                    onComplete: () => {
                        isZoomed = false;
                    }
                });
            }
        });
    };
    
    
    
    

    // Info Box Functions
    const openInfoDiv = () => {
        isZoomed = true;
        const infoBox = document.getElementById('infoBox');
        if (infoBox) {
            infoBox.style.display = 'block';
            infoBox.style.opacity = '1';
        }
    };

    const closeInfoDiv = () => {
        const infoBox = document.getElementById('infoBox');
        if (infoBox) {
            infoBox.style.display = 'none';
        }
        returnToInitialPosition();
    };

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        if (!isZoomed) rotateCameraWithMouse();
    
        renderer.render(scene, camera);
    };

    // Initialization
    const init = () => {
        createDoors();
        setupEventListeners();
        animate();
    };

    return { init };
};

export default Universe;
