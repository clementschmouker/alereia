import * as THREE from 'three';
import gsap from 'gsap';
import DoorComponent from './doorComponent';

class Door {
    element: THREE.LineSegments; // The door itself (wireframe)
    sceneInDoor: THREE.Scene;    // The scene inside the door
    renderTarget: THREE.WebGLRenderTarget; // Render target for the scene
    texture: THREE.Texture;      // Texture to display in the door
    plane: THREE.Mesh;           // Plane that shows the scene inside the door
    static existingPositions: THREE.Vector3[] = []; // Track placed doors

    constructor() {
        this.element = this.createWireframeDoor();
        this.sceneInDoor = this.createDoorScene(); // Initialize the door scene
        this.renderTarget = new THREE.WebGLRenderTarget(512, 512); // Render target texture size
        this.texture = this.renderTarget.texture; // The texture that will be displayed inside the door
        this.plane = this.createPlaneForTexture(); // Create the plane with the scene texture
        this.setValidPosition();
        this.floatAnimation();
    }

    private createWireframeDoor(): THREE.LineSegments {
        const doorGeometry = new THREE.BoxGeometry(2, 4, 0.1);
        const edgesGeometry = new THREE.EdgesGeometry(doorGeometry);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
        const lineSegments = new THREE.LineSegments(edgesGeometry, material);
        return lineSegments;
    }

    private createDoorScene(): THREE.Scene {
        // Create a scene that will be visible inside the door
        const scene = new THREE.Scene();

        // Example: add random objects to the door scene (can be any 3D objects you want)
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5);
        scene.add(sphere);

        // You can add more objects to create a unique scene for each door
        return scene;
    }

    private createPlaneForTexture(): THREE.Mesh {
        const geometry = new THREE.PlaneGeometry(2, 4);
        const material = new THREE.MeshBasicMaterial({ map: this.texture });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, 0.05); // Place it just slightly in front of the door
        this.element.add(plane); // Add the plane inside the door
        return plane;
    }

    private setValidPosition() {
        let position: THREE.Vector3;
        let attempts = 0;

        do {
            position = new THREE.Vector3(
                (Math.random() - 0.5) * 20,  // X: Spread left & right
                Math.random() * 8 + 2,       // Y: Floating height
                Math.random() * 10 + 5       // Z: Always in front but not too much
            );

            attempts++;
        } while (this.isOverlapping(position) && attempts < 50);

        this.element.position.copy(position);
        Door.existingPositions.push(position);
    }

    private isOverlapping(newPosition: THREE.Vector3): boolean {
        const minDistance = 2.5; // Avoid overlap
        return Door.existingPositions.some(existingPos => existingPos.distanceTo(newPosition) < minDistance);
    }

    private floatAnimation() {
        gsap.to(this.element.position, {
            y: this.element.position.y + 0.5,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    public update(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        // Render the scene inside the door into the render target
        renderer.setRenderTarget(this.renderTarget);
        renderer.render(this.sceneInDoor, camera);
        renderer.setRenderTarget(null); // Reset render target to default

        // Now the texture of the render target will display the door scene
    }
}

export default Door;
