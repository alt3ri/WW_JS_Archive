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
      (this.TDo = -1),
      (this.bDo = void 0),
      (this.UDo = void 0),
      (this.ADo = void 0),
      (this.H1i = void 0),
      (this.Mli = void 0),
      (this.gLt = void 0),
      (this.SPe = void 0),
      (this.qDo = []),
      (this.GDo = () => {
        this.Og(
          this.TDo,
          !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(this.TDo),
        );
        var e =
          ModelManager_1.ModelManager.TowerModel.GetDifficultyAreaAllFloor(
            ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
            this.OpenParam,
          );
        (ModelManager_1.ModelManager.TowerModel.DefaultFloor = this.TDo),
          this.bDo.RefreshByData(e);
      }),
      (this.PDo = () => {
        var e = new TowerFloorItem_1.TowerFloorItem();
        return (
          e.BindOnClickToggle((e, t) => {
            this.Og(e, t);
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
      }),
      (this.NDo = () => {
        return new TowerElementItem_1.TowerElementItem();
      }),
      (this.ODo = () => {
        UiManager_1.UiManager.OpenView("TowerResetView", this.TDo);
      }),
      (this.kDo = () => {
        ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(this.TDo);
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
        [6, this.ODo],
        [7, this.kDo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnTowerRefresh,
      this.GDo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnTowerRefresh,
      this.GDo,
    );
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
      t =
        ((this.bDo = new GenericLayout_1.GenericLayout(
          this.GetVerticalLayout(1),
          this.PDo,
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
    this.bDo.RefreshByData(t),
      (this.UDo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(2),
        this.xDo,
      )),
      (this.ADo = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.wDo,
      )),
      (this.H1i = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(4),
        this.n8i,
      )),
      (this.gLt = new TowerTitleItem_1.TowerTitleItem(this.GetItem(0), () => {
        var e = UiManager_1.UiManager.GetViewByName("TowerNormalView"),
          t = UiManager_1.UiManager.GetViewByName("TowerVariationView");
        !ModelManager_1.ModelManager.TowerModel.CheckInTower() || e || t
          ? this.CloseMe()
          : TowerController_1.TowerController.BackToTowerView(() => {
              this.CloseMe();
            });
      })),
      (this.Mli = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(13),
        this.NDo,
      ));
    let i = void 0;
    i =
      e === TowerData_1.LOW_RISK_DIFFICULTY
        ? "Text_LowRisk_Text"
        : e === TowerData_1.HIGH_RISK_DIFFICULTY
          ? "Text_HighRisk_Text"
          : "Text_Variation_Text";
    e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(t[0]);
    this.gLt.RefreshText(i, e),
      this.Og(ModelManager_1.ModelManager.TowerModel.DefaultFloor, !1),
      ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView &&
        UiManager_1.UiManager.OpenView("TowerApplyFloorDataView");
  }
  OnBeforeDestroy() {
    (this.bDo = void 0),
      (this.UDo = void 0),
      (this.ADo = void 0),
      (this.H1i = void 0),
      this.gLt?.Destroy(),
      this.SPe?.Clear(),
      (this.SPe = void 0),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1);
  }
  Og(e, t) {
    (this.TDo = e),
      (ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = e);
    var i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e),
      r =
        (this.UDo.RefreshByData(i.ShowBuffs),
        this.H1i.RefreshByData(i.ShowMonsters),
        0 < i.RecommendElement?.length
          ? (this.GetItem(12)?.SetUIActive(!0),
            this.Mli.RefreshByData(i.RecommendElement))
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
    this.ADo.RefreshByData(r),
      this.GetText(5).SetText("" + i.Cost),
      this.GetItem(9).SetUIActive(!t),
      this.GetItem(10).SetUIActive(t),
      this.SetTextureByPath(i.BgPath, this.GetTexture(8));
    (e = ModelManager_1.ModelManager.TowerModel.GetFloorData(this.TDo)),
      e && 0 !== e.Formation.length
        ? this.GetButton(6).RootUIComp.SetUIActive(!0)
        : this.GetButton(6).RootUIComp.SetUIActive(!1),
      (t = ModelManager_1.ModelManager.TowerModel.GetHaveChallengeFloor(
        this.TDo,
      ));
    this.SPe?.StopCurrentSequence(!1, !0),
      this.qDo.includes(this.TDo) ||
        t ||
        (this.SPe?.PlayLevelSequenceByName("BuffShow"),
        this.qDo.push(this.TDo)),
      this.SPe?.PlayLevelSequenceByName("Switch");
  }
}
exports.TowerFloorView = TowerFloorView;
//# sourceMappingURL=TowerFloorView.js.map
