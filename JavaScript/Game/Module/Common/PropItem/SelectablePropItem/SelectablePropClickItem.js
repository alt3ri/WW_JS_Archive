"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropClickItem = exports.RoleHead = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  SelectablePropItemBase_1 = require("./SelectablePropItemBase");
class RoleHead extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.TBt = this.CreateThenShowByResourceIdAsync(
        "UiItem_ItemRole",
        t,
        !0,
      ));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UITexture]]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    var t = this.GetRootItem();
    t.SetAnchorAlign(1, 1),
      t.SetPivot(new UE.Vector2D(0, 1)),
      t.SetUIRelativeLocation(new UE.Vector(11, -13, 0));
  }
  async Update(t) {
    var e;
    await this.TBt,
      0 === t.RoleId
        ? this.SetActive(!1)
        : (this.SetActive(!0),
          (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            t.RoleId,
          )),
          this.SetRoleIcon(e.RoleHeadIcon, this.GetTexture(0), t.RoleId));
  }
}
exports.RoleHead = RoleHead;
class SelectablePropClickItem extends SelectablePropItemBase_1.SelectablePropItemBase {
  constructor(t = 1, e = !1) {
    super(t),
      (this.j5e = void 0),
      (this.LBt = void 0),
      (this.DBt = !1),
      (this.RBt = void 0),
      (this.IsSelectableProp = !0),
      (this.OnToggleClick = (t) => {
        1 === t &&
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          );
      }),
      (this.Lke = () => {
        var t = this.LBt?.(this.PropData.IncId, this.DBt) ?? !1;
        return (this.DBt = !1), t;
      }),
      (this.UBt = e);
  }
  OnStart() {
    this.GetControlItem()?.SetUIActive(!1),
      this.GetSelectItem()?.SetUIActive(!1),
      this.GetSelectableToggle().CanExecuteChange.Bind(this.Lke),
      this.UBt && (this.RBt = new RoleHead(this.GetRootItem()));
  }
  SetToggleStateForce(t, e = !1) {
    var s = this.GetSelectableToggle();
    s && (t !== s.GetToggleState() && (this.DBt = !0), s.SetToggleState(t, e));
  }
  OnBeforeDestroy() {
    this.GetSelectableToggle()?.CanExecuteChange.Unbind(),
      this.RBt?.Destroy(),
      (this.RBt = void 0);
  }
  OnRefresh(t, e) {
    this.SetToggleStateForce(t ? 1 : 0),
      this.ShowDefaultDownText(),
      this.RefreshRightDownLockSprite(this.PropData.GetIsLock()),
      this.RBt?.Update(this.PropData);
  }
  OnSelected(t) {
    t &&
      (this.SetToggleStateForce(1),
      this.SetRoleIconState(),
      this.j5e?.(this.PropData.IncId));
  }
  OnDeselected(t) {
    t && (this.SetToggleStateForce(0), this.SetRoleIconState());
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteChange(t) {
    this.LBt = t;
  }
  GetPropData() {
    return this.PropData;
  }
}
exports.SelectablePropClickItem = SelectablePropClickItem;
//# sourceMappingURL=SelectablePropClickItem.js.map
