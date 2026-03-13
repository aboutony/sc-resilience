import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div class="dashboard-container" style="background: #0d1117; min-height: 100vh; color: #ffffff; font-family: 'Inter', sans-serif;">
            
            <div style="background: rgba(13, 17, 23, 0.7); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 1.25rem 3rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="color: #475569; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em;">Supply Chain Resilience</span>
                    <span style="color: #1e293b; font-size: 1.2rem;">/</span>
                    <span style="color: #f8fafc; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">Chapter 1: Strategic Command</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; background: rgba(16, 185, 129, 0.05); padding: 0.5rem 1rem; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 12px #10b981;"></div>
                    <span style="font-size: 9px; font-weight: 900; color: #10b981; text-transform: uppercase;">System Integrity: Optimal</span>
                </div>
            </div>

            <div style="padding: 4rem 3rem;">
                <div style="margin-bottom: 5rem;">
                    <h1 style="font-size: 4rem; font-weight: 800; letter-spacing: -0.05em; margin: 0; background: linear-gradient(to bottom, #FFFFFF 30%, #475569 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Command Center</h1>
                    <p style="color: #475569; font-family: monospace; font-size: 0.85rem; margin-top: 1.25rem; text-transform: uppercase; letter-spacing: 0.4em;">V2.1 // ORACLE ATOMIC // SOVEREIGN ENGINE</p>
                </div>

                <div class="grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 5rem;">
                    <div class="card-panel" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 2rem; border-radius: 0.5rem;">
                        <p style="color: #475569; font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem;">Total Procurement Value</p>
                        <h2 style="font-family: monospace; font-size: 1.4rem; font-weight: 700;">SAR 42,850,000.00</h2>
                    </div>
                    <div class="card-panel" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 2rem; border-radius: 0.5rem;">
                        <p style="color: #475569; font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem;">Supply Resilience Index</p>
                        <h2 style="font-family: monospace; font-size: 1.8rem; font-weight: 700; color: #10b981;">94.2%</h2>
                    </div>
                    <div class="card-panel" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 2rem; border-radius: 0.5rem;">
                        <p style="color: #475569; font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem;">Local Content Score</p>
                        <h2 style="font-family: monospace; font-size: 1.8rem; font-weight: 700; color: #3b82f6;">88.5%</h2>
                    </div>
                    <div class="card-panel" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.04); padding: 2rem; border-radius: 0.5rem;">
                        <p style="color: #475569; font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem;">Active ERP Syncs</p>
                        <h2 style="font-family: monospace; font-size: 1.8rem; font-weight: 700; color: #6366f1;">03 / 03</h2>
                    </div>
                </div>

                <h2 style="font-size: 0.7rem; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5em; font-weight: 900; margin-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 1.25rem;">Mission Modules</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 2rem;">
                    
                    <div class="card-panel pointer" onclick="location.hash='#/warehouse-grid'" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(59, 130, 246, 0.15); padding: 3rem; border-radius: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                            <div style="color: #3b82f6;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
                            <span style="font-size: 9px; color: #3b82f6; font-weight: 900; text-transform: uppercase; padding: 6px 12px; border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 2px;">Operational</span>
                        </div>
                        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Operational Pulse</h3>
                        <p style="color: #64748b; font-size: 0.95rem; line-height: 1.8; margin: 0;">Master-grid for localized zone utilization and Made-in-KSA asset tracking.</p>
                    </div>

                    <div class="card-panel pointer" onclick="location.hash='#/stock-velocity'" style="background: rgba(255,255,255,0.01); border: 1px solid rgba(239, 68, 68, 0.15); padding: 3rem; border-radius: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
                            <div style="color: #ef4444;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
                            <span style="font-size: 9px; color: #ef4444; font-weight: 900; text-transform: uppercase; padding: 6px 12px; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 2px;">Real-Time</span>
                        </div>
                        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Velocity Analytics</h3>
                        <p style="color: #64748b; font-size: 0.95rem; line-height: 1.8; margin: 0;">Predictive friction detection and throughput stagnation monitoring.</p>
                    </div>

                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
