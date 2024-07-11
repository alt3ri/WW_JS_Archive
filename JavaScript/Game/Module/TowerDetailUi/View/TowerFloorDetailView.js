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
      (this.RDo = void 0),
      (this.UDo = void 0),
      (this.ADo = void 0),
      (this.H1i = void 0),
      (this.PDo = () => {
        var e = new TowerDetailItem_1.TowerDetailItem();
        return (
          e.BindOnClickToggle((e) => {
            this.Og(e);
          }),
          e
        );
      }),
      (this.xDo = () => {
        return new TowerBuffShowItem_1.TowerBuffShowItem();
      }),
      (this.wDo = () => {
        return new TowerStarsComplexItem_1.TowerStarsComplexItem();
      }),
      (this.n8i = () => {
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
        ((this.RDo = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(0),
          this.PDo,
        )),
        (this.UDo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.xDo,
        )),
        (this.ADo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(2),
          this.wDo,
        )),
        (this.H1i = new GenericLayout_1.GenericLayout(
          this.GetGridLayout(3),
          this.n8i,
        )),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )),
      e = ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(
        e,
        r.AreaNum,
      );
    this.RDo.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.RDo.ClearChildren(),
      (this.RDo = void 0),
      this.UDo.ClearChildren(),
      (this.UDo = void 0),
      this.ADo.ClearChildren(),
      (this.ADo = void 0),
      this.H1i.ClearChildren(),
      (this.H1i = void 0);
  }
  Og(e) {
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e),
      t = (this.UDo.RefreshByData(r.ShowBuffs), r.InstanceId);
    const i =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        t,
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    this.H1i.RefreshByData(r.ShowMonsters, () => {
      for (const e of this.H1i.GetLayoutItemList()) e.SetLevelText(i);
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
    this.ADo.RefreshByData(o);
  }
}
exports.TowerFloorDetailView = TowerFloorDetailView;
//# sourceMappingURL=TowerFloorDetailView.js.map
