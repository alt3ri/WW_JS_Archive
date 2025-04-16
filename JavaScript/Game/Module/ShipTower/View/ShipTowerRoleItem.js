"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRoleItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0), (this.ClickCallBack = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.GetButton(0).SetSelfInteractive(!1);
  }
  Refresh(e) {
    var r, t;
    (this.fGt = e),
      this.va_(!1),
      e.RoleIdEdit &&
        ((r = (e =
          (t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            e.RoleIdEdit,
          ))?.GetRoleConfig() ??
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.RoleIdEdit))
          .RoleHeadIconCircle),
        (t = t?.GetRoleSkinId() ?? e.SkinId),
        this.SetRoleSkinIcon(
          r,
          this.GetTexture(2),
          t,
          void 0,
          this.va_.bind(this, !0),
        ),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerRoleItem", [
          "Refresh",
          this.fGt,
        ]);
  }
  va_(e) {
    this.GetTexture(2).SetUIActive(e), this.GetSprite(1).SetUIActive(!e);
  }
}
exports.ShipTowerRoleItem = ShipTowerRoleItem;
//# sourceMappingURL=ShipTowerRoleItem.js.map
