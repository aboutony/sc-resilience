import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: #020617; min-height: 100vh; padding: 2.5rem; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="margin-bottom: 3.5rem;">
                <h1 style="font-size: 2.5rem; font-weight: 800; text-transform: uppercase; color: #ffffff; margin: 0; letter-spacing: -0.02em;">Command Center</h1>
                <p style="color: #64748b; font-family: monospace; font-size: 0.8rem; margin-top: 0.75rem; text-transform: uppercase; letter-spacing: 0.25em; opacity: 0.8;">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem;">
                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.5rem; cursor: pointer; position: relative; overflow: hidden;" onclick="location.hash='#/warehouse-grid'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <div style="width: 48px; height: 48px; background: rgba(59, 130, 246, 0.15); color: #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                        </div>
                        <span style="font-size: 10px; color: #3b82f6; font-weight: 800; text-transform: uppercase; padding: 6px 10px; background: rgba(59, 130, 246, 0.1); border-radius: 6px; letter-spacing: 0.05em;">Operational</span>
                    </div>
                    <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Operational Pulse</h3>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0;">Manage localized zones and Made-in-KSA asset utilization metrics.</p>
                </div>

                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.5rem; cursor: pointer; position: relative; overflow: hidden;" onclick="location.hash='#/stock-velocity'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <div style="width: 48px; height: 48px; background: rgba(239, 68, 68, 0.15); color: #ef4444; display: flex; align-items: center; justify-content: center; border-radius: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        </div>
                        <span style="font-size: 10px; color: #ef4444; font-weight: 800; text-transform: uppercase; padding: 6px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 6px; letter-spacing: 0.05em;">Real-Time</span>
                    </div>
                    <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Velocity Analytics</h3>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0;">Detect supply chain friction and throughput stagnation risks.</p>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
