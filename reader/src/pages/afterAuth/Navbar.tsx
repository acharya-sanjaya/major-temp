import {useNavigate} from "react-router-dom";
import {Heart} from "../../assets/Icons";
import Logo from "../../assets/Logo";
import Profile from "../../components/Profile";
import JumpingText from "../../components/ui/JumpingText";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 w-dvw bg-background/30 backdrop-blur-sm h-16 border-b-2 border-muted-foreground/50 px-2 gap-4 flex items-center">
      <div onClick={() => navigate("/")}>
        <Logo />
      </div>
      <JumpingText text="Wise Library" mode="character" className="font-mono text-3xl" />
      <div className="flex flex-1 h-full items-center justify-end gap-4 pr-10">
        <div onClick={() => navigate("/favourites")} className="hover:scale-110 cursor-pointer">
          <Heart />
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
