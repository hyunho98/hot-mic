import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import EventList from '../pages/EventList'
import Event from '../pages/Event'
import MyEvents from '../pages/MyEvents'
import NavBar from './NavBar'
import EventForm from './EventForm'
import '../App.css'

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState(null)

  useEffect(() => {
    fetch('/me')
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data)
          })
        }
      })
    fetch('/events')
      .then((response) => response.json())
      .then((data) => {
          setEvents(data)
      })
  }, [])

  if (!events) return null

  if (!user) return ( <Login onLogin={setUser} /> )

  return (
    <UserContext.Provider value={ {user, setUser, events, setEvents} }>
      <NavBar setUser={setUser} />
      <main>
        <Routes>
          <Route
            path='/new_event'
            element={<EventForm />}
          />
          <Route
            path='/my_events'
            element={<MyEvents />}
          />
          <Route
            path='/events/:id'
            element={<Event />}
          />
          <Route 
            path='/'
            element={<EventList />}
          />
        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;
