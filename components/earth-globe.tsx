import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const SUN_POSITION: [number, number, number] = [-4, 1.5, 3]

function Globe() {
  const group = useRef<THREE.Group>(null)
  const cloudLayer = useRef<THREE.Mesh>(null)
  const [day, clouds, cloudAlpha, night, normal] = useTexture([
    '/earth/day.webp',
    '/earth/clouds.webp',
    '/earth/cloud-alpha.webp',
    '/earth/night.webp',
    '/earth/normal.webp',
  ])

  day.colorSpace = THREE.SRGBColorSpace
  clouds.colorSpace = THREE.SRGBColorSpace
  night.colorSpace = THREE.SRGBColorSpace

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05
    if (cloudLayer.current) cloudLayer.current.rotation.y += delta * 0.01
  })

  return (
    <group ref={group} rotation={[0.25, 0, 0.1]}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={day}
          normalMap={normal}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          emissiveMap={night}
          emissive={new THREE.Color('#ffd28a')}
          emissiveIntensity={0.35}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      <mesh ref={cloudLayer} scale={1.01}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={clouds}
          alphaMap={cloudAlpha}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#6fb6ff"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function EarthGlobe() {
  return (
    <div className="earth-globe" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.6], fov: 35 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={SUN_POSITION} intensity={2.2} />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  )
}
