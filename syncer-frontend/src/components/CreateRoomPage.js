import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {

        const [guest_can_pause, setguest_can_pause] = useState('');
        const [votes_to_skip, setvotes_to_skip] = useState('');
        const navigate = useNavigate()

        const handleCreateForm = (e) =>{
                e.preventDefault()
                fetch("http://127.0.0.1:8000/create-room",{
                        headers:{
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        method:'POST',
                        body: JSON.stringify({
                                guest_can_pause:guest_can_pause,
                                votes_to_skip:votes_to_skip,
                        }) 
                })
                .then((response) => response.json())
                .then((data) => navigate("/room/" + data.code));
        }

        return (
                <div>
                        <p>Create Room</p>
                        <form onSubmit={handleCreateForm} >
                                <p>Guest Control Of PlayBack State</p>
                                <input type="radio" value="True"  onChange={(e) => setguest_can_pause(e.target.value)} name="Pause"/>
                                <label>Play/Pause</label>
                                <br/>
                                <input type="radio" value="False" onChange={(e) => setguest_can_pause(e.target.value)} name="Pause"/>
                                <label>No Control</label>
                                <br/>
                                <input type="integer" min="1" value={votes_to_skip} onChange={(e) => setvotes_to_skip(e.target.value)} required />
                                <br/>
                                <label>Votes Required to Skip Songs</label>
                                <br/>
                                <input type="submit"value="Create" />
                        </form>
                        <input type="submit" value="Back" />
                </div>
        );

}

export default CreateRoomPage;