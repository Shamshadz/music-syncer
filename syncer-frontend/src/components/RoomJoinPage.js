import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const RoomJoinPage = () =>{

        const [RoomCode,setRoomCode] = useState('');
        const [Error,setError] = useState('');
        const navigate = useNavigate()

        const getJoinCode = () =>{
                console.log(RoomCode);
                fetch("http://127.0.0.1:8000/api/join-room",{
                        method:"POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({
                                code:RoomCode + '#',
                                host:"host#",
                        }),
                }).then((Response) => {
                        if(Response.ok) {
                                navigate(`/room/${RoomCode}`);
                        }else{
                                setError({error:"Room not found."});
                        }
                })
                .catch((error) => {
                        console.log(error);
                });
        }

        const getHome = () =>{
                navigate('/');
        }


        return(
                <div>
                    <p>Join Room</p>
                    <input placeholder="Enter a Room Code" value={RoomCode} onChange={(e) => setRoomCode(e.target.value)}/>
                    <br></br>
                    <input type="submit" value="Join" onClick={getJoinCode}/>
                    <br></br>
                    <button onClick={getHome}>Back</button>
                </div>
        );
}

export default RoomJoinPage;