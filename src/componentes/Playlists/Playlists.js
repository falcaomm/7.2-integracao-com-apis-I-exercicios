import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";


function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const getAllPlaylists = () => {
        const url = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"
        const config = {
            headers: {
                Authorization: "manuela-falcao-barbosa"
            }
        }

        axios.get(url, config)
            .then((response) => {
                setPlaylists(response.data.result.list)
                console.log(response.data.result.list);; 
            })
            .catch((error) => {
                alert(error.response);
            })
    }

    useEffect(() => {
        getAllPlaylists()
    }, [])
  
    return (
        <div>
            {playlists.map((playlist) => {
                return<Musicas
                    key={playlist.id}
                    playlist={playlist} />
            })}

        </div>
    );
}

export default Playlists;
