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
            // errorMsg: ''
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
        axios.post('/auth/login', this.state)
        .then(res => {
            console.log(res.data)
            this.props.loginUser({user: res.data})
            this.props.history.push('/main')
        })
        .catch(err => {console.log(err)
            this.notifyWarning('Incorrect email or password')
        // this.setState({errorMsg: 'Incorrect email or password'})
        })
    }
    register = () => {
        const { email, name, password } = this.state
        console.log('err', this.state)
        axios.post('/auth/register', {email, name, password})
        .then(res => {
            console.log(res.data)
            this.props.registerUser({user: res.data})
            this.props.history.push('/main')
        }).catch(err => {
            console.log(err)
            // this.setState({errorMsg: 'This email already exists'})
            this.notifyWarning('This email already exists')
        }) 
    }
    // closeErrorMsg = () => {
    //     this.setState({
    //         email: '',
    //         password: '',
    //         name: '',
    //         errorMsg: false
    //     })
    // }

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
                <div className="login-container">
                    <h1>Where Should I Travel?</h1>
                    {/* {this.state.errorMsg && <h3>{this.state.errorMsg} <span onClick={this.closeErrorMsg}>X</span></h3>} */}
                    <div>
                        <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                            Register
                        </button>
                        <button name='login' onClick={this.handleMode} disabled={mode === 'login'} >Login</button>
                            
                        
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <input value={this.state.email} placeholder="email" onChange={e => this.handleEmailChange(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type="password" value={this.state.password} placeholder="password" onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={this.login}>login</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )}else{
            return(
                <div>
                    <div>
                    <h1>Where Should I Travel?</h1>
                    {/* {this.state.errorMsg && <h3>{this.state.errorMsg} <span onClick={this.closeErrorMsg}>X</span></h3>} */}
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
                </div>
                <ToastContainer />
            </div>
            )
        }
    }
}

export default connect(null, {loginUser, registerUser})(Auth)