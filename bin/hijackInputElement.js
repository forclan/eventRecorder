function hijack(event) {

  const target = event.target || null;
  // 只对input进行处理
  const tagName = target && target.tagName;
  if (tagName !== 'INPUT') {
    return;
  }

  // 获取query
  const targetSelector = cssPath(target);

  const value = window.prompt('请再次输入想要输入的值');


  if (value) {
    target.value = value;
    const action = genSendStringEvent(value, targetSelector);
    window.onCustomEvent(action);
  }
}

function genSendStringEvent(value, target) {
  return {
    type: 'sendString',
    target,
    value,
  }
}

window.addEventListener('click', hijack, true);