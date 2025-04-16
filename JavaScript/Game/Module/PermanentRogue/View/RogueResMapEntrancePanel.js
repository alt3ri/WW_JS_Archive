"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResMapEntrancePanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  RogueResDungeonConfigById_1 = require("../../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RewardItemBar_1 = require("../../WorldMap/SubViews/RewardItemBar"),
  TipsListView_1 = require("../../WorldMap/SubViews/TipsListView"),
  WorldMapSecondaryUiLayoutA_1 = require("../../WorldMap/SubViews/WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../../WorldMap/SubViews/WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  ROGUE_SCORE_KEY = "rougeScore",
  ROGUE_TASK = "rougeTask",
  ROGUE_PROGRESS = "rougeProgress",
  ROGUE_TIME = "rogueTime";
class RogueResMapEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.RewardsView = void 0),
      (this.tli = 0),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.IRe = void 0),
      (this.Ftl = "{0}"),
      (this.OnInstanceRefresh = (e, i, t, r) => {
        var a = new TipsListView_1.InstanceDungeonCostTip();
        return a.SetRootActor(i.GetOwner(), !0), { Key: e, Value: a };
      });
  }
  get P2o() {
    var e = this.tli
      ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
          this.tli,
        )
      : void 0;
    return e
      ? ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
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
            77,
            "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！",
            ["MarkId", e.MarkConfigId],
          );
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetRemainTime() {
    var e = MathUtils_1.MathUtils.LongToNumber(
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskEndTime(),
    );
    return (
      ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(
        e,
        this.Ftl,
      ) ?? ""
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
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().GetPreviewReward();
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
      this.oI1(),
      this.nI1(),
      this.hea(),
      this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
        this.h4i();
      }, 1e3));
  }
  h4i() {
    if (
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()
    ) {
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
              "RogueRes_MapNote_4",
            ) ?? "",
            "",
          ));
      e.SetLeftText(i), e.SetHelpButtonVisible(!1);
    }
  }
  oI1() {
    if (
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()
    ) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_PROGRESS);
      e ||
        (this.U2o.AddItemToLayout([ROGUE_PROGRESS]),
        (e = this.U2o.GetLayoutItemByKey(ROGUE_PROGRESS))),
        e.SetIconVisible(!1),
        e.SetStarVisible(!1);
      var i =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId(),
        i =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetLatestDungeon(
            i,
          ),
        i =
          RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(
            i,
          ),
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title),
        i =
          (e.SetRightText(i),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "RogueRes_MapNote_1",
            ) ?? "",
            "",
          ));
      e.SetLeftText(i), e.SetHelpButtonVisible(!1);
    }
  }
  nI1() {
    if (
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData()
    ) {
      let e = this.U2o.GetLayoutItemByKey(ROGUE_TASK);
      e ||
        (this.U2o.AddItemToLayout([ROGUE_TASK]),
        (e = this.U2o.GetLayoutItemByKey(ROGUE_TASK))),
        e.SetIconVisible(!1),
        e.SetStarVisible(!1);
      var i =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTaskCount(),
        i =
          (e.SetRightText(i[0] + "/" + i[1]),
          StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "RogueRes_MapNote_2",
            ) ?? "",
            "",
          ));
      e.SetLeftText(i), e.SetHelpButtonVisible(!1);
    }
  }
  hea() {
    var e, i;
    ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData() &&
      (this.U2o.AddItemToLayout([ROGUE_SCORE_KEY]),
      (e = this.U2o.GetLayoutItemByKey(ROGUE_SCORE_KEY)).SetIconVisible(!1),
      e.SetStarVisible(!1),
      (i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId()),
      (i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetShopCount(
          i,
        )),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "Text_Weekly_Rogue_Score",
        ) ?? "{0}",
        i[0] + "/" + i[1],
      )),
      e.SetRightText(i),
      (i = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "RogueRes_MapNote_3",
        ) ?? "",
        "",
      )),
      e.SetLeftText(i),
      e.SetHelpButtonVisible(!1));
  }
}
exports.RogueResMapEntrancePanel = RogueResMapEntrancePanel;
//# sourceMappingURL=RogueResMapEntrancePanel.js.map
