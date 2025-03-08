import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useUser } from "@/store/contexts/UserContext"
import { useRewards } from "@/store/contexts/RewardsContext"
import { useState } from "react"

const MobileNav = () => {
  const { logout } = useUser()
  const { cleanRewards } = useRewards()
  const [open, setOpen] = useState(false)

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    logout()
    cleanRewards()
  }

  const handleNavigate = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[240px] sm:w-[280px]">
        <NavigationMenu className="mt-4 items-start w-full">
          <NavigationMenuList className="flex-col items-start space-y-2">
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className={`${navigationMenuTriggerStyle()} justify-start w-full`}
                  onClick={handleNavigate}
                >
                  Rewards
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link
                  to="/redemptions"
                  className={`${navigationMenuTriggerStyle()} justify-start w-full`}
                  onClick={handleNavigate}
                >
                  Redemptions
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink asChild>
                <Link
                  to="#"
                  onClick={handleLogout}
                  className={`${navigationMenuTriggerStyle()} justify-start w-full`}
                >
                  Logout
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav