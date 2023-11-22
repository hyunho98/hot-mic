import { useState } from 'react'
import { Form, Message } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

function SignUpForm ({ onLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                image_url: imageUrl
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json()
                    .then((user) => {
                        onLogin(user)
                        navigate('/')
                    })
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input 
                label="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Form.Input
                label="Image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <Form.Button content="Sign Up" />
            <Message hidden={errors.length > 0 ? false : true} list={errors} />
        </Form>
    )
}

export default SignUpForm