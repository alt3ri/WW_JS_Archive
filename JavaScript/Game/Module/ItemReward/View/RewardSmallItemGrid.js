"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardSmallItemGrid = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RewardSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(o, a, e) {
    var r = o.GetConfig(),
      t = o.ConfigId;
    let i = void 0,
      m = void 0,
      d = void 0;
    switch (o.GetDropItemType()) {
      case 1:
        (i = "Reward_Tag_Extra"),
          (m = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Extra_Bg_Color",
          )),
          (d = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Extra_Text_Color",
          ));
        break;
      case 2:
        (i = "Reward_Tag_Magnification"),
          (m = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Magnification_Bg_Color",
          )),
          (d = CommonParamById_1.configCommonParamById.GetStringConfig(
            "Reward_Tag_Magnification_Text_Color",
          ));
    }
    1 === r.ItemDataType
      ? ((r = {
          Data: o,
          Type: 2,
          ItemConfigId: t,
          BottomTextId: (r =
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)).Name,
          QualityId: r.QualityId,
          TopRightTextId: i,
          TopRightTextBgColor: m,
          TopRightTextColor: d,
        }),
        this.Apply(r))
      : ((r = {
          Data: o,
          Type: 4,
          ItemConfigId: t,
          BottomText: "x" + o.Count,
          TopRightTextId: i,
          TopRightTextBgColor: m,
          TopRightTextColor: d,
        }),
        this.Apply(r));
  }
}
exports.RewardSmallItemGrid = RewardSmallItemGrid;
//# sourceMappingURL=RewardSmallItemGrid.js.map
