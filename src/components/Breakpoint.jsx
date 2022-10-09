import { useState, useEffect } from "react";

export default function useBreakpoint() {
    const usualNavWidth = 540;
    const [ breakpoint, setBreakpoint ] = useState({
        size:
            (window.innerWidth < usualNavWidth) ? "small" :             // mobile
            (window.innerWidth > (usualNavWidth * 3)) ? "large" :       // kiosk
            "default",                                                  // regular
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    });

    useEffect(() => {
        const checkWidth = () => {
            setBreakpoint({
                size:
                    (window.innerWidth < usualNavWidth) ? "small" :         // mobile
                    (window.innerWidth > (usualNavWidth * 3)) ? "large" :   // kiosk
                    "default",                                              // regular
                screenWidth: window.innerWidth
            });
            console.log("Screen size", breakpoint.size);
        }

        window.addEventListener("resize", checkWidth);

        return() => {
            window.removeEventListener("resize", checkWidth);
        }
    })

    return breakpoint.size;
}