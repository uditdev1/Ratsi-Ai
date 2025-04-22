import { useVideoTexture } from "@react-three/drei";

const VideoPlane = () => {
  const texture = useVideoTexture("/eyes_video-transcode (1).mp4");

  return (
    <mesh position={[-19.12, 118.687, 142.834]} rotation={[0.013, -0.082, 0.015]} scale={75}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        alphaTest={0.5} 
      />
    </mesh>
  );
};

export default VideoPlane;