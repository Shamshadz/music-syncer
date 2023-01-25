import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
        const [guest_can_pause, setguest_can_pause] = useState("");
        const [votes_to_skip, setvotes_to_skip] = useState("");
        const navigate = useNavigate();

        function setCookie(cname, cvalue, exdays=10) {
                const d = new Date();
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 100);
                let expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
                let name = cname + "=";
                let ca = document.cookie.split(";");
                for (let i = 0; i < ca.length; i++) {
                        let c = ca[i];
                        while (c.charAt(0) == " ") {
                                c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                                return c.substring(name.length, c.length);
                        }
                }
                return "";
        }

        function checkCookie() {
                let session_key = getCookie("session_key");
                if (session_key != "") {
                        console.log("from checkCookie" + session_key);
                }
                return session_key;
        }

        const handleCreateForm = (e) => {
                e.preventDefault();
                let host = checkCookie() + "#";
                console.log("Returned session key : ",host);
                fetch("http://127.0.0.1:8000/api/create-room", {
                        headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify({
                                guest_can_pause: guest_can_pause,
                                votes_to_skip: votes_to_skip,
                                host: host,
                        }),
                })
                .then((response) => response.json())
                // .then((data) => navigate("/room/" + data.code));
                .then((data) =>{
                        // console.log(data),
                        // setSession_key(data.host),
                        navigate("/room/" + data.code);
                        setCookie("session_key", data.host, 10);
                        // console.log("Atfer post Req: " + data.host),
                });
        };

        return (
                <div>
                        <p>Create Room</p>
                        <form onSubmit={handleCreateForm}>
                                <p>Guest Control Of PlayBack State</p>
                                <input
                                        type="radio"
                                        value="True"
                                        onChange={(e) => setguest_can_pause(e.target.value)}
                                        name="Pause"
                                />
                                <label>Play/Pause</label>
                                <br />
                                <input
                                        type="radio"
                                        value="False"
                                        onChange={(e) => setguest_can_pause(e.target.value)}
                                        name="Pause"
                                />
                                <label>No Control</label>
                                <br />
                                <input
                                        type="integer"
                                        min="1"
                                        value={votes_to_skip}
                                        onChange={(e) => setvotes_to_skip(e.target.value)}
                                        required
                                />
                                <br />
                                <label>Votes Required to Skip Songs</label>
                                <br />
                                <input type="submit" value="Create" />
                        </form>
                        <input type="submit" value="Back" />
                </div>
        );
};

export default CreateRoomPage;
