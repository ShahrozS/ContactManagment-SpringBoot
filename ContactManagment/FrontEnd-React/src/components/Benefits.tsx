import { useEffect, useState } from "react";
import { benefits } from "../constants";
import BenefitCard from "./BenefitCard";
import Heading from "./Heading";
import Section from "./Section";
import Pagination from "./Pagination";

const Contacts = [
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 1,
    firstName: "John",
    lastName: "Doe",
    title: "Mr.",
    emails: [
      { Email: "john.doe@example.com", LabelEmail: "Personal" },
      { Email: "j.doe@work.com", LabelEmail: "Work" },
    ],
    phones: [
      { PhoneNumber: "123-456-7890", LabelPhone: "Mobile" },
      { PhoneNumber: "098-765-4321", LabelPhone: "Home" },
    ],
  },
  {
    contact_id: 2,
    firstName: "Jane",
    lastName: "Smith",
    title: "Ms.",
    emails: [{ Email: "jane.smith@example.com", LabelEmail: "Personal" }],
    phones: [{ PhoneNumber: "555-555-5555", LabelPhone: "Mobile" }],
  },
];

const Benefits = () => {
  // const [Contacts, setContacts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(6);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = Contacts.slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    fetch("http://localhost:8081/contacts/1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //    setContacts(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="All Your Contacts"
        />

        <div className="flex flex-wrap gap-10 mb-10">
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
