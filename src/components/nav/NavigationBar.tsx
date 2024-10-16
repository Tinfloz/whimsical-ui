import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, PersonIcon, HomeIcon } from "@radix-ui/react-icons"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { FC, ReactNode } from "react"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavigationBar: FC<{ children: ReactNode }> = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {
                location.pathname === "/login" ? (
                    <>
                        {children}
                    </>
                ) : (
                    <>
                        <div className="w-screen h-screen">
                            <div className="hidden md:flex bg-white p-4 justify-between items-center">
                                <NavigationMenu>
                                    <NavigationMenuList className="space-x-6">
                                        <NavigationMenuItem>
                                            <p className="cursor-pointer font-semibold" onClick={() => navigate("/splash")}>Home</p>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <p className="cursor-pointer font-semibold" onClick={() => navigate("/create/user")}>Add User</p>
                                        </NavigationMenuItem>
                                        {/* <NavigationMenuItem>
                                            <p className="cursor-pointer font-semibold">Cart</p>
                                        </NavigationMenuItem> */}
                                    </NavigationMenuList>
                                </NavigationMenu>
                                <Button onClick={() => {
                                    navigate("/login");
                                    localStorage.clear();
                                }}>
                                    Logout
                                </Button>
                            </div>
                            <div className="md:hidden bg-white p-4">
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <HamburgerMenuIcon />
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>App Menu</SheetTitle>
                                                    </SheetHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-2 items-center gap-4">
                                                            <HomeIcon />
                                                            <Label htmlFor="name" className="text-right" onClick={() => navigate("/splash")}>
                                                                Home
                                                            </Label>
                                                        </div>
                                                        <div className="grid grid-cols-2 items-center gap-4">
                                                            <PersonIcon />
                                                            <Label htmlFor="name" className="text-right" onClick={() => navigate("/create/user")}>
                                                                Add Users
                                                            </Label>
                                                        </div>
                                                        {/* <div className="grid grid-cols-2 items-center gap-4">
                                                            <BackpackIcon />
                                                            <Label htmlFor="name" className="text-right">
                                                                Cart
                                                            </Label>
                                                        </div> */}
                                                    </div>
                                                    <SheetFooter>
                                                        <SheetClose asChild>
                                                            <Button type="submit" onClick={() => {
                                                                navigate("/login");
                                                                localStorage.clear();
                                                            }}>Logout</Button>
                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                            {children}
                        </div>
                    </>
                )
            }
        </>
    )
}

export default NavigationBar