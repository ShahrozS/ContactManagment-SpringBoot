import { useState } from "react";
import Heading from "./Heading";
import Section from "./Section";
import { TextField, Button, IconButton, colors } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";

const UnregsteredUsers = () => {
  const [inputPhone, setInputphone] = useState([
    { phonenumber: "", label: "" },
  ]);
  const [inputEmail, setInputemail] = useState([{ email: "", label: "" }]);

  // Add remove phone fields
  const handleAddPhone = () => {
    setInputphone([...inputPhone, { phonenumber: "", label: "" }]);
  };

  const handleRemovePhone = (index: number) => {
    const values = [...inputPhone];
    values.splice(index, 1);
    setInputphone(values);
  };

  //Add remove email feilds
  const handleAddEmail = () => {
    setInputemail([...inputEmail, { email: "", label: "" }]);
  };

  const handleRemoveEmail = (index: number) => {
    const values = [...inputEmail];
    values.splice(index, 1);
    setInputemail(values);
  };

  return (
    <Section className="flex flex-col items-center">
      <Heading className="md:max-w-md lg:max-w-2xl" title="Add a Contact" />{" "}
      <div>
        <form action="">
          <div className="flex gap-5">
            <TextField
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
              name="FirstName"
              label="First Name"
            />

            <TextField
              className="rounded-xl"
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
              name="LastName"
              label="Last Name"
            />

            <TextField
              className="rounded-xl  mr-2"
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
              name="Title"
              label="Title"
            />
          </div>

          <h6 className="mt-6 mb-6 h5">Phone Number</h6>

          <div className="">
            {inputPhone.map((phone, index) => (
              <div key={index} className="flex gap-5 mb-6">
                <TextField
                  name="PhoneNumber"
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
                  label="Phone number"
                  value={phone.phonenumber}
                />

                <TextField
                  name="Label"
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
                  label="Label"
                  value={phone.label}
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
                  name="Email"
                  label="Email"
                  value={email.email}
                />

                <TextField
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
                  name="Label"
                  label="Label"
                  value={email.label}
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
