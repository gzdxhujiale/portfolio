// 店铺经营仓数据文件
// data_report_store.js

// 店铺基础数据
const BASE_STORE_DATA = [
    { id: 1, name: '淘宝A店', platform: '淘宝', gmv: 450000, cost: 300000, grossMargin: 33.3, netMargin: 15.2, returnRate: 5.4, roi: 3.2, aov: 158, trend: 'up' },
    { id: 2, name: '抖音B店', platform: '抖音', gmv: 820000, cost: 550000, grossMargin: 32.9, netMargin: 12.8, returnRate: 8.2, roi: 2.8, aov: 89, trend: 'up' },
    { id: 3, name: '快手C店', platform: '快手', gmv: 320000, cost: 200000, grossMargin: 37.5, netMargin: 18.5, returnRate: 4.1, roi: 4.1, aov: 65, trend: 'down' },
    { id: 4, name: '淘宝B店', platform: '淘宝', gmv: 150000, cost: 110000, grossMargin: 26.6, netMargin: 8.5, returnRate: 6.2, roi: 2.1, aov: 120, trend: 'up' },
    { id: 5, name: '抖音A店', platform: '抖音', gmv: 1200000, cost: 880000, grossMargin: 26.6, netMargin: 10.5, returnRate: 9.5, roi: 2.5, aov: 92, trend: 'up' },
];

// 模拟明细数据生成器
const getStoreDetailData = (name) => Array.from({length:5},(_,i)=>({
    id:i,
    date:`2025-10-0${i+1}`,
    desc:`${name} - 业务明细 ${i+1}`, 
    amount:Math.floor(Math.random()*50000)+1000
}));

// 模拟日维度订单明细数据
const getDayOrderDetails = (storeName, date) => Array.from({length: 12}, (_, i) => ({
    id: `ORD-${20251000 + i}`,
    time: `${date} 10:${10+i}`,
    product: `商品示例-${String.fromCharCode(65+i)}`,
    amount: Math.floor(Math.random() * 200) + 50,
    status: ['已结算', '已发货', '退款中', '已结算'][i % 4]
}));

// 模拟商品财务详情数据
const getProductFinanceDetails = (orderId) => ({
    id: orderId,
    productCode: `SKU-${orderId.split('-')[1] || '001'}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    productCost: (Math.random() * 40 + 20).toFixed(2),
    salesIncome: (Math.random() * 500 + 100).toFixed(2),
    otherIncome: (Math.random() * 20).toFixed(2),
    salesReturn: Math.random() > 0.8 ? (Math.random() * 50).toFixed(2) : '0.00',
    platformFee: (Math.random() * 30 + 5).toFixed(2),
    commission: (Math.random() * 50 + 10).toFixed(2),
    otherFee: (Math.random() * 10).toFixed(2)
});

// 成本构成饼图数据
const COST_PIE_DATA = [
    { label: '商品', percent: 0.45, color: '#6366f1' },
    { label: '物流', percent: 0.25, color: '#3b82f6' },
    { label: '营销', percent: 0.20, color: '#f59e0b' },
    { label: '人力', percent: 0.10, color: '#cbd5e1' }
];

// 科目构成饼图数据
const SUBJECT_PIE_DATA = [
    { label: '主营收入', percent: 0.60, color: '#10b981' },
    { label: '其他收入', percent: 0.15, color: '#34d399' },
    { label: '服务费', percent: 0.15, color: '#6ee7b7' },
    { label: '营业外', percent: 0.10, color: '#a7f3d0' }
];
