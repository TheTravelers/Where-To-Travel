import React, {Component} from 'react'
import axios from 'axios'
import './Auth.css'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            mode: 'login'
        }
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
            this.props.history.push('/Filter')
        }).catch(err => console.log(err))
    }
    register = () => {
        axios.post('/auth/register', this.state)
        .then(res => {
            thiis.props.history.push('/Filter')
        }).catch(err => console.log(err)) 
    }

    render(){
        let {mode} = this.state
        if(mode === "login"){
        return(
            <div>
                <div>
                    <h1>Where Should I Travel?</h1>
                    <div>
                        <button name='register' onClick={this.handleMode} disabled={mode === 'register'}>
                            Register
                        </button>
                        <button name='login' onClick={this.handleMode} disabled={mode === 'login'} >Login</button>
                            
                        
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <input value={this.state.username} onChange={e => this.handleEmailChange(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input value={this.state.password} onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={this.login}>login</button>
                    </div>
                </div>

            </div>
        )}else{
            return(
                <div>
                    <div>
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
                        <input value={this.state.name} onChange={e => this.handleNameChange(e.target.value)}/>
                        
                        <h3>Email:</h3>
                        <input value={this.state.username} onChange={e => this.handleEmailChange(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input value={this.state.password} onChange={e => this.handlePasswordChange(e.target.value)}/>
                    </div>
                    <div>
                        <button></button>
                    </div>
                </div>

            </div>
            )
        }
    }
}
export default Auth