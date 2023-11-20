import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import EventList from '../pages/EventList'
import Event from '../pages/Event'
import Review from '../pages/Review'
import MyReviews from '../pages/MyReviews'
import NavBar from './NavBar'
import EventForm from './EventForm'
import '../App.css'

export const UserContext = createContext()

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/me')
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => setUser(data))
        }
      })
  }, [])

  if (!user) return ( <Login onLogin={setUser} /> )

  return (
    <UserContext.Provider value={ user }>
      <NavBar setUser={setUser} />
      <main>
        <Routes>
          <Route
            path='/new_event'
            element={<EventForm />}
          />
          <Route
            path='/my_reviews'
            element={<MyReviews />}
          />
          <Route
            path='/events/:id'
            element={<Event />}
          />
          <Route
            path='/reviews/:id'
            element={<Review />}
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
