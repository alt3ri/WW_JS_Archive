"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotBase = exports.RedDotData = void 0);
const Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  StringBuilder_1 = require("../../Core/Utils/StringBuilder"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ModelManager_1 = require("../Manager/ModelManager"),
  RedDotSystem_1 = require("./RedDotSystem"),
  DEBUG_MODE = !1,
  STAT_MODE = !0;
class RedDotData {
  constructor() {
    (this.Tar = 0), (this.Lar = new Set());
  }
  get State() {
    return 0 < this.Tar;
  }
  get StateCount() {
    return this.Tar;
  }
  set StateCount(t) {
    (this.Tar = t), this.Tar < 0 && (this.Tar = 0);
  }
  GetUiItemSet() {
    return this.Lar;
  }
  ClearUiItem() {
    this.Lar.clear();
  }
  SetUiItem(t) {
    this.Lar.add(t);
  }
  DeleteUiItem(t) {
    this.Lar.delete(t);
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
    for (const e of this.Lar) e.IsValid() && e.SetUIActive(t);
  }
  OnChildrenStateChange(t) {
    var e = this.State;
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
      (this.Dar = void 0),
      (this.Rar = () => {
        this.Uar(!0);
      }),
      (this.Aar = () => {
        this.Uar(!1);
      }),
      (this.Par = (...t) => {
        let e = 0;
        t && "number" == typeof t[0] && this.IsAllEventParamAsUId()
          ? ((e = t[0]),
            this.xar(e),
            RedDotSystem_1.RedDotSystem.PushToEventQueue(this.war, e))
          : this.IsMultiple()
            ? this.NQ.forEach((t, e) => {
                RedDotSystem_1.RedDotSystem.PushToEventQueue(this.war, e);
              })
            : (this.xar(e),
              RedDotSystem_1.RedDotSystem.PushToEventQueue(this.war, e));
      }),
      (this.war = (t = 0) => {
        STAT_MODE;
        var e = this.OnCheck(t),
          i = this.ANo(t);
        i
          ? (i.TryChangeState(e) &&
              (this.Dar && this.Dar(i.State, t), this.bar(e, t)),
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
      this.qar();
    var t = this.GetActiveEvents();
    if (t) for (const e of t) EventSystem_1.EventSystem.Add(e, this.Rar);
    t = this.GetDisActiveEvents();
    if (t) for (const i of t) EventSystem_1.EventSystem.Add(i, this.Aar);
  }
  get Gar() {
    return ModelManager_1.ModelManager.RedDotModel.GetRedDotTree(this.Name);
  }
  qar() {
    for (const t of this.Nar()) EventSystem_1.EventSystem.Add(t, this.Par);
  }
  Oar(t) {
    if ((this.dce = t)) this.qar();
    else {
      var e;
      for (const s of this.Nar()) EventSystem_1.EventSystem.Remove(s, this.Par);
      for ([, e] of this.NQ) e.SetUIItemActive(!1);
    }
    var i;
    for ([i] of this.Gar.ChildMap) i.Oar(t);
  }
  kar(t) {
    if (void 0 !== this.Gar.Parent && !this.Gar.Parent.Element.dce && t)
      return !1;
    return !0;
  }
  Uar(t) {
    t !== this.dce &&
      this.kar(t) &&
      (this.Oar(t), t && this.Far(), void 0 !== this.Gar.Parent) &&
      this.Gar.Parent.Element.Har(this, t);
  }
  Har(t, e) {
    for (var [i, s] of t.NQ) {
      i = this.NQ.get(i);
      i &&
        (e ? (i.StateCount += s.StateCount) : (i.StateCount -= s.StateCount)),
        i.UpdateRedDotUIActive();
    }
    void 0 !== this.Gar.Parent && this.Gar.Parent.Element.Har(t, e);
  }
  Far() {
    for (var [t, e] of this.NQ) {
      var i = this.OnCheck(t);
      (e.StateCount = i ? 1 : 0), i && (e.SetUIItemActive(!0), this.bar(i, t));
    }
    var s;
    for ([s] of this.Gar.ChildMap) s.Far();
  }
  bar(t, e = 0) {
    var i,
      s = this.Gar.Parent?.Element;
    s &&
      ((e = s.IsMultiple() ? e : 0),
      s.xar(e),
      (i = s.ANo(e)).OnChildrenStateChange(t)) &&
      (s.Dar && s.Dar(i.State, e), s.bar(t, e));
  }
  ANo(t) {
    return this.NQ.get(t);
  }
  xar(t = 0) {
    let e = this.NQ.get(t);
    return e || ((e = new RedDotData()), this.NQ.set(t, e), this.war(t)), e;
  }
  Nar() {
    return this.OnGetEvents() ?? [];
  }
  BindUi(t = 0, e, i) {
    this.xar(t), this.ANo(t).SetUiItem(e), (this.Dar = i), this.UpdateState(t);
  }
  UnBindGivenUi(t = 0, e) {
    t = this.ANo(t);
    t && t.DeleteUiItem(e);
  }
  UnBindUi() {
    this.NQ.forEach((t) => {
      t.ClearUiItem();
    }),
      (this.Dar = void 0);
  }
  UpdateState(t = 0) {
    var e = this.ANo(t);
    e.UpdateRedDotUIActive(), this.Dar && this.Dar(e.State, t);
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
    var t,
      e,
      i = new StringBuilder_1.StringBuilder(),
      s = new StringBuilder_1.StringBuilder(),
      r = new StringBuilder_1.StringBuilder();
    for ([t, e] of this.NQ) {
      r.Clear();
      for (const n of e.GetUiItemSet()) r.Append(n.GetDisplayName() + ", ");
      s.Append(
        `{uid:${t}, stateCount:${e.StateCount} uiItem:[${r.ToString()}] }`,
      );
    }
    var h,
      o = new StringBuilder_1.StringBuilder();
    for ([h] of this.Gar.ChildMap) o.Append(h.Name + ", ");
    return (
      i.Append(`[红点:${this.Name} 父红点:${this.Gar.Parent?.Element.Name} 子红点:{${o.ToString()}}  数据:{ ${s.ToString()} }]
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
    for (var [t, e] of this.NQ) {
      var i = e.GetUiItemSet();
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
(exports.RedDotBase = RedDotBase).fbo = void 0;
//# sourceMappingURL=RedDotBase.js.map
