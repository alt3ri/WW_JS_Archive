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
      (this.Ewt = this.CreateThenShowByResourceIdAsync(
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
    await this.Ewt,
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
      (this.U4e = void 0),
      (this.ywt = void 0),
      (this.Iwt = !1),
      (this.Twt = void 0),
      (this.IsSelectableProp = !0),
      (this.OnToggleClick = (t) => {
        1 === t &&
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          );
      }),
      (this.T7e = () => {
        var t = this.ywt?.(this.PropData.IncId, this.Iwt) ?? !1;
        return (this.Iwt = !1), t;
      }),
      (this.Lwt = e);
  }
  OnStart() {
    this.GetControlItem()?.SetUIActive(!1),
      this.GetSelectItem()?.SetUIActive(!1),
      this.GetSelectableToggle().CanExecuteChange.Bind(this.T7e),
      this.Lwt && (this.Twt = new RoleHead(this.GetRootItem()));
  }
  SetToggleStateForce(t, e = !1) {
    var s = this.GetSelectableToggle();
    s && (t !== s.GetToggleState() && (this.Iwt = !0), s.SetToggleState(t, e));
  }
  OnBeforeDestroy() {
    this.GetSelectableToggle()?.CanExecuteChange.Unbind(),
      this.Twt?.Destroy(),
      (this.Twt = void 0);
  }
  OnRefresh(t, e) {
    this.SetToggleStateForce(t ? 1 : 0),
      this.ShowDefaultDownText(),
      this.RefreshRightDownLockSprite(this.PropData.GetIsLock()),
      this.Twt?.Update(this.PropData);
  }
  OnSelected(t) {
    t &&
      (this.SetToggleStateForce(1),
      this.SetRoleIconState(),
      this.U4e?.(this.PropData.IncId));
  }
  OnDeselected(t) {
    t && (this.SetToggleStateForce(0), this.SetRoleIconState());
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetCanExecuteChange(t) {
    this.ywt = t;
  }
  GetPropData() {
    return this.PropData;
  }
}
exports.SelectablePropClickItem = SelectablePropClickItem;
//# sourceMappingURL=SelectablePropClickItem.js.map
