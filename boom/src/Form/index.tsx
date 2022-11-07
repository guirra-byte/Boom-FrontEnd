import React, { useState, useMemo, FormEventHandler } from "react";
import { api } from "../services/api"; // your api connection here
import camera from "../assets/camera.svg" // an image to make your form cooler
import "./index.css"; // page styles 


export default function New (){ 
	const [name, setName] = useState (""); // change the name as you prefer
	const [email, setEmail] = useState (""); // change the name as you prefer
	
	const  [password, setPassword] = useState(""); // change the name as you prefer
	
	 const  [thumbnail, setThumbnail]  = useState(null); // your uploaded file will be stored here
	
	const preview = useMemo(
		()=>{ return (thumbnail?URL.createObjectURL(thumbnail):null)}, // Show you a preview of your selected image
		[thumbnail]
	);
	
	async function handleSubmit(event:React.FormEvent<HTMLFormElement>){ // send the user's responses and image to be uploaded to the api
		event.preventDefault ();
		
		const data = new FormData (); // must to be a formdata to be possible to upload files
		
		data.append ("thumbnail",thumbnail); // data.append sets the key that you choose and it's value
		data.append ("name",name);
		data.append ("password",password);
		data.append ("email",email);

		await api.post("/spots", data); // send data to api
		
		//file upload completed
		
	};
	return (
		 <form onSubmit={ handleSubmit  }>
		
			<label id="thumbnail" style={{backgroundImage:`url(${preview})`}} 
		className={ thumbnail?"has-thumbnail" : "" } >
				<input type="file" onChange={ event=> setThumbnail(event.target.files[0])}/>
				<img src={ camera } alt="select img"/>
			</label >
		
			<label >Name</label>
			<input id="name" placeholder="full name" value={ name } onChange={ event => setName(event.target.value)} />
			
		 
			<label >Email <span>(your best)</span></label>
			<input id="email" placeholder="email" value={ email }
	 onChange={ event => setEmail(event.target.value)} />
			
			<label>password<span> (at least 8 characters)</span></label>
			<input type='password' id="password" placeholder="password" value={ password }
	 onChange={ event => setPassword(event.target.value)} />
	
		<button type="submit" className="btn">Register</button>
			
		</form>
	);

} 