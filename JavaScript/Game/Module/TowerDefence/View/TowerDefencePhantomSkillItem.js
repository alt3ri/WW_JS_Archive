"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefensePhantomSkillItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDefensePhantomSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, e, i) {
    var r = this.GetText(0);
    StringUtils_1.StringUtils.IsEmpty(t.SkillTextId)
      ? r?.SetUIActive(!1)
      : (r?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.SkillTextId)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Text_InstanceDungeonRecommendLevel_Text",
        t.Level,
      ),
      t.DescriptionArgs
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            t.DescriptionTextId,
            ...t.DescriptionArgs,
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            t.DescriptionTextId,
          );
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
