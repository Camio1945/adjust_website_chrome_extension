/** 每隔50毫秒执行页面的调整操作（不用担心长时间消耗CPU，后续代码会在10秒后停止执行interval） */
let interval = window.setInterval(function () {
  adjustStackoverflowQuestion(); // 调整stackoverflow问题页面
  adjustCsdnArticle(); // 调整csdn博客的文章页面
}, 50);

/** 10秒以后停止间隔执行 */
setTimeout(() => clearInterval(interval), 10 * 1000)

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
  $(".container").css("margin-top", "-50px"); // 由于去掉了顶部栏，因此内容区要往上提
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
    "treeSkill",          // 文章后面 - 进一步学习相关知识
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
    "adblock",                  // 对于adblock等谷歌插件的提醒
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
        "position: fixed; top: 8px; z-index: 99; left: 50px; width: 300px; bottom: auto;");
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

/** -------------------------- 公共方法定义 结束 -------------------------- */
