"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueInfoViewRoleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class WeeklyRogueInfoViewRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnSelectedCallback = void 0),
      (this.eTt = () => {
        this.OnSelectedCallback?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[4, this.eTt]]);
  }
  Refresh(e, t, i) {
    var r,
      o,
      s,
      n,
      e = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e);
    void 0 !== e &&
      (this.SetRoleSkinIcon(
        e.GetRoleConfig().RoleHeadIconBig,
        this.GetTexture(0),
        e.GetRoleSkinId(),
      ),
      (e = e.GetRoleConfig().QualityId),
      (r = this.GetSprite(1)),
      (o = this.GetSprite(2)),
      (n = this.GetSprite(3)),
      (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconBgUnCheckedUnHover" + e,
      )),
      this.SetSpriteByPath(s, n, !1),
      (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconBgUnCheckedHover" + e,
      )),
      this.SetSpriteByPath(s, o, !1),
      (n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_RoleIconBgChecked" + e,
      )),
      this.SetSpriteByPath(n, r, !1));
  }
  OnSelected(e) {
    this.GetExtendToggle(4).SetToggleState(1),
      e && this.OnSelectedCallback?.(this.GridIndex);
  }
  OnDeselected(e) {
    this.GetExtendToggle(4).SetToggleState(0);
  }
}
exports.WeeklyRogueInfoViewRoleItem = WeeklyRogueInfoViewRoleItem;
//# sourceMappingURL=WeeklyRogueInfoViewRoleItem.js.map
