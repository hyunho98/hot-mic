import { useState, useContext, useEffect } from 'react'
import { Segment, Container, Image, Button, Item } from 'semantic-ui-react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../components/App'
import EditReview from '../components/EditReview'

function Review() {
    const [review, setReview] = useState(null)
    const [edit, setEdit] = useState(false)
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        fetch(`/reviews/${params.id}`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => setReview(data))
            }
        }) // eslint-disable-next-line
    }, [])

    function handleDelete() {
        fetch(`/reviews/${params.id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                navigate('/')
            }
        })
    }

    if (!review) return null

    return (
        <Container className="Container">
            <Image src={review.event.image_url} className="Image" size='medium' />
            <Segment.Group>
                <Segment clearing>
                    {`${review.event.name} (${review.event.event_type})`}
                    <Button secondary as={Link} to={`/events/${review.event.id}`} 
                            content="To Event Page" floated='right' 
                    />
                </Segment>
                <Segment.Group>
                    <Segment>
                        {review.event.details}
                    </Segment>
                </Segment.Group>
            </Segment.Group>
            <Segment clearing>
                {
                    edit ? (
                        <EditReview review={review} setReview={setReview} setEdit={setEdit} />
                    ) : (
                        <Item.Group>
                            <Item>
                                <Item.Image size='small' src={review.user.image_url} />
                                <Item.Content>
                                    <Item.Header>{review.title}</Item.Header>
                                    <Item.Meta>{review.user.username}</Item.Meta>
                                    <Item.Description>{review.content}</Item.Description>
                                    <Item.Extra>
                                {
                                    review.user.id === user.id ? (
                                        <>
                                            <Button
                                                color='red'
                                                floated='left'
                                                onClick={handleDelete}
                                                content="Delete" 
                                            />
                                            <Button
                                                floated='right'
                                                onClick={setEdit}
                                                content="Edit" 
                                            />
                                        </>
                                    ) : (
                                        null
                                    )
                                }
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    )
                }
            </Segment>
        </Container>
    )
}

export default Review