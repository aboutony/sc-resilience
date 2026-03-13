import { Registry } from '../infra/Registry.js';

export function renderDashboardPage() {
    const content = `
        <div class="dashboard-wrapper" style="background: #0d1117; min-height: 100vh; color: #ffffff; font-family: 'Inter', sans-serif; padding: 2.5rem;">
            
            <div style="margin-bottom: 3rem;">
                <p style="color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 0.5rem;">Chapter 1 — The Intelligent Start</p>
                <h1 style="font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em;">Source to Pay Intelligence</h1>
                <p style="color: #475569; font-size: 0.9rem; margin-top: 0.5rem; max-width: 600px;">Your strategic command center for the entire Source-to-Pay lifecycle. AI-powered insights drive every decision from market discovery to payment execution.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
                <div class="card-panel" style="background: #161b22; border: 1px solid #30363d; padding: 1.5rem; border-radius: 0.75rem;">
                    <div style="display:flex; justify-content: space-between; align-items: center;">
                        <span style="color: #8b949e; font-size: 0.75rem; font-weight: 600;">247</span>
                        <span style="color: #238636; font-size: 0.7rem;">? 12%</span>
                    </div>
                    <p style="color: #8b949e; font-size: 0.7rem; margin: 0.5rem 0;">Active Suppliers</p>
                    <a href="#" style="color: #58a6ff; font-size: 0.65rem; text-decoration: none;">SHOW LOGIC</a>
                </div>
                <div class="card-panel" style="background: #161b22; border: 1px solid #30363d; padding: 1.5rem; border-radius: 0.75rem;">
                    <div style="display:flex; justify-content: space-between; align-items: center;">
                        <span style="color: #ffffff; font-weight: 700;">Low</span>
                        <span style="color: #238636; font-size: 0.7rem;">? 3%</span>
                    </div>
                    <p style="color: #8b949e; font-size: 0.7rem; margin: 0.5rem 0;">Market Risk Index</p>
                    <a href="#" style="color: #58a6ff; font-size: 0.65rem; text-decoration: none;">SHOW LOGIC</a>
                </div>
                <div class="card-panel" style="background: #161b22; border: 1px solid #30363d; padding: 1.5rem; border-radius: 0.75rem;">
                    <div style="display:flex; justify-content: space-between; align-items: center;">
                        <span style="color: #ffffff; font-weight: 700; font-family: monospace;">SAR 4.3M</span>
                        <span style="color: #238636; font-size: 0.7rem;">? 18.5%</span>
                    </div>
                    <p style="color: #8b949e; font-size: 0.7rem; margin: 0.5rem 0;">Cost Savings YTD</p>
                    <a href="#" style="color: #58a6ff; font-size: 0.65rem; text-decoration: none;">SHOW LOGIC</a>
                </div>
                <div class="card-panel" style="background: #161b22; border: 1px solid #30363d; padding: 1.5rem; border-radius: 0.75rem;">
                    <div style="display:flex; justify-content: space-between; align-items: center;">
                        <span style="color: #ffffff; font-weight: 700;">34</span>
                        <span style="color: #da3633; font-size: 0.7rem;">+ 5%</span>
                    </div>
                    <p style="color: #8b949e; font-size: 0.7rem; margin: 0.5rem 0;">Pending Orders</p>
                    <a href="#" style="color: #58a6ff; font-size: 0.65rem; text-decoration: none;">SHOW LOGIC</a>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 3rem;">
                <div style="background: #161b22; border: 1px solid #30363d; border-radius: 1rem; padding: 2rem;">
                    <h3 style="font-size: 0.9rem; margin-bottom: 2rem; color: #f0f6fc;">Source to Pay Pipeline</h3>
                    ${['Market Research', 'Supplier Selection', 'Order Management', 'Receiving & QA', 'Invoice & Payment', 'Supplier Management'].map(step => `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.5rem;">
                                <span>${step}</span>
                                <span style="font-weight: bold;">${Math.floor(Math.random() * 20) + 80}%</span>
                            </div>
                            <div style="background: #30363d; height: 6px; border-radius: 3px; overflow: hidden;">
                                <div style="background: #238636; width: ${Math.floor(Math.random() * 20) + 80}%; height: 100%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="background: #161b22; border: 1px solid #30363d; border-radius: 1rem; padding: 2rem;">
                    <h3 style="font-size: 0.9rem; margin-bottom: 2rem; color: #f0f6fc;">Urgent Action Feed</h3>
                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="padding: 1rem; background: rgba(218, 54, 51, 0.1); border-left: 4px solid #da3633; border-radius: 4px;">
                            <p style="font-size: 0.75rem; margin: 0; color: #f85149; font-weight: bold;">PRQ-2026-0412 Pending CPO Approval</p>
                            <p style="font-size: 0.65rem; margin: 4px 0 0; color: #8b949e;">SAR 1.2M equipment procurement — Finance approved.</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(56, 139, 253, 0.1); border-left: 4px solid #388bfd; border-radius: 4px;">
                            <p style="font-size: 0.75rem; margin: 0; color: #58a6ff; font-weight: bold;">Jeddah Port Delay — 3 POs Affected</p>
                            <p style="font-size: 0.65rem; margin: 4px 0 0; color: #8b949e;">Maersk Line 42h delay impacts PO-0331, PO-0319.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style="background: #161b22; border: 1px solid #30363d; border-radius: 1rem; padding: 2rem; margin-bottom: 3rem;">
                <h3 style="font-size: 0.9rem; margin-bottom: 1.5rem;">Local Content / Saudi Vision 2030</h3>
                <div style="background: rgba(35, 134, 54, 0.05); border: 1px solid #238636; padding: 1.5rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 2rem;">
                    <div style="background: #0d1117; padding: 1rem; border-radius: 0.5rem; border: 1px solid #30363d;">
                        <p style="font-size: 0.7rem; color: #8b949e; margin: 0;">Al-Marai Industries</p>
                        <p style="font-size: 0.6rem; color: #238636; margin: 4px 0;">Vision 2030 Certified</p>
                    </div>
                    <div style="display: flex; gap: 2rem; font-family: monospace;">
                        <div><p style="font-size: 0.6rem; color: #8b949e; margin: 0;">KSA SCORE</p><p style="font-size: 1.2rem; font-weight: bold; margin: 0;">72</p></div>
                        <div><p style="font-size: 0.6rem; color: #8b949e; margin: 0;">SDRPY SCORE</p><p style="font-size: 1.2rem; font-weight: bold; margin: 0;">85</p></div>
                        <div><p style="font-size: 0.6rem; color: #8b949e; margin: 0;">LOCAL CONTENT</p><p style="font-size: 1.2rem; font-weight: bold; margin: 0;">48%</p></div>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                <div class="card-panel pointer" onclick="location.hash='#/warehouse-grid'" style="background: #161b22; border: 1px solid #30363d; padding: 2rem; border-radius: 1rem;">
                    <h4 style="color: #388bfd; font-size: 1rem; margin-bottom: 0.5rem;">Operational Pulse</h4>
                    <p style="color: #8b949e; font-size: 0.75rem;">Manage localized zones and KSA asset utilization metrics.</p>
                </div>
                <div class="card-panel pointer" onclick="location.hash='#/stock-velocity'" style="background: #161b22; border: 1px solid #30363d; padding: 2rem; border-radius: 1rem;">
                    <h4 style="color: #da3633; font-size: 1rem; margin-bottom: 0.5rem;">Velocity Analytics</h4>
                    <p style="color: #8b949e; font-size: 0.75rem;">Detect supply chain friction and throughput stagnation risks.</p>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        Registry.add({ id: 'dashboard-logic', destroy: () => {} });
    }, 0);

    return content;
}
