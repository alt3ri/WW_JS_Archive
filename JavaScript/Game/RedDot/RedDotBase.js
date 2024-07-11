"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotBase = exports.RedDotData = void 0);
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const StringBuilder_1 = require("../../Core/Utils/StringBuilder");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const RedDotSystem_1 = require("./RedDotSystem");
const DEBUG_MODE = !1;
const STAT_MODE = !0;
class RedDotData {
  constructor() {
    (this.Dsr = 0), (this.Rsr = new Set());
  }
  get State() {
    return this.Dsr > 0;
  }
  get StateCount() {
    return this.Dsr;
  }
  set StateCount(t) {
    (this.Dsr = t), this.Dsr < 0 && (this.Dsr = 0);
  }
  GetUiItemSet() {
    return this.Rsr;
  }
  ClearUiItem() {
    this.Rsr.clear();
  }
  SetUiItem(t) {
    this.Rsr.add(t);
  }
  DeleteUiItem(t) {
    this.Rsr.delete(t);
  }
  TryChangeState(t) {
    return (
      t !== this.State &&
      ((this.StateCount += t ? 1 : -1), this.UpdateRedDotUIActive(), !0)
    );
  }
  UpdateRedDotUIActive() {
    this.SetUIItemActive(this.State);
  }
  SetUIItemActive(t) {
    for (const e of this.Rsr) e.IsValid() && e.SetUIActive(t);
  }
  OnChildrenStateChange(t) {
    const e = this.State;
    return (
      (this.StateCount += t ? 1 : -1),
      e !== this.State && (this.UpdateRedDotUIActive(), !0)
    );
  }
}
exports.RedDotData = RedDotData;
class RedDotBase {
  constructor() {
    (this.Name = void 0),
      (this.dce = !0),
      (this.NQ = new Map()),
      (this.Usr = void 0),
      (this.Asr = () => {
        this.Psr(!0);
      }),
      (this.xsr = () => {
        this.Psr(!1);
      }),
      (this.wsr = (...t) => {
        let e = 0;
        t && typeof t[0] === "number" && this.IsAllEventParamAsUId()
          ? ((e = t[0]),
            this.Bsr(e),
            RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e))
          : this.IsMultiple()
            ? this.NQ.forEach((t, e) => {
                RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e);
              })
            : (this.Bsr(e),
              RedDotSystem_1.RedDotSystem.PushToEventQueue(this.bsr, e));
      }),
      (this.bsr = (t = 0) => {
        STAT_MODE;
        const e = this.OnCheck(t);
        const i = this.wGo(t);
        i
          ? (i.TryChangeState(e) &&
              (this.Usr && this.Usr(i.State, t), this.qsr(e, t)),
            DEBUG_MODE &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "RedDot",
                17,
                "Check",
                ["Name", this.Name],
                ["uId", t],
                ["result", e],
              ),
            STAT_MODE)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RedDot",
              17,
              "Check失败，红点数据未绑定到事件上！",
              ["Name", this.Name],
              ["uId", t],
            );
      }),
      this.Gsr();
    let t = this.GetActiveEvents();
    if (t) for (const e of t) EventSystem_1.EventSystem.Add(e, this.Asr);
    t = this.GetDisActiveEvents();
    if (t) for (const i of t) EventSystem_1.EventSystem.Add(i, this.xsr);
  }
  get Nsr() {
    return ModelManager_1.ModelManager.RedDotModel.GetRedDotTree(this.Name);
  }
  Gsr() {
    for (const t of this.Osr()) EventSystem_1.EventSystem.Add(t, this.wsr);
  }
  ksr(t) {
    if ((this.dce = t)) this.Gsr();
    else {
      let e;
      for (const s of this.Osr()) EventSystem_1.EventSystem.Remove(s, this.wsr);
      for ([, e] of this.NQ) e.SetUIItemActive(!1);
    }
    let i;
    for ([i] of this.Nsr.ChildMap) i.ksr(t);
  }
  Fsr(t) {
    if (void 0 !== this.Nsr.Parent && !this.Nsr.Parent.Element.dce && t)
      return !1;
    return !0;
  }
  Psr(t) {
    t !== this.dce &&
      this.Fsr(t) &&
      (this.ksr(t), t && this.Vsr(), void 0 !== this.Nsr.Parent) &&
      this.Nsr.Parent.Element.Hsr(this, t);
  }
  Hsr(t, e) {
    for (let [i, s] of t.NQ) {
      i = this.NQ.get(i);
      i &&
        (e ? (i.StateCount += s.StateCount) : (i.StateCount -= s.StateCount)),
        i.UpdateRedDotUIActive();
    }
    void 0 !== this.Nsr.Parent && this.Nsr.Parent.Element.Hsr(t, e);
  }
  Vsr() {
    for (const [t, e] of this.NQ) {
      const i = this.OnCheck(t);
      (e.StateCount = i ? 1 : 0), i && (e.SetUIItemActive(!0), this.qsr(i, t));
    }
    let s;
    for ([s] of this.Nsr.ChildMap) s.Vsr();
  }
  qsr(t, e = 0) {
    let i;
    const s = this.Nsr.Parent?.Element;
    s &&
      ((e = s.IsMultiple() ? e : 0),
      s.Bsr(e),
      (i = s.wGo(e)).OnChildrenStateChange(t)) &&
      (s.Usr && s.Usr(i.State, e), s.qsr(t, e));
  }
  wGo(t) {
    return this.NQ.get(t);
  }
  Bsr(t = 0) {
    let e = this.NQ.get(t);
    return e || ((e = new RedDotData()), this.NQ.set(t, e), this.bsr(t)), e;
  }
  Osr() {
    return this.OnGetEvents() ?? [];
  }
  BindUi(t = 0, e, i) {
    this.Bsr(t), this.wGo(t).SetUiItem(e), (this.Usr = i), this.UpdateState(t);
  }
  UnBindGivenUi(t = 0, e) {
    t = this.wGo(t);
    t && t.DeleteUiItem(e);
  }
  UnBindUi() {
    this.NQ.forEach((t) => {
      t.ClearUiItem();
    }),
      (this.Usr = void 0);
  }
  UpdateState(t = 0) {
    const e = this.wGo(t);
    e.UpdateRedDotUIActive(), this.Usr && this.Usr(e.State, t);
  }
  IsRedDotActive() {
    for (const t of this.NQ.values()) if (t.State) return !0;
    return !1;
  }
  GetParentName() {
    return this.OnGetParentName();
  }
  OnGetEvents() {}
  GetActiveEvents() {}
  GetDisActiveEvents() {}
  OnCheck(t = 0) {
    return !1;
  }
  IsMultiple() {
    return !1;
  }
  OnGetParentName() {}
  IsAllEventParamAsUId() {
    return !0;
  }
  ToRedDotString() {
    let t;
    let e;
    const i = new StringBuilder_1.StringBuilder();
    const s = new StringBuilder_1.StringBuilder();
    const r = new StringBuilder_1.StringBuilder();
    for ([t, e] of this.NQ) {
      r.Clear();
      for (const n of e.GetUiItemSet()) r.Append(n.GetDisplayName() + ", ");
      s.Append(
        `{uid:${t}, stateCount:${e.StateCount} uiItem:[${r.ToString()}] }`,
      );
    }
    let h;
    const o = new StringBuilder_1.StringBuilder();
    for ([h] of this.Nsr.ChildMap) o.Append(h.Name + ", ");
    return (
      i.Append(`[红点:${this.Name} 父红点:${this.Nsr.Parent?.Element.Name} 子红点:{${o.ToString()}}  数据:{ ${s.ToString()} }]
`),
      i.ToString()
    );
  }

  PrintStateDebugString() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RedDot", 8, "=======子红点状态打印开始=======：", [
        "Name",
        this.Name,
      ]);
    for (const [t, e] of this.NQ) {
      const i = e.GetUiItemSet();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RedDot",
          8,
          "红点状态数据：",
          ["Uid", t],
          ["State", e.State],
          ["StateCount", e.StateCount],
          ["UiItemSize", i.size],
        );
      for (const s of i)
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RedDot", 8, "受控制的UI对象", [
            "UiItem",
            s.GetDisplayName(),
          ]);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RedDot", 8, "=======子红点状态打印结束=======：", [
        "Name",
        this.Name,
      ]);
  }
}
(exports.RedDotBase = RedDotBase).MBo = void 0;
// # sourceMappingURL=RedDotBase.js.map
