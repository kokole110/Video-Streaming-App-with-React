import React, {Fragment, useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "../firebase.js";
import { MainContainer } from "./mainContainer.js";



export default function SignUp() {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

	const [show, setShow] = useState(true);
	const handleClose = () => {
		setShow(false);
		history.replace("/");
	}
  const handleShow = () => setShow(true);
	
	return (
		<Fragment>
		<MainContainer />
		<Modal show={show} onHide={handleClose}>
		    <Form>
		    	<Modal.Body>
		    		<Form.Group className="mb-3" controlId="formBasicName">
					    <Form.Label>Your name</Form.Label>
					    <Form.Control 
					    	type="email" 
					    	placeholder="Full name"
					    	value = {name}
					    	onChange = {(e) => setName(e.target.value)} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicEmail">
					    <Form.Label>Email address</Form.Label>
					    <Form.Control 
					    	type="email" 
					    	placeholder="Enter email"
					    	value = {email}
					    	onChange = {(e) => setEmail(e.target.value)} />
					    <Form.Text className="text-muted">
					      We'll never share your email with anyone else.
					    </Form.Text>
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicPassword">
					    <Form.Label>Choose password</Form.Label>
					    <Form.Control 
					    	type="password" 
					    	placeholder="Password"
					    	value = {password}
					    	onChange = {(e) => setPassword(e.target.value)} />
					  </Form.Group>
				  </Modal.Body>
					<Modal.Footer>
						<div>
		          Already have an account? <Link to="/login">Login</Link> now.
		        </div>
					  <Button variant="primary" onClick={register}>
					    Sign up
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