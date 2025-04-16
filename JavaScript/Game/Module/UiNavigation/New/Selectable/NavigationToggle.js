"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationToggle = void 0);
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiNavigationViewManager_1 = require("../UiNavigationViewManager"),
  NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationToggle extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments),
      (this.gBo = (e) => {
        UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKeyTextId();
      }),
      (this.Bke = (e) => {
        this.OnToggleClick(e);
      });
  }
  OnInit() {
    this.fBo(), this.pBo();
  }
  OnClear() {
    this.vBo(), this.MBo();
  }
  fBo() {
    var e = this.Selectable;
    0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
      e.OnStateChange.Add(this.gBo);
  }
  vBo() {
    var e = this.Selectable;
    0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
      e.OnStateChange.Remove(this.gBo);
  }
  pBo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Add(this.Bke);
  }
  MBo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Remove(this.Bke);
  }
  OnToggleClick(e) {}
  NeedAddToggleClick() {
    return "Toggle" !== this.GetType();
  }
  OnCanFocusInScrollOrLayout() {
    var e;
    return (
      !!this.IsInteractive &&
      !(
        (1 !== (e = this.Selectable).ToggleState && e.bCheckToggleSelected) ||
        !this.Selectable.RootUIComp.IsUIActiveInHierarchy()
      )
    );
  }
  OnGetTipsTextId() {
    return 1 === this.Selectable.ToggleState
      ? this.Listener.HotKeyTipsTextIdMap.Get(2)
      : this.Listener.HotKeyTipsTextIdMap.Get(1);
  }
  OnHandlePointerEnter(e) {
    return !this.Selectable.bToggleOnSelect;
  }
  OnHandlePointerSelect(e) {
    var t;
    return (
      !!this.OnHandlePointerSelectInheritance(e) &&
      (0 === (t = this.Selectable).ToggleState
        ? (e &&
            1 === e.inputType &&
            t.bToggleOnSelect &&
            t.SetToggleState(1, !0),
          this.Listener.ScrollView &&
            this.Listener.ScrollView.ScrollToSelectableComponent(t))
        : 2 === t.ToggleState
          ? (this.Listener.ScrollView &&
              this.Listener.ScrollView.ScrollToSelectableComponent(t),
            e &&
              1 === e.inputType &&
              t.bToggleOnSelect &&
              ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulateClickItem(
                t.RootUIComp,
              ))
          : this.Listener.ScrollView &&
            this.Listener.ScrollView.ScrollToSelectableComponent(t),
      !!this.IsAllowNavigationByGroup())
    );
  }
  OnHandlePointerSelectInheritance(e) {
    return !0;
  }
}
exports.NavigationToggle = NavigationToggle;
//# sourceMappingURL=NavigationToggle.js.map
