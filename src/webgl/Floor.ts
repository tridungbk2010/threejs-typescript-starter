import * as THREE from 'three';
import Resources from './Resources';

export default class Floor {
  mesh: THREE.Mesh;
  textures: any;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.CircleGeometry;
  resources: Resources;

  constructor(_resources: Resources) {
    this.resources = _resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    // this.textures = {};

    // this.textures.color = resources.items.grassColorTexture;
    // this.textures.color.colorSpace = THREE.SRGBColorSpace;
    // this.textures.color.repeat.set(1.5, 1.5);
    // this.textures.color.wrapS = THREE.RepeatWrapping;
    // this.textures.color.wrapT = THREE.RepeatWrapping;

    // this.textures.normal = resources.items.grassNormalTexture;
    // this.textures.normal.repeat.set(1.5, 1.5);
    // this.textures.normal.wrapS = THREE.RepeatWrapping;
    // this.textures.normal.wrapT = THREE.RepeatWrapping;

    // this.material = new THREE.MeshStandardMaterial({
    //   map: this.textures.color,
    //   normalMap: this.textures.normal,
    // });

    // this.geometry = new THREE.CircleGeometry(5, 64);

    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.rotation.x = -Math.PI * 0.5;
    // this.mesh.receiveShadow = true;
  }
  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    // this.scene.add(this.mesh);
  }
}
