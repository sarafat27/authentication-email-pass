import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState('')
  const handleName = event => {
    setName(event.target.value)
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlePass = event => {
    setPass(event.target.value)
  }
  const handleRegisteredChange = event => {
    setRegistered(event.target.checked)
  }
  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(pass)) {
      setError('password should contain at least one special character')
      return;
    }
    setValidated(true);
    setError('');
    if (registered) {
      signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user)
          setEmail(' ')
          setPass(' ')
          verifyEmail()
          setUserName()
          setSuccess('your account has been created successfully')
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }

    event.preventDefault();
  }
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent')
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent')
      })
  }
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name')
      })
      .catch(error => {
        setError(error.message)
      })
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-2">
        <h2 className='text-primary'>Please {registered ? 'login' : 'register'}....</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your Name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePass} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered" />
          </Form.Group>
          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>
          <Button onClick={handlePasswordReset} variant="link">Forget password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
