import { useState } from 'react'
import { Form, Message } from 'semantic-ui-react'

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => onLogin(data))
            } else {
                response.json().then((data) => setErrors(data.errors))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} className="Form">
            <Form.Input 
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input 
                label="Password"
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button content="Login" />
            <Message hidden={errors.length > 0 ? false : true} list={errors} />
        </Form>
    )
}

export default LoginForm