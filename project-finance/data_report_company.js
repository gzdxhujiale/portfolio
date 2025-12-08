// 公司经营仓数据文件
// data_report_company.js

// 阿米巴部门列表
const AMEBA_DEPARTMENTS = ['运营部-淘宝', '运营部-抖音', '运营部-快手', '商品部', '开发部', '产研部', '客服部', '仓储部', '人事部', '财务部'];

// 完整的三大报表数据
const FULL_COMPANY_REPORTS = {
    balance: [
        { id: 'asset', name: '一、资产总计', value: 58420000, level: 1, children: [
            { id: 'asset-current', name: '流动资产', value: 32500000, level: 2, children: [
                { id: 'c1', name: '货币资金', value: 15200000, level: 3 },
                { id: 'c2', name: '交易性金融资产', value: 2000000, level: 3 },
                { id: 'c3', name: '应收账款', value: 8300000, level: 3 },
                { id: 'c4', name: '预付款项', value: 1800000, level: 3 },
                { id: 'c5', name: '其他应收款', value: 1200000, level: 3 },
                { id: 'c6', name: '存货', value: 4000000, level: 3 }
            ]},
            { id: 'asset-fixed', name: '非流动资产', value: 25920000, level: 2, children: [
                { id: 'f1', name: '固定资产', value: 12500000, level: 3 },
                { id: 'f2', name: '在建工程', value: 4500000, level: 3 },
                { id: 'f3', name: '无形资产', value: 7800000, level: 3 },
                { id: 'f4', name: '长期待摊费用', value: 1120000, level: 3 }
            ]}
        ]},
        { id: 'liability', name: '二、负债合计', value: 21300000, level: 1, children: [
            { id: 'liab-current', name: '流动负债', value: 15100000, level: 2, children: [
                { id: 'l1', name: '短期借款', value: 5200000, level: 3 },
                { id: 'l2', name: '应付票据', value: 1800000, level: 3 },
                { id: 'l3', name: '应付账款', value: 6200000, level: 3 },
                { id: 'l4', name: '应付职工薪酬', value: 1400000, level: 3 },
                { id: 'l5', name: '应交税费', value: 500000, level: 3 }
            ]},
            { id: 'liab-long', name: '非流动负债', value: 6200000, level: 2, children: [
                { id: 'll1', name: '长期借款', value: 6200000, level: 3 }
            ]}
        ]},
        { id: 'equity', name: '三、所有者权益', value: 37120000, level: 1, children: [
            { id: 'e1', name: '实收资本', value: 20000000, level: 2, children: [] },
            { id: 'e2', name: '资本公积', value: 5000000, level: 2, children: [] },
            { id: 'e3', name: '盈余公积', value: 2120000, level: 2, children: [] },
            { id: 'e4', name: '未分配利润', value: 10000000, level: 2, children: [] }
        ]}
    ],
    profit: [
        { id: 'income', name: '一、营业收入', value: 85600000, level: 1, children: [
            { id: 'inc-main', name: '主营业务收入', value: 80400000, level: 2, children: [{id:'im1', name:'线上销售收入', value:60200000, level:3}, {id:'im2', name:'分销收入', value:20200000, level:3}] },
            { id: 'inc-other', name: '其他业务收入', value: 5200000, level: 2, children: [] }
        ]},
        { id: 'cost', name: '二、营业成本', value: 45800000, level: 1, children: [
            { id: 'cost-main', name: '主营业务成本', value: 42500000, level: 2, children: [] },
            { id: 'cost-other', name: '其他业务成本', value: 3300000, level: 2, children: [] }
        ]},
        { id: 'tax', name: '三、税金及附加', value: 550000, level: 1, children: [] },
        { id: 'expense', name: '四、期间费用', value: 25600000, level: 1, children: [
            { id: 'ex-sale', name: '销售费用', value: 15500000, level: 2, children: [{id:'es1', name:'广告推广费', value:8200000, level:3}, {id:'es2', name:'平台佣金', value:5100000, level:3}, {id:'es3', name:'物流运输费', value:2200000, level:3}] },
            { id: 'ex-manage', name: '管理费用', value: 8100000, level: 2, children: [{id:'em1', name:'行政薪资', value:5200000, level:3}, {id:'em2', name:'办公租赁费', value:1800000, level:3}, {id:'em3', name:'差旅交通', value:1100000, level:3}] },
            { id: 'ex-rd', name: '研发费用', value: 1600000, level: 2, children: [{id:'er1', name:'人员薪酬', value:1200000, level:3}, {id:'er2', name:'设备折旧', value:400000, level:3}] },
            { id: 'ex-fin', name: '财务费用', value: 400000, level: 2, children: [{id:'ef1', name:'利息支出', value:350000, level:3}, {id:'ef2', name:'银行手续费', value:50000, level:3}] }
        ]},
        { id: 'profit-op', name: '五、营业利润', value: 13650000, level: 1, children: [] },
        { id: 'profit-total', name: '六、利润总额', value: 14050000, level: 1, children: [{id:'non-op-in', name:'营业外收入', value:500000, level:2, children:[]}, {id:'non-op-out', name:'营业外支出', value:100000, level:2, children:[]}] },
        { id: 'profit-net', name: '七、净利润', value: 10537500, level: 1, children: [] }
    ],
    cash: [
        { id: 'c-op', name: '一、经营活动产生的现金流量', value: 12500000, level: 1, children: [
            { id: 'cop-in', name: '销售商品、提供劳务收到的现金', value: 91000000, level: 2, children: [] },
            { id: 'cop-out', name: '购买商品、接受劳务支付的现金', value: -78500000, level: 2, children: [] }
        ]},
        { id: 'c-inv', name: '二、投资活动产生的现金流量', value: -5200000, level: 1, children: [
            { id: 'cinv-in', name: '收回投资收到的现金', value: 1200000, level: 2, children: [] },
            { id: 'cinv-out', name: '购建固定资产支付的现金', value: -6400000, level: 2, children: [] }
        ]},
        { id: 'c-fin', name: '三、筹资活动产生的现金流量', value: 2800000, level: 1, children: [
            { id: 'cfin-in', name: '吸收投资收到的现金', value: 5000000, level: 2, children: [] },
            { id: 'cfin-out', name: '偿还债务支付的现金', value: -2200000, level: 2, children: [] }
        ]},
        { id: 'c-net', name: '四、现金及现金等价物净增加额', value: 10100000, level: 1, children: [] }
    ],
    budget: [
        { id: 1, subject: '销售费用', budget: 16000000, actual: 15500000, percent: 96.8 },
        { id: 2, subject: '管理费用', budget: 8500000, actual: 8100000, percent: 95.2 },
        { id: 3, subject: '研发费用', budget: 2000000, actual: 1600000, percent: 80.0 },
        { id: 4, subject: '财务费用', budget: 500000, actual: 400000, percent: 80.0 },
        { id: 5, subject: '人力成本', budget: 12000000, actual: 11500000, percent: 95.8 },
        { id: 6, subject: '办公行政', budget: 3000000, actual: 1800000, percent: 60.0 },
        { id: 7, subject: '市场推广费', budget: 5000000, actual: 4800000, percent: 96.0 },
        { id: 8, subject: '物流仓储费', budget: 4000000, actual: 2200000, percent: 55.0 },
        { id: 9, subject: '差旅交通费', budget: 1500000, actual: 1100000, percent: 73.3 },
    ]
};

