import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: #020617; min-height: 100vh; padding: 2rem; color: #ffffff; font-family: sans-serif;">
            <div style="margin-bottom: 3rem;">
                <h1 style="font-size: 2.5rem; font-weight: 800; text-transform: uppercase; color: #ffffff; margin: 0;">Command Center</h1>
                <p style="color: #64748b; font-family: monospace; font-size: 0.8rem; margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.2em;">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.25rem; cursor: pointer; transition: transform 0.2s;" onclick="location.hash='#/warehouse-grid'">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                        <div style="font-size: 1.5rem; color: #3b82f6;">?</div>
                        <span style="font-size: 10px; color: #3b82f6; font-weight: bold; text-transform: uppercase; padding: 4px 8px; background: rgba(59, 130, 246, 0.1); border-radius: 4px;">Operational</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; color: #ffffff; margin-bottom: 0.75rem;">Operational Pulse</h3>
                    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5;">Manage localized zones and Made-in-KSA asset utilization metrics.</p>
                </div>

                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.25rem; cursor: pointer; transition: transform 0.2s;" onclick="location.hash='#/stock-velocity'">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem;">
                        <div style="font-size: 1.5rem; color: #ef4444;">?</div>
                        <span style="font-size: 10px; color: #ef4444; font-weight: bold; text-transform: uppercase; padding: 4px 8px; background: rgba(239, 68, 68, 0.1); border-radius: 4px;">Real-Time</span>
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: bold; color: #ffffff; margin-bottom: 0.75rem;">Velocity Analytics</h3>
                    <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.5;">Detect supply chain friction and throughput stagnation risks.</p>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
