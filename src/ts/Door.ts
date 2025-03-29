import * as THREE from 'three';
import gsap from 'gsap';

export default class Door {
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
        this.texture = this.renderTarget.texture; // Utiliser directement la texture du WebGLRenderTarget
        this.plane = this.createPlaneForTexture();
        this.sceneCamera = this.createSceneCamera();
        this.updateCameraAspect(); // Mettre à jour l'aspect ratio au démarrage
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
        scene.name = 'DOOR SCENE';
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
            Math.random() * 2 + 1,
            Math.random() * 2 + 1,
            Math.random() * 2 + 1 
        );
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            Math.random() * -5 - 1
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

        // Ajuster les coordonnées UV pour conserver le ratio de la texture
        const aspectRatio = window.innerWidth / window.innerHeight;
        geometry.attributes.uv.array = new Float32Array([
            0, 1, // Top-left
            1, 1, // Top-right
            0, 0, // Bottom-left
            1, 0  // Bottom-right
        ]);

        const material = new THREE.MeshBasicMaterial({
            map: this.renderTarget.texture, // Utiliser directement la texture du WebGLRenderTarget
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(0, 0, 0.05);
        plane.rotation.y = Math.PI;
        this.element.add(plane);
        return plane;
    }

    private adjustTextureAspect(): void {
        const planeAspect = 2 / 4; // Largeur / Hauteur du plan
        const textureAspect = window.innerWidth / window.innerHeight;

        const repeatX = textureAspect > planeAspect ? planeAspect / textureAspect : 1;
        const repeatY = textureAspect > planeAspect ? 1 : textureAspect / planeAspect;

        (this.plane.material as THREE.MeshBasicMaterial).map!.repeat.set(repeatX, repeatY);
        (this.plane.material as THREE.MeshBasicMaterial).map!.offset.set(
            (1 - repeatX) / 2,
            (1 - repeatY) / 2
        );
        (this.plane.material as THREE.MeshBasicMaterial).map!.needsUpdate = true;
    }

    private floatAnimation(): void {
        this.floatAnimationTween = gsap.to(this.element.position, {
            y: this.element.position.y + 0.2, // Amplitude
            duration: 3,
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
        this.updateCameraAspect(); // Mettre à jour l'aspect ratio à chaque frame
        this.adjustTextureAspect(); // Ajuster l'aspect de la texture
        this.sceneCamera.updateProjectionMatrix();

        // Rendre la scène de la porte dans le WebGLRenderTarget
        renderer.setRenderTarget(this.renderTarget);
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
