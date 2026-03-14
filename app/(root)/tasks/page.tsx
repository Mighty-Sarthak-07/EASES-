import Header from '@/components/Header';
import Notifications from '@/components/Notifications';
import TasksList from '@/components/TasksList';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'EASES - Tasks',
    description: 'Manage your daily tasks and productivity.',
}

const TasksPage = async () => {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect('/sign-in');

    return (
        <main className="home-container">
            <Header className="sticky left-0 top-0">
                <div className="flex items-center gap-2 lg:gap-4 z-50">
                    <Notifications />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Header>

            <div className="w-full flex-1 pt-6 pb-20">
                <TasksList />
            </div>
        </main>
    )
}

export default TasksPage
