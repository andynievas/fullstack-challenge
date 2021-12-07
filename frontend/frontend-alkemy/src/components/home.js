
import { useState } from 'react';
import useFetchData from './../components/useFetchData.js';
import Registro from './../components/registro.js';
import Form from './../components/form.js';



// http://192.168.1.6:3001/ingresos
export default function Home(){

  const { retrieved, fetchData } = useFetchData();

	const [form, setForm] = useState(false);

	const toggleForm = () => {
		setForm(!form);
	}
  if( retrieved.info === 'null' ) fetchData('http://192.168.1.6:3001/home');
  const refresh = ()=>{
		fetchData('http://192.168.1.6:3001/home');
	}

	const lastIngresosStyle = {
		margin: '8px 0',
		padding: 0,
		fontSize: "20px",
		fontWeight: 300
	};

  console.log(retrieved);

	return (
		<div>
			<h1>Actual balance es: ${retrieved.total}</h1>
      <div style={{display: 'flex', alignItems: 'center'}} >
        {form ? <h4>New element</h4> : <h4>Ultimos ingresos</h4>}
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}} >
          <button style={{backgroundColor: 'green', color: 'white', width: '100px', height: '50px', padding: '0 10px', margin: '10px', borderRadius: '20px'}} onClick={toggleForm} >{form ? "Cancel" : "Nuevo elemento"}</button>
        </div>
      </div>
			{form ? <Form toggleForm={toggleForm} refresh={refresh} /> : retrieved.info!=='null' ? <Registro info={retrieved.ingresos} lastIngresosStyle={lastIngresosStyle} lastIngresosTitleStyle={{fontSize: '20px'}} /> : <div><h1>LOADING DATA...</h1></div>}
		</div>
	);
}
