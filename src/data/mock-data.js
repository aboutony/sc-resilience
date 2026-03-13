// ═══════════════════════════════════════════
// Mock Data – Suppliers, Market Analytics, KPIs
// Phase 1 + Phase 2 Data
// ═══════════════════════════════════════════

export const suppliers = [
  { id: 'SUP-001', name: 'Al-Marai Industries', region: 'Saudi Arabia', category: 'Raw Materials', score: 92, quality: 95, cost: 88, delivery: 91, reliability: 94, esg: 89, revenue: 45000000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'ISO 14001', 'SASO'], color: '#1a56db' },
  { id: 'SUP-002', name: 'Emirates Steel Corp', region: 'UAE', category: 'Steel & Metals', score: 87, quality: 90, cost: 82, delivery: 88, reliability: 86, esg: 91, revenue: 78000000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'API Q1'], color: '#00C853' },
  { id: 'SUP-003', name: 'Riyadh Polymers Ltd', region: 'Saudi Arabia', category: 'Chemicals', score: 84, quality: 86, cost: 90, delivery: 78, reliability: 82, esg: 84, revenue: 23000000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'REACH'], color: '#8b5cf6' },
  { id: 'SUP-004', name: 'Kuwait Logistics Group', region: 'Kuwait', category: 'Logistics', score: 79, quality: 82, cost: 76, delivery: 85, reliability: 78, esg: 74, revenue: 15600000, currency: 'SAR', status: 'review', certifications: ['ISO 9001'], color: '#f59e0b' },
  { id: 'SUP-005', name: 'Bahrain Precision Mfg', region: 'Bahrain', category: 'Components', score: 91, quality: 93, cost: 85, delivery: 92, reliability: 95, esg: 88, revenue: 34200000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'AS9100', 'IATF 16949'], color: '#ef4444' },
  { id: 'SUP-006', name: 'German Tech Solutions', region: 'Germany', category: 'Equipment', score: 95, quality: 98, cost: 78, delivery: 94, reliability: 97, esg: 96, revenue: 125000000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'ISO 14001', 'DIN'], color: '#06b6d4' },
  { id: 'SUP-007', name: 'Jeddah Packaging Co', region: 'Saudi Arabia', category: 'Packaging', score: 81, quality: 84, cost: 88, delivery: 76, reliability: 80, esg: 77, revenue: 8900000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'FSC'], color: '#d946ef' },
  { id: 'SUP-008', name: 'Qatar Advanced Materials', region: 'Qatar', category: 'Raw Materials', score: 88, quality: 91, cost: 84, delivery: 89, reliability: 87, esg: 90, revenue: 56700000, currency: 'SAR', status: 'active', certifications: ['ISO 9001', 'ISO 14001'], color: '#0ea5e9' },
];

export const marketData = {
  commodities: [
    { name: 'Steel', prices: [2450, 2380, 2520, 2490, 2650, 2580, 2710, 2690, 2750, 2800, 2770, 2820], trend: 'up', change: 5.2 },
    { name: 'Copper', prices: [8200, 8350, 8180, 8420, 8550, 8480, 8620, 8700, 8650, 8800, 8750, 8900], trend: 'up', change: 3.8 },
    { name: 'Aluminum', prices: [2350, 2280, 2320, 2290, 2380, 2340, 2410, 2390, 2450, 2420, 2460, 2480], trend: 'up', change: 2.1 },
    { name: 'Crude Oil', prices: [82, 79, 84, 81, 86, 83, 88, 85, 87, 84, 86, 83], trend: 'down', change: -1.5 },
  ],
  months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
  riskMatrix: [
    { category: 'Raw Materials', saudiArabia: 'low', gcc: 'medium', asia: 'high', europe: 'low', americas: 'medium' },
    { category: 'Electronics', saudiArabia: 'medium', gcc: 'medium', asia: 'high', europe: 'low', americas: 'low' },
    { category: 'Logistics', saudiArabia: 'low', gcc: 'low', asia: 'medium', europe: 'medium', americas: 'high' },
    { category: 'Chemicals', saudiArabia: 'medium', gcc: 'high', asia: 'medium', europe: 'low', americas: 'low' },
    { category: 'Equipment', saudiArabia: 'low', gcc: 'low', asia: 'medium', europe: 'low', americas: 'low' },
  ]
};

