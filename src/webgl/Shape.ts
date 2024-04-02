import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export default class Shape {
  mesh: Mesh;
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ wireframe: true });
    this.mesh = new Mesh(geometry, material);
  }
}
