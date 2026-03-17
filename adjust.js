/** 每隔50毫秒执行页面的调整操作（不用担心长时间消耗CPU，后续代码会在10秒后停止执行interval） */
let interval = window.setInterval(function () {
  adjustHutool();                // 调整hutool
  adjustLanguageReactor();       // 调整语言学习网站
  adjustProcesson();             // 调整processon（流程图网站）
  adjustCoolshell();             // 调整酷壳（技术博客）
  adjustCnblogsArticle();        // 调整cnblogs文章详情页面
  adjustZhiHu();                 // 调整知乎
  adjustJianShuArticle();        // 调整简书文章详情页面
  adjustStackoverflowQuestion(); // 调整stackoverflow问题页面
  adjustCsdnArticle();           // 调整csdn博客的文章页面
  // adjustTsccMeituan();           // 美团闪购
  adjustYouTube();               // 调整 YouTube
}, 250);

/** 10秒以后停止间隔执行 */
setTimeout(() => clearInterval(interval), 10 * 1000)

/** 调整Hutool */
function adjustHutool() {
  if (isHrefContainAnyStrInArr(["https://doc.hutool.cn"])) {
    let element = document.querySelector(".page-slot-top");
    if (element) {
      clearInterval(interval)
      removeElementsByClassArr(["page-slot-top", "custom-html-window-lb", "sidebar-slot-top"])
      document.querySelector(".sidebar-links")
        .style.setProperty("margin-top", "-10px", "important");
      setInterval(() => {
        const links = document.querySelectorAll('a[href="https://ai.hutool.cn?from=hutool"]');
        for (let link of links) {
          if (link.parentNode.className === "nav-item") {
            link.parentNode.style.display = "none";
          } else {
            link.style.display = "none";
          }
        }
      }, 500)
    }
  }
}

/** 调整语言学习网站 */
function adjustLanguageReactor() {
  // 如果是翱象主档商品管理页面，才处理
  if (isHrefContainAnyStrInArr(["https://www.languagereactor.com/video-file"])) {
    clearInterval(interval)
    // 1. Create the button
    const btn = document.createElement('button');
    btn.textContent = 'Adjust';

    // 2a. Inline styling approach
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '10px',
      left: '100px',
      zIndex: '1000',
      padding: '8px 12px',
      background: '#141618',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    });

    // 3. Append to the page
    document.body.appendChild(btn);

    // 4. (Optional) Add an event handler
    btn.addEventListener('click', () => {
      let element = document.querySelector(".video-subs-wrap-fullscreen");
      if (!element) {
        btn.textContent = 'Adjust (Element Not Exists)';
      } else {
        btn.textContent = 'Adjust (Element Exists)';
        element.style.bottom = "-180px";
        element.style.width = "100%";
        element.style.maxWidth = "1111px";
      }
    });
  }
}

/** 调整 YouTube */
function adjustYouTube() {
  if (isHrefContainAnyStrInArr(["https://www.youtube.com/"])) {
    removeElementsByIdArr(["secondary"])
    removeElementsByClassArr(["html5-endscreen"])
  }
}


/** 调整美团闪购 */
function adjustTsccMeituan() {
  // 如果是美团闪购页面，才处理
  if (isHrefContainAnyStrInArr(["https://tscc.meituan.com/"])) {
    // 1. Create the button
    const btn = document.createElement('button');
    btn.textContent = '空框赋值';

    // 2a. Inline styling approach
    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '73px',
      right: '200px',
      zIndex: '1000',
      padding: '8px 12px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    });

    // 3. Append to the page
    document.body.appendChild(btn);

    // 4. (Optional) Add an event handler
    btn.addEventListener('click', () => {
      const inputs = document.querySelectorAll(".roo-table .roo-input");
      for (const input of inputs) {
        if (!input.value) {
          let id = Math.random().toString(36).slice(2, 10);
          simulateTyping(input, id, {delay: 20})
        }
      }
    });
    clearInterval(interval)
  }
}

