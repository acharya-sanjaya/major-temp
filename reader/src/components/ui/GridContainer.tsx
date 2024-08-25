import React, {ReactNode} from "react";
import useContainerWidth from "../../hooks/useGridWidth";

const GridContainer: React.FC<{children: ReactNode}> = ({children}) => {
  const [gridContainerRef, componentWidth] = useContainerWidth();
  const cols = Math.floor(componentWidth / 200);

  return (
    <div className="p-4 min-w-[250px]" ref={gridContainerRef}>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GridContainer;
