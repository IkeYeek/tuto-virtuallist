import {Task} from "@/app/page";
import {useVirtualizer} from "@tanstack/react-virtual";
import React, {useRef} from "react";

const HugeVirtualtList = ({
                              listData,
                              switchTaskStatus,
                          }: {
    listData: Task[];
    switchTaskStatus: (taskIdx: number) => void;
}) => {
    const scrollElement = useRef<HTMLDivElement>(null);
    const virtualizedListRows = useVirtualizer({
        count: listData.length,
        getScrollElement: () => scrollElement.current,
        estimateSize: () => 25,
        overscan: 30,
    });
    return (
        <>
            <div
                ref={scrollElement}
                style={{
                    overflow: "scroll",
                    height: 800,
                    width: "100%",
                }}

            >
                <div
                    style={{
                        height: `${virtualizedListRows.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {virtualizedListRows.getVirtualItems().map((virtualTask) => {
                        const task = listData[virtualTask.index];
                        console.log(virtualTask.index)
                        return (
                            <div key={virtualTask.key}
                                 style={{
                                     position: 'absolute',
                                     top: 0,
                                     left: 0,
                                     width: '100%',
                                     height: `${virtualTask.size}px`,
                                     transform: `translateY(${virtualTask.start}px)`,
                                     display: "flex",
                                     justifyContent: "space-around"
                                 }}>
                                <button onClick={() => switchTaskStatus(task.id)}>
                                    {task.done ? "❌" : "✅"}
                                </button>
                                <p style={{
                                    textDecoration: task.done ? "line-through" : "",
                                }}>
                                    #{task.id + 1} - {task.content}
                                </p>
                            </div>)
                    })}</div>
            </div>
        </>
    );
};

export default HugeVirtualtList;
