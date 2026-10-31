import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const EARTH_RADIUS = 2.45
const START_ROTATION = 3.7

const NIGHT_VERTEX = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const NIGHT_FRAGMENT = `
  uniform sampler2D uNightMap;
  uniform vec2 uTexel;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec3 raw = texture2D(uNightMap, vUv).rgb;
    vec3 near =
      texture2D(uNightMap, vUv + vec2(0.7, 0.0) * uTexel).rgb +
      texture2D(uNightMap, vUv - vec2(0.7, 0.0) * uTexel).rgb +
      texture2D(uNightMap, vUv + vec2(0.0, 0.7) * uTexel).rgb +
      texture2D(uNightMap, vUv - vec2(0.0, 0.7) * uTexel).rgb;
    vec3 lights = raw + near * 0.055;

    float lum = max(lights.r, max(lights.g, lights.b));
    float faint = smoothstep(0.012, 0.13, lum);
    float concentrated = smoothstep(0.12, 0.56, lum);
    vec3 color = lights * (faint * 0.24 + concentrated * 0.76);
    color *= vec3(1.16, 1.08, 0.91);

    gl_FragColor = vec4(color * uIntensity, 1.0);
  }
`

const RIM_VERTEX = `
  varying vec3 vNormalView;
  void main() {
    vNormalView = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const RIM_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormalView;

  void main() {
    float facing = clamp(normalize(vNormalView).z, 0.0, 1.0);
    float rim = pow(1.0 - facing, 3.6);
    float alpha = rim * uIntensity;
    vec3 color = uColor * (0.45 + rim * 0.6);
    gl_FragColor = vec4(color, alpha);
  }
`

