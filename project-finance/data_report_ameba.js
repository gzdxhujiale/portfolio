// 阿米巴经营仓数据文件
// data_report_ameba.js

// 阿米巴部门列表
const AMEBA_DEPARTMENTS = ['运营部-淘宝', '运营部-抖音', '运营部-快手', '商品部', '开发部', '产研部', '客服部', '仓储部', '人事部', '财务部'];

// 生成月度趋势数据
const getAmebaTrendData = (baseIncome) => Array.from({ length: 12 }, (_, i) => {
    const income = Math.floor(baseIncome / 12 * (0.8 + Math.random() * 0.4));
    const cost = Math.floor(income * (0.6 + Math.random() * 0.2));
    return { month: `${i + 1}月`, income, cost, profit: income - cost };
});

// 生成成本结构数据
const getCostStructure = () => [
    { label: '人力成本', percent: 0.4, color: '#6366f1' },
    { label: '营销推广', percent: 0.3, color: '#3b82f6' },
    { label: '办公分摊', percent: 0.15, color: '#f59e0b' },
    { label: '其他杂项', percent: 0.15, color: '#cbd5e1' }
];

// 生成专属损益表数据
const getAmebaPnL = (income, directCost, allocatedCost) => [
    { name: '一、经营收入', value: income, type: 'income', level: 1 },
    { name: '二、可控成本 (直接成本)', value: directCost, type: 'cost', level: 1 },
    { name: '人力成本', value: Math.floor(directCost * 0.6), type: 'cost', level: 2 },
    { name: '业务费用', value: Math.floor(directCost * 0.3), type: 'cost', level: 2 },
    { name: '其他直接支出', value: Math.floor(directCost * 0.1), type: 'cost', level: 2 },
    { name: '三、边际贡献', value: income - directCost, type: 'profit', level: 1, highlight: true },
    { name: '四、分摊/交易成本', value: allocatedCost, type: 'cost', level: 1 },
    { name: '房租水电分摊', value: Math.floor(allocatedCost * 0.4), type: 'cost', level: 2 },
    { name: '中台服务分摊', value: Math.floor(allocatedCost * 0.4), type: 'cost', level: 2 },
    { name: '资金占用费', value: Math.floor(allocatedCost * 0.2), type: 'cost', level: 2 },
    { name: '五、核算利润', value: income - directCost - allocatedCost, type: 'profit', level: 1, highlight: true, final: true }
];

// 生成科目明细数据
const getDetailData = (name, total) => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    date: `2025-10-${10 + i}`,
    desc: `${name} - 专项业务明细 #${1001 + i}`,
    type: name.includes('收入') ? '入账' : '支出',
    user: ['张三', '李四', '王五'][i % 3],
    amount: Math.floor(total / 10 * (0.8 + Math.random() * 0.4))
}));
