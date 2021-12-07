
import { useState } from 'react';


const useFetchData = () => {
	const [retrieved, setRetrievedData] = useState({info: 'null'});

	const fetchData = path => {
		fetch(path)
		.then( response => response.json() )
		.then( response => { setRetrievedData(response) })
		.catch(err => { console.log("No se ha encontrado el recurso") });
	}

	return { retrieved, fetchData };
}

export default useFetchData;
