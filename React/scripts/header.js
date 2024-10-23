// Header Component with Links
export const Header = () => {
    return (
        <header>
            <h1>Welcome to the Backend Automation Tool</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </nav>
        </header>
    );
};