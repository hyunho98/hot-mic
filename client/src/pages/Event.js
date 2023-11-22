import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Item, Image, Container, Segment } from 'semantic-ui-react'
import { UserContext } from '../components/App'
import EditReview from '../components/EditReview'
import ReviewForm from '../components/ReviewForm'

function Event() {
    const params = useParams()
    const { user, events} = useContext(UserContext)
    const event = events.find((event) => event.id == params.id)
    const userReview = event.reviews.find((review) => review.user_id == user.id)

    return (
        <Container className="Container">
            <Image src={event.image_url} className="Image" size='medium' />
            <Segment.Group>
                <Segment>{`${event.name} (${event.event_type})`}</Segment>
                <Segment.Group>
                    <Segment>{event.details}</Segment>
                </Segment.Group>
            </Segment.Group>
            <Segment>
                { userReview ? (
                    <>
                        <h2>Edit Your Review</h2>
                        <EditReview review={userReview} />
                    </>
                ) : (
                    <>
                        <h2>Add a Review!</h2>
                        <ReviewForm currentEvent={event} />
                    </>
                )}
            </Segment>
            { event.reviews ? (
                <Item.Group>
                    {
                        event.reviews.map((review) => (
                            <Item key={review.id} >
                                <Item.Image size='small' src={event.users.find((u) => u.id == review.user_id).image_url} />

                                <Item.Content>
                                    <Item.Header>{review.title}</Item.Header>
                                    <Item.Meta>{event.users.find((u) => u.id == review.user_id).username}</Item.Meta>
                                    <Item.Description>{review.content}</Item.Description>
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