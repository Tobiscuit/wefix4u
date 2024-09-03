import 'src/components/Content/Content.css';
import phoneImage from 'src/static/images/broken_iphone.jpg';
import React from 'react';


function Content() {
  return (
    <div className="container-grid">
      <article>
        <section className="section-left paragraph">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea qui
            iste sed nostrum delectus earum veniam quisquam? Minima perferendis
            ducimus, harum delectus impedit libero nemo quo. Rem quam tempora,
            beatae alias maiores nobis odio ipsa similique et ut architecto
            ipsum.
          </p>
        </section>
        <section className="section-right">
          <img
            src={phoneImage}
            alt={'a broken phone'}
            style={{ maxWidth: '100%', maxHeight: 350 }}
          />
        </section>
      </article>

      <article>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          consequuntur accusamus minus facere in sint atque saepe maxime!
          Distinctio cum earum quis aspernatur unde eveniet laborum dolorum, ab
          dignissimos voluptates deleniti at consequatur ad totam dolor nulla
          molestias nam assumenda placeat quidem soluta, deserunt sed
          accusantium magnam? Eveniet ipsa, ullam sed veniam maiores voluptatem
          tempora ratione recusandae fugiat alias error?
        </p>
      </article>
    </div>
  );
}

export default Content;
