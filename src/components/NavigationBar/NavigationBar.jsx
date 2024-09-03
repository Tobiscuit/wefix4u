import "src/components/NavigationBar/NavigationBar.css"
import image from "../../static/images/Screenshot from 2024-09-02 23-52-06.png";


const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <img src={image}/>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#home">Services</a></li>
                <li><a href="#home">Contact Us</a></li>
                <li><a href="#home">About Us</a></li>
            </ul>
        </nav>
    )
}

export default NavigationBar