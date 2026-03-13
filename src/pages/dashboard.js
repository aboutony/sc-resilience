import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div class="p-8 bg-slate-950 min-h-screen">
            <div class="mb-10">
                <h1 class="text-4xl font-bold text-white tracking-tighter uppercase">Command Center</h1>
                <p class="text-slate-500 font-mono text-xs mt-2">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer" onclick="location.hash='#/warehouse-grid'">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <span class="text-[10px] text-blue-500 font-bold tracking-widest uppercase">Operational</span>
                    </div>
                    <h3 class="text-white text-lg font-semibold">Operational Pulse</h3>
                    <p class="text-slate-500 text-sm mt-2">Manage localized zones and Made-in-KSA asset utilization.</p>
                </div>

                <div class="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-red-500/50 transition-all cursor-pointer" onclick="location.hash='#/stock-velocity'">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-red-500/10 rounded-lg text-red-400 group-hover:scale-110 transition-transform">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <span class="text-[10px] text-red-500 font-bold tracking-widest uppercase">Real-Time</span>
                    </div>
                    <h3 class="text-white text-lg font-semibold">Velocity Analytics</h3>
                    <p class="text-slate-500 text-sm mt-2">Detect supply chain friction and throughput stagnation risks.</p>
                </div>

                <div class="bg-slate-900/20 border border-dashed border-slate-800 p-6 rounded-2xl flex items-center justify-center">
                    <span class="text-slate-700 text-xs uppercase tracking-widest font-bold">More Modules Loading...</span>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
