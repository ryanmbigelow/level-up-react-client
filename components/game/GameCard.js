import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteGame } from '../../api/gameData';

function GameCard({ gameObj, onUpdate }) {
  const deleteSingleGame = () => {
    if (window.confirm(`Delete ${gameObj.title}?`)) {
      deleteGame(gameObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{gameObj.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {gameObj.maker}</Card.Title>
        <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
        <Card.Text>Game Type: {gameObj.game_type.label}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
      <Link href={`/games/${gameObj.id}`} passHref>
        <Button type="button" className="m-2">Edit Game</Button>
      </Link>
      <Button type="button" className="m-2" onClick={deleteSingleGame}>Delete Game</Button>
    </Card>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