export const aiInsights = [
  { type: 'success', icon: '🔍', title: 'New Supplier Discovered', text: 'AI identified Bahrain Precision Mfg as a high-reliability components supplier with 95% delivery score.', time: '2 min ago' },
  { type: 'warning', icon: '⚠️', title: 'Price Volatility Alert', text: 'Steel prices in the Asia-Pacific region have increased 5.2% this quarter. Consider diversifying sourcing.', time: '15 min ago' },
  { type: 'info', icon: '📊', title: 'Market Analysis Complete', text: 'Q4 commodity report ready. 3 categories show favorable pricing trends for bulk procurement.', time: '1 hr ago' },
  { type: 'danger', icon: '🚨', title: 'Supplier Risk Escalation', text: 'Kuwait Logistics Group compliance rating dropped below threshold. Review recommended.', time: '3 hrs ago' },
  { type: 'success', icon: '✅', title: 'ESG Compliance Verified', text: 'German Tech Solutions achieved 96/100 ESG score. Sustainability certification validated.', time: '5 hrs ago' },
  { type: 'info', icon: '🤖', title: 'Predictive Insight', text: 'Based on historical patterns, copper demand is forecasted to increase 12% in Q2. Pre-negotiation recommended.', time: '6 hrs ago' },
];

export const kpiData = {
  dashboard: {
    totalSuppliers: { value: 247, trend: 12, trendDir: 'up' },
    marketRisk: { value: 'Low', trend: -8, trendDir: 'up' },
    costSavings: { value: 4250000, trend: 18.5, trendDir: 'up' },
    pendingOrders: { value: 34, trend: -5, trendDir: 'down' },
  },
  marketResearch: {
    suppliersAnalyzed: { value: 1284, trend: 24, trendDir: 'up' },
    marketsMonitored: { value: 47, trend: 6, trendDir: 'up' },
    riskAlerts: { value: 12, trend: -3, trendDir: 'up' },
    newDiscoveries: { value: 23, trend: 15, trendDir: 'up' },
  },
  supplierSelection: {
    evaluated: { value: 186, trend: 22, trendDir: 'up' },
    shortlisted: { value: 28, trend: 8, trendDir: 'up' },
    avgScore: { value: 86.4, trend: 3.2, trendDir: 'up' },
    esgCompliant: { value: '92%', trend: 5, trendDir: 'up' },
  },
  // ── Phase Two KPIs ──
  inventoryMgmt: {
    skusTracked: { value: 3842, trend: 8, trendDir: 'up' },
    stockAccuracy: { value: '99.4%', trend: 1.2, trendDir: 'up' },
    reorderRate: { value: 12, trend: -15, trendDir: 'up' },
    wasteReduction: { value: '23%', trend: 6, trendDir: 'up' },
  },
  logisticsMgmt: {
    activeShipments: { value: 67, trend: 14, trendDir: 'up' },
    onTimeDelivery: { value: '96.8%', trend: 2.4, trendDir: 'up' },
    avgTransitDays: { value: 4.2, trend: -8, trendDir: 'up' },
    carbonSaved: { value: 142, trend: 18, trendDir: 'up' },
  },
  // ── Phase Three KPIs ──
  contractMgmt: {
    activeContracts: { value: 84, trend: 12, trendDir: 'up' },
    avgCompliance: { value: '94.7%', trend: 3.1, trendDir: 'up' },
    expiring30d: { value: 7, trend: -22, trendDir: 'up' },
    aiNegotiationSavings: { value: 2800000, trend: 24, trendDir: 'up' },
  },
  riskDashboard: {
    threatScore: { value: 'Medium', trend: -12, trendDir: 'up' },
    predictedRisks: { value: 14, trend: 8, trendDir: 'down' },
    mitigated: { value: 38, trend: 15, trendDir: 'up' },
    responseTime: { value: '2.4h', trend: -18, trendDir: 'up' },
  },
  complianceDocs: {
    regulatoryChecks: { value: 312, trend: 9, trendDir: 'up' },
    esgScore: { value: 87, trend: 4.2, trendDir: 'up' },
    auditEvents: { value: 1247, trend: 22, trendDir: 'up' },
    policyUpdates: { value: 8, trend: 33, trendDir: 'up' },
  },
};

