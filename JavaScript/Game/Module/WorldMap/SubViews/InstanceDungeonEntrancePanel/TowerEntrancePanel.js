"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerEntrancePanel = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TowerController_1 = require("../../../TowerDetailUi/TowerController"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  REWARD_ID = 3331,
  TIME_KEY = "time",
  DIFFICULT_KEY = "difficult",
  SCORE_KEY = "score";
class TowerEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.U2o = void 0),
      (this.RewardsView = void 0),
      (this.IRe = void 0),
      (this.B2o = 0),
      (this.b2o = 0),
      (this.q2o = () => {
        this.G2o(), this.N2o(this.B2o), this.u3e();
      });
  }
  GetResourceId() {
    return "UiView_Map_Tower_Tip_Prefab";
  }
  OnStart() {
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      this.RewardsView.SetRootActor(this.GetItem(8).GetOwner(), !0),
      super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    var i = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId,
      e = e.MarkConfigId,
      i =
        0 !== i
          ? i
          : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
              e,
            ),
      e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
          i,
        ),
      i =
        ((this.B2o = e),
        this.u3e(),
        this.jqe(),
        this.N2o(e),
        this.G2o(),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
          this.LayoutContext,
        ),
        this.UpdateQuickGoto());
    this.ConfirmButton.SetActive(!i),
      this.jm(),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.q2o();
      }, TimeUtil_1.TimeUtil.InverseMillisecond)),
      (this.b2o =
        MathUtils_1.MathUtils.LongToNumber(
          ModelManager_1.ModelManager.TowerModel.TowerEndTime,
        ) - TimeUtil_1.TimeUtil.GetServerTime());
  }
  jqe() {
    var e,
      i,
      r = [];
    for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
      REWARD_ID,
    )?.DropPreview) {
      var t = [{ IncId: 0, ItemId: e }, i];
      r.push(t);
    }
    void 0 === r || 0 === r.length
      ? this.RewardsView.SetActive(!1)
      : (this.RewardsView.SetActive(!0),
        this.RewardsView.RebuildRewardsByData(r));
  }
  G2o() {
    var e = this.U2o.AddItemByKey(DIFFICULT_KEY),
      i = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty(),
      i =
        (e.SetHelpButtonVisible(!1),
        e.SetLeftText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerProcess") ??
            "",
        ),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(
          i,
        ));
    e.SetRightText(i);
  }
  u3e() {
    var e = ModelManager_1.ModelManager.TowerModel.GetSeasonCountDownData(),
      i = this.U2o.AddItemByKey(TIME_KEY),
      r = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_ActiveRemainTime_Text",
        ) ?? "",
        "",
      );
    i.SetLeftText(r),
      i.SetRightText(e.CountDownText ?? ""),
      i.SetHelpButtonVisible(!1),
      this.b2o--,
      this.b2o < 2 && TowerController_1.TowerController.RefreshTower();
  }
  N2o(e) {
    var i, r, t;
    4 <= e &&
      ((e = this.U2o.AddItemByKey(SCORE_KEY)),
      (i = (t = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty()),
      (r = t.GetDifficultyMaxStars(i)),
      (t = t.GetDifficultyAllStars(i)),
      e.SetHelpButtonVisible(!1),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerScore") ?? "",
      ),
      e.SetRightText(r + "/" + t),
      e.SetStarVisible(!0));
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear(), this.jm();
  }
  jm() {
    this.IRe &&
      TimerSystem_1.TimerSystem.Has(this.IRe) &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
  }
  OnBeforeDestroy() {
    this.jm(),
      this.RewardsView.Destroy(),
      this.U2o.Clear(),
      super.OnBeforeDestroy();
  }
}
exports.TowerEntrancePanel = TowerEntrancePanel;
//# sourceMappingURL=TowerEntrancePanel.js.map
