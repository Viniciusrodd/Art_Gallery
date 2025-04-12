
// css
import styles from './About.module.css';

// modules
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className={ styles.about }>
            <h2>Sobre a Art. <span>Gallery</span></h2>
            <p>Este projeto consiste em uma Galeria digital feita com React no Front-end e Firebase no Back-end</p>
            <Link to='/posts/create' className='btn'>
                Criar Arte
            </Link>
        </div>
    );
};

export default About;
