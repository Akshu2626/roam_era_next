'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import WebGLCanvas from './WebGLCanvas';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uHeight;
  uniform float uFall;
  uniform float uSway;
  uniform float uPixelRatio;
  attribute vec3 aSeed;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float t = uTime * (0.35 + aSeed.x * 0.65);
    p.y = mod(p.y - uFall * t + uHeight * 0.5, uHeight) - uHeight * 0.5;
    p.x += sin(t * 0.8 + aSeed.y * 6.2831) * uSway;
    p.z += cos(t * 0.6 + aSeed.z * 6.2831) * uSway * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = min(uSize * uPixelRatio * (0.35 + aSeed.z) * (9.0 / -mv.z), 48.0);

    float twinkle = 0.6 + 0.4 * sin(uTime * (0.8 + aSeed.y * 2.0) + aSeed.x * 10.0);
    float edge = smoothstep(uHeight * 0.5, uHeight * 0.3, abs(p.y));
    vAlpha = twinkle * edge * (0.3 + 0.7 * aSeed.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.8);
    float alpha = a * vAlpha * uOpacity;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const PRESETS = {
  dust: { color: '#f1f0ec', count: [650, 220], size: 1.1, fall: -0.12, sway: 0.45, opacity: 0.7 },
  snow: { color: '#ffffff', count: [1400, 450], size: 1.5, fall: 0.85, sway: 0.6, opacity: 0.85 },
  embers: { color: '#f2b77c', count: [520, 200], size: 1.25, fall: -0.22, sway: 0.55, opacity: 0.8 },
};

const SPREAD = [18, 12, 10];

function Particles({ count, color, size, fall, sway, opacity, spread = SPREAD }) {
  const { gl } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread[0];
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread[2] - 1;
      seed[i * 3] = Math.random();
      seed[i * 3 + 1] = Math.random();
      seed[i * 3 + 2] = Math.random();
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    return g;
  }, [count, spread]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: Math.random() * 100 },
          uSize: { value: size },
          uHeight: { value: spread[1] },
          uFall: { value: fall },
          uSway: { value: sway },
          uOpacity: { value: opacity },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.5) },
          uColor: { value: new THREE.Color(color) },
        },
      }),
    [color, size, fall, sway, opacity, spread, gl]
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

/** Camera drifts gently toward the pointer for a sense of depth. */
function CameraRig({ strength = 0.6 }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const t = clock.elapsedTime;
    const k = 1 - Math.pow(0.04, delta);
    camera.position.x += (pointer.current.x * strength + Math.sin(t * 0.1) * 0.2 - camera.position.x) * k;
    camera.position.y += (-pointer.current.y * strength * 0.6 + Math.cos(t * 0.13) * 0.15 - camera.position.y) * k;
    camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function ParticleField({ preset = 'dust', small = false, className }) {
  const cfg = PRESETS[preset];
  const count = small ? cfg.count[1] : cfg.count[0];
  return (
    <WebGLCanvas className={className} camera={{ position: [0, 0, 8], fov: 55 }} dpr={small ? [1, 1.25] : [1, 1.5]}>
      <Particles {...cfg} count={count} />
      {!small && <CameraRig />}
    </WebGLCanvas>
  );
}
