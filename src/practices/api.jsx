import { useEffect, useState } from "react";

export default function Getapi() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users?page=1", {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        });

        const result = await res.json();
        console.log(result);
        setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Name:{user?.name} | Year: {user?.year}
          </li>
        ))}
      </ul>
    </div>
  );
}
