"use client"

import { useState } from "react";
import { Plus, X, Layers, Activity } from "lucide-react";
import { createProject } from "@/app/actions/project";

export function NewProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  async function action(formData: FormData) {
    setIsPending(true);
    const result = await createProject(formData);
    setIsPending(false);
    
    if (result.success) {
      setIsOpen(false);
    }
  }

  return (
    <>
      <button 
        onClick={toggle}
        className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-full text-xs font-bold transition-all duration-300 shadow-lg shadow-sky-600/20 active:scale-95 antialiased uppercase tracking-widest"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={toggle}></div>
          
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-50 rounded-xl">
                    <Layers className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase antialiased">New Project</h3>
              </div>
              <button onClick={toggle} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={action} className="p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  autoFocus
                  placeholder="e.g. Next-Gen Dashboard UI"
                  className="w-full h-14 bg-slate-50 border border-slate-200 text-slate-900 px-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all placeholder-slate-400 font-medium"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Description (Optional)</label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  placeholder="What are the key delivery goals for this effort?"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all placeholder-slate-400 font-medium whitespace-pre-wrap"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={toggle}
                  className="px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl disabled:opacity-50 flex items-center antialiased uppercase tracking-widest text-[10px]"
                >
                  {isPending ? (
                    <Activity className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  {isPending ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
