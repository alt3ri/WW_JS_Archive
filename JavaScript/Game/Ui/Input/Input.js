"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Input = exports.TouchData = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class TouchData {
  constructor(t, n, e) {
    (this.IsPress = t), (this.TouchId = n), (this.TouchPosition = e);
  }
}
exports.TouchData = TouchData;
class Input {
  static Initialize(t) {
    t &&
      (t.OnClickKey.Add(Input.emr),
      t.OnMiddleMouseScroll.Add(Input.tmr),
      t.OnTouch.Add(Input.Eqt),
      t.OnTouchMove.Add(Input.imr));
  }
  static IsKeyPress(t) {
    t = Input.uEe.get(t);
    return void 0 !== t && t;
  }
  static GetAxisValue() {
    return Input.omr;
  }
  static GetTouchMap() {
    return Input.wFo;
  }
}
((exports.Input = Input).uEe = new Map()),
  (Input.wFo = new Map()),
  (Input.omr = 0),
  (Input.OnlyRespondToKey = ""),
  (Input.Enable = !0),
  (Input.emr = (t, n) => {
    var e = t.KeyName.toString();
    Input.uEe.set(e, n),
      (StringUtils_1.StringUtils.IsEmpty(Input.OnlyRespondToKey) ||
        e === Input.OnlyRespondToKey ||
        e.includes("Mouse")) &&
        Input.Enable &&
        (Input.uEe.set(e, n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.KeyClick,
          n,
          t,
        ));
  }),
  (Input.tmr = (t) => {
    Input.Enable && (Input.omr = t);
  }),
  (Input.Eqt = (t, n, e) => {
    Input.Enable && void 0 === Input.wFo.get(n) && new TouchData(t, n, e);
  }),
  (Input.imr = (t, n) => {
    Input.Enable && (t = Input.wFo.get(t)) && (t.TouchPosition = n);
  });
//# sourceMappingURL=Input.js.map
