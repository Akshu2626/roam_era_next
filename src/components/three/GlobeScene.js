'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, QuadraticBezierLine } from '@react-three/drei';
import WebGLCanvas from './WebGLCanvas';

const R = 2;
const DEG = Math.PI / 180;

function latLonToVec3(lat, lon, r = R) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Euler angles that bring a lat/lon to face the camera (+Z). */
function facingRotation(lat, lon) {
  const v = latLonToVec3(lat, lon, 1);
  return { x: lat * DEG, y: Math.atan2(-v.x, v.z) };
}

const dotVertex = /* glsl */ `
  uniform float uSize;
  varying float vFacing;
  void main() {
    vec3 n = normalize(normalMatrix * normalize(position));
    vFacing = n.z;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (6.0 / -mv.z);
  }
`;
const dotFragment = /* glsl */ `
  varying float vFacing;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = mix(0.05, 0.75, smoothstep(-0.15, 0.7, vFacing));
    gl_FragColor = vec4(0.945, 0.94, 0.925, a * smoothstep(0.5, 0.2, d));
  }
`;

function DottedSphere({ count }) {
  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos[i * 3] = Math.cos(th) * rad * R;
      pos[i * 3 + 1] = y * R;
      pos[i * 3 + 2] = Math.sin(th) * rad * R;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.ShaderMaterial({
      vertexShader: dotVertex,
      fragmentShader: dotFragment,
      transparent: true,
      depthWrite: false,
      uniforms: { uSize: { value: 3.2 } },
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return <points geometry={geometry} material={material} />;
}

function LatitudeRing({ lat, opacity = 0.14 }) {
  const line = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) pts.push(latLonToVec3(lat, (i / 128) * 360 - 180, R * 1.002));
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({ color: '#f1f0ec', transparent: true, opacity });
    return new THREE.Line(g, m);
  }, [lat, opacity]);
  useEffect(
    () => () => {
      line.geometry.dispose();
      line.material.dispose();
    },
    [line]
  );
  return <primitive object={line} />;
}

function Marker({ dest, active, onSelect }) {
  const pulse = useRef(null);
  const pos = useMemo(() => latLonToVec3(dest.lat, dest.lon), [dest]);
  const tip = useMemo(() => latLonToVec3(dest.lat, dest.lon, R * 1.22), [dest]);
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos]);

  useFrame(({ clock }) => {
    if (!pulse.current) return;
    const t = (clock.elapsedTime * 0.8) % 1;
    const s = 1 + t * (active ? 3.2 : 2);
    pulse.current.scale.setScalar(s);
    pulse.current.material.opacity = (1 - t) * (active ? 0.9 : 0.45);
  });

  return (
    <group>
      <mesh position={pos}>
        <sphereGeometry args={[active ? 0.045 : 0.032, 16, 16]} />
        <meshBasicMaterial color="#f1f0ec" />
      </mesh>
      <mesh ref={pulse} position={pos} quaternion={quat}>
        <ringGeometry args={[0.05, 0.062, 40]} />
        <meshBasicMaterial color="#f1f0ec" transparent side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <QuadraticBezierLine start={pos} end={tip} mid={pos.clone().lerp(tip, 0.5)} color="#f1f0ec" lineWidth={1} transparent opacity={active ? 0.9 : 0.35} />
      <Html position={tip} center zIndexRange={[5, 0]}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onPointerEnter={() => onSelect?.(dest.slug, false)}
          onClick={() => onSelect?.(dest.slug, true)}
          style={{
            whiteSpace: 'nowrap',
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#f1f0ec',
            opacity: active ? 1 : 0.5,
            padding: '6px 10px',
            border: '1px solid rgba(241,240,236,' + (active ? 0.6 : 0.2) + ')',
            background: 'rgba(8,8,8,0.55)',
            transition: 'opacity .5s, border-color .5s',
            cursor: 'pointer',
            transform: 'translateY(-50%)',
          }}
        >
          {dest.name}
        </button>
      </Html>
    </group>
  );
}

function Arc({ a, b }) {
  const ref = useRef(null);
  const start = useMemo(() => latLonToVec3(a.lat, a.lon), [a]);
  const end = useMemo(() => latLonToVec3(b.lat, b.lon), [b]);
  const mid = useMemo(() => start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.18), [start, end]);
  useFrame((_, dt) => {
    if (ref.current?.material?.uniforms?.dashOffset) ref.current.material.uniforms.dashOffset.value -= dt * 0.4;
  });
  return <QuadraticBezierLine ref={ref} start={start} end={end} mid={mid} color="#f1f0ec" lineWidth={1.2} dashed dashScale={40} dashSize={0.5} gapSize={0.5} transparent opacity={0.7} />;
}

function Globe({ destinations, active, onSelect, dense }) {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useMemo(() => {
    const d = destinations.find((x) => x.slug === active);
    const lat = d ? d.lat : (destinations[0].lat + destinations[1].lat) / 2;
    const lon = d ? d.lon : (destinations[0].lon + destinations[1].lon) / 2;
    return facingRotation(lat, lon);
  }, [active, destinations]);

  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    const k = 1 - Math.pow(0.02, delta);
    const tx = target.x + pointer.current.y * 0.12 + Math.sin(t * 0.25) * 0.03;
    const ty = target.y + pointer.current.x * 0.25 + Math.sin(t * 0.18) * 0.08;
    g.rotation.x += (tx - g.rotation.x) * k;
    g.rotation.y += (ty - g.rotation.y) * k;
  });

  return (
    <group ref={group} rotation={[target.x, target.y - 1.2, 0]}>
      <DottedSphere count={dense ? 2800 : 1500} />
      <LatitudeRing lat={0} opacity={0.18} />
      <LatitudeRing lat={23.44} opacity={0.1} />
      <LatitudeRing lat={-23.44} opacity={0.06} />
      <Arc a={destinations[0]} b={destinations[1]} />
      {destinations.map((d) => (
        <Marker key={d.slug} dest={d} active={active === d.slug} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function GlobeScene({ destinations, active, onSelect, small, className, fallback }) {
  return (
    <WebGLCanvas className={className} camera={{ position: [0, 0, 6.4], fov: 40 }} dpr={small ? [1, 1.5] : [1, 2]} interactive fallback={fallback}>
      <Globe destinations={destinations} active={active} onSelect={onSelect} dense={!small} />
    </WebGLCanvas>
  );
}
