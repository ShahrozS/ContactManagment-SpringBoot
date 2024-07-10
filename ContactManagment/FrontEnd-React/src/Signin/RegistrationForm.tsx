import { TextareaAutosize, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { BackgroundCircles } from "../components/design/Hero";

import "../index.css";
import { redirect, useNavigate } from "react-router";

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
    width: "22rem", // Example additional custom style
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
      console.log("NAHH");
      return;
    }
    console.log("Shouldntrun ");

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      address: formData.address,
      phonenumber: formData.phonenumber,
      email: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:8081/user/save", {
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const parallaxRef = useRef(null);

  return (
    <div className="flex  justify-center items-center " ref={parallaxRef}>
      <form
        onSubmit={handleSubmit}
        className="  bg-n-2 gap-4 border-n-1 rounded-xl flex flex-col items-center justify-center w-[52rem] h-[32rem] p-10"
      >
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
            type="text"
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
