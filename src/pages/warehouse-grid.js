import { Registry } from '../infra/Registry.js';
import * as AllMockData from '../data/mock-data.js'; 

export function renderWarehouseGridPage() {
    // 1. Locate the data safely
    // We look for 'inventoryStubs' first, then fall back to any 'warehouses' array found in the file
    const dataSource = AllMockData.inventoryStubs || AllMockData.default?.inventoryStubs || AllMockData.warehouses || [];
    const warehouses = Array.isArray(dataSource) ? dataSource : (dataSource.warehouses || []);

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
                <div class="text-slate-500 italic p-4">Accessing localized data stream...</div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const container = document.getElementById('grid-container');
        if (!container) return;

        const updateView = (onlyKSA = false) => {
            const data = onlyKSA ? warehouses.filter(w => w.origin === 'KSA') : warehouses;

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full p-12 text-center border border-dashed border-slate-800 rounded-2xl">
                        <p class="text-slate-500 text-sm">No operational zones detected in current telemetry.</p>
                    </div>`;
                return;
            }

            container.innerHTML = data.map(zone => `
                <div class="bg-slate-900/40 border ${zone.origin === 'KSA' ? 'border-green-500/30' : 'border-slate-800'} p-5 rounded-2xl transition-all hover:bg-slate-800/40">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-2 bg-slate-800 rounded-lg">
                            <i class="fas fa-warehouse ${zone.origin === 'KSA' ? 'text-green-400' : 'text-blue-400'}"></i>
                        </div>
                        ${zone.origin === 'KSA' ? '<span class="text-[10px] text-green-400 font-bold uppercase tracking-widest bg-green-400/10 px-2 py-1 rounded">KSA Origin</span>' : ''}
                    </div>
                    <h3 class="text-white font-semibold">${zone.zoneName || 'Storage Zone'}</h3>
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
