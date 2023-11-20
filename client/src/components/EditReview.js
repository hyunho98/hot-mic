import { useState } from 'react'
import { Form, Message, TextArea } from 'semantic-ui-react'

function EditReview({ review, setReview, setEdit }) {
    const [title, setTitle] = useState(review.title)
    const [content, setContent] = useState(review.content)
    const [errors, setErrors] = useState([])

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
                    setReview(data)
                    setEdit(false)
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
            <Form.Button content="Submit" floated='right' />
            <Message hidden={errors.length > 0 ? false : true} list={errors} />
        </Form>
    )
}

export default EditReview