# A 调整网站 - Chrome 扩展项目

## 项目概述

这是一个**Chrome 浏览器扩展**，用于按用户意愿调整网页布局，主要面向程序员群体。通过移除网页中的冗余元素（如广告、侧边栏、弹窗等），提供清爽的浏览体验。

### 支持的平台

根据 README，目前适配的网站包括：
- CSDN 文章详情页
- StackOverflow 答案详情页
- 简书文章详情页
- 知乎（搜索页、问题页、答案页）
- cnblogs 文章详情页
- 酷壳
- ProcessOn

### 当前开发状态

当前 `manifest.json` 中仅配置了 `https://bm.baofoo.com/*` 网站，主要功能是在 URL 参数中提取 `memberId` 和 `username` 并自动填充到表单字段中。

## 项目结构

```
adjust_website_chrome_extension/
├── manifest.json          # 扩展配置文件（入口）
├── adjust.js              # 核心功能脚本（页面调整逻辑）
├── background.js          # 后台脚本
├── jquery-1.11.0.min.js   # jQuery 库（简化 DOM 操作）
├── README.md              # 项目说明文档
├── LICENSE                # 许可证
├── docs/                  # 文档目录
│   ├── ai_task/          # AI 任务相关文档
│   └── git_ignores/      # Git 忽略配置
└── node_modules/          # Node.js 依赖（如有）
```

## 构建与运行

### 安装扩展

1. 打开 Chrome 浏览器，访问扩展管理页面：
   ```
   chrome://extensions/
   ```

2. 开启右上角的 **"开发者模式"** 开关

3. 点击 **"加载已解压的扩展程序"** 按钮

4. 选择本项目的根目录 `adjust_website_chrome_extension`

### 修改配置

如需适配新网站，需要修改两个文件：

1. **manifest.json** - 在 `matches` 节点添加目标网站：
   ```json
   "content_scripts": [
     {
       "matches": [
         "https://bm.baofoo.com/*",
         "https://your-new-site.com/*"  // 添加新网站
       ],
       "js": ["jquery-1.11.0.min.js", "adjust.js"]
     }
   ]
   ```

2. **adjust.js** - 添加对应的调整函数

### 刷新扩展

修改代码后，在 `chrome://extensions/` 页面点击扩展卡片上的 **刷新** 按钮。

## 开发指南

### adjust.js 核心结构

```javascript
// 1. 定义定时执行的任务
let interval = window.setInterval(function () {
  adjustYourSite();  // 你的调整函数
}, 250);

// 2. 10 秒后停止执行
setTimeout(() => clearInterval(interval), 10 * 1000)

// 3. 实现调整函数
function adjustYourSite() {
  if (isHrefContainAnyStrInArr(["your-site.com"])) {
    // 移除元素、调整布局等
  }
}
```

### 常用工具函数

| 函数名 | 用途 |
|--------|------|
| `isHrefContainAnyStrInArr(arr)` | 判断当前 URL 是否包含数组中的任意字符串 |
| `isHrefNotContainAnyStrInArr(arr)` | 判断当前 URL 是否不包含数组中的任意字符串 |
| `removeElementsBySelectorArr(arr)` | 根据 CSS 选择器数组移除 DOM 元素 |
| `simulateTyping(input, text, options)` | 模拟人类打字输入 |

### 开发约定

- **代码风格**: 使用 JavaScript 原生语法。
- **注释**: 函数和关键逻辑需添加中文注释
- **定时任务**: 使用 `setInterval` 定时执行，并通过 `setTimeout` 在 10 秒后停止，避免长时间占用资源
- **元素移除**: 优先使用选择器移除。

## 技术栈

- **Manifest Version**: 3
- **核心库**: 原生 JavaScript
- **语言**: JavaScript (ES5/ES6)
- **权限**: `activeTab`

## 注意事项

1. **开发者模式弹窗**: 加载未打包的扩展时，Chrome 会提示"关闭开发人员模式下的扩展"，这是正常行为
2. **URL 匹配**: `manifest.json` 中的 `matches` 字段必须正确配置，扩展才能在目标网站上运行
3. **元素选择**: 建议使用浏览器开发者工具（F12）查看目标元素的 ID、class 或结构

## 相关资源

- [GitHub 仓库](https://github.com/Camio1945/adjust_website_chrome_extension)
- [Gitee 镜像](https://gitee.com/Camio1945/adjust_website_chrome_extension)
- [jQuery 文档](https://www.w3school.com.cn/jquery/index.asp)
