import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import DoorComponent from './doorComponent';
import PillarComponent from './pillarComponent';

const Universe = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const htmlDoors = document.querySelectorAll('.univers__door');

    const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    let clock = new THREE.Clock();


    renderer.setSize(windowWidth, windowHeight);
    document.querySelector('#univers')?.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 100;

    // Pillar
    const pillar = new PillarComponent().element;
    scene.add(pillar);

    // Lighting
    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight: THREE.PointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 20, 10);
    scene.add(ambientLight);
    scene.add(pointLight);

    camera.position.set(0, -10, 30);
    camera.lookAt(0, 0, 0);

    const loader = new THREE.TextureLoader();
    loader.load('../images/stars.jpg', (texture) => {
        scene.background = texture;
    });

    // Doors
    const doors: THREE.Mesh[] = [];
    const radius = 10;

    for (let i = 0; i < htmlDoors.length; i++) {
        const angle = (i / htmlDoors.length) * Math.PI * 2;
        const door = new DoorComponent().element;

        door.position.x = Math.cos(angle) * radius;
        door.position.z = Math.sin(angle) * radius;
        door.position.y = 5;

        scene.add(door);
        doors.push(door);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovering = false;
    let lastTime = 0;
    let timeWhenHovered = 0;
    let animatePaused = false;

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const detectHover = () => {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(doors);

        if (intersects.length > 0) {
            if (!isHovering) {
                isHovering = true;
                animatePaused = true;
                timeWhenHovered = clock.getElapsedTime();
            }
        } else {
            if (isHovering) {
                isHovering = false;
                animatePaused = false;
                lastTime += clock.getElapsedTime() - timeWhenHovered;
            }
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();

        const elapsed = clock.getElapsedTime();
        detectHover();

        if (!animatePaused) {
            const adjustedElapsed = elapsed - lastTime;

            doors.forEach((door, i) => {
                const orbitSpeed = 0.5;
                const orbitAngle = adjustedElapsed * orbitSpeed + (i / htmlDoors.length) * Math.PI * 2;

                door.position.x = Math.cos(orbitAngle) * radius;
                door.position.z = Math.sin(orbitAngle) * radius;

                door.position.y = 5 + Math.sin(adjustedElapsed * 2 + i) * 0.5;

                door.lookAt(0, 5, 0);
            });
        }

        renderer.render(scene, camera);
    };

    const onWindowResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);

        controls.update();
    };

    window.addEventListener('resize', onWindowResize);

    const init = () => {
        animate();
    };

    return {
        init,
    };
};

export default Universe;
