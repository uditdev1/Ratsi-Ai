import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {

    const clientId = import.meta.env.VITE_GOOGLE_SIGNIN_ID;
    const navigate = useNavigate();
    const [waiting , setWaiting] = useState<boolean>(false);

    const handleSuccess = async (credentialResponse : any) => {
        setWaiting(true);
        try {
            const res : any = await axios.post("/users/signin", {token : credentialResponse}) 
            localStorage.setItem("token" , res.data.token);
            localStorage.setItem("email" , res.data.email);
            navigate("/");
        } catch (err : any) {
            console.log("err", err);
        }
        setWaiting(false);
    }
    const handleError = () => {
        setWaiting(false);
    }

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/");
        }
    } , []);

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <GoogleOAuthProvider clientId={clientId} >
                {
                    waiting ?
                    <div className='text-4xl text-white bg-black' >
                        Loading...
                    </div>
                    :
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                }
            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleSignIn