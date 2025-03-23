import * as THREE from 'three';

export default class DoorComponent {
    public element: THREE.Mesh;

    constructor() {
        const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
        const doorMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.7, roughness: 0.3 });
        this.element = new THREE.Mesh(doorGeometry, doorMaterial);
    }
}