"use client";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    progress: number;
  };
  onClick: () => void;
  color: string;
}

const TaskCard = ({ task, onClick, color }: TaskCardProps) => {
  return (
    <div
      onClick={onClick}
      className="p-3 mb-2 rounded shadow-sm border cursor-pointer 
      hover:shadow-md transition-shadow"
      style={{ 
        borderColor: `rgba(${color}, 0.5)`,
        backgroundColor: `rgba(${color}, 0.1)`
      }}>
      <h3 className="font-medium mb-1">{task.title}</h3>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full" 
            style={{ 
              width: `${task.progress}%`,
              backgroundColor: `rgb(${color})`
            }}
          ></div>
        </div>
        <span className="text-xs ml-2 text-gray-500">{task.progress}%</span>
      </div>
    </div>
  );
};

export default TaskCard;