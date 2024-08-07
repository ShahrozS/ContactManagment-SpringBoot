import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Reusable/Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HambugerMenu } from "./design/Header";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [Options, setOptions] = useState(false);


  const navigate = useNavigate();

  const logout = () =>{
    localStorage.setItem("jwt","");
    localStorage.setItem("username","");
    localStorage.setItem("id","");
    

    const token = localStorage.getItem("jwt");
        
    fetch("http://localhost:8081/auth/logout",{
      headers:{
        method:"GET",
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
    }).then((res)=>{
      if(res.ok){
        console.log(res);
        navigate("/login");
            }
    })
    .catch((error)=>console.log(error));

   // 

  }



  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a onClick={()=>navigate("/")} className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
          </a>

        <nav
          className={`transform transition-all duration-500 ${
            openNavigation ? "flex" : "hidden"
          }     fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HambugerMenu />
        </nav>

        <a
          onClick={logout}
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
        Logout
        </a>
        {/* <Button className="hidden lg:flex" href="/register">
          Sign in
        </Button> */}


          <div>
            <IconButton onClick={()=>navigate("/profile")}>
            <AccountCircle className=" bg-white rounded-full"
            sx={{
                fontSize:"51px",
            }}
            />
            </IconButton>
{/*           
            <div className="absolute bg-n-3 w-[90px] h-[24px] ">

            <a href=""> Edit Profile </a>
            <a href="">Register</a>
            </div> */}


          </div>




        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
