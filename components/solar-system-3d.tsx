'use client'

import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { PLANET_VISUALS, type PlanetVisual } from '@/lib/data'

type Labels = Record<string, string>

function HoverLabel({ text, offset }: { text: string; offset: number }) {
  return (
    <Html position={[0, offset, 0]} center zIndexRange={[10, 0]}>
      <div className="planet-label">{text}</div>
    </Html>
  )
}

function Planet({
  id,
  visual,
  label,
  hovered,
  onHover,
  onSelect,
}: {
  id: string
  visual: PlanetVisual
  label: string
  hovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) {
  const pivot = useRef<THREE.Group>(null)
  const body = useRef<THREE.Mesh>(null)
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((_, delta) => {
    if (pivot.current && !hovered) pivot.current.rotation.y += delta * visual.speed * 0.12
    if (body.current) body.current.rotation.y += delta * 0.4
  })

  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[visual.orbit - 0.015, visual.orbit + 0.015, 160]} />
        <meshBasicMaterial color={hovered ? '#9fd0ff' : '#5b7bb0'} transparent opacity={hovered ? 0.8 : 0.32} side={THREE.DoubleSide} />
      </mesh>
      <group ref={pivot} rotation-y={startAngle}>
        <group position={[visual.orbit, 0, 0]}>
          <mesh
            ref={body}
            onPointerOver={(e) => {
              e.stopPropagation()
              onHover(id)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              onHover(null)
              document.body.style.cursor = ''
            }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(id)
            }}
            scale={hovered ? 1.25 : 1}
          >
            <sphereGeometry args={[visual.size, 48, 48]} />
            <meshStandardMaterial color={visual.color} roughness={0.75} metalness={0.05} emissive={visual.color} emissiveIntensity={hovered ? 0.35 : 0.08} />
          </mesh>
          {visual.ring && (
            <mesh rotation-x={-Math.PI / 2.4}>
              <ringGeometry args={[visual.size * 1.35, visual.size * 2.2, 96]} />
              <meshStandardMaterial color="#d8c69a" transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>
          )}
          {hovered && <HoverLabel text={label} offset={visual.size * (visual.ring ? 2 : 1.6) + 0.3} />}
        </group>
      </group>
    </>
  )
}

function Sun({ label, hovered, onHover, onSelect }: { label: string; hovered: boolean; onHover: (id: string | null) => void; onSelect: (id: string) => void }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1
  })
  return (
    <group>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover('sun')
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = ''
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect('sun')
        }}
      >
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshBasicMaterial color="#ffd27a" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.15, 48, 48]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.16} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.8, 48, 48]} />
        <meshBasicMaterial color="#ff9b3d" transparent opacity={0.06} />
      </mesh>
      <pointLight intensity={420} distance={60} decay={2} color="#fff1d6" />
      {hovered && <HoverLabel text={label} offset={3.2} />}
    </group>
  )
}

export default function SolarSystem3D({ labels, basePath }: { labels: Labels; basePath: string }) {
  const router = useRouter()
  const [hovered, setHovered] = useState<string | null>(null)
  const select = (id: string) => {
    document.body.style.cursor = ''
    router.push(`${basePath}/${id}`)
  }

  return (
    <Canvas camera={{ position: [0, 17, 17], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.18} />
      <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.6} />
      <Sun label={labels.sun} hovered={hovered === 'sun'} onHover={setHovered} onSelect={select} />
      {Object.entries(PLANET_VISUALS).map(([id, visual]) => (
        <Planet key={id} id={id} visual={visual} label={labels[id]} hovered={hovered === id} onHover={setHovered} onSelect={select} />
      ))}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
        autoRotate={!hovered}
        autoRotateSpeed={0.25}
      />
    </Canvas>
  )
}
