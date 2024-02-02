"use client";
import {useState} from "react";
import HugeVirtualizedList from "@/app/HugeVirtualizedList";

export type Task = {
    id: number;
    content: string;
    done: boolean;
};

const createMockData = (): Task[] => {
    return [...Array(10).keys()].map(
        (idx) =>
            ({
                id: idx,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Urna duis convallis convallis tellus.",
                done: false,
            }) as Task,
    );
};

export default function Home() {
    const [listData, setListData] = useState(() => createMockData());
    return (
        <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <HugeVirtualizedList
                listData={listData}
                switchTaskStatus={(taskIdx: number) =>
                    setListData(
                        listData.map((task) =>
                            task.id === taskIdx ? {...task, done: !task.done} : task,
                        ),
                    )
                }
            />
        </main>
    );
}
