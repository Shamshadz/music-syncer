import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";

const Room = () =>{

    const { roomCode } = useParams();
    const [VotesToSkip, setVotesToSkip] = useState('2');
    const [guestCanPause, setguestCanPause] = useState('False');
    const [isHost,setisHost] = useState('False');

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/get-room?code=${roomCode}`)
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