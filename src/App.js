import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Body from './components/Body/Body';
import Content from './components/Content/ Content';
import Footer from './components/Footer.jsx/Footer';


const App = () => {
  return (
    <div className="container__main">
      <NavigationBar />
      <Body />
      <Content />
      <Footer />
    </div>
  )
}

export default App;
