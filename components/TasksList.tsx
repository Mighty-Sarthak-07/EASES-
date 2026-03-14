"use client";

import { CalendarDays, CheckCircle2, Circle, Clock, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
}

export default function TasksList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState(new Date());

    // Handle client-side mounting and interval for time
    useEffect(() => {
        setMounted(true);
        const loadedTasks = localStorage.getItem('eases-tasks');
        if (loadedTasks) {
            try {
                const parsed = JSON.parse(loadedTasks);
                setTasks(cleanExpiredTasks(parsed));
            } catch (e) {
                console.error("Failed to parse tasks");
            }
        }

        const interval = setInterval(() => {
            setTime(new Date());
            setTasks(prev => {
                const cleaned = cleanExpiredTasks(prev);
                if (cleaned.length !== prev.length) {
                    localStorage.setItem('eases-tasks', JSON.stringify(cleaned));
                }
                return cleaned;
            });
        }, 1000 * 60); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const cleanExpiredTasks = (taskList: Task[]) => {
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        return taskList.filter(task => now - task.createdAt < twentyFourHours);
    };

    const saveTasks = (newTasks: Task[]) => {
        setTasks(newTasks);
        localStorage.setItem('eases-tasks', JSON.stringify(newTasks));
    };

    const addTask = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: newTaskTitle.trim(),
            completed: false,
            createdAt: Date.now(),
        };

        saveTasks([newTask, ...tasks]);
        setNewTaskTitle('');
        toast.success("Task added successfully");
    };

    const toggleTask = (id: string) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
        toast.success("Task removed");
    };

    const getTimeRemaining = (createdAt: number) => {
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        const expiresAt = createdAt + twentyFourHours;
        const remainingMs = expiresAt - now;

        if (remainingMs <= 0) return "Expired";

        const hours = Math.floor(remainingMs / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) return `${hours}h ${minutes}m left`;
        return `${minutes}m left`;
    };

    if (!mounted) return null;

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="flex flex-col items-center w-full max-w-[800px] mx-auto gap-8 px-5 animate-in fade-in slide-in-from-bottom-8 duration-500">

            {/* Header Section */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-5 bg-dark-200/50 p-6 sm:p-8 rounded-2xl border border-dark-400 backdrop-blur-md shadow-lg transition-all hover:shadow-xl">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text text-transparent">
                        My Daily Tasks
                    </h2>
                    <p className="text-blue-100/70 mt-3 flex items-center gap-2 text-sm sm:text-base font-medium">
                        <CalendarDays className="size-5" />
                        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-dark-500 bg-dark-400/50 px-5 py-3 rounded-xl border border-dark-300 shadow-inner">
                    <Clock className="size-5 sm:size-6 text-blue-400" />
                    <span className="text-blue-100 font-mono text-lg sm:text-xl font-semibold tracking-wider">
                        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>

            {/* Add Task Input */}
            <form onSubmit={addTask} className="w-full flex gap-3 sm:gap-4 group relative z-10 animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
                <Input
                    className="h-14 sm:h-16 bg-dark-200/80 border-dark-300 text-base sm:text-lg rounded-xl focus-visible:ring-blue-500/50 pl-6 shadow-sm transition-all hover:bg-dark-200 focus:bg-dark-200"
                    placeholder="What do you need to do today?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Button type="submit" disabled={!newTaskTitle.trim()} className="h-14 sm:h-16 px-6 sm:px-10 rounded-xl gradient-blue shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25 active:scale-95 disabled:opacity-50">
                    <Plus className="size-6 sm:size-7 sm:mr-1" />
                    <span className="font-semibold text-lg hidden sm:block">Add</span>
                </Button>
            </form>

            {/* Tasks Lists */}
            <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">

                {tasks.length === 0 && (
                    <div className="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-dark-400 rounded-3xl bg-dark-200/30 text-center transition-all hover:bg-dark-200/50 hover:border-dark-300">
                        <div className="size-20 rounded-full bg-dark-400/50 flex items-center justify-center mb-6 shadow-inner">
                            <CheckCircle2 className="size-10 text-dark-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-100 mb-3 tracking-wide">All caught up!</h3>
                        <p className="text-blue-100/60 max-w-[320px] text-sm sm:text-base leading-relaxed">Add tasks above to start organizing your day. Tasks automatically wash away after 24 hours to keep you fresh.</p>
                    </div>
                )}

                {/* Active Tasks */}
                {activeTasks.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-blue-100/50 uppercase ml-2 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Pending ({activeTasks.length})
                        </h3>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {activeTasks.map(task => (
                                <li key={task.id} className="group flex items-center justify-between p-4 sm:p-5 bg-dark-200/80 backdrop-blur-md border border-dark-300 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 animate-in fade-in slide-in-from-left-4 hover:-translate-y-1">
                                    <div className="flex items-center gap-4 sm:gap-5 flex-1 overflow-hidden">
                                        <button onClick={() => toggleTask(task.id)} className="shrink-0 text-dark-500 hover:text-blue-400 hover:scale-110 active:scale-90 transition-all duration-200">
                                            <Circle className="size-7 sm:size-8" />
                                        </button>
                                        <div className="flex flex-col w-full overflow-hidden">
                                            <span className="text-lg sm:text-xl font-medium text-white truncate transition-colors group-hover:text-blue-50">{task.title}</span>
                                            <span className="text-xs sm:text-sm text-blue-100/60 flex items-center gap-1.5 mt-1 font-medium">
                                                <Clock className="size-3.5 sm:size-4" />
                                                {getTimeRemaining(task.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteTask(task.id)} className="opacity-0 md:opacity-0 group-hover:opacity-100 md:group-hover:-translate-x-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 p-2.5 sm:p-3 rounded-xl transition-all duration-300 shrink-0 ml-2">
                                        <Trash2 className="size-5 sm:size-6" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-dark-400/50">
                        <h3 className="text-sm font-bold tracking-[0.2em] text-blue-100/30 uppercase ml-2 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-dark-500"></span>
                            Completed ({completedTasks.length})
                        </h3>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {completedTasks.map(task => (
                                <li key={task.id} className="group flex items-center justify-between p-4 sm:p-5 bg-dark-300/20 border border-dark-400/30 rounded-2xl opacity-60 hover:opacity-100 transition-all duration-300 animate-in fade-in slide-in-from-left-4 hover:bg-dark-300/40">
                                    <div className="flex items-center gap-4 sm:gap-5 flex-1 overflow-hidden">
                                        <button onClick={() => toggleTask(task.id)} className="shrink-0 text-blue-500 hover:text-blue-400 hover:scale-110 active:scale-90 transition-all duration-200">
                                            <CheckCircle2 className="size-7 sm:size-8" />
                                        </button>
                                        <div className="flex flex-col w-full overflow-hidden">
                                            <span className="text-lg sm:text-xl font-medium text-blue-100/50 line-through truncate">{task.title}</span>
                                            <span className="text-xs sm:text-sm text-blue-100/30 flex items-center gap-1.5 mt-1">
                                                <Clock className="size-3.5 sm:size-4" />
                                                {getTimeRemaining(task.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteTask(task.id)} className="opacity-0 md:opacity-0 group-hover:opacity-100 md:group-hover:-translate-x-2 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 p-2.5 sm:p-3 rounded-xl transition-all duration-300 shrink-0 ml-2">
                                        <Trash2 className="size-5 sm:size-6" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
