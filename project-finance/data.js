/**
 * 电商卖货公司 - 统一数据中心
 * 所有页面共享的数据定义
 */

(function () {
  // ========== 基础维度数据 ==========
  const platforms = ["淘宝", "快手", "抖音"];
  const customers = ["客户A", "客户B", "客户C"];
  const operationDepts = ["运营一部", "运营二部", "运营三部"]; // 运营部门（用于业务数据）
  const categories = ["服装", "美妆", "食品", "数码", "家居"];
  const months = ["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08"];

  // 生成店铺列表：每个客户在每个平台有3个店铺
  const shops = [];
  customers.forEach(cust => {
    platforms.forEach(plat => {
      [1, 2, 3].forEach(num => {
        shops.push({ customer: cust, platform: plat, shopName: `${cust}${plat}${num}号店` });
      });
    });
  });

  // 导出基础维度
  window.PLATFORMS = platforms;
  window.CUSTOMERS = customers;
  window.CATEGORIES = categories;
  window.SHOPS = shops;

  // ========== 组织架构 ==========
  window.DEPARTMENTS = ['财务部', '运营部', '技术部', '数据部', '管理层', '人事部'];

  // ========== 角色配置 ==========
  window.ROLES = [
    { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', desc: '拥有系统所有权限', userCount: 1, isSystem: true, color: 'red', permissions: ['all'], rowPermissionId: 'all', columnPermissionId: 'all' },
    { id: 2, name: '运维工程师', code: 'OPS_ENGINEER', desc: '负责系统运维、日志管理', userCount: 2, isSystem: true, color: 'purple', permissions: ['rbac:log:view', 'rbac:log:export', 'config:management:view'], rowPermissionId: 'all', columnPermissionId: 'hide_sensitive' },
    { id: 3, name: '数据质量管理员', code: 'DATA_QUALITY', desc: '负责数据质量监控', userCount: 3, isSystem: true, color: 'blue', permissions: ['report:center', 'report:company:view', 'report:ameba:view', 'report:store:view', 'workspace:todo:view', 'workspace:history:view'], rowPermissionId: 'all', columnPermissionId: 'all' },
    { id: 4, name: '数据资产管理员', code: 'DATA_ASSET', desc: '管理数据资产目录', userCount: 2, isSystem: true, color: 'cyan', permissions: ['report:center', 'report:company:view', 'report:company:export', 'config:management:view', 'config:management:edit'], rowPermissionId: 'all', columnPermissionId: 'all' },
    { id: 5, name: '财务BI', code: 'FINANCE_BI', desc: '查看财务相关报表', userCount: 5, isSystem: true, color: 'green', permissions: ['report:center', 'report:company:view', 'report:company:export', 'report:bi:view', 'report:bi:export'], rowPermissionId: 'profit_positive', columnPermissionId: 'all' },
    { id: 6, name: '业务BI', code: 'BUSINESS_BI', desc: '查看业务相关报表', userCount: 8, isSystem: true, color: 'amber', permissions: ['report:center', 'report:ameba:view', 'report:ameba:export', 'report:store:view', 'report:store:export', 'report:bi:view'], rowPermissionId: 'platform_taobao', columnPermissionId: 'hide_sensitive' },
    { id: 7, name: '高层管理者', code: 'EXECUTIVE', desc: '查看所有经营数据', userCount: 3, isSystem: true, color: 'indigo', permissions: ['report:center', 'report:company:view', 'report:company:export', 'report:ameba:view', 'report:ameba:export', 'report:store:view', 'report:store:export', 'report:bi:view', 'report:bi:export'], rowPermissionId: 'all', columnPermissionId: 'all' },
  ];

  // 角色名称列表（便于下拉选择）
  window.ROLE_NAMES = window.ROLES.map(r => r.name);

  // 角色颜色配置
  window.ROLE_COLORS = {
    map: { red: 'bg-red-500', purple: 'bg-purple-500', blue: 'bg-blue-500', cyan: 'bg-cyan-500', green: 'bg-green-500', amber: 'bg-amber-500', indigo: 'bg-indigo-500' },
    light: { red: 'bg-red-100 text-red-600', purple: 'bg-purple-100 text-purple-600', blue: 'bg-blue-100 text-blue-600', cyan: 'bg-cyan-100 text-cyan-600', green: 'bg-green-100 text-green-600', amber: 'bg-amber-100 text-amber-600', indigo: 'bg-indigo-100 text-indigo-600' },
    badge: {
      '超级管理员': 'bg-red-100 text-red-700 border-red-200',
      '运维工程师': 'bg-purple-100 text-purple-700 border-purple-200',
      '数据质量管理员': 'bg-blue-100 text-blue-700 border-blue-200',
      '数据资产管理员': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      '财务BI': 'bg-green-100 text-green-700 border-green-200',
      '业务BI': 'bg-amber-100 text-amber-700 border-amber-200',
      '高层管理者': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    }
  };

  // ========== 权限树 ==========
  window.PERMISSION_TREE = [
    { id: 'report', name: '数据分析', icon: 'folder', children: [
      { id: 'report:center', name: '经营仓中心', icon: 'file', type: 'menu' },
      { id: 'report:company', name: '公司经营仓', icon: 'file', type: 'menu', children: [
        { id: 'report:company:view', name: '查看', type: 'action' },
        { id: 'report:company:export', name: '导出', type: 'action' },
      ]},
      { id: 'report:ameba', name: '阿米巴经营仓', icon: 'file', type: 'menu', children: [
        { id: 'report:ameba:view', name: '查看', type: 'action' },
        { id: 'report:ameba:export', name: '导出', type: 'action' },
      ]},
      { id: 'report:store', name: '店铺经营仓', icon: 'file', type: 'menu', children: [
        { id: 'report:store:view', name: '查看', type: 'action' },
        { id: 'report:store:export', name: '导出', type: 'action' },
      ]},
      { id: 'report:bi', name: '数据看板', icon: 'file', type: 'menu', children: [
        { id: 'report:bi:view', name: '查看', type: 'action' },
        { id: 'report:bi:edit', name: '编辑', type: 'action' },
        { id: 'report:bi:export', name: '导出', type: 'action' },
      ]},
    ]},
    { id: 'workspace', name: '工作台', icon: 'folder', children: [
      { id: 'workspace:todo', name: '待办清单', icon: 'file', type: 'menu', children: [
        { id: 'workspace:todo:view', name: '查看', type: 'action' },
        { id: 'workspace:todo:edit', name: '编辑', type: 'action' },
      ]},
      { id: 'workspace:history', name: '历史记录', icon: 'file', type: 'menu', children: [
        { id: 'workspace:history:view', name: '查看', type: 'action' },
      ]},
    ]},
    { id: 'rbac', name: '权限中心', icon: 'folder', children: [
      { id: 'rbac:user', name: '用户管理', icon: 'file', type: 'menu', children: [
        { id: 'rbac:user:view', name: '查看', type: 'action' },
        { id: 'rbac:user:add', name: '新增', type: 'action' },
        { id: 'rbac:user:edit', name: '编辑', type: 'action' },
        { id: 'rbac:user:delete', name: '删除', type: 'action' },
      ]},
      { id: 'rbac:role', name: '角色管理', icon: 'file', type: 'menu', children: [
        { id: 'rbac:role:view', name: '查看', type: 'action' },
        { id: 'rbac:role:add', name: '新增', type: 'action' },
        { id: 'rbac:role:edit', name: '编辑', type: 'action' },
        { id: 'rbac:role:delete', name: '删除', type: 'action' },
      ]},
      { id: 'rbac:permission', name: '权限管理', icon: 'file', type: 'menu', children: [
        { id: 'rbac:permission:view', name: '查看', type: 'action' },
        { id: 'rbac:permission:edit', name: '编辑', type: 'action' },
      ]},
      { id: 'rbac:log', name: '操作日志', icon: 'file', type: 'menu', children: [
        { id: 'rbac:log:view', name: '查看', type: 'action' },
        { id: 'rbac:log:export', name: '导出', type: 'action' },
      ]},
      { id: 'rbac:apply', name: '权限申请', icon: 'file', type: 'menu', children: [
        { id: 'rbac:apply:view', name: '查看', type: 'action' },
        { id: 'rbac:apply:approve', name: '审批', type: 'action' },
      ]},
    ]},
    { id: 'config', name: '系统设置', icon: 'folder', children: [
      { id: 'config:management', name: '配置管理', icon: 'file', type: 'menu', children: [
        { id: 'config:management:view', name: '查看', type: 'action' },
        { id: 'config:management:edit', name: '编辑', type: 'action' },
      ]},
    ]},
  ];

  // ========== 用户数据 ==========
  window.USERS = [
    { id: 1, name: '张三', username: 'zhangsan', email: 'zhangsan@company.com', phone: '138****8001', department: '财务部', roles: ['财务BI'], status: '启用', lastLogin: '2025-12-09 10:30', createTime: '2024-01-15' },
    { id: 2, name: '李四', username: 'lisi', email: 'lisi@company.com', phone: '138****8002', department: '运营部', roles: ['业务BI', '数据质量管理员'], status: '启用', lastLogin: '2025-12-09 09:15', createTime: '2024-02-20' },
    { id: 3, name: '王五', username: 'wangwu', email: 'wangwu@company.com', phone: '138****8003', department: '技术部', roles: ['运维工程师'], status: '启用', lastLogin: '2025-12-08 18:45', createTime: '2024-03-10' },
    { id: 4, name: '赵六', username: 'zhaoliu', email: 'zhaoliu@company.com', phone: '138****8004', department: '数据部', roles: ['数据资产管理员'], status: '启用', lastLogin: '2025-12-09 08:00', createTime: '2024-04-05' },
    { id: 5, name: '钱七', username: 'qianqi', email: 'qianqi@company.com', phone: '138****8005', department: '管理层', roles: ['高层管理者'], status: '启用', lastLogin: '2025-12-07 14:20', createTime: '2024-01-01' },
    { id: 6, name: '孙八', username: 'sunba', email: 'sunba@company.com', phone: '138****8006', department: '技术部', roles: ['超级管理员'], status: '启用', lastLogin: '2025-12-09 11:00', createTime: '2023-12-01' },
    { id: 7, name: '周九', username: 'zhoujiu', email: 'zhoujiu@company.com', phone: '138****8007', department: '运营部', roles: ['业务BI'], status: '停用', lastLogin: '2025-11-20 16:30', createTime: '2024-05-15' },
  ];

  // ========== 权限申请数据 ==========
  window.APPLICATIONS = [
    { id: 1001, applicant: '张三', department: '财务部', currentRoles: ['财务BI'], requestRoles: ['数据资产管理员'], reason: '需要查看数据资产目录，进行财务数据血缘分析', status: 'pending', createTime: '2025-12-09 09:30', approver: null, approveTime: null, comment: null },
    { id: 1002, applicant: '李四', department: '运营部', currentRoles: ['业务BI'], requestRoles: ['高层管理者'], reason: '晋升为运营总监，需要查看全公司经营数据', status: 'pending', createTime: '2025-12-08 14:20', approver: null, approveTime: null, comment: null },
    { id: 1003, applicant: '王五', department: '技术部', currentRoles: ['运维工程师'], requestRoles: ['数据质量管理员'], reason: '负责数据质量监控系统开发，需要相关权限进行测试', status: 'approved', createTime: '2025-12-07 10:15', approver: '孙八', approveTime: '2025-12-07 16:30', comment: '同意，有效期3个月' },
    { id: 1004, applicant: '赵六', department: '数据部', currentRoles: ['数据资产管理员'], requestRoles: ['超级管理员'], reason: '临时需要超级管理员权限进行系统配置', status: 'rejected', createTime: '2025-12-06 11:00', approver: '孙八', approveTime: '2025-12-06 15:45', comment: '超级管理员权限不可申请，请联系系统管理员' },
    { id: 1005, applicant: '钱七', department: '管理层', currentRoles: ['高层管理者'], requestRoles: ['财务BI'], reason: '需要查看详细财务报表数据', status: 'approved', createTime: '2025-12-05 09:00', approver: '孙八', approveTime: '2025-12-05 10:30', comment: '同意' },
    { id: 1006, applicant: '周九', department: '运营部', currentRoles: [], requestRoles: ['业务BI'], reason: '新入职员工，申请业务BI权限', status: 'pending', createTime: '2025-12-09 11:00', approver: null, approveTime: null, comment: null },
  ];

  // ========== 操作日志生成 ==========
  window.generateLogs = function() {
    const actions = [
      { module: '用户管理', action: '新增用户', type: 'create' },
      { module: '用户管理', action: '编辑用户', type: 'update' },
      { module: '用户管理', action: '删除用户', type: 'delete' },
      { module: '角色管理', action: '新增角色', type: 'create' },
      { module: '角色管理', action: '编辑角色', type: 'update' },
      { module: '权限申请', action: '提交申请', type: 'create' },
      { module: '权限申请', action: '审批通过', type: 'update' },
      { module: '公司经营仓', action: '查看报表', type: 'view' },
      { module: '公司经营仓', action: '导出报表', type: 'export' },
      { module: '店铺经营仓', action: '查看报表', type: 'view' },
      { module: '配置管理', action: '修改配置', type: 'update' },
      { module: '系统登录', action: '用户登录', type: 'login' },
      { module: '系统登录', action: '用户登出', type: 'logout' },
    ];
    const ips = ['192.168.1.101', '192.168.1.102', '10.0.0.55', '172.16.0.88'];
    const logs = [];
    const now = new Date();
    for (let i = 0; i < 50; i++) {
      const act = actions[Math.floor(Math.random() * actions.length)];
      const user = window.USERS[Math.floor(Math.random() * window.USERS.length)];
      const time = new Date(now - i * 1000 * 60 * Math.floor(Math.random() * 60 + 5));
      logs.push({
        id: 1000 + i,
        time: time.toISOString().replace('T', ' ').substring(0, 19),
        user: user.name,
        role: user.roles[0] || '无角色',
        ip: ips[Math.floor(Math.random() * ips.length)],
        module: act.module,
        action: act.action,
        type: act.type,
        status: Math.random() > 0.05 ? '成功' : '失败',
        detail: `${user.name} 执行了 ${act.action} 操作`
      });
    }
    return logs;
  };

  // 预生成日志数据
  window.LOGS = window.generateLogs();

  // ========== 业务数据生成 ==========
  // 基于新的店铺结构生成数据：
  // - 客户A、客户B、客户C
  // - 每个客户在淘宝、快手、抖音各有3个店铺
  // - 共27个店铺

  // 使用固定种子生成稳定的随机数据
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function generateShopData() {
    const data = [];
    let seed = 12345;
    
    shops.forEach((shop, shopIdx) => {
      const { customer, platform, shopName } = shop;
      // 分配运营部门（固定分配）
      const dept = operationDepts[shopIdx % 3];
      
      months.forEach((month, monthIdx) => {
        // 基于店铺和月份生成稳定的基础数据
        seed = shopIdx * 100 + monthIdx;
        
        // 基础GMV（根据客户和平台有不同的基数）
        let baseGmv = 80000 + seededRandom(seed) * 40000;
        
        // 客户差异化
        if (customer === "客户A") baseGmv *= 1.3;
        if (customer === "客户B") baseGmv *= 1.0;
        if (customer === "客户C") baseGmv *= 0.8;
        
        // 平台差异化
        if (platform === "淘宝") baseGmv *= 1.2;
        if (platform === "抖音") baseGmv *= 1.1;
        if (platform === "快手") baseGmv *= 0.9;
        
        // 店铺编号差异（1号店最大）
        const shopNum = parseInt(shopName.match(/(\d)号店/)[1]);
        baseGmv *= (1.2 - shopNum * 0.1);
        
        const gmv = Math.round(baseGmv);
        const cost = Math.round(gmv * (0.6 + seededRandom(seed + 1) * 0.15));
        const profit = gmv - cost;
        const orders = Math.round(gmv / (100 + seededRandom(seed + 2) * 50));
        const visitors = Math.round(orders * (18 + seededRandom(seed + 3) * 12));
        const convRate = ((orders / visitors) * 100).toFixed(2);
        
        data.push({
          customer,
          platform,
          shopName,
          department: dept,
          month,
          gmv,
          cost,
          profit,
          orders,
          visitors,
          conversionRate: parseFloat(convRate),
        });
      });
    });
    return data;
  }

  window.MOCK_DATA = generateShopData();
  console.log("Mock Data Loaded:", window.MOCK_DATA.length, "records (27店铺 x 8月份 = 216条)");

  // ========== 数据权限配置（表级 + 行级 + 列级） ==========
  
  // 数据表定义
  window.DATA_TABLES = [
    { 
      id: 'shop_sales', 
      name: '店铺销售明细', 
      description: '各店铺的销售数据明细（27店铺：客户A/B/C × 淘宝/快手/抖音 × 3店）',
      fields: {
        customer: { label: '客户', type: 'string', sensitive: false },
        platform: { label: '平台', type: 'string', sensitive: false },
        shopName: { label: '店铺', type: 'string', sensitive: false },
        department: { label: '部门', type: 'string', sensitive: false },
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
    { id: 'customer_a', name: '客户A', description: '仅客户A相关数据', filter: { field: 'customer', operator: 'eq', value: '客户A' } },
    { id: 'customer_b', name: '客户B', description: '仅客户B相关数据', filter: { field: 'customer', operator: 'eq', value: '客户B' } },
    { id: 'customer_c', name: '客户C', description: '仅客户C相关数据', filter: { field: 'customer', operator: 'eq', value: '客户C' } },
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
      department: r.department, month: r.month,
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
      month: "月份", gmv: "GMV", cost: "成本", profit: "利润",
      orders: "订单数", visitors: "访客数", conversionRate: "转化率%",
    },
  };


  // 聚合数据 - 用于看板
  function aggregateData(data) {
    const byPlatform = {}, byCustomer = {}, byDepartment = {}, byShop = {}, byMonth = {};
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
      // 按店铺
      if (!byShop[r.shopName]) byShop[r.shopName] = { customer: r.customer, platform: r.platform, gmv: 0, cost: 0, profit: 0, orders: 0, visitors: 0 };
      byShop[r.shopName].gmv += r.gmv;
      byShop[r.shopName].cost += r.cost;
      byShop[r.shopName].profit += r.profit;
      byShop[r.shopName].orders += r.orders;
      byShop[r.shopName].visitors += r.visitors;
      // 按月份
      if (!byMonth[r.month]) byMonth[r.month] = { gmv: 0, cost: 0, profit: 0, orders: 0, visitors: 0 };
      byMonth[r.month].gmv += r.gmv;
      byMonth[r.month].cost += r.cost;
      byMonth[r.month].profit += r.profit;
      byMonth[r.month].orders += r.orders;
      byMonth[r.month].visitors += r.visitors;
    });
    return { byPlatform, byCustomer, byDepartment, byShop, byMonth };
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
    byShop: Object.entries(agg.byShop).map(([k, v]) => ({ name: k, ...v, profitRate: ((v.profit / v.gmv) * 100).toFixed(1) })),
    byMonth: Object.entries(agg.byMonth).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => ({ month: k, ...v })),
  };

  // 店铺排行（按GMV排序）
  window.DASHBOARD_DATA.shopRanking = window.DASHBOARD_DATA.byShop.slice().sort((a, b) => b.gmv - a.gmv);

  console.log("Dashboard Data Ready - 新数据结构: 客户A/B/C × 淘宝/快手/抖音 × 3店铺 = 27店铺");
})();
