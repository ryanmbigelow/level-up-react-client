import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../api/gameData';

function Home() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const getAllTheGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getAllTheGames();
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <article className="games">
        <h1>Games</h1>
        {games.map((game) => (
          <section key={`game--${game.id}`} className="game">
            <GameCard gameObj={game} onUpdate={getAllTheGames} />
          </section>
        ))}
      </article>
    </>
  );
}

export default Home;
