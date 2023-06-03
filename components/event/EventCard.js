import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent } from '../../api/eventData';

function EventCard({ eventObj, onUpdate }) {
  const deleteSingleGame = () => {
    if (window.confirm(`Delete ${eventObj.game.title} game night?`)) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>Game night: {eventObj.game.title}</Card.Header>
      <Card.Body>
        <Card.Title>We will be meeting on {eventObj.date} at {eventObj.time}!</Card.Title>
        <Card.Text>{eventObj.description}</Card.Text>
      </Card.Body>
      <Card.Link href="/events/">Edit</Card.Link>
      <Card.Footer className="text-muted">Organized by: {eventObj.organizer.bio}</Card.Footer>
      <Link href={`/events/${eventObj.id}`} passHref>
        <Button type="button" className="m-2">Edit Event</Button>
      </Link>
      <Button type="button" className="m-2" onClick={deleteSingleGame}>Delete Event</Button>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.shape({
      title: PropTypes.string,
    }),
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.shape({
      bio: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
