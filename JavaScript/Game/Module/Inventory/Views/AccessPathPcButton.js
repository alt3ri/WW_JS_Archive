"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AccessPathPcButton = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AccessPathPcButton extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.Pci = t),
      this.CreateThenShowByResourceIdAsync(
        "UiItem_PcAccessPathButton_Prefab",
        e,
        !1,
      );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    let e;
    let t = ConfigManager_1.ConfigManager.InventoryConfig.GetAccessPathConfig(
      this.Pci,
    );
    t && ((e = this.GetText(0)), (t = t.Description), e.ShowTextNew(t));
  }
}
exports.AccessPathPcButton = AccessPathPcButton;
// # sourceMappingURL=AccessPathPcButton.js.map
