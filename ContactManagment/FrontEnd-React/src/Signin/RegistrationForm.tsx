import { TextareaAutosize, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { BackgroundCircles } from "../components/design/Hero";

import "../index.css";
import { redirect, useNavigate } from "react-router";
import Toast from "../components/Reusable/Toast";
import LoginHeading from "./LoginHeading";
import { RegistrationHalf } from "../assets";

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
  // Additional styles can be added as needed
  customTextField: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      appearance: "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
};
interface FormData {
  firstname: string;
  lastname: string;
  address: string;
  phonenumber: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const RegistrationForm = () => {

  const [showToast, setshowToast] = useState(false);
  const [ToastText, setToastText] = useState("");



  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    address: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password != formData.confirmpassword) {
      setToastText("Confirm Password Doesn't Match")
      setshowToast(true);
      console.log("NAHH");
      return;
    }

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      address: formData.address,
      phonenumber: formData.phonenumber,
      email: formData.email,
      password: formData.password,
    };
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:8081/auth/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setFormData({
            firstname: "",
            lastname: "",
            address: "",
            phonenumber: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
          console.log("YAYYYYY SAVED");
          navigate("/login");
        }
        if(res.status === 500)
        {
          setToastText("User Already Exists");
      setshowToast(true);
        
        }
      
        })
      .catch((e) => {
        console.log(e);
      });
  };

  const parallaxRef = useRef(null);

  return (
    <div className="flex  justify-center items-center " ref={parallaxRef}>
     
<img src={RegistrationHalf} width={690} height={40} alt="LoginHalf" />

     
     
     
      <form
        onSubmit={handleSubmit}
        className="    bg-rose-100 gap-4 border-n-1  flex flex-col items-center justify-center w-[1252px] h-[991px] p-10"
      >
      <LoginHeading className="h3 text-black  mb-5" text="Register" />

          {showToast && (
          <Toast
            onClose={() => setshowToast(false)}
            color="asdl"
            className=""
            text={ToastText}
          />
        )}


        {/* first and last name div  */}



        <div className="flex flex-row gap-5">
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            label="First Name"
          />
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            label="Last Name"
          />
        </div>

        <div className="flex flex-row gap-5">
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="phonenumber"
            type="number"
            value={formData.phonenumber}
            onChange={handleChange}
            label="Phone Number"
          />

          <TextField
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            label="Address"
          />
        </div>
        <TextField
          required
          className="pointer-events-auto rounded-xl w-[22rem]"
          variant="outlined"
          sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
          autoComplete="off"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
        />
        <div className="flex flex-row gap-5">
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
          />
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="confirmpassword"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
            label="Confirm Password"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className=" p-3 button-glow bg-n-6 hover:bg-n-8 rounded-lg"
          >
            Register
          </button>
          <a
            href="/login"
            className=" text-center p-3 button-glow bg-n-6 hover:bg-n-8 rounded-lg"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
