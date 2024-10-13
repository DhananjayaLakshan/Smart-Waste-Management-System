import { FaMoon, FaSun } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);

      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="dark:bg-[#006400] shadow-lg ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex"
      >
        <img src={logo} className="h-12 lg:h-20" alt="Company Logo" />
      </Link>

      <div className="gap-2 md:order-2 my-auto flex">
        <Button
          className="w-14 h-12  mr-4 sm:inline rounded-lg hidden lg:flex"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.userName}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
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
          active={path === "/astronomy"}
          as={"div"}
          style={{ color: path === "/astronomy" ? "#807e87" : "#000" }}
          className="text-lg"
        >
          <Link to="/about">ABOUT</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
