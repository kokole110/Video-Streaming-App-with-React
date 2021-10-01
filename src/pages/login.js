import React, {Fragment, useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { Home, getVideoArray, getRandomVideo } from "./home.js";
import { MainContainer } from "./mainContainer.js";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false);
		history.replace("/");
	}
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
    	history.replace("/shows");
    }
  }, [user, loading]);
	
	return (
		<Fragment>
		<MainContainer />
		<Modal show={show} onHide={handleClose}>
		    <Form>
		    	<Modal.Body>
					  <Form.Group className="mb-3" controlId="formBasicEmail">
					    <Form.Label>Email address</Form.Label>
					    <Form.Control 
					    	type="email" 
					    	placeholder="Enter email" 
					    	value={email}
					    	onChange={(e) => setEmail(e.target.value)} />
					    <Form.Text className="text-muted">
					      We'll never share your email with anyone else.
					    </Form.Text>
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicPassword">
					    <Form.Label>Your password</Form.Label>
					    <Form.Control 
					    	type="password" 
					    	placeholder="Password" 
					    	value={password} 
					    	onChange={(e) => setPassword(e.target.value)}/>
					  </Form.Group>
				  </Modal.Body>
					<Modal.Footer>
					  <Button 
					  	variant="primary" 
					  	onClick={() => logInWithEmailAndPassword(email, password)}>
					    Log in
					  </Button>
					  <Button variant="secondary" onClick={handleClose}>
					    Close
					  </Button>
					</Modal.Footer>
				</Form>
    </Modal>
    </Fragment>
	)
}