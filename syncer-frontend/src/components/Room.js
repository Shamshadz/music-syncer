import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { checkCookie, setCookie, getCookie } from "../js/CookieSetup";

const Room = () =>{

    const { roomCode } = useParams();
    const [VotesToSkip, setVotesToSkip] = useState('2');
    const [guestCanPause, setguestCanPause] = useState('False');
    const [isHost,setisHost] = useState('False');

    

    useEffect(() => {

        let host = checkCookie() + "#";
        console.log("Returned session key : ",host);
        fetch(`http://127.0.0.1:8000/api/get-room?code=${roomCode}`, {
            headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                    code:roomCode + "#",
                    host:host,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setVotesToSkip(data.votes_to_skip);
            setguestCanPause(data.guest_can_pause);
            setisHost(data.is_host);
            console.log(data.is_host);
        });

    }, [roomCode]);

    return(
        <div>
            <p>Room Code : {roomCode}</p>
            <p>Guest Can Pause:{guestCanPause.toString()}</p>
            <p>Votes to Skip :{VotesToSkip.toString()} </p>
            <p>Is Host: {isHost.toString()}</p>
        </div>
    );
}

export default Room;