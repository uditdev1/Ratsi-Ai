import { Routes, Route } from 'react-router-dom'
import { topics } from './Topics'
import Chat from '../pages/Chat'
import AllTutors from '../pages/AllTutors'
import LandingPage from '../pages/LandingPage'
import GoogleSignIn from '../pages/GoogleSignIn'
import AllProducts from '../pages/AllProducts'
import ImageResponse from '../pages/ImageResponse'
import AudioResponse from '../pages/AudioResponse'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/products" element={<AllProducts/>}/>
        <Route path='/tutors' element={<AllTutors/>} />
        {
          topics.map( (topic , ind) => (
                <Route path={"/" + topic} key={ind} element={< Chat topic={topic} />} />
              ))
            }
        <Route path="/signin" element={<GoogleSignIn/>}/>
        <Route path="/bugs/fix" element={<ImageResponse/>}/>
        <Route path="/talk_with_ratsi" element={<AudioResponse/>}/>
        <Route path="*" element={<LandingPage/>}/>
    </Routes>
  )
}

export default AppRoutes