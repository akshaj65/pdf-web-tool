import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { logout, isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };

    const performLogout = async () => {
        closeMenu();
        await logout();

    }
    return (
        <nav className={styles.nav}>
            <div className={styles.navLogo}>Logo</div>
            <ul className={`${styles.navList} ${isOpen ? styles.navListOpen : ''}`}>
                <li className={styles.navItem}>
                    <Link to="/" onClick={closeMenu} >Home</Link>
                </li>
                {!isAuthenticated && (
                    <>
                         <li className={styles.navItem}>
                            <Link to="/login" onClick={closeMenu}>Login</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/register" onClick={closeMenu}>Register</Link>
                        </li >
                    </>
                )}
                {isAuthenticated && (
                    <li className={`${styles.navItem} ${styles.navLogout}`}>
                        <button className={styles.logoutBtn} onClick={performLogout}>Logout</button>
                    </li>
                )}
            </ul>
            {!isOpen && (<button className={styles.navToggle} onClick={toggleMenu}> <span className={styles.navIcon}></span></button>)}
            {isOpen && <h2 className={styles.navClose} onClick={toggleMenu}>X</h2>}
        </nav>
    )
}

export default Navbar;