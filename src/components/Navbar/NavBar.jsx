// css
import styles from  './NavBar.module.css'

// modules
import { useNavigate, NavLink } from 'react-router-dom';

// context
import { useAuthValue } from '../../context/AuthContext';

// hooks
import { useAuthentication } from '../../hooks/useAuthentication';

const NavBar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={ styles.navbar }>
            <NavLink to='/' className={ styles.brand }> 
                Art. <span>Gallery</span> 
            </NavLink>

            <ul className={ styles.links_list }>
                { !user ? (
                    <>
                        <li>
                            <NavLink to='/' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }> 
                                Galeria 
                            </NavLink>
                        </li>
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
                        <li>
                            <NavLink to='/about' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Sobre
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to='/' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }> 
                                Galeria 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/posts/create' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Nova arte
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/about' className={ ({ isActive }) => ( isActive ? styles.active : '' ) }>
                                Sobre
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={ logout }>Sair</button>
                        </li>
                    </>
                ) }
            </ul>
        </nav>
    );
};

export default NavBar;
