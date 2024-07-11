"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManufactureMaterialItem = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ManufactureMaterialItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.dqt = void 0), (this.Byi = 0);
  }
  OnRefresh(e, t, i) {
    const r = { Type: 4, Data: (this.dqt = e), BottomText: this.byi() };
    e.m3n && (r.ItemConfigId = e.G3n),
      this.Apply(r),
      this.SetIsPhantomLock(!e.m3n),
      this.SetSelected(!1);
  }
  byi() {
    if (!this.dqt) return "";
    if (this.dqt.m3n) {
      const t = this.dqt.k4n * this.Byi;
      const i =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.dqt.G3n,
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
    (this.Byi = e), this.SetBottomText(this.byi());
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
}
exports.ManufactureMaterialItem = ManufactureMaterialItem;
// # sourceMappingURL=ManufactureMaterialItem.js.map
