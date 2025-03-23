import * as THREE from 'three';

export default class DoorComponent {
    public element: THREE.Mesh;

    constructor() {
        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(4, 20, 2);
        const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
        this.element = new THREE.Mesh(geometry, material);
    }
}