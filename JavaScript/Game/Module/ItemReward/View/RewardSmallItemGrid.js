"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardSmallItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RewardSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, o) {
    var r = e.GetConfig(),
      a = e.ConfigId;
    1 === r.ItemDataType
      ? ((r = {
          Data: e,
          Type: 2,
          ItemConfigId: a,
          BottomTextId: (r =
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a)).Name,
          QualityId: r.QualityId,
        }),
        this.Apply(r))
      : ((r = { Data: e, Type: 4, ItemConfigId: a, BottomText: "x" + e.Count }),
        this.Apply(r));
  }
}
exports.RewardSmallItemGrid = RewardSmallItemGrid;
//# sourceMappingURL=RewardSmallItemGrid.js.map
