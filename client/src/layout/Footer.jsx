import React from 'react';
import { Link } from 'react-router-dom';
import  styles from '../styles/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2024  Build By
                <Link className={styles.socialLink}to="https://in.linkedin.com/in/akshaj-g" target="_blank" rel="noopener noreferrer">Akshaj G</Link>
            </p>
        </footer>
    );
};

export default Footer;
