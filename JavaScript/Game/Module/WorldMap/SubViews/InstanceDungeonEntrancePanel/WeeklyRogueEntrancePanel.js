"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueEntrancePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  ROGUE_SCORE_KEY = "rougeScore",
  ROGUE_TIME = "rogueTime";
class WeeklyRogueEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.RewardsView = void 0),
      (this.tli = 0),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.IRe = void 0),
      (this.OnInstanceRefresh = (e, i, t, r) => {
        var a = new TipsListView_1.InstanceDungeonCostTip();
        return a.SetRootActor(i.GetOwner(), !0), { Key: e, Value: a };
      });
  }
  get P2o() {
    return this.tli
      ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
          this.tli,
        )
      : void 0;
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab";
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
  async OnBeforeStartAsync() {
    return (
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      await this.RewardsView.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      ),
      super.OnBeforeStartAsync()
    );
  }
  OnStart() {
    this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(), this.GetItem(32).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren(),
      this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
      super.OnBeforeDestroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    var i;
    (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      (this.tli = this.u2o.MarkConfigId),
      this.tli
        ? (this.SHe(),
          this.x2o(),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
            this.LayoutContext,
          ),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
            this.LayoutContext,
          ),
          (i = this.P2o.UnLockCondition) &&
            !ModelManager_1.ModelManager.FunctionModel.IsOpen(i) &&
            ((i =
              ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                i,
              )),
            (i =
              ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                i.OpenConditionId,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.HintText)))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            16,
            "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！",
            ["MarkId", e.MarkConfigId],
          );
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetRemainTime() {
    var e =
        ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleRemainTime(),
      i = this.FOe(e);
    return (
      TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1])
        .CountDownText ?? ""
    );
  }
  SHe() {
    var e = this.P2o;
    e &&
      (this.GetText(4).ShowTextNew(e.Description),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(
        this.LayoutContext,
      ),
      this.GetText(1).ShowTextNew(e.Name),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(36),
        "Instance_RogueInstanceEntrance_Progress",
      ),
      (e = this.UpdateQuickGoto()),
      this.ConfirmButton.SetActive(!e));
  }
  jqe() {
    var e =
      ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetPreviewReward();
    void 0 === e || 0 === e.length
      ? this.GetItem(8).SetUIActive(!1)
      : ((e = e.slice(0, 5)).forEach((e) => {
          e[1] = 0;
        }),
        this.GetItem(8).SetUIActive(!0),
        this.RewardsView.RebuildRewardsByData(e));
  }
  x2o() {
    this.jqe(),
      this.h4i(),
      this.hea(),
      this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.h4i();
      }, 1e3));
  }
  h4i() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      e ||
        (this.U2o.AddItemToLayout([ROGUE_TIME]),
        (e = this.U2o.GetLayoutItemByKey(ROGUE_TIME))),
        e.SetIconVisible(!1),
        e.SetStarVisible(!1);
      var i = this.GetRemainTime(),
        i =
          (e.SetRightText(i),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_Rogue_Time",
            ) ?? "",
            "",
          ));
      e.SetLeftText(i), e.SetHelpButtonVisible(!1);
    }
  }
  hea() {
    var e,
      i = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData;
    i &&
      (this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]),
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(!1),
      e.SetStarVisible(!1),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Weekly_Rogue_Score",
        ) ?? "{0}",
        i.Score.toString(),
      )),
      e.SetRightText(i),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Weekly_Rogue_Week_Score",
        ) ?? "",
        "",
      )),
      e.SetLeftText(i),
      e.SetHelpButtonVisible(!1));
  }
  FOe(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : e > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
  }
}
exports.WeeklyRogueEntrancePanel = WeeklyRogueEntrancePanel;
//# sourceMappingURL=WeeklyRogueEntrancePanel.js.map
