import React, { Fragment } from 'react';
import Home from './home.js';
import SearchPage from './searchPage.js';

export default function MainContainer(){
	const { search } = window.location;
    const query = new URLSearchParams(search).get('s');

	return (
		<Fragment>
			{query ? (<SearchPage />) : (<Home />)}
		</Fragment>
	)
}

export { MainContainer }