import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/userReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.css';

const Header = (props) => {

    function logout() {
        axios.delete('/auth/logout')
        .then(() => {
            props.logoutUser()
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return(
        <header>
            <section>
                <h1>Where Should I Go?</h1>
            </section>
            <section>
                <Link to="/my-list"><button>My List</button></Link>
                <button>Logout</button>
            </section>
        </header>
    )
}
export default connect(null, { logoutUser })(Header)