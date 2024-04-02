import * as THREE from 'three';

export default class Light {
  sunLight: THREE.DirectionalLight;

  constructor() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 4);
    this.config();
  }

  private config() {
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3, 3, -2.25);
  }
}
