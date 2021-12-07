
import { useState } from 'react';
import editIcon from './../assets/icons8-editar-24.png';
import updateIcon from './../assets/icons8-crear-nuevo-50.png';
import cancelIcon from './../assets/icons8-cancelar.svg';
import deleteIcon from './../assets/icons8-eliminar-50.png';


function EditData(props){
	const {data} = props;
	console.log(props.id);

	return <div className="animationFadeIn" style={{flex: 1, display: 'flex', flexWrap: 'wrap', minHeight: '100px' }} >
		<form id="updateRegistroForm" style={{minWidth: '150px'}} className="formEditRecord" >
			<h4 style={{minWidth: '150px'}} className="concepto">Editar "{data.concepto}"</h4>
			<div>
				<label>Concepto: </label>
				<input type="text" name="concept" placeholder={data.concepto} size="10" maxLength="20" required />
			</div>
			<div>
				<label>Monto: </label>
				<input type="number" name="monto" placeholder={data.monto} min="1" max="1000000" required />
			</div>
			<span id="completeFields" style={{margin: "20px auto 0 auto", color: "rgb(255,80,60)", fontSize: "18px", fontWeight: "300"}} ></span>
		</form>
	</div>;
}

function OperationButtons(props){

	const updateItem = async (operation)=>{

		const form = new FormData(document.getElementById("updateRegistroForm"));

		let updateInfo = {};
		if(operation === 'update'){
			updateInfo = { "type": props.type, "id": props.id, "concept": form.get("concept"), "monto": form.get("monto") };
		}else if(operation === 'delete'){
			updateInfo = { "type": props.type, "id": props.id };
		}
		// console.log(updateInfo);

		return await fetch(`http://localhost:3001/${operation}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateInfo)
		}).then(e => e.ok );
	}

	const updateRegistro = async () => {
		alert("Warning UPDATE !!!");
		const todoOK = await updateItem('update');
		if(todoOK){
			setTimeout( ()=>{
				props.refresh();
			},1000);
			props.toggleEdit();
		}else{
			// alert("Ingresa los datos");
			document.getElementById("completeFields").innerHTML = "Complete los campos";
		}
	}
	const deleteRegistro = async () => {
		alert("Warning DELETE !!!");
		await updateItem('delete');
		setTimeout( ()=>{
			props.refresh();
		},1000);
		props.toggleEdit();
	}

	return <div className="animationFadeIn" style={{display: 'flex', justifyContent: 'space-around', padding: '0 20px', maxWidth: '600px', margin: 'auto'}} >
		<button style={{padding: '8px', margin: '8px 14px'}} type="submit" onClick={updateRegistro} ><img style={{backgroundColor: 'blue'}} className="editIcon" src={updateIcon} alt="update" title="update" /></button>
		<button style={{padding: '8px', margin: '8px 14px'}} onClick={deleteRegistro} ><img style={{backgroundColor: 'red'}} className="editIcon" src={deleteIcon} alt="delete" title="delete" /></button>
		<button style={{padding: '8px', margin: '8px 14px'}} onClick={()=>{ props.toggleEdit(0) }} ><img style={{backgroundColor: 'green'}} className="editIcon" src={cancelIcon} alt="delete" title="cancel" /></button>
	</div>
}

function Datoss(props){
	const fontsize = {
		fontSize: "22px"
	}

	return <div style={{flex: 1, display: 'flex'}} >
		<h4 style={ {...fontsize, ...props.lastIngresosStyle} } className="concepto" >{props.data.concepto} </h4>
		<h4 style={ {...fontsize, ...props.lastIngresosStyle} } className="monto" >${props.data.monto}</h4>
	</div>;
}

function RegistroData(props){

	const {data} = props;

	const handleEditControls = () => {
		props.toggleEdit(data.id);
	}

	return <div style={{display: 'flex'}} className="registro animationFadeIn" >
			<Datoss data={data} lastIngresosStyle={props.lastIngresosStyle} />
			<button style={ props.lastIngresosStyle ? {display: 'none'} : null } onClick={handleEditControls} ><img className="editIcon" src={editIcon} alt="editar" /></button>
		</div>
}

export default function Registro(props){

	const {info} = props;
	// console.log(info);

	// useState
	const [edit, setEdit] = useState(0);
	const toggleEdit = (id) => {
		setEdit( edit!==0 ? 0 : id );
	}

	const registrosContainer = {
			"backgroundColor": "#001020",
			"padding": "0px 3vw",
			"borderRadius": "20px"
	}

	return (
		<div style={registrosContainer} className="animationFadeIn" >

			<div style={edit!==0 ? {display: 'none'} : {display: 'flex'}} >
					<h2 style={ {...props.lastIngresosTitleStyle , ...{flex: 2}} } className="registroTitle" >Concepto</h2>
					<h2 style={ {...props.lastIngresosTitleStyle , ...{flex: 1, textAlign: 'right'}} } className="registroTitle" >Monto</h2>
			</div>

			{edit === 0 ? info.map(e => <RegistroData key={e.id} lastIngresosStyle={props.lastIngresosStyle ? props.lastIngresosStyle : null} data={e} toggleEdit={toggleEdit} /> ) : info.map(e => e.id===edit ? <EditData key={edit} id={edit} volver={toggleEdit} data={e} type={props.type} /> : null ) }
			{props.lastIngresosStyle ? <div style={{display: 'flex', justifyContent: 'center', border: 'none', padding: '20px' }} className="registro" ><a href="ingresos"><button style={{ fontSize: '22px', backgroundColor: 'skyblue', borderRadius: '10px' }} >Ver todos</button></a></div> : null }

			{ edit===0 ? null : <OperationButtons id={edit} type={props.type} toggleEdit={toggleEdit} refresh={props.refresh} />}

		</div>

	);
}
