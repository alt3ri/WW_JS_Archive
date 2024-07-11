"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerFloorView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  TowerController_1 = require("../TowerController"),
  TowerData_1 = require("../TowerData"),
  TowerModel_1 = require("../TowerModel"),
  TowerBuffShowItem_1 = require("./TowerBuffShowItem"),
  TowerElementItem_1 = require("./TowerElementItem"),
  TowerFloorItem_1 = require("./TowerFloorItem"),
  TowerMonsterItem_1 = require("./TowerMonsterItem"),
  TowerStarsComplexItem_1 = require("./TowerStarsComplexItem"),
  TowerTitleItem_1 = require("./TowerTitleItem");
class TowerFloorView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RLo = -1),
      (this.NLo = void 0),
      (this.xLo = void 0),
      (this.wLo = void 0),
      (this.Hli = void 0),
      (this.Mhi = void 0),
      (this.uTt = void 0),
      (this.EPe = void 0),
      (this.OLo = []),
      (this.kLo = () => {
        this.Og(
          this.RLo,
          !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(this.RLo),
        );
        var e =
          ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(
            ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
            this.OpenParam,
          );
        (ModelManager_1.ModelManager.TowerModel.DefaultFloor = this.RLo),
          this.NLo.RefreshByData(e);
      }),
      (this.BLo = () => {
        var e = new TowerFloorItem_1.TowerFloorItem();
        return (
          e.BindOnClickToggle((e, t) => {
            this.Og(e, t);
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
      }),
      (this.FLo = () => {
        return new TowerElementItem_1.TowerElementItem();
      }),
      (this.VLo = () => {
        UiManager_1.UiManager.OpenView("TowerResetView", this.RLo);
      }),
      (this.HLo = () => {
        ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(this.RLo);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIVerticalLayout],
      [3, UE.UIVerticalLayout],
      [4, UE.UIGridLayout],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [
        [6, this.VLo],
        [7, this.HLo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRefresh,
      this.kLo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefresh,
      this.kLo,
    );
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
      t =
        ((this.NLo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.BLo,
        )),
        (ModelManager_1.ModelManager.TowerModel.DefaultFloor = -1),
        ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(
          e,
          this.OpenParam,
        ));
    if (ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView)
      ModelManager_1.ModelManager.TowerModel.DefaultFloor =
        ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId;
    else {
      for (const r of t)
        if (
          !ModelManager_1.ModelManager.TowerModel.GetHaveChallengeFloorAndFormation(
            r,
          )
        ) {
          ModelManager_1.ModelManager.TowerModel.DefaultFloor = r;
          break;
        }
      -1 === ModelManager_1.ModelManager.TowerModel.DefaultFloor &&
        (ModelManager_1.ModelManager.TowerModel.DefaultFloor = t[0]);
    }
    this.NLo.RefreshByData(t),
      (this.xLo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.bLo,
      )),
      (this.wLo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.qLo,
      )),
      (this.Hli = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(4),
        this.s6i,
      )),
      (this.uTt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
        var e = UiManager_1.UiManager.GetViewByName("TowerNormalView"),
          t = UiManager_1.UiManager.GetViewByName("TowerVariationView");
        !ModelManager_1.ModelManager.TowerModel.CheckInTower() || e || t
          ? this.CloseMe()
          : TowerController_1.TowerController.BackToTowerView(() => {
              this.CloseMe();
            });
      })),
      (this.Mhi = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(13),
        this.FLo,
      ));
    let i = void 0;
    i =
      e === TowerData_1.LOW_RISK_DIFFICULTY
        ? "Text_LowRisk_Text"
        : e === TowerData_1.HIGH_RISK_DIFFICULTY
          ? "Text_HighRisk_Text"
          : "Text_Variation_Text";
    e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(t[0]);
    this.uTt.RefreshText(i, e),
      this.Og(ModelManager_1.ModelManager.TowerModel.DefaultFloor, !1),
      ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView &&
        UiManager_1.UiManager.OpenView("TowerApplyFloorDataView");
  }
  OnBeforeDestroy() {
    (this.NLo = void 0),
      (this.xLo = void 0),
      (this.wLo = void 0),
      (this.Hli = void 0),
      this.uTt?.Destroy(),
      this.EPe?.Clear(),
      (this.EPe = void 0),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1);
  }
  Og(e, t) {
    (this.RLo = e),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = e);
    var i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e),
      r =
        (this.xLo.RefreshByData(i.ShowBuffs),
        this.Hli.RefreshByData(i.ShowMonsters),
        0 < i.RecommendElement?.length
          ? (this.GetItem(12)?.SetUIActive(!0),
            this.Mhi.RefreshByData(i.RecommendElement))
          : this.GetItem(12)?.SetUIActive(!1),
        []),
      o = ModelManager_1.ModelManager.TowerModel.GetFloorStarsIndex(e);
    for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
      var s = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(
          i.TargetConfig[e],
        ),
        s = [!(!o || !o.includes(e)), s];
      r.push(s);
    }
    this.wLo.RefreshByData(r),
      this.GetText(5).SetText("" + i.Cost),
      this.GetItem(9).SetUIActive(!t),
      this.GetItem(10).SetUIActive(t),
      this.SetTextureByPath(i.BgPath, this.GetTexture(8));
    (e = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.RLo)),
      e && 0 !== e.Formation.length
        ? this.GetButton(6).RootUIComp.SetUIActive(!0)
        : this.GetButton(6).RootUIComp.SetUIActive(!1),
      (t = ModelManager_1.ModelManager.TowerModel.GetHaveChallengeFloor(
        this.RLo,
      ));
    this.EPe?.StopCurrentSequence(!1, !0),
      this.OLo.includes(this.RLo) ||
        t ||
        (this.EPe?.PlayLevelSequenceByName("BuffShow"),
        this.OLo.push(this.RLo)),
      this.EPe?.PlayLevelSequenceByName("Switch");
  }
}
exports.TowerFloorView = TowerFloorView;
//# sourceMappingURL=TowerFloorView.js.map
