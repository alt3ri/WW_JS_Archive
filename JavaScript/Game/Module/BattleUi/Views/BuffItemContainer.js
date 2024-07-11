"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItemContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  BuffItemInfo_1 = require("../BuffItemInfo"),
  BuffItem_1 = require("./BuffItem"),
  MAX_ITEM_COUNT = 6;
class BuffItemContainer {
  constructor() {
    (this.nkn = []),
      (this.skn = new Map()),
      (this.akn = new Map()),
      (this.hkn = []),
      (this._nt = []),
      (this.unt = []),
      (this.lkn = void 0),
      (this.aa = 0),
      (this.m1t = void 0),
      (this._kn = void 0);
  }
  Init(t, i = MAX_ITEM_COUNT) {
    (this.lkn = t), (this.aa = i);
  }
  Tick(i) {
    for (const h of this.nkn) {
      var t = h.BuffItem;
      if (!t) break;
      t.Tick(i);
    }
    for (let t = this._nt.length - 1; 0 <= t; t--) {
      var s = this._nt[t];
      s.TickHiding(i) ||
        (this._nt.splice(t, 1),
        s.GetRootItem().SetHierarchyIndex(this.nkn.length + this._nt.length),
        this.unt.push(s));
    }
  }
  RefreshBuff(t) {
    if ((this.ClearAll(), t?.IsInit)) {
      (this.m1t = t.Entity.GetComponent(159)),
        (this._kn = t.Entity.GetComponent(174));
      for (const s of t.Entity.GetComponent(19).GetAllCurrentCueRef()) {
        var i = s.CueConfig;
        (2 !== i.CueType && 14 !== i.CueType) ||
          this.AddBuffByCue(i, s.ActiveHandleId);
      }
    } else (this.m1t = void 0), (this._kn = void 0);
  }
  AddBuffByCue(i, s, h = !1) {
    var t,
      e = i.CueType;
    if (2 === e)
      this.skn.has(s) ||
        ((f = this.ckn(s)) &&
          (((t = this.ukn(i)).SingleBuff = f),
          this.skn.set(s, t),
          this.mkn(t, h)));
    else if (14 === e) {
      var f = i.Id;
      let t = this.akn.get(f);
      if (t)
        return t.BuffHandleSet.has(s) ? void 0 : void t.BuffHandleSet.add(s);
      (t = this.ukn(i)).BuffHandleSet.add(s),
        this.akn.set(f, t),
        this.mkn(t, h);
    }
  }
  RemoveBuffByCue(t, i, s = !1) {
    var h,
      e = t.CueType;
    2 === e
      ? (h = this.skn.get(i)) && (this.skn.delete(i), this.dkn(h, s))
      : 14 === e &&
        ((h = t.Id), (e = this.akn.get(h))) &&
        e.BuffHandleSet.has(i) &&
        (e.BuffHandleSet.delete(i), e.BuffHandleSet.size <= 0) &&
        (this.akn.delete(h), this.dkn(e, s));
  }
  ukn(t) {
    let i = void 0;
    return (
      ((i =
        0 < this.hkn.length
          ? this.hkn.pop()
          : new BuffItemInfo_1.BuffItemInfo()).SortId =
        BuffItemInfo_1.BuffItemInfo.GenSortId()),
      (i.Priority = t.Priority),
      (i.BuffCueConfig = t),
      i
    );
  }
  Ckn(t) {
    t.Clear(), this.hkn.push(t);
  }
  mkn(t, i = !1) {
    var s = this.gkn(t);
    s < this.aa &&
      (this.nkn.length > this.aa &&
        this.DeactivateBuffItem(this.nkn[this.aa], !1),
      (t.BuffItem = this.cst()),
      this.mst(t, s, i));
  }
  gkn(i) {
    var s = this.nkn.length;
    for (let t = 0; t < s; t++) {
      var h = this.nkn[t];
      if (0 <= BuffItemInfo_1.BuffItemInfo.Compare(h, i))
        return this.nkn.splice(t, 0, i), t;
    }
    return this.nkn.push(i), s;
  }
  dkn(t, i = !1) {
    var s = this.nkn.indexOf(t);
    s < 0 ||
      (this.nkn.splice(s, 1),
      s < this.aa &&
        (this.DeactivateBuffItem(t, i), this.nkn.length >= this.aa) &&
        ((s = this.nkn[this.aa - 1]).BuffItem &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 18, "有残留的buffItem引用", [
            "cueId",
            s.BuffCueConfig?.Id,
          ]),
        (s.BuffItem = this.cst()),
        this.mst(s, this.aa - 1, !1)),
      this.Ckn(t));
  }
  ckn(t) {
    let i = this.m1t.GetBuffByHandle(t);
    return (i = i || this._kn?.GetFormationBuffComp()?.GetBuffByHandle(t));
  }
  cst() {
    return 0 < this.unt.length
      ? this.unt.pop()
      : new BuffItem_1.BuffItem(this.lkn);
  }
  mst(t, i, s = !1) {
    var h = t.BuffItem;
    h.Activate(t.BuffCueConfig, t.SingleBuff, s),
      i <= 0
        ? h.GetRootItem().SetHierarchyIndex(0)
        : (t = this.nkn[i - 1].BuffItem)
          ? h
              .GetRootItem()
              .SetHierarchyIndex(t.GetRootItem().GetHierarchyIndex() + 1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
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
          s.GetRootItem().SetHierarchyIndex(this.nkn.length + this._nt.length),
          this.unt)
      ).push(s));
  }
  ClearAll() {
    for (const t of this.nkn) t.BuffItem?.DestroyCompatible();
    (this.nkn.length = 0),
      this.skn.clear(),
      this.akn.clear(),
      (this.hkn.length = 0);
    for (const i of this._nt) i.Deactivate(), i.DestroyCompatible();
    this._nt.length = 0;
    for (const s of this.unt) s.DestroyCompatible();
    this.unt.length = 0;
  }
}
exports.BuffItemContainer = BuffItemContainer;
//# sourceMappingURL=BuffItemContainer.js.map
