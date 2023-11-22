import { useContext } from 'react'
import { Card, Container, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/App'

function MyEvents() {
    const { user, events } = useContext(UserContext)
    const userEvents = events.filter((event) => event.users.map((u) => u.id).includes(user.id))

    return (
        <Container className="Container">
                <h1>My Events</h1>
                {   
                    userEvents.length > 0 ? (
                        <Card.Group itemsPerRow='4'>
                            {userEvents.map((event) => (
                                <Card
                                key={event.id}
                                as={Link}
                                to={`/events/${event.id}`}
                                >
                                    <Image src={event.image_url} size='medium' />
                                    <Card.Content>
                                        <Card.Header>{event.name}</Card.Header>
                                        <Card.Meta>{event.event_type}</Card.Meta>
                                        <Card.Description>{`${event.details.substring(0, 50)}...`}</Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        {`${event.reviews.length} Reviews`}
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    ) : (
                        <h2>You don't have any events</h2>
                    )
                }
        </Container>
    )
}

export default MyEvents