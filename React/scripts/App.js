const { MemoryRouter, Switch, Route, Link } = window.ReactRouterDOM;

// Home Component
function Home() {
    return <h2>Home Page</h2>;
}

// About Component
function About() {
    return <h2>About Page</h2>;
}

// Header Component with Links
function Header() {
    return (
        <header>
            <h1>Welcome to the Backend Automation Tool</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </nav>
        </header>
    );
}

// Main App Component with Routing
function App() {
    console.log("App component rendered");
    return (
        <div>
            <MemoryRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                </Switch>
            </MemoryRouter>
        </div>
    );
}

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));