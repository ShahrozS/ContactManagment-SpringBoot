import { TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Reusable/Toast";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  localStorage.setItem("jwt", "");
  localStorage.setItem("username", "");
  localStorage.setItem("id","");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [toastText, setToastText] = useState("");
  const [showToast, setShowToast] = useState(false);

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
      username: formData.email,
      password: formData.password,
    };

    fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 401) {
          setShowToast(true);
          setToastText("Wrong Credentials");
        }
        if (res.status === 404) {
          setShowToast(true);
          setToastText("Please Register First");
        }
        throw new Error("Unhandled response status: " + res.status);
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("time",data.expiresIn)
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-n-2 gap-4 border-n-1 rounded-xl flex flex-col items-center justify-center w-[32rem] h-[22rem] p-10"
      >
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            color="asdl"
            className=""
            text={toastText}
          />
        )}
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
          label="Email or Phone Number"
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
