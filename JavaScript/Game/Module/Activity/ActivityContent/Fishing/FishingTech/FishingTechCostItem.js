"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechCostItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FishingDefine_1 = require("../FishingDefine");
class FishingTechCostItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  RefreshCost(i, s, n = !0) {
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
    if (r) {
      this.SetTextureByPath(r.IconSmall, this.GetTexture(2));
      r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
      let e = "";
      (e = n
        ? r < s
          ? StringUtils_1.StringUtils.Format(
              FishingDefine_1.FISHING_TECH_MATERIAL_NOT_ENOUGHT,
              s.toString(),
            )
          : StringUtils_1.StringUtils.Format(
              FishingDefine_1.FISHING_TECH_MATERIAL_ENOUGHT,
              s.toString(),
            )
        : "" + s),
        this.GetText(1).SetText("" + e);
    }
  }
}
exports.FishingTechCostItem = FishingTechCostItem;
//# sourceMappingURL=FishingTechCostItem.js.map
