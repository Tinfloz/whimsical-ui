import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { getConfig } from "@/utils/get.token"

const formSchema = z.object({
    email: z.string().email(),
    userName: z.string(),
    password: z.string()
})


const CreateUser = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const [loading, setLoading] = useState(false);

    const submitUserCreation = async (data:z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = (await axios.post("http://localhost:5001/api/v1/user/create/user", data, getConfig())).data.message;
            toast(response, {
                description:`User created at ${new Date()}`, 
                action:{
                    label:"Undo", 
                    onClick:() => console.log("Undo")
                }
            })
        } catch (error) {
            console.error(error);
            toast("User could not be created", {
                description:"User could not be created successully", 
                action:{
                    label:"Undo", 
                    onClick:() => console.log("Undo")
                }
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200">
                <Form {...form}>
                    <form className="space-y-4 w-4/5 md:w-5/12 min-h-1/2 bg-blue-100 p-10 rounded-md" onSubmit={form.handleSubmit(submitUserCreation)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="User name or email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid email
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" placeholder="User name or email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid user name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" type="password" placeholder="User name or email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a valid password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{loading ? "..." : "Submit"}</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default CreateUser