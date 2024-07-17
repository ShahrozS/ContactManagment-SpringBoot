import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import { TextField, Button, IconButton, colors } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import Toast from "./Toast";
import { generateUserId } from "./generateUserId";
import { redirect, useNavigate } from "react-router";

type PhoneInput = {
  PhoneNumber: string;
  LabelPhone: string;
};
type User = {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  profilePictureId: string;
};

type EmailInput = {
  Email: string;
  LabelEmail: string;
};

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
}

const UnregsteredUsers = () => {
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(false);

  const [inputPhone, setInputphone] = useState<PhoneInput[]>([
    { PhoneNumber: "", LabelPhone: "" },
  ]);
  const [inputEmail, setInputemail] = useState<EmailInput[]>([
    { Email: "", LabelEmail: "" },
  ]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    title: "",
  });

  const [user, setUser] = useState();

  // Add remove phone fields
  const handleAddPhone = () => {
    setInputphone([...inputPhone, { PhoneNumber: "", LabelPhone: "" }]);
  };

  const handleRemovePhone = (index: number) => {
    const values = [...inputPhone];
    values.splice(index, 1);
    setInputphone(values);
  };

  //Add remove email feilds
  const handleAddEmail = () => {
    setInputemail([...inputEmail, { Email: "", LabelEmail: "" }]);
  };

  const handleRemoveEmail = (index: number) => {
    const values = [...inputEmail];
    values.splice(index, 1);
    setInputemail(values);
  };

  const handlePhoneChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    // Remove everything except digits

    let cleanedValue = value;
    if (name === "PhoneNumber") {
      cleanedValue = value.replace(/\D/g, "");
    }
    console.log(name + " --- " + value);
    const updatedValues = [...inputPhone];
    updatedValues[index] = {
      ...updatedValues[index],
      [name]: cleanedValue,
    };

    setInputphone(updatedValues);
  };

  const handleEmailChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedEmails = [...inputEmail];
    updatedEmails[index] = {
      ...updatedEmails[index],
      [name]: value,
    };
    setInputemail(updatedEmails);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // FETCHING USER
  const fetchedid = generateUserId();
  
  
  console.log(fetchedid);
  const token = localStorage.getItem("jwt");
  
  useEffect(()=>{
    fetch(`http://localhost:8081/user/${fetchedid}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) =>
        
        {
          console.log("--->" + JSON.stringify(data));
          setUser(data)


        }).then((resp)=>{
            console.log(resp);
        })
      .catch((e) => {
        console.log("MASLAAAA");
        console.log(e);
      });
  },[token,fetchedid]); 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const data = {
      owner: user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: formData.title,
      emails: inputEmail,
      phones: inputPhone,
    };
    console.log("USER IS HERE?==> " + JSON.stringify(user));
    console.log("Data looks smth like this rn : " + JSON.stringify(data));
    fetch("http://localhost:8081/contacts", {
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
          setShowToast(true);

        }
        setFormData({
          firstName: "",
          lastName: "",
          title: "",
        });
        setInputemail([{ Email: "", LabelEmail: "" }]);

        setInputphone([{ PhoneNumber: "", LabelPhone: "" }]);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        return res.json();

      }).then((data)=>{
        console.log("THis is the saved data----> "+JSON.stringify(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // fetch query

  return (
    <Section id="UnregisteredUsers" className="flex flex-col items-center">
      <Heading className="md:max-w-md lg:max-w-2xl" title="Add a Contact" />{" "}
      {/* Message Toast */}
      {showToast && (
        <Toast
          color="successful"
          text="Contact Saved Successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
      {error && (
        <Toast
          color="error"
          text="Contact Saved Successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <TextField
              required
              className="rounded-xl  border-white mr-2"
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .Mui-focused": {
                  color: "white",
                },
              }}
              name="firstName"
              label="First Name"
              autoComplete="off"
              value={formData.firstName}
              onChange={handleChange}
            />

            <TextField
              required
              className="rounded-xl"
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .Mui-focused": {
                  color: "white",
                },
              }}
              autoComplete="off"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              label="Last Name"
            />

            <TextField
              required
              className="rounded-xl  mr-2"
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .Mui-focused": {
                  color: "white",
                },
              }}
              autoComplete="off"
              name="title"
              value={formData.title}
              onChange={handleChange}
              label="Title"
            />
          </div>

          <h6 className="mt-10 mb-6 h5">Phone Number</h6>

          <div className="">
            {inputPhone.map((phone, index) => (
              <div key={index} className="flex gap-5 mb-6">
                <TextField
                  required
                  variant="outlined"
                  name="PhoneNumber"
                  type="tel"
                  inputProps={{
                    maxLength: 11,
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .Mui-focused": {
                      color: "white",
                    },
                  }}
                  autoComplete="off"
                  label="Phone number"
                  value={phone.PhoneNumber}
                  onChange={(event) => handlePhoneChange(index, event)}
                />

                <TextField
                  required
                  variant="outlined"
                  name="LabelPhone"
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .Mui-focused": {
                      color: "white",
                    },
                  }}
                  autoComplete="off"
                  label="Label"
                  value={phone.LabelPhone}
                  onChange={(event) => handlePhoneChange(index, event)}
                />
                <div className="flex">
                  {inputPhone.length > 1 ? (
                    <IconButton
                      sx={{ color: "black" }}
                      onClick={() => handleRemovePhone(index)}
                    >
                      <Remove className="bg-red-200 rounded-full" />
                    </IconButton>
                  ) : (
                    ""
                  )}

                  <IconButton
                    sx={{
                      color: "black",
                      borderColor: "white",
                    }}
                    onClick={() => handleAddPhone()}
                  >
                    <Add className="bg-green-200  rounded-full" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-6 mb-6 h5">Email</h2>

          <div>
            {inputEmail.map((email, index) => (
              <div key={index} className="flex gap-5 mb-4">
                <TextField
                  type="email"
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .Mui-focused": {
                      color: "white",
                    },
                  }}
                  autoComplete="off"
                  name="Email"
                  label="Email"
                  value={email.Email}
                  onChange={(event) => handleEmailChange(index, event)}
                />

                <TextField
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .Mui-focused": {
                      color: "white",
                    },
                  }}
                  autoComplete="off"
                  name="LabelEmail"
                  label="Label"
                  value={email.LabelEmail}
                  onChange={(event) => handleEmailChange(index, event)}
                />

                {/* Email */}

                <div className="flex">
                  {inputEmail.length > 1 ? (
                    <IconButton
                      sx={{ color: "black" }}
                      onClick={() => handleRemoveEmail(index)}
                    >
                      <Remove className="bg-red-200 rounded-full" />
                    </IconButton>
                  ) : (
                    ""
                  )}

                  <IconButton
                    sx={{
                      color: "black",
                      borderColor: "white",
                    }}
                    onClick={() => handleAddEmail()}
                  >
                    <Add className="bg-green-200  rounded-full" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>

          <Button variant="contained" color="primary" type="submit">
            Add Contact!
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default UnregsteredUsers;
