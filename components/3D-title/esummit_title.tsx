//SSR WHY!!

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import styles from '../../styles/Header.module.css'; //for HERO if webgl not available


//strictly tell the type of the object in typescript
interface GLTFSceneProps {
	model: GLTF;
}


function GLTFScene({ model }: GLTFSceneProps) {
	const gltfRef = useRef<GLTF>(model);

	useFrame((state, delta) => {
    if (gltfRef.current) {
		gltfRef.current.scene.rotation.z += 0.1 * delta;
	}
	});

	return (
    <primitive object={gltfRef.current.scene} position={[-14, -4, -4]} scale={[50, 50, 50]} rotation={[Math.PI / 2, 0, 0]} />
	);
}

function TitleThreejs() {
	const [model, setModel] = useState<GLTF>();
	const [webGLAvailable, setWebGLAvailable] = useState(true);

	useEffect(() => {
    const loader = new GLTFLoader();
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('webgl');

	if (!context) {
		setWebGLAvailable(false);
		console.log('WebGL not available');
	}


    loader.load('/esummit-logo-black.gltf', (gltf) => {
    	setModel(gltf);
    	console.log('Loaded GLTF:');
    	console.log(gltf);
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% model loaded'); //wont work because ssr
    }, (error) => {
    	console.error(error);
    });
	}, []);

	if (!webGLAvailable) {
		return <h1 className={`${styles.main}`}>E-SUMMIT &apos;23</h1>;
	}

return (
	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

    	<Canvas orthographic camera={{ zoom: 20 }} style={{ width: '100%', height: '100%' }} id="3DtitleContent">
			<EffectComposer>
			<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
			</EffectComposer>

        	<ambientLight />
        	<pointLight position={[0, 0, 0]} />
			{/* <OrbitControls /> */}
        	{model && <GLTFScene model={model} />}
    	</Canvas>

    </div>
	);
}

export default TitleThreejs;
