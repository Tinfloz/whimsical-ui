import React, { ChangeEvent } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@radix-ui/react-icons'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { Input } from '@/components/ui/input'


type CardProps = {
    title: string;
    description: string;
    imageSrc: string;
    screenType: "private" | "public"
} & React.ComponentProps<typeof Card>

const CardComponent = ({ className, title, description, imageSrc, screenType, ...props }: CardProps) => {

    const [cart, setCart] = useState(false);
    const [paintingVals, setPaintingVals] = useState({
        name:"",
        price:"",
        description:"",
        dimensions:""
    })

    const handleChangePainting = (e:ChangeEvent<HTMLInputElement>) => {
        setPaintingVals(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleEditSubmit = async () => {
        const submitObject = Object.entries(paintingVals).reduce((acc:Record<string, string>, el) => {
            if (el[1] !== ""){
                acc[el[0]] = el[1]
            }
            return acc
        },{})
        console.log(submitObject)
        //TODO: call edit api
    }

    return (
        <>
            <Card className={cn("md:max-w-[500px] max-w-[380px] w-full minh-[580px]", className)} {...props}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 h-[350px]">
                    <img alt='Art' className='w-full h-full object-fit' src={imageSrc} />
                </CardContent>
                <CardFooter>
                    <div className='w-full space-y-4'>
                        <div className='space-x-6'>
                            <Label className='font-bold text-lg'>₹5000</Label>
                            <Label className='font-bold text-lg'>5x12</Label>
                        </div>
                        {
                            screenType === "public" ? (
                                <>
                                    <Button className='w-full' onClick={() => setCart(prevState => !prevState)}>
                                        <CheckIcon className='mr-2 h-4 w-4' /> {!cart ? "Add to cart" : "Added to cart"}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Popover>
                                        <PopoverTrigger className='w-full'>
                                            <Button className='w-full'>
                                                <CheckIcon className='mr-2 h-4 w-4' /> Edit painting
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Edit painting</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set new painting parameters.
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="width">Name</Label>
                                                        <Input
                                                            id="width"
                                                            name="name"
                                                            value={paintingVals.name}
                                                            onChange={handleChangePainting}
                                                            placeholder="Enter a name"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="maxWidth">Description</Label>
                                                        <Input
                                                            id="maxWidth"
                                                            name="description"
                                                            value={paintingVals.description}
                                                            onChange={handleChangePainting}
                                                            placeholder="Enter a description"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="height">Price</Label>
                                                        <Input
                                                            id="height"
                                                            name="price"
                                                            value={paintingVals.price}
                                                            onChange={handleChangePainting}
                                                            placeholder="Enter a price"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="maxHeight">Dimensions</Label>
                                                        <Input
                                                            id="maxHeight"
                                                            name='dimensions'
                                                            value={paintingVals.dimensions}
                                                            onChange={handleChangePainting}
                                                            placeholder="Enter new dimensions"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                    <Button onClick={handleEditSubmit}>
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )
                        }
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default CardComponent