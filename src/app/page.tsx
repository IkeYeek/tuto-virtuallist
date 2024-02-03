"use client";
import {useCallback, useEffect, useState} from "react";
import HugeVirtualizedList from "@/app/HugeVirtualizedList";
import dynamic from "next/dynamic";

const HugeDefaultList = dynamic(() => import('./HugeDefaultList'), {ssr: false})  // This component is causing React Hydratation issues and I don't like errors.
const exampleTasks = [
    "Sortir les poubelles",
    "Acheter des oeufs",
    "Acheter du lait",
    "Nourrir le chat",
    "Nourrir le chien",
    "Acheter des piles AA",
    "Promener le chien",
    "Acheter agraffes",
    "Appeler la CAF (prévoir après-midi complète)",
    "Acheter du café",
    "Faire la lessive",
    "Etendre la lessive",
]

export type Task = {
    id: number;
    content: string;
    done: boolean;
    rating: number;
};

const listType: "Default" | "Virtualized" = "Virtualized";

export default function Home() {

    const randomExampleTask = useCallback((): string => exampleTasks[Math.floor(Math.random() * exampleTasks.length)], []);
    const createMockData = useCallback((size: number): Task[] => {
        return [...Array(size).keys()].map(
            (idx) =>
                ({
                    id: idx,
                    content: randomExampleTask(),
                    done: false,
                    rating: 0,
                }) as Task,
        );
    }, [randomExampleTask]);
    const [listData, setListData] = useState(() => createMockData(50000));
    const [dropdownPortalPosition, setDropdownPortalPosition] = useState<{ top: number, left: number }>({
        top: 0,
        left: 0
    });
    const handleRatingChange = (taskIdx: number, rating: number) => {
        setListData(listData.map(task => task.id === taskIdx ? {
            ...task,
            rating
        } : task))
    }

    const switchTaskStatus = (taskIdx: number) => setListData(
        listData.map((task) =>
            task.id === taskIdx ? {...task, done: !task.done} : task,
        ),
    )


    return (
        <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <div className={"dropdown-portal"} style={{
                position: "fixed",
                zIndex: 1,
                top: dropdownPortalPosition.top,
                left: dropdownPortalPosition.left - 5,
            }}></div>
            {
                listType === "Default" ? <HugeDefaultList
                    listData={listData}
                    switchTaskStatus={switchTaskStatus}
                /> : <HugeVirtualizedList
                    listData={listData}
                    switchTaskStatus={switchTaskStatus}
                    setClickPosition={setDropdownPortalPosition}
                    handleRatingChange={handleRatingChange}
                />
            }
        </main>
    );
}
