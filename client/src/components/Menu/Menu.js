// components/Menu.js
import React from 'react';
import s from './Menu.module.css';
import { useNavigate } from 'react-router-dom';

function Menu({ onOptionClick }) {

  const navigate = useNavigate()

  return (
    <div className={s.menu}>
      <button onClick={() => onOptionClick('all')}>Buscar Juegos</button>
      {/* <button onClick={() => onOptionClick('search')} >Buscar juego </button> */}
      <button onClick={() => {onOptionClick('create'); navigate('/create-videogame')}}>Crear juego</button>
    </div>
  );
}

export default Menu;
