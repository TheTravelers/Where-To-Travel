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
        <header>
            <section>
                <h1>Where Should I Go?</h1>
            </section>
            <section>
                <Link to="/my-list"><button >My List</button></Link>
                <Link to="/"><button onClick={logout}>Logout</button></Link>
            </section>
        </header>
    )
}
export default connect(null, { logoutUser })(Header)