import { useEffect, useState } from "react";

export function generateUserId() {
  const [userId, setUserId] = useState<string>("1");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwt");

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
        setUserId(data.user_id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    if (username && token) {
      fetchUserId();
    }
  }, [username, token]);

  return userId;
}
