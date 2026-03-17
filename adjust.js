/** 每隔50毫秒执行页面的调整操作（不用担心长时间消耗CPU，后续代码会在10秒后停止执行interval） */
let interval = window.setInterval(function () {
  adjustBaofu();                // 调整宝付
}, 250);

/** 10秒以后停止间隔执行 */
setTimeout(() => clearInterval(interval), 10 * 1000)

/** 调整宝付*/
function adjustBaofu() {
  if (isHrefContainAnyStrInArr(["https://bm.baofoo.com/"])) {
    let memberIdEle = document.getElementById("memberId");
    let usernameEle = document.getElementById("username");
    if (memberIdEle && usernameEle) {
      clearInterval(interval);
      let memberId = getParam('memberId');
      let username = getParam('username');
      if (memberId && username) {
        memberIdEle.value = memberId;
        usernameEle.value = username;
      }
    }
  }
}

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

function getParam(name, url = window.location.href) {
  const u = new URL(url);
  return u.searchParams.get(name);
}

/** -------------------------- 公共方法定义 结束 -------------------------- */