/** -------------------------- 调整processon 开始 -------------------------- */
function adjustProcesson() {
  // 如果是processon页面，才处理
  if (isHrefContainAnyStrInArr(["https://www.processon.com/"])) {
    removeElementsByIdArr([
      "banner_2",  // 首页 - 顶部 - 达人招募计划
    ])
    removeElementsByClassArr([
      "app-down",  // 首页 - 右下角 - 下载移动版
      "activity-con", // 文件列表页 -右上角 - 活动信息
    ])
  }
}

/** -------------------------- 调整processon 结束 -------------------------- */

/** -------------------------- 调整酷壳 开始 -------------------------- */
function adjustCoolshell() {
  // 如果是酷壳页面，才处理
  if (isHrefContainAnyStrInArr(["https://coolshell.cn/"])) {
    removeElementsByIdArr([
      "masthead",                  // 头部
      "colophon",                  // 尾部
      "custom_html-3",             // 本站公告
      "custom_html-8",             // 友情链接
      "meta-5",                    // 功能
      "custom_html-6",             // CNZZ
    ])
    removeElementsByClassArr([
      "avatar"                     // 头像（一般都加载不出来）
    ])
    // 删除404链接
    document.querySelectorAll("a[href='https://coolshell.cn/404/']").forEach(el => {
      if (el.parentNode && el.parentNode.parentNode) {
        el.parentNode.parentNode.remove();
      }
    });
    // 文章中的微信公众号图片
    let weixin = document.querySelector("img[src='https://coolshell.cn/wp-content/uploads/2020/03/coolshell.weixin.jpg']");
    if (weixin) {
      // 如果微信公众号图片后面紧跟着的是小程序的图片，则认为是我们要删除的元素
      let nextEle = weixin.nextElementSibling;
      if (nextEle && nextEle.tagName === "IMG") {
        if (weixin.parentNode) {
          weixin.parentNode.remove();
        }
      }
    }
  }
}

/** -------------------------- 调整酷壳 结束 -------------------------- */

/** -------------------------- 调整cnblogs文章详情页面 开始 -------------------------- */
function adjustCnblogsArticle() {
  // 如果是cnblogs文章详情页面，才处理
  if (isHrefContainAnyStrInArr(["https://www.cnblogs.com/"]) && isHrefContainAnyStrInArr(["/p/"])) {
    removeElementsByIdArr([
      "top_nav",                   // 头部
      "header",                    // 头部
      "githubRibbon",              // Fork on GitHub
      "sideBar",                   // 右边栏
      "navigator",                 // 导航
      "MySignature",               // 作者签名
      "blog_post_info_block",      // 文章信息
      "comment_form",              // 评论
      "blog-comments-placeholder", // 评论
      "footer",                    // 底部
    ])
    removeElementsByClassArr(["charm-bar-wrapper"]) // 会员力量
  }
}

/** -------------------------- 调整cnblogs文章详情页面 结束 -------------------------- */

/** -------------------------- 调整知乎 开始 -------------------------- */
function adjustZhiHu() {
  // 知乎通用页面处理
  if (isHrefContainAnyStrInArr(["https://www.zhihu.com"])) {
    // 自动关闭登录框
    let closeBtn = document.querySelector("button[aria-label=关闭]");
    if (closeBtn) {
      closeBtn.click();
    }
    removeElementsBySelectorArr([
      ".SearchSideBar",                 // 搜索页 - 右边栏
      ".Question-sideColumn",           // 问题页 - 右边栏
      ".ContentLayout-sideColumn",      // 答案页 - 右边栏
    ])
    document.querySelectorAll(".SearchMain").forEach(el => el.style.width = "1000px");               // 搜索页，内容宽度改为1000
    document.querySelectorAll(".ContentLayout-mainColumn").forEach(el => el.style.width = "1000px"); // 问题页，内容宽度改为1000
    document.querySelectorAll(".Question-mainColumn").forEach(el => el.style.width = "1000px");      // 答案页，内容宽度改为1000
  }
  // 调整知乎答案页面
  adjustZhiHuAnswer();
}

