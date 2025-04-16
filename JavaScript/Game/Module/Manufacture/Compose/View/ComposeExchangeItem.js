"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeExchangeItem = void 0);
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  ComposeDefine_1 = require("../ComposeDefine");
class ComposeExchangeItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, i) {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      e.L8n,
    );
    let s = "";
    t = {
      Type: 4,
      Data: e,
      BottomText: (s =
        t < ComposeDefine_1.EXCHANGE_COUNT
          ? StringUtils_1.StringUtils.Format(
              ComposeDefine_1.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN,
              t.toString(),
            )
          : StringUtils_1.StringUtils.Format(
              ComposeDefine_1.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN,
              t.toString(),
            )),
      IsDisable: t < ComposeDefine_1.EXCHANGE_COUNT,
    };
    e.K6n && (t.ItemConfigId = e.L8n),
      this.Apply(t),
      this.SetIsPhantomLock(!e.K6n),
      this.SetSelected(!1);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.ComposeExchangeItem = ComposeExchangeItem;
//# sourceMappingURL=ComposeExchangeItem.js.map
