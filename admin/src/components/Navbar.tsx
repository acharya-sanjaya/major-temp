import {Notifications} from "../assets/Icons";
import Logo from "../assets/Logo";
import Profile from "./Profile";

const Navbar = () => {
  return (
    <div className="fixed inset-0 w-dvw bg-background/30 backdrop-blur-sm h-16 border-b-2 border-muted-foreground/50 px-2 gap-4 flex items-center">
      <Logo />
      <div className="font-serif font-bold text-2xl">Wise Library</div>
      <div className="flex flex-1 h-full items-center justify-end gap-4 pr-10">
        <Notifications className="size-8" />
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
