"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridVisionFetterComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisionFetterComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  constructor() {
    super(...arguments), (this.bxt = void 0);
  }
  GetResourceId() {
    return "UiItem_ItemBElementB";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(0),
    )),
      await this.bxt.Init().finally(() => {
        this.GetItem(0).SetUIActive(!0);
      });
  }
  OnRefresh(e) {
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e);
    this.SetActive(!0), this.bxt.Update(e);
  }
}
exports.SmallItemGridVisionFetterComponent = SmallItemGridVisionFetterComponent;
//# sourceMappingURL=SmallItemGridVisionFetterComponent.js.map
