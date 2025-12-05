/**
 * 策略中台 - 自助报表模拟数据源
 * 包含：3个客户(橘子/苹果/香蕉) * 3个平台(淘宝/快手/抖音) * 2个店铺 = 18个店铺
 * 时间跨度：2025-07 ~ 2025-08
 */

(function() {
    function generateData() {
        const customers = ['橘子', '苹果', '香蕉'];
        const platforms = ['淘宝', '快手', '抖音'];
        const months = ['2025-07', '2025-08'];
        const data = [];

        customers.forEach(cust => {
            platforms.forEach(plat => {
                // 每个平台两个店
                ['A店', 'B店'].forEach(suffix => {
                    const shopName = `${plat}${cust}${suffix}`;
                    
                    months.forEach(month => {
                        // 随机生成财务数据
                        // 基础利润 1w - 6w
                        const baseProfit = Math.floor(Math.random() * 50000) + 10000;
                        
                        // 差异化数据逻辑：
                        // 香蕉客户经营不善，设定为亏损 (负利润)
                        // 苹果客户利润高
                        let profit = baseProfit;
                        if (cust === '香蕉') profit = baseProfit * -0.3; 
                        if (cust === '苹果') profit = baseProfit * 1.5;

                        const cost = Math.floor(Math.random() * 30000) + 20000;
                        // GMV = 利润 + 成本 + 随机波动
                        const gmv = Math.abs(profit) + cost + Math.floor(Math.random() * 10000);

                        // 模拟两条记录：一条主营收入，一条营销费用(为了丰富科目维度)
                        
                        // 记录1: 主营业务
                        data.push({
                            customer: cust,
                            platform: plat,
                            shopName: shopName,
                            month: month,
                            subject: '主营业务收入',
                            profit: parseFloat(profit.toFixed(2)),
                            gmv: parseFloat(gmv.toFixed(2)),
                            cost: parseFloat(cost.toFixed(2))
                        });

                        // 记录2: 营销推广 (偶尔发生)
                        if (Math.random() > 0.5) {
                            const marketingCost = Math.floor(Math.random() * 5000) + 1000;
                            data.push({
                                customer: cust,
                                platform: plat,
                                shopName: shopName,
                                month: month,
                                subject: '营销推广费',
                                profit: -marketingCost, // 费用导致利润减少
                                gmv: 0,
                                cost: marketingCost
                            });
                        }
                    });
                });
            });
        });
        return data;
    }

    // 将数据挂载到全局 window 对象上，供 HTML 调用
    window.MOCK_DATA = generateData();
    console.log("Mock Data Loaded:", window.MOCK_DATA.length, "records");
})();