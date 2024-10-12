import { getConfig } from "@/utils/get.token"
import axios from "axios"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const GetAllUsers = () => {

    const [user, setUsers] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = (await axios.get("http://localhost:5001/api/v1/user/get/users", getConfig())).data.users;
            setUsers(_prevState => res)
        })()
    }, [])

    return (
        <>
            <div className="w-screen h-screen p-10 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200 flex justify-center">
                <Table className="bg-white overflow-y-scroll rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Id</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>User Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user._id}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default GetAllUsers