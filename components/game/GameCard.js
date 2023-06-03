import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const GameCard = ({ gameObj }) => (
  <Card className="text-center">
    <Card.Header>{gameObj.title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {gameObj.maker}</Card.Title>
      <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
      <Card.Text>Game Type: {gameObj.game_type}</Card.Text>

    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
    <Link href={`/games/${gameObj.id}`} passHref>
      <Button type="button" className="m-2">Edit Game</Button>
    </Link>
  </Card>
);

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.number,
  }).isRequired,
};

export default GameCard;
