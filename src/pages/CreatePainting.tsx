import { Dropzone } from "@/components/dropzone/FileDropzone"
import { ChangeEvent, useState } from "react";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getConfig } from "@/utils/get.token";
import axios from "axios";

interface IPainting {
    price: string
    paintingName: string
    paintingDesc: string
    dimension:string,
    medium:string, 
}

const CreatePainting = () => {

    const [files, setFiles] = useState<string>();
    const [loading, setLoading] = useState<boolean>();

    const [painting, setPainting] = useState<IPainting>({
        price: "",
        paintingName: "",
        paintingDesc: "",
        dimension: "",
        medium:""
    })

    const handlePaintingChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPainting(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleCreate = async () => {
        setLoading(true)
        const newPainting = {...painting, painting:files}
        try {
            const response = (await axios.post("http://localhost:5001/api/v1/content/create/painting", newPainting, getConfig())).data.message;
            toast(response, {
                description:`Created at ${new Date()}`, 
                action:{
                    label:"Undo", 
                    onClick:() => console.log("Undo")
                }
            })
        } catch (error) {
            console.error(error);
            toast("Could not create painting!", {
                description:"Could not create painting", 
                action:{
                    label:"Undo", 
                    onClick:() => console.log("Undo")
                }
            })
        } finally {
            setLoading(false);
            setPainting({
                price: "",
                paintingName: "",
                paintingDesc: "",
                dimension: "",
                medium:""
            });
        }
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
                                    <Input id="name" name="paintingName" value={painting.paintingName} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="desc" className="text-right">
                                        Description
                                    </Label>
                                    <Input id="desc" name="paintingDesc" value={painting.paintingDesc} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input id="price" name="price" value={painting.price} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="dimensions" className="text-right">
                                        Dimensions
                                    </Label>
                                    <Input id="dimensions" name="dimension" value={painting.dimension} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="medium" className="text-right">
                                        Medium
                                    </Label>
                                    <Input id="medium" name="medium" value={painting.medium} onChange={handlePaintingChange} className="col-span-3" />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit" onClick={async () => await handleCreate()}>{loading?"...":"Submit painting"}</Button>
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