import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container } from 'semantic-ui-react'

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
                <Card.Group itemsPerRow='2'>
                {
                    events.map((event) => (
                        <Card 
                            key={event.id}
                            as={Link}
                            to={`/events/${event.id}`}
                            image={event.image_url}
                            header={event.name}
                            meta={event.type}
                            description={`${event.details.substring(0, 200)}...`}
                            extra={`${event.reviews.length} Reviews`}
                        />
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