// ═══════════════════════════════════════════
// Phase Two – Inventory Data
// ═══════════════════════════════════════════

export const inventoryData = {
  // Demand Forecasting — 12-month AI prediction vs actuals
  forecast: {
    months: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
    actual:    [4200, 4350, 4180, 4500, 4680, 4420, 4750, 4890, 5100, 5350, 5200, null],
    predicted: [4200, 4320, 4210, 4480, 4700, 4450, 4780, 4920, 5080, 5320, 5180, 5400],
    upperBand: [4400, 4550, 4450, 4720, 4950, 4700, 5030, 5170, 5330, 5570, 5430, 5650],
    lowerBand: [4000, 4090, 3970, 4240, 4450, 4200, 4530, 4670, 4830, 5070, 4930, 5150],
  },

  // Warehouse zones with fill levels (0–100%)
  warehouses: [
    {
      id: 'WH-RUH', name: 'Riyadh Central', nameAr: 'الرياض المركزي', city: 'Riyadh',
      zones: [
        { zone: 'A1', category: 'Raw Materials', fill: 87, temp: 22.4, humidity: 35 },
        { zone: 'A2', category: 'Components', fill: 62, temp: 21.8, humidity: 38 },
        { zone: 'B1', category: 'Finished Goods', fill: 94, temp: 23.1, humidity: 32 },
        { zone: 'B2', category: 'Packaging', fill: 45, temp: 22.0, humidity: 36 },
        { zone: 'C1', category: 'Chemicals', fill: 71, temp: 18.5, humidity: 28 },
        { zone: 'C2', category: 'Equipment', fill: 33, temp: 22.2, humidity: 34 },
      ]
    },
    {
      id: 'WH-JED', name: 'Jeddah Port', nameAr: 'جدة الميناء', city: 'Jeddah',
      zones: [
        { zone: 'A1', category: 'Raw Materials', fill: 76, temp: 28.3, humidity: 55 },
        { zone: 'A2', category: 'Components', fill: 58, temp: 27.9, humidity: 52 },
        { zone: 'B1', category: 'Finished Goods', fill: 82, temp: 28.7, humidity: 58 },
        { zone: 'B2', category: 'Packaging', fill: 69, temp: 28.1, humidity: 54 },
        { zone: 'C1', category: 'Chemicals', fill: 41, temp: 24.0, humidity: 40 },
        { zone: 'C2', category: 'Equipment', fill: 55, temp: 27.5, humidity: 50 },
      ]
    },
    {
      id: 'WH-DMM', name: 'Dammam Industrial', nameAr: 'الدمام الصناعية', city: 'Dammam',
      zones: [
        { zone: 'A1', category: 'Raw Materials', fill: 91, temp: 30.1, humidity: 60 },
        { zone: 'A2', category: 'Components', fill: 48, temp: 29.5, humidity: 57 },
        { zone: 'B1', category: 'Finished Goods', fill: 73, temp: 30.4, humidity: 62 },
        { zone: 'B2', category: 'Packaging', fill: 85, temp: 29.8, humidity: 58 },
        { zone: 'C1', category: 'Chemicals', fill: 36, temp: 25.2, humidity: 42 },
        { zone: 'C2', category: 'Equipment', fill: 67, temp: 29.2, humidity: 55 },
      ]
    }
  ],

  // Slow-moving / obsolete stock
  slowMovers: [
    { sku: 'SKU-4821', name: 'Industrial Valve Assembly', category: 'Components', daysOnHand: 187, value: 342000, warehouse: 'Riyadh', disposition: 'Liquidate' },
    { sku: 'SKU-3094', name: 'Polymer Resin Grade-B', category: 'Chemicals', daysOnHand: 156, value: 128000, warehouse: 'Dammam', disposition: 'Discount & Sell' },
    { sku: 'SKU-7153', name: 'Steel Plate 12mm', category: 'Raw Materials', daysOnHand: 134, value: 567000, warehouse: 'Jeddah', disposition: 'Transfer to Riyadh' },
    { sku: 'SKU-2067', name: 'Copper Wire Spool 4mm', category: 'Raw Materials', daysOnHand: 121, value: 89000, warehouse: 'Riyadh', disposition: 'Repurpose' },
    { sku: 'SKU-5540', name: 'Obsolete Sensor Module', category: 'Equipment', daysOnHand: 245, value: 215000, warehouse: 'Dammam', disposition: 'Scrap & Recycle' },
    { sku: 'SKU-8812', name: 'Packaging Film Roll B', category: 'Packaging', daysOnHand: 98, value: 45000, warehouse: 'Jeddah', disposition: 'Accelerate Usage' },
  ],

  // IoT live signals
  iotSignals: [
    { warehouse: 'Riyadh Central', warehouseAr: 'الرياض المركزي', temp: 22.4, humidity: 35, rfidScans: 1847, alertLevel: 'normal' },
    { warehouse: 'Jeddah Port', warehouseAr: 'جدة الميناء', temp: 28.3, humidity: 55, rfidScans: 923, alertLevel: 'warning' },
    { warehouse: 'Dammam Industrial', warehouseAr: 'الدمام الصناعية', temp: 30.1, humidity: 60, rfidScans: 1254, alertLevel: 'critical' },
  ],
};

