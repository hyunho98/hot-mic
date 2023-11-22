import { useState, useContext } from 'react'
import { Form, Message, Button, TextArea, Container } from 'semantic-ui-react'
import { UserContext } from './App'

function EditReview({ review }) {
    const [title, setTitle] = useState(review.title)
    const [content, setContent] = useState(review.content)
    const [message, setMessage] = useState([])
    const { user, setUser, events, setEvents } = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setUser({
                        ...user, 
                        reviews: user.reviews.map((r) => r.id == data.id ? data : r),
                        events: user.events.map((e) => e.id == data.event.id ? data.event : e)
                    })
                    setEvents(events.map((event) => (
                        event.id == data.event.id ? ({
                            ...event,
                            reviews: event.reviews.map((r) => r.id == data.id ? data : r),
                            users: event.users.map((u) => u.id == data.user.id ? data.user : u)
                        }) : ({
                            ...event
                        })
                    )))
                    setMessage(["Edit successful"])
                })
            } else {
                response.json().then((data) => setMessage(data.errors))
            }
        })
    }

    function handleDelete() {
        fetch(`/reviews/${review.id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                setUser({
                    ...user, 
                    reviews: user.reviews.filter((r) => r.id != review.id),
                    events: user.events.filter((e) => e.id != review.event_id)
                })
                setEvents(events.map((event) => (
                    event.id == review.event.id ? ({
                        ...event,
                        reviews: event.reviews.filter((r) => r.id != review.id),
                        users: event.users.filter((u) => u.id != review.user_id)
                    }) : ({
                        ...event
                    })
                )))
            }
        })
    }

    return (
        <Container>
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
                <Message hidden={message.length > 0 ? false : true} list={message} />
                <Form.Button content="Submit" floated='right' />
            </Form>
            <Button onClick={handleDelete} color='red' content="Delete"/>
        </Container>
    )
}

export default EditReview