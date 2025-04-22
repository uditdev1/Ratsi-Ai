import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LandingVideoAnimation = () => {
    const canvasRef = useRef(null);
    
    const [images, setImages] = useState<any[]>([]);
    const [startAnimation , setStartAnimation] = useState(false);
    const inc_wid = window.innerWidth > 500 ? 100 : 300;
    const inc_height = window.innerWidth > 500 ? 600 : 200;

    function loadImage(ind : number, images : any) {
        const canvas : any = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const img = images[ind];
        canvas.width = window.innerWidth + inc_wid;
        canvas.height = window.innerHeight + inc_height;

        if (img && ctx) {
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX , scaleY);

            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        }
    }
    const frames = {
        currInd: 0,
        maxInd: 99 // 325
    };

  
    

    useEffect(() => {
        
        const loadedImages : any[] = [];
        function preLoader() {
            for (let i = 0; i <= frames.maxInd; i++) {
                const imgUrl = `/robo_img/download (${i}).jpeg`;  // Updated URL
                const img = new Image();
                img.src = imgUrl;
                img.onload = () => {
                    loadedImages.push(img);
                    if (loadedImages.length === frames.maxInd) {
                        loadImage(frames.currInd, loadedImages);
                        setStartAnimation(true);
                    }
                };
                img.onerror = () => {
                    console.log("error", imgUrl);
                }
                setImages((prev : any) => [...prev, img as any]);
            }
        }
        const canvas : any = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        preLoader();
    }, []);

    useGSAP(() => {
        if(!startAnimation) return ;
        const gtl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent_canv",
                start: "top 0",
                end : "top -=4000",
                scrub: 2,
            }
        });

        gtl.to(frames, {
            currInd: frames.maxInd,
            onUpdate: () => {
                loadImage(Math.floor(frames.currInd), images);
            }
        });
    }, [startAnimation]);
    
    return (
        <div className='parent_canv h-full relative flex justify-center items-center w-full'>
            <canvas id='video_frame' ref={canvasRef} className={`z-[999] canvas_landing_robo pointer-events-none h-full`}></canvas>
        </div>
    );
};

export default LandingVideoAnimation;
