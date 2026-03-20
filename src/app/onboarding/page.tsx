import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Plus, Building2, LayoutDashboard } from "lucide-react";
import { createTenant } from "@/app/actions/tenant";

export default async function OnboardingPage() {
  const session = await auth();

  // 1. Force Auth
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 2. Check if user already has an org
  if (session.user.orgId) {
    redirect("/");
  }

  // Action for the Form
  async function onboardingAction(formData: FormData) {
    "use server"
    const name = formData.get("orgName") as string;
    const session = await auth();
    const email = session?.user?.email;

    if (!name || !email) return;

    const result = await createTenant(name, email);
    
    if (result.success) {
      // Re-sign in to refresh the JWT session with the new orgId
      // In production, we'd trigger a session update here.
      // Redirect to dashboard with a refresh flag
      redirect("/?refresh=true");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs (Consistent with Login) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-12 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
             <div className="h-16 w-16 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight text-center antialiased uppercase">Create Organization</h1>
            <p className="mt-2 text-slate-400 font-medium text-sm tracking-wide text-center uppercase">Define the space where you and your team will build AdminFlow.</p>
          </div>

          <form action={onboardingAction} className="space-y-8">
            <div>
              <label htmlFor="orgName" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Organization Name</label>
              <input
                type="text"
                name="orgName"
                id="orgName"
                required
                placeholder="e.g. Acme Corp Industries"
                className="w-full h-14 bg-slate-800/50 border border-slate-700/50 text-white px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder-slate-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-xl antialiased uppercase tracking-widest text-xs"
            >
              <Plus className="mr-3 h-5 w-5" />
              Setup Organization
            </button>

            <div className="flex items-center justify-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1">
                    <LayoutDashboard className="h-3 w-3" />
                    <span>Instant Dashboard</span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>Multi-tenant Isolation</span>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
