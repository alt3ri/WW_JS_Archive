"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShareRewardInfo = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ShareRewardInfo extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  SetItemInfo(e, a) {
    this.GetText(1).SetText(a.toString()), this.GetTexture(2).SetUIActive(!1);
    a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).Icon;
    this.SetTextureByPath(a, this.GetTexture(2), void 0, () => {
      this.GetTexture(2).SetUIActive(!0);
    });
  }
}
exports.ShareRewardInfo = ShareRewardInfo;
//# sourceMappingURL=ShareRewardInfo.js.map
