import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, getOrganizers, updateEvent } from '../../api/eventData';
import { getGames } from '../../api/gameData';

const initialState = {
  gameId: 0,
  description: '',
  date: '',
  time: '',
  organizerId: 0,
};

const EventForm = ({ user, eventObj }) => {
  const [organizers, setOrganizers] = useState([]);
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getOrganizers().then(setOrganizers);
    getGames().then(setGames);
    if (eventObj.id) setCurrentEvent(eventObj);
  }, [eventObj]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: Number(currentEvent.gameId),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: Number(currentEvent.organizerId),
      userId: user.uid,
    };

    if (eventObj.id) {
      updateEvent(currentEvent)
        .then(() => router.push('/events'));
    } else {
      // Send POST request to your API
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="floatingSelect">
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="gameId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.gameId}
            required
          >
            <option value="">Select a Game</option>
            {games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                {game.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="floatingSelect">
          <Form.Label>Organizer</Form.Label>
          <Form.Select
            name="organizerId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.organizerId}
            required
          >
            <option value="">Select an Organizer</option>
            {organizers.map((organizer) => (
              <option
                key={organizer.uid}
                value={organizer.uid}
              >
                {organizer.bio}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {eventObj.id ? 'Update' : 'Create'} Event
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    game: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    organizer: PropTypes.number,
  }).isRequired,
};

export default EventForm;
