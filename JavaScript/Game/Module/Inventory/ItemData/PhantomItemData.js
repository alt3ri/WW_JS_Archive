"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomItemData = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  AttributeItemData_1 = require("./AttributeItemData");
class PhantomItemData extends AttributeItemData_1.AttributeItemData {
  constructor() {
    super(...arguments), (this.XVa = 0);
  }
  SetFetterGroupId(e) {
    this.XVa = e;
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(
      this.ConfigId,
    );
  }
  GetMainType() {
    return 3;
  }
  GetType() {
    return 9;
  }
  GetQuality() {
    return this.GetConfig()?.QualityId;
  }
  GetSortIndex() {
    return this.GetConfig()?.SortIndex;
  }
  GetItemAccess() {
    return this.GetConfig()?.ItemAccess;
  }
  GetMaxStackCount() {
    return 1;
  }
  OnSetFunctionValue(e) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
      this.UniqueId,
    );
    t && t.OnFunctionValueChange(e);
  }
  GetDefaultDownText() {
    var e =
      ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
        "VisionLevel",
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetRedDotDisableRule() {
    return this.GetConfig().RedDotDisableRule;
  }
  GetFetterGroupConfig() {
    var e;
    return 0 !== this.XVa
      ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
          this.XVa,
        )
      : void 0 !==
          (e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              this.UniqueId,
            ))
        ? e.GetFetterGroupConfig()
        : void 0;
  }
}
exports.PhantomItemData = PhantomItemData;
//# sourceMappingURL=PhantomItemData.js.map
