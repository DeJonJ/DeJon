import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SimplexNoise } from 'simplex-noise';
import rangeSlider from 'rangeslider-pure';

// Bubble Shaders
const BUBBLE_VERTEX_SHADER = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;
const BUBBLE_FRAGMENT_SHADER = `
uniform vec3 color1;
uniform vec3 color2;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
}
`;

// Glow Shaders
const GLOW_VERTEX_SHADER = `
varying vec3 vNormal;
void main() {
    vec3 vNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;
const GLOW_FRAGMENT_SHADER = `
varying vec3 vNormal;
void main() {
    float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 );
    gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;
}
`;

const BubbleAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const simplex = new SimplexNoise();

    // Range Sliders
    const speedSlider = { val: () => 1 };
    const spikesSlider = { val: () => 1 };
    const processingSlider = { val: () => 1 };

    // Scene & Camera & Renderer
    const $canvas = containerRef.current,
      renderer = new THREE.WebGLRenderer({
        canvas: $canvas,
        context: $canvas.getContext('webgl2'),
        antialias: true,
        alpha: true
      });

    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize($canvas.clientWidth, $canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, $canvas.clientWidth / $canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Top Light
    const lightTop = new THREE.DirectionalLight(0xFFFFFF, .7);
    lightTop.position.set(0, 500, 200);
    lightTop.castShadow = true;
    scene.add(lightTop);

    // Bottom Light
    const lightBottom = new THREE.DirectionalLight(0xFFFFFF, .25);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    scene.add(lightBottom);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0x798296);
    scene.add(ambientLight);

    // Bubble
    const bubbleGeometry = new THREE.CircleGeometry(20, 128, 6, 6.3);
    const bubbleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color("#FE390C")
        },
        color2: {
          value: new THREE.Color("#FACE40")
        }
      },
      vertexShader: BUBBLE_VERTEX_SHADER,
      fragmentShader: BUBBLE_FRAGMENT_SHADER,
    });

    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

bubble.rotation.x = -Math.PI / 2;
bubble.position.y = -2;
bubble.castShadow = true;
bubble.receiveShadow = true;
scene.add(bubble);


// Glow
const glowGeometry = new THREE.CircleGeometry(22, 128, 6, 6.3);
const glowMaterial = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: GLOW_VERTEX_SHADER,
  fragmentShader: GLOW_FRAGMENT_SHADER,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true
});

const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.y = -2;
glow.scale.multiplyScalar(1.3);
scene.add(glow);

// Render
const render = () => {
  const time = performance.now() * 0.0005 * speedSlider.val();
  bubble.scale.x = bubble.scale.y = bubble.scale.z = (1 + Math.sin(time * spikesSlider.val()) * 0.1) * processingSlider.val();
  glow.scale.x = glow.scale.y = glow.scale.z = (1 + Math.sin(time * spikesSlider.val()) * 0.1) * processingSlider.val() * 1.3;
  glow.material.opacity = Math.max((Math.sin(time * 7) * 0.5 + 0.7), 0.3);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// Range Slider Setup
rangeSlider.create($canvas.parentElement.querySelector('.speed-slider'), {
  onSlide: (value) => {
    speedSlider.val = () => value;
  }
});
rangeSlider.create($canvas.parentElement.querySelector('.spikes-slider'), {
  onSlide: (value) => {
    spikesSlider.val = () => value;
  }
});
rangeSlider.create($canvas.parentElement.querySelector('.processing-slider'), {
  onSlide: (value) => {
    processingSlider.val = () => value;
  }
});

render();

// Resize Canvas
const handleResize = () => {
  renderer.setSize($canvas.clientWidth, $canvas.clientHeight);
  camera.aspect = $canvas.clientWidth / $canvas.clientHeight;
  camera.updateProjectionMatrix();
};

window.addEventListener('resize', handleResize);
return () => window.removeEventListener('resize', handleResize);
}, []);

return (
<div className="bubble-animation">
<canvas ref={containerRef} />
<div className="controls">
<div className="slider">
<label htmlFor="speed-slider">Speed</label>
<input id="speed-slider" className="speed-slider" type="range" min="1" max="10" defaultValue="1" />
</div>
<div className="slider">
<label htmlFor="spikes-slider">Spikes</label>
<input id="spikes-slider" className="spikes-slider" type="range" min="1" max="10" defaultValue="1" />
</div>
<div className="slider">
<label htmlFor="processing-slider">Processing</label>
<input id="processing-slider" className="processing-slider" type="range" min="1" max="10" defaultValue="1" />
</div>
</div>
</div>
);
};

export default BubbleAnimation;