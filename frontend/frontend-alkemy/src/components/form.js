

export default function Form(props){

  const fetchForm = (e) => {
    e.preventDefault();

    const datos = new FormData(document.getElementById("formNewElement") );
    const data = { "type": datos.get("type") , "concept": datos.get("concept") , "monto": datos.get("monto") };

    fetch('http://localhost:3001/newingreso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(response => {
      console.log(response);
      setTimeout( ()=>{
        props.refresh();
      },1000);
      props.toggleForm();
    });
  }

  return (
    <form id="formNewElement" className="formStyle animationFadeIn" action="http://localhost:3001/newingreso" method="POST" onSubmit={fetchForm} target="_blank" >
      <input type="text" name="concept" placeholder="Concepto" required />
      <input type="number" name="monto" placeholder="Monto" required />
      <div style={{display: 'flex'}} >
      <p style={{marginBottom: 0, marginLeft: '6px'}} >Type</p>

        <label htmlFor="ingreso" className="radioContainer">
          <input id="ingreso" type="radio" className="radio" name="type" value="Ingreso" maxLength="20" defaultChecked />
          <span style={{padding: '10px'}} >Ingreso</span>
        </label>
        <label htmlFor="egreso" className="radioContainer">
          <input id="egreso" type="radio" className="radio" name="type" value="Egreso" />
          <span style={{padding: '10px'}} >Egreso</span>
        </label>

      </div>
      <button type="submit" >Submit</button>
    </form>);
}
