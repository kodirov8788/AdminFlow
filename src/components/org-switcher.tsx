import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { 
  Building2, 
  ChevronDown, 
  Check,
  Plus
} from "lucide-react";

export async function OrgSwitcher() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  // Fetch all organizations the user belongs to
  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: { organization: true },
  });

  const activeOrg = memberships.find(m => m.organizationId === session.user.orgId)?.organization;

  return (
    <div className="relative inline-block text-left group">
      <button className="flex items-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all duration-200 shadow-sm antialiased uppercase tracking-widest text-[10px]">
        <Building2 className="mr-2.5 h-4 w-4 text-sky-500" />
        <span className="truncate max-w-[120px]">{activeOrg?.name || "Select Org"}</span>
        <ChevronDown className="ml-2.5 h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </button>

      {/* Dropdown Menu (Simplified for now - pure CSS/React hover or client needed for click. I'll use a hover-based layout for this static version) */}
      <div className="absolute left-0 mt-3 w-64 origin-top-left rounded-2xl bg-white border border-slate-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden transform scale-95 group-hover:scale-100 translate-y-[-10px] group-hover:translate-y-0">
        <div className="p-2 space-y-1">
          <div className="px-4 py-3 border-b border-slate-50 mb-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Your Organizations</p>
          </div>
          
          {memberships.map((membership) => (
            <button
              key={membership.id}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                membership.organizationId === session.user.orgId 
                ? 'bg-sky-50 text-sky-700 border border-sky-100' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                    membership.organizationId === session.user.orgId ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'
                }`}>
                    <Building2 className="h-4 w-4" />
                </div>
                <span className="truncate max-w-[140px] uppercase tracking-wider">{membership.organization.name}</span>
              </div>
              {membership.organizationId === session.user.orgId && (
                <Check className="h-4 w-4 text-sky-600 animate-in zoom-in duration-300" />
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-50 mt-1">
            <button className="w-full flex items-center px-4 py-3 text-[10px] font-black text-slate-400 hover:text-sky-600 transition-colors uppercase tracking-[0.15em]">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
