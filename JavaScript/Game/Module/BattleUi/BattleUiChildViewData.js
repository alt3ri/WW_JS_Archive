"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiChildViewData = void 0);
const Log_1 = require("../../../Core/Common/Log");
const VisibleStateUtil_1 = require("./VisibleStateUtil");
class BattleUiChildViewData {
  constructor() {
    (this.lKe = []), (this._Ke = new Map());
  }
  Init() {
    for (let t = (this.lKe.length = 0); t < 23; t++) this.lKe.push(1);
    this.lKe.push(0);
  }
  OnLeaveLevel() {}
  Clear() {}
  GetChildVisible(t) {
    return this.lKe[t] === 0;
  }
  SetChildVisible(t, i, e, l = !0) {
    const o = this.lKe[i];
    var e = VisibleStateUtil_1.VisibleStateUtil.SetVisible(o, e, t);
    return (
      (this.lKe[i] = e),
      !l || o === e || (o !== 0 && e !== 0) || this.uKe(i),
      e === 0
    );
  }
  SetChildrenVisible(t, i, e, l = !0) {
    for (const o of i) this.SetChildVisible(t, o, e, l);
  }
  HideBattleView(i, t) {
    for (let t = 0; t < 24; t++) this.SetChildVisible(i, t, !1, !1);
    if (t) for (const e of t) this.SetChildVisible(i, e, !0, !1);
    this.cKe();
  }
  ShowBattleView(i) {
    for (let t = 0; t < 24; t++) this.SetChildVisible(i, t, !0, !1);
    this.cKe();
  }
  AddCallback(t, i) {
    let e = this._Ke.get(t);
    e || ((e = []), this._Ke.set(t, e)), e.push(i);
  }
  RemoveCallback(t, i) {
    t = this._Ke.get(t);
    t && (i = t.indexOf(i)) !== -1 && t.splice(i, 1);
  }
  uKe(t) {
    t = this._Ke.get(t);
    if (t) for (const i of t) i();
  }
  cKe() {
    try {
      for (const t of this._Ke.values()) for (const i of t) i();
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
      if (this.lKe[i] !== 0)
        for (let t = 0; t < 12; t++)
          VisibleStateUtil_1.VisibleStateUtil.GetVisibleByType(
            this.lKe[i],
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
// # sourceMappingURL=BattleUiChildViewData.js.map
