import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const CameraController = () => {
    const { camera } = useThree(); 
  
    useEffect(() => {
      const gtl = gsap.timeline({
        scrollTrigger: {
          trigger: ".par",
          start: "top 0",
          end: "top -=3000",
          scrub: true,
        },
      });
      gtl.to(camera.position, {
        x: 100,
        y : 180,
        z : 100,
      })
      ;
    }, []);
  
    return null;
};

export default CameraController;