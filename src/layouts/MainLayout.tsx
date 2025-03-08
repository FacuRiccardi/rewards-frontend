import { Outlet, Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import MobileNav from "@/components/layout/MobileNav"
import { PointsBalance } from "@/components/common/PointsBalance"
import { useUser } from "@/store/contexts/UserContext"
import { useRewards } from "@/store/contexts/RewardsContext"

const MainLayout = () => {
  const { user, logout } = useUser()
  const { cleanRewards } = useRewards()

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
    cleanRewards()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Rewards</h1>
            <PointsBalance points={user?.points} />
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Rewards
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/redemptions" className={navigationMenuTriggerStyle()}>
                    Redemptions
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="#"
                    onClick={handleLogout}
                    className={navigationMenuTriggerStyle()}
                  >
                    Logout
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-2 mt-[72px]">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout