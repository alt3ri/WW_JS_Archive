"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentDropDownItem = void 0);
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase");
const VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments), (this.PPt = void 0);
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
    (this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(2),
    )),
      this.PPt.Init();
    const t = e;
    let i = [];
    let o = "";
    (o =
      e > 0
        ? ((i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
              e,
              0,
            )),
          (e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
              e,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            e.FetterGroupName,
          ) ?? "")
        : ((i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
              0,
              0,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_FilterTextAllVisionFetter_Text",
          ) ?? "")),
      this.GetText(3).SetText(i.length.toString()),
      this.GetText(1).SetText(o);
    e = t
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(t)
      : void 0;
    this.PPt.Update(e), this.PPt.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.PPt?.Destroy();
  }
}
exports.VisionEquipmentDropDownItem = VisionEquipmentDropDownItem;
// # sourceMappingURL=VisionEquipmentDropDownItem.js.map
