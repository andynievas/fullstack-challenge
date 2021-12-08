/*
Requerimientos Técnicos
Deberás desarrollar una API en Node.js junto a cualquiera de los siguientes frameworks,
en sus versiones estables:
 - Express



La API deberá exponer URLS que devuelvan datos en JSON.


Estos datos en JSON deberán ser consumidos por un cliente, a través de peticiones AJAX.
*/


const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyparser = require('body-parser');


// settings
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json({ limit: '1mb' }));

app.use(bodyparser.json());
bodyparser.urlencoded({extended: false})


// Database management
// Open the database
let db;
function openDataBase(){
	db = new sqlite3.Database(__dirname + '/../database/data.db', sqlite3.OPEN_READWRITE, (err)=>{
	if(err){
		console.log(err);
	}/*else console.log("Open the database connection.");*/
	});
}

// Close database connection
function closeDataBase(){
	db.close((err) => {
		if (err) {
			console.error(err.message);
		}/*else console.log('Close the database connection.');*/
	});
}

// routes
app.get('/', (req, res)=>{
	res.send("<h1>Hello World</h1> <a href='/ingresos'>Ingresos</a> <a href='/egresos'>Egresos</a>");
});

app.get('/home', async(req, res)=>{

	let sql = 'SELECT * FROM ingresos';
	/*SELECT COUNT(*) FROM emp_master;  // Esto devuelve el numero de filas de la tabla  */

	let dataIngresos = [];
	let dataEgresos = [];

	openDataBase();
	db.all(sql, [], async (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
			let rowData = {
				"id": row.id,
				"concepto": row.concepto,
				"monto": row.monto
			};
			dataIngresos.push(rowData);
	  });

	});

	sql = 'SELECT * FROM egresos';
	const andy1 = await db.all(sql, [], async (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  const andy2 = await rows.forEach((row) => {
			let rowData = {
				"monto": row.monto
			};
			dataEgresos.push(rowData);
	  });

		let totalIngresos = 0;
		let totalEgresos = 0;
		dataIngresos.forEach((item, i) => {
			totalIngresos += item.monto;
		});
		dataEgresos.forEach((item, i) => {
			totalEgresos += item.monto;
		});

		let respuesta = {
			ingresos: dataIngresos.slice(0,10),
			total: totalIngresos - totalEgresos
		}

		res.status(200);
		res.end(JSON.stringify(respuesta));
	});

	closeDataBase();
});

app.get('/ingresos', (req, res)=>{

	let sql = 'SELECT * FROM ingresos';

	let data = [];

	openDataBase();
	db.all(sql, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
			let rowData = {
				"id": row.id,
				"concepto": row.concepto,
				"monto": row.monto
			};
			data.push(rowData);
	  });

		data = JSON.stringify(data);
		res.status(200);
		res.end( data );
	});
	closeDataBase();
});

app.get('/egresos', (req, res)=>{
	let sql = 'SELECT * FROM egresos';

	let data = [];

	openDataBase();
	db.all(sql, [], (err, rows) => {
	  if (err) {
	    throw err;
	  }
	  rows.forEach((row) => {
			let rowData = {
				"id": row.id,
				"concepto": row.concepto,
				"monto": row.monto
			};
			data.push(rowData);
	  });

		data = JSON.stringify(data);
		res.end( data );
	});
	closeDataBase();
});


app.get('/newingreso', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// POST add new item
app.post('/newingreso', (req, res)=>{

	let body = {};
	let sql = '';

	let dataIsOk = false;
	if( req.body.concept && req.body.monto ){
		dataIsOk = true;
		body = req.body;
		console.log(body);
		sql = `INSERT INTO ${body.type==="Ingreso" ? "ingresos" : "egresos"}(concepto,monto) VALUES("${body.concept}","${body.monto}")`;
	}

	// if data is ok then write in the database
	if(dataIsOk){
		openDataBase();
		db.all(sql, [], (err) => {
		  if (err) {
		    throw err;
		  }

		});
		closeDataBase();

		res.status(200);
		res.send("Successfully inserted");
	}
	else{
		res.status(400);
		res.end("Data is not ok");
	}

});


// POST - Update
app.post('/update', (req, res)=>{

	let body = {};
	let sql = '';

	let dataIsOk = false;
	if( req.body.type && req.body.id && req.body.concept && req.body.monto ){
		dataIsOk = true;
		body = req.body;
		sql = `UPDATE ${body.type==="ingreso" ? "ingresos" : "egresos"} SET concepto='${body.concept}', monto=${body.monto} WHERE id=${body.id} `;
	}

	// if data is ok then write in the database
	if(dataIsOk){
		openDataBase();
		db.all(sql, [], (err) => {
		  if (err) {
		    throw err;
		  }

		});
		closeDataBase();

		res.status(200);
		res.send("Successfully updated");
	}
	else{
		res.status(400);
		res.end("Data is not ok");
	}

});

// POST - Delete
app.post('/delete', (req, res)=>{

	let body = {};
	let sql = '';

	let dataIsOk = false;
	if( req.body.type && req.body.id ){
		dataIsOk = true;
		body = req.body;
		sql = `DELETE FROM ${body.type==="ingreso" ? "ingresos" : "egresos"} WHERE id=${body.id} `;
	}

	// if data is ok then write in the database
	if(dataIsOk){
		openDataBase();
		db.all(sql, [], (err) => {
		  if (err) {
		    throw err;
		  }

		});
		closeDataBase();

		res.status(200);
		res.send("Successfully updated");
	}
	else{
		res.status(400);
		res.end("Data is not ok");
	}

});

app.listen(port, ()=>{
	console.log("Server running");
});
