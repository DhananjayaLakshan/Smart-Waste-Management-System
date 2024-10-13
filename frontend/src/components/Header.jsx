import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const path = useLocation().pathname;
  const navigate = useNavigate();

  // Check if token and user exist in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setCurrentUser(user); // Set user data in state
    }
  }, []);

  // Handle sign-out
  const handleSignout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);

    // Optionally, you could notify the backend, but we'll skip that here
    navigate("/sign-in");
  };

  return (
    <Navbar className="bg-[#006400] shadow-lg">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex"
      >
        <img src={logo} className="h-12 lg:h-20" alt="Company Logo" />
      </Link>

      <div className="gap-2 md:order-2 my-auto flex">
        {/* Conditionally render user avatar or Sign In button */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.img || "https://via.placeholder.com/150"}
                rounded
              />
            }
          >
            <Dropdown.Header>
              {/* Display user's name and email */}
              <span className="block text-sm">
                {currentUser.Name || "User"}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.Email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="greenToBlue">Sign In</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          active={path === "/"}
          as={"div"}
          style={{ color: path === "/" ? "#807e87" : "#000" }}
          className="text-lg"
        >
          <Link to="/">HOME</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/about"}
          as={"div"}
          style={{ color: path === "/about" ? "#807e87" : "#000" }}
          className="text-lg"
        >
          <Link to="/about">ABOUT</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
