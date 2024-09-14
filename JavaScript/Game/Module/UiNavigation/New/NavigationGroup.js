"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationGroup = void 0);
class NavigationGroup {
  constructor(t) {
    (this.Lo = void 0),
      (this.jYa = void 0),
      (this.WYa = void 0),
      (this.QYa = !1),
      (this.KYa = []),
      (this.Lo = t);
  }
  AddListener(t) {
    this.KYa.push(t), (this.QYa = !0);
  }
  RemoveListenerByIndex(t) {
    this.KYa.splice(t, 1);
  }
  get ListenerList() {
    return (
      this.QYa &&
        ((this.QYa = !1),
        this.KYa.sort((t, e) => {
          let r = 0,
            i = 0;
          return (
            t.IsValid() && (r = t.RootUIComp.flattenHierarchyIndex),
            e.IsValid() && (i = e.RootUIComp.flattenHierarchyIndex),
            r === i || r < i ? -1 : 1
          );
        })),
      this.KYa
    );
  }
  get AllowNavigationInSelfDynamic() {
    return this.Lo.AllowNavigationInSelfDynamic;
  }
  set DefaultListener(t) {
    this.jYa = t;
  }
  get DefaultListener() {
    return this.jYa;
  }
  get GroupName() {
    return this.Lo.GroupName;
  }
  get GroupNameMap() {
    return this.Lo.GroupNameMap;
  }
  get GroupType() {
    return this.Lo.GroupType;
  }
  get HorizontalPriorityMode() {
    return this.Lo.HorizontalPriorityMode;
  }
  get HorizontalWrapMode() {
    return this.Lo.HorizontalWrapMode;
  }
  get InsideGroupName() {
    return this.Lo.InsideGroupName;
  }
  set LastSelectListener(t) {
    this.WYa = t;
  }
  get LastSelectListener() {
    return this.WYa;
  }
  get NextGroupName() {
    return this.Lo.NextGroupName;
  }
  set PrevGroupName(t) {
    this.Lo.PrevGroupName = t;
  }
  get PrevGroupName() {
    return this.Lo.PrevGroupName;
  }
  get RefreshNavigation() {
    return this.Lo.RefreshNavigation;
  }
  get SelectableMemory() {
    return this.Lo.SelectableMemory;
  }
  get SuitableListenerByNoDynamic() {
    return this.Lo.SuitableListenerByNoDynamic;
  }
  get VerticalPriorityMode() {
    return this.Lo.VerticalPriorityMode;
  }
  get VerticalWrapMode() {
    return this.Lo.VerticalWrapMode;
  }
}
exports.NavigationGroup = NavigationGroup;
//# sourceMappingURL=NavigationGroup.js.map
