import Logout from '@/components/logout'

const Dashboard = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <Logout />
        </div>
    )
}

export default Dashboard