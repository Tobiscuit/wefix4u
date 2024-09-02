import "./Content.css"
import phoneImage from "../../static/images/phone.jpg"

function Content() {
    return (
        <div className="container-grid">
            <article>
                <section>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea qui iste sed nostrum delectus earum veniam quisquam? Minima perferendis ducimus, harum delectus impedit libero nemo quo. Rem quam tempora, beatae alias maiores nobis odio ipsa similique et ut architecto ipsum.</p>
                </section>
                <section>
                    <img src={phoneImage} />
                </section>
            </article>
        </div>
    );
}

export default Content;