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
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(!0),
      this.GetText(3).SetUIActive(!1),
      this.GetSprite(4).SetUIActive(!1);
  }
  RefreshRoleId(e) {
    var s,
      r = this.GetTexture(1),
      t = this.GetSprite(0);
    e
      ? (r.SetUIActive(!0),
        t.SetUIActive(!0),
        (s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        this.SetRoleIcon(s.RoleHeadIconBig, r, e),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(
          s.QualityId,
        )),
        this.SetSpriteByPath(e.Image, t, !1))
      : (r.SetUIActive(!1), t.SetUIActive(!1));
  }
}
exports.TowerRoleComplexItem = TowerRoleComplexItem;
//# sourceMappingURL=TowerRoleComplexItem.js.map
