"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MingSuNpcMarkItem = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MingSuNpcMarkItemView_1 = require("../MarkItemView/MingSuNpcMarkItemView"),
  ConfigMarkItem_1 = require("./ConfigMarkItem");
class MingSuNpcMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, a, i, n = 1) {
    super(e, r, t, a, i, n), (this.InnerView = void 0);
  }
  GetMarkItemViewType() {
    return 17;
  }
  CreateView() {
    return new MingSuNpcMarkItemView_1.MingSuNpcMarkItemView(this);
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(
      this.MarkConfigId,
    );
  }
  GamePlayIsFinish() {
    var e = this.MarkConfig,
      r = e.RelativeType;
    if (1 === r && 5 === this.MarkConfig.RelativeSubType)
      return (
        (r = e.RelativeId),
        4 ===
          ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(
            r,
          ).GetDarkCoastDeliveryGuardState()
      );
    return !1;
  }
}
exports.MingSuNpcMarkItem = MingSuNpcMarkItem;
//# sourceMappingURL=MingSuNpcMarkItem.js.map
