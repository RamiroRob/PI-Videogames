// components/Menu.js
import React from 'react';
import s from './Menu.module.css';

function Menu({ onOptionClick }) {
  return (
    <div className={s.menu}>
      <button onClick={() => onOptionClick('all')}>Todos los juegos</button>
      <button onClick={() => onOptionClick('search')} >Buscar juego </button>
      <button onClick={() => onOptionClick('create')}>Crear juego</button>
    </div>
  );
}

export default Menu;
