"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceView = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../Ui/Base/UiAsyncTask"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
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
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  InstanceDungeonData_1 = require("./Define/InstanceDungeonData"),
  InstanceDungeonDefine_1 = require("./Define/InstanceDungeonDefine"),
  InstanceDetectDynamicItem_1 = require("./InstanceDetectDynamicItem"),
  InstanceDetectItem_1 = require("./InstanceDetectItem"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController"),
  InstanceDungeonMatchingCountDown_1 = require("./InstanceDungeonMatchingCountDown"),
  InstanceDungeonInfoItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonInfoItem"),
  InstanceDungeonMowingPanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonMowingPanelItem"),
  InstanceDungeonSolarSpeedPanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonSolarSpeedPanelItem"),
  InstanceDungeonTimeAndCountItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonTimeAndCountItem"),
  InstanceDungeonTowerDefensePanelItem_1 = require("./InstanceDungeonSubComponent/InstanceDungeonTowerDefensePanelItem"),
  BaseInstanceDungeonViewModel_1 = require("./InstanceDungeonViewModel/BaseInstanceDungeonViewModel"),
  MATCHING_ITEM_OFFSET = -98;
class InstanceDungeonEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.ili = 0),
      (this.sli = void 0),
      (this.lli = void 0),
      (this._li = void 0),
      (this.uli = void 0),
      (this.cli = void 0),
      (this.mli = void 0),
      (this.Cli = void 0),
      (this.dli = 0),
      (this.Xai = !1),
      (this._lh = 1e3),
      (this.xth = void 0),
      (this.Pth = void 0),
      (this.NXs = void 0),
      (this.fea = void 0),
      (this.wth = void 0),
      (this.Bth = void 0),
      (this.Eli = void 0),
      (this.bth = void 0),
      (this.qth = void 0),
      (this.hX_ = void 0),
      (this.HLn = void 0),
      (this.yli = () => {
        this.CloseMe();
      }),
      (this.Ili = () => {
        PowerController_1.PowerController.OpenPowerView();
      }),
      (this.NDc = () => {
        HelpController_1.HelpController.OpenHelpById(
          InstanceDungeonDefine_1.DUNGEON_ARCHIVE_HELP_ID,
        );
      }),
      (this.Lli = (e, t, n) => {
        var i = new InstanceDetectItem_1.InstanceDetectItem();
        return (
          (i.OpenParam = this.HLn),
          i.BindClickInstanceCallback(this.Dli),
          i.BindClickSeriesCallback(this.Rli),
          i.BindCanExecuteChange(this.Lke),
          i.BindCanShowRedDot(this.c_l),
          i.BindIconRightPathGetter(
            InstanceDungeonEntranceController_1
              .InstanceDungeonEntranceController.GetIconRightPathGetter,
          ),
          i
        );
      }),
      (this.Rli = (e, t, n) => {
        this.lli && this.lli !== t && this.lli.SetToggleState(0, !0),
          (this.lli = t),
          (this.ili = n ? e : -1),
          (this.NUe = n ? this.HLn.InstanceByTitleMap.get(e)[0] : this.NUe);
        t = this.Uli();
        this.Cli.RefreshByData(t), this.Cli.BindLateUpdate(this.Cai);
      }),
      (this.Cai = () => {
        var e =
          (this.dli - 1) /
          (this.HLn.InstanceByTitleMap.size + (this.sli.get(this.ili) ?? 0));
        this.GetUIDynScrollViewComponent(0).SetScrollProgress(e),
          this.Cli?.UnBindLateUpdate();
      }),
      (this.Dli = (e, t, n = void 0) => {
        var i = new UiAsyncTask_1.UiAsyncTask(
          "InstanceDungeonEntranceView.RefreshInstance",
          async () => {
            await this.G9_(e, t, n);
          },
        );
        this.RunAsyncTask(i);
      }),
      (this.G9_ = async (e, t, n = void 0) => {
        (this.NUe = e),
          n &&
            n.IsOnlyOneGrid &&
            n.InstanceSeriesTitle &&
            (this.ili = n.InstanceSeriesTitle),
          n &&
            (this.uli && (this.uli.IsSelect = !1),
            (this.uli = n),
            (this.uli.IsSelect = !0),
            this.ili !== n.InstanceSeriesTitle) &&
            (this.ili = n.InstanceSeriesTitle),
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
            this.NUe),
          this.VDc(
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel
              .SelectInstanceId,
          ),
          this.FDc(),
          this._li && this._li !== t && this._li.SetToggleState(0, !0),
          (this._li = t),
          this.UiViewSequence.PlaySequence("Xz"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSelectInstanceIdChallenge,
            this.NUe,
          ),
          await this.F9_();
      }),
      (this.Lke = (e) => this.NUe !== e),
      (this.c_l = (e) => {
        if (21 === this.Kli?.InstSubType) {
          var t = this.HLn.InstanceByTitleMap.get(e);
          if (t)
            for (const n of t)
              if (this.HLn.CheckInstanceItemHasRedDot(n)) return !0;
        } else if (28 === this.Kli?.InstSubType)
          return ModelManager_1.ModelManager.SolarSpeedModel.HasRedDotByInstanceId(
            e,
          );
        return !1;
      }),
      (this.xli = () => {
        UiManager_1.UiManager.IsViewOpen("PowerView") &&
          UiManager_1.UiManager.CloseView("PowerView"),
          this.UiViewSequence.PlaySequencePurely("Close01", !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CloseInstanceEntrancePositively,
            this.HLn.EntranceId,
          );
      }),
      (this.Bli = () => {
        this.UiViewSequence.StopSequenceByKey("Popup"),
          this.UiViewSequence.PlaySequencePurely("Popup", !1, !0);
      }),
      (this.Oli = (e) => {
        var t = new UiAsyncTask_1.UiAsyncTask(
          "InstanceDungeonEntranceView.RefreshInstance",
          async () => {
            await this.N9_(e);
          },
        );
        this.RunAsyncTask(t);
      }),
      (this.N9_ = async (e) => {
        "PowerView" === e
          ? this.Bli()
          : "ActivityRewardPopUpView" === e && (await this.V9_());
      }),
      (this.$Ye = () => {
        switch (
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
        ) {
          case 2:
            this.Pth?.PlayAnimation("Finish"),
              UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
            break;
          case 0:
            this.Pth?.PlayAnimation("Close");
            break;
          case 1:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "MatchingOtherCancel",
            ),
              this.Pth?.PlayAnimation("Start"),
              this.Fli(!0),
              this.Vli();
            break;
          case 4:
            this.Fli(!1),
              (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                !0),
              UiManager_1.UiManager.IsViewOpen(
                "InstanceDungeonMonsterPreView",
              ) &&
                UiManager_1.UiManager.CloseView(
                  "InstanceDungeonMonsterPreView",
                ),
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
        this.Fli(!0),
          this.Pth?.PlayAnimation("Start"),
          this.Pth?.BindOnStopTimer(
            () =>
              1 !==
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
          ),
          this.Vli(),
          this.Gth();
      }),
      (this.dtt = () => {
        var e =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
            this.HLn.EntranceId,
          ).HelpButtonId;
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.wli = () => {
        var e = this.NUe;
        if (e)
          if (
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
              e,
            )
          )
            if (
              RoleController_1.RoleController.IsInRoleTrial() &&
              !ControllerHolder_1.ControllerHolder.InstanceDungeonController.CanTrialRoleEnterDungeon(
                this.HLn.EntranceId,
                e,
              )
            )
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TrialRoleDungeonsLimit",
              );
            else {
              if (
                (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
                  e,
                ) &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "PhantomFormationEnterInstanceTip",
                  ),
                (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
                  !1),
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(
                  e,
                ))
              )
                if (
                  ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(
                    e,
                  )
                )
                  return (
                    ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      281,
                    )).IsEscViewTriggerCallBack = !1),
                    e.FunctionMap.set(2, () => {
                      (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
                        !0),
                        this.GDc();
                    }),
                    e.FunctionMap.set(1, () => {
                      this.GDc();
                    }),
                    e.FunctionMap.set(-1, () => {
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
                    }),
                    void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                      e,
                    )
                  );
              this.GDc();
            }
          else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "InstanceDungeonLackChallengeTimes",
            );
        else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              16,
              "副本入口界面点击挑战错误，当前未选择副本",
            );
      }),
      (this.bli = () => {
        var e;
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
              !0),
            (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
              !1),
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
                ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
                    this.NUe,
                  )
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "PhantomFormationEnterInstanceTip",
                    )
                  : ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
                      !0),
                    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue =
                      !1),
                    this.Pth.BindOnStopTimer(
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
      (this.RMt = (e) => {
        ModelManager_1.ModelManager.InstanceDungeonModel.HidePowerLackConfirmBox =
          e;
      });
  }
  get Kli() {
    return this.NUe
      ? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
      : void 0;
  }
  OnRegisterComponent() {
    (this.HLn =
      this.OpenParam ||
      new BaseInstanceDungeonViewModel_1.BaseInstanceDungeonViewModel()),
      this.HLn.RegisterView(this),
      (this.ComponentRegisterInfos = [
        [0, ue_1.UIDynScrollViewComponent],
        [1, ue_1.UIItem],
        [3, ue_1.UITexture],
        [2, ue_1.UIItem],
        [4, ue_1.UIItem],
        [5, ue_1.UIItem],
        [6, ue_1.UIItem],
        [7, ue_1.UIItem],
        [8, ue_1.UIItem],
        [9, ue_1.UIItem],
      ]);
  }
  async OnBeforeStartAsync() {
    this.HLn.EntranceId =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    var e = [];
    (this.wth = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(6))),
      await this.wth.CreateCaptionStateItem(this.NDc),
      this.VDc(
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .SelectInstanceId,
      ),
      (this.xth = new InstanceDungeonInfoItem_1.InstanceDungeonInfoItem()),
      (this.xth.OpenParam = this.HLn),
      e.push(
        this.xth.CreateThenShowByResourceIdAsync(
          "UiItem_InstanceDungeon_RightInfo",
          this.GetItem(5),
        ),
      ),
      (this.Pth =
        new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
      e.push(
        this.Pth.CreateByResourceIdAsync(
          "UiItem_OnlineApplyUILayer_Prefab",
          this.GetItem(4),
        ),
      ),
      (this.cli = this.GetUIDynScrollViewComponent(0)),
      (this.mli = new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem()),
      (this.Cli = new DynScrollView_1.DynamicScrollView(
        this.cli,
        this.GetItem(1),
        this.mli,
        this.Lli,
      )),
      e.push(this.Cli.Init()),
      (this.Bth =
        new InstanceDungeonTimeAndCountItem_1.InstanceDungeonTimeAndCountItem()),
      e.push(
        this.Bth.CreateThenShowByResourceIdAsync(
          "UiItem_InstanceDungeon_TimeItem",
          this.GetItem(7),
        ),
      ),
      (this.fea = new PowerCurrencyItem_1.PowerCurrencyItem()),
      e.push(
        this.fea.CreateByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
          this.wth.GetCostContent(),
        ),
      ),
      (this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem()),
      (this.NXs.SkipAutoAddEvent = !0),
      e.push(
        this.NXs.CreateByResourceIdAsync(
          "UIItem_CommonCurrencyItem",
          this.wth.GetCostContent(),
        ),
      ),
      e.push(this.Fth()),
      e.push(this.HLn.RequestServerData()),
      await Promise.all(e),
      this.Pth.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET),
      this.Pth.SetUiActive(!1),
      this.xth.InitButton(this.wli, this.qli, this.bli),
      this.fea.SetActive(
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10066),
      ),
      this.fea.RefreshAddButtonActive(),
      this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower),
      this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power),
      this.NXs.SetButtonFunction(this.Ili);
  }
  OnStart() {
    this.GetTexture(3)?.SetUIActive(!1),
      (this.sli = new Map()),
      this.nyi(),
      this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yli);
  }
  OnTick(e) {
    this.Xai && this.HLn.TimerRefreshFunction(e);
  }
  OnBeforeShow() {
    this.SHe();
  }
  OnAfterShow() {
    this.Pth.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    }),
      this.Pth.BindOnAfterCloseAnimation((e) => {
        "Close" === e && this.Fli(!1);
      }),
      !this.HLn.InstanceIdList || this.HLn.InstanceIdList.length <= 0
        ? this.GetItem(2).SetUIActive(!1)
        : 1 ===
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
          (this.Fli(!0),
          this.Pth?.PlayAnimation("Start"),
          this.Pth.StartTimer());
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
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity(),
      (this.Pth = void 0),
      this.NXs?.Destroy(),
      this.fea?.Destroy(),
      this.Cli && (this.Cli.ClearChildren(), (this.Cli = void 0)),
      (this.cli = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
      ),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = 0);
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
  nyi() {
    var e = this.HLn.GetDefaultSelectData();
    e && ((this.ili = e.SeriesId), (this.NUe = e.InstanceId));
  }
  SHe() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "InstanceDungeonEntranceView.RefreshInstance",
      async () => {
        await this.j9_();
      },
    );
    this.RunAsyncTask(e);
  }
  async j9_() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        this.HLn.EntranceId,
      );
    this.wth.SetTitleByTextIdAndArgNew(e.Name),
      e.TitleSprite
        ? (this.wth.SetTitleIconVisible(!0),
          this.wth.SetTitleIcon(e.TitleSprite))
        : this.wth.SetTitleIconVisible(!1),
      this.wth.SetCloseCallBack(this.xli),
      this.wth.SetHelpBtnActive(0 !== e.HelpButtonId),
      this.wth.SetHelpCallBack(this.dtt),
      0 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
        (this.Pth?.PlayAnimation("Close"), this.Pth?.SetUiActive(!1)),
      this.Qli(),
      await this.V9_();
  }
  RefreshMowingInstance() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "InstanceDungeonEntranceView.RefreshInstance",
      async () => {
        await this.q9_();
      },
    );
    this.RunAsyncTask(e);
  }
  async q9_() {
    var e =
      ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
    e &&
      ((e = e.GetActivityLevelCountdownText(this.NUe)),
      this.xth.SetLockText(e),
      StringUtils_1.StringUtils.IsEmpty(e)) &&
      ((this.Xai = !1),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityMowing_Newlevel",
        ),
      ),
      await this.F9_());
  }
  RefreshTowerDefenseInstance() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "InstanceDungeonEntranceView.RefreshInstance",
      async () => {
        await this.O9_();
      },
    );
    this.RunAsyncTask(e);
  }
  async O9_() {
    TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(
      this.NUe,
    ) &&
      ((this.Xai = !1),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityMowing_Newlevel",
        ),
      ),
      await Promise.all([this.F9_(), this.V9_()]),
      this.Qli());
    var e =
      TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownText(
        this.NUe,
      ) ?? "";
    this.xth.SetLockText(e);
  }
  RefreshSolarSpeedInstance(e, t = !1) {
    if (t || ((this._lh -= e), !(0 < this._lh))) {
      if (this.Cli)
        for (let e = 0; e < this.Cli.GetScrollItemCount(); e++)
          this.Cli?.GetScrollItemFromIndex(e)?.UpdateSelf();
      this.Gth(), (this._lh = 1e3);
    }
  }
  VDc(e) {
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(
        e,
      );
    this.wth.SetCaptionStateActive(t),
      this.wth.SetCaptionChangeColor(!1),
      t &&
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.HasDungeonArchive(
          e,
        )
          ? (this.wth.SetCaptionStateTip("instance_HaveRecord"),
            this.wth.SetCaptionChangeColor(!0))
          : ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonSupportAndWithoutArchive(
              e,
            ) && this.wth.SetCaptionStateTip("instance_Record_leave"));
  }
  Qli() {
    var e = this.Uli();
    this.Cli.RefreshByData(e),
      this.GetItem(2).SetUIActive(!0),
      this.Cli.BindLateUpdate(() => {
        var e = this.Cli.GetScrollItemCount();
        this.dli + 1 < e ||
          ((e = this.HLn.InstanceByTitleMap?.size ?? 0),
          this.dli >= e && (this.dli = e - 1),
          this.Cli.ScrollToItemIndex(this.dli)),
          this.Cli.UnBindLateUpdate();
      });
  }
  async V9_() {
    await Promise.all([this.H9_(), this.$9_(), this.lX_()]);
  }
  async $9_() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsSpecificInstanceDungeonBySubType(
        21,
      );
    21 === this.Kli?.InstSubType && e
      ? (this.bth ||
          ((this.bth =
            new InstanceDungeonTowerDefensePanelItem_1.InstanceDungeonTowerDefensePanelItem()),
          await this.bth.CreateThenShowByResourceIdAsync(
            "UiItem_InstanceDungeon_TowerDefensePanel",
            this.GetItem(8),
          )),
        this.bth.SetActive(!0),
        this.bth.RefreshItem())
      : this.bth?.SetActive(!1);
  }
  async lX_() {
    28 === this.Kli?.InstSubType
      ? (this.hX_ ||
          ((this.hX_ =
            new InstanceDungeonSolarSpeedPanelItem_1.InstanceDungeonSolarSpeedPanelItem()),
          await this.hX_.CreateThenShowByResourceIdAsync(
            "UiItem_InstanceDungeon_TowerDefensePanel",
            this.GetItem(8),
          )),
        this.hX_?.SetUiActive(!0),
        this.hX_?.RefreshItem())
      : this.hX_?.SetUiActive(!1);
  }
  async H9_() {
    var e;
    22 === this.Kli?.InstSubType
      ? ((e = {
          ScoreItemActive: (e =
            !ModelManager_1.ModelManager.MowingRiskModel.GetRiskHarvestInstConfigByInstanceId(
              this.NUe,
            ).Accumulate),
          ScoreText: e
            ? ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceTotalScore()
            : void 0,
          LeftBtnClickCallBack: function () {
            UiManager_1.UiManager.OpenView("MowingBuffView", 0);
          },
          RightBtnClickCallBack: function () {
            UiManager_1.UiManager.OpenView(
              "ActivityRewardPopUpView",
              ModelManager_1.ModelManager.MowingRiskModel.BuildActivityRewardViewData(),
              (e, t) => {
                e &&
                  UiManager_1.UiManager.IsViewOpen(
                    "InstanceDungeonEntranceView",
                  ) &&
                  UiManager_1.UiManager.GetViewByName(
                    "InstanceDungeonEntranceView",
                  )?.AddChildViewById(t);
              },
            );
          },
        }),
        this.qth ||
          ((this.qth =
            new InstanceDungeonMowingPanelItem_1.InstanceDungeonMowingPanelItem()),
          await this.qth.CreateThenShowByResourceIdAsync(
            "UiItem_InstanceDungeon_MowingPanel",
            this.GetItem(8),
          )),
        this.qth.SetActive(!0),
        this.qth.RefreshItemByData(e))
      : this.qth?.SetUiActive(!1);
  }
  FDc() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.CheckAndShowDungeonArchiveExpireTips(
      e,
    );
  }
  async F9_() {
    await Promise.all([this.W9_(), this.Q9_(), this.Fth()]),
      this.Hth(),
      this.K9_(),
      (this.Xai = this.HLn.CheckNeedOnTimer(this.NUe));
  }
  async Fth() {
    var e = this.Kli;
    e &&
      (await this.SetTextureAsync(e.BannerPath, this.GetTexture(3)),
      this.GetTexture(3)?.SetUIActive(!0));
  }
  async W9_() {
    await this.xth.RefreshItem(this.NUe);
  }
  async Q9_() {
    15 === this.Kli.InstSubType
      ? this.Eli
        ? this.Eli.SetActive(!0)
        : ((this.Eli =
            new RoguelikeInstanceBtnPanel_1.RoguelikeInstanceBtnPanel()),
          await this.Eli.CreateThenShowByResourceIdAsync(
            "UiItem_InstanceDungeon_RoguelikePanel",
            this.GetItem(8),
          ),
          this.Eli.BindRedDot(),
          this.AddChild(this.Eli))
      : this.Eli?.SetActive(!1);
  }
  Hth() {
    this.Bth.RefreshItem(this.NUe);
  }
  Gth() {
    this.xth.UpdateInstanceDungeonLockItemAndCostItem();
  }
  K9_() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        this.NUe,
      );
    !e || e <= 0
      ? (this.NXs.SetActive(!1), this.fea.SetActive(!1))
      : (this.NXs.SetActive(!0), this.fea.SetActive(!0));
  }
  Fli(e) {
    this.xth?.SetMatchingItemActive(e);
  }
  Vli() {
    this.Pth.SetMatchingTime(0), this.Pth.StartTimer();
  }
  Uli() {
    this.dli = 0;
    var e = [];
    let t = -1;
    this.o1i();
    var n,
      i,
      s = 1 === this.sli.size;
    let r = !1;
    for ([n, i] of this.HLn.InstanceByTitleMap) {
      var a = n === this.ili,
        o = 1 === this.sli.get(n);
      this.HLn.SortInstanceArray(i);
      for (const l of i) {
        if ((t !== n && !s) || (t !== n && s && o)) {
          var h = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          if (
            ((h.InstanceSeriesTitle = n),
            (h.InstanceGirdId = l),
            (h.IsSelect = a),
            (h.IsOnlyOneGrid = o),
            (t = n),
            e.push(h),
            (r = this.ili === this.NUe && this.NUe === l ? !0 : r) ||
              this.dli++,
            s && o)
          )
            break;
        }
        !a ||
          o ||
          (((h =
            new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId =
            l),
          (h.IsSelect = l === (this.NUe ?? 0)),
          (h.IsShow = a),
          e.push(h),
          (r = !!h.IsSelect || r)) ||
          this.dli++;
      }
    }
    return e;
  }
  o1i() {
    let e = 0,
      t = 0,
      n = 0;
    this.sli.clear();
    var i,
      s,
      r,
      a,
      o,
      h = !!this.NUe;
    for ([i, s] of this.HLn.InstanceByTitleMap)
      if (((t = t || i), this.sli.set(i, s.length), !h))
        for (const l of s)
          (this.ili && i !== this.ili) ||
            ((e = e || l),
            (r =
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
                l,
              )) &&
              l > this.NUe &&
              ((a =
                ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(
                  l,
                )),
              (o =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                  l,
                  ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
                )),
              r) &&
              !a &&
              o > n &&
              ((this.NUe = l), (this.ili = i), (n = o)));
    this.NUe || (this.NUe = e),
      this.ili || (this.ili = t),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
        this.NUe);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]) - 1,
      t = this.Cli.GetScrollItemFromIndex(t);
    if (t) return [(t = t.GetExtendToggleForGuide().RootUIComp), t];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        16,
        "副本入口聚焦引导extraParam字段配置错误, 找不到对应的副本选项",
        ["configParams", e],
      );
  }
  GDc() {
    const e = this.NUe,
      t =
        ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
          !1),
        ModelManager_1.ModelManager.PowerModel.IsPowerEnough(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
            this.NUe,
          ),
        ));
    var n, i;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceLevelTooLow(
      this.NUe,
    )
      ? ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(200)).FunctionMap.set(
          2,
          () => {
            t ||
            ModelManager_1.ModelManager.InstanceDungeonModel
              ?.HidePowerLackConfirmBox
              ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                  e),
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
              : this.Bsa();
          },
        ),
        n.FunctionMap.set(1, () => {
          this.Bli();
        }),
        (i =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
            e,
          )),
        n.SetTextArgs(i[1].toString()),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          n,
        ))
      : t ||
          ModelManager_1.ModelManager.InstanceDungeonModel
            ?.HidePowerLackConfirmBox
        ? ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
            e),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow())
        : this.Bsa();
  }
  Bsa() {
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
      (t.HasToggle = !0),
      (t.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
        "PlotSkipConfirmToggle",
      )),
      t.SetToggleFunction(this.RMt),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
}
exports.InstanceDungeonEntranceView = InstanceDungeonEntranceView;
//# sourceMappingURL=InstanceDungeonEntranceView.js.map
