import Logo from "../assets/Logo";
import Profile from "./Profile";
import JumpingText from "./ui/JumpingText";

const Navbar = () => {
    return (
        <div className="fixed inset-0 w-dvw bg-background/30 backdrop-blur-sm h-16 border-b-2 border-muted-foreground/50 px-2 gap-4 flex items-center">
            <Logo />
            {/* <div className="font-serif font-bold text-2xl">Wise Library</div> */}
            <JumpingText
                text="Wise Library"
                className="font-serif font-bold text-2xl"
                mode="character"
            />
            <div className="flex flex-1 h-full items-center justify-end gap-4 pr-10">
                <Profile />
            </div>
        </div>
    );
};

export default Navbar;
