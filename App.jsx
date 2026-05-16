import { useState, Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/Scene'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { BottomBar } from './components/BottomBar'
import { Loader } from './components/Loader'
import styles from './styles/App.module.css'

export default function App() {
  const [renderMode, setRenderMode]   = useState('pbr')       // 'pbr' | 'shaded'
  const [envPreset,  setEnvPreset]    = useState('studio')
  const [autoRotate, setAutoRotate]   = useState(true)
  const [wireframe,  setWireframe]    = useState(false)
  const [loaded,     setLoaded]       = useState(false)
  const [bgVisible,  setBgVisible]    = useState(false)

  return (
    <div className={styles.root}>
      {/* ── 3-D canvas ──────────────────── */}
      <div className={styles.canvasWrap}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 1.5, 5], fov: 42 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Scene
              renderMode={renderMode}
              envPreset={envPreset}
              autoRotate={autoRotate}
              wireframe={wireframe}
              bgVisible={bgVisible}
              onLoaded={() => setLoaded(true)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Overlay UI ──────────────────── */}
      <div className={`${styles.ui} ${loaded ? styles.uiReady : ''}`}>
        <TopBar
          bgVisible={bgVisible}
          setBgVisible={setBgVisible}
          wireframe={wireframe}
          setWireframe={setWireframe}
        />

        <Sidebar
          renderMode={renderMode}
          setRenderMode={setRenderMode}
          envPreset={envPreset}
          setEnvPreset={setEnvPreset}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
        />

        <BottomBar renderMode={renderMode} />
      </div>

      {/* ── Loading screen ──────────────── */}
      {!loaded && <Loader />}
    </div>
  )
}
