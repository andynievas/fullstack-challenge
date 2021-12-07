
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar.js';
import Home from './components/home.js';
import Ingresos from './components/ingresos.js';
import Egresos from './components/egresos.js';
import Footer from './components/footer.js';


function App() {
	let urlActual = window.location;
	urlActual = urlActual.toString();

  return (
    <div className="App">
      <header>
      	<NavBar/>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
			<main style={{"paddingTop": "80px", "width": "90vw", "maxWidth": "900px", "margin": "auto"}} >
				{urlActual.includes('/ingresos') ? <Ingresos/> : (urlActual.includes('/egresos') ? <Egresos/> : <Home/>)}
			</main>
			<Footer/>
    </div>
  );
}

export default App;
