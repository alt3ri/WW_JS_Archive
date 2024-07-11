"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Input = exports.TouchData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class TouchData {
  constructor(t, n, e) {
    (this.IsPress = t), (this.TouchId = n), (this.TouchPosition = e);
  }
}
exports.TouchData = TouchData;
class Input {
  static Initialize(t) {
    t &&
      (t.OnClickKey.Add(Input.ocr),
      t.OnMiddleMouseScroll.Add(Input.rcr),
      t.OnTouch.Add(Input.pbt),
      t.OnTouchMove.Add(Input.ncr));
  }
  static IsKeyPress(t) {
    t = Input.uSe.get(t);
    return void 0 !== t && t;
  }
  static GetAxisValue() {
    return Input.scr;
  }
  static GetTouchMap() {
    return Input.q2o;
  }
}
((exports.Input = Input).uSe = new Map()),
  (Input.q2o = new Map()),
  (Input.scr = 0),
  (Input.OnlyRespondToKey = ""),
  (Input.Enable = !0),
  (Input.ocr = (t, n) => {
    const e = t.KeyName.toString();
    Input.uSe.set(e, n),
      (StringUtils_1.StringUtils.IsEmpty(Input.OnlyRespondToKey) ||
        e === Input.OnlyRespondToKey ||
        e.includes("Mouse")) &&
        Input.Enable &&
        (Input.uSe.set(e, n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.KeyClick,
          n,
          t,
        ));
  }),
  (Input.rcr = (t) => {
    Input.Enable && (Input.scr = t);
  }),
  (Input.pbt = (t, n, e) => {
    Input.Enable && void 0 === Input.q2o.get(n) && new TouchData(t, n, e);
  }),
  (Input.ncr = (t, n) => {
    Input.Enable && (t = Input.q2o.get(t)) && (t.TouchPosition = n);
  });
// # sourceMappingURL=Input.js.map
