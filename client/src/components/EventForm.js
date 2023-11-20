import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Message, TextArea } from 'semantic-ui-react'

function EventForm() {
    const [name, setName] = useState("")
    const [eventType, setEventType] = useState("")
    const [details, setDetails] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                event_type: eventType,
                details,
                image_url: imageUrl
            })
        })
        .then((response) => {
            if (response.ok) {
                navigate('/')
            } else {
                response.json().then((data) => setErrors(data.errors))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} className="Form">
            <Form.Input
                label='Event Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Form.Input 
                label='Type of Event'
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
            />
            <Form.Input 
                control={TextArea}
                label='Details'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            />
            <Form.Input 
                label='Image Url'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <Form.Button content="Create Event" />
            <Message hidden={errors.length > 0 ? false : true} list={errors} />
        </Form>
    )
}

export default EventForm