import React, {Fragment, useState, useEffect} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, db } from "./firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Header(){
	const [user, loading] = useAuthState(auth);
	const [userName, setUserName] = useState('');
	useEffect(()=>{
		if (loading) {
			return
		}
		if (user) {
			async function getUserData(requestedData){
				const userRef = collection(db, 'users');
				const q = query(userRef, where('uid', '==', user.uid));
				const querySnapshot = await getDocs(q);
				if (querySnapshot.empty) {
					throw new Error('Nothing found'); 
				} return querySnapshot.docs[0].data()[requestedData];
			}

			getUserData('name').then((data)=>setUserName(data));
		}
	}, [user, loading]);

	


	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">EPAMiX</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
					<Nav className="">
						{user ? (
							<Nav.Link>Welcome, {userName}</Nav.Link>
								
						) : (
							''
						)}
						<LinkContainer to="/shows">
						    <Nav.Link>Look what we have</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/">
						    <Nav.Link>Home</Nav.Link>
						</LinkContainer>
						{user ? (
							<Fragment>
								
								<LinkContainer to="/">
						   			<Nav.Link onClick={logout}>Log out</Nav.Link>
								</LinkContainer>
							</Fragment>
						) : (
							<Fragment>
								<LinkContainer to="/login">
								    <Nav.Link>Login</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/signup">
								    <Nav.Link>Sign up</Nav.Link>
								</LinkContainer>
							</Fragment>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}