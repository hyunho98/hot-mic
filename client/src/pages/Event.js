import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Item, Image, Container, Segment } from 'semantic-ui-react'
import ReviewForm from '../components/ReviewForm'

function Event() {
    const [event, setEvent] = useState(null)
    const [reviews, setReviews] = useState([])
    const params = useParams()

    useEffect(() => {
        fetch(`/events/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
            setEvent(data)
            setReviews(data.reviews)
        }) // eslint-disable-next-line
    }, [])

    function onNewReview(data) {
        setReviews([...reviews, data])
    }

    if (!event) return null

    return (
        <Container className="Container">
            <Image src={event.image_url} className="Image"/>
            <Segment.Group>
                <Segment>{`${event.name} (${event.event_type})`}</Segment>
                <Segment.Group>
                    <Segment>{event.details}</Segment>
                </Segment.Group>
            </Segment.Group>
            <Segment>
                <h2>Add a Review!</h2>
                <ReviewForm eventId={event.id} onNewReview={onNewReview} />
            </Segment>
            { reviews.length > 0 ? (
                <Item.Group>
                    {
                        reviews.map((review) => (
                            <Item key={review.id} as={Link} to={`/reviews/${review.id}`}>
                                <Item.Image size='small' src={review.user.image_url} />

                                <Item.Content>
                                    <Item.Header>{review.title}</Item.Header>
                                    <Item.Meta>{review.user.username}</Item.Meta>
                                    <Item.Description>{review.content.substring(0, 250)}...</Item.Description>
                                </Item.Content>
                            </Item>
                        ))
                    }
                </Item.Group>
            ) : (
                <h2>Be the first to review!</h2>
            )}
        </Container>
    )
}

export default Event