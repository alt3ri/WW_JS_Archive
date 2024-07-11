"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationToggle = void 0);
const UiNavigationViewManager_1 = require("../UiNavigationViewManager"),
  NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationToggle extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments),
      (this.gBo = (t) => {
        UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKeyTextId();
      }),
      (this.Bke = (t) => {
        this.OnToggleClick(t);
      });
  }
  OnInit() {
    this.fBo(), this.pBo();
  }
  OnClear() {
    this.vBo(), this.MBo();
  }
  fBo() {
    var t = this.Selectable;
    0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
      t.OnStateChange.Add(this.gBo);
  }
  vBo() {
    var t = this.Selectable;
    0 < this.Listener.HotKeyTipsTextIdMap.Num() &&
      t.OnStateChange.Remove(this.gBo);
  }
  pBo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Add(this.Bke);
  }
  MBo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Remove(this.Bke);
  }
  OnToggleClick(t) {}
  NeedAddToggleClick() {
    return "Toggle" !== this.GetType();
  }
  OnCanFocusInScrollOrLayout() {
    var t;
    return (
      !!this.IsInteractive &&
      !(
        (1 !== (t = this.Selectable).ToggleState && t.bCheckToggleSelected) ||
        !this.Selectable.RootUIComp.IsUIActiveInHierarchy()
      )
    );
  }
  OnGetTipsTextId() {
    return 1 === this.Selectable.ToggleState
      ? this.Listener.HotKeyTipsTextIdMap.Get(2)
      : this.Listener.HotKeyTipsTextIdMap.Get(1);
  }
  OnHandlePointerEnter(t) {
    return !this.Selectable.bToggleOnSelect;
  }
  OnHandlePointerSelect(t) {
    var e;
    return (
      !!this.OnHandlePointerSelectInheritance(t) &&
      (0 === (e = this.Selectable).ToggleState &&
        t &&
        1 === t.inputType &&
        e.bToggleOnSelect &&
        e.SetToggleState(1, !0),
      this.Listener.ScrollView &&
        this.Listener.ScrollView.ScrollToSelectableComponent(e),
      !!this.IsAllowNavigationByGroup())
    );
  }
  OnHandlePointerSelectInheritance(t) {
    return !0;
  }
}
exports.NavigationToggle = NavigationToggle;
//# sourceMappingURL=NavigationToggle.js.map
