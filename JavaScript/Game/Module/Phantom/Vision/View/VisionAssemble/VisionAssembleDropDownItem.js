"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAssembleDropDownItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  DropDownItemBase_1 = require("../../../../Common/DropDown/Item/DropDownItemBase"),
  VisionFetterSuitItem_1 = require("../VisionFetterSuitItem");
class VisionAssembleDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments), (this.bxt = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = []);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  OnShowDropDownItemBase(e) {
    (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(2),
    )),
      this.bxt.Init();
    var t = e;
    let i = "";
    (i =
      0 < e
        ? ((e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
              e,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            e.FetterGroupName,
          ) ?? "")
        : (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_FilterTextAllVisionFetter_Text",
          ) ?? "")),
      this.GetText(1).SetText(i),
      this.GetText(3).SetText("");
    e = t
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t)
      : void 0;
    this.bxt.Update(e), this.bxt.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.bxt?.Destroy();
  }
}
exports.VisionAssembleDropDownItem = VisionAssembleDropDownItem;
//# sourceMappingURL=VisionAssembleDropDownItem.js.map
