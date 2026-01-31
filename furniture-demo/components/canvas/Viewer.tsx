"use client";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls, Float, PerspectiveCamera, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from 'three';

interface ViewerProps {
  color: string;
  texture: 'leather' | 'fabric' | 'wood';
  backStyle: 'classic' | 'cross' | 'ergonomic';
  armStyle: 'modern' | 'executive' | 'none';
  zoom: number;
  rotation: number;
  showFloor: boolean;
  isExploded?: boolean; // Fix: Added missing prop from Demo Suite
}

export default function Viewer({ 
  color, 
  texture, 
  backStyle, 
  armStyle, 
  zoom, 
  rotation, 
  showFloor, 
  isExploded = false 
}: ViewerProps) {
  
  const textureProps = {
    leather: { roughness: 0.15, metalness: 0.25 },
    fabric: { roughness: 1, metalness: 0 },
    wood: { roughness: 0.5, metalness: 0 }
  };

  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, zoom]} fov={50} />
        
        <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
          <Stage intensity={0.6} environment="city" adjustCamera={false}>
            <Float speed={1.5} rotationIntensity={0.1}>
              {/* Main Rotation Group */}
              <group rotation={[0, rotation, 0]}>
                
                {/* 1. SEAT BASE */}
                <mesh receiveShadow castShadow position={[0, isExploded ? 0.5 : 0, 0]}>
                  <boxGeometry args={[1.6, 0.25, 1.6]} />
                  <meshStandardMaterial color={color} {...textureProps[texture]} />
                </mesh>

                {/* 2. BACKREST DESIGNS */}
                <group position={[0, isExploded ? 1.2 : 0.7, -0.7]}>
                  {backStyle === 'classic' && (
                    <mesh castShadow>
                      <boxGeometry args={[1.6, 1.2, 0.15]} />
                      <meshStandardMaterial color={color} {...textureProps[texture]} />
                    </mesh>
                  )}
                  {backStyle === 'cross' && (
                    <group>
                      {/* Fix: Passed rotation as Euler array */}
                      <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
                        <boxGeometry args={[2.2, 0.1, 0.1]} />
                        <meshStandardMaterial color="#1e293b" />
                      </mesh>
                      <mesh rotation={[0, 0, -Math.PI / 4]} castShadow>
                        <boxGeometry args={[2.2, 0.1, 0.1]} />
                        <meshStandardMaterial color="#1e293b" />
                      </mesh>
                      <mesh position={[0, 0.6, 0]} castShadow>
                        <boxGeometry args={[1.6, 0.15, 0.15]} />
                        <meshStandardMaterial color="#1e293b" />
                      </mesh>
                    </group>
                  )}
                  {backStyle === 'ergonomic' && (
                    <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
                      <cylinderGeometry args={[0.8, 0.8, 1.4, 32, 1, true, 0, Math.PI]} />
                      <meshStandardMaterial color={color} side={THREE.DoubleSide} {...textureProps[texture]} />
                    </mesh>
                  )}
                </group>

                {/* 3. ARMRESTS */}
                {armStyle !== 'none' && (
                  <group position={[0, 0.35, 0]}>
                    <mesh position={[isExploded ? -1.2 : -0.85, 0, 0]} castShadow>
                      {armStyle === 'modern' ? (
                        <boxGeometry args={[0.15, 0.5, 1.2]} />
                      ) : (
                        <cylinderGeometry args={[0.08, 0.08, 1]} /> 
                      )}
                      {/* Fix: Logic to avoid putting rotation on Geometry directly */}
                      <meshStandardMaterial color="#1e293b" metalness={0.6} />
                    </mesh>
                    <mesh position={[isExploded ? 1.2 : 0.85, 0, 0]} castShadow>
                      {armStyle === 'modern' ? (
                        <boxGeometry args={[0.15, 0.5, 1.2]} />
                      ) : (
                        <cylinderGeometry args={[0.08, 0.08, 1]} />
                      )}
                      <meshStandardMaterial color="#1e293b" metalness={0.6} />
                    </mesh>
                  </group>
                )}

                {/* 4. LEGS */}
                <group position={[0, isExploded ? -1.2 : -0.6, 0]}>
                  {[[-0.6, 0, 0.6], [0.6, 0, 0.6], [-0.6, 0, -0.6], [0.6, 0, -0.6]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} castShadow>
                      <cylinderGeometry args={[0.06, 0.03, 1]} />
                      <meshStandardMaterial color="#1e293b" metalness={0.8} />
                    </mesh>
                  ))}
                </group>
              </group>
            </Float>
          </Stage>
        </PresentationControls>
        
        {showFloor && <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}