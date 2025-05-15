import Ratsi from "../components/Ratsi";
import PencilStrokeSvg from "../components/PencilStrokeSvg";
import Page3 from "../components/LandingPage/Page3";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
    return (
        <div className="relative">
            <div className="min-h-screen realtive flex gap-8 flex-col sm:grid grid-cols-2 grid-rows-2 w-screen p-4 pt-36" >
                <div className="col-span-1 row-start-1 row-end-2  row-span-1">
                    <ProductCard link={"/bugs/fix"}>
                        Fix your bugs with 
                        <Ratsi/>
                    </ProductCard>
                </div>
                <div className="col-span-1 row-start-1 row-end-2 row-span-1">
                    <ProductCard link={"/tutors"}>
                        Learn DSA with our <br /> AI Tutors
                    </ProductCard>
                </div>
                <div className="col-span-1 col-start-2 row-start-2  row-span-2">
                    <ProductCard link={"/talk_with_ratsi"}>
                        Talk with Ratsi
                    </ProductCard>
                </div>
                <div className="absolute top-40 z-[99999]">
                    <PencilStrokeSvg/>
                </div>
            </div>
            <div className="relative">
                <Page3/>
            </div>
        </div>
    )
}

export default AllProducts