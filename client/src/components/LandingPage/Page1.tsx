import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { Robo_3d } from '../Robo_3d/Robo_3d'
import CameraController from './CameraController'
import PencilStrokeSvg from '../PencilStrokeSvg'

const Page1 = () => {
  const navigate = useNavigate();  

  return (
    <>
      <div className="absolute bg-green-500 top-0 left-0 h-20 w-20"></div>
      <PencilStrokeSvg/>
      <div className="h-fit backdrop-blur-[100px] relative">
        <div onClick={() => navigate("/products")}  className="absolute mt-10 duration-200 top-[5%] sm:top-[8%] w-full flex flex-col justify-center items-center sm:left-1/2 sm:-translate-x-1/2 text-[1rem] sm:text-[1.5rem] font-bold bg-gradient-to-t from-green-800 via-green-300 to-green-100 bg-clip-text text-transparent font-sans">
          <div className="absolute cursor-pointer -top-10 hover:underline duration-200 text-xl text-white">
            Learn now!
          </div>
          <span className="text-[3rem] cursor-pointer max-sm:text-center max-sm:px-2 sm:text-[4rem] ">
            Introducing Ratsi
            <div className="relative">
              <svg 
                className="absolute -top-24 -right-12 h-26 max-sm:right-20 max-sm:h-20 max-sm:-top-20 " viewBox="0 0 236 102" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-f0058b46=""
              >
                <path d="M144.921 11.9089C106.23 6.97292 42.633 -5.21088 20.1713 5.16921C2.17913 13.4838 20.0673 36.0881 37.6547 51.4874C55.6148 67.2131 84.8497 84.2513 119.581 94.2213C166.308 107.635 210.286 102.831 209.847 83.9735C209.416 65.4389 173.53 38.2936 127.757 22.3709C90.08 9.26456 62.6603 12.9101 44.9798 19.7678C32.6759 24.54 24.1422 31.578 32.3607 42.7895C41.8621 55.7511 69.6598 70.6872 96.7817 79.844C144.199 95.8529 199.021 97.3467 217.44 84.2826C229.344 75.8398 222.796 61.4732 195.331 47.6535C145.162 22.4091 59.5138 5.50627 17.4373 11.6847C-18.5974 16.976 10.5859 48.1079 46.1977 65.8283C98.7302 91.9683 156.758 103.196 201.006 97.2856C237.804 92.3705 251.747 73.3744 206.085 47.5752C170.974 27.7377 130.252 22.4335 95.3556 22.2514C65.3272 22.0948 18.7045 25.8209 36.0174 46.1751C54.4119 67.8563 105.064 84.3413 146.105 89.7766C205.159 97.5975 247.169 87.474 219.108 56.5319C210.048 46.5421 195.705 34.8932 174.045 26.7669C144.382 15.6383 107.995 11.483 84.3721 12.9871C51.0451 15.1091 38.2291 27.3713 45.628 45.4085C53.2096 63.8913 83.8381 85.1399 128.624 95.8451C178.885 107.859 230.973 97.3633 224.499 75.8785C220.712 63.3095 197.222 48.1752 172.994 36.3225C158.093 29.0326 138.451 21.5581 120.88 16.6221C89.2634 7.74027 109.458 15.1728 80.0537 8.5143" stroke="white" strokeWidth="0.3" strokeLinecap="round" data-v-f0058b46="" style={{ strokeDashoffset: 0 + "px" , strokeDasharray: "none" }}>
                </path>
              </svg>
            </div>
          </span>
          <span className='cursor-pointer'>
            The Future of DSA Learning is Here!
          </span>
        </div>
        <div className="group">
          <div onClick={() => navigate("/tutors") } className="absolute cursor-pointer group-hover:scale-110 duration-200 top-[60%] sm:top-[24%] max-sm:left-2 sm:left-[10%]">
            <svg className="max-sm:w-[96%]" width="421" height="96" viewBox="0 0 421 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="path-anim path-anim-2" d="M157.5 94H402.257C403.053 94 403.816 93.6839 404.379 93.1213L419 78.5" stroke="url(#paint0_linear_2309_6568)" strokeWidth="2.5" strokeLinecap="round"></path>
              <path className="path-anim path-anim-1" d="M2 77V19.2426C2 18.447 2.31607 17.6839 2.87868 17.1213L17.1213 2.87868C17.6839 2.31607 18.447 2 19.2426 2H417" stroke="url(#paint1_linear_2309_6568)" strokeWidth="2.5" strokeLinecap="round"></path>
              <defs>
                <linearGradient id="paint0_linear_2309_6568" x1="67.5" y1="101" x2="428.5" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8CF3E"></stop>
                  <stop offset="1" stopColor="#FC6756"></stop>
                  <stop offset="1" stopColor="#FC6756"></stop>
                </linearGradient>
                <linearGradient id="paint1_linear_2309_6568" x1="416.5" y1="-9.50001" x2="25.7657" y2="-140.863" gradientUnits="userSpaceOnUse">
                  <stop offset="0.236372" stopColor="#724CE8"></stop>
                  <stop offset="1" stopColor="#26F4D0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div onClick={() => navigate("/tutors") }  className="absolute cursor-pointer duration-200 top-[60.5%] left-6 sm:top-[23.5%] sm:left-[12%] text-[3rem] sm:text-[4rem] font-bold bg-gradient-to-r from-green-800 via-green-300 to-green-100 bg-clip-text text-transparent font-sans">
            DSA TUTORS
          </div>
        </div>
        <div className="group">
          <div onClick={() => navigate("/tutors") }  className="absolute cursor-pointer group-hover:scale-110 duration-200 top-[65.5%] left-2 sm:top-[30%] sm:left-[10%]">
            <svg width="115" height="88" viewBox="0 0 115 88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="path-anim path-anim-left" d="M2 2V68.7574C2 69.553 2.31607 70.3161 2.87868 70.8787L17.1213 85.1213C17.6839 85.6839 18.447 86 19.2426 86H62" stroke="url(#paint0_linear_2309_6569)" strokeWidth="2.5" strokeLinecap="round"></path>
              <path className="path-anim path-anim-right" d="M62 86H110C111.657 86 113 84.6569 113 83V15.2426C113 14.447 112.684 13.6839 112.121 13.1213L100.5 1.5" stroke="url(#paint1_linear_2309_6569)" strokeWidth="2.5" strokeLinecap="round"></path>
              <defs>
              <linearGradient id="paint0_linear_2309_6569" x1="1.5" y1="-1.3292e-06" x2="123" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#26F4D0"></stop>
              <stop offset="0.634676" stopColor="#F8CF3E"></stop>
              </linearGradient>
              <linearGradient id="paint1_linear_2309_6569" x1="45" y1="81.5" x2="119" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0.436639" stopColor="#F8CF3E"></stop>
              <stop offset="1" stopColor="#FC6756"></stop>
              </linearGradient>
              </defs>
            </svg> 
          </div>
          <div onClick={() => navigate("/tutors") }  className="absolute cursor-pointer duration-200 top-[65%] left-6 sm:top-[29.5%] sm:left-[12%] text-[4rem] font-bold bg-gradient-to-r from-green-800 via-green-300 to-green-100  bg-clip-text text-transparent font-sans">
            AI
          </div>
        </div>
        <div  className="robo_3d_canv z-[99999] pointer-events-none relative h-[250vh] par w-full ">
          <Canvas camera={{ position: [-4 , 1 ,63], fov: 30 }}
            gl={{ antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
            style={{ pointerEvents: 'none' }}
          >
            <ambientLight intensity={2} />
            <Environment preset="sunset" />
            <Robo_3d scale={0.016} />
            <CameraController />
            <directionalLight position={[10, 10, 10]} intensity={5} castShadow />
            <directionalLight position={[0, 150 , 10]} intensity={6} castShadow />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default Page1