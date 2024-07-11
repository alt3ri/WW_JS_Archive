"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentDropDownTitleItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase"),
  VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDropDownTitleItem extends TitleItemBase_1.TitleItemBase {
  constructor() {
    super(...arguments), (this.bxt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  ShowTemp(e, t) {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(1),
    )),
      this.bxt.Init().finally(() => {});
    var i = e;
    let r = "";
    (r =
      0 < e
        ? ((e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
              e,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            e.FetterGroupName,
          ) ?? "")
        : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_FilterTextAllVisionFetter_Text",
          ) ?? ""),
      this.GetText(0).SetText(r);
    e = i
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(i)
      : void 0;
    this.bxt.Update(e), this.bxt.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.bxt?.Destroy();
  }
}
exports.VisionEquipmentDropDownTitleItem = VisionEquipmentDropDownTitleItem;
//# sourceMappingURL=VisionEquipmentDropDownTitleItem.js.map
