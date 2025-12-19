import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  User,
  FileText,
  FolderOpen,
  Receipt,
  GraduationCap,
  Calendar,
  Briefcase,
  Heart,
  Lightbulb,
  BookOpen,
  Megaphone,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Coffee,
  Home,
  Bus,
  Car,
  Shirt,
  Smartphone,
  Package,
  ClipboardList,
  CalendarCheck,
  Eye,
  UserX,
  Clock,
  LogOut,
  FilePlus,
  Trophy
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ElementType;
  path?: string;
  subItems?: {
    id: string;
    name: string;
    icon: React.ElementType;
    path: string;
  }[];
}

const navigationItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/employee/dashboard'
  },
  {
    id: 'attendance',
    name: 'Attendance',
    icon: CalendarCheck,
    path: '/employee/attendance'
  },
  {
    id: 'leaves',
    name: 'Leaves',
    icon: Calendar,
    subItems: [
      { id: 'apply-leave', name: 'Apply Leave', icon: FilePlus, path: '/employee/leaves' },
      { id: 'check-leave-history', name: 'Check Leave History', icon: Clock, path: '/employee/leave-history' },
      { id: 'gate-pass', name: 'Gate Pass', icon: LogOut, path: '/employee/gate-pass' },
      { id: 'resignation', name: 'Resignation', icon: UserX, path: '/employee/resignation' },
    ],
  },
  {
    id: 'salary',
    name: 'Salary',
    icon: Receipt,
    path: '/employee/payslips'
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: Bus,
    path: '/employee/transport'
  },
  {
    id: 'my-request',
    name: 'My request',
    icon: Briefcase,
    subItems: [
      { id: 'service-catalog', name: 'Service Catalog', icon: ClipboardList, path: '/employee/service-catalog' },
      { id: 'canteen', name: 'Canteen', icon: Coffee, path: '/employee/canteen' },
      { id: 'guest-house', name: 'Guest House', icon: Home, path: '/employee/guest-house' },
      { id: 'parking-facility', name: 'Parking Facility', icon: Car, path: '/employee/parking-facility' },
      { id: 'sports-club', name: 'Sports Club', icon: Trophy, path: '/employee/sports-club' },
      { id: 'uniform', name: 'Uniform', icon: Shirt, path: '/employee/uniform' },
      { id: 'sim-allocation', name: 'SIM Allocation', icon: Smartphone, path: '/employee/sim-allocation' },
      { id: 'asset-requests', name: 'Asset Requests', icon: Package, path: '/employee/asset-requests' },
      { id: 'general-requests', name: 'General Requests', icon: FileText, path: '/employee/requests' },
    ],
  },
  {
    id: 'documents',
    name: 'My documents',
    icon: FolderOpen,
    path: '/employee/documents'
  },
  {
    id: 'training',
    name: 'Training',
    icon: GraduationCap,
    path: '/employee/training'
  },
  {
    id: 'canteen-menu',
    name: 'Canteen',
    icon: Coffee,
    path: '/employee/canteen'
  },
  {
    id: 'smg-imagine',
    name: 'SMG Imagine',
    icon: Lightbulb,
    path: '/employee/imagine'
  },
  {
    id: 'grievance',
    name: 'Grievance Redressal',
    icon: Heart,
    path: '/employee/welfare'
  },
  {
    id: 'policies',
    name: 'Policies',
    icon: BookOpen,
    path: '/employee/policies'
  },
  {
    id: 'facilities',
    name: 'Facilities',
    icon: Home,
    path: '/employee/facilities'
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: User,
    path: '/employee/profile'
  },
  {
    id: 'logout',
    name: 'Logout',
    icon: LogOut,
    path: '/logout'
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>(['leaves', 'my-request']);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <aside
      className={`hidden lg:flex flex-col h-screen bg-[#1e3a5f] transition-all duration-300 shadow-lg ${isCollapsed ? 'w-20' : 'w-72'
        }`}
      style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-white">
            <span className="text-[#1e3a5f] font-bold text-lg">S</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <h3 className="text-2xl font-bold text-white tracking-wider">SMG</h3>
            <p className="text-xs text-white/80">Employee Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              {/* Menu item with dropdown */}
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => !isCollapsed && toggleDropdown(item.id)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group ${openDropdowns.includes(item.id)
                        ? 'bg-white/10 text-white'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    aria-expanded={openDropdowns.includes(item.id)}
                    aria-label={item.name}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={20}
                        strokeWidth={2}
                        className={isCollapsed ? 'mx-auto' : ''}
                      />
                      {!isCollapsed && <span className="text-sm font-normal">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <motion.div
                        animate={{ rotate: openDropdowns.includes(item.id) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                  </button>

                  {/* Dropdown menu with animation */}
                  <AnimatePresence>
                    {openDropdowns.includes(item.id) && !isCollapsed && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mt-1 ml-4 space-y-1 overflow-hidden"
                      >
                        {item.subItems.map((subItem) => (
                          <motion.li
                            key={subItem.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => onNavigate(subItem.id)}
                              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm w-full ${activePage === subItem.id
                                  ? 'bg-white/20 text-white shadow-md'
                                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                              aria-label={subItem.name}
                            >
                              <subItem.icon size={16} strokeWidth={2} />
                              <span>{subItem.name}</span>
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Direct link without dropdown */
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`
                  }
                  aria-label={item.name}
                >
                  <item.icon size={20} strokeWidth={2} className={isCollapsed ? 'mx-auto' : ''} />
                  {!isCollapsed && <span className="text-sm font-normal">{item.name}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - Company Info */}
      {!isCollapsed && (
        <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-white/60 mb-1">Powered by</p>
            <p className="text-sm text-white font-medium">SMG Scooters Pvt Ltd</p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={onToggleCollapse}
        className="h-14 flex items-center justify-center hover:bg-white/5 transition-colors text-white/80 hover:text-white"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight size={20} />
        ) : (
          <div className="flex items-center gap-2">
            <ChevronLeft size={20} />
            <span className="text-sm font-normal">Collapse</span>
          </div>
        )}
      </button>
    </aside>
  );
}
