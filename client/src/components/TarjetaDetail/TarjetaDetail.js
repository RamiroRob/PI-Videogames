import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import s from './TarjetaDetail.module.css';

export default function TarjetaDetail() {
    const { id } = useParams();
    const [videogame, setVideogame] = useState(null);

    useEffect(() => {
        const fetchVideogame = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/videogames/${id}`);
                setVideogame(response.data);
            } catch (error) {
                console.error('Error fetching videogame details:', error);
            }
        };

        fetchVideogame();
    }, [id]);

    function removeHtmlTags(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || div.innerText || '';
    }

// TODO: hay un problema con Genres. Los de la API vienen con .name pero en la base de datos con .nombre. Hay que ponerlo todo igual porque sino se rompe cuando quiero ver el detalle de genero de un juego de la database, busca .name y no lo encuentra. Creo que lo mejor seria modificar la propiedad de la API para que sea .nombre y asi no hay que modificar nada en el front.

    return (
        <div className={s.container}>
            <Link to="/home"> <button className={s.searchButton}>Volver</button> </Link>
            <h1 className={s.title}>Detalles de {videogame?.nombre} </h1>
            {videogame ? (
                <div className={s.detail}>
                    <h2 className={s.subtitle}>{videogame.nombre}</h2>
                    <img src={videogame.imagen} alt={videogame.nombre} />
                    <p className={s.content}><strong>Géneros:</strong> {videogame.genres?.map(g => g.name).join(', ')}</p>
                    <p className={s.content}><strong>Plataformas:</strong> {videogame.plataformas?.map(p => p.platform.name).join(', ')}</p>
                    <p className={s.content}><strong>Rating:</strong> {videogame.rating}</p>
                    <p className={s.content}><strong>Fecha de lanzamiento:</strong> {videogame.fecha_lanzamiento}</p>
                    <p className={s.content}><strong>Descripcion:</strong> {removeHtmlTags(videogame.descripcion)}</p>
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}
