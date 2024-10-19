import { useState, useEffect } from 'react';
import '../styles/Memoria.scss';

const Memoria = () => {
    const [cards, setCards] = useState([
        { id: 1, name: 'A', flipped: false, matched: false },
        { id: 2, name: 'A', flipped: false, matched: false },
        { id: 3, name: 'B', flipped: false, matched: false },
        { id: 4, name: 'B', flipped: false, matched: false },
        { id: 5, name: 'C', flipped: false, matched: false },
        { id: 6, name: 'C', flipped: false, matched: false },
        { id: 7, name: 'D', flipped: false, matched: false },
        { id: 8, name: 'D', flipped: false, matched: false },
        { id: 9, name: 'E', flipped: false, matched: false },
        { id: 10, name: 'E', flipped: false, matched: false },
        { id: 11, name: 'F', flipped: false, matched: false }, 
        { id: 12, name: 'F', flipped: false, matched: false },
    ]);

    const [flippedCards, setFlippedCards] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [hasWon, setHasWon] = useState(false);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Iniciar el temporizador cuando el jugador voltee la primera carta
    useEffect(() => {
        let interval;
        if (isActive && !hasWon) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        if (hasWon) {
            clearInterval(interval); // Detener el temporizador al ganar
        }
        return () => clearInterval(interval);
    }, [isActive, hasWon]);

    // Iniciar el temporizador cuando el jugador voltee la primera carta
    useEffect(() => {
        if (attempts === 1) {
            setIsActive(true);
        }
    }, [attempts]);

    const handleFlip = (index) => {
        if (cards[index].flipped || flippedCards.length === 2 || hasWon) return;

        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);

        setFlippedCards([...flippedCards, { card: newCards[index], index }]);

        if (flippedCards.length === 1) {
            setTimeout(() => {
                checkMatch(newCards, flippedCards[0], { card: newCards[index], index });
                setAttempts((prevAttempts) => prevAttempts + 1);
            }, 1000);
        }
    };

    const checkMatch = (newCards, flippedCard1, flippedCard2) => {
        if (flippedCard1.card.name === flippedCard2.card.name) {
            newCards[flippedCard1.index].matched = true;
            newCards[flippedCard2.index].matched = true;
        } else {
            newCards[flippedCard1.index].flipped = false;
            newCards[flippedCard2.index].flipped = false;
        }

        setCards(newCards);
        setFlippedCards([]);

        // Verificar si todas las cartas están emparejadas
        if (newCards.every((card) => card.matched)) {
            setHasWon(true); // El jugador ha ganado
            setIsActive(false); // Detener el temporizador
        }
    };

    const handleReset = () => {
        const resetCards = cards.map((card) => ({
            ...card,
            flipped: false,
            matched: false,
        }));
        setCards(resetCards);
        setFlippedCards([]);
        setAttempts(0);
        setHasWon(false);
        setTime(0);
        setIsActive(false);
    };

    return (
        <div className="memoria">
            <h1 className="memoria__titulo">Juego de Memoria</h1>
            <div className="memoria__contador">Intentos: {attempts}</div>
            <div className="memoria__tiempo">Tiempo: {time} segundos</div> {/* Mostrar el tiempo en la interfaz */}
            <button className="memoria__reset" onClick={handleReset}>Reiniciar Juego</button>

            {hasWon ? (
                <div className="memoria__victoria">¡Victoria! 🎉</div> // Mostrar la pantalla de victoria
            ) : (
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
            )}
        </div>
    );
};

export default Memoria;
