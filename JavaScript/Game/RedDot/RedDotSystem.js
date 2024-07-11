"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotSystem = void 0);
class RedDotEventData {
  constructor(t, e) {
    (this.Event = t), (this.Param = e);
  }
  HandleEvent() {
    this.Event(this.Param);
  }
}
const TICK_LIMITCOUNT = 10;
class RedDotSystem {
  static PushToEventQueue(e, s) {
    var t;
    this.Xsr.find((t) => t.Event === e && t.Param === s) ||
      ((t = new RedDotEventData(e, s)), this.Xsr.push(t));
  }
  static $sr() {
    var t = RedDotSystem.Xsr.shift();
    t && t.HandleEvent();
  }
  static Tick(t) {
    var e = RedDotSystem.Xsr.length;
    if (!(e <= 0)) {
      var s = e > TICK_LIMITCOUNT ? TICK_LIMITCOUNT : e;
      for (let t = 0; t < s; t++) RedDotSystem.$sr();
    }
  }
}
(exports.RedDotSystem = RedDotSystem).Xsr = [];
//# sourceMappingURL=RedDotSystem.js.map
