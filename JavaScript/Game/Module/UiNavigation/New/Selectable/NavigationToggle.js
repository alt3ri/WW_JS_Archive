"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationToggle = void 0);
const UiNavigationViewManager_1 = require("../UiNavigationViewManager");
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationToggle extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments),
      (this.pwo = (t) => {
        UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKeyTextId();
      }),
      (this.x4e = (t) => {
        this.OnToggleClick(t);
      });
  }
  OnInit() {
    this.vwo(), this.Mwo();
  }
  OnClear() {
    this.Swo(), this.Ewo();
  }
  vwo() {
    const t = this.Selectable;
    this.Listener.HotKeyTipsTextIdMap.Num() > 0 &&
      t.OnStateChange.Add(this.pwo);
  }
  Swo() {
    const t = this.Selectable;
    this.Listener.HotKeyTipsTextIdMap.Num() > 0 &&
      t.OnStateChange.Remove(this.pwo);
  }
  Mwo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Add(this.x4e);
  }
  Ewo() {
    this.NeedAddToggleClick() && this.Selectable.OnStateChange.Remove(this.x4e);
  }
  OnToggleClick(t) {}
  NeedAddToggleClick() {
    return this.GetType() !== "Toggle";
  }
  OnCanFocusInScrollOrLayout() {
    let t;
    return (
      !!this.IsInteractive &&
      !(
        ((t = this.Selectable).ToggleState !== 1 && t.bCheckToggleSelected) ||
        !this.Selectable.RootUIComp.IsUIActiveInHierarchy()
      )
    );
  }
  OnGetTipsTextId() {
    return this.Selectable.ToggleState === 1
      ? this.Listener.HotKeyTipsTextIdMap.Get(2)
      : this.Listener.HotKeyTipsTextIdMap.Get(1);
  }
  OnHandlePointerEnter(t) {
    return !this.Selectable.bToggleOnSelect;
  }
  OnHandlePointerSelect(t) {
    let e;
    return (
      !!this.OnHandlePointerSelectInheritance(t) &&
      ((e = this.Selectable).ToggleState === 0 &&
        t &&
        t.inputType === 1 &&
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
// # sourceMappingURL=NavigationToggle.js.map
