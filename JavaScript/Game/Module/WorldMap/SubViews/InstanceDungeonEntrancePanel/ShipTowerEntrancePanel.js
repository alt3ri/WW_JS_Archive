"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerEntrancePanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ShipTowerDefine_1 = require("../../../ShipTower/ShipTowerDefine"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  TIME_KEY = "time",
  REWARD_PROGRESS_KEY = "score";
class ShipTowerEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.U2o = void 0),
      (this.RewardsView = void 0),
      (this.IRe = void 0),
      (this.Tec = !1),
      (this.q2o = () => {
        this.u3e();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      (this.U2o = new TipsListView_1.TipsListView()),
      this.U2o.Initialize(this.GetVerticalLayout(5)),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar());
    var e = this.GetItem(8);
    await this.RewardsView.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(25)?.SetUIActive(!1),
      this.GetItem(32)?.SetUIActive(!1),
      this.RewardsView.SetActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.LayoutContext.MarkItem = e),
      this.jqe(),
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
      );
    (e = this.UpdateQuickGoto()),
      this.ConfirmButton.SetActive(!e),
      (e = ModelManager_1.ModelManager.ShipTowerModel.IsOpen());
    this.bec(e);
  }
  u3e() {
    var e = ModelManager_1.ModelManager.ShipTowerModel.GetSeasonCountDownData(),
      i = this.U2o.AddItemByKey(TIME_KEY),
      r = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GhostShipTimeProgress_Text",
        ) ?? "",
        "",
      );
    i.SetLeftText(r),
      i.SetRightText(e.CountDownText ?? ""),
      i.SetHelpButtonVisible(!1),
      ModelManager_1.ModelManager.ShipTowerModel?.TimeIsOver() && this.Lec();
  }
  bec(e) {
    this.GetItem(14).SetUIActive(e),
      this.jm(),
      e &&
        (this.u3e(),
        this.jG_(),
        (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
          this.q2o();
        }, TimeUtil_1.TimeUtil.InverseMillisecond)));
  }
  async Lec() {
    this.Tec ||
      ((this.Tec = !0),
      await ModelManager_1.ModelManager.ShipTowerModel.CheckInitProto(),
      this.jG_(),
      this.u3e(),
      (this.Tec = !1));
  }
  jG_() {
    var e = this.U2o.AddItemByKey(REWARD_PROGRESS_KEY),
      i = ModelManager_1.ModelManager.ShipTowerModel.GetRewardProgressText(!1),
      r =
        ModelManager_1.ModelManager.ShipTowerModel.GetCurrentStageSeasonName();
    e.SetHelpButtonVisible(!1),
      e.SetLeftText(r),
      e.SetRightText(i),
      e.SetStarVisible(!1);
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
  jqe() {
    var e,
      i,
      r =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "GhostShipReward",
        ) ?? 1,
      t = [];
    for ([e, i] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(r)
      ?.DropPreview) {
      var a = [{ IncId: 0, ItemId: e }, i];
      t.push(a);
    }
    void 0 === t || 0 === t.length
      ? this.RewardsView.SetActive(!1)
      : (this.RewardsView.SetActive(!0),
        this.RewardsView.RebuildRewardsByData(t),
        this.RewardsView.SetTitleNewTxt(
          ShipTowerDefine_1.shipTowerTextKey.MapMarkRewardTitle,
        ));
  }
}
exports.ShipTowerEntrancePanel = ShipTowerEntrancePanel;
//# sourceMappingURL=ShipTowerEntrancePanel.js.map
