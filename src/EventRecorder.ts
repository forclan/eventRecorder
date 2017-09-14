class EventRecorder {
  _container: Array<UserAction>;
  _handler: Function;
  constructor() {
    this._container = [];

    this.init();
  }

  addAction(e) {
    const userAction: UserAction = eventListener(e);
    this._container.push(userAction);
  }

  init() {
    window.addEventListener('click', e => this.addAction(e));
    window.addEventListener('keydown', e => this.addAction(e));
    window.addEventListener('keyup', e => this.addAction(e));
  }
}

interface UserAction {
  type: string;
  target?: string;
  value?: string;
}

enum EventType {
  click,
  keypress
}

function eventListener(e): UserAction {
  console.log(e);
  const type: string = e.type;
  let value: string, target: string;
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
    value
  }
}