/** 调整知乎答案页面 */
function adjustZhiHuAnswer() {
  // 如果是知乎答案页面，才处理
  if (isHrefContainAnyStrInArr(["https://www.zhihu.com/question"])) {
    removeElementsBySelectorArr([
      "header",                    // 顶部条
      ".Question-mainColumnLogin", // 登录横条
    ])
    // 以下几行用于删除盐选答案
    document.querySelectorAll(".KfeCollection-OrdinaryLabel-content").forEach(el => {
      let card = el.closest("div[class='Card AnswerCard']");
      if (card) card.remove();
      let listItem = el.closest("div[class=List-item]");
      if (listItem) listItem.remove();
    });
    document.querySelectorAll(".KfeCollection-IntroCard-newStyle-pc").forEach(el => {
      let listItem = el.closest("div[class=List-item]");
      if (listItem) listItem.remove();
    });
  }
}

/** -------------------------- 调整知乎 结束 -------------------------- */

/** -------------------------- 调整简书文章详情页面 开始 -------------------------- */
function adjustJianShuArticle() {
  // 如果是简书文章详情页面，才处理
  if (isHrefContainAnyStrInArr(["https://www.jianshu.com/p/"])) {
    removeElementsByIdArr([
      "note-fixed-ad-container", // 广告：你也可以写文赚赞赏
      "free-reward-panel",       // 赞赏
      "note-ad",                 // APP广告
      "comment-list",            // 评论区
    ])
    removeElementsByClassArr([
      "navbar-fixed-top",        // 顶部栏
      "author",                  // 作者信息
      "follow-detail",           // 作者信息
      "show-foot",               // 版权
      "meta-bottom",             // 分享区域
      "note-bottom",             // 推荐阅读
      "side-tool",               // 右侧工具
    ])
    specialHandleOfJianShuArticle();
  }
}

/** 简书页面的特殊处理（简书有两种页面，一种是使用规范的id和class名称的（如：author），另一种的id和class是随机的，如：_6S_NkV） */
function specialHandleOfJianShuArticle() {
  // id为__next的元素存在时，表示页面的class是不规范的，需要特殊处理
  let next = document.getElementById("__next");
  if (next) {
    document.querySelectorAll("header").forEach(el => el.remove());                                        // 顶部栏
    document.querySelectorAll("aside").forEach(el => el.remove());                                         // 右边栏
    document.querySelectorAll("footer").forEach(el => el.remove());                                        // 底部栏
    if (next.children.length > 1) {
      next.children[1].remove();                      // 左侧：N赞、赞赏、更多好文
    }
    let article = document.querySelector("article");
    if (article) {
      let prev = article.previousElementSibling;
      if (prev && prev.tagName !== "H1") {
        prev.remove();                              // 正文前面的作者信息
      }
      // 正文后的几个元素都不需要
      for (let i = 0; i < 5; i++) {
        if (article.nextElementSibling) {
          article.nextElementSibling.remove();
        }
      }
    }
    let noteComment = document.getElementById("note-page-comment");
    if (noteComment) {
      if (noteComment.nextElementSibling) {
        noteComment.nextElementSibling.remove();                     // 推荐阅读
      }
      noteComment.remove();                            // 评论区
    }
    document.querySelectorAll("section[aria-label=baidu-ad]").forEach(el => el.remove());                  // 百度广告
    document.querySelectorAll("img[alt=reward]").forEach(el => {
      if (el.parentNode && el.parentNode.parentNode) {
        el.parentNode.parentNode.remove();             // 抽奖
      }
    });
    let mainDiv = document.querySelector("div[role=main]");
    if (mainDiv && mainDiv.children.length > 0) {
      mainDiv.children[0].style.width = "800px";  // 调整内容区域的宽度
    }
    document.querySelectorAll("h1").forEach(el => el.style.marginTop = "0px");                            // 调整标题距离顶部的高度
  } else {
    let canvas = document.querySelector("canvas");
    if (canvas && canvas.nextElementSibling && canvas.nextElementSibling.tagName === "IMG") {                          // APP广告和赞赏支持
      if (canvas.parentNode && canvas.parentNode.parentNode) {
        canvas.parentNode.parentNode.remove();
      }
    }
    document.querySelectorAll(".post").forEach(el => el.style.width = "800px");                            // 调整内容区的宽度
    document.body.style.marginTop = "-90px";                        // 调整文章距离顶部的高度
  }
}

