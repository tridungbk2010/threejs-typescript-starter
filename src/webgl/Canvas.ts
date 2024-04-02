import {
  CineonToneMapping,
  GridHelper,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Time from '../utils/Time';
import Sizes from '../utils/Sizes';
import Light from './Light';

export default class Canvas {
  scene: Scene;
  time: Time;
  sizes: Sizes;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: OrbitControls;

  public isRunning = false;

  constructor() {
    this.scene = new Scene();
    this.time = new Time();
    this.sizes = new Sizes();

    this.renderer = new WebGLRenderer();

    this.configRenderer();

    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 10);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    //grid helper
    const gridHelper = new GridHelper(100, 40, 0x0000ff, 0x808080);
    gridHelper.position.y = 0;
    gridHelper.position.x = 0;
    this.scene.add(gridHelper);

    const light = new Light();
    this.scene.add(light.sunLight);

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

  private configRenderer() {
    this.renderer.toneMapping = CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor('#211d20');
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    document.body.appendChild(this.renderer.domElement);
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