// ═══════════════════════════════════════════
// Phase Two – Logistics Data
// ═══════════════════════════════════════════

export const logisticsData = {
  // Route optimization cost breakdown
  routeCosts: {
    labels: ['Sea Freight', 'Air Freight', 'Road Transport', 'Rail', 'Last Mile'],
    values: [3200000, 1800000, 950000, 420000, 310000],
    aiSavings: 680000,
  },

  // Inbound Logistics — linked to Phase 1 POs (narrative continuity)
  inboundShipments: [
    { poNumber: 'PO-2026-0847', supplier: 'Al-Marai Industries', origin: 'Riyadh', destination: 'WH-RUH', eta: '2026-03-15', carrier: 'Saudi Logistics', status: 'in-transit', progress: 72 },
    { poNumber: 'PO-2026-0831', supplier: 'Emirates Steel Corp', origin: 'Dubai', destination: 'WH-JED', eta: '2026-03-14', carrier: 'Maersk Line', status: 'at-port', progress: 90 },
    { poNumber: 'PO-2026-0819', supplier: 'German Tech Solutions', origin: 'Hamburg', destination: 'WH-DMM', eta: '2026-03-18', carrier: 'Hapag-Lloyd', status: 'in-transit', progress: 45 },
    { poNumber: 'PO-2026-0802', supplier: 'Qatar Advanced Materials', origin: 'Doha', destination: 'WH-RUH', eta: '2026-03-13', carrier: 'GCC Express', status: 'delivered', progress: 100 },
    { poNumber: 'PO-2026-0798', supplier: 'Bahrain Precision Mfg', origin: 'Manama', destination: 'WH-JED', eta: '2026-03-16', carrier: 'Gulf Shipping', status: 'customs', progress: 82 },
    { poNumber: 'PO-2026-0785', supplier: 'Riyadh Polymers Ltd', origin: 'Riyadh', destination: 'WH-DMM', eta: '2026-03-14', carrier: 'Saudi Logistics', status: 'in-transit', progress: 58 },
  ],

  // Warehouse picking queues
  pickingQueues: [
    { warehouse: 'Riyadh Central', warehouseAr: 'الرياض المركزي', totalOrders: 124, completed: 98, utilization: 79 },
    { warehouse: 'Jeddah Port', warehouseAr: 'جدة الميناء', totalOrders: 87, completed: 71, utilization: 82 },
    { warehouse: 'Dammam Industrial', warehouseAr: 'الدمام الصناعية', totalOrders: 156, completed: 108, utilization: 69 },
  ],

  // Contingency alerts
  contingencyAlerts: [
    { type: 'danger', icon: '🚢', title: 'Jeddah Port Congestion', titleAr: 'ازدحام ميناء جدة', text: 'Container dwell time increased 40%. AI suggests rerouting 3 shipments via Dammam.', textAr: 'زاد وقت انتظار الحاويات بنسبة ٤٠٪. يقترح الذكاء الاصطناعي إعادة توجيه ٣ شحنات عبر الدمام.', time: '8 min ago', timeAr: 'منذ ٨ دقائق' },
    { type: 'warning', icon: '🌡️', title: 'Temperature Deviation – Dammam', titleAr: 'انحراف درجة الحرارة – الدمام', text: 'Zone C1 chemical storage exceeding 25°C threshold. Cooling system adjustment recommended.', textAr: 'تخزين المواد الكيميائية في المنطقة C1 يتجاوز عتبة ٢٥ درجة. يُوصى بتعديل نظام التبريد.', time: '22 min ago', timeAr: 'منذ ٢٢ دقيقة' },
    { type: 'info', icon: '🔄', title: 'Dynamic Rerouting Complete', titleAr: 'اكتمال إعادة التوجيه', text: 'PO-2026-0819 rerouted from Jeddah to Dammam port. New ETA: March 18. Saved SAR 12,400.', textAr: 'تم إعادة توجيه PO-2026-0819 من جدة إلى ميناء الدمام. الوصول المتوقع: ١٨ مارس. وفورات: ١٢,٤٠٠ ر.س.', time: '1 hr ago', timeAr: 'منذ ساعة' },
    { type: 'success', icon: '✅', title: 'Customs Clearance Expedited', titleAr: 'تسريع التخليص الجمركي', text: 'AI pre-submitted documentation for PO-2026-0798. Clearance time reduced from 48h to 6h.', textAr: 'قدّم الذكاء الاصطناعي المستندات مسبقاً لـ PO-2026-0798. تقليل وقت التخليص من ٤٨ ساعة إلى ٦ ساعات.', time: '3 hrs ago', timeAr: 'منذ ٣ ساعات' },
  ],
};

