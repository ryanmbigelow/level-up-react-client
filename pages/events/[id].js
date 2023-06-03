import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleEvent } from '../../api/eventData';

const NewEvent = () => {
  const { user } = useAuth();
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);
  return (
    <div>
      <h2>Register New Event</h2>
      <EventForm user={user} eventObj={editEvent} />
    </div>
  );
};

export default NewEvent;
