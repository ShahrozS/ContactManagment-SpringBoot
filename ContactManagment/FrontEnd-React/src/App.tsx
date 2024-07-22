import { useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegisteredUsers from "./components/RegisteredUsers";
import UnregsteredUsers from "./components/UnregsteredUsers";
import { useNavigate } from "react-router";

const App = () => {

  


  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  useEffect(()=>{

    fetch("http://localhost:8081/auth/current-user",{
      headers:{
        method:"GET",
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    }).then((res)=>{

      if(res.status === 403 || res.status === 401)
        navigate("/login");


      // if(res.status === 401 || res.status === 403){

      //   navigate("/login");


      // }else{

      // }
    })
    .catch((error)=>console.log(error));


  },[token])



  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <RegisteredUsers />
        <UnregsteredUsers />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
