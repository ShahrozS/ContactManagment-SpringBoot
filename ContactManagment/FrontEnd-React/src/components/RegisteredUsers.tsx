import { benefits } from "../constants";
import Section from "./Section";
import UserCard from "./UserCard";

const RegisteredUsers = () => {
  return (
    <Section>
      <div className="container relative z-2">
        <div>Search</div>

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
