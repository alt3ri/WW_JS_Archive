"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleResonancePanelHandle = void 0);
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase"),
  MAX_NUM = 6;
class RoleResonancePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments),
      (this.GroupName = ""),
      (this.sBo = void 0),
      (this.cJa = []),
      (this.mJa = !1),
      (this.dJa = []),
      (this.CJa = !1);
  }
  get gJa() {
    return (
      this.mJa &&
        ((this.mJa = !1),
        this.cJa.sort((t, e) => {
          (t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0),
            (e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0);
          return t === e || t < e ? -1 : 1;
        })),
      this.cJa
    );
  }
  get fJa() {
    return (
      this.CJa &&
        ((this.CJa = !1),
        this.dJa.sort((t, e) => {
          (t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0),
            (e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0);
          return t === e || t < e ? -1 : 1;
        })),
      this.dJa
    );
  }
  OnGetSuitableNavigationListenerList(t) {
    if (this.sBo) {
      if (this.sBo.IsCanFocus()) return [this.sBo];
      var e = MAX_NUM - this.gJa.length;
      let i = 0;
      for (let t = 0, e = this.gJa.length; t < e; ++t)
        if (this.gJa[t] === this.sBo) {
          i = t;
          break;
        }
      return [this.fJa[e + i]];
    }
    return [];
  }
  SetToggleSelectByGroupName(t) {
    var i = this.GetNavigationGroup(t);
    if (i) {
      this.GroupName = t;
      for (let t = 0, e = i.ListenerList.length; t < e; ++t)
        i.ListenerList[t].GetBehaviorComponent().bToggleOnSelect = !0;
    }
  }
  ResetToggleSelect() {
    var i = this.GetNavigationGroup(this.GroupName);
    if (i) {
      this.GroupName = "";
      for (let t = 0, e = i.ListenerList.length; t < e; ++t)
        i.ListenerList[t].GetBehaviorComponent().bToggleOnSelect = !1;
    }
  }
  SetDefaultNavigationListener(t) {
    this.sBo = t;
  }
  AddLockNavigationListener(t) {
    this.cJa.push(t), (this.mJa = !0);
  }
  AddUnLockNavigationListener(t) {
    this.dJa.push(t), (this.CJa = !0);
  }
}
exports.RoleResonancePanelHandle = RoleResonancePanelHandle;
//# sourceMappingURL=RoleResonancePanelHandle.js.map
