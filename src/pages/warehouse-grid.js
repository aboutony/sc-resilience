import { Registry } from '../infra/Registry.js';
import { inventoryStubs } from '../data/mock-data.js'; // Pointing to the actual file on GitHub

export function renderWarehouseGridPage() {
    const content = `
        <div class="p-6 bg-slate-950 min-h-screen">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-white tracking-tight">Warehouse Grid</h1>
                    <p class="text-slate-400 mt-1">Strategic localization and zone utilization.</p>
                </div>
                <div class="flex gap-3 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                    <button id="filter-all" class="px-4 py-2 rounded-md text-sm font-medium transition-all bg-blue-600 text-white shadow-lg">All Zones</button>
                    <button id="filter-ksa" class="px-4 py-2 rounded-md text-sm font-medium transition-all text-slate-400 hover:text-white">
                        <i class="fas fa-flag-checkered mr-2 text-green-500"></i>Made-in-KSA
                    </button>
                </div>
            </div>
            <div id="grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div class="text-slate-500 italic p-4">Initializing operational telemetry...</div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const container = document.getElementById('grid-container');
        if (!container) return;

        const updateView = (onlyKSA = false) => {
            // Using the inventoryStubs from your mock-data.js
            const warehouses = inventoryStubs?.warehouses || [];
            const data = onlyKSA ? warehouses.filter(w => w.origin === 'KSA') : warehouses;

            if (data.length === 0) {
                container.innerHTML = `<div class="text-slate-500 p-4">No zones found matching this filter.</div>`;
                return;
            }

            container.innerHTML = data.map(zone => `
                <div class="bg-slate-900/40 border ${zone.origin === 'KSA' ? 'border-green-500/30' : 'border-slate-800'} p-5 rounded-2xl transition-all hover:bg-slate-900/60">
                    <div class="flex justify-between items-start mb-4">
                        <i class="fas fa-warehouse ${zone.origin === 'KSA' ? 'text-green-400' : 'text-blue-400'}"></i>
                        ${zone.origin === 'KSA' ? '<span class="text-[10px] text-green-400 font-bold uppercase tracking-widest">KSA Origin</span>' : ''}
                    </div>
                    <h3 class="text-white font-semibold">${zone.zoneName || 'Warehouse Zone'}</h3>
                    <p class="text-xs text-slate-500 font-mono">${zone.id || 'N/A'}</p>
                    <div class="mt-4">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-slate-400">Utilization</span>
                            <span class="text-white">${zone.utilization || 0}%</span>
                        </div>
                        <div class="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500" style="width: ${zone.utilization || 0}%"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        updateView();
        
        document.getElementById('filter-all').onclick = () => updateView(false);
        document.getElementById('filter-ksa').onclick = () => updateView(true);

        Registry.add({
            id: 'warehouse-grid-logic',
            destroy: () => {
                const b1 = document.getElementById('filter-all');
                const b2 = document.getElementById('filter-ksa');
                if(b1) b1.onclick = null;
                if(b2) b2.onclick = null;
            }
        });
    }, 0);

    return content;
}
