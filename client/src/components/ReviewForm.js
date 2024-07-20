import { useState, useContext } from 'react'
import { Form, Message, TextArea } from 'semantic-ui-react'
import { UserContext } from './App'

function ReviewForm({ currentEvent }) {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([])
    const { user, setUser, events, setEvents } = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content,
                event_id: currentEvent.id
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => { //extract into function
                    setEvents(events.map((event) => (
                        event.id == data.event.id ? ({
                            ...event,
                            reviews: [...event.reviews, data],
                            users: [...event.users, data.user]
                        }) : ({
                            ...event
                        })
                    )))
                    setUser({
                        ...user, 
                        reviews: [...user.reviews, data],
                        events: [...user.events, data.event]
                    })
                })
            } else {
                response.json().then((data) => setErrors(data.errors))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} className="Form">
            <Form.Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Input
                control={TextArea}
                label="Content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Form.Button content="Submit" />
            <Message hidden={errors.length > 0 ? false : true} list={errors} />
        </Form>
    )
}

export default ReviewForm