import {ReactNode} from "react";

interface IconProps {
  className?: string;
  thickness?: number;
}
interface SVGWrapperProps extends IconProps {
  children: ReactNode;
}

const SVGWrapper = ({children, className, thickness = 2}: SVGWrapperProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={thickness > 4 ? 4 : thickness}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const ChevronLeft = ({...props}: IconProps) => {
  return (
    <SVGWrapper {...props}>
      <path d="m15 18-6-6 6-6" />
    </SVGWrapper>
  );
};

export const Dashboard = ({...props}: IconProps) => {
  return (
    <SVGWrapper {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </SVGWrapper>
  );
};

export const Book = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M6 8h2" />
    <path d="M6 12h2" />
    <path d="M16 8h2" />
    <path d="M16 12h2" />
  </SVGWrapper>
);

export const Users = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M18 21a8 8 0 0 0-16 0" />
    <circle cx="10" cy="8" r="5" />
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
  </SVGWrapper>
);

export const Reservations = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
    <path d="M3 10h18" />
    <path d="m16 20 2 2 4-4" />
  </SVGWrapper>
);

export const Notifications = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </SVGWrapper>
);

export const Fine = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </SVGWrapper>
);

export const Add = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </SVGWrapper>
);

export const Search = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </SVGWrapper>
);

export const Close = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </SVGWrapper>
);

export const Personalized = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M2 21a8 8 0 0 1 10.434-7.62" />
    <circle cx="10" cy="8" r="5" />
    <circle cx="18" cy="18" r="3" />
    <path d="m19.5 14.3-.4.9" />
    <path d="m16.9 20.8-.4.9" />
    <path d="m21.7 19.5-.9-.4" />
    <path d="m15.2 16.9-.9-.4" />
    <path d="m21.7 16.5-.9.4" />
    <path d="m15.2 19.1-.9.4" />
    <path d="m19.5 21.7-.4-.9" />
    <path d="m16.9 15.2-.4-.9" />
  </SVGWrapper>
);

export const Star = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </SVGWrapper>
);

export const Moon = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </SVGWrapper>
);

export const Sun = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </SVGWrapper>
);

export const PasswordEye = ({
  closed = false,
  className,
  thickness = 2,
}: IconProps & {closed?: boolean}) => {
  return (
    <SVGWrapper className={className} thickness={thickness}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3.5" />
      <line
        strokeDasharray="30"
        strokeDashoffset={closed ? "30" : "0"}
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        className="transition-all duration-300"
      />
      <line
        strokeDasharray="30"
        strokeDashoffset={closed ? "30" : "0"}
        x1="2"
        y1="2"
        x2="22"
        y2="22"
        className="transition-all duration-300"
      />
    </SVGWrapper>
  );
};
