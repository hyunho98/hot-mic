import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Image } from 'semantic-ui-react'
import { UserContext } from '../components/App'

function EventList() {
    const { events } = useContext(UserContext)

    return (
        <Container className='Container'>
            { events.length > 0 ? (
                <Card.Group itemsPerRow='4'>
                {
                    events.map((event) => (
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
                    ))
                }
                </Card.Group>
            ) : (
                <div className="Page-text">
                    <h2>No Events Found</h2>
                    <Button as={Link} to='/new_event'>
                        Create an Event
                    </Button>
                </div>
            )}
        </Container>
    )
}

export default EventList