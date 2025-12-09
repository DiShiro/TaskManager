import logo from "../../assets/logo.jpg"; 
import './style.css'; 
import { useTheme } from '../ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <h1>Site</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li>
                        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                            {theme === 'light' ? 'Dark' : 'Light'}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;