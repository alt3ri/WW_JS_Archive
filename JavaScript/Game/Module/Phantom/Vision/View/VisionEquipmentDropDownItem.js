"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionEquipmentDropDownItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  DropDownItemBase_1 = require("../../../Common/DropDown/Item/DropDownItemBase"),
  VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionEquipmentDropDownItem extends DropDownItemBase_1.DropDownItemBase {
  constructor() {
    super(...arguments), (this.ko_ = 0), (this.bxt = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  GetDropDownToggle() {
    return this.GetExtendToggle(0);
  }
  SetRoleId(e) {
    this.ko_ = e;
  }
  OnShowDropDownItemBase(t) {
    var e =
      ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(
        this.ko_,
      );
    let i = !1;
    e &&
      0 < e.length &&
      (i = !!e.find((e) => e.GetRecommendFetterGroupId() === t)),
      this.GetItem(4).SetUIActive(i),
      (this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
        this.GetItem(2),
      )),
      this.bxt.Init();
    e = t;
    let o = [],
      r = "";
    (r =
      0 < t
        ? ((o =
            ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
              t,
              0,
            )),
          (n =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
              t,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            n.FetterGroupName,
          ) ?? "")
        : ((o =
            ModelManager_1.ModelManager.PhantomBattleModel.GetVisionSortUseDataList(
              0,
              0,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_FilterTextAllVisionFetter_Text",
          ) ?? "")),
      this.GetText(3).SetText(o.length.toString()),
      this.GetText(1).SetText(r);
    var n = e
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e)
      : void 0;
    this.bxt.Update(n), this.bxt.SetActive(!0);
  }
  OnBeforeDestroy() {
    this.bxt?.Destroy();
  }
}
exports.VisionEquipmentDropDownItem = VisionEquipmentDropDownItem;
//# sourceMappingURL=VisionEquipmentDropDownItem.js.map
