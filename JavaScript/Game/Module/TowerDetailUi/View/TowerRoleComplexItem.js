"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRoleComplexItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerRoleComplexItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!1);
  }
  RefreshRoleId(e) {
    var r,
      s = this.GetTexture(1),
      t = this.GetSprite(0);
    e
      ? (s.SetUIActive(!0),
        t.SetUIActive(!0),
        (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        this.SetRoleIcon(r.RoleHeadIconBig, s, e),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(
          r.QualityId,
        )),
        this.SetSpriteByPath(e.Image, t, !1))
      : (s.SetUIActive(!1), t.SetUIActive(!1));
  }
}
exports.TowerRoleComplexItem = TowerRoleComplexItem;
//# sourceMappingURL=TowerRoleComplexItem.js.map
