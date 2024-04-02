import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Time from '../utils/Time';
import Sizes from '../utils/Sizes';

export default class Canvas {
  scene: Scene;
  time: Time;
  sizes: Sizes;

  public isRunning = false;

  camera = this.initCamera();
  renderer = this.initRenderer();
  controls = this.initControls();

  constructor() {
    this.scene = new Scene();
    this.time = new Time();
    this.sizes = new Sizes();

    //grid helper
    const gridHelper = new GridHelper(100, 40, 0x0000ff, 0x808080);
    gridHelper.position.y = 0;
    gridHelper.position.x = 0;
    this.scene.add(gridHelper);

    // Console.log start rendering
    console.log('Start rendering');
    this.isRunning = true;

    this.sizes.on('resize', () => {
      this.updateSize();
    });

    this.time.on('tick', () => {
      this.run();
    });
  }

  private initCamera() {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 5, 10);

    return camera;
  }

  private initRenderer() {
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
  }

  private initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();
    return controls;
  }

  updateSize() {
    const { width, height } = this.sizes;

    // Update camera aspect ratio
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(width, height);
  }

  run() {
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (!this.isRunning) return;

    // console log stop rendering
    console.log('Stop rendering');
    this.time.off('tick');
    this.sizes.off('resize');
    this.isRunning = false;
  }
}
