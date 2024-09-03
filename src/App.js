import logo from 'src/logo.svg';
import 'src/App.css';
import NavigationBar from 'src/components/NavigationBar/NavigationBar';
import Body from 'src/components/Body/Body';
import Content from 'src/components/Content/ Content';
import Footer from 'src/components/Footer.jsx/Footer';


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
