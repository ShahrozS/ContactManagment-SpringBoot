import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegisteredUsers from "./components/RegisteredUsers";
import UnregsteredUsers from "./components/UnregsteredUsers";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <RegisteredUsers />
        <UnregsteredUsers />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
