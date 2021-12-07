export default function NavBar(){

	let urlActual = window.location;
	urlActual = urlActual.toString();

	const styles = {
		backgroundColor: "rgba(0,16,32,0.96)",
		width: "100%",
		position: "fixed",
		top: 0,
		zIndex: 3
	}
	 // urlActual.includes('/home')
	const navItem = {
		color: "rgb(140,160,210)",
		margin: "0 10px",
		padding: "12px"
	}
	const active = {
		backgroundColor: "rgb(50,60,160)",
		color: "white",
		borderRadius: "20px",
		borderBottom: "4px rgb(140,160,210) solid"
	}
	let merged = {...navItem, ...active};

	return (
		<div style={styles} >
			<div style={{"padding": "20px", "width": "90vw", "maxWidth": "900px", "margin": "auto"}} >
				<a href="/" className="link" style={ urlActual.includes('/ingresos') || urlActual.includes('/egresos') ? navItem : merged } >Home</a>
				<a href="/ingresos" className="link" style={ urlActual.includes('/ingresos') ? merged : navItem } >Ingresos</a>
				<a href="/egresos" className="link" style={ urlActual.includes('/egresos') ? merged : navItem } >Egresos</a>
			</div>
		</div>
	);
}
