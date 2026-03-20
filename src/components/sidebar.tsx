"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  ShieldAlert, 
  Users,
  Terminal
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Audit Logs', href: '/audit', icon: ShieldAlert },
  { name: 'API Reference', href: '/api-docs', icon: Terminal },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-slate-900 border-r border-slate-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-white text-xl font-bold tracking-tight">AdminFlow</span>
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-400 font-medium border border-sky-400/30">PRO</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'
                      } mr-3 flex-shrink-0 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-slate-800/50 p-4 border-t border-slate-800">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                    <span className="text-xs font-medium text-slate-300">AD</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white group-hover:text-slate-300">Admin</p>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-slate-400">View profile</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
