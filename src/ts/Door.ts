import * as THREE from 'three';
import gsap from 'gsap';

class Door {
    element: THREE.LineSegments;
    sceneInDoor: THREE.Scene;
    renderTarget: THREE.WebGLRenderTarget;
    texture: THREE.Texture;
    plane: THREE.Mesh;
    sceneCamera: THREE.PerspectiveCamera;
    static existingPositions: THREE.Vector3[] = [];
    private floatAnimationTween: gsap.core.Tween | null = null;

    constructor() {
        this.element = this.createWireframeDoor();
        this.sceneInDoor = this.createDoorScene();
        this.renderTarget = new THREE.WebGLRenderTarget(1024, 1024);
        this.texture = this.loadTexture('path/to/your/texture.jpg'); // Texture principale
        this.plane = this.createPlaneForTexture();
        this.sceneCamera = this.sceneInDoor.children[0] as THREE.PerspectiveCamera;
        this.setValidPosition();
        this.floatAnimation();
    }

    private createWireframeDoor(): THREE.LineSegments {
        const doorGeometry = new THREE.BoxGeometry(2, 4, 0.1);
        const edgesGeometry = new THREE.EdgesGeometry(doorGeometry);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
        return new THREE.LineSegments(edgesGeometry, material);
    }

    private createDoorScene(): THREE.Scene {
        const scene = new THREE.Scene();
        const doorSceneCamera = this.createSceneCamera();
        scene.add(doorSceneCamera);

        this.addRandomCubes(scene);
        this.addLights(scene);

        return scene;
    }

    private createSceneCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 20);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        return camera;
    }

    private addRandomCubes(scene: THREE.Scene): void {
        const numberOfCubes = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < numberOfCubes; i++) {
            const cube = this.createRandomCube();
            scene.add(cube);
        }
    }

    private createRandomCube(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 2 + 1, // Largeur aléatoire (1 à 3)
            Math.random() * 2 + 1, // Hauteur aléatoire (1 à 3)
            Math.random() * 2 + 1  // Profondeur aléatoire (1 à 3)
        );
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);

        // Positionner les cubes devant la caméra et dans le champ de vision
        cube.position.set(
            (Math.random() - 0.5) * 4,  // Position X : entre -2 et 2
            (Math.random() - 0.5) * 4,  // Position Y : entre -2 et 2
            Math.random() * -5 - 1      // Position Z : entre -1 et -6 (devant la caméra)
        );

        return cube;
    }

    private addLights(scene: THREE.Scene): void {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xFFFFFF, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);
    }

    private loadTexture(path: string): THREE.Texture {
        const loader = new THREE.TextureLoader();
        return loader.load(path);
    }

    private createPlaneForTexture(): THREE.Mesh {
        const geometry = new THREE.PlaneGeometry(2, 4);
        const material = new THREE.MeshBasicMaterial({
            map: this.texture,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, 0.05);
        plane.rotation.y = Math.PI;
        this.element.add(plane);
        return plane;
    }

    private setValidPosition(): void {
        let position: THREE.Vector3;
        let attempts = 0;

        do {
            position = new THREE.Vector3(
                (Math.random() - 0.5) * 20,  
                Math.random() * 8 + 2,       
                Math.random() * 10 + 5       
            );
            attempts++;
        } while (this.isOverlapping(position) && attempts < 50);

        this.element.position.copy(position);
        Door.existingPositions.push(position);
    }

    private isOverlapping(newPosition: THREE.Vector3): boolean {
        const minDistance = 2.5;
        return Door.existingPositions.some(existingPos => existingPos.distanceTo(newPosition) < minDistance);
    }

    private floatAnimation(): void {
        this.floatAnimationTween = gsap.to(this.element.position, {
            y: this.element.position.y + 0.5,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    public pauseFloating(): void {
        this.floatAnimationTween?.pause();
    }

    public resumeFloating(): void {
        this.floatAnimationTween?.resume();
    }

    public update(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
        this.sceneCamera.aspect = this.renderTarget.width / this.renderTarget.height;
        this.sceneCamera.updateProjectionMatrix();

        // Mise à jour de la caméra à l'intérieur de la porte pour simuler la perspective
        this.updateCameraInDoor(camera);

        renderer.setRenderTarget(this.renderTarget);
        renderer.render(this.sceneInDoor, this.sceneCamera);
        renderer.setRenderTarget(null);

        renderer.render(this.sceneInDoor, camera);
    }

    private updateCameraInDoor(camera: THREE.PerspectiveCamera): void {
        // Calculer les offsets en fonction de la position de la caméra principale
        const offsetX = camera.position.x / 10; // Ajuster en fonction de la position X de la caméra principale
        const offsetY = camera.position.y / 10; // Ajuster en fonction de la position Y de la caméra principale
        const offsetZ = camera.position.z / 20; // Ajuster en fonction de la position Z de la caméra principale
    
        // Positionner la caméra à l'intérieur de la porte avec un léger recul pour éviter de la placer trop près des objets
        this.sceneCamera.position.set(offsetX, offsetY, -5 + offsetZ);  // Assurer que la caméra est à une distance raisonnable
        this.sceneCamera.lookAt(0, 0, 0); // La caméra dans la porte regarde toujours le centre de la scène
    }
    
    public faceDirection(direction: THREE.Vector3): void {
        const angle = Math.atan2(direction.x, direction.z);
        this.element.rotation.y = angle;
    }

    public dispose(): void {
        this.texture.dispose();
        this.renderTarget.dispose();
        this.element.geometry.dispose();
        this.element.material.dispose();
        this.plane.geometry.dispose();
        this.plane.material.dispose();

        this.element.parent?.remove(this.element);
        Door.existingPositions = Door.existingPositions.filter(pos => pos !== this.element.position);
    }
}

export default Door;
