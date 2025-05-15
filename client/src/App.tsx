import React from "react";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";
import AppBar from "./components/AppBar";


const App: React.FC = () => {
    return (
      <div className="relative bg-zinc-950 h-fit w-screen">
        <div className="footer absolute p-4">
          <AppBar/>
        </div>
        <AppRoutes/>
        <div className="footer z-[99999] relative p-4">
          <Footer/>
        </div>
      </div>
    );
};

export default App;
