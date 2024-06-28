export function About() {
  return (
    <section className="about-us">
      <h1>About Us</h1>

      <div className="profile-card">
        <img
          className="developer-image"
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt="or-image"
        ></img>
        <div className="developer-info">
          <h1>Information About Or:</h1>
          <p>
            I'm the developer of the Keep app which is mimiced from Google Keep
            and has a backend mimiced server-side using LocalStorage with a
            bunch of demo data to show the user the Notes system. If you're
            going to ask about the image yes this is totatlly me only because
            I'm the developer of the Keep App Currently, a bunch of features are
            under development (Special Thanks to Tal(GezerLavan) Our Tech Lead
            for the good time and leadership, Also Special Thanks to Risan for
            telling us this is a free bonus page 😁).
          </p>
        </div>
      </div>
      <div className="profile-card">
        <img
          className="developer-image"
          src="./assets/img/default-user-img.png"
          alt="michael-image"
        ></img>
        <div className="developer-info">
          <h1>Information About Michael:</h1>
          <p>
            I'm the developer of the Mail app which is mimiced from Google Gmail
            and has a backend mimiced server-side using LocalStorage with a
            bunch of demo data to show the user the mailing system. If you're
            going to ask about the image yes this is totatlly me only because
            I'm the developer of the Mail App Currently, a bunch of features are
            under development (Special Thanks to Tal(GezerLavan) Our Tech Lead
            for the good time and leadership, Also Special Thanks to Risan for
            telling us this is a free bonus page 😁).
          </p>
        </div>
      </div>
    </section>
  )
}
