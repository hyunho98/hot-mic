import { useState } from 'react'
import { Form, Message, TextArea } from 'semantic-ui-react'

function ReviewForm({ eventId, onNewReview }) {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [errors, setErrors] = useState([])

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
                likes: 0,
                event_id: eventId
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((review) => onNewReview(review))
            } else {
                response.json().then((data) => setErrors(data.errors))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
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