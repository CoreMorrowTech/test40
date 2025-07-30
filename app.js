// 使用config.js中定义的Supabase配置
// 初始化Supabase客户端
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM元素
const numberInput = document.getElementById('numberInput');
const submitButton = document.getElementById('submitButton');
const messageDiv = document.getElementById('message');

// 提交数字到Supabase
async function submitNumber() {
    // 获取输入的数字
    const number = numberInput.value.trim();
    
    // 验证输入
    if (!number) {
        showMessage('请输入一个数字', 'error');
        return;
    }
    
    try {
        // 将数字提交到Supabase表1
        const { data, error } = await supabase
            .from('表1')
            .insert([{ number: parseFloat(number) }]);
        
        if (error) throw error;
        
        // 显示成功消息
        showMessage('数字已成功提交！', 'success');
        
        // 清空输入框
        numberInput.value = '';
    } catch (error) {
        console.error('提交错误:', error);
        showMessage('提交失败，请稍后再试', 'error');
    }
}

// 显示消息
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    
    // 3秒后清除消息
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 3000);
}

// 添加事件监听器
submitButton.addEventListener('click', submitNumber);

// 按回车键提交
numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitNumber();
    }
});