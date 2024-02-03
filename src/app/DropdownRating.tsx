import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

const DropdownRating = ({rating, setRating, setClickPosition}: {
    rating: number;
    setRating: (v: number) => void,
    setClickPosition: (coords: { top: number, left: number }) => void
}) => {
    const possibleRatings = [...Array(5).keys()].map((i) => i + 1); // [1, 2, 3, 4, 5]

    const [active, setActive] = useState(false);

    const handleClickEvent = (e: React.MouseEvent) => {

        setActive(!active);
    }

    const handleRatingChange = (v: number) => {
        setRating(v);
        setActive(false);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [dropdownPortal, setDropdownPortal] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const dropdownPortalCollection = document.getElementsByClassName("dropdown-portal");
        if (dropdownPortal === null && dropdownPortalCollection.length > 0)
            setDropdownPortal(dropdownPortalCollection.item(0) as HTMLDivElement);
    }, [dropdownPortal]);

    return (
        <div style={{position: "relative", width: "50px"}} ref={dropdownRef}>
            <div
                onClick={handleClickEvent}
                style={{
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    paddingBottom: "4px"
                }}
            >
                {rating}
            </div>
            <ul
                style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    display: active ? "block" : "none",
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                    backgroundColor: "black"
                }}
            >
                {possibleRatings.map((possibleRating) => (
                    <li
                        onClick={(e) => handleRatingChange(possibleRating)}
                        style={{
                            width: "40px",
                            border: "1px solid black",
                            textAlign: "center",
                            padding: "4px",
                        }}
                        key={possibleRating}
                    >
                        {possibleRating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownRating;
