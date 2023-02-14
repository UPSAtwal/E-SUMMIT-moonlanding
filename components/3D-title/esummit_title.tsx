import * as THREE from 'three';
import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF, GLTFLoader as GLTFLoaderType } from 'three/examples/jsm/loaders/GLTFLoader';

interface GLTFSceneProps {
	model: GLTF;
}


const GLTFScene = ({ model }: GLTFSceneProps) => {
	const { camera } = useThree();
	const gltfRef = useRef<GLTF>(model);

	useFrame((state, delta) => {
    if (gltfRef.current) {
    //   gltfRef.current.rotation.y += 0.01 * delta;
    }
	});

	return (
    <primitive
    	object={gltfRef.current}
    	position={[0, 0, 0]}
    	scale={[1, 1, 1]}
    />
	);
};

const Hero = () => {
	const [model, setModel] = useState<GLTF>();

	useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/public/esummit-logo-black.gltf', (gltf) => {
    	setModel(gltf);
		console.log("Loaded GLTF: ")
		console.log(gltf);
    }, undefined, (error) => {
    	console.error(error);
    });
	}, []);

	return (
    <Canvas camera={{ position: [0, 0, 5] }}>
    	<ambientLight />
    	{model && <GLTFScene model={model} />}
    </Canvas>
	);
};

export default TitleThreejs;