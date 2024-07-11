"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerFloorDetailView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  TowerModel_1 = require("../TowerModel"),
  TowerBuffShowItem_1 = require("./TowerBuffShowItem"),
  TowerDetailItem_1 = require("./TowerDetailItem"),
  TowerMonsterItem_1 = require("./TowerMonsterItem"),
  TowerStarsComplexItem_1 = require("./TowerStarsComplexItem");
class TowerFloorDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.PLo = void 0),
      (this.xLo = void 0),
      (this.wLo = void 0),
      (this.Hli = void 0),
      (this.BLo = () => {
        var e = new TowerDetailItem_1.TowerDetailItem();
        return (
          e.BindOnClickToggle((e) => {
            this.Og(e);
          }),
          e
        );
      }),
      (this.bLo = () => {
        return new TowerBuffShowItem_1.TowerBuffShowItem();
      }),
      (this.qLo = () => {
        return new TowerStarsComplexItem_1.TowerStarsComplexItem();
      }),
      (this.s6i = () => {
        return new TowerMonsterItem_1.TowerMonsterItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIVerticalLayout],
      [2, UE.UIVerticalLayout],
      [3, UE.UIGridLayout],
    ];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
      r =
        ((this.PLo = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(0),
          this.BLo,
        )),
        (this.xLo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.bLo,
        )),
        (this.wLo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(2),
          this.qLo,
        )),
        (this.Hli = new GenericLayout_1.GenericLayout(
          this.GetGridLayout(3),
          this.s6i,
        )),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )),
      e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(
        e,
        r.AreaNum,
      );
    this.PLo.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.PLo.ClearChildren(),
      (this.PLo = void 0),
      this.xLo.ClearChildren(),
      (this.xLo = void 0),
      this.wLo.ClearChildren(),
      (this.wLo = void 0),
      this.Hli.ClearChildren(),
      (this.Hli = void 0);
  }
  Og(e) {
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e),
      t = (this.xLo.RefreshByData(r.ShowBuffs), r.InstanceId);
    const i =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        t,
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    this.Hli.RefreshByData(r.ShowMonsters, () => {
      for (const e of this.Hli.GetLayoutItemList()) e.SetLevelText(i);
    });
    var o = [],
      s = ModelManager_1.ModelManager.TowerModel.GetFloorStarsIndex(e);
    for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
      var a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(
          r.TargetConfig[e],
        ),
        a = [!(!s || !s.includes(e)), a];
      o.push(a);
    }
    this.wLo.RefreshByData(o);
  }
}
exports.TowerFloorDetailView = TowerFloorDetailView;
//# sourceMappingURL=TowerFloorDetailView.js.map
