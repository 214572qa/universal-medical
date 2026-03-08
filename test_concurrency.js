
/**
 * 模拟并发抢号测试脚本
 * 
 * 运行方式：
 * 1. 确保项目已启动 (npm run dev)
 * 2. 复制本文件所有内容
 * 3. 打开浏览器控制台 (F12 -> Console)
 * 4. 粘贴并回车运行
 * 
 * 原理：
 * 利用 Promise.all 并发发送 10 个预约请求，测试后端的锁机制是否生效。
 */

(async () => {
    // 每次运行建议修改此 ID 以重置库存状态
    // 使用当前时间戳作为 ID，确保每次测试都是全新的
    const scheduleId = Date.now(); 
    const hoscode = '1000';
    const patientId = '10001';
    
    console.log(`🚀 开始高并发抢号测试...`);
    console.log(`🎯 目标排班ID: ${scheduleId} (假设库存仅 1 个)`);
    console.log(`💥 模拟并发人数: 10 人`);
    console.log('-----------------------------------');

    const requests = [];
    const startTime = Date.now();

    for (let i = 0; i < 10; i++) {
        // 构建请求 Promise
        // 注意：Node.js 环境下 fetch 需要完整的 URL（http://localhost:5173），浏览器环境下可以用相对路径
        const baseUrl = 'http://localhost:5173';
        const req = fetch(`${baseUrl}/api/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 使用固定的 Mock Token
                'token': 'mock-token-zhengchao-2024'
            }
        })
        .then(async (res) => {
            const data = await res.json();
            return { 
                user: i + 1, 
                success: data.code === 200, 
                message: data.message 
            };
        })
        .catch(err => ({ 
            user: i + 1, 
            success: false, 
            message: `请求失败: ${err.message}` 
        }));

        requests.push(req);
    }

    // 等待所有请求完成
    const results = await Promise.all(requests);
    const endTime = Date.now();

    // 统计结果
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    // 输出详细日志
    results.forEach(r => {
        const icon = r.success ? '✅' : '❌';
        console.log(`${icon} 用户 ${r.user.toString().padStart(2, '0')}: ${r.message}`);
    });

    console.log('-----------------------------------');
    console.log(`📊 测试报告:`);
    console.log(`⏱️  耗时: ${endTime - startTime}ms`);
    console.log(`🟢 抢号成功: ${successCount} 人`);
    console.log(`🔴 抢号失败: ${failCount} 人`);
    
    if (successCount === 1 && failCount === 9) {
        console.log(`🎉 验证通过！锁机制生效，未发生超卖。`);
    } else {
        console.log(`⚠️ 验证失败！结果不符合预期（预期 1 成功 9 失败）。`);
    }
})();
