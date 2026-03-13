import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: var(--bg-deep, #020617); min-height: 100vh; padding: 2rem; color: white;">
            <div style="margin-bottom: 2.5rem;">
                <h1 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.05em; text-transform: uppercase;">Command Center</h1>
                <p style="color: #64748b; font-family: monospace; font-size: 0.75rem; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 1.5rem; border-radius: 1rem; cursor: pointer;" onclick="location.hash='#/warehouse-grid'">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                        <div style="width: 40px; height: 40px; background: rgba(59, 130, 246, 0.1); color: #60a5fa; display: flex; align-items: center; justify-content: center; border-radius: 0.5rem;">
                            <i class="fas fa-th-large"></i>
                        </div>
                        <span style="font-size: 10px; color: #3b82f6; font-weight: bold; text-transform: uppercase; padding: 4px 8px; background: rgba(59, 130, 246, 0.05); border-radius: 4px;">Operational</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Operational Pulse</h3>
                    <p style="color: #94a3b8; font-size: 0.875rem;">Manage localized zones and Made-in-KSA asset utilization metrics.</p>
                </div>

                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 1.5rem; border-radius: 1rem; cursor: pointer;" onclick="location.hash='#/stock-velocity'">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                        <div style="width: 40px; height: 40px; background: rgba(239, 68, 68, 0.1); color: #f87171; display: flex; align-items: center; justify-content: center; border-radius: 0.5rem;">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <span style="font-size: 10px; color: #ef4444; font-weight: bold; text-transform: uppercase; padding: 4px 8px; background: rgba(239, 68, 68, 0.05); border-radius: 4px;">Real-Time</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Velocity Analytics</h3>
                    <p style="color: #94a3b8; font-size: 0.875rem;">Detect supply chain friction and throughput stagnation risks.</p>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
