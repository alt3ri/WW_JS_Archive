"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleElementItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.plo = void 0),
      (this.vlo = void 0),
      (this.OnToggleCallback = void 0),
      (this.CanToggleChange = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIExtendToggle],
      [4, UE.UIItem],
    ];
    this.BtnBindInfo = [
      [
        3,
        () => {
          this.OnToggleCallback?.(this.GridIndex);
        },
      ],
    ];
  }
  OnStart() {
    this.GetExtendToggle(3)?.CanExecuteChange.Bind(
      () => !this.CanToggleChange || this.CanToggleChange(this.GridIndex),
    );
  }
  Update(t) {
    this.vlo = t;
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        this.vlo.Id,
      ).ElementId,
      e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t);
    this.GetText(2).ShowTextNew(e.Name),
      this.SetElementIcon("", this.GetTexture(1), t),
      this.SetTextureByPath(e.ElementChangeTexture, this.GetTexture(0)),
      this.RefreshState();
  }
  Refresh(t, e, i) {
    (this.vlo = t), this.Update(t);
  }
  RefreshState() {
    var t = this.vlo.Id,
      t = this.plo.GetCurSelectRoleId() === t;
    this.GetItem(4).SetUIActive(t);
  }
  OnSelected(t) {
    this.GetExtendToggle(3)?.SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(3)?.SetToggleState(0);
  }
  SetRoleViewAgent(t) {
    this.plo = t;
  }
}
exports.RoleElementItem = RoleElementItem;
//# sourceMappingURL=RoleElementItem.js.map
