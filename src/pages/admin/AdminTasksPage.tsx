import { Link } from "react-router-dom";
import { useDataStore } from "../../context/DataStoreContext";
import { Card } from "../../components/ui/Card";
import { Select } from "../../components/ui/Input";
import type { TaskStatus } from "../../types";
import { cn } from "../../lib/utils";

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "in_progress", label: "In Progress" },
  { status: "completed", label: "Completed" },
  { status: "blocked", label: "Blocked" },
];

export function AdminTasksPage() {
  const { internalTasks, updateTaskStatus } = useDataStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink dark:text-paper">Tasks</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/55">Internal tasks generated from client applications.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COLUMNS.map((col) => {
          const tasks = internalTasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-ink dark:text-paper">{col.label}</h2>
                <span className="rounded-full bg-ink/8 px-2 py-0.5 text-xs text-ink-soft dark:bg-white/10 dark:text-paper/60">{tasks.length}</span>
              </div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <Card key={task.id} className={cn("p-3", col.status === "blocked" && "border-red-200 dark:border-red-900/40")}>
                    <Link to={`/admin/applications/${task.applicationId}`} className="text-sm font-medium text-ink hover:underline dark:text-paper">
                      {task.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-soft dark:text-paper/50">{task.applicationRef}</p>
                    {task.assignedStaffName && (
                      <p className="mt-1 text-xs text-ink-soft/80 dark:text-paper/40">{task.assignedStaffName}</p>
                    )}
                    <Select
                      className="mt-2 h-7 w-full text-xs"
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskStatus)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="blocked">Blocked</option>
                    </Select>
                  </Card>
                ))}
                {tasks.length === 0 && (
                  <p className="px-1 text-xs text-ink-soft/60 dark:text-paper/30">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
