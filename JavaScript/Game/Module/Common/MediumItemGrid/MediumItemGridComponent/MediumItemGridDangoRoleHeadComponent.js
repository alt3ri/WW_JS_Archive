"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridDangoRoleHeadComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridDangoRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
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
    e = e.DangoConfigId;
    if (!e || e <= 0) this.SetActive(!1);
    else {
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(e);
      if (e) {
        const t = this.GetTexture(0);
        t.SetUIActive(!1),
          this.SetTextureByPath(e.Icon, t, void 0, () => {
            t.SetUIActive(!0);
          }),
          t.SetUIActive(!0),
          this.GetSprite(1).SetUIActive(!1),
          this.SetActive(!0);
      } else this.SetActive(!1);
    }
  }
}
exports.MediumItemGridDangoRoleHeadComponent =
  MediumItemGridDangoRoleHeadComponent;
//# sourceMappingURL=MediumItemGridDangoRoleHeadComponent.js.map
