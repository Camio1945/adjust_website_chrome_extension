/** 每隔50毫秒执行页面的调整操作（不用担心长时间消耗CPU，后续代码会在10秒后停止执行interval） */
let interval = window.setInterval(function () {
  adjustProcesson();             // 调整processon（流程图网站）
  adjustCoolshell();             // 调整酷壳（技术博客）
  adjustCnblogsArticle();        // 调整cnblogs文章详情页面
  adjustZhiHu();                 // 调整知乎
  adjustJianShuArticle();        // 调整简书文章详情页面
  adjustStackoverflowQuestion(); // 调整stackoverflow问题页面
  adjustCsdnArticle();           // 调整csdn博客的文章页面
  useMicrosoftYaHeiFont();       // 使用微软雅黑字体
}, 50);

/** 10秒以后停止间隔执行 */
setTimeout(() => clearInterval(interval), 10 * 1000)

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
    $("a[href='https://coolshell.cn/404/']").parent().parent().remove(); // 删除404链接
    // 文章中的微信公众号图片
    let weixin = $("img[src='https://coolshell.cn/wp-content/uploads/2020/03/coolshell.weixin.jpg']");
    if (weixin.length) {
      // 如果微信公众号图片后面紧跟着的是小程序的图片，则认为是我们要删除的元素
      if (weixin.next().is("img")) {
        weixin.parent().remove()
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
    if ($("button[aria-label=关闭]")) {
      $("button[aria-label=关闭]").click();
    }
    removeElementsBySelectorArr([
      ".SearchSideBar",                 // 搜索页 - 右边栏
      ".Question-sideColumn",           // 问题页 - 右边栏
      ".ContentLayout-sideColumn",      // 答案页 - 右边栏
    ])
    $(".SearchMain").css("width", "1000px");               // 搜索页，内容宽度改为1000
    $(".ContentLayout-mainColumn").css("width", "1000px"); // 问题页，内容宽度改为1000
    $(".Question-mainColumn").css("width", "1000px");      // 答案页，内容宽度改为1000
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
    $(".KfeCollection-OrdinaryLabel-content").closest("div[class='Card AnswerCard']").remove();
    $(".KfeCollection-OrdinaryLabel-content").closest("div[class=List-item]").remove();
    $(".KfeCollection-IntroCard-newStyle-pc").closest("div[class=List-item]").remove();
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
  if ($("#__next").length) {
    $("header").remove();                                        // 顶部栏
    $("aside").remove();                                         // 右边栏
    $("footer").remove();                                        // 底部栏
    $("#__next").children().eq(1).remove();                      // 左侧：N赞、赞赏、更多好文
    if (!$("article").prev().is("h1")) {
      $("article").prev().remove();                              // 正文前面的作者信息
    }
    $("article").next().remove();                                // 正文后的几个元素都不需要
    $("article").next().remove();                                // 正文后的几个元素都不需要
    $("article").next().remove();                                // 正文后的几个元素都不需要
    $("article").next().remove();                                // 正文后的几个元素都不需要
    $("article").next().remove();                                // 正文后的几个元素都不需要
    $("#note-page-comment").next().remove();                     // 推荐阅读
    $("#note-page-comment").remove();                            // 评论区
    $("section[aria-label=baidu-ad]").remove();                  // 百度广告
    $("img[alt=reward]").parent().parent().remove();             // 抽奖
    $("div[role=main]").children().eq(0).css("width", "800px");  // 调整内容区域的宽度
    $("h1").css("margin-top", "0px");                            // 调整标题距离顶部的高度
  } else {
    if ($("canvas").next().is("img")) {                          // APP广告和赞赏支持
      $("canvas").parent().parent().remove();
    }
    $(".post").css("width", "800px");                            // 调整内容区的宽度
    $("body").css("margin-top", "-90px");                        // 调整文章距离顶部的高度
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
  // $(".container").css("margin-top", "-50px"); // 由于去掉了顶部栏，因此内容区要往上提
  $("#content").css("width", $("#content").css("max-width")); // 调整宽度为最大宽度
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
  let asideDirectory = $("#asidedirectory"); // 文章目录
  // 如果左侧有目录，则把main内容区域的宽度设置为80%；如果左侧没有目录，则把内容区的宽度设置为100%
  if (asideDirectory && asideDirectory.length) {
    if (!asideDirectory.attr("adjusted")) { // 通过"adjusted"属性来防止重复处理
      asideDirectory.attr("adjusted", 1);   // 通过"adjusted"属性来防止重复处理
      $("main").css("width", "80%");        // 由于有目录，所以把内容区域的宽度设置为80%，左侧的20%用于显示目录
      // 通过修改样式来固定目录位置在左上角
      $(".blog_container_aside").attr("style",
        "position: fixed; top: 8px; z-index: 99; left: 5px; width: 300px; bottom: auto;");
      // 以下代码是防止CSDN自己的一些额外处理（有时候会导致目录不显示）
      let blogContainerAsideCopyOuterHtml = $(".blog_container_aside")
        .prop("outerHTML").replace("blog_container_aside", "blog_container_aside_copy");
      $(".blog_container_aside").replaceWith(blogContainerAsideCopyOuterHtml);
    }
  } else { // 如果目录不存在，则内容区域的宽度设置为100%
    $("main").css("width", "100%");
  }
  asideDirectory.show(); // 如果有目录就显示目录
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
    $("." + arr[i]).remove();
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
    $(arr[i]).remove();
  }
}

/** 使用微软雅黑字体 */
function useMicrosoftYaHeiFont() {
  let elementArr = ["p", "h1", "h2", "h4", "h4", "h5", "h6"];
  for (let element of elementArr) {
    $(element).css("font-family", 'Microsoft YaHei');
  }
}

/** -------------------------- 公共方法定义 结束 -------------------------- */