/** -------------------------- 调整简书文章详情页面 结束 -------------------------- */

/** -------------------------- 调整stackoverflow问题页面 开始 -------------------------- */
function adjustStackoverflowQuestion() {
  // 如果不是stackoverflow问题页面页面，则返回，不做处理
  if (isHrefNotContainAnyStrInArr(["stackoverflow.com/questions"])) {
    return;
  }
  removeElementsByIdArr([
    "left-sidebar", // 左侧栏
    "footer",       // 底部区
  ])
  removeElementsByClassArr([
    "top-bar",         // 顶部栏
    "s-sidebarwidget", // 博客（The Overflow Blog）
  ])
  let content = document.getElementById("content");
  if (content) {
    content.style.width = getComputedStyle(content).maxWidth; // 调整宽度为最大宽度
  }
}

/** -------------------------- 调整stackoverflow问题页面 结束 -------------------------- */

/** -------------------------- 调整csdn博客的文章页面 开始 -------------------------- */
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
    "csdn-toolbar",        // 顶部 - 工具条
    "asideCustom",         // 左侧 - 定制边栏信息
    "asideProfile",        // 左侧 - 作者信息
    "asideSearchArticle",  // 左侧 - 搜索博主文章
    "asideHotArticle",     // 左侧 - 热门文章
    "asideCategory",       // 左侧 - 分类专栏
    "asideNewComments",    // 左侧 - 最新评论
    "asideNewNps",         // 左侧 - 您愿意向朋友推荐“博客详情页”吗
    "asideArchive",        // 左侧 - 最新文章
    "asideTopicStar",      // 左侧 - 博客之星
    "footerRightAds",      // 广告
    "blogColumnPayAdvert", // 标题下面 - 广告（如：C语言练习题资源合集：海量资源免费下载）
    "toolBarBox",          // 文章后面 - 工具栏（赞、踩、分享等）
    "treeSkill",           // 文章后面 - 进一步学习相关知识
    "recommendNps",        // 文章后面 - “相关推荐”对你有帮助么？
    "blogExtensionBox",    // 文章后面 - 自定义的广告
  ]);
}

/** 根据class数组，移除CSDN文章页面的元素 */
function removeElementsByClassArrOfCsdnArticle() {
  removeElementsByClassArr([
    "article-info-box",         // 文章标题与正文中间的作者、时间等信息
    "column-group",             // 文章标题与正文中间的专栏信息
    "comment-box",              // 文章后面 - 评论
    "recommend-box",            // 文章后面 - 相关推荐信息
    "template-box",             // 文章后面 - 年份、皮肤主题、返回首页
    "blog-footer-bottom",       // 文章后面 - 备案信息、关于我们等底部信息
    "csdn-side-toolbar",        // 右侧 - 工具栏，抽奖、新手引导、客服、举报等
    "leftPop",                  // 浏览器缩放的提醒
    "passport-login-container", // 登录弹窗（注：可能无效，因为本插件只会在前10秒进行处理，此时可能没有登录弹窗）
    "csdn-highschool-select",   // 学生认证弹窗
    "csdn-highschool-window",   // 学生认证弹窗
    "adblock",                  // 对于adblock等谷歌插件的提醒
    "blog_container_aside",     // 博客之星

  ]);
}

