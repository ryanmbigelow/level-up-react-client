import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleGame } from '../../api/gameData';

const NewGame = () => {
  const { user } = useAuth();
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setEditGame);
  }, [id]);
  return (
    <div>
      <h2>Register New Game</h2>
      <GameForm user={user} gameObj={editGame} />
    </div>
  );
};

export default NewGame;
