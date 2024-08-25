import {useNavigate} from "react-router-dom";
import {Moon, Sun} from "../../assets/Icons";
import Logo from "../../assets/Logo";
import JumpingText from "../../components/ui/JumpingText";
import useTheme from "../../hooks/useTheme";
import {cn} from "../../utils/cn";

const Navbar = () => {
  const {theme, toggleTheme} = useTheme();
  const showMoon = theme === "dark";

  const DarkModeAnchor = () => (
    <div className="relative w-10 h-full flex group">
      <div className="relative w-full h-full transition-all duration-700 hover:[transform:rotateY(180deg)]">
        <Moon className="size-full group-hover:invisible" />
        <div className="absolute inset-0 [transform:rotateX(180deg)]">
          <Sun className="invisible group-hover:visible size-full" />
        </div>
      </div>
    </div>
  );

  const LightModeAnchor = () => (
    <div className="relative w-10 h-full flex group">
      <div className="relative w-full h-full transition-all duration-700 hover:[transform:rotateY(180deg)]">
        <Moon className="size-full invisible group-hover:visible [transform:rotateY(180deg)]" />
        <div className="absolute inset-0 [transform:rotateX(180deg)]">
          <Sun className="group-hover:invisible size-full" />
        </div>
      </div>
    </div>
  );

  const navigate = useNavigate();
  return (
    <div className="relative w-dvw bg-background/50 h-16 border-b-2 border-muted-foreground/50 px-2 gap-4 flex items-center">
      <div onClick={() => navigate("/")}>
        <Logo />
      </div>
      <div className="font-serif font-bold text-2xl">
        <JumpingText text="Wise Library" mode="character" className="font-mono" />
      </div>
      <div className="absolute top-0 right-8 flex gap-4 h-full">
        <NavItem path="/login">Login</NavItem>
        <NavItem path="/register">Register</NavItem>
        <div
          className={cn(
            "flex flex-col w-10 h-[200%] transition-all duration-500 cursor-pointer",
            showMoon ? "translate-y-0" : "-translate-y-1/2"
          )}
          onClick={toggleTheme}
        >
          <div className="w-full h-1/2">{showMoon && <DarkModeAnchor />}</div>
          <div className="w-full h-1/2">{!showMoon && <LightModeAnchor />}</div>
        </div>
      </div>
      <div className="size-10">
        <div
          className={cn("w-[200%] h-full flex ", showMoon ? "translate-x-0" : "-translate-x-1/2")}
        ></div>
      </div>
    </div>
  );
};

const NavItem = ({children, path}: {children: React.ReactNode; path: string}) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer group flex flex-col justify-center gap-1 items-center px-5"
      onClick={() => navigate(path)}
    >
      <div className="px-2 py-1 rounded-md group-hover:text-blue-500 text-xl font-bold">
        {children}
      </div>
      <div className="transition-all w-0 h-1 bg-blue-500 rounded-full group-hover:w-full"></div>
    </div>
  );
};

export default Navbar;
