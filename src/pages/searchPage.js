import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";



export default function SearchPage(){
	const { search } = window.location;
	const query = new URLSearchParams(search).get('s');
	const [searchedShows, setSearchedShows] = useState([]);

  useEffect(()=>{
  	fetch(`https://api.tvmaze.com/search/shows?q=:${query}`)
  	.then((resp)=> {
  		if (resp.ok) {
  			return resp.json();
  		}
  	})
  	.then((data)=>{
  		setSearchedShows(data);
  		return data;
  	})
  	.then((data)=>{
  		console.log(data);
  	})
  }, [])

	return (
		<div className="searchedShowsContainer">
			{searchedShows.map(video => 
				<div className="card_wrap" key={video && video.show.id}>
					<Link to={video && video.show.url}>
						<div className="card_body">
							{video.show.image ? (
								<img 
									src={`${video.show.image.medium}`} 
									alt={video.show.name} />
								) : (
								<img 
									src={"../src/images/NoImagePlaceholder.png"} 
									alt='No image to display' />
								)}
						</div>
						<div className="card_footer">
							{video && <p>{video.show.name}</p>}
						</div>
					</Link>
				</div>
			)}
		</div>
	)
}