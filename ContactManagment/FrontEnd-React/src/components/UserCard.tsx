import React, { useState, CSSProperties, useEffect } from "react";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";


interface User{
  user_id:string ,
  email:string ,
  password:string,
  address:string ,
  firstname:string ,
  lastname:string ,
  phonenumber:string

}

interface UserCardProps {
  key: number;
  user?: User;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
}) => {
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [isFriend,setIsFriend] = useState(false);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    const rotateX = (deltaY / centerY) * -15; // Adjust the -15 to control the tilt amount
    const rotateY = (deltaX / centerX) * 15; // Adjust the 15 to control the tilt amount

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
    });
  };



  





  const [LoggedIn, setLoggedIn] = useState<User>();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwt");





  const owner_id = localStorage.getItem("id");

  const data = {
    "owner_id": owner_id,
    "friend_id": user?.user_id,
  }

  useEffect(() => {
    fetch(`http://localhost:8081/contacts/findByOwnerAndFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((resp) => {
        console.log("data==>", resp); 
        if(resp!=null){
          setIsFriend(true);
        }
        return resp; 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [owner_id,user]);


  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://localhost:8081/user/find/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLoggedIn(data);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    if (username && token) {
      fetchUserId();
    }
  }, [username, token]);



  const handleAddFriend = () =>{

    const data = {

      owner:LoggedIn,
      friend:user,
      firstName:user?.firstname,
      lastName:user?.lastname,
      title:"Mr/Ms",
      emails: [{Email: user?.email, LabelEmail:"Personal"}],
      phones:[{PhoneNumber:user?.phonenumber,LabelPhone:"Personal"}],

    }

    fetch(`http://localhost:8081/contacts/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),

    }).then((res)=>{
      if(res.ok){
        setShowAddedMessage(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      
      console.log(res)})
    .then((fetched)=>console.log(fetched))
    .catch((error)=>console.log(error));




  }



  return (
    <div
      className="block rounded-lg bg-n-2 relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] card-container"
      style={{
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative rounded-lg   bg-n-7 z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
      {showAddedMessage && (
          <div className="absolute rounded-full top-3 right-3 pr-2 pl-2 bg-green-500 text-white uk-animation-slide-right">
            Added!
          </div>
        )}
<h5 className="h5 mb-5">
  {user?.firstname}
  &nbsp;
  {user?.lastname}
</h5>


<p className="body-2 mb-6 text-n-3">{user?.address}</p>
<p className="body-2 mb-6 text-n-3">{user?.phonenumber}</p>



        <div className="flex items-center mt-auto">
          {isFriend?<button disabled onClick={handleAddFriend} className="bg-n-3 px-2 py-2 pl-5 pr-5 rounded-xl ml-auto font-code text-lg font-extrabold pointer-events-auto text-n-7 uppercase tracking-wider">
          Friends!
          </button>:<button   onClick={handleAddFriend} className="bg-n-3 px-2 py-2 pl-5 pr-5 rounded-xl ml-auto font-code text-lg font-extrabold pointer-events-auto text-n-7 uppercase tracking-wider">
            Add Friend!
          </button>}
          


        </div>
      </div>


      <div
        className="absolute rounded-lg inset-0.5 bg-n-8"
        style={{ clipPath: "url(#Users)" }}
      ></div>
    </div>
  );
};

export default UserCard;


