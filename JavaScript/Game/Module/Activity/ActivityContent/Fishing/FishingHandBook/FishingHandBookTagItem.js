"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookTagItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingHandBookTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  Refresh(e, i, r) {
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(e);
    e &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
      (e = UE.Color.FromHex(e.Color)),
      this.GetItem(1).SetColor(e));
  }
}
exports.FishingHandBookTagItem = FishingHandBookTagItem;
//# sourceMappingURL=FishingHandBookTagItem.js.map
