import Rx from 'rxjs';

/**
 * Maps arrow keys to functions
 */

export default function keyManager(keyMap) {
  const pressedKeys = {};
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
  var keyUps = Rx.Observable.fromEvent(document, 'keyup');
  var keyActions = Rx.Observable
    .merge(keyDowns, keyUps)
    .filter(e => arrowKeys.includes(e.key))
    .bufferTime(100)
    .do(events => {
      events.forEach(e => {
        pressedKeys[e.key] = e.type === 'keydown';
      });
    });

  keyActions.subscribe(e => {
    if (pressedKeys['ArrowUp'] && pressedKeys['ArrowLeft']) {
      return keyMap.upLeft();
    }
    if (pressedKeys['ArrowUp'] && pressedKeys['ArrowRight']) {
      return keyMap.upRight();
    }
    if (pressedKeys['ArrowDown'] && pressedKeys['ArrowLeft']) {
      return keyMap.downLeft();
    }
    if (pressedKeys['ArrowDown'] && pressedKeys['ArrowRight']) {
      return keyMap.downRight();
    }
    if (pressedKeys['ArrowUp']) {
      return keyMap.up();
    }
    if (pressedKeys['ArrowDown']) {
      return keyMap.down();
    }
    if (pressedKeys['ArrowRight']) {
      return keyMap.right();
    }
    if (pressedKeys['ArrowLeft']) {
      return keyMap.left();
    }
  });

  return keyActions;
};