import { Registry } from '../infra/Registry.js';
import * as AllMockData from '../data/mock-data.js'; 

export function renderStockVelocityPage() {
    const dataSource = AllMockData.inventoryStubs || AllMockData.default?.inventoryStubs || AllMockData.warehouses || [];
    const warehouses = Array.isArray(dataSource) ? dataSource : (dataSource.warehouses || []);

    const content = `
        <div class="p-6 bg-slate-950 min-h-screen">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-white tracking-tight uppercase italic">Stock Velocity</h1>
                    <p class="text-slate-400 mt-1">Real-time throughput analytics and friction detection.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div class="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-white font-medium mb-6 uppercase tracking-widest text-xs">Velocity Index by Zone</h3>
                    <div id="velocity-chart" class="h-64 flex items-end justify-around gap-2 px-4 border-b border-slate-800/50">
                        </div>
                </div>
                
                <div class="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                    <h3 class="text-white font-medium mb-4 text-xs uppercase tracking-widest text-red-400">Friction Alerts</h3>
                    <div id="friction-list" class="space-y-4">
                        </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const chart = document.getElementById('velocity-chart');
        const list = document.getElementById('friction-list');
        if (!chart || !list) return;

        chart.innerHTML = warehouses.map(w => `
            <div class="flex flex-col items-center flex-1 group h-full justify-end">
                <div class="relative w-full bg-blue-600/20 border-t border-x border-blue-500/30 rounded-t-sm transition-all duration-700 hover:bg-blue-500/40" 
                     style="height: ${w.utilization}%">
                </div>
                <span class="text-[8px] font-mono text-slate-500 mt-2 rotate-45 origin-left whitespace-nowrap">${w.zoneName}</span>
            </div>
        `).join('');

        list.innerHTML = warehouses.filter(w => w.utilization > 80).map(w => `
            <div class="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <div>
                    <p class="text-white text-[10px] font-bold uppercase">${w.id}</p>
                    <p class="text-slate-500 text-[10px]">Stagnation Risk: ${w.utilization}% Capacity</p>
                </div>
            </div>
        `).join('') || '<p class="text-slate-600 text-xs italic">Velocity nominal. No friction detected.</p>';
        
        Registry.add({ id: 'stock-velocity-logic', destroy: () => {} });
    }, 0);

    return content;
}
