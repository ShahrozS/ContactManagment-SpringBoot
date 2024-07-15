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
//   {
//     contact_id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     title: "Ms.",
//     emails: [{ Email: "jane.smith@example.com", LabelEmail: "Personal" }],
//     phones: [{ PhoneNumber: "555-555-5555", LabelPhone: "Mobile" }],
//   },
// ];

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
  const [Contacts, setContacts] = useState<ContactProps[]>([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(6);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = Contacts.slice(firstPostIndex, lastPostIndex);

  const [Name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(Name);
  };

  const token = localStorage.getItem("jwt");
  const username = localStorage.getItem("username");
  console.log("tokem-->" + token);
  console.log("username: " + username);
  const id = generateUserId();
  console.log("generated id-->" + id);
  
    useEffect(() => {

  if(id!="-"){

      fetch(`http://localhost:8081/contacts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
          try {
            const jsonData = JSON.parse(data);
            console.log(jsonData);
            setContacts(jsonData);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
          }
        })
        .catch((e) => console.log(e));
  
      }
      }, [id,token]);
  
  
 

  return (
    <Section id="AllContacts">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="All Your Contacts"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center mb-6 relative "
        >
          <input
            type="text"
            className=" rounded-full  h-10 w-[32rem] p-3 font-grotesk font-bold placeholder-n-6 text-n-6 bg-n-3 border-n-2"
            placeholder="Search..."
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

        <div className="flex flex-wrap gap-10 mb-10 mt-10">
          {currentPosts.map((item) => (
            <BenefitCard id={item.contact_id} Contact={item} />
          ))}
        </div>
      </div>

      <Pagination
        setCurrentPage={setcurrentPage}
        currentPage={currentPage}
        totalPosts={Contacts.length}
        postPerPage={postPerPage}
      />
    </Section>
  );
};

export default Benefits;
