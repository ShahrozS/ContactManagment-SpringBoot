import { useEffect, useState } from "react";
import { benefits } from "../constants";
import Section from "./Section";
import UserCard from "./UserCard";
import { Search } from "@mui/icons-material";
import { generateUserId } from "./generateUserId";

interface UserProps{
  user_id:string ,
  email:string ,
  password:string,
  address:string ,
  firstname:string ,
  lastname:string ,
  phonenumber:string

}


const RegisteredUsers = () => {
  const [Name, setName] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(Name);
  };




  const token = localStorage.getItem("jwt");
  const fetchedid = generateUserId();
  console.log("+++"+fetchedid)
  useEffect(() => {
    fetch(`http://localhost:8081/user/find/all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json()) 
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data);
          setUsers(data);
        } else {
          console.error("Expected an array but gots:", data);
        }
      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <Section id="RegisteredUsers">
      <div className="container  relative z-2">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center mb-6 relative "
        >
          <input
            type="text"
            className=" rounded-full  h-10 w-[32rem] p-3 font-grotesk font-bold placeholder-n-6 text-n-6 bg-n-3 border-n-2"
            placeholder="Search by your Friend's name"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="absolute right-[25rem]">
            <Search
              sx={{
                fontSize: "25px",
                fontFamily: "bold",
                color: "black",
              }}
            />
          </button>
        </form>

        <div className="flex flex-wrap gap-10 mb-10">
          {users.map((item,index) => (
          item.user_id!=fetchedid? <UserCard
          key={index}
          user={item}
        />  : ""
          

          ))}
        </div>
      </div>
    </Section>
  );
};

export default RegisteredUsers;
