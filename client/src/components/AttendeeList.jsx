import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AttendeeList = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchAttendees = () => {
    if (socket) {
      console.log("Fetching attendees...");
      socket.emit("joinEvent", eventId); 
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    const token = storedData ? JSON.parse(storedData).token : null; 

    if (token) {
      const socketInstance = io("http://localhost:5000", {
        query: { token: token },  
      });
      setSocket(socketInstance);

      socketInstance.on("attendeeList", (data) => {
        if (data.error) {
          console.error(data.error);
        } else {
         
          const currentUserEmail = JSON.parse(localStorage.getItem('userData'))?.email;
          const filteredAttendees = data.filter(attendee => attendee.email !== currentUserEmail);

          setAttendees(filteredAttendees);
        }
      });

      socketInstance.emit("joinEvent", eventId);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.error('Token not found in localStorage');
    }
  }, [eventId]); 

  return (
    <div>
      <h4>Attendees:</h4>
      {attendees.length > 0 ? (
        <ul>
          {attendees.map((attendee) => {
            const key = attendee._id || attendee.email; 
            return (
              <li key={key}>
                {attendee.email}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No attendees yet.</p>
      )}

      {/* <button onClick={fetchAttendees}>Get Attendees</button> */}
    </div>
  );
};

export default AttendeeList;


