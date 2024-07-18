import { TextareaAutosize, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { BackgroundCircles } from "./design/Hero";

import "../index.css";
import { redirect, useNavigate } from "react-router";
import Heading from "./Heading";

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

interface User {
  user_id?: number;
  firstname?: string;
  lastname?: string;
  address?: string;
  phonenumber?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
}

const ProfileEdit = () => {
  const [User, setUser] = useState<User>();

  const token = localStorage.getItem("jwt");
  const id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`http://localhost:8081/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => console.log(error));
  }, [id, token]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const navigate = useNavigate();
  const [Update, setUpdate] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      user_id: User?.user_id,
      firstname: User?.firstname,
      lastname: User?.lastname,
      address: User?.address,
      phonenumber: User?.phonenumber,
      email: User?.email,
      password: User?.password,
    };
    const token = localStorage.getItem("jwt");


    fetch("http://localhost:8081/user/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setUpdate(true);
          console.log("YAYYYYY SAVED");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const parallaxRef = useRef(null);

  return (
    <div className="flex justify-center items-center" ref={parallaxRef}>

      <form
        onSubmit={handleSubmit}
        className="bg-n-2 gap-4 border-n-1 rounded-xl flex flex-col items-center justify-center w-[32rem] h-[38rem] p-10"
      >
        { Update ?
        <div className="absolute top-[220px] left-[440px] font-grotesk text-sm font-semibold px-2 py-1 self-start rounded-full  text-white bg-green-400  ">
          
          Profile Updated Succesfully!         
          
          </div> : ""}

        <h1 className="h5 text-black font-bold mb-4">Profile Update</h1>
        {/* First and last name div */}
          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="firstname"
            type="text"
            value={User?.firstname || ""}
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
            value={User?.lastname || ""}
            onChange={handleChange}
            label="Last Name"
          />

          <TextField
            required
            className="pointer-events-auto rounded-xl w-[22rem]"
            variant="outlined"
            sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
            autoComplete="off"
            name="phonenumber"
            type="text"
            value={User?.phonenumber || ""}
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
            value={User?.address || ""}
            onChange={handleChange}
            label="Address"
          />
        <TextField
          required
          className="pointer-events-auto rounded-xl w-[22rem]"
          variant="outlined"
          sx={{ ...textFieldStyles.base, ...textFieldStyles.customTextField }}
          autoComplete="off"
          name="email"
          value={User?.email || ""}
          onChange={handleChange}
          label="Email"
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
};

export default ProfileEdit;
