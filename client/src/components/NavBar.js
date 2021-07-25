import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
    const [activeItem, setActiveItem] = useState('')

    const handleItemClick = (e, { name }) => setActiveItem(name)



    return (

        <Menu pointing secondary>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={handleItemClick}
                as={Link}
                to='/profile'
            />
            <Menu.Item
                name='feed'
                active={activeItem === 'feed'}
                onClick={handleItemClick}
                as={Link}
                to='/feed'
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/logout'
                />
            </Menu.Menu>
        </Menu>



    )

}

export default MenuBar