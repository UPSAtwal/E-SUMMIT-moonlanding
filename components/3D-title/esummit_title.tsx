//SSR WHY!!

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';


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

	useEffect(() => {
    const loader = new GLTFLoader();
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


return (
    <Canvas style={{ width: '100%', height: '100%' }} id="3DtitleContent">
    	{model && <GLTFScene model={model} />}
    </Canvas>
	);
}

export default TitleThreejs;
