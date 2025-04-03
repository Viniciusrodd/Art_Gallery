// css
import styles from  './NavBar.module.css'

// modules
import { useNavigate, NavLink } from 'react-router-dom';

// context
import { useAuthValue } from '../../context/AuthContext';

const NavBar = () => {
    const { user } = useAuthValue();

    return (
        <nav className={ styles.navbar }>
            <NavLink to='/' className={ styles.brand }> 
                Mini <span>Blog</span> 
            </NavLink>

            <ul className={ styles.links_list }>
                <li>
                    <NavLink to='/' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }> 
                        Home 
                    </NavLink>
                </li>
                { !user ? (
                    <>
                        <li>
                            <NavLink to='/login' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to='/posts/create' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Novo Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                ) }
                <li>
                    <NavLink to='/about' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                        Sobre
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
