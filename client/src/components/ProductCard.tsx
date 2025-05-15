import { useNavigate } from "react-router-dom"

const ProductCard = ({ children , link } : any) => {
    const navigate = useNavigate();
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-16 w-16 sm:h-26 sm:w-26 rounded-xl bg-green-600"/>
            <div onClick={() => navigate(link)} 
                className=
                {`
                    relative text-green-300 backdrop-blur-[70px] hover:backdrop-blur-[90px]
                    rounded-md h-50 sm:h-full border border-green-400 text-4xl
                    duration-300 transform transition
                    hover:-translate-y-3 hover:border-green-300 cursor-pointer
                    hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]
                `}
            >
                <div className="p-4">
                    { children }
                </div>
                <div className="absolute bottom-10 sm:bottom-12  bg-green-300 h-[0.5px] w-full"></div>
                <div className="absolute bottom-12 sm:bottom-14  bg-green-300 h-[0.5px] w-full"></div>
                <div className="absolute top-0 right-8  sm:right-10 bg-green-300 h-full w-[0.5px] "></div>
                <div className="absolute top-0 right-10 sm:right-13 bg-green-300 h-full w-[0.5px] "></div>
            </div>
        </div>
    )
}

export default ProductCard