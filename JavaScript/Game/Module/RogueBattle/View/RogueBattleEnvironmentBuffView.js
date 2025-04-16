"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleEnvironmentBuffView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleEnvironmentBuffItem_1 = require("../Component/RogueBattleEnvironmentBuffItem");
class RogueBattleEnvironmentBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.Zv1 = void 0), (this.ey1 = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIVerticalLayout],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Zv1 = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      () =>
        new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithTexture(),
    )),
      (this.ey1 = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        () =>
          new RogueBattleEnvironmentBuffItem_1.RogueBattleEnvironmentBuffItemWithSprite(),
      )),
      await this.RefreshView();
  }
  async RefreshView() {
    var e = this.OpenParam,
      t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(e);
    if (t) {
      var i = [];
      for (let e = 0; e < t.EnvDesc.length; e++) {
        var n = t.EnvDesc[e],
          r = t.EnvDescParams[e];
        i.push({
          TextId: n,
          Param: r ? r.split("#") : [],
          Icon: t.EnvFig[e] || "",
        });
      }
      var a = [];
      for (let e = 0; e < t.MonsterDesc.length; e++) {
        var o = t.MonsterDesc[e],
          s = t.MonsterDescParams[e];
        a.push({
          TextId: o,
          Param: s ? s.split("#") : [],
          Icon: t.MonsterFig[e] || "",
        });
      }
      await Promise.all([
        this.Zv1.RefreshByDataAsync(i),
        this.ey1.RefreshByDataAsync(a),
      ]);
    }
  }
}
exports.RogueBattleEnvironmentBuffView = RogueBattleEnvironmentBuffView;
//# sourceMappingURL=RogueBattleEnvironmentBuffView.js.map
