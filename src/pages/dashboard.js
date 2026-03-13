import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: #0d1117; min-height: 100vh; color: #ffffff; font-family: 'Inter', sans-serif; padding: 0;">
            
            <div style="background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); padding: 1rem 2.5rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Supply Chain Resilience</span>
                    <span style="color: #334155;">/</span>
                    <span style="color: #ffffff; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Chapter 1: Strategic Command</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(16, 185, 129, 0.1); padding: 0.4rem 0.8rem; border-radius: 2rem; border: 1px solid rgba(16, 185, 129, 0.2);">
                        <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981;"></div>
                        <span style="font-size: 10px; font-weight: 800; color: #10b981; text-transform: uppercase;">System Integrity: Optimal</span>
                    </div>
                </div>
            </div>

            <div style="padding: 3rem 2.5rem;">
                <div style="margin-bottom: 4rem;">
                    <h1 style="font-size: 3.5rem; font-weight: 800; letter-spacing: -0.04em; margin: 0; background: linear-gradient(180deg, #FFFFFF 0%, #64748B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Command Center</h1>
                    <p style="color: #64748b; font-family: 'SF Mono', monospace; font-size: 0.85rem; margin-top: 1rem; text-transform: uppercase; letter-spacing: 0.3em;">v2.1 // ORACLE ATOMIC // SOVEREIGN ENGINE</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 4rem;">
                    ${[
                        { label: 'Total Procurement Value', val: 'SAR 42,850,000.00', color: '#ffffff' },
                        { label: 'Supply Resilience Index', val: '94.2%', color: '#10b981' },
                        { label: 'Local Content Score', val: '88.5%', color: '#3b82f6' },
                        { label: 'Active ERP Syncs', val: '03/03', color: '#6366f1' }
                    ].map(stat => `
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 2rem; border-radius: 1.5rem; backdrop-filter: blur(10px);">
                            <p style="color: #64748b; font-size: 10px; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.1em;">${stat.label}</p>
                            <h2 style="font-family: 'SF Mono', monospace; font-size: 1.5rem; font-weight: 700; color: ${stat.color}; margin: 0;">${stat.val}</h2>
                        </div>
                    `).join('')}
                </div>

                <h2 style="font-size: 0.75rem; color: #334155; text-transform: uppercase; letter-spacing: 0.4em; font-weight: 900; margin-bottom: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">Mission Modules</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">
                    
                    <div style="background: linear-gradient(145deg, #111827, #0d1117); border: 1px solid rgba(59, 130, 246, 0.2); padding: 2.5rem; border-radius: 2rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.5)'" onmouseout="this.style.borderColor='rgba(59, 130, 246, 0.2)'" onclick="location.hash='#/warehouse-grid'">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem;">
                            <div style="width: 56px; height: 56px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 1.25rem;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                            </div>
                            <span style="font-size: 10px; color: #3b82f6; font-weight: 900; text-transform: uppercase; padding: 6px 12px; background: rgba(59, 130, 246, 0.1); border-radius: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">Operational</span>
                        </div>
                        <h3 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem;">Operational Pulse</h3>
                        <p style="color: #94a3b8; font-size: 1rem; line-height: 1.7; margin: 0;">Master-grid for localized zone utilization and Made-in-KSA asset tracking.</p>
                    </div>

                    <div style="background: linear-gradient(145deg, #111827, #0d1117); border: 1px solid rgba(239, 68, 68, 0.2); padding: 2.5rem; border-radius: 2rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.borderColor='rgba(239, 68, 68, 0.5)'" onmouseout="this.style.borderColor='rgba(239, 68, 68, 0.2)'" onclick="location.hash='#/stock-velocity'">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem;">
                            <div style="width: 56px; height: 56px; background: rgba(239, 68, 68, 0.1); color: #ef4444; display: flex; align-items: center; justify-content: center; border-radius: 1.25rem;">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                            <span style="font-size: 10px; color: #ef4444; font-weight: 900; text-transform: uppercase; padding: 6px 12px; background: rgba(239, 68, 68, 0.1); border-radius: 2rem; border: 1px solid rgba(239, 68, 68, 0.2);">Real-Time</span>
                        </div>
                        <h3 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem;">Velocity Analytics</h3>
                        <p style="color: #94a3b8; font-size: 1rem; line-height: 1.7; margin: 0;">Predictive friction detection and throughput stagnation monitoring.</p>
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
