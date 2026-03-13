import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div style="background: #0d1117; min-height: 100vh; color: #ffffff; font-family: 'Inter', sans-serif; padding: 2rem;">
            <div style="margin-bottom: 3rem; border-left: 4px solid #10b981; padding-left: 1.5rem;">
                <p style="color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 0.5rem;">Chapter 1 &mdash; The Intelligent Start</p>
                <h1 style="font-size: 2.8rem; font-weight: 800; letter-spacing: -0.03em;">Source to Pay Intelligence</h1>
                <p style="color: #475569; font-size: 1rem; margin-top: 0.5rem; max-width: 800px; line-height: 1.6;">AI-powered strategic command center driving market discovery and payment execution.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
                ${[
                    { label: 'Active Suppliers', val: '247', change: '+12%', color: '#ffffff' },
                    { label: 'Market Risk Index', val: 'Low', change: '-3%', color: '#10b981' },
                    { label: 'Cost Savings YTD', val: 'SAR 4.3M', change: '+18.5%', color: '#ffffff' },
                    { label: 'Pending Orders', val: '34', change: '+5%', color: '#f85149' }
                ].map(kpi => `
                    <div style="background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                            <span style="color: #64748b; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">\${kpi.label}</span>
                            <span style="color: #10b981; font-size: 0.7rem; font-weight: bold;">\${kpi.change}</span>
                        </div>
                        <h2 style="font-family: 'JetBrains Mono', 'SF Mono', monospace; font-size: 1.8rem; font-weight: 800; color: \${kpi.color};">\${kpi.val}</h2>
                        <div style="margin-top: 1rem;"><a href="#" style="color: #3b82f6; font-size: 0.6rem; text-decoration: none; font-weight: bold; letter-spacing: 0.1em;">SHOW LOGIC</a></div>
                    </div>
                `).join('')}
            </div>

            <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 2rem; margin-bottom: 3rem;">
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1.25rem; padding: 2.5rem;">
                    <h3 style="font-size: 0.9rem; margin-bottom: 2.5rem; color: #f0f6fc; text-transform: uppercase; letter-spacing: 0.1em;">Source to Pay Pipeline</h3>
                    ${[
                        { step: 'Market Research', pct: 95 },
                        { step: 'Supplier Selection', pct: 88 },
                        { step: 'Order Management', pct: 92 },
                        { step: 'Receiving & QA', pct: 90 },
                        { step: 'Invoice & Payment', pct: 87 },
                        { step: 'Supplier Management', pct: 93 }
                    ].map(s => `
                        <div style="margin-bottom: 1.8rem;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.6rem;">
                                <span style="font-weight: 500;">\${s.step}</span>
                                <span style="font-family: 'JetBrains Mono', monospace; font-weight: bold; color: #10b981;">\${s.pct}%</span>
                            </div>
                            <div style="background: #1e293b; height: 4px; border-radius: 2px;">
                                <div style="background: #10b981; width: \${s.pct}%; height: 100%; border-radius: 2px; box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1.25rem; padding: 2.5rem;">
                    <h3 style="font-size: 0.9rem; margin-bottom: 2.5rem; color: #f0f6fc; text-transform: uppercase; letter-spacing: 0.1em;">Urgent Action Feed</h3>
                    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                        <div style="padding: 1.25rem; background: rgba(248, 81, 73, 0.05); border: 1px solid rgba(248, 81, 73, 0.15); border-left: 4px solid #f85149; border-radius: 8px;">
                            <p style="font-size: 0.85rem; font-weight: bold; color: #f85149; margin-bottom: 0.4rem;">PRQ-2026-0412 Pending CPO Approval</p>
                            <p style="font-size: 0.75rem; color: #64748b;">SAR 1.2M equipment procurement &mdash; Finance approved, awaiting final sign-off.</p>
                        </div>
                        <div style="padding: 1.25rem; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.15); border-left: 4px solid #3b82f6; border-radius: 8px;">
                            <p style="font-size: 0.85rem; font-weight: bold; color: #3b82f6; margin-bottom: 0.4rem;">Jeddah Port Delay &mdash; 3 POs Affected</p>
                            <p style="font-size: 0.75rem; color: #64748b;">Maersk Line 42h delay impacts PO-0331, PO-0319.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, rgba(13, 17, 23, 0) 100%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 1.25rem; padding: 2.5rem; margin-bottom: 3rem;">
                <h3 style="font-size: 0.9rem; margin-bottom: 2rem; color: #10b981; text-transform: uppercase; letter-spacing: 0.15em;">Local Content / Saudi Vision 2030</h3>
                <div style="display: flex; align-items: center; gap: 3rem;">
                    <div style="background: #1e293b; padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.05); min-width: 200px;">
                        <p style="font-size: 0.8rem; font-weight: bold; margin-bottom: 0.5rem;">Al-Marai Industries</p>
                        <span style="font-size: 0.65rem; color: #10b981; font-weight: 800; text-transform: uppercase;">Vision 2030 Certified</span>
                    </div>
                    <div style="display: flex; gap: 4rem;">
                        <div><p style="color:#64748b; font-size:0.7rem; font-weight:800; margin-bottom:0.5rem;">KSA SCORE</p><p style="font-family:'JetBrains Mono', monospace; font-size:1.8rem; font-weight:800;">72</p></div>
                        <div><p style="color:#64748b; font-size:0.7rem; font-weight:800; margin-bottom:0.5rem;">SDRPY SCORE</p><p style="font-family:'JetBrains Mono', monospace; font-size:1.8rem; font-weight:800;">85</p></div>
                        <div><p style="color:#64748b; font-size:0.7rem; font-weight:800; margin-bottom:0.5rem;">LOCAL CONTENT</p><p style="font-family:'JetBrains Mono', monospace; font-size:1.8rem; font-weight:800; color:#10b981;">48%</p></div>
                    </div>
                </div>
            </div>

            <h2 style="font-size: 0.75rem; color: #334155; text-transform: uppercase; letter-spacing: 0.4em; font-weight: 900; margin-bottom: 2rem; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">Mission Modules</h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 2rem;">

                <div style="background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.2); padding: 2.5rem; border-radius: 1.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.5)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 40px rgba(59,130,246,0.15)'" onmouseout="this.style.borderColor='rgba(59, 130, 246, 0.2)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'" onclick="location.hash='#/warehouse-grid'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
                        <div style="width: 56px; height: 56px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; border-radius: 1.25rem;">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                        </div>
                        <span style="font-size: 10px; color: #3b82f6; font-weight: 900; text-transform: uppercase; padding: 6px 12px; background: rgba(59, 130, 246, 0.1); border-radius: 2rem; border: 1px solid rgba(59, 130, 246, 0.2);">Operational</span>
                    </div>
                    <h3 style="font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem;">Operational Pulse</h3>
                    <p style="color: #94a3b8; font-size: 1rem; line-height: 1.7; margin: 0;">Master-grid for localized zone utilization and Made-in-KSA asset tracking.</p>
                </div>

                <div style="background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(20px); border: 1px solid rgba(239, 68, 68, 0.2); padding: 2.5rem; border-radius: 1.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.borderColor='rgba(239, 68, 68, 0.5)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 40px rgba(239,68,68,0.15)'" onmouseout="this.style.borderColor='rgba(239, 68, 68, 0.2)'; this.style.transform='translateY(0)'; this.style.boxShadow='none'" onclick="location.hash='#/stock-velocity'">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
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
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
