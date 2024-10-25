import "./Header.scss"
import { motion } from 'framer-motion';
import logo from 'assets/beatt.svg'

export const Header = () => {
    return (
        <motion.div className="header-container">
            <div className="header">
                <div className="header__left">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <h1>BEATT IT</h1>
                    </div>
                    <input type="text" placeholder="Search..." className="header__search" />
                </div>
                <div className="header__right">
                    <button className="header__add-snapshot">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#0161FF" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                        <p>Add Snapshot</p>
                    </button>
                </div>
            </div>
        </motion.div>

    )
}