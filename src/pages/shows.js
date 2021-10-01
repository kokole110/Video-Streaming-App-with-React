import React, {useState, useEffect, Fragment} from 'react';
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout, db } from "../firebase.js";
import { 
	collection, 
	query, 
	where,
	doc, 
	getDocs, 
	addDoc,
	deleteDoc,
	updateDoc
	} 
from "firebase/firestore";


export default function Shows(){
	const [user, loading] = useAuthState(auth)
	const [videoDB, setVideoDB] = useState([]);
	const [favShowArr, setFavShowArr] = useState([]);


	useEffect(()=>{
		fetch("https://api.tvmaze.com/shows")
			.then(resp => {
				if (resp.ok) {
					return resp.json()
				}
			})
			.then(data => {
				setVideoDB(data);
			})
	}, []);

	useEffect(()=>{
		if (loading) {
			return;
		}
		if (user) {
			async function queryFavShow() {
				const q = query(collection(db, "favorites"));
				let showArr = await getDocs(q);
				showArr = showArr.docs.map((doc)=>doc.data());
				return showArr;
			}
			queryFavShow()
				.then((showArr)=>setFavShowArr(showArr))
				.then(()=>console.log(favShowArr))
		}
	}, [user, loading])

	return (
		<div className="searchedShowsContainer">
			{videoDB.map((video)=>
				<div className="card_wrap" key={video && video.id}>
					<Link to={video && video.url}>
						<div className="card_body">
							{video.image ? (
								<img 
									src={`${video.image.medium}`} 
									alt={video.name} />
								) : (
								<img 
									src={"../src/images/NoImagePlaceholder.png"} 
									alt='No image to display' />
								)}
						</div>
						<div className="card_footer">
							{video && <p>{video.name}</p>}

						</div>
					</Link >
					{user && <Favorite showID={video.id} favShowArr={favShowArr} /> }			
				</div>
			)}
		</div>
	)
}

function Favorite({showID, favShowArr}){
	
	const [user, loading] = useAuthState(auth)
	const [fav, setFav] = useState(false);
	const [favShowRef, setFavShowRef] = useState('');
	 
	async function createFav(id, uid) {
		setFav(true);
		const docRef = await addDoc(collection(db, "favorites"), {
		  user: uid,
		  id: id
		});
		setFavShowRef(docRef.id);
	}

	async function deleteFav(id, uid) {
		if(loading) return
		if (user) {
				setFav(false)
				await deleteDoc(doc(db, "favorites", favShowRef), where('id', '==', id), where('user', '==', uid));
		}
	}

	const handleFav = (()=>{
		if (fav) {
			deleteFav(showID, user.uid);

		} else {
			createFav(showID, user.uid);
		}
	})
	return (
		<Fragment>
			{!fav ? (
			<Link to="/shows" onClick={handleFav}>
				<p className="favorites">Add to favorites <span>&hearts;</span></p>
			</Link>
			) : (
			<Link to="/shows" onClick={handleFav}>
				<p className="favorites">Remove from favorites </p>
			</Link>
			)}
		</Fragment>
	)
}

// async function createFav(id, uid) {
// 	await addDoc(collection(db, "favorites"), {
// 	  user: uid,
// 	  id: id
// 	});
// }

