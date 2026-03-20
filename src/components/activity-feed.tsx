import prisma from "@/lib/prisma";
import { getTenantContext } from "@/lib/auth";
import { formatDistanceToNow } from "date-fns";
import { 
  PlusCircle, 
  Trash2, 
  RefreshCcw, 
  UserPlus, 
  Settings,
  Activity,
  User
} from "lucide-react";

const actionIcons: Record<string, any> = {
  CREATE: PlusCircle,
  DELETE: Trash2,
  UPDATE: RefreshCcw,
  INVITE: UserPlus,
  JOIN: UserPlus,
};

const actionColors: Record<string, string> = {
  CREATE: "text-emerald-500 bg-emerald-50",
  DELETE: "text-rose-500 bg-rose-50",
  UPDATE: "text-sky-500 bg-sky-50",
  INVITE: "text-amber-500 bg-amber-50",
};

export async function ActivityFeed() {
  const context = await getTenantContext();

  const logs = await prisma.auditLog.findMany({
    where: { organizationId: context.orgId },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: true },
  });

  return (
    <div className="bg-white border-l border-slate-100 w-full h-full p-8 hidden xl:block">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2.5">
            <Activity className="h-5 w-5 text-slate-400" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest antialiased">Live Activity Feed</h2>
        </div>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
            <Settings className="h-6 w-6 text-slate-300 animate-spin-slow" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting system events...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {logs.map((log) => {
            const Icon = actionIcons[log.action] || Activity;
            const colorClass = actionColors[log.action] || "text-slate-400 bg-slate-50";

            return (
              <div key={log.id} className="relative pl-8 group">
                {/* Timeline Line */}
                <div className="absolute left-[11px] top-6 bottom-[-32px] w-[1px] bg-slate-100 group-last:hidden"></div>
                
                {/* Action Icon Node */}
                <div className={`absolute left-0 top-0 h-6 w-6 rounded-lg flex items-center justify-center z-10 ${colorClass}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed antialiased">
                    <span className="font-black text-slate-900 uppercase tracking-wider">{log.user?.name || "System"}</span>
                    {" "}{log.action.toLowerCase()}d a {log.entityType.toLowerCase()}{" "}
                    {log.details && typeof log.details === 'object' && (log.details as any).name && (
                         <span className="font-bold text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-md">{(log.details as any).name}</span>
                    )}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {logs.length > 0 && (
        <button className="mt-12 w-full py-3 bg-slate-50 hover:bg-slate-100 text-[10px] font-black text-slate-500 hover:text-slate-700 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] border border-slate-100">
          View All Logs
        </button>
      )}
    </div>
  );
}
