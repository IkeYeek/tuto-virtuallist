import {Task} from "@/app/page";

const HugeDefaultList = ({
                             listData,
                             switchTaskStatus,
                         }: {
    listData: Task[];
    switchTaskStatus: (taskIdx: number) => void;
}) => {
    return (
        <>
            <div
                style={{
                    overflow: "scroll",
                    height: 800,
                    width: "50%",
                }}
            >
                {listData.map((task) => (
                    <div key={task.id} style={{
                        display: "flex",
                    }}>

                        <p style={{
                            textDecoration: task.done ? "line-through" : "",
                            flex: "1 1 content"
                        }}>
                            #{task.id + 1} - {task.content}
                        </p>
                        <button onClick={() => switchTaskStatus(task.id)} style={{
                            flex: "0 1 50px"
                        }}>
                            {task.done ? "❌" : "✅"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default HugeDefaultList;
