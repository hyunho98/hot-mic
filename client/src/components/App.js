import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import '../App.css';

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

  if !user return (
    <Login onLogin={setUser} />
  )

  return (
    <UserContext.Provider value={ user }>
      <main>
        <Routes>

        </Routes>
      </main>
    </UserContext.Provider>
  );
}

export default App;