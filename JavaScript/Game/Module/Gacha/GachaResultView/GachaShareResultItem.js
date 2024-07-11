"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaShareResultItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GachaResultItemNew_1 = require("./GachaResultItemNew");
class GachaShareResultItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.xWt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    (this.xWt = new GachaResultItemNew_1.GachaResultItemNew()),
      await this.xWt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e) {
    this.xWt?.Update(e), this.xWt?.RefreshShare();
    (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
      e.u5n.G3n,
    ).QualityId),
      this.GetItem(1).SetUIActive(e < 4),
      this.GetTexture(2).SetUIActive(e >= 4),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        e === 5 ? "UiTexture_ShareFrameGold" : "UiTexture_ShareFramePurple",
      ));
    this.SetTextureByPath(e, this.GetTexture(2));
  }
}
exports.GachaShareResultItem = GachaShareResultItem;
// # sourceMappingURL=GachaShareResultItem.js.map
