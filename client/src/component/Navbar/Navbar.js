import { useEffect, useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

function Navbar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(storageUser);
    }, [])

    return (
        <>
            <div className="design-nav flex">
                <div>
                    <Link to="/" className="font design">Expense Tracker</Link>
                </div >

                <div className="flex-direction">
                    <Link to="/login" className="container design">Login</Link>
                    <Link to="/signup" className="container design"> Signup</Link>
                    <Link to="./addTransaction" className="container design">AddTransaction</Link>
                </div>

                <div className="user ">
                    Hello,{user.name || "User"}

                    {
                        user?.name ? (<span
                            onClick={(() => {
                                localStorage.removeItem("user");
                                window.location.href = "/login";
                            })}>
                            Logout
                        </span>) : null
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar