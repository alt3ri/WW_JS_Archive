"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentDropDownTitleItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const TitleItemBase_1 = require("../../../Common/DropDown/Item/TitleItemBase");
const VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDropDownTitleItem extends TitleItemBase_1.TitleItemBase {
  constructor() {
    super(...arguments), (this.PPt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  ShowTemp(e, t) {
    (this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(1),
    )),
      this.PPt.Init().finally(() => {});
    const i = e;
    let r = "";
    (r =
      e > 0
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
    this.PPt.Update(e), this.PPt.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.PPt?.Destroy();
  }
}
exports.VisionEquipmentDropDownTitleItem = VisionEquipmentDropDownTitleItem;
// # sourceMappingURL=VisionEquipmentDropDownTitleItem.js.map
