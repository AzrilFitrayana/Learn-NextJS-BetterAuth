'use client'

import { LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const Logout = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login"); // redirect to login page
                    },
                },
            });
            console.log("Logout success")
        } catch (error) {
            console.log("Logout failed", error)
        }
    }

    return (
        <Button variant='outline' onClick={handleLogout}>Logout <LogOut className='size-4' /></Button>
    )
}

export default Logout