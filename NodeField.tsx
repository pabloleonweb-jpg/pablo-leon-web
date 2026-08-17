import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useHydrated, usePerfTier, useReducedMotion, type PerfTier } from "@/lib/use-device";

const COLOR_A = new THREE.Color("#b98cff");
const COLOR_B = new THREE.Color("#ff5ce0");

function buildGraph(nodeCount: number, linkRadius: number) {
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 20,
      ),
    );
  }

  // Ramificaciones tipo árbol tecnológico
  const branchRoots = Math.max(3, Math.round(nodeCount / 40));
  for (let b = 0; b < branchRoots; b++) {
    const root = new THREE.Vector3(
      (Math.random() - 0.5) * 26,
      -9 + Math.random() * 3,
      (Math.random() - 0.5) * 16,
    );
    let current = root.clone();
    nodes.push(current.clone());
    for (let s = 0; s < 6; s++) {
      current = current
        .clone()
        .add(
          new THREE.Vector3((Math.random() - 0.5) * 3.2, 1.8 + Math.random() * 1.4, (Math.random() - 0.5) * 3.2),
        );
      nodes.push(current.clone());
    }
  }

  const links: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    let made = 0;
    for (let j = i + 1; j < nodes.length && made < 3; j++) {
      if (nodes[i]!.distanceTo(nodes[j]!) < linkRadius) {
        links.push([i, j]);
        made++;
      }
    }
  }
  return { nodes, links };
}

function NodeGraph({ tier, reduced }: { tier: PerfTier; reduced: boolean }) {
  const nodeCount = tier === "low" ? 90 : tier === "mid" ? 170 : 260;
  const linkRadius = tier === "low" ? 4.4 : 3.8;
  const pulseCount = tier === "low" ? 10 : tier === "mid" ? 24 : 40;

  const { nodes, links } = useMemo(() => buildGraph(nodeCount, linkRadius), [nodeCount, linkRadius]);

  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(nodes.length * 3);
    const col = new Float32Array(nodes.length * 3);
    const tmp = new THREE.Color();
    nodes.forEach((n, i) => {
      pos.set([n.x, n.y, n.z], i * 3);
      tmp.copy(COLOR_A).lerp(COLOR_B, Math.random());
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [nodes]);

  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(links.length * 6);
    links.forEach(([a, b], i) => {
      const na = nodes[a]!;
      const nb = nodes[b]!;
      pos.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], i * 6);
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [links, nodes]);

  const pulses = useMemo(
    () =>
      Array.from({ length: Math.min(pulseCount, links.length) }, () => {
        const link = links[Math.floor(Math.random() * links.length)]!;
        return {
          from: nodes[link[0]]!,
          to: nodes[link[1]]!,
          offset: Math.random(),
          speed: 0.12 + Math.random() * 0.25,
        };
      }),
    [links, nodes, pulseCount],
  );

  const group = useRef<THREE.Group>(null);
  const pulseMesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0, scroll: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const scrollNorm = scrollY / Math.max(1, window.innerHeight);
    target.current.x = state.pointer.x;
    target.current.y = state.pointer.y;

    const damp = reduced ? 1 : Math.min(1, delta * 1.6);
    pointer.current.x += (target.current.x - pointer.current.x) * damp;
    pointer.current.y += (target.current.y - pointer.current.y) * damp;

    if (group.current) {
      const drift = reduced ? 0 : t * 0.015;
      group.current.rotation.y = drift + pointer.current.x * 0.18;
      group.current.rotation.x = -pointer.current.y * 0.12 + Math.sin(drift) * 0.03;
      group.current.position.y = scrollNorm * 2.4;
      group.current.position.z = -scrollNorm * 3.2;
    }

    if (pulseMesh.current && !reduced) {
      pulses.forEach((p, i) => {
        const k = (p.offset + t * p.speed) % 1;
        dummy.position.lerpVectors(p.from, p.to, k);
        const s = 0.06 + Math.sin(k * Math.PI) * 0.1;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        pulseMesh.current!.setMatrixAt(i, dummy.matrix);
      });
      pulseMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <points geometry={pointsGeom}>
        <pointsMaterial
          size={tier === "low" ? 0.14 : 0.11}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.24}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <instancedMesh ref={pulseMesh} args={[undefined, undefined, pulses.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial
          color="#ff7bea"
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

/**
 * Red tridimensional de nodos, líneas y pulsos de datos que vive detrás del
 * contenido. Baja opacidad, parallax suave y complejidad adaptada al dispositivo.
 */
export default function NodeField() {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const tier = usePerfTier();
  if (!hydrated) return null;

  return (
    <Canvas
      className="immersive-canvas"
      dpr={tier === "low" ? [1, 1.2] : [1, 1.8]}
      gl={{ antialias: tier !== "low", powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 18], fov: 55 }}
      frameloop={reduced ? "demand" : "always"}
      style={{ opacity: 0.62 }}
    >
      <fog attach="fog" args={["#170a2b", 14, 38]} />
      <NodeGraph tier={tier} reduced={reduced} />
    </Canvas>
  );
}

