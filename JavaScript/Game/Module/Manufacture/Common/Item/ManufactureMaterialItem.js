"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManufactureMaterialItem = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ManufactureMaterialItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.fGt = void 0), (this.BIi = 0);
  }
  OnRefresh(e, t, i) {
    var r = { Type: 4, Data: (this.fGt = e), BottomText: this.bIi() };
    e.G6n && (r.ItemConfigId = e.f8n),
      this.Apply(r),
      this.SetIsPhantomLock(!e.G6n),
      this.SetSelected(!1);
  }
  bIi() {
    if (!this.fGt) return "";
    if (this.fGt.G6n) {
      var t = this.fGt.MVn * this.BIi,
        i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.fGt.f8n,
        );
      let e = "";
      return (e =
        i < t
          ? StringUtils_1.StringUtils.Format(
              CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN,
              i.toString(),
              t.toString(),
            )
          : StringUtils_1.StringUtils.Format(
              CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN,
              i.toString(),
              t.toString(),
            ));
    }
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "Text_ItemSelectCookUnlock_text",
    );
  }
  SetTimes(e) {
    (this.BIi = e), this.SetBottomText(this.bIi());
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.ManufactureMaterialItem = ManufactureMaterialItem;
//# sourceMappingURL=ManufactureMaterialItem.js.map
