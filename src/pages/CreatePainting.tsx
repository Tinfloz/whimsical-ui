import { Dropzone } from "@/components/dropzone/FileDropzone"
import { ChangeEvent, useState } from "react";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IPainting {
    price: string
    name: string
    description: string
    dimensions:string
}

const CreatePainting = () => {

    const [files, setFiles] = useState<string>();

    const [painting, setPainting] = useState<IPainting>({
        price: "",
        name: "",
        description: "",
        dimensions: ""
    })

    const handlePaintingChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPainting(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleCreate = async () => {
        const newPainting = {...painting, painting:files}
        toast("Created successfully!", {
            description:`Created at ${new Date()}`, 
            action:{
                label:"Undo", 
                onClick:() => console.log("Undo")
            }
        })
        console.log(newPainting);
        // TODO: Call API to create painting
    }

    return (
        <>
            <div className="w-full h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-200">
                <div className="w-full h-1/2 flex justify-center pt-20">
                    <Dropzone
                        onChange={setFiles}
                        className="h-1/3 w-4/5 md:w-3/5 md:h-1/2"
                        fileExtensions={["jpeg", "png", "jpg"]}
                    />
                </div>
                <footer className="w-full flex justify-center items-center py-4 bg-white absolute bottom-0">
                    <Sheet>
                        <SheetTrigger>
                            <ChevronUpIcon className="cursor-pointer" />
                        </SheetTrigger>
                        <SheetContent side="bottom">
                            <SheetHeader>
                                Add Painting Details
                            </SheetHeader>
                            <SheetDescription>
                                Add details for your painting. Click submit when done
                            </SheetDescription>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" name="name" value={painting.name} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Description
                                    </Label>
                                    <Input id="username" name="description" value={painting.description} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Price
                                    </Label>
                                    <Input id="username" name="price" value={painting.price} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Dimensions
                                    </Label>
                                    <Input id="username" name="dimensions" value={painting.dimensions} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit" onClick={async () => await handleCreate()}>Submit painting</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </footer>
            </div>
        </>
    )
}

export default CreatePainting