"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkGravityReverseIconComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  MarkPanelBase_1 = require("../MarkPanelBase");
class MarkGravityReverseIconComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.QCc = 1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(!1), this.ehi();
  }
  ehi() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      1 === this.Gravity ? "SP_OverviewDown" : "SP_OverviewUp",
    );
    this.SetSpriteByPath(e, this.GetSprite(0), !1, void 0, () => {
      this.GetSprite(0).SetUIActive(!0);
    });
  }
  set Gravity(e) {
    (this.QCc = e), this.GetSprite(0) && this.ehi();
  }
  get Gravity() {
    return this.QCc;
  }
}
exports.MarkGravityReverseIconComponent = MarkGravityReverseIconComponent;
//# sourceMappingURL=MarkGravityReverseIconComponent.js.map
