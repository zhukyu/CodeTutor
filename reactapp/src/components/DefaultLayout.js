import Navbar from "./Navbar/Navbar";


function DefaultLayout({ children }) {
    return (
        <div className="App">
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
