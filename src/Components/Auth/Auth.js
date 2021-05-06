import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, registerUser} from '../../redux/userReducer'
import { ToastContainer, toast } from 'react-toastify'
import { gsap } from 'gsap'
import 'react-toastify/dist/ReactToastify.css';
import './Auth.scss'


class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            mode: 'login',
            errorMsg: ''
        }
    }
    componentDidMount(){
        gsap.from('.auth-container', {opacity: 0, duration: 1})
    }
    handleEmailChange = (val) => {
        this.setState({ email: val })
    }
    handlePasswordChange = (val) => {
        this.setState({ password: val })
    }
    handleNameChange = (val) => {
        this.setState({ name: val })
    }
    handleMode = (e) => {
        this.setState({ mode: e.target.name })
    }
    
    login = () => {
        
        if (this.loginValidation()) {
            axios.post('/auth/login', this.state)
            .then(res => {
                console.log(res.data)
                this.props.loginUser({user: res.data})
                this.props.history.push('/main')
            })
            .catch(err => {console.log(err)
                this.notifyWarning(err.response.data)
            })
        } else {
            return null 
        }
    }

    register = () => {
        const { email, name, password } = this.state

        if (this.registerValidation()) {
            axios.post('/auth/register', {email, name, password})
            .then(res => {
                console.log(res.data)
                this.props.registerUser({user: res.data})
                this.props.history.push('/main')
            }).catch((err) => {
                this.notifyWarning(err.response.data)
            })
        } else {
            return null
        }  
    }
    
    loginValidation = () => {
        const { email, password } = this.state;
        let isValid = true;
        // Email
        if (!email) {
            isValid = false;
            this.notifyWarning('Email field cannot be empty')
        } 
        else if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                isValid = false;
                this.notifyWarning('Invalid email')
            }
        }
        // Password
        if (isValid === true) {
            if (!password) {
                isValid = false;
                this.notifyWarning('Password field cannot be empty')
            }
            else if (password.length < 6) {
                isValid = false;
                this.notifyWarning('Password must be at least 6 characters long')
            }
        }
        return isValid;
    }

    registerValidation = () => {
        const { name, email, password } = this.state;
        let isValid = true;
        // Name
        if (!name) {
            isValid = false;
            this.notifyWarning('Name field cannot be empty')
        }
        // Email
        if (isValid === true) {
            if (!email) {
                isValid = false;
                this.notifyWarning('Email field cannot be empty')
            } 
            else if (typeof email !== "undefined") {
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    isValid = false;
                    this.notifyWarning('Invalid email')
                }
            }
        }
        // Password
        if (isValid === true) {
            if (!password) {
                isValid = false;
                this.notifyWarning('Password field cannot be empty')
            }
            else if (password.length <= 6) {
                isValid = false;
                this.notifyWarning('Password must be at least 6 characters long')
            }
        }
        return isValid;
    }

    notifyWarning = (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }) 
        this.setState({
                email: '',
                password: '',
                name: ''  
        })
    }

    render(){
        let {mode} = this.state
        if(mode === "login"){
        return(
            <div className="auth-container">
                <form className="login-container">
                    <h1>Where Should I Travel?</h1>
                    <div>
                        <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>Register</button>
                        <button name='login' onClick={this.handleMode} disabled={mode === 'login'} >Login</button>      
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <input value={this.state.email} id="email" type="email" placeholder="email" onChange={e => this.handleEmailChange(e.target.value)} />
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type="password" id="password" value={this.state.password} placeholder="password" onChange={e => this.handlePasswordChange(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={this.login}>login</button>
                    </div> 
                </form>
                <ToastContainer />
            </div>
        )} else {
            return(
                <div>
                    <form>
                    <h1>Where Should I Travel?</h1>
                    <div>
                        <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                            Register
                        </button>
                        <button name='login' onClick={this.handleMode} disabled={mode === 'login'} >
                            Login
                        </button>
                    </div>
                    <div>
                        <h3>Name:</h3>
                        <input value={this.state.name} placeholder="name" onChange={e => this.handleNameChange(e.target.value)}/>
                        
                        <h3>Email:</h3>
                        <input value={this.state.email} placeholder="email" onChange={e => this.handleEmailChange(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type="password" value={this.state.password} placeholder="password" onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={this.register}>Register</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
            )
        }
    }
}

export default connect(null, {loginUser, registerUser})(Auth)