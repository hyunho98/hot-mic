import { useContext } from 'react'
import { Item, Container, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/App'

function MyReviews() {
    const user = useContext(UserContext)

    return (
        <Container className="Container">
            <Segment>
                <h1>Reviews</h1>
                <Item.Group>
                {   
                    user.reviews.length > 0 ? (
                        user.reviews.map((review) => (
                            <Item key={review.id} as={Link} to={`/reviews/${review.id}`}>
                                <Item.Image size='small' src={user.image_url} />
                                    <Item.Content>
                                    <Item.Header>{review.title}</Item.Header>
                                    <Item.Meta>{user.username}</Item.Meta>
                                    <Item.Description>{review.content.substring(0, 250)}...</Item.Description>
                                </Item.Content>
                            </Item>
                        ))
                    ) : (
                        <h2>You don't have any reviews</h2>
                    )
                }
                </Item.Group>
            </Segment>
        </Container>
    )
}

export default MyReviews