// ═══════════════════════════════════════════
// Phase Three – Contract Management Data
// ═══════════════════════════════════════════

export const contractData = {
  contracts: [
    { id: 'CTR-2026-001', supplier: 'Al-Marai Industries', type: 'Master Supply Agreement', value: 12500000, start: '2025-06-01', end: '2026-05-31', compliance: 97, status: 'active', poRefs: ['PO-2026-0847'] },
    { id: 'CTR-2026-002', supplier: 'Emirates Steel Corp', type: 'Framework Agreement', value: 28400000, start: '2025-09-01', end: '2026-08-31', compliance: 94, status: 'active', poRefs: ['PO-2026-0831'] },
    { id: 'CTR-2026-003', supplier: 'German Tech Solutions', type: 'Technology License', value: 45000000, start: '2025-03-01', end: '2027-02-28', compliance: 99, status: 'active', poRefs: ['PO-2026-0819'] },
    { id: 'CTR-2026-004', supplier: 'Kuwait Logistics Group', type: 'Service Level Agreement', value: 5200000, start: '2025-12-01', end: '2026-04-15', compliance: 78, status: 'expiring', poRefs: [] },
    { id: 'CTR-2026-005', supplier: 'Riyadh Polymers Ltd', type: 'Supply Agreement', value: 8900000, start: '2025-07-01', end: '2026-06-30', compliance: 91, status: 'active', poRefs: ['PO-2026-0785'] },
    { id: 'CTR-2026-006', supplier: 'Bahrain Precision Mfg', type: 'Quality Assurance Contract', value: 15200000, start: '2026-01-01', end: '2026-12-31', compliance: 96, status: 'active', poRefs: ['PO-2026-0798'] },
    { id: 'CTR-2026-007', supplier: 'Qatar Advanced Materials', type: 'Framework Agreement', value: 21000000, start: '2025-11-01', end: '2026-04-30', compliance: 88, status: 'review', poRefs: ['PO-2026-0802'] },
  ],

  // Closed-loop: Performance Eval links Phase Two deliveries to contract KPIs
  performanceEvals: [
    { contractId: 'CTR-2026-001', poNumber: 'PO-2026-0847', contractedDays: 5, actualDays: 3.2, onTime: true, qualityScore: 95, penaltyApplied: false },
    { contractId: 'CTR-2026-002', poNumber: 'PO-2026-0831', contractedDays: 7, actualDays: 6.8, onTime: true, qualityScore: 90, penaltyApplied: false },
    { contractId: 'CTR-2026-003', poNumber: 'PO-2026-0819', contractedDays: 14, actualDays: 12.5, onTime: true, qualityScore: 98, penaltyApplied: false },
    { contractId: 'CTR-2026-005', poNumber: 'PO-2026-0785', contractedDays: 3, actualDays: 4.1, onTime: false, qualityScore: 86, penaltyApplied: true },
    { contractId: 'CTR-2026-006', poNumber: 'PO-2026-0798', contractedDays: 6, actualDays: 5.5, onTime: true, qualityScore: 93, penaltyApplied: false },
    { contractId: 'CTR-2026-007', poNumber: 'PO-2026-0802', contractedDays: 4, actualDays: 3.8, onTime: true, qualityScore: 91, penaltyApplied: false },
  ],

  scopeAlerts: [
    { contract: 'CTR-2026-004', type: 'scope-creep', severity: 'high', desc: 'Kuwait Logistics SLA expanded to include cold-chain without amendment. Risk: SAR 340K exposure.', descAr: 'تم توسيع اتفاقية الخدمات مع مجموعة الكويت لتشمل سلسلة التبريد دون تعديل. المخاطر: ٣٤٠ ألف ر.س.' },
    { contract: 'CTR-2026-007', type: 'renewal', severity: 'medium', desc: 'Qatar Advanced Materials contract expires in 48 days. AI recommends renegotiation for 8% cost reduction.', descAr: 'ينتهي عقد قطر للمواد المتقدمة خلال ٤٨ يوماً. يوصي الذكاء الاصطناعي بإعادة التفاوض لخفض التكلفة ٨٪.' },
  ],
};

