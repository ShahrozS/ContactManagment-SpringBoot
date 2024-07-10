import { TextField, Button } from "@mui/material";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundCircles } from "../components/design/Hero";
import "../index.css";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  localStorage.setItem("jwt", "");
  localStorage.setItem("username", "");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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

    const data = {
      email: formData.email,
      password: formData.password,
    };
    const token = localStorage.getItem("jwt");

    fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("jwt", data.jwtToken);
        localStorage.setItem("username", data.username);

        navigate("/home");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to the registration page
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-n-2 gap-4 border-n-1 rounded-xl flex flex-col items-center justify-center w-[32rem] h-[22rem] p-10"
      >
        <TextField
          required
          className="pointer-events-auto rounded-xl w-[22rem]"
          variant="outlined"
          sx={{
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
          }}
          autoComplete="off"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
        />
        <TextField
          required
          className="pointer-events-auto rounded-xl w-[22rem]"
          variant="outlined"
          sx={{
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
          }}
          autoComplete="off"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="button-glow p-2 pointer-events-auto bg-n-6 hover:bg-n-8 rounded-lg"
          >
            Login
          </button>
          <a
            href="/register"
            className=" text-center p-2 button-glow bg-n-6 hover:bg-n-8 rounded-lg"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
