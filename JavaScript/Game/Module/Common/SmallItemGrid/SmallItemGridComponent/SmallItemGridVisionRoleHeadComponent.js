"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridVisionRoleHeadComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
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
      var t = e;
      if (t && 0 !== t) {
        const r = this.GetTexture(0);
        var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
        i
          ? (r.SetUIActive(!1),
            this.SetRoleIcon(i, r, t, void 0, () => {
              r.SetUIActive(!0);
            }),
            this.qwt(e),
            this.Gwt(e),
            this.SetActive(!0))
          : this.SetActive(!1);
      } else this.SetActive(!1);
    } else this.SetActive(!1);
  }
  qwt(e) {
    this.GetSprite(2).SetUIActive(!1);
  }
  Gwt(e) {
    this.GetSprite(1).SetUIActive(!0);
  }
}
exports.SmallItemGridVisionRoleHeadComponent =
  SmallItemGridVisionRoleHeadComponent;
//# sourceMappingURL=SmallItemGridVisionRoleHeadComponent.js.map
