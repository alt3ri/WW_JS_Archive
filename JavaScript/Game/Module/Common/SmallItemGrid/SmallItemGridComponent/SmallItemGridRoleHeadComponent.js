"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridRoleHeadComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridRoleHeadComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    this.qwt(), this.Gwt();
  }
  GetResourceId() {
    return "UiItem_ItemRoleS";
  }
  OnRefresh(e) {
    if (e) {
      const i = this.GetTexture(0);
      var t =
        ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(e)?.Card;
      t
        ? (i.SetUIActive(!1),
          this.SetRoleSkinIcon(t, i, e, void 0, () => {
            i.SetUIActive(!0);
          }),
          this.SetActive(!0))
        : this.SetActive(!1);
    } else this.SetActive(!1);
  }
  qwt() {
    var e = this.GetSprite(2),
      t =
        (e.SetUIActive(!0),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgA());
    this.SetSpriteByPath(t, e, !1);
  }
  Gwt() {
    var e = this.GetSprite(1),
      t =
        (e.SetUIActive(!0),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgA());
    this.SetSpriteByPath(t, e, !1);
  }
}
exports.SmallItemGridRoleHeadComponent = SmallItemGridRoleHeadComponent;
//# sourceMappingURL=SmallItemGridRoleHeadComponent.js.map
