import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background-color: #020617;" class="p-8 min-h-screen text-white">
            <div class="mb-10">
                <h1 class="text-4xl font-bold tracking-tighter uppercase">Command Center</h1>
                <p class="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div style="background-color: #0f172a; border: 1px solid #1e293b;" class="group p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer" onclick="location.hash='#/warehouse-grid'">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <span class="text-[10px] text-blue-500 font-bold tracking-widest uppercase bg-blue-500/5 px-2 py-1 rounded">Operational</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Operational Pulse</h3>
                    <p class="text-slate-400 text-sm">Manage localized zones and Made-in-KSA asset utilization metrics.</p>
                </div>

                <div style="background-color: #0f172a; border: 1px solid #1e293b;" class="group p-6 rounded-2xl hover:border-red-500/50 transition-all cursor-pointer" onclick="location.hash='#/stock-velocity'">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <span class="text-[10px] text-red-500 font-bold tracking-widest uppercase bg-red-500/5 px-2 py-1 rounded">Real-Time</span>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Velocity Analytics</h3>
                    <p class="text-slate-400 text-sm">Detect supply chain friction and throughput stagnation risks.</p>
                </div>

                <div class="bg-slate-900/30 border-2 border-dashed border-slate-800/50 p-6 rounded-2xl flex items-center justify-center opacity-40">
                    <span class="text-slate-700 text-[10px] uppercase tracking-[0.3em] font-black">Next Module Initializing</span>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
