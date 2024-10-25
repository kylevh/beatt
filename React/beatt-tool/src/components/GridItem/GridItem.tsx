import "./GridItem.scss";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface GridItemProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    colStart: number;
    colSpan: number;
    rowStart: number;
    rowSpan: number;
    style?: React.CSSProperties;
    animate?: boolean;
    debug?: boolean;
    backgroundColor?: string;
    noExitAnimation?: boolean;
    allowOverflow?: boolean;
}

export const GridItem = ({
    children,
    colStart,
    colSpan,
    rowStart,
    rowSpan,
    backgroundColor = "#ffffff",
    className = "",
    style,
    animate = true,
    noExitAnimation = false,
    allowOverflow = false,
}: GridItemProps) => {
    const randomDelay = useMemo(() => Math.random() * 0.15, []);
    return (
        <motion.div
            className={`grid-item ${className}`}
            style={{
                gridColumn: `${colStart} / span ${colSpan}`,
                gridRow: `${rowStart} / span ${rowSpan}`,
                backgroundColor,
                ...(allowOverflow ? { overflow: "visible" } : {}),
                ...style,
            }}
            initial={animate ? {  opacity: 0, y: 50 } : {}}
            animate={animate ? {  opacity: 1, y: 0 } : {}}
            exit={noExitAnimation ? {} : { opacity: 0}}
            transition={animate ? {
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
                delay: randomDelay
            } : {}}
        >
            {children}
        </motion.div>
    );
};