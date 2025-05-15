import { useNavigate } from 'react-router-dom'

const AppBarLogo = () => {
    const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")} className='h-full relative cursor-pointer '>
        <svg width="256" height="50" viewBox="0 0 156 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3512_4243)">
            <path d="M16 4.02318H24.2642C27.2338 4.02318 29.6403 6.45557 29.6403 9.45714V11.082C29.6403 11.3131 29.8255 11.5004 30.0542 11.5004H33.2043C33.4328 11.5004 33.6182 11.3131 33.6182 11.082V7.64499C33.6182 6.95176 33.3463 6.29016 32.8625 5.80125L27.8787 0.763776C27.3926 0.269999 26.7453 0 26.057 0H16V4.02318Z" fill="url(#paint0_linear_3512_4243)"/>
            <path d="M15.9998 29.9769H24.2642C27.2338 29.9769 29.6403 27.5445 29.6403 24.5428V18.4444C29.6403 18.2133 29.8255 18.026 30.0542 18.026H33.2043C33.4328 18.026 33.6181 18.2133 33.6181 18.4444V26.3551C33.6181 27.0482 33.3462 27.7099 32.8625 28.1987L27.8787 33.2362C27.3926 33.73 26.7453 34 26.057 34H15.9998V29.9769Z" fill="url(#paint1_linear_3512_4243)"/>
            <path d="M16.8091 0H7.56106C6.88245 0 6.21827 0.279729 5.73938 0.763776L0.7556 5.80125C0.271903 6.29016 0 6.95176 0 7.64256V17H3.98026V9.45714C3.98026 6.45557 6.38673 4.02318 9.3563 4.02318H16.8091V0Z" fill="url(#paint2_linear_3512_4243)"/>
            <path d="M16.8091 34H7.56106C6.88245 34 6.21827 33.7202 5.73938 33.2362L0.7556 28.1987C0.271903 27.7099 0 27.0482 0 26.3575V16.5H3.98026V24.5428C3.98026 27.5445 6.38673 29.9768 9.3563 29.9768H16.8091V34Z" fill="url(#paint3_linear_3512_4243)"/>
            <path d="M12.1645 19.6843C13.3453 19.6843 14.3025 18.6827 14.3025 17.4474C14.3025 16.2121 13.3453 15.2106 12.1645 15.2106C10.9837 15.2106 10.0265 16.2121 10.0265 17.4474C10.0265 18.6827 10.9837 19.6843 12.1645 19.6843Z" fill="#EFEFE5"/>
            <path d="M21.7486 19.6843C22.9294 19.6843 23.8866 18.6827 23.8866 17.4474C23.8866 16.2121 22.9294 15.2106 21.7486 15.2106C20.5678 15.2106 19.6106 16.2121 19.6106 17.4474C19.6106 18.6827 20.5678 19.6843 21.7486 19.6843Z" fill="#EFEFE5"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_3512_4243" x1="32.6597" y1="11.4825" x2="16.9559" y2="3.42572" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6C5AE6"/>
            <stop offset="1" stop-color="#509ADD"/>
            </linearGradient>
            <linearGradient id="paint1_linear_3512_4243" x1="32.6596" y1="22.5176" x2="16.9557" y2="30.5743" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FC6756"/>
            <stop offset="1" stop-color="#F8CF3E"/>
            </linearGradient>
            <linearGradient id="paint2_linear_3512_4243" x1="16.1456" y1="3.80263" x2="4.18621" y2="18.6578" gradientUnits="userSpaceOnUse">
            <stop stop-color="#509ADD"/>
            <stop offset="1" stop-color="#26F4D0"/>
            </linearGradient>
            <linearGradient id="paint3_linear_3512_4243" x1="13.1966" y1="30.1228" x2="3.68983" y2="16.5039" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F8CF3E"/>
            <stop offset="0.288195" stop-color="#F8CF3E"/>
            <stop offset="1" stop-color="#27F3D1"/>
            </linearGradient>
            <clipPath id="clip0_3512_4243">
            <rect width="156" height="34" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    </div>
  )
}

export default AppBarLogo