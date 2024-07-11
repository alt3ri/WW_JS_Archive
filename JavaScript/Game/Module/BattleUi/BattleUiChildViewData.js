"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiChildViewData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  VisibleStateUtil_1 = require("./VisibleStateUtil");
class BattleUiChildViewData {
  constructor() {
    (this.EQe = []), (this.SQe = new Map());
  }
  Init() {
    for (let t = (this.EQe.length = 0); t < 23; t++) this.EQe.push(1);
    this.EQe.push(0);
  }
  OnLeaveLevel() {}
  Clear() {}
  GetChildVisible(t) {
    return 0 === this.EQe[t];
  }
  SetChildVisible(t, i, e, l = !0) {
    var o = this.EQe[i],
      e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(o, e, t);
    return (
      (this.EQe[i] = e),
      !l || o === e || (0 !== o && 0 !== e) || this.yQe(i),
      0 === e
    );
  }
  SetChildrenVisible(t, i, e, l = !0) {
    for (const o of i) this.SetChildVisible(t, o, e, l);
  }
  HideBattleView(i, t) {
    for (let t = 0; t < 24; t++) this.SetChildVisible(i, t, !1, !1);
    if (t) for (const e of t) this.SetChildVisible(i, e, !0, !1);
    this.IQe();
  }
  ShowBattleView(i) {
    for (let t = 0; t < 24; t++) this.SetChildVisible(i, t, !0, !1);
    this.IQe();
  }
  AddCallback(t, i) {
    let e = this.SQe.get(t);
    e || ((e = []), this.SQe.set(t, e)), e.push(i);
  }
  RemoveCallback(t, i) {
    t = this.SQe.get(t);
    t && -1 !== (i = t.indexOf(i)) && t.splice(i, 1);
  }
  yQe(t) {
    t = this.SQe.get(t);
    if (t) for (const i of t) i();
  }
  IQe() {
    try {
      for (const t of this.SQe.values()) for (const i of t) i();
    } catch (t) {
      t instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack("Battle", 18, "childViewError", t, [
            "",
            t.message,
          ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "childViewError", ["error", t]);
    }
  }
  DebugLogAllChildState() {
    for (let i = 0; i < 25; i++)
      if (0 !== this.EQe[i])
        for (let t = 0; t < 12; t++)
          VisibleStateUtil_1.VisibleStateUtil.GetVisibleByType(
            this.EQe[i],
            t,
          ) ||
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                18,
                "界面被隐藏",
                ["编号", i],
                ["原因", t],
              ));
  }
}
exports.BattleUiChildViewData = BattleUiChildViewData;
//# sourceMappingURL=BattleUiChildViewData.js.map
