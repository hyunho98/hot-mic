import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function NavBar({ setUser }) {
    function handleLogoutClick() {
        fetch('/logout', {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) setUser(null)
        })
    }

    return (
        <Menu secondary>
            <Menu.Item 
                name='home'
                as={Link}
                to='/'
            />
            <Menu.Item 
                name='my reviews'
                as={Link}
                to='/my_reviews'
            />
            <Menu.Menu position='right'>
                <Menu.Item 
                    name='new event'
                    as={Link}
                    to='/create/event'
                />
                <Menu.Item 
                    name='logout'
                    onClick={handleLogoutClick}
                />
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar