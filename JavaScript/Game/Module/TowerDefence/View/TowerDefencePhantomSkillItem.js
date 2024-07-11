"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomSkillItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDefensePhantomSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.SkillTextId),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Text_InstanceDungeonRecommendLevel_Text",
        e.Level,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.DescriptionTextId);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
}
exports.TowerDefensePhantomSkillItem = TowerDefensePhantomSkillItem;
//# sourceMappingURL=TowerDefencePhantomSkillItem.js.map
