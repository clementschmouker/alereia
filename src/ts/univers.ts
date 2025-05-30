import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

import PillarComponent from './pillarComponent';
import Door from './Door';
import * as CameraUtils from 'three/examples/jsm/utils/CameraUtils';

const Universe = () => {
    const scene = new THREE.Scene();
    scene.name = 'MAIN SCENE';
    scene.background = new THREE.Color(0x0a0a0a);

    const htmlDoors = document.querySelectorAll('.univers__door');
    let selectedDoor: Door | null = null;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, -10, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#univers')?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.castShadow = true; 
    pointLight.shadow.mapSize.width = 1920; // Default
    pointLight.shadow.mapSize.height = 1080; // Default
    pointLight.shadow.camera.near = 0.5; // Default
    pointLight.shadow.camera.far = 1000; // Default
    pointLight.position.set(10, 10, 10);

    scene.add(ambientLight, pointLight);
    
    // Debug pointLight
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);
    scene.add(pointLightHelper);

    let cameraToRender = camera;
    let sceneToRender = scene;

    // Load Background Texture
    new THREE.TextureLoader().load('../images/bgunivers.jpg', (texture) => {
        scene.background = texture;
    });

    // Add Pillar
    const pillar = new PillarComponent().element;
    scene.add(pillar);

    // Add Doors
    let doors: Door[] = [];
    const createDoors = () => {
        htmlDoors.forEach((htmlDoor) => {
            const door = new Door(
                {x: 2, y: 4},
                camera, htmlDoor.getAttribute('data-title') || "Default Title",
                htmlDoor.getAttribute('data-content') || "Default Description",
                htmlDoor.getAttribute('data-image') || ''
            );
            const htmlPositionX = htmlDoor.getAttribute('data-position-x') || "0";
            const htmlPositionY = htmlDoor.getAttribute('data-position-y') || "0";
            const htmlPositionZ = htmlDoor.getAttribute('data-position-z') || "0";

            const positionX = parseFloat(htmlPositionX);
            const positionY = parseFloat(htmlPositionY);
            const positionZ = parseFloat(htmlPositionZ);

            door.element.position.set(positionX, positionY, positionZ);
            door.positionInWorld = new THREE.Vector3(positionX, positionY, positionZ);
            doors.push(door);
            scene.add(door.element);
        });
    };

    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
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
    
            if (!isZoomed) {
                rotateCameraWithMouse();
            }
        });
    
        window.addEventListener('click', () => {
            if (isZoomed) return;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(doors.map(d => d.element), true);

            if (intersects.length > 0) {
                const doorMesh = intersects.find(intersect => intersect.object instanceof THREE.Mesh)?.object;
                const door = doors.find(d => d.element === doorMesh?.parent);
                if (doorMesh && door) {
                    selectedDoor = door;
                    zoomToDoor(doorMesh, door);
                }
            }
        });
    
        document.querySelector('.closeInfoButton')?.addEventListener('click', () => closeInfoDiv());
    };

    let currentLookAt = baseLookAt.clone();
    
    const rotateCameraWithMouse = () => {
        if (isZoomed) return;
    
        const rotationAmount = 2;
        const offsetX = mouse.y * rotationAmount;
        const offsetY = mouse.x * rotationAmount;
    
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

    const zoomToDoor = (doorPlane: THREE.Object3D, door: Door) => {
        isZoomed = true;
    
        doors.forEach(d => d.pauseFloating());
    
        const targetPosition = new THREE.Vector3();
        doorPlane.getWorldPosition(targetPosition);
    
        const doorNormal = new THREE.Vector3(0, 0, -1);
        doorNormal.applyQuaternion(doorPlane.getWorldQuaternion(new THREE.Quaternion())).normalize();
    
        const frontPosition = targetPosition.clone().addScaledVector(doorNormal, 3);
        const insidePosition = targetPosition.clone().addScaledVector(doorNormal, 0.5);
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
            onUpdate: () => {
                camera.lookAt(currentLookAt);
            },
            onComplete: () => {
                gsap.to(camera.position, {
                    x: insidePosition.x,
                    y: insidePosition.y,
                    z: insidePosition.z,
                    duration: 1,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        camera.lookAt(currentLookAt);

                        // Synchronize the door camera with the main camera during the transition
                        if (selectedDoor) {
                            selectedDoor.syncWithMainCamera(camera);
                        }
                    },
                    onComplete: () => {
                        if (selectedDoor) {
                            openInfoDiv(selectedDoor.sceneCamera, door.sceneInDoor);
                        }
                    }
                });
            }
        });
    };
    
    
    
    
    const returnToInitialPosition = () => {
        const exitPosition = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(-3));

        const pillarLookAt = pillar.position.clone();
        if (selectedDoor) {
            selectedDoor.triggerCameraZoom();
        }
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
                        doors.forEach(d => d.resumeFloating());
                    }
                });
            }
        });
    };

    // Info Box Functions
    const openInfoDiv = (doorCamera: THREE.PerspectiveCamera, doorScene: THREE.Scene) => {
        isZoomed = true;

        cameraToRender = doorCamera;
        sceneToRender = doorScene;

        const infoBox = document.getElementById('infoBox');
        const infoBoxTitle = document.getElementById('infoBox-title');
        const infoBoxContent = document.getElementById('infoBox-content');
        const infoBoxImage = document.getElementById('infoBox-image');

        if (selectedDoor) {
            if (infoBoxContent) {
                infoBoxContent.innerHTML = selectedDoor.description;
            }
            if (infoBoxTitle) {
                infoBoxTitle.innerHTML = selectedDoor.title;
            }
            if (infoBoxImage) {
                console.log(selectedDoor);
                infoBoxImage.setAttribute('src', '../images/' + selectedDoor.image);
            }
        }
        if (infoBox) {
            infoBox.style.display = 'flex';
            infoBox.style.opacity = '1';
        }
    };

    const closeInfoDiv = () => {
        cameraToRender = camera;
        sceneToRender = scene;

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
    
        const pillarToCameraDirection = new THREE.Vector3();
        pillar.getWorldPosition(pillarToCameraDirection);
        camera.getWorldPosition(pillarToCameraDirection).sub(pillarToCameraDirection).normalize();
    
        doors.forEach(door => {
            door.faceDirection(pillarToCameraDirection);
            door.updateCorners();
            const { bottomLeft, bottomRight, topLeft } = door.corners;
            CameraUtils.frameCorners(door.sceneCamera, bottomLeft, bottomRight, topLeft, false);
            door.update(camera, renderer);
        });
        
        if (!cameraToRender) {
            console.error('cameraToRender is undefined. Falling back to main camera.');
            cameraToRender = camera;
        }

        renderer.render(sceneToRender, cameraToRender);
    };
    
    window.addEventListener('resize', () => {
        doors.forEach(door => {
            door.updateCameraAspect(); // Mettre à jour l'aspect ratio de chaque porte
            door.adjustTextureAspect(); // Ajuster l'aspect de la texture
        });
        camera.aspect = window.innerWidth / window.innerHeight; // Mettre à jour l'aspect ratio de la caméra principale
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight); // Redimensionner le renderer
    });

    // Initialization
    const init = () => {
        createDoors();
        setupEventListeners();
        animate();
    };

    return { init };
};

export default Universe;
