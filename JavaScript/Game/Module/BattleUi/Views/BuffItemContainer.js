"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BuffItemInfo_1 = require("../BuffItemInfo"),
  BuffItem_1 = require("./BuffItem"),
  MAX_ITEM_COUNT = 6,
  TICK_INTERVAL_FRAME_AT_MORE = 2;
class BuffItemContainer {
  constructor() {
    (this.dkn = []),
      (this.Ckn = new Map()),
      (this.gkn = new Map()),
      (this.fkn = []),
      (this._nt = []),
      (this.unt = []),
      (this.pkn = void 0),
      (this.aa = 0),
      (this.rJl = !1),
      (this.YLe = !1),
      (this.m1t = void 0),
      (this.vkn = void 0),
      (this.PGl = 0);
  }
  Init(t, i = MAX_ITEM_COUNT, s = !1, e = !1) {
    (this.pkn = t), (this.aa = i), (this.rJl = s), (this.YLe = e);
  }
  Tick(i) {
    var t = Time_1.Time.Frame;
    if (!(t < this.PGl)) {
      this.dkn.length > MAX_ITEM_COUNT &&
        (this.PGl = t + TICK_INTERVAL_FRAME_AT_MORE);
      for (const h of this.dkn) {
        var s = h.BuffItem;
        if (!s) break;
        s.Tick(i);
      }
      for (let t = this._nt.length - 1; 0 <= t; t--) {
        var e = this._nt[t];
        e.TickHiding(i) ||
          (this._nt.splice(t, 1),
          e.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length),
          this.unt.push(e));
      }
    }
  }
  RefreshBuff(t) {
    this.ClearAll(),
      t?.IsInit
        ? ((this.m1t = t.Entity.GetComponent(172)),
          (this.vkn = t.Entity.GetComponent(188)),
          (t = t.Entity.GetComponent(21)),
          this.Fah(t),
          this.YLe &&
            (t =
              ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(
                ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
              )?.GetComponent(223)) &&
            this.Fah(t))
        : ((this.m1t = void 0), (this.vkn = void 0));
  }
  Fah(t) {
    for (const s of t.GetAllCurrentCueRef()) {
      var i = s.CueConfig;
      (2 !== i.CueType && 14 !== i.CueType) ||
        this.AddBuffByCue(i, s.ActiveHandleId);
    }
  }
  AddBuffByCue(i, s, e = !1) {
    var t,
      h = i.CueType;
    if (2 === h)
      this.oJl(i) &&
        !this.Ckn.has(s) &&
        (r = this.Skn(s)) &&
        (((t = this.Mkn(i)).SingleBuff = r),
        this.Ckn.set(s, t),
        this.Ekn(t, e));
    else if (14 === h && this.oJl(i)) {
      var r = i.Id;
      let t = this.gkn.get(r);
      if (t)
        return t.BuffHandleSet.has(s) ? void 0 : void t.BuffHandleSet.add(s);
      (t = this.Mkn(i)).BuffHandleSet.add(s),
        this.gkn.set(r, t),
        this.Ekn(t, e);
    }
  }
  oJl(t) {
    return !(this.rJl && 4 < t.Parameters.length && "1" === t.Parameters[4]);
  }
  RemoveBuffByCue(t, i, s = !1) {
    var e,
      h = t.CueType;
    2 === h
      ? (e = this.Ckn.get(i)) && (this.Ckn.delete(i), this.ykn(e, s))
      : 14 === h &&
        ((e = t.Id), (h = this.gkn.get(e))) &&
        h.BuffHandleSet.has(i) &&
        (h.BuffHandleSet.delete(i), h.BuffHandleSet.size <= 0) &&
        (this.gkn.delete(e), this.ykn(h, s));
  }
  Mkn(t) {
    let i = void 0;
    return (
      ((i =
        0 < this.fkn.length
          ? this.fkn.pop()
          : new BuffItemInfo_1.BuffItemInfo()).SortId =
        BuffItemInfo_1.BuffItemInfo.GenSortId()),
      (i.Priority = t.Priority),
      (i.BuffCueConfig = t),
      i
    );
  }
  Ikn(t) {
    t.Clear(), this.fkn.push(t);
  }
  Ekn(t, i = !1) {
    var s = this.Tkn(t);
    s < this.aa &&
      (this.dkn.length > this.aa &&
        this.DeactivateBuffItem(this.dkn[this.aa], !1),
      (t.BuffItem = this.cst()),
      this.mst(t, s, i));
  }
  Tkn(i) {
    var s = this.dkn.length;
    for (let t = 0; t < s; t++) {
      var e = this.dkn[t];
      if (0 <= BuffItemInfo_1.BuffItemInfo.Compare(e, i))
        return this.dkn.splice(t, 0, i), t;
    }
    return this.dkn.push(i), s;
  }
  ykn(t, i = !1) {
    var s = this.dkn.indexOf(t);
    s < 0 ||
      (this.dkn.splice(s, 1),
      s < this.aa &&
        (this.DeactivateBuffItem(t, i), this.dkn.length >= this.aa) &&
        ((s = this.dkn[this.aa - 1]).BuffItem &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 17, "有残留的buffItem引用", [
            "cueId",
            s.BuffCueConfig?.Id,
          ]),
        (s.BuffItem = this.cst()),
        this.mst(s, this.aa - 1, !1)),
      this.Ikn(t));
  }
  Skn(t) {
    let i = this.m1t.GetBuffByHandle(t);
    return (i = i || this.vkn?.GetFormationBuffComp()?.GetBuffByHandle(t));
  }
  cst() {
    return 0 < this.unt.length
      ? this.unt.pop()
      : new BuffItem_1.BuffItem(this.pkn);
  }
  mst(t, i, s = !1) {
    var e = t.BuffItem;
    e.Activate(t.BuffCueConfig, t.SingleBuff, s),
      i <= 0
        ? e.GetRootItem().SetHierarchyIndex(0)
        : (t = this.dkn[i - 1].BuffItem)
          ? e
              .GetRootItem()
              .SetHierarchyIndex(t.GetRootItem().GetHierarchyIndex() + 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              17,
              "要插入的buff图标前面的buff没有buffItem",
            );
  }
  DeactivateBuffItem(t, i = !1) {
    var s = t.BuffItem;
    s &&
      ((t.BuffItem = void 0),
      (i
        ? (s.DeactivateWithCloseAnim(), this._nt)
        : (s.Deactivate(),
          s.GetRootItem().SetHierarchyIndex(this.dkn.length + this._nt.length),
          this.unt)
      ).push(s));
  }
  ClearAll() {
    for (const t of this.dkn) t.BuffItem?.DestroyCompatible();
    (this.dkn.length = 0),
      this.Ckn.clear(),
      this.gkn.clear(),
      (this.fkn.length = 0);
    for (const i of this._nt) i.Deactivate(), i.DestroyCompatible();
    this._nt.length = 0;
    for (const s of this.unt) s.DestroyCompatible();
    (this.unt.length = 0), (this.PGl = 0);
  }
}
exports.BuffItemContainer = BuffItemContainer;
//# sourceMappingURL=BuffItemContainer.js.map
