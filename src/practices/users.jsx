import { useEffect, useState } from "react";

export default function Users(){
    let[users,setusers]= useState([])
    useEffect(()=>{
        const getdata = async()=>{
            try{
                const res = await fetch("https://dummyjson.com/users?limit=5")
                const data = await res.json()
                console.log(data)
                setusers(data.users)
            }
            catch(err){
                console.log(err)
            }
        }
        getdata()
    },[])
    return(
        <>
        <ol>
            {users.map((items)=>(
                <li key={items.id}>{items?.firstName} {items?.lastName}
                <img src={items?.image} alt="userImage" 
                 style={{ borderRadius: "50%", width: "50px", height: "50px", marginLeft: "10px" }} />
                <ul>
                    <li>{items?.birthDate}</li>
                    <li>{items?.age}</li>
                    <li>{items?.gender}</li>
                    <li>{items?.email}</li>
                    <li>{items?.address?.address}</li>
                </ul>
                </li>  
            ))}
        </ol>
        </>
    )
}