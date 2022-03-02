import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { updateVolatile, selectEvents } from './features/events/eventsSlice';

import './App.css';

function App() {
  const events = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const updater = setInterval(() => {
      dispatch(updateVolatile());
    }, 5000);
    return () => clearInterval(updater);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventDrop={() => console.log('DROP')}
      eventReceive={() => console.log('RECEIVE')}
      editable={true}
    />
  );
}

export default App;
