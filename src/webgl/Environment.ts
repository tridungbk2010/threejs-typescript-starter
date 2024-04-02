import { Scene } from 'three';
import Floor from './Floor';
import Resources from './Resources';
import { RESOURCES } from './sources';

export default class Environment {
  constructor(scene: Scene) {
    const resources = new Resources(RESOURCES);
    resources.on('ready', () => {
      const floor = new Floor(resources);
      scene.add(floor.mesh);
    });
  }
}