// ═══════════════════════════════════════════
// Phase Three – Risk Dashboard Data
// ═══════════════════════════════════════════

export const riskData = {
  // Global risk markers for the sovereign map
  riskMarkers: [
    { id: 'gcc-sa', region: 'Saudi Arabia', regionAr: 'المملكة العربية السعودية', lat: 24.7, lng: 46.7, risk: 'low', threats: 2, desc: 'Stable domestic operations' },
    { id: 'gcc-ae', region: 'UAE', regionAr: 'الإمارات', lat: 25.2, lng: 55.3, risk: 'low', threats: 1, desc: 'Minor port congestion at Jebel Ali' },
    { id: 'gcc-kw', region: 'Kuwait', regionAr: 'الكويت', lat: 29.4, lng: 47.9, risk: 'medium', threats: 3, desc: 'Supplier compliance under review' },
    { id: 'gcc-qa', region: 'Qatar', regionAr: 'قطر', lat: 25.3, lng: 51.2, risk: 'low', threats: 1, desc: 'Contract renewal pending' },
    { id: 'gcc-bh', region: 'Bahrain', regionAr: 'البحرين', lat: 26.0, lng: 50.5, risk: 'low', threats: 0, desc: 'All metrics stable' },
    { id: 'eu-de', region: 'Germany', regionAr: 'ألمانيا', lat: 51.2, lng: 10.4, risk: 'low', threats: 1, desc: 'Technology license active' },
    { id: 'asia-cn', region: 'China', regionAr: 'الصين', lat: 35.9, lng: 104.2, risk: 'high', threats: 5, desc: 'Geopolitical tension affecting raw material flow' },
    { id: 'asia-in', region: 'India', regionAr: 'الهند', lat: 20.6, lng: 78.9, risk: 'medium', threats: 2, desc: 'Monsoon season logistics delays' },
  ],

  // What-If simulation baselines
  whatIfBaseline: {
    totalRevenue: 425000000,
    supplyChainCost: 68000000,
    deliveryOnTime: 96.8,
    supplierScore: 88.4,
    riskExposure: 12400000,
  },

  // What-If variable impacts (multipliers per day/percent of disruption)
  whatIfVariables: [
    { id: 'port-delay', label: 'Port Delay (Days)', labelAr: 'تأخير الميناء (أيام)', min: 0, max: 30, step: 1, default: 0, impactPerUnit: { deliveryOnTime: -1.8, supplyChainCost: 420000, riskExposure: 890000 }, highRiskThreshold: 7 },
    { id: 'supplier-default', label: 'Supplier Default Risk (%)', labelAr: 'مخاطر تعثر المورد (٪)', min: 0, max: 50, step: 5, default: 0, impactPerUnit: { supplierScore: -0.6, riskExposure: 340000, totalRevenue: -1200000 }, highRiskThreshold: 20 },
    { id: 'currency-shock', label: 'SAR/USD Fluctuation (%)', labelAr: 'تقلب ر.س/دولار (٪)', min: 0, max: 15, step: 1, default: 0, impactPerUnit: { supplyChainCost: 950000, totalRevenue: -3100000, riskExposure: 560000 }, highRiskThreshold: 5 },
    { id: 'geopolitical', label: 'Geopolitical Risk Level', labelAr: 'مستوى المخاطر الجيوسياسية', min: 0, max: 10, step: 1, default: 0, impactPerUnit: { deliveryOnTime: -2.1, supplyChainCost: 780000, riskExposure: 1200000, supplierScore: -0.8 }, highRiskThreshold: 5 },
  ],

  contingencyPlans: [
    { id: 'CP-001', trigger: 'Port Delay > 7 days', triggerAr: 'تأخير الميناء > ٧ أيام', action: 'Activate Dammam rerouting protocol. Pre-clear 12 containers.', actionAr: 'تفعيل بروتوكول إعادة التوجيه عبر الدمام. التخليص المسبق لـ ١٢ حاوية.', status: 'armed', savingsEstimate: 2100000 },
    { id: 'CP-002', trigger: 'Supplier Default > 20%', triggerAr: 'تعثر المورد > ٢٠٪', action: 'Engage secondary suppliers from pre-approved shortlist. Notify procurement.', actionAr: 'التعاقد مع موردين بدلاء من القائمة المعتمدة. إخطار المشتريات.', status: 'armed', savingsEstimate: 4500000 },
    { id: 'CP-003', trigger: 'Currency > 5% swing', triggerAr: 'تقلب العملة > ٥٪', action: 'Hedge positions activated. Lock SAR/USD at current rate for 90 days.', actionAr: 'تفعيل مراكز التحوط. تثبيت سعر ر.س/دولار لمدة ٩٠ يوماً.', status: 'standby', savingsEstimate: 3200000 },
  ],
};

