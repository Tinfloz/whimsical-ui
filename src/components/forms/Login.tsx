import {Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage } from '@/components/ui/form'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {z} from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const formSchema = z.object({
    user:z.union([
        z.string(), 
        z.string().email()
    ]),
    password:z.string()
})

const Login = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema)
    })

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data:z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = (await axios.post("http://localhost:5001/api/v1/auth/login", data)).data;
            localStorage.setItem("user", JSON.stringify({
                token:response.token, 
                ...response.user
            }))
            toast("Logged in successfully!", {
                description:`Logged in at ${new Date()}`, 
                action:{
                    label:"Undo", 
                    onClick:() => console.log("Undo")
                }
            })
            navigate("/splash");
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false)
        }
    }


  return (
    <Form {...form}>
        <form className='space-y-4 w-5/12 bg-blue-100 p-10 rounded-md' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="user"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>User</FormLabel>
                        <FormControl>
                            <Input className="bg-white"  placeholder="User name or email" {...field}/>
                        </FormControl>
                        <FormDescription>
                            Enter a valid email or user name
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" className="bg-white" placeholder="*******" {...field}/>
                        </FormControl>
                        <FormDescription>
                            Enter your password
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit">{loading?"...":"Submit"}</Button>
        </form>
    </Form>
  )
}

export default Login