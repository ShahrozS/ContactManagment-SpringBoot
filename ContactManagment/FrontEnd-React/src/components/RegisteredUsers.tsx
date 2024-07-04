import { useState } from "react";
import { benefits } from "../constants";
import Section from "./Section";
import UserCard from "./UserCard";
import { Search } from "@mui/icons-material";
const RegisteredUsers = () => {
  const [Name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(Name);
  };
  return (
    <Section>
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
          {benefits.map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              backgroundUrl={item.backgroundUrl}
              iconUrl={item.iconUrl}
              title={item.title}
              text={item.text}
              light={item.light}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default RegisteredUsers;
