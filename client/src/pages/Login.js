import { useState } from 'react'
import { Button } from 'semantic-ui-react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

function Login ({ onLogin }){
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            <h2>Hot Mic</h2>
            {showLogin ? (
                 <>
                    <LoginForm onLogin={onLogin} />
                    <p>
                        Don't have an account? &nbsp;
                        <Button secondary onClick={() => setShowLogin(false)}>
                            Sign Up
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <SignUpForm onLogin={onLogin} />
                    <p>
                        Already have an account? &nbsp;
                        <Button secondary onClick={() => setShowLogin(true)}>
                            Login
                        </Button>
                    </p>
                </>
            )}
        </div>
    )
}

export default Login