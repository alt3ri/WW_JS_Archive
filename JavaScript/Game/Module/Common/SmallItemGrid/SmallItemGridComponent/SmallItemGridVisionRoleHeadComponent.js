"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridVisionRoleHeadComponent = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisionRoleHeadComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  GetResourceId() {
    return "UiItem_ItemRoleS";
  }
  OnRefresh(e) {
    if (e) {
      const t = e;
      if (t && t !== 0) {
        const r = this.GetTexture(0);
        const i =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
        i
          ? (r.SetUIActive(!1),
            this.SetRoleIcon(i, r, t, void 0, () => {
              r.SetUIActive(!0);
            }),
            this.wxt(e),
            this.Bxt(e),
            this.SetActive(!0))
          : this.SetActive(!1);
      } else this.SetActive(!1);
    } else this.SetActive(!1);
  }
  wxt(e) {
    this.GetSprite(2).SetUIActive(!1);
  }
  Bxt(e) {
    this.GetSprite(1).SetUIActive(!0);
  }
}
exports.SmallItemGridVisionRoleHeadComponent =
  SmallItemGridVisionRoleHeadComponent;
// # sourceMappingURL=SmallItemGridVisionRoleHeadComponent.js.map
