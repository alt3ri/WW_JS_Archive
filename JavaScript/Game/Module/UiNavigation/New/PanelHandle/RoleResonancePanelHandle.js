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
      (this.Goh = []),
      (this.koh = !1),
      (this.Noh = []),
      (this.Foh = !1);
  }
  get Voh() {
    return (
      this.koh &&
        ((this.koh = !1),
        this.Goh.sort((t, e) => {
          (t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0),
            (e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0);
          return t === e || t < e ? -1 : 1;
        })),
      this.Goh
    );
  }
  get Hoh() {
    return (
      this.Foh &&
        ((this.Foh = !1),
        this.Noh.sort((t, e) => {
          (t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0),
            (e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0);
          return t === e || t < e ? -1 : 1;
        })),
      this.Noh
    );
  }
  OnGetSuitableNavigationListenerList(t) {
    if (this.sBo) {
      if (this.sBo.IsCanFocus()) return [this.sBo];
      var e = MAX_NUM - this.Voh.length;
      let i = 0;
      for (let t = 0, e = this.Voh.length; t < e; ++t)
        if (this.Voh[t] === this.sBo) {
          i = t;
          break;
        }
      return [this.Hoh[e + i]];
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
    this.Goh.push(t), (this.koh = !0);
  }
  AddUnLockNavigationListener(t) {
    this.Noh.push(t), (this.Foh = !0);
  }
}
exports.RoleResonancePanelHandle = RoleResonancePanelHandle;
//# sourceMappingURL=RoleResonancePanelHandle.js.map
