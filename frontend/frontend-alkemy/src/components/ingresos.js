
import useFetchData from './../components/useFetchData.js';
import Registro from './../components/registro.js';

export default function Ingresos(){

	const { retrieved, fetchData } = useFetchData();

	if( retrieved.info === 'null' ) fetchData('http://localhost:3001/ingresos');

	const refresh = ()=>{
		fetchData('http://localhost:3001/ingresos');
	}

	return (
		<div>
			<h1 style={{margin: '20px 0 0 0'}} >Ingresos</h1>
			<p style={{fontSize: '20px', textAlign: 'right', margin: '0 0 20px 0'}} >{retrieved.length} transactions listed</p>
			{retrieved.info==='null' ? <div><h1>LOADING DATA...</h1></div> : <Registro info={retrieved} type="ingreso" refresh={refresh} />}
		</div>
	);
}
