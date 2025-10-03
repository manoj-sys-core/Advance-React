import { useEffect, useState } from "react";
import axios from 'axios';
export default function Axios() {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
    axios.get("https://dummyjson.com/users?limit=5")
    .then(response => {setUsers(response.data.users) 
        console.log(response.data.users)})
    .catch((err)=>console.log(err))
   },[])
  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Name:{user?.firstName}  {user?.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