function makeGlowTexture() {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0.0, 'rgba(73, 135, 205, 0.18)')
  gradient.addColorStop(0.3, 'rgba(67, 121, 188, 0.12)')
  gradient.addColorStop(0.55, 'rgba(43, 85, 145, 0.055)')
  gradient.addColorStop(0.78, 'rgba(24, 49, 92, 0.018)')
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function EarthScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      return
    }

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr())
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.28

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 5000)
    camera.position.set(0, 0, 2000)

    const earthSystem = new THREE.Group()
    earthSystem.visible = false
    scene.add(earthSystem)

    const manager = new THREE.LoadingManager()
    const loader = new THREE.TextureLoader(manager)

    function makeTexture(url: string, srgb: boolean) {
      const texture = loader.load(url)
      texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      return texture
    }

    const dayTexture = makeTexture('/earth/day.webp', true)
    const cloudTexture = makeTexture('/earth/clouds.webp', true)
    const cloudAlphaTexture = makeTexture('/earth/cloud-alpha.webp', false)
    const nightTexture = makeTexture('/earth/night.webp', true)
    const normalTexture = makeTexture('/earth/normal.webp', false)

    const tiltGroup = new THREE.Group()
    tiltGroup.rotation.z = -0.78
    earthSystem.add(tiltGroup)

    const surfaceSpin = new THREE.Group()
    surfaceSpin.rotation.y = START_ROTATION
    tiltGroup.add(surfaceSpin)

    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 160, 120)

    const ambient = new THREE.AmbientLight(0x345471, 0.92)
    const hemi = new THREE.HemisphereLight(0x6e91ad, 0x02050a, 1.02)
    scene.add(ambient, hemi)

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.62, 0.62),
      color: 0xb7c9d7,
      emissive: new THREE.Color(0x1a3347),
      emissiveMap: dayTexture,
      emissiveIntensity: 0.16,
    })
    surfaceSpin.add(new THREE.Mesh(earthGeometry, earthMaterial))

    const nightMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uNightMap: { value: nightTexture },
        uTexel: { value: new THREE.Vector2(1 / 4096, 1 / 2048) },
        uIntensity: { value: 0.82 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
      vertexShader: NIGHT_VERTEX,
      fragmentShader: NIGHT_FRAGMENT,
    })
    const nightMesh = new THREE.Mesh(earthGeometry, nightMaterial)
    nightMesh.scale.setScalar(1.0015)
    surfaceSpin.add(nightMesh)

    const cloudSpin = new THREE.Group()
    cloudSpin.rotation.y = START_ROTATION + 0.08
    tiltGroup.add(cloudSpin)

    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      alphaMap: cloudAlphaTexture,
      color: 0xc9dbe8,
      transparent: true,
      opacity: 0.78,
      alphaTest: 0.006,
      depthWrite: false,
      specular: new THREE.Color(0x182a37),
      shininess: 3,
      emissive: new THREE.Color(0x0b1723),
      emissiveIntensity: 0.24,
    })
    const cloudMesh = new THREE.Mesh(earthGeometry, cloudMaterial)
    cloudMesh.scale.setScalar(1.012)
    cloudSpin.add(cloudMesh)

    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x8ccaf7) },
        uIntensity: { value: 1.18 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      toneMapped: false,
      vertexShader: RIM_VERTEX,
      fragmentShader: RIM_FRAGMENT,
    })
    earthSystem.add(
      new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS * 1.014, 128, 96), atmosphereMaterial)
    )

    const glowTexture = makeGlowTexture()
    if (glowTexture) {
      const glowSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          transparent: true,
          depthWrite: false,
          depthTest: true,
          blending: THREE.AdditiveBlending,
          opacity: 0.52,
        })
      )
      glowSprite.scale.setScalar(EARTH_RADIUS * 1.9)
      glowSprite.position.set(0, 0, -0.12)
      earthSystem.add(glowSprite)
    }

    let earthReady = false
    function revealEarth() {
      if (earthReady) return
      earthReady = true
      earthSystem.visible = true
    }
    manager.onLoad = revealEarth
    manager.onError = revealEarth
    const revealTimer = window.setTimeout(revealEarth, 2200)

    function applyLayout() {
      const width = Math.max(320, window.innerWidth)
      const height = Math.max(320, window.innerHeight)

      renderer.setPixelRatio(dpr())
      renderer.setSize(width, height, false)

      camera.left = -width / 2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = -height / 2
      camera.near = 1
      camera.far = 5000
      camera.position.set(0, 0, 2000)
      camera.updateProjectionMatrix()

      const A = { x: 0.3 * width, y: height }
      const B = { x: width, y: 0.3 * height }
      const midX = (A.x + B.x) / 2
      const midY = (A.y + B.y) / 2
      const chordX = B.x - A.x
      const chordY = B.y - A.y
      const chord = Math.hypot(chordX, chordY)
      let normalX = -chordY / chord
      let normalY = chordX / chord
      if (normalY < 0) {
        normalX = -normalX
        normalY = -normalY
      }

      const topTarget = 0.25 * height
      let lo = 0
      let hi = chord * 1.6
      let centerX = midX
      let centerY = midY
      let radius = Math.hypot(A.x - centerX, A.y - centerY)
      for (let i = 0; i < 60; i++) {
        const t = (lo + hi) / 2
        const cx = midX + normalX * t
        const cy = midY + normalY * t
        const r = Math.hypot(A.x - cx, A.y - cy)
        const top = cy - r
        if (top < topTarget) {
          lo = t
        } else {
          hi = t
        }
        centerX = cx
        centerY = cy
        radius = r
      }

      earthSystem.scale.setScalar(radius / EARTH_RADIUS)
      earthSystem.position.set(centerX - width / 2, height / 2 - centerY, 0)
    }

    applyLayout()
    window.addEventListener('resize', applyLayout, { passive: true })

    const clock = new THREE.Clock()
    let elapsed = 0
    let frame = 0

    function animate() {
      frame = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.05)
      elapsed += delta
      surfaceSpin.rotation.y = START_ROTATION + elapsed * 0.018
      cloudSpin.rotation.y = START_ROTATION + 0.08 + elapsed * 0.027
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(revealTimer)
      window.removeEventListener('resize', applyLayout)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="earth-scene" aria-hidden="true" />
}
