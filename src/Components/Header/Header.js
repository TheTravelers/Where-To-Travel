import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.scss';

const Header = (props) => {
    console.log(props)

    function logout() {
        axios.post('/auth/logout')
        .then(() => {
            props.logoutUser()
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <header className='header-container'>
                <h1 className="header-h1">Where Should I Go?</h1>
                <nav className="header-nav">
                    <Link to="/my-list"><button className='header-button' >My List</button></Link>
                    <Link to="/"><button className='header-button' onClick={logout}>Logout</button></Link>
                </nav>
            </header>

        </div>
    )
}
export default connect(null, { logoutUser })(Header)