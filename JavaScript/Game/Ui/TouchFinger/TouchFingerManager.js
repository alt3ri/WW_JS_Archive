"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TouchFingerManager = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  TouchFingerData_1 = require("./TouchFingerData"),
  TouchFingerDefine_1 = require("./TouchFingerDefine");
class TouchFingerManager {
  static Initialize() {
    for (
      let e = TouchFingerDefine_1.EFingerIndex.One;
      e < TouchFingerDefine_1.EFingerIndex.Ten;
      e++
    )
      TouchFingerManager.Wdr(e);
  }
  static Wdr(e) {
    var r = new TouchFingerData_1.TouchFingerData(e);
    TouchFingerManager.mgt.set(e, r);
  }
  static GetTouchFingerData(e) {
    return TouchFingerManager.mgt.get(e);
  }
  static StartTouch(e, r) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e &&
      !e.IsInTouch() &&
      (TouchFingerManager.CurrentTouchFingerCount++,
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ControlScreen", 8, "开始触碰屏幕", [
          "FingerCount",
          TouchFingerManager.CurrentTouchFingerCount,
        ]),
      e.StartTouch(r));
  }
  static EndTouch(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e &&
      e.IsInTouch() &&
      ((TouchFingerManager.CurrentTouchFingerCount = Math.max(
        TouchFingerManager.CurrentTouchFingerCount - 1,
        0,
      )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ControlScreen", 8, "结束触碰屏幕", [
          "FingerCount",
          TouchFingerManager.CurrentTouchFingerCount,
        ]),
      e) &&
      e.EndTouch();
  }
  static MoveTouch(e, r) {
    e = TouchFingerManager.GetTouchFingerData(e);
    e && e.MoveTouch(r);
  }
  static GetTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) return e.GetTouchPosition();
  }
  static GetLastTouchPosition(e) {
    e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch()) return e.GetLastTouchPosition();
  }
  static GetTouchFingerCount() {
    return TouchFingerManager.CurrentTouchFingerCount;
  }
  static GetFingerExpandCloseValue(e, r) {
    var n,
      i,
      a,
      e = TouchFingerManager.GetTouchFingerData(e),
      r = TouchFingerManager.GetTouchFingerData(r);
    return e &&
      r &&
      r.IsInTouch() &&
      r.IsInTouch() &&
      ((n = e.GetLastTouchPosition()), (i = r.GetLastTouchPosition()), n) &&
      i &&
      ((e = e.GetTouchPosition()), (r = r.GetTouchPosition()), e) &&
      r
      ? (a = e.X - r.X) * a +
          (a = e.Y - r.Y) * a +
          (a = e.Z - r.Z) * a -
          ((e = n.X - i.X) * e + (r = n.Y - i.Y) * r + (a = n.Z - i.Z) * a)
      : 0;
  }
  static GetFingerExpandCloseType(e, r) {
    let n = void 0,
      i = 0;
    var e = TouchFingerManager.GetTouchFingerData(e),
      r = TouchFingerManager.GetTouchFingerData(r),
      a =
        ((e && r) || (n = TouchFingerDefine_1.EFingerExpandCloseType.None),
        (r.IsInTouch() && r.IsInTouch()) ||
          (n = TouchFingerDefine_1.EFingerExpandCloseType.None),
        e.GetLastTouchPosition()),
      o = r.GetLastTouchPosition(),
      e =
        ((a && o) || (n = TouchFingerDefine_1.EFingerExpandCloseType.None),
        e.GetTouchPosition()),
      r = r.GetTouchPosition(),
      e =
        ((e && r) || (n = TouchFingerDefine_1.EFingerExpandCloseType.None),
        UE.KismetMathLibrary.Vector_DistanceSquared(e, r)),
      r = UE.KismetMathLibrary.Vector_DistanceSquared(a, o);
    return (
      (i = (e - r) / r),
      e < r && (n = TouchFingerDefine_1.EFingerExpandCloseType.Close),
      r < e && (n = TouchFingerDefine_1.EFingerExpandCloseType.Expand),
      Math.abs(i) <= TouchFingerDefine_1.FINGER_TOUCHDEAD_ZONE &&
        ((i = 0), (n = TouchFingerDefine_1.EFingerExpandCloseType.None)),
      { State: n, ChangeRate: i }
    );
  }
  static GetFingerDirection(e) {
    var r,
      e = TouchFingerManager.GetTouchFingerData(e);
    if (e && e.IsInTouch())
      return (r = e.GetLastTouchPosition())
        ? { X: (e = e.GetTouchPosition()).X - r.X, Y: e.Y - r.Y }
        : { X: 0, Y: 0 };
  }
}
((exports.TouchFingerManager = TouchFingerManager).mgt = new Map()),
  (TouchFingerManager.CurrentTouchFingerCount = 0);
//# sourceMappingURL=TouchFingerManager.js.map
