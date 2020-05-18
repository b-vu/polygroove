import React from "react";
import "./Home.css";
import Container from "../../components/Container/Container";
import Banner from "../../components/Banner/Banner";
import Column from "../../components/Column/Column";
import Box from "../../components/Box/Box";

const Home = () => {
    return(
        <Container>
            <Banner
                title={"Welcome!"}
                subtitle={"Shall I tell you a little bit about myself?"}
            />
            <Box>
                <h1 className="title has-text-centered">About Me</h1>
                <Column>
                    <div className="column is-one-quarter">
                        <img className="image" src="https://avatars2.githubusercontent.com/u/58751099?v=4" alt="Brian Vu"></img>
                    </div>
                    <div className="column">
                        My name is Brian Vu, and I am a part-time student at UT Austin's Coding Boot Camp. I am also working full time as a lab technician at a research lab in the medical center. As this website shows, I am very interested in learning the skills to become a web developer. My current goal is to pursue a career in web development and programming, and I believe the boot camp is a great way to get a foot in the door. Through the boot camp, I've found a passion for learning full stack development as well as collaborating with my fellow classmates. I am looking forward to working in the thriving tech industry and offering my valuable skills.
                        <br />
                        <br />
                        In my free time, I enjoy playing video games, reading, and watching sports. I'm currently reading The Dark Elf Trilogy by R. A. Salvatore, and I tend to gravitate towards fantasy and sci-fi genres. I'm a huge fan of basketball and football. As a Houston native, I will always cheer for Houston teams, but I enjoy watching any good teams play. I also watch Formula 1, e-sports, listen to all sorts of music genres, etc. Basically what I'm saying is, if you ever meet me in person, there are probably things we have in common that we could talk about!
                    </div>
                </Column>

                <h1 className="title has-text-centered">Full Stack Development Skills</h1>
                <Column>
                    <div className="column is-one-third">
                        <img className="image" src="https://i.imgur.com/IG8zmh3.jpg" alt="HTML, CSS, and Javascript"></img>
                        <br />
                        <h1 className="title has-text-centered">Front End Languages</h1>
                        <br />
                         What the client sees and experiences is important, and web developers should always keep this in mind when creating websites.
                         I have extensive experience in Javascript, HTML, CSS and multiple front end libararies to ensure that clients have a smooth, 
                         functional and responsive experience.
                    </div>

                    <div className="column is-one-third">
                        <img className="image" src="https://i.imgur.com/KAlHMbk.png?1" alt="MongoDB and MySQL Databases"></img>
                        <div className="level">
                            <div className="level-item">
                                <img className="image" src="https://i.imgur.com/QTJfyN9.png" alt="MongoDB and MySQL Databases"></img>
                            </div>
                        </div>
                        <h1 className="title has-text-centered">Databases</h1>
                        <br />
                         Data and data storage are essential to fully functional websites. I have worked with relational databases such as MySQL along with 
                         the Sequelize ORM. I also have worked with the NoSQL database, MongoDB, as well as utilizing its npm object modeler, Mongoose.
                    </div>

                    <div className="column is-one-third">
                        <img className="image" src="https://i.imgur.com/3oxtQos.jpg" alt="MERN Stack"></img>
                        <br />
                        <h1 className="title has-text-centered">MERN Stack</h1>
                        <br />
                         The web development field is always growing and innovating, and developers likewise must keep up. This site as well as a few
                         of the projects in my portfolio were created with MERN. Utilizing React with Express, Node, and Mongo is a powerful toolset that 
                         can allow passionate developers like myself to create efficent, modern websites.
                    </div>
                </Column>
            </Box>
        </Container>
    );
}

export default Home;