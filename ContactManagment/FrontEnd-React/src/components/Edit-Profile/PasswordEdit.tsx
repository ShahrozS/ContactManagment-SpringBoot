import { TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import Header from "../Header";
import Toast from "../Reusable/Toast";

const PasswordEdit = () => {
    const textFieldStyles = {
        base: {
          "& .MuiInputBase-input": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
          "& .Mui-focused": {
            color: "black",
          },
        },
        customTextField: {
          width: "22rem", // Example additional custom style
        },
      };

      const [currentPassword, setcurrentPassword] = useState("");
      const [Password, setPassword] = useState("");
      const [ConfirmPassword, setConfirmPassword] = useState("");
      const [CheckPassword, setCheckPassword] = useState("");

      const [showToast, setshowToast] = useState(false);
      const [toastText, settoastText] = useState("");
      const [toastColor, settoastColor] = useState("");

      const token = localStorage.getItem("jwt");
      const id = localStorage.getItem("id");
      const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{

        e.preventDefault();
        //checking if the current password is correct:

        fetch(`http://localhost:8081/user/checkPassword/${currentPassword}/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then((res)=>res.text())
        .then((data)=>{
            
            if(data === "True"){
                
                if(Password === ConfirmPassword){

                    fetch(`http://localhost:8081/user/updatePassword/${Password}/${id}`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        },
                    }).then((res)=>res.text())
                    .then((data)=>{
                        if(data=="True"){
                            setshowToast(true);
                            settoastColor("successful");
                            settoastText("Password Updated!");
                        }
                    }).catch((error)=>console.log(error));



                }else{
                    setshowToast(true);
                    settoastColor("false");
                    settoastText("Confirm password does not match!");
                }
                


            }else{  
                setshowToast(true);
                settoastColor("false");
                settoastText("Current Password Wrong!");
                }

        })
        .catch((error)=>console.log(error));

      

      }

      




    return (
        <div className="flex justify-center items-center" >
          
          
          <form
            onSubmit={handleSubmit}
            className="bg-n-2 gap-4 border-n-1 rounded-xl flex flex-col items-center justify-center w-[32rem] h-[32rem] p-10"
          >
               {showToast && <Toast
        className=""
            onClose={()=>setshowToast(false)}
            text={toastText}
            color={toastColor}
            />}
        <h1 className="h5 text-black font-bold ">Password Update</h1>
     

            {/* First and last name div */}
              <TextField
                required
                className="pointer-events-auto rounded-xl w-[22rem]"
                variant="outlined"
                sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
                autoComplete="off"
                name="firstname"
                type="text"
                value={currentPassword}
                onChange={(e)=>setcurrentPassword(e.target.value)}
                label="Current Password"
              />
              <TextField
                required
                className="pointer-events-auto rounded-xl w-[22rem]"
                variant="outlined"
                sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
                autoComplete="off"
                name="lastname"
                type="text"
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                label="New Password"
              />

<TextField
                required
                className="pointer-events-auto rounded-xl w-[22rem]"
                variant="outlined"
                sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
                autoComplete="off"
                name="phonenumber"
                type="text"
                value={ConfirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                label="Confirm Password"
              />
    
         
      
      
            <div className="flex gap-2">
              <a
                href="/"
                className="text-center p-3 button-glow bg-n-6 hover:bg-n-8 rounded-lg"
              >
                Home
              </a>
              <button
                type="submit"
                className="p-3 button-glow bg-n-6 hover:bg-n-8 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      );
}

export default PasswordEdit;