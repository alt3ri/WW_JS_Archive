"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationSelectableBase = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiNavigationGlobalData_1 = require("../UiNavigationGlobalData");
class NavigationSelectableBase {
  constructor(t, i) {
    (this.IsInteractive = !0),
      (this.Selectable = void 0),
      (this.Listener = void 0),
      (this.PanelHandle = void 0),
      (this.E9 = "Button"),
      (this.Selectable = t),
      (this.E9 = i);
  }
  Init() {
    this.OnInit();
  }
  Start() {
    this.OnStart();
  }
  Clear() {
    this.OnClear();
  }
  CanFocus() {
    return (
      !!this.IsInteractive &&
      !!this.Selectable.IsValid() &&
      !!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
    );
  }
  CanFocusInScrollOrLayout() {
    return this.OnCanFocusInScrollOrLayout();
  }
  IsActive() {
    return (
      !!this.IsInteractive &&
      !!this.Selectable.IsValid() &&
      !!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
    );
  }
  SetIsInteractive(t) {
    this.IsInteractive = t;
  }
  GetSelectable() {
    return this.Selectable;
  }
  SetListener(t) {
    this.Listener = t;
  }
  SetPanelHandle(t) {
    this.PanelHandle = t;
  }
  GetTipsTextId() {
    return this.OnGetTipsTextId();
  }
  CheckFindNavigationBefore() {
    return !UiLayer_1.UiLayer.IsInMask() && this.OnCheckFindNavigationBefore();
  }
  CheckFindOpposite(t) {
    return (
      !(this.Listener === t || !this.Listener.IsCanFocus()) &&
      this.OnCheckFindOpposite(t)
    );
  }
  CheckFindNavigationAfter(t) {
    return this.OnCheckFindNavigationAfter(t);
  }
  HandlePointerEnter(t) {
    return (
      !!this.IsAllowNavigationByGroup() &&
      !!this.IsAllowNavigationBySelfParam(t) &&
      !!this.cBo() &&
      this.OnHandlePointerEnter(t)
    );
  }
  HandlePointerSelect(t) {
    return !!this.cBo() && this.OnHandlePointerSelect(t);
  }
  IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
    return this.OnIsIgnoreScrollOrLayoutCheck();
  }
  IsAllowNavigationByGroup() {
    var t;
    return (
      !StringUtils_1.StringUtils.IsEmpty(this.Listener.GroupName) &&
      !!(t = this.Listener.PanelConfig.GetNavigationGroup(
        this.Listener.GroupName,
      )) &&
      0 === t.GroupType
    );
  }
  OnGetTipsTextId() {
    return this.Listener.HotKeyTipsTextIdMap.Get(1);
  }
  OnCheckFindNavigationBefore() {
    return !0;
  }
  OnCheckFindOpposite(t) {
    return !0;
  }
  OnCheckFindNavigationAfter(t) {
    return !0;
  }
  IsAllowNavigationBySelfParam(t) {
    return !0;
  }
  OnCanFocusInScrollOrLayout() {
    return (
      !!this.IsInteractive &&
      !!this.Selectable.RootUIComp.IsUIActiveInHierarchy()
    );
  }
  OnHandlePointerEnter(t) {
    return !0;
  }
  OnIsIgnoreScrollOrLayoutCheck() {
    return !1;
  }
  cBo() {
    var t, i;
    return !(
      !this.Listener.PanelConfig ||
      (!UiNavigationGlobalData_1.UiNavigationGlobalData
        .IsAllowCrossNavigationGroup &&
        (t = this.Listener.PanelConfig.GetFocusListener()) &&
        (!(i = this.Listener.PanelConfig.GetNavigationGroup(t.GroupName)) ||
          i.GroupName !== this.Listener.GroupName ||
          (!i.AllowNavigationInSelfDynamic &&
            ((void 0 === this.Listener.ScrollViewActor &&
              void 0 === t.ScrollViewActor &&
              void 0 === this.Listener.LayoutActor &&
              void 0 === t.LayoutActor) ||
              this.Listener.ScrollViewActor !== t.ScrollViewActor ||
              this.Listener.LayoutActor !== t.LayoutActor))))
    );
  }
  OnInit() {}
  OnStart() {}
  OnClear() {}
  GetType() {
    return this.E9;
  }
}
exports.NavigationSelectableBase = NavigationSelectableBase;
//# sourceMappingURL=NavigationSelectableBase.js.map
