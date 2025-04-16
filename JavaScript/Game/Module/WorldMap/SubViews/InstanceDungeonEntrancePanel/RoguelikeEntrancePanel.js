"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeEntrancePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityRogueController_1 = require("../../../Activity/ActivityContent/RougeActivity/ActivityRogueController"),
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  ROGUE_SCORE_KEY = "rougeScore",
  ROGUE_TIME = "rogueTime",
  ROGUE_ACHIEVEMENT_PROGRESS = "rogueAchievementProgress",
  ROGUE_DIFFICULTY_PROGRESS = "rogueDifficultyProgress";
class RoguelikeEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.IRe = void 0),
      (this.RewardsView = void 0),
      (this.OnInstanceRefresh = (e, t, i, r) => {
        var o = new TipsListView_1.InstanceDungeonCostTip();
        return o.SetRootActor(t.GetOwner(), !0), { Key: e, Value: o };
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
    this.u2o = e;
    var t = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId,
      i = e.MarkConfigId;
    (this.tli =
      0 !== t
        ? t
        : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
            i,
          )),
      this.tli
        ? (this.SHe(),
          this.x2o(),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
            this.LayoutContext,
          ),
          WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
            this.LayoutContext,
          ),
          (t = this.P2o.UnLockCondition) &&
            !ModelManager_1.ModelManager.FunctionModel.IsOpen(t) &&
            ((i =
              ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                t,
              )),
            (t =
              ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                i.OpenConditionId,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText)))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            16,
            "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！",
            ["MarkId", e.MarkConfigId],
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
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.GetPreviewReward();
    void 0 === e || 0 === e.length
      ? this.GetItem(8).SetUIActive(!1)
      : ((e = e.slice(0, 5)).forEach((e) => {
          e[1] = 0;
        }),
        this.GetItem(8).SetUIActive(!0),
        this.RewardsView.RebuildRewardsByData(e));
  }
  x2o() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetInstanceDungeonEntranceFlowId(
        this.tli,
      );
    this.jqe(),
      6 === e &&
        (ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen()
          ? (this.h4i(),
            this.sea(),
            this.aea(),
            this.hea(),
            this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
            (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
              this.h4i();
            }, 1e3)))
          : this.WTt());
  }
  WTt() {
    this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]);
    var e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY);
    e.SetIconVisible(!1),
      e.SetStarVisible(!1),
      e.SetRightText(""),
      e.SetLeftText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Rogue_Function_End_Tip",
        ),
      ),
      e.SetHelpButtonVisible(!1);
  }
  h4i() {
    if (
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
        ?.SeasonData
    ) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TIME);
      e ||
        (this.U2o.AddItemToLayout([ROGUE_TIME]),
        (e = this.U2o.GetLayoutItemByKey(ROGUE_TIME))),
        e.SetIconVisible(!1),
        e.SetStarVisible(!1);
      var t = this.GetRemainTime(),
        t =
          (e.SetRightText(t),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_Rogue_Time",
            ) ?? "",
            "",
          ));
      e.SetLeftText(t), e.SetHelpButtonVisible(!1);
    }
  }
  sea() {
    var t =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
        ?.SeasonData;
    if (t) {
      this.U2o.AddItemToLayout([ROGUE_DIFFICULTY_PROGRESS]);
      var i = this.U2o.GetLayoutItemByKey(ROGUE_DIFFICULTY_PROGRESS),
        t =
          (i.SetIconVisible(!1),
          i.SetStarVisible(!1),
          ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueSeasonConfigById(
            t.UHn,
          )),
        t =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetConfig(
            t.InstanceDungeonEntrance,
          );
      let e = 0;
      for (const r of t.InstanceDungeonList)
        if (
          !ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(r)
        ) {
          e = r;
          break;
        }
      0 === e && (e = t.InstanceDungeonList.pop());
      (t = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(e)),
        (t =
          (i.SetRightText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              t.DifficultyDesc[0],
            ),
          ),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_Rogue_Difficulty_Process",
            ) ?? "",
            "",
          )));
      i.SetLeftText(t), i.SetHelpButtonVisible(!1);
    }
  }
  aea() {
    var e =
      ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
        ?.SeasonData;
    if (e) {
      this.U2o.AddItemToLayout([ROGUE_ACHIEVEMENT_PROGRESS]);
      var r = this.U2o.GetLayoutItemByKey(ROGUE_ACHIEVEMENT_PROGRESS),
        e =
          (r.SetIconVisible(!1),
          r.SetStarVisible(!1),
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
            e.UHn,
          )),
        e =
          ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
            e.Achievement,
          );
      let t = 0,
        i = 0;
      e.forEach((e) => {
        e =
          ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(
            e.GetId(),
          );
        e && ((t += e.GetCurrentProgress()), (i += e.GetMaxProgress()));
      });
      (e = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Rogue_Score",
        ) ?? "{0}/{1}",
        t.toString(),
        i.toString(),
      )),
        (e =
          (r.SetRightText(e),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Text_Rogue_Achievement_Count",
            ) ?? "",
            "",
          )));
      r.SetLeftText(e), r.SetHelpButtonVisible(!1);
    }
  }
  hea() {
    var e,
      t,
      i =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()
          ?.SeasonData;
    i &&
      (this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]),
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(!1),
      e.SetStarVisible(!1),
      (t =
        ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()
          ?.WeekTokenMaxCount ?? 1),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Rogue_Score",
        ) ?? "{0}/{1}",
        i.yqs.toString(),
        t.toString(),
      )),
      e.SetRightText(i),
      (t = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Rogue_Week_Score",
        ) ?? "",
        "",
      )),
      e.SetLeftText(t),
      e.SetHelpButtonVisible(!1));
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11)
      .GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
  GetRemainTime() {
    var e =
        ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData(),
      t = e.CheckIfInShowTime(),
      i = e.CheckIfInOpenTime();
    if (!i && !t)
      return ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
        "ActiveClose",
      );
    var t = e.EndOpenTime,
      r = e.EndShowTime;
    let o = 0;
    o = 0 !== e.EndOpenTime && i ? t : r;
    (e = TimeUtil_1.TimeUtil.GetServerTime()),
      (i = Math.max(o - e, 1)),
      (t = this.FOe(i));
    return (
      TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, t[0], t[1])
        .CountDownText ?? ""
    );
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
exports.RoguelikeEntrancePanel = RoguelikeEntrancePanel;
//# sourceMappingURL=RoguelikeEntrancePanel.js.map
