import {Close} from "../../assets/Icons";
import {ReactNode} from "react";

interface PopupProps {
  children: ReactNode;
  openPopup: boolean;
  closeThePopup: React.MouseEventHandler<HTMLDivElement>;
}

const Popup = ({children, openPopup, closeThePopup}: PopupProps) => {
  if (!openPopup) {
    return;
  }

  return (
    <div
      className="z-10 fixed w-screen h-screen top-0 left-0 bg-secondary/50 backdrop-blur-sm"
      onClick={closeThePopup}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-[90%] min-w-[250px] max-w-[700px] h-[calc(90%)] bg-secondary/80 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-[30px] h-[30px] flex items-center justify-center self-end rounded-sm rounded-tr-xl bg-red-500 hover:bg-red-600 cursor-pointer"
          onClick={closeThePopup}
        >
          <Close className="text-white" />
        </div>
        <div className="h-full mb-4 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
