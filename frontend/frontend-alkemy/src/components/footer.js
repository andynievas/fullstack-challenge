export default function Footer(){

	const footer = {
		"display": "flex",
		"flexDirection": "column",
		"alignItems": "center",
		"backgroundColor": "rgb(10,10,20)",
		"marginTop": "30px",
		"padding": "10px 20px"
	}

	const margenSmall = {margin: "12px 0px", textAlign: "center"}

	return (
		<div style={footer} >
			<h2 style={margenSmall} >App para gestión de presupuesto personal</h2>
			<h3 style={margenSmall} >Challenge Alkemy</h3>
			<h4 style={margenSmall} >"Fullstack Reactjs y Nodejs"</h4>
			<p>Created by Andy Nievas - ©2021</p>
		</div>
	);
}
