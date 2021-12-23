[**！！！喜欢看视频教程的朋友请点这里！！！**](https://www.bilibili.com/video/BV1oY411p7J5/)

一个给程序员使用的、用于按个人意愿调整网页布局的谷歌开发者插件。 目前（2021.12.23）适配的网站如下：

1. CSDN文章详情页
2. stackoverflow答案详情页
3. 简书文章详情页
4. 知乎。搜索页、问题页、答案页。
3. cnblogs文章详情页面。
3. 酷壳。

使用场景：以CSDN为例。

## 一、原版CSDN文章页面与清爽版对比

### 1.1 原版CSDN文章页面

原版页面分了三次截图还没截全：
![在这里插入图片描述](https://img-blog.csdnimg.cn/652d94443ae341a6a30a9630a4dae424.png)

### 1.2 清爽版CSDN文章页面

![在这里插入图片描述](https://img-blog.csdnimg.cn/1a1893dfadf94992a2ec9df7777e26fb.png)

## 二、忍不住吐槽一下CSDN（可跳过）

1. 这是一个技术网站，我是来学习的，你搞那么多花哨的东西干什么？
2. 我已经大学毕业十几年了，你就不能智能判断一下吗？为什么每次都要弹出“认证学生身份”的窗口？而且我都点了多少次“否”了，你就不能保存到我的用户信息里面吗？非要每次都弹。
3. 我的浏览器处于缩放状态，是我年纪大了特意调的，用得着你天天提醒我年纪大吗？
4. 你为什么要把我文章的目录放到左下角去？
5. 那一堆`rpm`安装包是啥意思？跟我看的文章有关系吗？
6. 为什么文章看到一半就要弹出登录窗口？想不想登录我自己心里没数吗？

## 三、怎么得到清爽的页面

### 3.1 获取插件源码

[github项目地址](https://github.com/Camio1945/adjust_website_chrome_extension)：

```
https://github.com/Camio1945/adjust_website_chrome_extension
```

[gitee项目地址](https://gitee.com/Camio1945/adjust_website_chrome_extension)：

```
https://gitee.com/Camio1945/adjust_website_chrome_extension
```

注：如果你下载的是压缩包，则需要解压缩。

### 3.2 加载插件

1. 打开谷歌浏览器，打开插件中心，URL为[chrome://extensions/](chrome://extensions/)：

```
chrome://extensions/
```

2. 点击`加载已解压的扩展程序`按钮：
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/0c441185e638464689f09320f0401f7e.png)
3. 选择刚刚下载的插件文件夹`adjust_website_chrome_extension`
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/c6ec715f361948f395a5feb821fe0cc5.png)
   如果你不打算定制的话，到这里就结束了。如果打算定制的话，请往下看。

## 四、插件原理与CSDN网站定制

### 4.1 插件入口文件manifest.json

![在这里插入图片描述](https://img-blog.csdnimg.cn/0c7e2c7a40a447079d99805a4513fe89.png)

### 4.2 工具文件jquery-1.11.0.min.js

[jQuery 是一个 JavaScript 库](https://www.w3school.com.cn/jquery/index.asp)，它极大地简化了 JavaScript
编程。本插件只用到了其中非常基础的功能，比如根据ID查找元素、根据class查找元素、删除元素等。

### 4.3 核心功能文件adjust.js

`adjust`是`调整`的意思。

部分代码如下，注释写得比较清楚了，就不费话了：

```js
/** 每隔50毫秒执行页面的调整操作（不用担心长时间消耗CPU，后续代码会在10秒后停止执行interval） */
let interval = window.setInterval(function () {
    adjustCsdnArticle(); // 调整csdn博客的文章页面
  }, 50);

/** 10秒以后停止间隔执行 */
setTimeout(() => clearInterval(interval), 10 * 1000)

/** 调整csdn博客的文章页面 */
function adjustCsdnArticle() {
  // 如果不是CSDN文章页面，则返回，不做处理
  if (isHrefNotContainAnyStrInArr(["blog.csdn.net", "article/details"])) {
    return;
  }
  removeElementsByIdArrOfCsdnArticle();    // 根据ID数组，移除CSDN文章页面的元素
  removeElementsByClassArrOfCsdnArticle(); // 根据class数组，移除CSDN文章页面的元素
  adjustWidthAndMenuOfCsdnArticle();       // 调整CSDN文章页面的宽度和目录
}

/** 根据ID数组，移除CSDN文章页面的元素 */
function removeElementsByIdArrOfCsdnArticle() {
  removeElementsByIdArr([
    "csdn-toolbar",       // 顶部 - 工具条
    "asideProfile",       // 左侧 - 作者信息
    "asideSearchArticle", // 左侧 - 搜索博主文章
    "asideHotArticle",    // 左侧 - 热门文章
    "asideCategory",      // 左侧 - 分类专栏
    "asideNewComments",   // 左侧 - 最新评论
    "asideNewNps",        // 左侧 - 您愿意向朋友推荐“博客详情页”吗
    "asideArchive",       // 左侧 - 最新文章
    "footerRightAds",     // 广告
    "toolBarBox",         // 文章后面 - 工具栏（赞、踩、分享等）
  ]);
}

/** 注：以下省略了后续的代码 */
```

### 4.4 仅对CSDN做定制

你需要修改`adjustCsdnArticle`方法里面的内容。 比如如果你想搜索博主文章，只需要找到关键字`asideSearchArticle`（上面的`adjust.js`代码中的第25行），把这一行删除就可以了。

## 五、对其他网站做定制

以`stackoverflow`网站为例。

### 5.1 修改manifest.json文件

在`matches`节点下增加`https://stackoverflow.com/*`网站：

![在这里插入图片描述](https://img-blog.csdnimg.cn/6e7046dbcbf3448fa9f7dde6cb2ddac0.png)

### 5.2 修改adjust.js文件

增加对新网站的相关代码。
![在这里插入图片描述](https://img-blog.csdnimg.cn/cd0424de66dd45feae2067a187e6fff3.png)
注：你需要有一定的前端基础，至少要知道`html`是什么，`id`是什么，`class`是什么，这些都比较简单。不懂的话，视频里面稍带有讲解，可以看看。

### 5.3 刷新插件

去浏览器扩展程序里刷新插件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/5e4998580bdd43868910f8c82b9b0e24.png)

## 六、弹窗“关闭开发人员模式下的扩展”

打开谷歌浏览器时可能弹出以下提醒：
![在这里插入图片描述](https://img-blog.csdnimg.cn/69223d9d53af42e5b9b6b8da87481120.png)
这个提醒没有办法通过浏览器自身的设置来关闭的，我目前的做法是安装了[火绒安全软件](https://www.huorong.cn/)里的`安全工具`里的`弹窗拦截`功能里的`截图拦截`功能来实现的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/740c7bd04a4a4b3d84fcf66b65ad8bc5.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c0317c88f7274848b6dc1f04b9912e11.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/86549010052c428eb92650cceb3b2f04.png)
