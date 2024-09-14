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
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapController_1 = require("../../WorldMapController"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  RewardItemBar_1 = require("../RewardItemBar"),
  TipsListView_1 = require("../TipsListView"),
  ROGUE_SCORE_KEY = "rougeScore",
  ROGUE_TIME = "rogueTime",
  ROGUE_ACHIEVEMENT_PROGRESS = "rogueAchievementProgress",
  ROGUE_DIFFICULTY_PROGRESS = "rogueDifficultyProgress";
class RoguelikeEntrancePanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.u2o = void 0),
      (this.U2o = void 0),
      (this.ZAt = void 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.IRe = void 0),
      (this.RewardsView = void 0),
      (this.oza = void 0),
      (this.OnInstanceRefresh = (e, t, i, r) => {
        var o = new TipsListView_1.InstanceDungeonCostTip();
        return o.SetRootActor(t.GetOwner(), !0), { Key: e, Value: o };
      }),
      (this.m2o = () => {
        this.u2o.IsLocked
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.u2o.MarkId]),
            MapController_1.MapController.RequestTrackMapMark(
              this.u2o.MarkType,
              this.u2o.MarkId,
              !this.u2o.IsTracked,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Map", 50, "追踪", ["markId", this.u2o.MarkId]),
            WorldMapController_1.WorldMapController.TryTeleport(this.u2o)),
          this.Close();
      }),
      (this.F4a = () => {
        var e = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        );
        e &&
          MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, e, () => {
            this.Close();
          });
      }),
      (this.P8e = () => {
        var e = this.u2o;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[地图系统]GeneralPanel->追踪标记",
            ["markId", e.MarkId],
            ["IsTracked", e.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            e.MarkType,
            e.MarkId,
            !e.IsTracked,
          ),
          this.l_i(),
          this.Close();
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
  OnRegisterComponent() {
    this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA;
  }
  async OnBeforeStartAsync() {
    return (
      ModelManager_1.ModelManager.RoguelikeModel?.CheckRogueIsOpen() &&
        (await RoguelikeController_1.RoguelikeController.RoguelikeSeasonDataRequest()),
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      await this.RewardsView.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      ),
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner()),
      super.OnBeforeStartAsync()
    );
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetActive(!0),
      this.ZAt.SetFunction(this.m2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a),
      this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(!0),
      (this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(
        this.GetVerticalLayout(5),
        this.OnInstanceRefresh,
      )),
      this.GetItem(25).SetUIActive(!1),
      this.GetItem(32).SetUIActive(!1),
      this.oza.SetUiActive(!1);
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren(),
      this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      this.oza.Destroy(),
      this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe);
  }
  OnShowWorldMapSecondaryUi(e) {
    var t;
    e
      ? ((this.u2o = e),
        (this.tli =
          0 !== e.MarkConfig.RelativeId
            ? e.MarkConfig.RelativeId
            : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
                e.MarkConfigId,
              )),
        this.tli
          ? (this.SHe(),
            this.x2o(),
            this.l_i(),
            (t = this.P2o.UnLockCondition) &&
              !ModelManager_1.ModelManager.FunctionModel.IsOpen(t) &&
              ((t =
                ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(
                  t,
                )),
              (t =
                ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
                  t.OpenConditionId,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              17,
              "副本入口弹窗打开错误，副本入口表中找不到对应的地图标价Id！",
              ["MarkId", e.MarkConfigId],
            ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "InstanceDungeon",
          50,
          "副本入口弹窗打开错误，地图标记不存在",
        );
  }
  SHe() {
    var e,
      t,
      i = this.P2o;
    i &&
      (this.GetText(4).ShowTextNew(i.Description),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetText(1).ShowTextNew(i.Name),
      (i = this.u2o.GetAreaText()) && this.GetText(3).SetText(i),
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock),
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text"),
      this.GetItem(12).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      (i = MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o)),
      this.ZAt.SetActive(!i),
      this.GetItem(14).SetUIActive(!1),
      this.GetItem(32).SetUIActive(i),
      this.oza.SetUiActive(!1),
      i) &&
      ((i = this.GetButton(29)),
      (e = TeleportController_1.TeleportController.CheckCanTeleport()),
      (t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
        this.Map,
        this.u2o,
      )),
      this.oza.SetUiActive(!e || void 0 === t),
      i.SetSelfInteractive(e && void 0 !== t));
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
    if (ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData) {
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
    var t = ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData;
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
    var e = ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData;
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
      i = ModelManager_1.ModelManager.RoguelikeModel?.CurrSeasonData;
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
  l_i() {
    let e = "";
    (e = this.u2o.IsLocked
      ? this.u2o.IsTracked
        ? "InstanceDungeonEntranceCancelTrack"
        : "InstanceDungeonEntranceTrack"
      : "TeleportFastMove"),
      this.ZAt.SetLocalText(e),
      this.k4a.SetLocalText(e);
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
