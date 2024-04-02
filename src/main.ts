// import css
import './style.css';

import Canvas from './webgl/Canvas';
import Environment from './webgl/Environment';
import Shape from './webgl/Shape';

const canvas = new Canvas();

// const cube = new Shape();
// canvas.scene.add(cube.mesh);

new Environment(canvas.scene);

canvas.run();