// 模拟生成阿米巴预算数据
const getAmebaBudgetData = () => {
    return AMEBA_DEPARTMENTS.map((name, index) => {
        const baseBudget = name.includes('运营') ? 5000000 : 1000000;
        const budget = Math.floor(baseBudget * (1 + Math.random()));
        const actual = Math.floor(budget * (0.7 + Math.random() * 0.3));
        return {
            id: index + 1, group: name, budget, actual, percent: Math.round(actual / budget * 100)
        };
    }).sort((a, b) => b.budget - a.budget);
};

// 初始阿米巴数据
const INITIAL_AMEBA_BUDGET_DATA = getAmebaBudgetData();

// 模拟明细账数据
const getMockAccountDetails = (itemName, totalValue) => {
    const count = 6 + Math.floor(Math.random() * 5);
    const details = [];
    const types = ['银行转账', '报销单', '付款单', '收款单'];
    const users = ['张三', '李四', '王五', '赵六'];
    for (let i = 0; i < count; i++) {
        const amount = Math.floor(totalValue / count * (0.8 + Math.random() * 0.4));
        details.push({
            id: i + 1, date: `2025-10-${10 + i}`, docNo: `PZ-${100 + i}`,
            summary: `${itemName}-业务明细-${i + 1}`, type: types[i % 4],
            user: users[i % 4], debit: amount, credit: 0
        });
    }
    return details;
};

const getMockExpenseDetails = (dept, subj) => Array.from({length:6},(_,i)=>({id:i,date:`2025-10-${10+i}`,desc:`${dept}-${subj}-报销单${i+1}`,user:['张三','李四'][i%2],amount:Math.floor(Math.random()*5000)+200}));
