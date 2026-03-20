import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { 
  Building2, 
  Users, 
  Layout, 
  ArrowUpRight, 
  Clock,
  Briefcase,
  ChevronRight,
  Plus
} from "lucide-react";
import { getTenantContext } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NewProjectModal } from "@/components/new-project-modal";
import { ActivityFeed } from "@/components/activity-feed";

export default async function DashboardPage() {
  const context = await getTenantContext();

  // Fetch real-time projects for the organization
  const projects = await prisma.project.findMany({
    where: { organizationId: context.orgId },
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  const stats = [
    { label: "Active Projects", value: projects.length.toString(), icon: Briefcase, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Organization", value: "ADMIN", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Team Size", value: "1", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Efficiency", value: "98%", icon: Layout, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar orgName={context.orgSlug?.toUpperCase() || "ADMIN"} />
        
        <div className="flex-1 flex overflow-hidden">
             {/* Main Scrollable Content */}
             <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 scrollbar-hide">
                 {/* Header & Stats Grid */}
                 <div className="max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase antialiased">
                                Workspace Overview
                            </h2>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                Welcome back, {context.user.name}. Here's the pulse of your workspace today.
                            </p>
                        </div>
                        <NewProjectModal />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-4xl font-black text-slate-900 antialiased">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard Content Grid */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <Briefcase className="h-6 w-6 text-slate-900" />
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase antialiased">Mission-Critical Projects</h3>
                        </div>

                        {projects.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] py-24 flex flex-col items-center justify-center text-center px-6">
                                <div className="p-8 bg-sky-50 rounded-3xl mb-8 border border-sky-100 rotate-3">
                                    <Briefcase className="h-10 w-10 text-sky-600 -rotate-3" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase antialiased mb-3">Initialize Your First Effort</h3>
                                <p className="text-slate-400 font-bold text-sm tracking-wide mb-10 max-w-sm uppercase leading-relaxed">
                                    AdminFlow helps you track complexity with high-fidelity visual context. Create your first project to begin.
                                </p>
                                <NewProjectModal />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {projects.map((project) => (
                                    <div key={project.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-[60px] translate-x-12 translate-y-[-24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                                                    <Briefcase className="h-5 w-5" />
                                                </div>
                                                <div className="flex items-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                                                    {project.status}
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-3 mb-8">
                                                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-sky-600 transition-colors antialiased line-clamp-1">{project.name}</h4>
                                                <p className="text-slate-400 text-xs font-bold leading-relaxed line-clamp-3 uppercase tracking-wider">{project.description || "Systematic coordination for organizational success."}</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    <Clock className="h-3.5 w-3.5 mr-2" />
                                                    Updated Sept 2026
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Sidebar Activity Feed */}
            <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
