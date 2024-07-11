"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridVisionRoleHeadComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisionRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  GetResourceId() {
    return "UiItem_ItemRole";
  }
  OnRefresh(e) {
    var i = e.RoleConfigId;
    if (i) {
      const r = this.GetTexture(0);
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)?.Card;
      t
        ? (r.SetUIActive(!1),
          this.SetRoleIcon(t, r, i, void 0, () => {
            r.SetUIActive(!0);
          }),
          this.wxt(e),
          this.Bxt(e),
          this.SetActive(!0))
        : this.SetActive(!1);
    } else this.SetActive(!1);
  }
  wxt(i) {
    i = i.VisionUniqueId;
    if (
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)
    ) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      let e = "";
      (e = i
        ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgB()
        : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgA()),
        this.SetSpriteByPath(e, this.GetSprite(2), !1);
    }
    this.GetSprite(2).SetUIActive(!0);
  }
  Bxt(i) {
    i = i.VisionUniqueId;
    if (
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)
    ) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      let e = "";
      (e = i
        ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgB()
        : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgA()),
        this.SetSpriteByPath(e, this.GetSprite(1), !1);
    }
    this.GetSprite(1).SetUIActive(!0);
  }
}
exports.MediumItemGridVisionRoleHeadComponent =
  MediumItemGridVisionRoleHeadComponent;
//# sourceMappingURL=MediumItemGridVisionRoleHeadComponent.js.map
