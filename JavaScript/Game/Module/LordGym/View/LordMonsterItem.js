"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordMonsterItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LordMonsterItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  SetMonsterInfo(e, t) {
    var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
    var i =
      (this.SetTextureByPath(i, this.GetTexture(2)),
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e));
    this.GetText(0).SetText(i),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Text_InstanceDungeonRecommendLevel_Text",
        t,
      );
  }
}
exports.LordMonsterItem = LordMonsterItem;
// # sourceMappingURL=LordMonsterItem.js.map
