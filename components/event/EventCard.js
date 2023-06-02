import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Link } from 'react-bootstrap';

const EventCard = ({ eventObj }) => (
  <Card className="text-center">
    <Card.Header>Game night: {eventObj.game}</Card.Header>
    <Card.Body>
      <Card.Title>We will be meeting on {eventObj.date} at {eventObj.time}!</Card.Title>
      <Card.Text>{eventObj.description}</Card.Text>
    </Card.Body>
    <Card.Link href="/events/">Edit</Card.Link>
    <Card.Footer className="text-muted">Organized by: {eventObj.organizer}</Card.Footer>
    <Link href={`/events/edit/${eventObj.id}`} passHref>
      <Button type="button" className="m-2">Edit Event</Button>
    </Link>
    <Button>Edit Event</Button>
  </Card>
);

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.number,
  }).isRequired,
};

export default EventCard;
