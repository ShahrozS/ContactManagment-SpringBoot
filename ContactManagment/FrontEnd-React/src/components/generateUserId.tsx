import { useEffect } from "react";

export function generateUserId() {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("jwt");
  var id = "1";
  useEffect(() => {
    fetch(`http://localhost:8081/user/find/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          id = data.id;
        } catch (e) {
          console.error("Failed to parse JSON:", e);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return id;
}
