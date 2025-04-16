"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsActivityView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ActivityDescriptionTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../../Activity/ActivityContent/UniversalComponents/Content/ActivityRewardList"),
  ActivityButtonItem_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityButtonItem"),
  ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RacingBetsActivityView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.gLt = void 0),
      (this.nnl = void 0),
      (this.snl = void 0),
      (this.anl = void 0),
      (this.WPc = void 0),
      (this.QPc = void 0),
      (this.qfc = void 0),
      (this.BNe = () => {
        this.anl.FunctionButton.SetRedDotVisible(this.WPc.RedPointShowState);
      }),
      (this.a8c = () => {
        this.l8c();
      }),
      (this.DFe = () => {
        this.WPc.GetIfFirstOpen() &&
          ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(
            this.WPc,
          );
        this.WPc.GetPreGuideQuestFinishState() ||
          UiManager_1.UiManager.OpenView(
            "QuestView",
            this.WPc.GetUnFinishPreGuideQuestId(),
          );
        var t =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
        InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
          t.GetSeasonConfig().DungeonInstanceId,
          [ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId()],
          t.GetSeasonConfig().DungeonEntranceId,
          0,
        ),
          ModelManager_1.ModelManager.RacingBetsModel.SetIsFromActivityOpenDungeon();
      }),
      (this.KPc = () => {
        var t = this.WPc?.GetGroupRewardData(1),
          i = this.WPc?.GetGroupRewardData(3);
        UiManager_1.UiManager.OpenView("RacingBetsActivityRewardView", [t, i]);
      }),
      (this.XPc = () => {
        var t = this.WPc?.GetGroupRewardData(2);
        UiManager_1.UiManager.OpenView("RacingBetsRewardView", [t]);
      });
  }
  OnSetData() {
    this.WPc = this.ActivityBaseData;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.a8c,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
        this.BNe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.a8c,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
        this.BNe,
      );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.SpineSkeletonAnimationComponent],
    ];
  }
  async OnBeforeStartAsync() {
    (this.gLt = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
      await this.gLt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.nnl = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA()),
      await this.nnl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.snl = new ActivityRewardList_1.ActivityRewardList()),
      await this.snl.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      (this.anl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(
        this.ActivityBaseData,
      )),
      await this.anl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      (this.QPc = new ActivityButtonItem_1.ActivityButtonItem()),
      await this.QPc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()),
      (this.qfc = new ActivityButtonItem_1.ActivityButtonItem()),
      await this.qfc.CreateThenShowByActorAsync(this.GetItem(15).GetOwner());
  }
  OnStart() {
    var t,
      i,
      e = this.WPc.LocalConfig;
    e &&
      (this.gLt.SetTitleByText(this.WPc.GetTitle()),
      (i = e.DescTheme),
      (t = !StringUtils_1.StringUtils.IsEmpty(i)),
      this.gLt.SetSubTitleVisible(t),
      t &&
        (this.gLt.SetSubTitleByTextId(i), (t = e.DescThemeIcon)) &&
        this.gLt.SetSubTitleIconByPath(t),
      this.nnl.SetContentByTextId(e.Desc),
      (i = this.WPc.GetPreviewReward()),
      this.snl.SetTitleByTextId("CollectActivity_reward"),
      this.snl.InitGridLayout(this.snl.InitCommonGridItem),
      this.snl.RefreshItemLayout(i),
      this.anl.FunctionButton.SetFunction(this.DFe),
      this.QPc.BindRedDot("RedDotRacingBetsActivityInternalReward"),
      this.QPc.SetFunction(this.XPc),
      this.qfc.BindRedDot("RedDotRacingBetsActivityReward"),
      this.qfc.SetFunction(this.KPc));
  }
  OnBeforeShow() {
    this.GetSpine(16)
      .SetAnimation(0, "start", !1)
      .AnimationComplete.Add(() => {
        this.GetSpine(16).SetAnimation(0, "idle", !0);
      });
  }
  OnBeforeHide() {
    this.GetSpine(16).ClearTracks();
  }
  OnRefreshView() {
    var t,
      i = this.WPc.GetCurLegMatchData();
    i &&
      ((t = this.WPc.IsUnLock()),
      this.anl.SetPanelConditionVisible(!t),
      this.FNe(),
      t ||
        this.anl.SetPerformanceConditionLock(
          this.WPc.ConditionGroupId,
          this.WPc.Id,
        ),
      this.anl.FunctionButton.SetUiActive(t),
      this.anl.FunctionButton.SetRedDotVisible(this.WPc.RedPointShowState),
      this.GetText(9).ShowTextNew(i.Name));
  }
  FNe() {
    var [, t] = this.GetTimeVisibleAndRemainTime();
    this.gLt.SetTimeTextByText(t);
  }
  If1(t, i) {
    let e = "",
      n = !1;
    return (
      (n =
        1 === t
          ? ((e = "Dango_ActivityPage_StatusTime_Bet"), !0)
          : 2 === t
            ? ((e = "Dango_ActivityPage_StatusTime_Wait"), !0)
            : 3 === t
              ? ((e = "Dango_ActivityPage_StatusTime_Race"), !0)
              : ((e =
                  4 === t
                    ? 0 < i
                      ? "Dango_ActivityPage_StatusTime_RaceEnd"
                      : "Dango_ActivityPage_StatusTime_FinalRaceEnd"
                    : (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "RacingBets",
                          78,
                          "当前比赛处于notOpen|end状态",
                          ["state", t],
                        ),
                      "")),
                !1)),
      [e, n]
    );
  }
  l8c() {
    var t,
      i,
      e,
      n,
      s,
      a = this.WPc?.GetCurLegMatchData();
    a &&
      0 !== (n = a.GetLegMatchState()) &&
      ((s = a.GetLegRemindTime()),
      (i = this.GetText(11)),
      ([e, t] = this.If1(n, s)),
      0 < s
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            i,
            e,
            TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(s).CountDownText,
          )
        : i.ShowTextNew(e),
      i.SetChangeColor(3 === n, i.changeColor),
      (s = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(a.Id)),
      (e = 4 === n),
      (i = this.GetText(6)),
      s && e
        ? ((n = a.GetChampionDangoId()),
          (s = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(n).Name),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            i,
            "Dango_MainPage_BetStatus_ChampDango",
            new LguiUtil_1.TableTextArgNew(s),
          ),
          this.GetSprite(7).SetUIActive(!1),
          this.GetSprite(8).SetUIActive(!0))
        : ((n = 0 < (e = a.BetDangoId)),
          t
            ? n
              ? ((s =
                  ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(
                    e,
                  ).Name),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  i,
                  "Dango_MainPage_BetStatus_Bet",
                  new LguiUtil_1.TableTextArgNew(s),
                ))
              : i.ShowTextNew("Dango_MainPage_BetStatus_NotBet")
            : i.ShowTextNew("Dango_ActivityPage_BetStatus_RaceEnd"),
          this.GetSprite(7).SetUIActive(!n && t),
          this.GetSprite(8).SetUIActive(n || !t)));
  }
  OnTimer(t) {
    this.FNe(), this.l8c();
  }
}
exports.RacingBetsActivityView = RacingBetsActivityView;
//# sourceMappingURL=RacingBetsActivityView.js.map
