import { BoxGeometry, Mesh, MeshNormalMaterial } from 'three';

export default class Shape {
  mesh: Mesh;
  constructor() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
  }
}
