/**
 * 电商卖货公司 - 数据中心
 * 维度：平台、客户、店铺、部门、商品
 */

(function () {
  // 基础维度数据
  const platforms = ["淘宝", "抖音", "快手"];
  const customers = ["橘子", "苹果", "香蕉"];
  const departments = ["运营一部", "运营二部", "运营三部"];
  const categories = ["服装", "美妆", "食品", "数码", "家居"];
  const months = ["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08"];

  // 生成店铺明细数据
  function generateShopData() {
    const data = [];
    customers.forEach((cust) => {
      platforms.forEach((plat) => {
        ["A店", "B店"].forEach((suffix, idx) => {
          const shopName = `${plat}${cust}${suffix}`;
          const dept = departments[Math.floor(Math.random() * 3)];
          months.forEach((month) => {
            categories.forEach((cat) => {
              const baseGmv = Math.floor(Math.random() * 50000) + 10000;
              let gmv = baseGmv;
              if (cust === "苹果") gmv = baseGmv * 1.4;
              if (cust === "香蕉") gmv = baseGmv * 0.6;
              if (plat === "淘宝") gmv *= 1.2;
              const cost = gmv * (0.6 + Math.random() * 0.2);
              const profit = gmv - cost;
              const orders = Math.floor(gmv / (80 + Math.random() * 120));
              const visitors = orders * (15 + Math.floor(Math.random() * 20));
              const convRate = ((orders / visitors) * 100).toFixed(2);
              data.push({
                customer: cust, platform: plat, shopName, department: dept,
                category: cat, month, gmv: Math.round(gmv), cost: Math.round(cost),
                profit: Math.round(profit), orders, visitors, conversionRate: parseFloat(convRate),
              });
            });
          });
        });
      });
    });
    return data;
  }

  window.MOCK_DATA = generateShopData();
  console.log("Mock Data Loaded:", window.MOCK_DATA.length, "records");

  // ========== 数据权限配置（表级 + 行级 + 列级） ==========
  
  // 数据表定义
  window.DATA_TABLES = [
    { 
      id: 'shop_sales', 
      name: '店铺销售明细', 
      description: '各店铺的销售数据明细',
      fields: {
        customer: { label: '客户', type: 'string', sensitive: false },
        platform: { label: '平台', type: 'string', sensitive: false },
        shopName: { label: '店铺', type: 'string', sensitive: false },
        department: { label: '部门', type: 'string', sensitive: false },
        category: { label: '品类', type: 'string', sensitive: false },
        month: { label: '月份', type: 'string', sensitive: false },
        gmv: { label: 'GMV', type: 'number', sensitive: false },
        orders: { label: '订单数', type: 'number', sensitive: false },
        visitors: { label: '访客数', type: 'number', sensitive: false },
        conversionRate: { label: '转化率%', type: 'number', sensitive: false },
      }
    },
    { 
      id: 'finance_report', 
      name: '财务报表', 
      description: '成本利润等财务数据',
      fields: {
        customer: { label: '客户', type: 'string', sensitive: false },
        platform: { label: '平台', type: 'string', sensitive: false },
        shopName: { label: '店铺', type: 'string', sensitive: false },
        month: { label: '月份', type: 'string', sensitive: false },
        gmv: { label: '收入', type: 'number', sensitive: false },
        cost: { label: '成本', type: 'number', sensitive: true },
        profit: { label: '利润', type: 'number', sensitive: true },
        profitRate: { label: '利润率%', type: 'number', sensitive: true },
      }
    },
    { 
      id: 'customer_analysis', 
      name: '客户分析表', 
      description: '客户维度的汇总分析',
      fields: {
        customer: { label: '客户', type: 'string', sensitive: false },
        totalGmv: { label: '总GMV', type: 'number', sensitive: false },
        totalOrders: { label: '总订单', type: 'number', sensitive: false },
        avgOrderValue: { label: '客单价', type: 'number', sensitive: false },
        shopCount: { label: '店铺数', type: 'number', sensitive: false },
        totalProfit: { label: '总利润', type: 'number', sensitive: true },
        profitRate: { label: '利润率%', type: 'number', sensitive: true },
      }
    },
    { 
      id: 'platform_analysis', 
      name: '平台分析表', 
      description: '平台维度的汇总分析',
      fields: {
        platform: { label: '平台', type: 'string', sensitive: false },
        totalGmv: { label: '总GMV', type: 'number', sensitive: false },
        totalOrders: { label: '总订单', type: 'number', sensitive: false },
        totalVisitors: { label: '总访客', type: 'number', sensitive: false },
        conversionRate: { label: '转化率%', type: 'number', sensitive: false },
        totalCost: { label: '总成本', type: 'number', sensitive: true },
        totalProfit: { label: '总利润', type: 'number', sensitive: true },
      }
    },
    { 
      id: 'department_kpi', 
      name: '部门KPI表', 
      description: '部门绩效考核数据',
      fields: {
        department: { label: '部门', type: 'string', sensitive: false },
        month: { label: '月份', type: 'string', sensitive: false },
        targetGmv: { label: '目标GMV', type: 'number', sensitive: false },
        actualGmv: { label: '实际GMV', type: 'number', sensitive: false },
        achieveRate: { label: '达成率%', type: 'number', sensitive: false },
        bonus: { label: '绩效奖金', type: 'number', sensitive: true },
        ranking: { label: '排名', type: 'number', sensitive: false },
      }
    },
  ];

  // 行级权限规则库（可复用）
  window.ROW_PERMISSION_RULES = [
    { id: 'all', name: '全部数据', description: '不限制，可查看所有行', filter: null },
    { id: 'customer_juzi', name: '橘子客户', description: '仅橘子客户相关数据', filter: { field: 'customer', operator: 'eq', value: '橘子' } },
    { id: 'customer_pingguo', name: '苹果客户', description: '仅苹果客户相关数据', filter: { field: 'customer', operator: 'eq', value: '苹果' } },
    { id: 'customer_xiangjiao', name: '香蕉客户', description: '仅香蕉客户相关数据', filter: { field: 'customer', operator: 'eq', value: '香蕉' } },
    { id: 'platform_taobao', name: '淘宝平台', description: '仅淘宝平台数据', filter: { field: 'platform', operator: 'eq', value: '淘宝' } },
    { id: 'platform_douyin', name: '抖音平台', description: '仅抖音平台数据', filter: { field: 'platform', operator: 'eq', value: '抖音' } },
    { id: 'platform_kuaishou', name: '快手平台', description: '仅快手平台数据', filter: { field: 'platform', operator: 'eq', value: '快手' } },
    { id: 'dept_yunying1', name: '运营一部', description: '仅运营一部数据', filter: { field: 'department', operator: 'eq', value: '运营一部' } },
    { id: 'dept_yunying2', name: '运营二部', description: '仅运营二部数据', filter: { field: 'department', operator: 'eq', value: '运营二部' } },
    { id: 'profit_positive', name: '盈利数据', description: '仅利润>0的数据', filter: { field: 'profit', operator: 'gt', value: 0 } },
  ];

  // 列级权限规则库（可复用）
  window.COLUMN_PERMISSION_RULES = [
    { id: 'all', name: '全部字段', description: '可查看所有字段' },
    { id: 'hide_sensitive', name: '隐藏敏感字段', description: '隐藏标记为敏感的字段（成本、利润等）' },
    { id: 'basic_only', name: '仅基础字段', description: '只显示非数值类基础信息' },
    { id: 'custom', name: '自定义', description: '自定义可见字段列表' },
  ];

  // 角色的表级数据权限配置
  window.ROLE_DATA_PERMISSIONS = {
    // 超级管理员 - 所有表全部权限
    1: {
      tables: {
        shop_sales: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        finance_report: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        department_kpi: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
      }
    },
    // 运维工程师 - 只能看平台分析，隐藏敏感字段
    2: {
      tables: {
        shop_sales: { access: false, rowRule: null, columnRule: null, customColumns: null },
        finance_report: { access: false, rowRule: null, columnRule: null, customColumns: null },
        customer_analysis: { access: false, rowRule: null, columnRule: null, customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        department_kpi: { access: false, rowRule: null, columnRule: null, customColumns: null },
      }
    },
    // 数据质量管理员 - 可看销售明细和客户分析，隐藏敏感
    3: {
      tables: {
        shop_sales: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        finance_report: { access: false, rowRule: null, columnRule: null, customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        department_kpi: { access: false, rowRule: null, columnRule: null, customColumns: null },
      }
    },
    // 数据资产管理员 - 全部表，但财务报表隐藏敏感
    4: {
      tables: {
        shop_sales: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        finance_report: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        department_kpi: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
      }
    },
    // 财务BI - 财务报表全权限，其他表隐藏敏感或无权限
    5: {
      tables: {
        shop_sales: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        finance_report: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        department_kpi: { access: false, rowRule: null, columnRule: null, customColumns: null },
      }
    },
    // 业务BI - 销售和平台分析，限淘宝平台
    6: {
      tables: {
        shop_sales: { access: true, rowRule: 'platform_taobao', columnRule: 'all', customColumns: null },
        finance_report: { access: false, rowRule: null, columnRule: null, customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'hide_sensitive', customColumns: null },
        platform_analysis: { access: true, rowRule: 'platform_taobao', columnRule: 'hide_sensitive', customColumns: null },
        department_kpi: { access: false, rowRule: null, columnRule: null, customColumns: null },
      }
    },
    // 高层管理者 - 全部表全部权限
    7: {
      tables: {
        shop_sales: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        finance_report: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        customer_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        platform_analysis: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
        department_kpi: { access: true, rowRule: 'all', columnRule: 'all', customColumns: null },
      }
    },
  };

  // 生成各表的模拟数据
  window.TABLE_DATA = {
    shop_sales: window.MOCK_DATA.map(r => ({
      customer: r.customer, platform: r.platform, shopName: r.shopName,
      department: r.department, category: r.category, month: r.month,
      gmv: r.gmv, orders: r.orders, visitors: r.visitors, conversionRate: r.conversionRate
    })),
    finance_report: (() => {
      const map = {};
      window.MOCK_DATA.forEach(r => {
        const key = `${r.customer}-${r.platform}-${r.shopName}-${r.month}`;
        if (!map[key]) map[key] = { customer: r.customer, platform: r.platform, shopName: r.shopName, month: r.month, gmv: 0, cost: 0, profit: 0 };
        map[key].gmv += r.gmv;
        map[key].cost += r.cost;
        map[key].profit += r.profit;
      });
      return Object.values(map).map(r => ({ ...r, profitRate: ((r.profit / r.gmv) * 100).toFixed(1) }));
    })(),
    customer_analysis: (() => {
      const map = {};
      window.MOCK_DATA.forEach(r => {
        if (!map[r.customer]) map[r.customer] = { customer: r.customer, totalGmv: 0, totalOrders: 0, shops: new Set(), totalProfit: 0 };
        map[r.customer].totalGmv += r.gmv;
        map[r.customer].totalOrders += r.orders;
        map[r.customer].shops.add(r.shopName);
        map[r.customer].totalProfit += r.profit;
      });
      return Object.values(map).map(r => ({
        customer: r.customer, totalGmv: r.totalGmv, totalOrders: r.totalOrders,
        avgOrderValue: Math.round(r.totalGmv / r.totalOrders), shopCount: r.shops.size,
        totalProfit: r.totalProfit, profitRate: ((r.totalProfit / r.totalGmv) * 100).toFixed(1)
      }));
    })(),
    platform_analysis: (() => {
      const map = {};
      window.MOCK_DATA.forEach(r => {
        if (!map[r.platform]) map[r.platform] = { platform: r.platform, totalGmv: 0, totalOrders: 0, totalVisitors: 0, totalCost: 0, totalProfit: 0 };
        map[r.platform].totalGmv += r.gmv;
        map[r.platform].totalOrders += r.orders;
        map[r.platform].totalVisitors += r.visitors;
        map[r.platform].totalCost += r.cost;
        map[r.platform].totalProfit += r.profit;
      });
      return Object.values(map).map(r => ({
        ...r, conversionRate: ((r.totalOrders / r.totalVisitors) * 100).toFixed(2)
      }));
    })(),
    department_kpi: (() => {
      const map = {};
      window.MOCK_DATA.forEach(r => {
        const key = `${r.department}-${r.month}`;
        if (!map[key]) map[key] = { department: r.department, month: r.month, actualGmv: 0 };
        map[key].actualGmv += r.gmv;
      });
      const arr = Object.values(map);
      // 按月份分组排名
      const byMonth = {};
      arr.forEach(r => {
        if (!byMonth[r.month]) byMonth[r.month] = [];
        byMonth[r.month].push(r);
      });
      Object.values(byMonth).forEach(list => {
        list.sort((a, b) => b.actualGmv - a.actualGmv);
        list.forEach((r, i) => r.ranking = i + 1);
      });
      return arr.map(r => ({
        ...r,
        targetGmv: Math.round(r.actualGmv * (0.9 + Math.random() * 0.3)),
        achieveRate: (100 + (Math.random() - 0.5) * 40).toFixed(1),
        bonus: Math.round(r.actualGmv * 0.01 * Math.random()),
      }));
    })(),
  };

  // 兼容旧版配置（保留fieldLabels供其他页面使用）
  window.DATA_PERMISSION_CONFIG = {
    fieldLabels: {
      customer: "客户", platform: "平台", shopName: "店铺", department: "部门",
      category: "品类", month: "月份", gmv: "GMV", cost: "成本", profit: "利润",
      orders: "订单数", visitors: "访客数", conversionRate: "转化率%",
    },
  };


  // 聚合数据 - 用于看板
  function aggregateData(data) {
    const byPlatform = {}, byCustomer = {}, byDepartment = {}, byCategory = {}, byMonth = {};
    data.forEach((r) => {
      // 按平台
      if (!byPlatform[r.platform]) byPlatform[r.platform] = { gmv: 0, cost: 0, profit: 0, orders: 0, visitors: 0 };
      byPlatform[r.platform].gmv += r.gmv;
      byPlatform[r.platform].cost += r.cost;
      byPlatform[r.platform].profit += r.profit;
      byPlatform[r.platform].orders += r.orders;
      byPlatform[r.platform].visitors += r.visitors;
      // 按客户
      if (!byCustomer[r.customer]) byCustomer[r.customer] = { gmv: 0, cost: 0, profit: 0, orders: 0, visitors: 0 };
      byCustomer[r.customer].gmv += r.gmv;
      byCustomer[r.customer].cost += r.cost;
      byCustomer[r.customer].profit += r.profit;
      byCustomer[r.customer].orders += r.orders;
      byCustomer[r.customer].visitors += r.visitors;
      // 按部门
      if (!byDepartment[r.department]) byDepartment[r.department] = { gmv: 0, cost: 0, profit: 0, orders: 0 };
      byDepartment[r.department].gmv += r.gmv;
      byDepartment[r.department].cost += r.cost;
      byDepartment[r.department].profit += r.profit;
      byDepartment[r.department].orders += r.orders;
      // 按品类
      if (!byCategory[r.category]) byCategory[r.category] = { gmv: 0, cost: 0, profit: 0, orders: 0 };
      byCategory[r.category].gmv += r.gmv;
      byCategory[r.category].cost += r.cost;
      byCategory[r.category].profit += r.profit;
      byCategory[r.category].orders += r.orders;
      // 按月份
      if (!byMonth[r.month]) byMonth[r.month] = { gmv: 0, cost: 0, profit: 0, orders: 0, visitors: 0 };
      byMonth[r.month].gmv += r.gmv;
      byMonth[r.month].cost += r.cost;
      byMonth[r.month].profit += r.profit;
      byMonth[r.month].orders += r.orders;
      byMonth[r.month].visitors += r.visitors;
    });
    return { byPlatform, byCustomer, byDepartment, byCategory, byMonth };
  }

  const agg = aggregateData(window.MOCK_DATA);

  // 计算总计
  const totalGmv = Object.values(agg.byPlatform).reduce((s, v) => s + v.gmv, 0);
  const totalProfit = Object.values(agg.byPlatform).reduce((s, v) => s + v.profit, 0);
  const totalCost = Object.values(agg.byPlatform).reduce((s, v) => s + v.cost, 0);
  const totalOrders = Object.values(agg.byPlatform).reduce((s, v) => s + v.orders, 0);
  const totalVisitors = Object.values(agg.byPlatform).reduce((s, v) => s + v.visitors, 0);

  window.DASHBOARD_DATA = {
    summary: {
      gmv: totalGmv, profit: totalProfit, cost: totalCost, orders: totalOrders,
      visitors: totalVisitors, profitRate: ((totalProfit / totalGmv) * 100).toFixed(1),
      avgOrderValue: Math.round(totalGmv / totalOrders),
      conversionRate: ((totalOrders / totalVisitors) * 100).toFixed(2),
    },
    byPlatform: Object.entries(agg.byPlatform).map(([k, v]) => ({ name: k, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) })),
    byCustomer: Object.entries(agg.byCustomer).map(([k, v]) => ({ name: k, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) })),
    byDepartment: Object.entries(agg.byDepartment).map(([k, v]) => ({ name: k, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) })),
    byCategory: Object.entries(agg.byCategory).map(([k, v]) => ({ name: k, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) })),
    byMonth: Object.entries(agg.byMonth).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => ({ month: k, ...v })),
  };

  // 店铺排行
  const shopAgg = {};
  window.MOCK_DATA.forEach((r) => {
    if (!shopAgg[r.shopName]) shopAgg[r.shopName] = { platform: r.platform, customer: r.customer, gmv: 0, profit: 0, orders: 0 };
    shopAgg[r.shopName].gmv += r.gmv;
    shopAgg[r.shopName].profit += r.profit;
    shopAgg[r.shopName].orders += r.orders;
  });
  window.DASHBOARD_DATA.shopRanking = Object.entries(shopAgg)
    .map(([name, v]) => ({ name, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) }))
    .sort((a, b) => b.gmv - a.gmv);

  // 商品品类在各平台的分布
  const categoryPlatform = {};
  window.MOCK_DATA.forEach((r) => {
    const key = `${r.category}-${r.platform}`;
    if (!categoryPlatform[key]) categoryPlatform[key] = { category: r.category, platform: r.platform, gmv: 0 };
    categoryPlatform[key].gmv += r.gmv;
  });
  window.DASHBOARD_DATA.categoryPlatform = Object.values(categoryPlatform);

  console.log("Dashboard Data Ready");
})();
