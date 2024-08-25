import { useState, useEffect, useRef } from "react";

const useContainerWidth = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            entries.forEach((entry) => {
                setWidth(entry.contentRect.width);
            });
        };

        const resizeObserver = new ResizeObserver(handleResize);
        const container = containerRef.current;

        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    }, []);

    return [containerRef, width] as const;
};

export default useContainerWidth;
