'use client'

import { MenuIcon, XIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { managerLinks, NAVBAR_HEIGHT, tenantLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar'
import Link from 'next/link'

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname()
  const { toggleSidebar, open } = useSidebar()

  const navLinks = userType === 'manager' ? managerLinks : tenantLinks

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh)-${NAVBAR_HEIGHT}px`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex min-h-[56px] w-full items-center pt-3 mb-3',
                open ? 'justify-between px-6' : 'justify-center'
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {userType === 'manager' ? 'Manager View' : 'Renter View'}
                  </h1>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={toggleSidebar}
                  >
                    <XIcon className="size-6 text-gray-600" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="hover:bg-gray-100 p-2 rounded-md"
                    onClick={toggleSidebar}
                  >
                    <MenuIcon className="size-6 text-gray-600" />
                  </button>
                </>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'flex items-center p-8',
                    isActive ? 'bg-gray-100' : 'bg:gray-600 hover:bg-gray-100',
                    open ? 'text-blue-600' : 'ml-[5px]'
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`size-5 ${
                          isActive ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? 'text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
