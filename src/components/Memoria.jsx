import  { useState } from 'react';
import '../styles/Memoria.scss';

const Memoria = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'A', flipped: false, matched: false },
    { id: 2, name: 'A', flipped: false, matched: false },
    { id: 3, name: 'B', flipped: false, matched: false },
    { id: 4, name: 'B', flipped: false, matched: false },
    { id: 5, name: 'C', flipped: false, matched: false },
    { id: 6, name: 'C', flipped: false, matched: false },
    // Agrega más cartas si es necesario
  ]);

  const [flippedCards, setFlippedCards] = useState([]); // Cartas seleccionadas para comparar

  const handleFlip = (index) => {
    // Si la carta ya está volteada o ya hay 2 cartas volteadas, no hace nada
    if (cards[index].flipped || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true; // Voltea la carta seleccionada
    setCards(newCards); // Actualiza el estado de las cartas

    // Añade la carta volteada a la lista de cartas seleccionadas con su índice
    setFlippedCards([...flippedCards, { card: newCards[index], index }]);

    // Si ya hay una carta volteada, espera para comparar
    if (flippedCards.length === 1) {
      setTimeout(() => {
        checkMatch(newCards, flippedCards[0], { card: newCards[index], index });
      }, 1000);
    }
  };

  const checkMatch = (newCards, flippedCard1, flippedCard2) => {
    // Verifica si las dos cartas seleccionadas coinciden
    if (flippedCard1.card.name === flippedCard2.card.name) {
      newCards[flippedCard1.index].matched = true;
      newCards[flippedCard2.index].matched = true;
    } else {
      // Si no coinciden, se vuelven a voltear
      newCards[flippedCard1.index].flipped = false;
      newCards[flippedCard2.index].flipped = false;
    }

    setCards(newCards); // Actualiza el estado de las cartas después de la comparación
    setFlippedCards([]); // Reinicia la lista de cartas seleccionadas
  };

  return (
    <div className="memoria">
      <h1 className="memoria__titulo">Juego de Memoria</h1>
      <div className="memoria__grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memoria__card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="memoria__card-inner">
              <div className="memoria__card-front">?</div>
              <div className="memoria__card-back">{card.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memoria;
