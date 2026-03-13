import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: #020617; min-height: 100vh; padding: 2.5rem; color: #ffffff; font-family: sans-serif;">
            
            <div style="margin-bottom: 3rem; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: -0.02em;">Command Center</h1>
                    <p style="color: #64748b; font-family: monospace; font-size: 0.8rem; margin-top: 0.75rem; text-transform: uppercase; letter-spacing: 0.25em;">v2.1 // ORACLE ATOMIC // LIVE TELEMETRY</p>
                </div>
                <div style="text-align: right;">
                    <span style="display: block; color: #3b82f6; font-size: 10px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">System Integrity</span>
                    <span style="color: #10b981; font-weight: bold;">? OPTIMAL</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
                ${['Efficiency', 'Resilience', 'Local Content', 'Throughput'].map(stat => `
                    <div style="background: #0f172a; border: 1px solid #1e293b; padding: 1.5rem; border-radius: 1rem;">
                        <p style="color: #64748b; font-size: 10px; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">${stat}</p>
                        <h2 style="font-size: 1.5rem; font-weight: 700;">${Math.floor(Math.random() * 20) + 80}%</h2>
                    </div>
                `).join('')}
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem;">
                
                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.5rem; cursor: pointer; transition: transform 0.2s;" onclick="location.hash='#/warehouse-grid'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <div style="width: 48px; height: 48px; background: rgba(59, 130, 246, 0.15); color: #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                        </div>
                        <span style="font-size: 10px; color: #3b82f6; font-weight: 800; text-transform: uppercase; padding: 6px 10px; background: rgba(59, 130, 246, 0.1); border-radius: 6px;">Operational</span>
                    </div>
                    <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Operational Pulse</h3>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">Manage localized zones and Made-in-KSA asset utilization metrics.</p>
                </div>

                <div style="background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1.5rem; cursor: pointer;" onclick="location.hash='#/stock-velocity'">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <div style="width: 48px; height: 48px; background: rgba(239, 68, 68, 0.15); color: #ef4444; display: flex; align-items: center; justify-content: center; border-radius: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </div>
                        <span style="font-size: 10px; color: #ef4444; font-weight: 800; text-transform: uppercase; padding: 6px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">Real-Time</span>
                    </div>
                    <h3 style="font-size: 1.4rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Velocity Analytics</h3>
                    <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">Detect supply chain friction and throughput stagnation risks.</p>
                </div>

                <div style="border: 2px dashed #1e293b; padding: 2rem; border-radius: 1.5rem; display: flex; align-items: center; justify-content: center; opacity: 0.3;">
                    <span style="font-size: 10px; text-transform: uppercase; font-weight: 900; letter-spacing: 0.4em;">Syncing...</span>
                </div>

            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