/** 调整CSDN文章页面的宽度和目录 */
function adjustWidthAndMenuOfCsdnArticle() {
  let asideDirectory = document.getElementById("asidedirectory"); // 文章目录
  // 如果左侧有目录，则把main内容区域的宽度设置为80%；如果左侧没有目录，则把内容区的宽度设置为100%
  if (asideDirectory) {
    if (!asideDirectory.getAttribute("adjusted")) { // 通过"adjusted"属性来防止重复处理
      asideDirectory.setAttribute("adjusted", "1");   // 通过"adjusted"属性来防止重复处理
      document.querySelectorAll("main").forEach(el => el.style.width = "80%");        // 由于有目录，所以把内容区域的宽度设置为80%，左侧的20%用于显示目录
      // 通过修改样式来固定目录位置在左上角
      document.querySelectorAll(".blog_container_aside").forEach(el => {
        el.style.position = "fixed";
        el.style.top = "8px";
        el.style.zIndex = "99";
        el.style.left = "5px";
        el.style.width = "300px";
        el.style.bottom = "auto";

        // 防止CSDN自己的一些额外处理（有时候会导致目录不显示）
        let outerHTML = el.outerHTML.replace("blog_container_aside", "blog_container_aside_copy");
        el.outerHTML = outerHTML;
      });
    }
  } else { // 如果目录不存在，则内容区域的宽度设置为100%
    document.querySelectorAll("main").forEach(el => el.style.width = "100%");
  }
  if (asideDirectory) asideDirectory.style.display = "block"; // 如果有目录就显示目录
}

/** -------------------------- 调整csdn博客的文章页面 结束 -------------------------- */

/** -------------------------- 公共方法定义 开始 -------------------------- */

/** 浏览器的href是否包含数组 arr 中的任意一个字符串 */
function isHrefContainAnyStrInArr(arr) {
  let href = window.location.href;
  let flag = false;
  for (let i = 0; i < arr.length; i++) {
    if (href.indexOf(arr[i]) > -1) {
      flag = true;
      break;
    }
  }
  return flag;
}

/** 浏览器的href是否不包含数组 arr 中的任意一个字符串 */
function isHrefNotContainAnyStrInArr(arr) {
  return !isHrefContainAnyStrInArr(arr);
}

/** 根据id删除元素 */
function removeElementsByIdArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let element = document.getElementById(arr[i]);
    if (element != null) {
      element.remove();
    }
  }
}

/** 根据class删除元素 */
function removeElementsByClassArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    document.querySelectorAll("." + arr[i]).forEach(el => el.remove());
  }
}

/**
 * 根据选择器来移除元素
 * 示例：
 * removeElementsBySelectorArr(
 *   "#asideNewNps",  // 根据id=asideNewNps来删除元素
 *   ".author",       // 根据class=author来删除元素
 *   "header",        // 根据标签header来删除元素
 * )
 *  */
function removeElementsBySelectorArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    document.querySelectorAll(arr[i]).forEach(el => el.remove());
  }
}

/**
 * Simulate human‐like typing into an input or textarea.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} input
 * @param {string} text
 * @param {object} options
 * @param {number} options.delay   Base delay between keystrokes in ms (default: 100)
 * @param {number} options.variance  Random jitter in ms to vary typing speed (default: 50)
 * @returns {Promise<void>}
 */
async function simulateTyping(input, text, options = {}) {
  const {delay = 100, variance = 50} = options;

  // Bring focus into the field
  input.focus();

  for (const char of text) {
    const keyCode = char.charCodeAt(0);
    const eventInit = {
      key: char,
      code: `Key${char.toUpperCase()}`,
      charCode: keyCode,
      keyCode: keyCode,
      bubbles: true,
    };

    // Key down
    input.dispatchEvent(new KeyboardEvent('keydown', eventInit));

    // Update the value and fire input event
    input.value += char;
    input.dispatchEvent(new Event('input', {bubbles: true}));

    // Key up
    input.dispatchEvent(new KeyboardEvent('keyup', eventInit));

    // Wait before typing next character (with a bit of randomness)
    const jitter = (Math.random() - 0.5) * variance * 2;
    await new Promise(resolve => setTimeout(resolve, delay + jitter));
  }

  // Final change event in case some listeners watch for `change`
  input.dispatchEvent(new Event('change', {bubbles: true}));
}

/** -------------------------- 公共方法定义 结束 -------------------------- */
