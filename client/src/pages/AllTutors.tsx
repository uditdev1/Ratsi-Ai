import { useEffect } from "react";
import { topics } from "../components/Topics.ts";
import Tutor from "../components/Tutor.tsx";
import { useVerifyMe } from "../hooks/useVerifyMe.tsx";

const AllTutors = () => {
  const { verifyUser } = useVerifyMe();

  useEffect(() => {
    verifyUser();
  }, []);
  
  return (
    <div className="relative w-screen ">
      <div className="w-full pt-[6rem] flex justify-center items-center text-4xl p-6 font-bold text-slate-300">
        All DSA Tutors
      </div>
      <div className='min-h-screen w-full flex justify-center items-center gap-8 p-2 flex-wrap bg-zinc-950'>
          {
              topics.map( (topic : string , ind : any) => (
                  <Tutor index={ind} topic={topic} key={ind} />
              ))
          }
      </div>
    </div>
  )
}

export default AllTutors