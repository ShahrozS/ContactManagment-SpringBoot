import { useEffect, useState } from "react";
import { benefits } from "../constants";
import BenefitCard from "./BenefitCard";
import Heading from "./Heading";
import Section from "./Section";
import Pagination from "./Pagination";
import { Search } from "@mui/icons-material";
import { generateUserId } from "./generateUserId";
// const Contacts = [
//   {
//     contact_id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     title: "Mr.",
//     emails: [
//       { Email: "john.doe@example.com", LabelEmail: "Personal" },
//       { Email: "j.doe@work.com", LabelEmail: "Work" },
//     ],
//     phones: [
//       { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
//       { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
//     ],
//   },


interface Email {
  emailID: number;
  email: string;
  labelEmail: string; // Adjusted to camelCase for TypeScript convention
}

interface Phone {
  phoneId: number;
  phoneNumber: string;
  labelPhone: string; // Adjusted to camelCase for TypeScript convention
}

interface ContactProps {
  contact_id: number;
  firstName?: string;
  lastName?: string;
  title?: string;
  emails?: { Email: string; LabelEmail: string }[];
  phones?: { PhoneNumber: string; LabelPhone: string }[];
}

const Benefits = () => {
  const [contacts, setContacts] = useState<ContactProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [name, setName] = useState("");

  const token = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  console.log("token-->" + token);
  console.log("username: " + username);
  const id = generateUserId();
  console.log("generated id-->" + id);

  const fetchContacts = (url: string) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setContacts(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id !== "-") {
      fetchContacts(`http://localhost:8081/contacts/${id}`);
    }
  }, [id, token]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name === "") {
      fetchContacts(`http://localhost:8081/contacts/${id}`);
    } else {
      fetchContacts(`http://localhost:8081/contacts/search/${name}/${id}`);
    }
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = contacts.slice(firstPostIndex, lastPostIndex);
  return (
    <Section id="AllContacts">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="All Your Contacts"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center flex-col justify-center mb-6 relative "
        >
     <div>
          <input
            type="text"
            className=" rounded-full  h-10 w-[32rem] p-3 font-grotesk font-bold placeholder-n-6 text-n-6 bg-n-3 border-n-2"
            placeholder="Search..."
            onChange={(e) => setName(e.target.value)}
          />
          <button className="absolute right-[25rem] mt-2 " >
            <Search
              sx={{
                fontSize: "25px",
                fontFamily: "bold",
                color: "black",
              }}
            />
          </button>
          </div>
          <p className="font-mono  mr-64 text-n-3 text-xs mt-2">Search nothing to show all contacts.</p>
        </form>

        <div className="flex flex-wrap gap-10 mb-10 mt-10">
          {currentPosts.map((item) => (
            
            <BenefitCard id={item.contact_id} Contact={item} />
          ))}
        </div>
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPosts={contacts.length}
        postPerPage={postPerPage}
      />
    </Section>
  );
};

export default Benefits;
