"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineMaterialItem = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class VisionRefineMaterialItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, r, o) {
    var i = e.Count,
      t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        e.ItemId,
      );
    let n = StringUtils_1.EMPTY_STRING;
    i <= 0
      ? (n = t.toString())
      : t < i
        ? (n = StringUtils_1.StringUtils.Format(
            CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN,
            t.toString(),
            i.toString(),
          ))
        : i <= t &&
          (n = StringUtils_1.StringUtils.Format(
            CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN,
            t.toString(),
            i.toString(),
          ));
    t = { Data: e, Type: 4, ItemConfigId: e.ItemId, BottomText: n };
    this.Apply(t);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      e.ItemId,
    );
  }
}
exports.VisionRefineMaterialItem = VisionRefineMaterialItem;
//# sourceMappingURL=VisionRefineMaterialItem.js.map
