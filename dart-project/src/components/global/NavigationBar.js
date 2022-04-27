import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-unordered-list">
        <li key="view1" className="nav-list-item">
          <NavLink to="/">View1</NavLink>
        </li>
        <li key="view2" className="nav-list-item">
          <NavLink to="/view2">View2</NavLink>
        </li>
        <li key="view3" className="nav-list-item">
          <NavLink to="/view3">View3</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;