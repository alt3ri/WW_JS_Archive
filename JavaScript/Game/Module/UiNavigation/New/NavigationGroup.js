"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationGroup = void 0);
class NavigationGroup {
  constructor(t) {
    (this.Lo = void 0),
      (this.Oeh = void 0),
      (this.Geh = void 0),
      (this.keh = !1),
      (this.Neh = []),
      (this.ho1 = (t, e) => {
        let r = 0,
          i = 0;
        return (
          t.IsValid() && (r = t.RootUIComp.flattenHierarchyIndex),
          e.IsValid() && (i = e.RootUIComp.flattenHierarchyIndex),
          r === i || r < i ? -1 : 1
        );
      }),
      (this.Lo = t);
  }
  AddListener(t) {
    this.Neh.push(t), (this.keh = !0);
  }
  RemoveListenerByIndex(t) {
    this.Neh.splice(t, 1);
  }
  get ListenerList() {
    return this.keh && ((this.keh = !1), this.Neh.sort(this.ho1)), this.Neh;
  }
  get LoopScrollSortListenerList() {
    return this.ListenerList.slice().sort((t, e) => {
      let r = 0,
        i = 0;
      return t.HasLoopScrollView() &&
        e.HasLoopScrollView() &&
        (t.IsValid() && (r = t.LoopScrollViewGridIndex),
        e.IsValid() && (i = e.LoopScrollViewGridIndex),
        r !== i)
        ? r - i
        : this.ho1(t, e);
    });
  }
  get ActiveListenerList() {
    var r = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var i = this.ListenerList[t];
      i.IsListenerActive() && r.push(i);
    }
    return r;
  }
  GetOppositeListenerListByListener(r) {
    if (this.AllowNavigationInSelfDynamic) return this.ListenerList;
    var i = [];
    for (let t = 0, e = this.ListenerList.length; t < e; ++t) {
      var s = this.ListenerList[t];
      (void 0 === r.ScrollViewActor &&
        void 0 === s.ScrollViewActor &&
        void 0 === r.LayoutActor &&
        void 0 === s.LayoutActor) ||
        (r.ScrollViewActor === s.ScrollViewActor &&
          r.LayoutActor === s.LayoutActor &&
          i.push(s));
    }
    return i;
  }
  get AllowNavigationInSelfDynamic() {
    return this.Lo.AllowNavigationInSelfDynamic;
  }
  set DefaultListener(t) {
    this.Oeh = t;
  }
  get DefaultListener() {
    return this.Oeh;
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
    this.Geh = t;
  }
  get LastSelectListener() {
    return this.Geh;
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
  get SlideToLeftOrTop() {
    return this.Lo.SlideToLeftOrTop;
  }
  get SlideToRightOrDown() {
    return this.Lo.SlideToRightOrDown;
  }
}
exports.NavigationGroup = NavigationGroup;
//# sourceMappingURL=NavigationGroup.js.map