// ═══════════════════════════════════════════
// Phase Three – Compliance & Audit Data
// ═══════════════════════════════════════════

export const complianceData = {
  auditTrail: [
    { id: 'AUD-0147', timestamp: '2026-03-13 03:42:18', contract: 'CTR-2026-001', action: 'Amendment Approved', author: 'Fahad Al-Rashid', version: 'v3.2', hash: '7f3a2c...e91b', changeType: 'amendment' },
    { id: 'AUD-0146', timestamp: '2026-03-12 16:28:04', contract: 'CTR-2026-003', action: 'Compliance Verified', author: 'System (AI)', version: 'v2.1', hash: 'b42d8e...3f07', changeType: 'verification' },
    { id: 'AUD-0145', timestamp: '2026-03-12 11:15:33', contract: 'CTR-2026-006', action: 'Digital Signature Applied', author: 'Legal Team', version: 'v1.4', hash: 'a91c5d...8e24', changeType: 'signature' },
    { id: 'AUD-0144', timestamp: '2026-03-11 22:05:47', contract: 'CTR-2026-004', action: 'Risk Flag Raised', author: 'System (AI)', version: 'v2.8', hash: 'e73f1a...2c96', changeType: 'risk' },
    { id: 'AUD-0143', timestamp: '2026-03-11 09:30:12', contract: 'CTR-2026-002', action: 'Renewal Initiated', author: 'Procurement Dept', version: 'v4.0', hash: 'c28e7d...5a13', changeType: 'renewal' },
    { id: 'AUD-0142', timestamp: '2026-03-10 14:52:38', contract: 'CTR-2026-007', action: 'Scope Change Detected', author: 'System (AI)', version: 'v1.2', hash: 'd94b3e...7f82', changeType: 'scope' },
    { id: 'AUD-0141', timestamp: '2026-03-09 08:18:55', contract: 'CTR-2026-005', action: 'Payment Milestone Confirmed', author: 'Finance Dept', version: 'v3.1', hash: 'f16a9c...4d58', changeType: 'payment' },
  ],

  esgScores: [
    { supplier: 'Al-Marai Industries', carbon: 82, humanRights: 91, ethicalSourcing: 88, overall: 87, trend: 'up' },
    { supplier: 'Emirates Steel Corp', carbon: 74, humanRights: 89, ethicalSourcing: 85, overall: 83, trend: 'stable' },
    { supplier: 'German Tech Solutions', carbon: 95, humanRights: 97, ethicalSourcing: 94, overall: 95, trend: 'up' },
    { supplier: 'Bahrain Precision Mfg', carbon: 78, humanRights: 92, ethicalSourcing: 86, overall: 85, trend: 'up' },
    { supplier: 'Kuwait Logistics Group', carbon: 61, humanRights: 75, ethicalSourcing: 68, overall: 68, trend: 'down' },
    { supplier: 'Riyadh Polymers Ltd', carbon: 71, humanRights: 88, ethicalSourcing: 80, overall: 80, trend: 'stable' },
  ],

  regulatoryUpdates: [
    { type: 'info', icon: '📜', title: 'SASO Standards Update', titleAr: 'تحديث معايير ساسو', text: 'New quality requirements for imported industrial chemicals effective April 2026.', textAr: 'متطلبات جودة جديدة للمواد الكيميائية الصناعية المستوردة سارية من أبريل ٢٠٢٦.', time: '2 hrs ago', timeAr: 'منذ ساعتين' },
    { type: 'warning', icon: '⚖️', title: 'Trade Compliance Alert', titleAr: 'تنبيه امتثال تجاري', text: 'Updated sanctions list affects 2 secondary suppliers. Review required within 72h.', textAr: 'قائمة العقوبات المحدثة تؤثر على ٢ من الموردين الثانويين. المراجعة مطلوبة خلال ٧٢ ساعة.', time: '6 hrs ago', timeAr: 'منذ ٦ ساعات' },
    { type: 'success', icon: '✅', title: 'ESG Audit Passed', titleAr: 'اجتياز تدقيق ESG', text: 'German Tech Solutions completed annual ESG audit with 95/100 score.', textAr: 'أكملت German Tech Solutions تدقيق ESG السنوي بنتيجة ٩٥/١٠٠.', time: '1 day ago', timeAr: 'منذ يوم' },
    { type: 'info', icon: '🔐', title: 'Data Protection Compliance', titleAr: 'امتثال حماية البيانات', text: 'PDPL (Saudi Personal Data Protection Law) quarterly review completed. All systems compliant.', textAr: 'اكتمال المراجعة الربعية لقانون حماية البيانات الشخصية. جميع الأنظمة متوافقة.', time: '2 days ago', timeAr: 'منذ يومين' },
  ],
};
