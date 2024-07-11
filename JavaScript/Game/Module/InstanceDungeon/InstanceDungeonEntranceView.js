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
  AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
  CommonCurrencyItem_1 = require("../Common/CommonCurrencyItem"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
  HelpController_1 = require("../Help/HelpController"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  OnlineController_1 = require("../Online/OnlineController"),
  PowerController_1 = require("../Power/PowerController"),
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
  InstanceDungeonTrialRoleItem_1 = require("./InstanceDungeonTrialRoleItem"),
  MowingDifficultyDropDownPanel_1 = require("./MowingDifficultyDropDownPanel");
class InstanceDungeonEntranceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.thi = 0),
      (this.NUe = 0),
      (this.ihi = 0),
      (this.ohi = void 0),
      (this.rhi = void 0),
      (this.nhi = void 0),
      (this.shi = void 0),
      (this.sOe = void 0),
      (this.ahi = void 0),
      (this.hhi = []),
      (this.lhi = void 0),
      (this._hi = void 0),
      (this.uhi = void 0),
      (this.chi = void 0),
      (this.mhi = void 0),
      (this.dhi = 0),
      (this.Chi = void 0),
      (this.ghi = void 0),
      (this.fhi = void 0),
      (this.dbt = void 0),
      (this.Qsi = void 0),
      (this.Xsi = !1),
      (this.phi = []),
      (this.vhi = []),
      (this.Mhi = void 0),
      (this.Shi = void 0),
      (this.Ehi = void 0),
      (this.yhi = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.Ihi = () => {
        PowerController_1.PowerController.OpenPowerView();
      }),
      (this.$si = () => {
        var e =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        e &&
          ((e = e.GetActivityLevelCountdownText(this.NUe)),
          this.GetText(16).SetUIActive(!0),
          this.GetText(16).SetText(e),
          StringUtils_1.StringUtils.IsEmpty(e)) &&
          ((this.Xsi = !1),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "ActivityMowing_Newlevel",
            ),
          ),
          this.Thi());
      }),
      (this.Lhi = (e, t, i) => {
        var n = new InstanceDetectItem_1.InstanceDetectItem();
        return (
          n.BindClickInstanceCallback(this.Dhi),
          n.BindClickSeriesCallback(this.Rhi),
          n.BindCanExecuteChange(this.T7e),
          n
        );
      }),
      (this.Rhi = (e, t, i) => {
        this.lhi && this.lhi !== t && this.lhi.SetToggleState(0, !0),
          (this.lhi = t),
          (this.ihi = i ? e : -1),
          (this.NUe = i ? this.nhi.get(e)[0] : this.NUe);
        t = this.Uhi();
        this.Chi.RefreshByData(t), this.Chi.BindLateUpdate(this.Csi);
      }),
      (this.Csi = () => {
        var e =
          (this.dhi - 1) / (this.nhi.size + (this.shi.get(this.ihi) ?? 0));
        this.GetUIDynScrollViewComponent(3).SetScrollProgress(e),
          this.Chi?.UnBindLateUpdate();
      }),
      (this.Dhi = (e, t, i = void 0) => {
        (this.NUe = e),
          i &&
            (this.uhi && (this.uhi.IsSelect = !1),
            (this.uhi = i),
            (this.uhi.IsSelect = !0)),
          (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
            this.NUe),
          this._hi && this._hi !== t && this._hi.SetToggleState(0, !0),
          (this._hi = t),
          this.Thi(),
          this.UiViewSequence.PlaySequence("Xz"),
          this.Ahi(),
          this.Phi();
      }),
      (this.T7e = (e) => this.NUe !== e),
      (this.gVe = () => {
        this.SetPowerCount();
      }),
      (this.xhi = () => {
        UiManager_1.UiManager.IsViewOpen("PowerView") &&
          UiManager_1.UiManager.CloseView("PowerView"),
          this.UiViewSequence.PlaySequencePurely("Close01", !0);
      }),
      (this.whi = () => {
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
                      : this.x9s();
                  }),
                  t.FunctionMap.set(1, () => {
                    this.Bhi();
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
                  : this.x9s();
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
      (this.bhi = () => {
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
      (this.qhi = () => {
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
                  this.ohi.BindOnStopTimer(
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
      (this.Ghi = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .SelectInstanceId,
        );
      }),
      (this.Nhi = () => {
        HelpController_1.HelpController.OpenHelpById(
          ExchangeRewardModel_1.POWER_DISCOUNT_HELP_ID,
        );
      }),
      (this.Bhi = () => {
        this.UiViewSequence.StopSequenceByKey("Popup"),
          this.UiViewSequence.PlaySequencePurely("Popup", !1, !0);
      }),
      (this.Ohi = (e) => {
        "PowerView" === e
          ? this.Bhi()
          : "ActivityRewardPopUpView" === e && this.khi();
      }),
      (this.G$e = () => {
        switch (
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
        ) {
          case 2:
            this.ohi?.PlayAnimation("Finish"),
              UiManager_1.UiManager.OpenView("OnlineInstanceMatchTips");
            break;
          case 0:
            this.ohi?.PlayAnimation("Close");
            break;
          case 1:
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "MatchingOtherCancel",
            ),
              this.ohi?.PlayAnimation("Start"),
              this.Fhi(!0),
              this.Vhi();
            break;
          case 4:
            this.Fhi(!1),
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
      (this.N$e = () => {
        this.Fhi(!0), this.ohi?.PlayAnimation("Start"), this.Vhi(), this.Hhi();
      }),
      (this.jhi = () => {
        return new TowerElementItem_1.TowerElementItem();
      }),
      (this.YZe = () => {
        var e =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
            this.thi,
          ).HelpButtonId;
        HelpController_1.HelpController.OpenHelpById(e);
      }),
      (this.Whi = () => {
        var e =
          ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
        e &&
          UiManager_1.UiManager.OpenView(
            "ActivityRewardPopUpView",
            e.GetRewardViewData(),
          );
      });
  }
  get Khi() {
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
    ]),
      (this.BtnBindInfo = [
        [0, this.xhi],
        [9, this.whi],
        [10, this.qhi],
        [11, this.bhi],
        [19, this.Ghi],
        [23, this.Nhi],
        [38, this.YZe],
        [42, this.Whi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.fhi =
      new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem()),
      await this.fhi.CreateByActorAsync(this.GetItem(33).GetOwner());
    var e = this.GetItem(17);
    (this.dbt = new CommonCurrencyItem_1.CommonCurrencyItem()),
      (this.dbt.SkipAutoAddEvent = !0),
      await this.dbt.CreateThenShowByActorAsync(e.GetOwner()),
      (this.chi = this.GetUIDynScrollViewComponent(3)),
      (this.mhi = new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem()),
      (this.Chi = new DynScrollView_1.DynamicScrollView(
        this.chi,
        this.GetItem(4),
        this.mhi,
        this.Lhi,
      )),
      await this.Chi.Init(),
      (this.Shi = new RoguelikeInstanceBtnPanel_1.RoguelikeInstanceBtnPanel()),
      await this.Shi.CreateByActorAsync(this.GetItem(32).GetOwner()),
      (this.Ehi =
        new MowingDifficultyDropDownPanel_1.MowingDifficultyDropDownPanel()),
      (this.Ehi.SkipDestroyActor = !0),
      await this.Ehi.CreateThenShowByActorAsync(this.GetItem(39).GetOwner()),
      (this.ohi =
        new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
      await this.ohi.CreateByActorAsync(this.GetItem(18).GetOwner()),
      this.ohi.SetActive(!1);
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Close01", this.yhi);
    var t,
      i,
      e,
      n = this.GetItem(17),
      n =
        (this.dbt.ShowWithoutText(ItemDefines_1.EItemId.Power),
        this.SetPowerCount(),
        this.dbt.SetButtonFunction(this.Ihi),
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10017) ||
          n.SetUIActive(!1),
        (this.ghi =
          new InstanceDungeonEntranceRewardItem_1.InstanceDungeonEntranceRewardItem()),
        this.ghi.SetRootActor(this.GetItem(31).GetOwner(), !0),
        (this.Mhi = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(36),
          this.jhi,
        )),
        (this.thi =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
        (this.rhi = []),
        (this.shi = new Map()),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(
          this.thi,
        ));
    this.nhi = new Map();
    for ([t, i] of n) {
      let e = this.nhi.get(i);
      e || ((e = []), this.nhi.set(i, e)), e.push(t);
    }
    for ([, e] of this.nhi) for (const s of e) this.rhi.push(s);
    this.AddChild(this.Ehi);
  }
  OnTick(e) {
    this.Xsi && this.Qsi?.();
  }
  OnBeforeShow() {
    this.Shi?.BindRedDot(), this.h7e();
  }
  OnAfterShow() {
    this.ohi.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    }),
      this.ohi?.BindOnAfterCloseAnimation((e) => {
        "Close" === e && this.Fhi(!1);
      }),
      !this.rhi || this.rhi.length <= 0
        ? (this.GetItem(14).SetUIActive(!1), this.GetItem(5).SetUIActive(!1))
        : 1 ===
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
          (this.Fhi(!0),
          this.ohi?.PlayAnimation("Start"),
          this.ohi.StartTimer());
  }
  OnBeforeHide() {
    this.Shi?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    1 ===
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "MatchingBackground",
      ),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    for (const e of this.phi) e.Destroy();
    this.phi.length = 0;
    for (const t of this.vhi) t.Destroy();
    (this.vhi.length = 0),
      (this.ohi = void 0),
      (this.nhi = void 0),
      this.dbt.Destroy(),
      this.Chi && (this.Chi.ClearChildren(), (this.Chi = void 0)),
      (this.chi = void 0),
      (this.Ehi = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPowerChanged,
      this.gVe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.Ohi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingChange,
        this.G$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      ),
      this.dbt?.AddEventListener();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPowerChanged,
      this.gVe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.Ohi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingChange,
        this.G$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      ),
      this.dbt?.RemoveEventListener();
  }
  h7e() {
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
        this.thi,
      );
    this.GetText(1).ShowTextNew(e.Name),
      e.TitleSprite
        ? this.SetSpriteByPath(e.TitleSprite, this.GetSprite(2), !0)
        : this.GetSprite(2).SetUIActive(!1),
      this.GetButton(38).RootUIComp.SetUIActive(0 !== e.HelpButtonId),
      this.Qhi(),
      this.Ahi(),
      this.khi();
  }
  Jsi() {
    var e;
    return (
      !!ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(
        this.NUe,
      ) &&
      !!(e =
        ActivityMowingController_1.ActivityMowingController.GetMowingActivityData()) &&
      ((this.Qsi = this.$si), !e.GetActivityLevelUnlockState(this.NUe))
    );
  }
  Qhi() {
    var e = this.Uhi();
    this.Chi.RefreshByData(e),
      this.GetItem(14).SetUIActive(!0),
      this.Chi.BindLateUpdate(() => {
        var e = this.Chi.GetScrollItemCount();
        this.dhi + 1 < e || this.Chi.ScrollToItemIndex(this.dhi),
          this.Chi.UnBindLateUpdate();
      });
  }
  khi() {
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
  Thi() {
    this.Xhi(),
      this.$hi(),
      this.Yhi(),
      this.Jhi(),
      this.zhi(),
      this.Hhi(),
      this.Zhi(),
      this.eli(),
      this.tli(),
      (this.Xsi = this.Jsi());
  }
  Xhi() {}
  $hi() {
    var e = this.Khi;
    e &&
      (this.GetText(6).ShowTextNew(e.MapName),
      this.GetText(7).ShowTextNew(e.DungeonDesc),
      this.SetTextureByPath(e.BannerPath, this.GetTexture(8)));
  }
  SetPowerCount() {
    var e = ModelManager_1.ModelManager.PowerModel.PowerCount,
      t = ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit();
    this.dbt.SetCountText("PowerShow", e, t);
  }
  Phi() {
    var e =
      this.Khi.InstSubType === AdventureDefine_1.EDungeonSubType.Roguelike;
    this.Shi.SetUiActive(e);
  }
  tli() {
    var e = this.Khi.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing,
      t =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
          this.Khi.Id,
        );
    this.Ehi?.SetActive(e && t),
      e && t && this.Ehi?.RefreshByInstanceId(this.NUe);
  }
  Ahi() {
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
  Yhi() {
    var e = this.Khi.RewardId,
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(
          e,
        )?.RewardId,
      e =
        (this.ghi.SetRewardBtnActive(1 < (e?.size ?? 0)),
        ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
          this.Khi.Id,
        )),
      t = e
        ? 0
        : ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
            this.Khi.FirstRewardId,
          )?.length,
      t =
        (this.ghi.SetFirstRewardLength(t),
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
          this.ghi.RefreshRewardText(!e && 0 !== t)),
      this.ghi.RefreshReward(this.sOe, !i[1]),
      this.ghi.SetDoubleRewardActivity(
        ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(
          this.Khi.CustomTypes,
        ),
      );
  }
  Jhi() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      e =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          e.RepeatRewardId,
        );
    (this.ahi = e),
      this.ahi.length <= 0
        ? this.GetItem(33).SetUIActive(!1)
        : (this.GetItem(33).SetUIActive(!0), this.fhi.RefreshRewardText(!1)),
      this.fhi.RefreshReward(this.ahi, !0);
  }
  zhi() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        this.NUe,
      ),
      t = e?.TrialRoleFormation;
    if (t) {
      var i =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTrialRoleConfig(
          t,
        );
      if (i && !i.ShowInEntrance) return void this.GetItem(21).SetUIActive(!1);
    }
    let n = void 0;
    var i =
      ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
        e?.FightFormationId ?? 0,
      )?.TrialRole;
    if (
      (i
        ? (n = i)
        : t &&
          ((n = new Array()),
          (e =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTrialRoleConfig(
              t,
            )),
          0 === (i = ModelManager_1.ModelManager.WorldLevelModel.Sex)
            ? (n.push(...e.FemaleFormation), n.push(...e.FemaleDelayFormation))
            : 1 === i &&
              (n.push(...e.MaleFormation), n.push(...e.MaleDelayFormation))),
      !n || n.length <= 0)
    )
      this.GetItem(21).SetUIActive(!1);
    else {
      this.GetItem(21).SetUIActive(!0);
      var s = this.GetItem(22),
        r = s.GetParentAsUIItem();
      let e = 0;
      for (const h of this.hhi) h.SetActive(!1);
      for (const l of n) {
        var o,
          a = this.hhi[e++];
        a
          ? (a.SetActive(!0), a.SetRoleId(l))
          : ((a = LguiUtil_1.LguiUtil.CopyItem(s, r)),
            (a =
              ((o =
                new InstanceDungeonTrialRoleItem_1.InstanceDungeonTrialRoleItem(
                  a,
                  l,
                )).CreateByActorAsync(a.GetOwner()),
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(l))),
            o.SetActive(1 === a.RoleType),
            this.hhi.push(o));
      }
      s?.SetUIActive(!1);
    }
  }
  Hhi() {
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
        ? (this.ili(), t.SetUIActive(!n), e.SetUIActive(!1))
        : ((n =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockConditionGroupHintText(
              s,
            ))
            ? (i.ShowTextNew(n), i.SetUIActive(!0))
            : i.SetUIActive(!1),
          t.SetUIActive(!1),
          e.SetUIActive(!0)));
  }
  ili() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
        this.NUe,
      );
    (!e || e <= 0
      ? (this.GetItem(20).SetUIActive(!1), this.GetItem(17))
      : (this.GetItem(20).SetUIActive(!0),
        this.GetItem(17).SetUIActive(!0),
        (e =
          ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(
            this.NUe,
          )),
        this.SetItemIcon(this.GetTexture(13), e[0][0]?.ItemId),
        this.GetItem(26).SetUIActive(!1),
        this.GetText(12).SetText("x" + e[0][1]),
        this.GetButton(23).RootUIComp)
    ).SetUIActive(!1);
  }
  Fhi(e) {
    var t =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        this.NUe,
      );
    this.GetItem(30).SetUIActive(!e && t);
  }
  x9s() {
    const e = this.NUe;
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(35);
    t.FunctionMap.set(2, () => {
      this.Bhi(),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
          e),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    }),
      t.FunctionMap.set(1, () => {
        this.Bhi();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  Vhi() {
    this.ohi.SetMatchingTime(0), this.ohi.StartTimer();
  }
  Uhi() {
    this.dhi = 0;
    var e = [];
    let t = -1;
    this.oli();
    var i,
      n,
      s = 1 === this.shi.size;
    let r = !1;
    for ([i, n] of this.nhi) {
      var o = i === this.ihi,
        a = 1 === this.shi.get(i);
      for (const l of n) {
        if ((t !== i && !s) || (t !== i && s && a)) {
          var h = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          if (
            ((h.InstanceSeriesTitle = i),
            (h.InstanceGirdId = l),
            (h.IsSelect = o),
            (h.IsOnlyOneGrid = a),
            (t = i),
            e.push(h),
            r || this.dhi++,
            s && a)
          )
            break;
        }
        !o ||
          a ||
          (((h =
            new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId =
            l),
          (h.IsSelect = l === (this.NUe ?? 0)),
          (h.IsShow = o),
          e.push(h),
          (r = !!h.IsSelect || r)) ||
          this.dhi++;
      }
    }
    return e;
  }
  oli() {
    let e = 0,
      t = 0,
      i = 0;
    this.shi.clear();
    var n,
      s,
      r,
      o,
      a,
      h = !!this.NUe;
    for ([n, s] of this.nhi)
      if (((t = t || n), this.shi.set(n, s.length), !h))
        for (const l of s)
          (this.ihi && n !== this.ihi) ||
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
              (a =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                  l,
                  ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
                )),
              r) &&
              !o &&
              a > i &&
              ((this.NUe = l), (this.ihi = n), (i = a)));
    this.NUe || (this.NUe = e),
      this.ihi || (this.ihi = t),
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
        this.NUe);
  }
  Zhi() {
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
  eli() {
    var e = this.Khi,
      t = e?.MonsterTips,
      t =
        (t
          ? (this.GetItem(34)?.SetUIActive(!0), this.GetText(37).ShowTextNew(t))
          : this.GetItem(34)?.SetUIActive(!1),
        e?.RecommendElement);
    !t || t.length <= 0
      ? this.GetItem(35)?.SetUIActive(!1)
      : (this.GetItem(35)?.SetUIActive(!0), this.Mhi?.RefreshByData(t));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]) - 1,
      t = this.Chi.GetScrollItemFromIndex(t);
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
