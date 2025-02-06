import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const EventPage = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const socket = io('http://localhost:5000', {
    query: {
      token: localStorage.getItem('userData'), 
    }
  });

  useEffect(() => {
    socket.emit('joinEvent', eventId);
    socket.on('attendeeList', (data) => {
      if (data.error) {
        console.log(data.error); 
      } else {
        setAttendees(data);  
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [eventId]);  

  return (
    <div>
      <h3>Event Attendees</h3>
      <ul>
        {attendees.length > 0 ? (
          attendees.map((attendee, index) => (
            <li key={index}>{attendee.email}</li>  
          ))
        ) : (
          <li>No attendees yet.</li>
        )}
      </ul>
    </div>
  );
};

export default EventPage;
