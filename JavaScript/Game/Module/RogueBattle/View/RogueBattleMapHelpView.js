"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapHelpView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleEnvironmentBuffItem_1 = require("../Component/RogueBattleEnvironmentBuffItem");
class RogueBattleMapHelpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.KI1 = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIGridLayout],
      [1, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    this.KI1 = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(0),
      () =>
        new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithTexture(),
    );
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig(),
      i = t.MainHelpImageDesc.length,
      r = [];
    for (let e = 0; e < i; e++) {
      var a = {
        Icon: t.MainHelpImageFig[e],
        TextId: t.MainHelpImageDesc[e],
        Param: [],
      };
      r.push(a);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.MainHelpRuleDesc),
      await this.KI1.RefreshByDataAsync(r);
  }
}
exports.RogueBattleMapHelpView = RogueBattleMapHelpView;
//# sourceMappingURL=RogueBattleMapHelpView.js.map
