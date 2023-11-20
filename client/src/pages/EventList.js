import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Image } from 'semantic-ui-react'

function EventList() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/events')
        .then((response) => response.json())
        .then((data) => setEvents(data))
    }, [])

    return (
        <Container className='Events-container'>
            { events.length > 0 ? (
                <Card.Group itemsPerRow='4'>
                {
                    events.map((event) => (
                        <Card
                            key={event.id}
                            as={Link}
                            to={`/events/${event.id}`}
                        >
                            <Image src={event.image_url} />
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
                <>
                    <h2>No Events Found</h2>
                    <Button as={Link} to='/new_event'>
                        Create an Event
                    </Button>
                </>
            )}
        </Container>
    )
}

export default EventList