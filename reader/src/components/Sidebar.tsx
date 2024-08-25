import {ReactNode, useEffect, useState} from "react";
import {cn} from "../utils/cn";
import {useLocation, useNavigate} from "react-router-dom";
import {Book, Dashboard, Fine, Notifications, Reservations, Users} from "../assets/Icons";

const Sidebar = () => {
  const [activeMenuId, setActiveMenuId] = useState(1);
  const currentRoute = useLocation().pathname;

  useEffect(() => {
    const findActiveMenu = () => {
      const routePaths = ["/", "/dash", "/book", "/user", "/rese", "/fine", "/noti"];
      const id = routePaths.indexOf(currentRoute.substring(0, 5));
      if (id === 0) {
        return 1;
      }
      return id;
    };
    setActiveMenuId(findActiveMenu());
  }, []);
  const navigate = useNavigate();
  const menuList = [
    {
      id: 1,
      menuLabel: "Dashboard",
      menuIcon: <Dashboard />,
      isActive: activeMenuId === 1,
      handleClick: () => {
        setActiveMenuId(1);
        navigate("/");
      },
    },
    {
      id: 2,
      menuLabel: "Books",
      menuIcon: <Book />,
      isActive: activeMenuId === 2,
      handleClick: () => {
        setActiveMenuId(2);
        navigate("/books");
      },
    },
    {
      id: 3,
      menuLabel: "Users",
      menuIcon: <Users />,
      isActive: activeMenuId === 3,
      handleClick: () => {
        setActiveMenuId(3);
        navigate("/users");
      },
    },
    {
      id: 4,
      menuLabel: "Reservations",
      menuIcon: <Reservations />,
      isActive: activeMenuId === 4,
      handleClick: () => {
        setActiveMenuId(4);
        navigate("/reservations");
      },
    },
    {
      id: 5,
      menuLabel: "Fine",
      menuIcon: <Fine />,
      isActive: activeMenuId === 5,
      handleClick: () => {
        setActiveMenuId(5);
        navigate("/fine");
      },
    },
    {
      id: 6,
      menuLabel: "Notifications",
      menuIcon: <Notifications />,
      isActive: activeMenuId === 6,
      handleClick: () => {
        setActiveMenuId(6);
        navigate("/notifications");
      },
    },
    {
      id: 7,
      menuLabel: "Test Form",
      menuIcon: <Notifications />,
      isActive: activeMenuId === 7,
      handleClick: () => {
        setActiveMenuId(7);
        navigate("/testform");
      },
    },
  ];

  return (
    <div className="fixed inset-0 mt-16 h-dvh w-56 border-r-2 border-muted-foreground/50">
      {menuList.map((item) => (
        <MenuBox key={`sidebar-menuItem-${item.id}`} {...item} />
      ))}
      <div className="fixed bottom-0 p-2 text-center w-56">&copy; 2024 Wise Library</div>
    </div>
  );
};

export default Sidebar;

interface MenuBoxProps {
  id: number;
  isActive: boolean;
  menuIcon?: ReactNode;
  menuLabel: string;
  handleClick: () => void;
}
const MenuBox = ({isActive, menuIcon, menuLabel, handleClick}: MenuBoxProps) => (
  <div
    onClick={handleClick}
    className={cn(
      "m-2 px-4 py-2 rounded-lg flex items-center cursor-pointer",
      isActive
        ? "bg-primary text-primary-foreground hover:bg-primary/80"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    )}
  >
    {menuIcon}
    <div className="ml-2 text-xl">{menuLabel}</div>
  </div>
);
