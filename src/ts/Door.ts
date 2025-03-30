import * as THREE from 'three';
import gsap from 'gsap';

export default class Door {
    element: THREE.LineSegments;
    sceneInDoor: THREE.Scene;
    renderTarget: THREE.WebGLRenderTarget;
    texture: THREE.Texture;
    plane: THREE.Mesh;
    syncZ: boolean = true;
    size: {x: number, y: number};
    sceneCamera: THREE.PerspectiveCamera;
    mainCamera: THREE.PerspectiveCamera;
    public invertZ: boolean = false;
    public cameraInitialPosition: THREE.Vector3 = new THREE.Vector3(0, -10, 30);
    public positionInWorld: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    public title: string = 'Door';
    public description: string = 'Door description';
    static existingPositions: THREE.Vector3[] = [];
    private floatAnimationTween: gsap.core.Tween | null = null;

    constructor(size: {x: number, y: number}, mainCamera: THREE.PerspectiveCamera, title: string, description: string) {
        this.title = title;
        this.description = description;
        this.mainCamera = mainCamera;
        this.size = size;
        this.element = this.createWireframeDoor();
        this.sceneInDoor = this.createDoorScene();
        this.renderTarget = new THREE.WebGLRenderTarget(1920, 1080);
        this.texture = this.renderTarget.texture; // Utiliser directement la texture du WebGLRenderTarget
        this.plane = this.createPlaneForTexture();
        this.sceneCamera = this.createSceneCamera();
        this.updateCameraAspect(); // Mettre à jour l'aspect ratio au démarrage
        this.floatAnimation();
    }

    private createWireframeDoor(): THREE.LineSegments {
        const doorGeometry = new THREE.BoxGeometry(this.size.x, this.size.y, 0.1);
        const edgesGeometry = new THREE.EdgesGeometry(doorGeometry);
        const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 });
        return new THREE.LineSegments(edgesGeometry, material);
    }

    private createDoorScene(): THREE.Scene {
        const scene = new THREE.Scene();
        scene.name = 'DOOR SCENE';
        
        scene.fog = new THREE.Fog(0x000000, 5, 15);
    
        this.addRandomCubes(scene);
        this.addLights(scene);
    
        return scene;
    }
    

    private createSceneCamera(): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100); // Augmenter la distance de rendu à 100
        camera.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z);
        camera.far = 5000;

        // Invert the Y position proportionally to the main camera
        camera.position.y = -this.mainCamera.position.y;
        camera.position.z = this.element.position.z - this.mainCamera.position.z

        return camera;
    }

    private addRandomCubes(scene: THREE.Scene): void {
        const numberOfCubes = Math.floor(Math.random() * 15) + 3;
        const doorPosition = new THREE.Vector3();
        this.element.getWorldPosition(doorPosition);
        const doorRotation = new THREE.Quaternion();
        this.element.getWorldQuaternion(doorRotation);
    
        for (let i = 0; i < numberOfCubes; i++) {
            const cube = this.createRandomCube();
            
            const offset = new THREE.Vector3(
                (Math.random() - 0.5) * 4, // Random X offset
                (Math.random() - 0.5) * 4, // Random Y offset
                Math.random() * -5 - 1     // Random Z offset
            );
    
            offset.applyQuaternion(doorRotation);
    
            cube.position.add(doorPosition).add(offset);
    
            cube.castShadow = true;
            cube.receiveShadow = true;
            scene.add(cube);
        }
    }
    

    private createRandomCube(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(
            Math.random() * 2 + 1,
            Math.random() * 2 + 1,
            Math.random() * 2 + 1 
        );
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;

        cube.position.copy(this.positionInWorld).add(new THREE.Vector3(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            Math.random() * -5 - 1
        ));

        return cube;
    }

    private addLights(scene: THREE.Scene): void {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xFFFFFF, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

    }

    private createPlaneForTexture(): THREE.Mesh {
        const geometry = new THREE.PlaneGeometry(this.size.x, this.size.y);

        // Ajuster les coordonnées UV pour conserver le ratio de la texture
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
            1, 1, // Top-left (inversé en X)
            0, 1, // Top-right (inversé en X)
            1, 0, // Bottom-left (inversé en X)
            0, 0  // Bottom-right (inversé en X)
        ]), 2));

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

    public adjustTextureAspect(): void {
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
            y: this.element.position.y + 4,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            onUpdate: () => {
                this.element.getWorldPosition(this.positionInWorld);
                this.element.getWorldQuaternion(this.element.quaternion);
            }
        });
    }

    public pauseFloating(): void {
        this.floatAnimationTween?.pause();
    }

    public resumeFloating(): void {
        this.floatAnimationTween?.resume();
    }

    public syncWithMainCamera(mainCamera: THREE.PerspectiveCamera): void {
        this.sceneCamera.position.x = this.positionInWorld.x;
        this.sceneCamera.position.y = this.positionInWorld.y;
        if (this.syncZ) {
            this.sceneCamera.position.z = this.positionInWorld.z;
        }
        this.sceneCamera.rotation.copy(mainCamera.rotation);

        this.sceneCamera.quaternion.copy(mainCamera.quaternion);
        this.sceneCamera.updateProjectionMatrix();
    }

    public triggerCameraDezoom(finalPosition: THREE.Vector3): void {
        console.log('trigger dezoom');
        gsap.to(this.sceneCamera.position, {
            z: this.cameraInitialPosition.z + finalPosition.z,
            duration: 1.5,
            ease: "power2.Out",
        });
    }

    public triggerCameraZoom(): void {
        console.log('trigger zoom');
        gsap.to(this.sceneCamera.position, {
            z: this.cameraInitialPosition.z - 3,
            duration: 1.5,
            ease: "power2.inOut",
        });
    }
    
    
    public update(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
        this.updateCameraAspect();
        this.adjustTextureAspect();
    
        this.syncWithMainCamera(camera);
    
        renderer.setRenderTarget(this.renderTarget);
        renderer.render(this.sceneInDoor, this.sceneCamera);
        renderer.setRenderTarget(null);
    }
    
    

    public updateCameraAspect(): void {
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.sceneCamera.aspect = aspectRatio;
        this.sceneCamera.updateProjectionMatrix();
    }

    public faceDirection(direction: THREE.Vector3): void {
        const angle = Math.atan2(direction.x, direction.z);
        this.element.rotation.y = angle;
    }

    public dispose(): void {
        this.texture.dispose();
        this.renderTarget.dispose();
        this.element.geometry.dispose();
        this.plane.geometry.dispose();

        this.element.parent?.remove(this.element);
        Door.existingPositions = Door.existingPositions.filter(pos => pos !== this.element.position);
    }
}
