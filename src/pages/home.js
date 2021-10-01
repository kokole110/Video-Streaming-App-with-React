import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
	const [firstRow, setFirstRow] = useState([]);
	const [lastRow, setLastRow] = useState([]);
	const [firstRandomVideo, setFirstRandomVideo] = useState({});
	const [lastRandomVideo, setLastRandomVideo] = useState({});

	useEffect(()=>{
		fetch("https://api.tvmaze.com/shows")
			.then(resp => {
				if (resp.ok) {
					return resp.json()
				}
			})
			.then(data => {
				setFirstRow(getVideoArray(8, data));
				setLastRow(getVideoArray(8,data));
				return data;
			})
			.then(data=>{
				setFirstRandomVideo(getRandomVideo(data));
				setLastRandomVideo(getRandomVideo(data));
			})
	}, []);


	return (
		<div className="main_container">
			<div className="upper_row">
				{firstRow.map(video => 
					<div className="card_wrap" key={video && video.id}>
						<Link to={`/show/`}>
							<div className="card_body">
								{video && <img src={`${video.image.medium}`} alt={video.name} />}
							</div>
							{/*<div className="card_footer">
								<p>{video.name}</p>
							</div>*/}
						</Link>
					</div>
					
				)}
			</div>

			<div className="middle_row">
				<div className="card_wrap" id={firstRandomVideo && firstRandomVideo.id}>
					<Link to={`/show/`}>
						<div className="card_body">
							{firstRandomVideo.image && <img src={`${firstRandomVideo.image.medium}`} alt={firstRandomVideo.name} />}
						</div>						
					</Link>
				</div>
				<div className="home_page_title">
					<p className="small_title_text">The Ultimate List of</p>
					<p className="big_title_text">Best Shows</p>
					<p className="small_title_text">of All Time</p>
					<SearchBar/>
				</div>
				<div className="card_wrap" id={lastRandomVideo && lastRandomVideo.id} key="search">
					<Link to={`/show/`}>
						<div className="card_body">
							{lastRandomVideo.image && <img src={`${lastRandomVideo.image.medium}`} alt={lastRandomVideo.name} />}
						</div>						
					</Link>
				</div>
			</div>
			<div className="lower_row">
				{lastRow.map(video => 
					<div className="card_wrap" key={video && video.id}>
						<Link to={`/show/`}>
							<div className="card_body">
								{video && <img src={`${video.image.medium}`} alt={video.name} />}
							</div>
							{/*<div className="card_footer">
								<p>{video.name}</p>
							</div>*/}
						</Link>
					</div>
					
				)}
			</div>
		</div>
	)
}

export function getVideoArray(num, data){
	let arrayOfIndexes = [];
	let VideoArray = new Array(num)
		.fill(null)
		.map(()=>{
			let index = Math.floor(Math.random() * 241);
			if (arrayOfIndexes.includes(index)) {
				index = Math.floor(Math.random() * 241);
			}
			arrayOfIndexes.push(index)
			return data[index];
	});
	return VideoArray;
}
export function getRandomVideo(data){
	let index = Math.floor(Math.random() * 241);
	return data[index];
}

function SearchBar(){
	const [searchTerm, setSearchTerm] = useState("");
	const handleChange = event => {
    setSearchTerm(event.target.value);
  };

	return (
		<form action="/" method="get" className="search_form" >
	        <label htmlFor="show_search">
	            <span className="visually-hidden">Search shows</span>
	        </label>
	        <input
	            type="text"
	            id="show_search"
	            placeholder="Search shows"
	            name="s"
	            className="search_input"
	            value={searchTerm}
	            onChange={handleChange}
	        />
	        
	        <button type="submit" className="search_button">Search</button>
	    		
	    </form>
	)
}

export {Home};