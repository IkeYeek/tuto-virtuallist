import {Task} from "@/app/page";
import {useVirtualizer} from "@tanstack/react-virtual";
import React, {useEffect, useRef, useState} from "react";
import DropdownRating from "@/app/DropdownRating";

const HugeVirtualtList = ({
                              listData,
                              handleRatingChange,
                              switchTaskStatus,
                              setClickPosition
                          }: {
    listData: Task[];
    switchTaskStatus: (taskIdx: number) => void;
    handleRatingChange: (taskIdx: number, rating: number) => void;
    setClickPosition: (coords: { top: number, left: number }) => void;
}) => {
    const scrollElement = useRef<HTMLDivElement>(null);
    const virtualizedListRows = useVirtualizer({
        count: listData.length,
        getScrollElement: () => scrollElement.current,
        estimateSize: () => 25,
        overscan: 400,
    });


    return (
        <div
            ref={scrollElement}
            style={{
                overflow: "scroll",
                height: 800,
                width: "50%",
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
                            <p style={{
                                textDecoration: task.done ? "line-through" : "",
                                flex: "1 1 content"
                            }}>
                                #{task.id + 1} - {task.content}
                            </p>
                            <div style={{
                                flex: "0 1 50px"
                            }}><DropdownRating rating={task.rating}
                                               setRating={(rating) => handleRatingChange(task.id, rating)}
                                               setClickPosition={setClickPosition}/>
                            </div>
                            <button onClick={() => switchTaskStatus(task.id)} style={{
                                flex: "0 1 50px"
                            }}>
                                {task.done ? "❌" : "✅"}
                            </button>
                        </div>)
                })}</div>
        </div>
    );
};

export default HugeVirtualtList;
