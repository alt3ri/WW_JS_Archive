"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelegationData = void 0);
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  LevelGeneralCommons_1 = require("../../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class DelegationData {
  constructor(e, t, r) {
    (this.Id = 0),
      (this.Vke = 0),
      (this.IsVisible = !1),
      (this.Id = e),
      (this.Vke = t),
      (this.IsVisible = r);
  }
  GetConsumeList() {
    var e,
      t,
      r = [];
    for ([
      e,
      t,
    ] of ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Id,
    ).Consume)
      r.push({ ItemId: e, Count: t });
    return r;
  }
  GetRecommendList() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Id,
    ).CapacityMap.keys())
      e.push(t);
    return e;
  }
  GetLockText() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
        this.Id,
      ),
      e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
        e.UnlockCondition,
      );
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  HasBestEvaluate() {
    return 0 < this.Vke;
  }
  SetBestEvaluateLevel(e) {
    this.Vke > e || (this.Vke = e);
  }
  get BestEvaluateLevel() {
    return this.Vke;
  }
  GetNotEnoughConsumeItemId() {
    for (const e of this.GetConsumeList())
      if (
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          e.ItemId,
        ) < e.Count
      )
        return e.ItemId;
    return -1;
  }
}
exports.DelegationData = DelegationData;
//# sourceMappingURL=DelegationData.js.map
