import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [artista, setArtista] = useState('')
    const [nomeMusica, setNomeMusica] = useState('')
    const [url, setUrl] = useState('')

    const getPlaylistTracks = (id) => {

        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`

        const config = {
            headers: {
                Authorization: "manuela-falcao-barbosa"
            }
        }

        axios
            .get(url, config)
            .then((response) => {
                setMusicas(response.data.result.tracks);
                getPlaylistTracks(props.playlist.id)
            })
            .catch((error) => {console.log(error.response); })
    }

    const addTrackToPlaylist = (id) => {

        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`
        const config = {
            headers: {
                Authorization: "manuela-falcao-barbosa"
            }
        }
        const body = {
            name: nomeMusica,
            artist: artista,
            url: url
        }

        axios
            .post(url, body, config)
            .then((response) => {
                console.log('foi');
            })
            .catch((error) => { console.log(error.response) })
        
        setArtista('')
        setNomeMusica('')
        setUrl('')
    }

    const removeTrackFromPlaylist = (id, trackId) => {

        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks/${trackId}`
        const config = {
            headers: {
                Authorization: "manuela-falcao-barbosa"
            }
        }

        axios
            .delete(url, config)
            .then((response) => {
                console.log('foi');
            })
            .catch((error) => { console.log("n foi") })

    }

    useEffect(() => {
        getPlaylistTracks(props.playlist.id)
    }, [])

    
    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button
                            onClick={() => {
                                removeTrackFromPlaylist(props.playlist.id, musica.id)
                            }}
                        >X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica
                    value={artista}
                    onChange={(e) => setArtista(e.target.value)}
                    placeholder="artista" />
                <InputMusica
                    value={nomeMusica}
                    onChange={(e) => setNomeMusica(e.target.value)}
                    placeholder="musica" />
                <InputMusica
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="url" />
                <Botao onClick={() => addTrackToPlaylist(props.playlist.id)}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

