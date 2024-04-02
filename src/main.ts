// import css
import './style.css';

import Canvas from './webgl/Canvas';
import Shape from './webgl/Shape';

const canvas = new Canvas();

const cube = new Shape();
canvas.scene.add(cube.mesh);

canvas.run();

const button = document.createElement('button');

// render a button to stop rendering
button.innerHTML = 'Stop rendering';
document.body.appendChild(button);

//set styles for this button, floating on top of the canvas
button.style.position = 'absolute';
button.style.top = '10px';
button.style.right = '10px';
button.style.zIndex = '1000';
button.style.padding = '10px';

// add event listener to stop rendering
button.addEventListener('click', () => {
  canvas.destroy();
});
