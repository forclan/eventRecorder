function eventListener(e) {
  const type = e.type;
  let value, target;
  if (type === 'click') {
    target = cssPath(e.target);
  } else if (type === 'keydown') {
    value = e.key;
  } else if (type === 'keyup') {
    value = e.key;
  }
  return {
    type,
    target,
    value,
    time: Date.now()
  };
}

window.addEventListener('click', e => {
  const action = eventListener(e);
  window.onCustomEvent(action);
});
window.addEventListener('keydown', e => {

  const action = eventListener(e);
  window.onCustomEvent(action);
})
window.addEventListener('keyup', e => {

  const action = eventListener(e);
  window.onCustomEvent(action);
})