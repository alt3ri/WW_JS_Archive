"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechLevelUpItem = void 0);
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  FishingDefine_1 = require("../FishingDefine");
class FishingTechLevelUpItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.ETt = 0);
  }
  OnRefresh(r, e, i) {
    (this.ETt = r.ItemId), this.BindOnCanExecuteChange(() => !1);
    var n = r.ItemId,
      o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n);
    if (o) {
      let e = "";
      var t =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n),
        t =
          ((e =
            t < r.ItemNeedNum
              ? StringUtils_1.StringUtils.Format(
                  FishingDefine_1.FISHING_TECH_MATERIAL_NOT_ENOUGHT,
                  t.toString(),
                )
              : StringUtils_1.StringUtils.Format(
                  FishingDefine_1.FISHING_TECH_MATERIAL_WHITE_ENOUGHT,
                  t.toString(),
                )),
          { Type: 4 });
      (t.Type = 4),
        (t.Data = r),
        (t.ItemConfigId = n),
        (t.StarLevel = o.QualityId),
        (t.BottomText = e + "/" + r.ItemNeedNum),
        (t.IsOmitBottomText = !1),
        this.Apply(t);
    }
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      this.ETt,
    );
  }
}
exports.FishingTechLevelUpItem = FishingTechLevelUpItem;
//# sourceMappingURL=FishingTechLevelUpItem.js.map
