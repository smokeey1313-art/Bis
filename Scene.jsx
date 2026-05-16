import { useRef, useEffect, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ── Preload both models so switch is instant ── */
useGLTF.preload('/base_basic_pbr.glb')
useGLTF.preload('/base_basic_shaded.glb')

function Model({ url, wireframe, onLoaded }) {
  const { scene } = useGLTF(url)

  /* Clone so each url gets its own scene graph; avoids shared-state bugs */
  const cloned = useRef(null)

  useLayoutEffect(() => {
    const clone = scene.clone(true)

    /* Auto-center + uniform scale to ~2 units tall */
    const box    = new THREE.Box3().setFromObject(clone)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale  = 2.0 / maxDim

    clone.scale.setScalar(scale)
    clone.position.set(
      -center.x * scale,
      -box.min.y * scale,          // sit on y=0
      -center.z * scale
    )

    /* Apply wireframe to all meshes */
    clone.traverse(child => {
      if (child.isMesh) {
        child.castShadow    = true
        child.receiveShadow = true
        child.material = child.material.clone()
        child.material.wireframe = wireframe
      }
    })

    cloned.current = clone
    onLoaded?.()
  }, [scene])

  /* Update wireframe live */
  useEffect(() => {
    if (!cloned.current) return
    cloned.current.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.wireframe = wireframe
      }
    })
  }, [wireframe])

  if (!cloned.current) return null
  return <primitive object={cloned.current} />
}

export function Scene({
  renderMode,
  envPreset,
  autoRotate,
  wireframe,
  bgVisible,
  onLoaded,
}) {
  const groupRef = useRef()
  const url = renderMode === 'pbr'
    ? '/base_basic_pbr.glb'
    : '/base_basic_shaded.glb'

  useFrame((_, dt) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += dt * 0.38
    }
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 9, 6]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.45} color="#9bb8ff" />
      <pointLight position={[2, 5, -5]} intensity={1.0} color="#ffd080" />
      <pointLight position={[-3, 1,  4]} intensity={0.4} color="#80c0ff" />

      {/* Environment HDRI */}
      <Environment
        preset={envPreset}
        background={bgVisible}
        backgroundBlurriness={0.6}
      />

      {/* Model + rotation wrapper */}
      <group ref={groupRef}>
        <Model
          key={renderMode}       /* forces remount on mode switch */
          url={url}
          wireframe={wireframe}
          onLoaded={onLoaded}
        />
      </group>

      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#08080f"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Contact shadow */}
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.75}
        scale={10}
        blur={2.5}
        far={5}
        color="#000011"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={0.1}
        dampingFactor={0.07}
        enableDamping
      />
    </>
  )
}
