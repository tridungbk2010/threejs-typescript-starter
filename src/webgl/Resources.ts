import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from '../utils/EventEmitter';
import { CubeTextureLoader, TextureLoader } from 'three';
import { TLoader, TResource } from '../types/common';

export default class Resources extends EventEmitter {
  loaders: TLoader;
  sources: TResource[];
  items: Record<string, any>;
  toLoad: number;
  loaded: number;

  constructor(initSources: TResource[]) {
    super();

    this.items = {};
    this.toLoad = initSources.length;
    this.loaded = 0;

    this.sources = initSources;

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader(),
    };

    this.startLoading();
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path as string, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path as string[], (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: TResource, file: any) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
    }
  }
}
