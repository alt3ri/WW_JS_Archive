"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceView = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
  HelpController_1 = require("../Help/HelpController"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  OnlineController_1 = require("../Online/OnlineController"),
  PowerController_1 = require("../Power/PowerController"),
  PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem"),
  RoguelikeInstanceBtnPanel_1 = require("../Roguelike/View/RoguelikeInstanceBtnPanel"),
  RoleController_1 = require("../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TowerElementItem_1 = require("../TowerDetailUi/View/TowerElementItem"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  InstanceDungeonData_1 = require("./Define/InstanceDungeonData"),
  ExchangeRewardModel_1 = require("./ExchangeReward/ExchangeRewardModel"),
  InstanceDetectDynamicItem_1 = require("./InstanceDetectDynamicItem"),
  InstanceDetectItem_1 = require("./InstanceDetectItem"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController"),
  InstanceDungeonEntranceRewardItem_1 = require("./InstanceDungeonEntranceRewardItem"),
  InstanceDungeonMatchingCountDown_1 = require("./InstanceDungeonMatchingCountDown"),
  MowingDifficultyDropDownPanel_1 = require("./MowingDifficultyDropDownPanel"),
  MATCHING_ITEM_OFFSET = -98,
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  InstanceDungeonEntranceTowerDefenceItem_1 = require("./InstanceDungeonEntranceTowerDefenceItem");
class InstanceDungeonEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.tli = 0),
      (this.NUe = 0),
      (this.ili = 0),
      (this.oli = void 0),
      (this.rli = void 0),
      (this.nli = void 0),
      (this.sli = void 0),
      (this.sOe = void 0),
      (this.ali = void 0),
      (this.lli = void 0),
      (this._li = void 0),
      (this.uli = void 0),
      (this.cli = void 0),
      (this.mli = void 0),
      (this.dli = 0),
      (this.Cli = void 0),
      (this.gli = void 0),
      (this.fli = void 0),
      (this.$Ys = void 0),
      (this.SQs = void 0),
      (this.Szs = void 0),
      (this.Qai = void 0),
      (this.Xai = !1),
      (this.pli = []),
      (this.vli = []),
      (this.Mli = void 0),
      (this.Eli = void 0),
      (this.Sli = void 0),
      (this.yli = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.Ili = () => {
        PowerController_1.PowerController.OpenPowerView();
      }),
      (this.$ai = () => {
        var e =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        e &&
          ((e = e.GetActivityLevelCountdownText(this.NUe)),
          this.GetText(16).SetUIActive(!0),
          this.GetText(16).SetText(e),
          StringUtils_1.StringUtils.IsEmpty(e)) &&
          ((this.Xai = !1),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "ActivityMowing_Newlevel",
            ),
          ),
          this.Tli());
      }),
      (this.Pla = () => {
        TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
          this.NUe,
        ) &&
          ((this.Xai = !1),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "ActivityMowing_Newlevel",
            ),
          ),
          this.Tli(),
          this.XYs(),
          this.Qli());
        var e =
          TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownText(
            this.NUe,
          ) ?? "";
        this.GetText(16).SetUIActive(!0), this.GetText(16).SetText(e);
      }),
      (this.Lli = (e, t, i) => {
        var n = new InstanceDetectItem_1.InstanceDetectItem();
        return (
          n.BindClickInstanceCallback(this.Dli),
          n.BindClickSeriesCallback(this.Rli),
          n.BindCanExecuteChange(this.Lke),
          n
        );
      }),
      (this.Rli = (e, t, i) => {
        this.lli && this.lli !== t && this.lli.SetToggleState(0, !0),
          (this.lli = t),
          (this.ili = i ? e : -1),
          (this.NUe = i ? this.nli.get(e)[0] : this.NUe);
        t = this.Uli();
        this.Cli.RefreshByData(t), this.Cli.BindLateUpdate(this.Cai);
      }),
      (this.Cai = () => {
        var e =
          (this.dli - 1) / (this.nli.size + (this.sli.get(this.ili) ?? 0));
        this.GetUIDynScrollViewComponent(3).SetScrollProgress(e),
          this.Cli?.UnBindLateUpdate();
      }),
      (this.Dli = (e, t, i = void 0) => {
        (this.NUe = e),
          i &&
            (this.uli && (this.uli.IsSelect = !1),
            (this.uli = i),
            (this.uli.IsSelect = !0)),
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
            this.NUe),
          this._li && this._li !== t && this._li.SetToggleState(0, !0),
          (this._li = t),
          this.Tli(),
          this.UiViewSequence.PlaySequence("Xz"),
          this.Ali(),
          this.Pli();
      }),
      (this.Lke = (e) => this.NUe !== e),
      (this.xli = () => {
        UiManager_1.UiManager.IsViewOpen("PowerView") &&
          UiManager_1.UiManager.CloseView("PowerView"),
          this.UiViewSequence.PlaySequencePurely("Close01", !0);
      }),
      (this.wli = () => {
        const e = this.NUe;
        if (e)
          if (
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
              e,
            )
          )
            if (RoleController_1.RoleController.IsInRoleTrial())
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TrialRoleDungeonsLimit",
              );
            else {
              ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                !1;
              const n = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
                  this.NUe,
                ),
              );
              var t, i;
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceLevelTooLow(
                this.NUe,
              )
                ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    200,
                  )).FunctionMap.set(2, () => {
                    n
                      ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                          e),
                        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
                      : this.Jra();
                  }),
                  t.FunctionMap.set(1, () => {
                    this.Bli();
                  }),
                  (i =
                    ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
                      e,
                    )),
                  t.SetTextArgs(i[1].toString()),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    t,
                  ))
                : n
                  ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                      e),
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
                  : this.Jra();
            }
          else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "InstanceDungeonLackChallengeTimes",
            );
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              17,
              "副本入口界面点击挑战错误，当前未选择副本",
            );
      }),
      (this.bli = () => {
        var e;
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
              !0),
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(
              this.NUe,
            ),
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 1
              ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                  this.NUe,
                  !1,
                )
              : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  111,
                )).FunctionMap.set(2, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                    this.NUe,
                    !0,
                  );
                }),
                e.FunctionMap.set(1, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                    this.NUe,
                    !1,
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                )))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              5,
              "非联机下无法进行组队挑战，请联系程序查BUG",
            );
      }),
      (this.qli = () => {
        var e;
        OnlineController_1.OnlineController.ShowTipsWhenOnlineDisabled() &&
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
            this.NUe,
          )
            ? RoleController_1.RoleController.IsInRoleTrial()
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TrialRoleDungeonsLimit",
                )
              : ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)
                ? ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                    !0),
                  this.oli.BindOnStopTimer(
                    () =>
                      1 !==
                      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
                  ),
                  !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                  (e =
                    ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <=
                    1
                    ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                        this.NUe,
                      )
                    : e < ModelManager_1.ModelManager.OnlineModel.TeamMaxSize
                      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                          111,
                        )).FunctionMap.set(2, () => {
                          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                            this.NUe,
                            !0,
                          );
                        }),
                        e.FunctionMap.set(1, () => {
                          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                            this.NUe,
                          );
                        }),
                        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                          e,
                        ))
                      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                          "CanNotMatching",
                        ))
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "IsNotOpenOnline",
                  )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "InstanceDungeonLackChallengeTimes",
              ));
      }),
      (this.Gli = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .SelectInstanceId,
        );
      }),
      (this.Nli = () => {
        HelpController_1.HelpController.OpenHelpById(
          ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID,
        );
      }),
      (this.Bli = () => {
        this.UiViewSequence.StopSequenceByKey("Popup"),
          this.UiViewSequence.PlaySequencePurely("Popup", !1, !0);
      }),
      (this.Oli = (e) => {
        "PowerView" === e
          ? this.Bli()
          : "ActivityRewardPopUpView" === e && this.XYs();
      }),
      (this.$Ye = () => {
        switch (
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
        ) {
          case 2:
            this.oli?.PlayAnimation("Finish"),
              UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
            break;
          case 0:
            this.oli?.PlayAnimation("Close");
            break;
          case 1:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "MatchingOtherCancel",
            ),
              this.oli?.PlayAnimation("Start"),
              this.Fli(!0),
              this.Vli();
            break;
          case 4:
            this.Fli(!1),
              (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                !0),
              EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(),
                !0,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnEnterTeam,
              );
        }
      }),
      (this.YYe = () => {
        this.Fli(!0), this.oli?.PlayAnimation("Start"), this.Vli(), this.Hli();
      }),
      (this.jli = () => {
        return new TowerElementItem_1.TowerElementItem();
      }),
      (this.dtt = () => {
        var e =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
            this.tli,
          ).HelpButtonId;
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.Wli = () => {
        let e = void 0;
        var t;
        19 === this.Kli.InstSubType &&
          ((t =
            ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()),
          (e = t?.GetRewardViewData())),
          (e =
            21 === this.Kli.InstSubType
              ? TowerDefenceController_1.TowerDefenseController.BuildPreviewRewardData()
              : e) &&
            UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", e);
      });
  }
  get Kli() {
    return this.NUe
      ? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
      : void 0;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIButtonComponent],
      [1, ue_1.UIText],
      [2, ue_1.UISprite],
      [3, ue_1.UIDynScrollViewComponent],
      [4, ue_1.UIItem],
      [5, ue_1.UIItem],
      [6, ue_1.UIText],
      [7, ue_1.UIText],
      [8, ue_1.UITexture],
      [9, ue_1.UIButtonComponent],
      [10, ue_1.UIButtonComponent],
      [11, ue_1.UIButtonComponent],
      [12, ue_1.UIText],
      [14, ue_1.UIItem],
      [15, ue_1.UIItem],
      [16, ue_1.UIText],
      [17, ue_1.UIItem],
      [18, ue_1.UIItem],
      [19, ue_1.UIButtonComponent],
      [20, ue_1.UIItem],
      [21, ue_1.UIItem],
      [22, ue_1.UIItem],
      [13, ue_1.UITexture],
      [23, ue_1.UIButtonComponent],
      [24, ue_1.UIItem],
      [25, ue_1.UIItem],
      [26, ue_1.UIItem],
      [27, ue_1.UIText],
      [28, ue_1.UIText],
      [29, ue_1.UIText],
      [30, ue_1.UIItem],
      [31, ue_1.UIItem],
      [32, ue_1.UIItem],
      [33, ue_1.UIItem],
      [34, ue_1.UIItem],
      [35, ue_1.UIItem],
      [36, ue_1.UIHorizontalLayout],
      [37, ue_1.UIText],
      [38, ue_1.UIButtonComponent],
      [39, ue_1.UIItem],
      [40, ue_1.UIItem],
      [41, ue_1.UIItem],
      [42, ue_1.UIButtonComponent],
      [43, ue_1.UIText],
      [44, ue_1.UIItem],
      [46, ue_1.UIItem],
      [45, ue_1.UIItem],
      [47, ue_1.UIItem],
      [48, ue_1.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.xli],
        [9, this.wli],
        [10, this.qli],
        [11, this.bli],
        [19, this.Gli],
        [23, this.Nli],
        [38, this.dtt],
        [42, this.Wli],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.fli =
      new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem()),
      await this.fli.CreateByActorAsync(this.GetItem(33).GetOwner());
    var e = this.GetItem(17);
    (this.Szs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      await this.Szs.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        e.GetParentAsUIItem(),
      ),
      this.Szs.RefreshAddButtonActive(),
      this.Szs.ShowWithoutText(ItemDefines_1.EItemId.OverPower),
      this.Szs.SetActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10066),
      ),
      (this.SQs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      (this.SQs.SkipAutoAddEvent = !0),
      await this.SQs.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        e.GetParentAsUIItem(),
      ),
      e.SetUIActive(!1),
      this.SQs.ShowWithoutText(ItemDefines_1.EItemId.Power),
      (this.cli = this.GetUIDynScrollViewComponent(3)),
      (this.mli = new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem()),
      (this.Cli = new DynScrollView_1.DynamicScrollView(
        this.cli,
        this.GetItem(4),
        this.mli,
        this.Lli,
      )),
      await this.Cli.Init(),
      (this.$Ys =
        new InstanceDungeonEntranceTowerDefenceItem_1.InstanceDungeonEntranceTowerDefenceItem()),
      await this.$Ys.CreateByActorAsync(this.GetItem(45).GetOwner()),
      this.$Ys.SetUiActive(!1),
      (this.Eli = new RoguelikeInstanceBtnPanel_1.RoguelikeInstanceBtnPanel()),
      await this.Eli.CreateByActorAsync(this.GetItem(32).GetOwner()),
      (this.Sli =
        new MowingDifficultyDropDownPanel_1.MowingDifficultyDropDownPanel()),
      (this.Sli.SkipDestroyActor = !0),
      await this.Sli.CreateThenShowByActorAsync(this.GetItem(39).GetOwner()),
      (this.oli =
        new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
      await this.oli.CreateByResourceIdAsync(
        "UiItem_OnlineApplyUILayer_Prefab",
        this.GetItem(46),
      ),
      this.oli.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET),
      this.oli.SetUiActive(!1);
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yli),
      this.SQs.SetButtonFunction(this.Ili),
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10017) ||
        this.SQs?.SetActive(!1),
      (this.gli =
        new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem()),
      this.gli.SetRootActor(this.GetItem(31).GetOwner(), !0),
      (this.Mli = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(36),
        this.jli,
      )),
      (this.tli =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
      (this.rli = []),
      (this.sli = new Map());
    var t,
      i,
      e,
      n =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
          this.tli,
        );
    this.nli = new Map();
    for ([t, i] of n) {
      let e = this.nli.get(i);
      e || ((e = []), this.nli.set(i, e)), e.push(t);
    }
    for ([, e] of this.nli) for (const s of e) this.rli.push(s);
    this.AddChild(this.Sli);
  }
  OnTick(e) {
    this.Xai && this.Qai?.();
  }
  OnBeforeShow() {
    this.Eli?.BindRedDot(), this.SHe();
  }
  OnAfterShow() {
    this.oli.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    }),
      this.oli?.BindOnAfterCloseAnimation((e) => {
        "Close" === e && this.Fli(!1);
      }),
      !this.rli || this.rli.length <= 0
        ? (this.GetItem(14).SetUIActive(!1), this.GetItem(5).SetUIActive(!1))
        : 1 ===
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
          (this.Fli(!0),
          this.oli?.PlayAnimation("Start"),
          this.oli.StartTimer());
  }
  OnBeforeHide() {
    this.Eli?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    1 ===
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "MatchingBackground",
      ),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    for (const e of this.pli) e.Destroy();
    this.pli.length = 0;
    for (const t of this.vli) t.Destroy();
    (this.vli.length = 0),
      (this.oli = void 0),
      (this.nli = void 0),
      this.SQs.Destroy(),
      this.Szs.Destroy(),
      this.Cli && (this.Cli.ClearChildren(), (this.Cli = void 0)),
      (this.cli = void 0),
      (this.Sli = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.Oli),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingChange,
        this.$Ye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CloseView,
      this.Oli,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingChange,
        this.$Ye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      );
  }
  SHe() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        this.tli,
      );
    this.GetText(1).ShowTextNew(e.Name),
      e.TitleSprite
        ? this.SetSpriteByPath(e.TitleSprite, this.GetSprite(2), !0)
        : this.GetSprite(2).SetUIActive(!1),
      this.GetButton(38).RootUIComp.SetUIActive(0 !== e.HelpButtonId),
      0 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
        (this.oli?.PlayAnimation("Close"), this.oli?.SetUiActive(!1)),
      this.Qli(),
      this.Ali(),
      this.XYs();
  }
  Jai() {
    var e;
    return ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
      this.NUe,
    )
      ? !!(e =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()) &&
          ((this.Qai = this.$ai), !e.GetActivityLevelUnlockState(this.NUe))
      : !!TowerDefenceController_1.TowerDefenseController.CheckInUiFlow() &&
          ((e =
            TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
              this.NUe,
            )) || (this.Qai = this.Pla),
          !e);
  }
  Qli() {
    var e = this.Uli();
    this.Cli.RefreshByData(e),
      this.GetItem(14).SetUIActive(!0),
      this.Cli.BindLateUpdate(() => {
        var e = this.Cli.GetScrollItemCount();
        this.dli + 1 < e || this.Cli.ScrollToItemIndex(this.dli),
          this.Cli.UnBindLateUpdate();
      });
  }
  XYs() {
    if (this.Kli) {
      if (19 === this.Kli.InstSubType) return void this.kli();
      var e, t;
      if (21 === this.Kli.InstSubType)
        return (
          (e =
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsSpecificInstanceDungeonBySubType(
              21,
            )),
          this.GetItem(41).SetUIActive(e),
          void (
            e &&
            (this.GetItem(44).SetUIActive(
              TowerDefenceController_1.TowerDefenseController.CheckHasReward(),
            ),
            (e =
              TowerDefenceController_1.TowerDefenseController.BuildTotalScoreContent()),
            (t =
              TowerDefenceController_1.TowerDefenseController.GetCurrentScoreLimit()),
            this.GetText(43).SetText(e + "/" + t))
          )
        );
    }
    this.GetItem(41).SetUIActive(!1);
  }
  kli() {
    var e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon(),
      t =
        ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
    this.GetItem(41).SetUIActive(e && void 0 !== t),
      e &&
        void 0 !== t &&
        (this.GetItem(44).SetUIActive(t.IsHaveRewardToGet()),
        this.GetText(43).SetText(t.GetTotalPoint().toString()));
  }
  Tli() {
    this.Xli(),
      this.$li(),
      this.Yli(),
      this.Jli(),
      this.zli(),
      this.Hli(),
      this.Zli(),
      this.e1i(),
      this.YYs(),
      this.t1i(),
      (this.Xai = this.Jai());
  }
  Xli() {}
  $li() {
    var e = this.Kli;
    e &&
      (this.GetText(6).ShowTextNew(e.MapName),
      this.GetText(7).ShowTextNew(e.DungeonDesc),
      this.SetTextureByPath(e.BannerPath, this.GetTexture(8)));
  }
  Pli() {
    var e = 15 === this.Kli.InstSubType;
    this.Eli?.SetUiActive(e);
  }
  YYs() {
    var e;
    this.Kli
      ? ((e = 21 === this.Kli.InstSubType),
        this.$Ys.SetUiActive(e),
        this.GetItem(47).SetUIActive(e),
        e &&
          ((e =
            TowerDefenceController_1.TowerDefenseController.BuildPhantomForInstanceDungeonEntranceData(
              this.Kli.Id,
            )),
          this.$Ys.SetPhantoms(e),
          (e =
            TowerDefenceController_1.TowerDefenseController.BuildRecommendLevelForInstanceDungeonEntranceData(
              this.Kli.Id,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(48),
            e.TextId,
            e.Level,
          )))
      : (this.$Ys.SetUiActive(!1), this.GetItem(47).SetUIActive(!1));
  }
  t1i() {
    var e = 19 === this.Kli.InstSubType,
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
          this.Kli.Id,
        );
    this.Sli?.SetActive(e && t),
      e && t && this.Sli?.RefreshByInstanceId(this.NUe);
  }
  Ali() {
    var e;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
    !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
      ? (this.SetButtonUiActive(10, !1),
        this.SetButtonUiActive(9, !1),
        this.SetButtonUiActive(11, !1))
      : (e = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(
            this.NUe,
          ))?.OnlineType === InstOnlineType_1.InstOnlineType.Single
        ? (this.SetButtonUiActive(10, !1),
          this.SetButtonUiActive(9, !0),
          this.SetButtonUiActive(11, !1))
        : e?.OnlineType === InstOnlineType_1.InstOnlineType.Multi
          ? (this.SetButtonUiActive(10, !0),
            this.SetButtonUiActive(9, !1),
            ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? this.SetButtonUiActive(11, !0)
              : this.SetButtonUiActive(11, !1))
          : (this.SetButtonUiActive(10, !0),
            ModelManager_1.ModelManager.GameModeModel.IsMulti
              ? (this.SetButtonUiActive(9, !1), this.SetButtonUiActive(11, !0))
              : (this.SetButtonUiActive(9, !0),
                this.SetButtonUiActive(11, !1)));
  }
  Yli() {
    var e = this.Kli.RewardId,
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          e,
        )?.RewardId,
      e =
        (this.gli.SetRewardBtnActive(1 < (e?.size ?? 0)),
        ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
          this.Kli.Id,
        )),
      t = e
        ? 0
        : ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
            this.Kli.FirstRewardId,
          )?.length,
      t =
        (this.gli.SetFirstRewardLength(t),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
          .MonsterPreview),
      i = this.GetButton(19).GetOwner(),
      t = 0 < t.length,
      i =
        (i.GetUIItem().SetUIActive(t),
        this.GetItem(40).SetUIActive(t),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceDungeonReward(
          this.NUe,
        ));
    (this.sOe = i[0]),
      this.sOe.length <= 0
        ? this.GetItem(31).SetUIActive(!1)
        : (this.GetItem(31).SetUIActive(!0),
          (t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetInstanceFirstRewardId(
              this.NUe,
            )),
          this.gli.RefreshRewardText(!e && 0 !== t)),
      this.gli.RefreshReward(this.sOe, !i[1]),
      this.gli.SetDoubleRewardActivity(
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          this.Kli.CustomTypes,
        ),
      );
  }
  Jli() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          e.RepeatRewardId,
        );
    (this.ali = e),
      this.ali.length <= 0
        ? this.GetItem(33).SetUIActive(!1)
        : (this.GetItem(33).SetUIActive(!0), this.fli.RefreshRewardText(!1)),
      this.fli.RefreshReward(this.ali, !0);
  }
  zli() {
    this.GetItem(21).SetUIActive(!1);
  }
  Hli() {
    var e = this.GetItem(15),
      t = this.GetItem(30),
      i = this.GetText(16),
      n =
        1 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
      s = this.NUe;
    s &&
      (this.GetItem(20).SetUIActive(!1),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        s,
      )
        ? (this.i1i(), t.SetUIActive(!n), e.SetUIActive(!1))
        : ((n =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockConditionGroupHintText(
              s,
            ))
            ? (i.ShowTextNew(n), i.SetUIActive(!0))
            : i.SetUIActive(!1),
          t.SetUIActive(!1),
          e.SetUIActive(!0)));
  }
  i1i() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        this.NUe,
      );
    !e || e <= 0
      ? (this.GetItem(20).SetUIActive(!1),
        this.SQs.SetActive(!1),
        this.Szs.SetActive(!1))
      : (this.GetItem(20).SetUIActive(!0),
        this.Szs.SetActive(
          ModelManager_1.ModelManager.FunctionModel.IsOpen(10066),
        ),
        this.SQs.SetActive(!0),
        (e =
          ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
            this.NUe,
          )),
        this.SetItemIcon(this.GetTexture(13), e[0][0]?.ItemId),
        this.GetItem(26).SetUIActive(!1),
        this.GetText(12).SetText("x" + e[0][1]),
        this.GetButton(23).RootUIComp.SetUIActive(!1));
  }
  Fli(e) {
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        this.NUe,
      );
    this.GetItem(30).SetUIActive(!e && t), this.GetItem(18)?.SetUIActive(e);
  }
  Jra() {
    const e = this.NUe;
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(35);
    t.FunctionMap.set(2, () => {
      this.Bli(),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          e),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    }),
      t.FunctionMap.set(1, () => {
        this.Bli();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  Vli() {
    this.oli.SetMatchingTime(0), this.oli.StartTimer();
  }
  Uli() {
    this.dli = 0;
    var e = [];
    let t = -1;
    this.o1i();
    var i,
      n,
      s = 1 === this.sli.size;
    let r = !1;
    for ([i, n] of this.nli) {
      var o = i === this.ili,
        h = 1 === this.sli.get(i);
      for (const l of n) {
        if ((t !== i && !s) || (t !== i && s && h)) {
          var a = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          if (
            ((a.InstanceSeriesTitle = i),
            (a.InstanceGirdId = l),
            (a.IsSelect = o),
            (a.IsOnlyOneGrid = h),
            (t = i),
            e.push(a),
            r || this.dli++,
            s && h)
          )
            break;
        }
        !o ||
          h ||
          (((a =
            new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId =
            l),
          (a.IsSelect = l === (this.NUe ?? 0)),
          (a.IsShow = o),
          e.push(a),
          (r = !!a.IsSelect || r)) ||
          this.dli++;
      }
    }
    return e;
  }
  o1i() {
    let e = 0,
      t = 0,
      i = 0;
    this.sli.clear();
    var n,
      s,
      r,
      o,
      h,
      a = !!this.NUe;
    for ([n, s] of this.nli)
      if (((t = t || n), this.sli.set(n, s.length), !a))
        for (const l of s)
          (this.ili && n !== this.ili) ||
            ((e = e || l),
            (r =
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
                l,
              )) &&
              l > this.NUe &&
              ((o =
                ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                  l,
                )),
              (h =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                  l,
                  ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
                )),
              r) &&
              !o &&
              h > i &&
              ((this.NUe = l), (this.ili = n), (i = h)));
    this.NUe || (this.NUe = e),
      this.ili || (this.ili = t),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
        this.NUe);
  }
  Zli() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ).RewardId,
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          e,
        )?.SharedId;
    if (e) {
      var t =
          ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(
            e,
          ),
        e =
          (this.GetItem(24).SetUIActive(!0),
          this.GetText(28).SetUIActive(!0),
          ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(
            e,
          )),
        t = t.MaxCount;
      const n = t - e;
      if ((this.GetText(28).SetText((0 <= n ? n : 0) + "/" + t), n === t))
        return void this.GetItem(25).SetUIActive(!1);
    } else {
      (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ).EnterControlId),
        (t =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(
            e,
          ));
      if (t?.LimitChallengedTimes) {
        this.GetItem(24).SetUIActive(!0), this.GetText(28).SetUIActive(!0);
        const n = 0 <= t.LeftChallengedTimes ? t.LeftChallengedTimes : 0;
        if (
          (this.GetText(28).SetText(n + "/" + t.LimitChallengedTimes),
          n === t.LimitChallengedTimes)
        )
          return void this.GetItem(25).SetUIActive(!1);
      } else this.GetItem(24).SetUIActive(!1), this.GetText(28).SetUIActive(!1);
    }
    e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceResetTime(
        this.NUe,
      );
    let i = MathUtils_1.MathUtils.LongToBigInt(e ?? 0);
    i <= 0 &&
      (i = MathUtils_1.MathUtils.LongToBigInt(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .EntranceEndTime,
      ));
    const n = Number(i) - TimeUtil_1.TimeUtil.GetServerTime();
    0 < i && 0 < n
      ? (this.GetItem(25).SetUIActive(!0),
        (t = TimeUtil_1.TimeUtil.CalculateRemainingTime(n)),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(29),
          t.TextId,
          0 < t.TimeValue ? t.TimeValue : 1,
        ))
      : this.GetItem(25).SetUIActive(!1);
  }
  e1i() {
    var e = this.Kli,
      t = e?.MonsterTips,
      t =
        (t
          ? (this.GetItem(34)?.SetUIActive(!0), this.GetText(37).ShowTextNew(t))
          : this.GetItem(34)?.SetUIActive(!1),
        e?.RecommendElement);
    !t || t.length <= 0
      ? this.GetItem(35)?.SetUIActive(!1)
      : (this.GetItem(35)?.SetUIActive(!0), this.Mli?.RefreshByData(t));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]) - 1,
      t = this.Cli.GetScrollItemFromIndex(t);
    if (t) return [(t = t.GetExtendToggleForGuide().RootUIComp), t];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        17,
        "副本入口聚焦引导extraParam字段配置错误, 找不到对应的副本选项",
        ["configParams", e],
      );
  }
}
exports.InstanceDungeonEntranceView = InstanceDungeonEntranceView;
//# sourceMappingURL=InstanceDungeonEntranceView.js.map
