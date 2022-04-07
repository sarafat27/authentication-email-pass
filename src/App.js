import logo from './logo.svg';
import './App.css';
import app from './firebase.init';
import { getAuth } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const auth = getAuth(app)
function App() {
  const handleEmail = (event) => {
    console.log(event.target.value)
  }
  const handlePass = event => {
    console.log(event.target.value)
  }
  const handleFormSubmit = event => {
    console.log('submitted')
    event.preventDefault();
  }
  return (
    <div>
      <div className="registration w-50 mx-auto mt-2">
        <h2 className='text-primary'>Please register....</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePass} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
