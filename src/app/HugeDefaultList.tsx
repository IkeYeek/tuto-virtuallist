import {Task} from "@/app/page";

const hugeDefaultList = ({
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
                }}

            >
                {listData.map((task) => (
                    <div key={task.id} style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <button onClick={() => switchTaskStatus(task.id)}>
                            {task.done ? "❌" : "✅"}
                        </button>
                        <p style={{
                            textDecoration: task.done ? "line-through" : "",
                        }}>
                            #{task.id + 1} - {task.content}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default hugeDefaultList;
