"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssInsSelectView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  InstOnlineType_1 = require("../../../../../Core/Define/Config/SubType/InstOnlineType"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  CommonCurrencyItem_1 = require("../../../Common/CommonCurrencyItem"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ConfirmBoxController_1 = require("../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController"),
  InstanceDungeonMatchingCountDown_1 = require("../../../InstanceDungeon/InstanceDungeonMatchingCountDown"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  AbyssButtonItem_1 = require("./AbyssButtonItem"),
  DangoAbyssGoalItem_1 = require("./DangoAbyssGoalItem"),
  DangoWorldQuestItem_1 = require("./DangoWorldQuestItem"),
  ENTRANCELOOP = "DangoAbyssLoop2",
  MATCHING_ITEM_OFFSET = -98;
class DangoAbyssInsSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pth = void 0),
      (this.fqt = void 0),
      (this.C0t = void 0),
      (this.Yja = 0),
      (this.wVl = void 0),
      (this.Wfc = void 0),
      (this.Qfc = void 0),
      (this.Kfc = void 0),
      (this.Xfc = void 0),
      (this.Yfc = void 0),
      (this.zfc = void 0),
      (this.s4e = void 0),
      (this.df1 = void 0),
      (this.Zfc = () => {
        var e, t, i;
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(
          this.C0t.AbyssDataList[this.Yja].GetConfig().Id,
        )
          ? ((e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id),
            (e =
              this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig()
                .InstId),
            (e =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                e,
              ).OnlineType),
            ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            e !== InstOnlineType_1.InstOnlineType.Single
              ? this.eLc()
              : this.Zbc())
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300)),
            0 <
              (i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem)
                .size &&
              ((t = Array.from(i.keys())[0]),
              (i = i.get(t)),
              e.SetTextArgs(i.toString()),
              e.FunctionMap.set(2, () => {
                ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(
                  this.C0t.AbyssDataList[this.Yja].GetConfig().Id,
                );
              }),
              ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              )));
      }),
      (this.Jfc = () => {
        var e, t, i;
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(
          this.C0t.AbyssDataList[this.Yja].GetConfig().Id,
        )
          ? this.Jbc()
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(300)),
            0 <
              (i = this.C0t.AbyssDataList[this.Yja].GetConfig().ConsumeItem)
                .size &&
              ((t = Array.from(i.keys())[0]),
              (i = i.get(t)),
              e.SetTextArgs(i.toString()),
              e.FunctionMap.set(2, () => {
                ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestChallengeUnlock(
                  this.C0t.AbyssDataList[this.Yja].GetConfig().Id,
                );
              }),
              ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              )));
      }),
      (this.Jbc = () => {
        const e = this.C0t.AbyssDataList[this.Yja].GetConfig().InstId;
        var t;
        (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
          !0),
          this.Pth.BindOnStopTimer(
            () =>
              1 !==
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
          ),
          ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)
            ? ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
                e,
              )
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "PhantomFormationEnterInstanceTip",
                )
              : !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
                  (t =
                    ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <=
                    1
                ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                    e,
                  )
                : t < ModelManager_1.ModelManager.OnlineModel.TeamMaxSize
                  ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      111,
                    )).FunctionMap.set(2, () => {
                      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                        e,
                        !0,
                      );
                    }),
                    t.FunctionMap.set(1, () => {
                      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchRequest(
                        e,
                      );
                    }),
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                      t,
                    ))
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "CanNotMatching",
                    )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "IsNotOpenOnline",
              );
      }),
      (this.Zbc = () => {
        ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = !1;
        var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
        (ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectEntranceId =
          this.C0t.AbyssDataList[this.Yja].GetConfig().InstEntranceId),
          (ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId =
            e),
          ControllerHolder_1.ControllerHolder.DangoAbyssController.StartAbyssChallenge(
            e,
          );
      }),
      (this.eLc = () => {
        const e = this.C0t.AbyssDataList[this.Yja].GetConfig().InstId;
        var t;
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
              !0),
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(
              e,
            ),
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() <= 1
              ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                  e,
                  !1,
                )
              : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  111,
                )).FunctionMap.set(2, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                    e,
                    !0,
                  );
                }),
                t.FunctionMap.set(1, () => {
                  InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamChallengeRequest(
                    e,
                    !1,
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  t,
                )))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "InstanceDungeon",
              27,
              "非联机下无法进行组队挑战，请联系程序查BUG",
            );
      }),
      (this.sGe = () => {
        return new DangoScrollItem();
      }),
      (this.InitCommonGridItem = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.plo = () => {
        this.PlaySequence("PreLeft"),
          this.Yja--,
          this.Og(),
          0 ===
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
            (this.Pth?.PlayAnimation("Close"), this.Pth?.SetUiActive(!1));
      }),
      (this.egc = () => {
        this.PlaySequence("PreRight"),
          this.Yja++,
          this.Og(),
          0 ===
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
            (this.Pth?.PlayAnimation("Close"), this.Pth?.SetUiActive(!1));
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
      (this.lC1 = () => {
        this.Og();
      }),
      (this.YYe = () => {
        this.Fli(!0),
          this.Pth?.PlayAnimation("Start"),
          this.Pth?.BindOnStopTimer(
            () =>
              1 !==
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState(),
          ),
          this.Vli();
      }),
      (this.hNc = () => {
        var e =
            ModelManager_1.ModelManager.QuestNewModel.GetQuestsByTypeAndSubType(
              10,
              1,
            ),
          t = new Array();
        for (const s of e) {
          var i = new DangoAbyssGoalItem_1.GoalPanelData(),
            n = ModelManager_1.ModelManager.QuestNewModel.GetQuestName(s.Id);
          (i.Title = n), t.push(i);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [12, UE.UIHorizontalLayout],
      [13, UE.UIItem],
      [14, UE.UITexture],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIScrollViewWithScrollbarComponent],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.AMo],
        [2, this.plo],
        [3, this.egc],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate,
        this.lC1,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssUnlockChallengeStateUpdate,
        this.lC1,
      );
  }
  async OnBeforeStartAsync() {
    this.C0t = this.OpenParam;
    var e = [],
      e =
        ((this.zfc = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(10),
          this.sGe,
        )),
        (this.s4e = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(12),
          this.InitCommonGridItem,
        )),
        (this.wVl =
          new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock()),
        e.push(this.wVl.CreateByActorAsync(this.GetItem(20).GetOwner())),
        (this.Wfc = new AbyssButtonItem_1.AbyssButtonItem()),
        e.push(this.Wfc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
        this.Wfc.BindClickCallBack(() => {
          var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
          ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRankView(
            e,
          );
        }),
        (this.Qfc = new AbyssButtonItem_1.AbyssButtonItem()),
        e.push(this.Qfc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())),
        this.Qfc.BindClickCallBack(() => {
          ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssLimitRewardView();
        }),
        (this.Kfc = new AbyssButtonItem_1.AbyssButtonItem()),
        e.push(this.Kfc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())),
        this.Kfc.BindClickCallBack(() => {
          ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenAbyssRewardView();
        }),
        (this.Xfc = new ButtonItem_1.ButtonItem()),
        this.Xfc.SetFunction(this.Jfc),
        e.push(
          this.Xfc.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()),
        ),
        (this.Yfc = new ButtonItem_1.ButtonItem()),
        this.Yfc.SetFunction(this.Zfc),
        e.push(
          this.Yfc.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()),
        ),
        (this.Pth =
          new InstanceDungeonMatchingCountDown_1.InstanceDungeonMatchingCountDown()),
        e.push(
          this.Pth.CreateByResourceIdAsync(
            "UiItem_OnlineApplyUILayer_Prefab",
            this.GetItem(21),
          ),
        ),
        await Promise.all(e),
        (this.fqt = new CommonCurrencyItem_1.CommonCurrencyItem()),
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssKeyItemId());
    await this.fqt.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()),
      this.fqt.RefreshTemp(e),
      this.fqt.SetButtonActive(!1),
      this.Pth.GetOriginalItem()?.SetAnchorOffsetY(MATCHING_ITEM_OFFSET),
      this.Pth.SetUiActive(!1),
      (this.df1 = new DangoWorldQuestItem_1.DangoWorldQuestItem()),
      this.df1.Init(this.GetScrollViewWithScrollbar(26), this.GetItem(27));
    const t = this.C0t.ActivityData.GetCurrentLastFinishChallengeId();
    (this.Yja = this.C0t.AbyssDataList.findIndex(
      (e) => e.GetConfig().Id === t,
    )),
      (this.Yja = -1 === this.Yja ? 0 : this.Yja);
  }
  OnAfterShow() {
    this.Pth.BindOnClickBtnCancelMatching(() => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CancelMatchRequest();
    }),
      this.Pth.BindOnAfterCloseAnimation((e) => {
        "Close" === e && this.Fli(!1);
      }),
      1 ===
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
        (this.Fli(!0), this.Pth?.PlayAnimation("Start"), this.Pth.StartTimer());
  }
  RefreshRedDot() {
    this.Qfc?.BindRedDot("RedDotDangoLimitReward", this.C0t?.ActivityData?.Id),
      this.Kfc?.BindRedDot(
        "RedDotDangoCommonReward",
        this.C0t?.ActivityData?.Id,
      ),
      this.Wfc?.SetRedDotVisible(!1);
  }
  W8e() {
    this.Qfc?.UnBindRedDot(), this.Kfc?.UnBindRedDot();
  }
  OnBeforeShow() {
    this.df1?.Refresh(),
      ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!1),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
        ENTRANCELOOP,
        !0,
        !0,
        "1001",
      ),
      ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!1),
      this.Og(),
      this.RefreshRedDot();
  }
  OnBeforeHide() {
    this.W8e();
  }
  Og() {
    var e = this.C0t.AbyssDataList[this.Yja].GetConfig().Id;
    this.sGc(e),
      this.aGc(e),
      this.hGc(e),
      this._Gc(e),
      this.sgc(e),
      this.cGc(e),
      this.yVt(e),
      this.ewa(e),
      this.hgc(e),
      this.lgc(e),
      this.Lf1(e),
      this._gc(this.C0t),
      this.KFc(this.C0t),
      this.g6c(this.C0t),
      this.hNc(),
      this.BVc(e),
      this.it1(e),
      this.Ky1(e);
  }
  BVc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
  }
  it1(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("shenyuan"),
      1,
    );
    t?.IsValid() &&
      0 !== (e = e) &&
      ((e =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(
          e,
        ).AbyssColor),
      (e = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e))),
      t
        .GetComponentByClass(UE.NiagaraComponent.StaticClass())
        .SetNiagaraVariableLinearColor("Color", e));
  }
  Lf1(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetRankOpen();
    this.Wfc?.SetActive(t);
  }
  KFc(e) {
    var e = e.ActivityData,
      t = e.CheckInLimitTime();
    this.GetItem(5).SetUIActive(t),
      t && ((t = e.GetRemainTimeText()), this.Qfc?.SetNumText(t));
  }
  g6c(e) {
    e = e.ActivityData.GetRewardFinishProgressText();
    this.Kfc?.SetNumText(e);
  }
  _gc(e) {
    var t = 1 < e.AbyssDataList.length;
    0 === this.Yja
      ? this.GetButton(2).RootUIComp.SetUIActive(!1)
      : this.GetButton(2).RootUIComp.SetUIActive(t),
      this.Yja === e.AbyssDataList.length - 1
        ? this.GetButton(3).RootUIComp.SetUIActive(!1)
        : this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  sGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Title);
  }
  aGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.SubTitle);
  }
  hGc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Desc);
  }
  _Gc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
    e &&
      (this.zfc.RefreshByData(e.UnlockLittleRole),
      this.GetItem(28).SetUIActive(0 < e.UnlockLittleRole.length));
  }
  Ky1(e) {
    var t = this.xT1(e);
    this.GetItem(29).SetUIActive(t),
      t &&
        ((t =
          ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssMaxProgress(e)),
        this.GetText(30).SetText(
          StringUtils_1.StringUtils.Format("{0}%", t.toFixed(0)),
        ));
  }
  sgc(e) {
    e = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetReward();
    this.s4e.RefreshByData(e);
  }
  cGc(e) {
    var t = !ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnLockState(e),
      e =
        (this.GetItem(24).SetUIActive(t),
        this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig());
    e &&
      t &&
      0 < (t = e.ConsumeItem).size &&
      ((e = Array.from(t.keys())[0]),
      (t = t.get(e)),
      (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)),
      this.SetTextureByPath(e.Icon, this.GetTexture(14)),
      this.GetText(16).SetText(t.toString()));
  }
  xT1(e) {
    var t =
        this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge(),
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(
          e,
        ),
      n =
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(
          e,
        ),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    return t && i && n && e;
  }
  yVt(t) {
    var i = this.xT1(t),
      t = this.C0t.ActivityData.GetAbyssChallengeDataById(t).GetConfig().InstId,
      t =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          t,
        ).OnlineType;
    if (
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
    )
      this.Xfc.SetActive(!1), this.Yfc.SetActive(!1);
    else {
      let e = !1;
      (e =
        t !== InstOnlineType_1.InstOnlineType.Single &&
        (InstOnlineType_1.InstOnlineType.Multi, !0)),
        this.Xfc.SetActive(e && i),
        this.Yfc.SetActive(i),
        t === InstOnlineType_1.InstOnlineType.Mixture &&
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? this.Yfc?.SetLocalTextNew("AbyssMPChallenge")
          : this.Yfc?.SetLocalTextNew("AbyssSoloChallenge");
      t = e && i;
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAbyssTeamBtnVisibleRefresh,
        t,
      );
    }
  }
  ewa(e) {
    this.Xfc?.SetRedDotVisible(!1), this.Yfc?.SetRedDotVisible(!1);
  }
  hgc(e) {
    var t =
        this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetCanChallenge(),
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(
          e,
        ),
      n =
        ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(
          e,
        ),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e);
    this.wVl?.SetActive(!(t && e && i && n));
  }
  lgc(e) {
    if (
      ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssPreChallengeFinishState(
        e,
      )
    ) {
      if (
        !ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssConditionFinishState(
          e,
        )
      ) {
        var t = this.C0t.ActivityData.GetAbyssChallengeDataById(e).GetConfig();
        if (t) {
          var t = t.UnLockDesc;
          if ("" !== t) return void this.wVl?.SetTextByTextId(t);
        }
      }
      ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssTimeLimitState(e) ||
        ((t =
          ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssUnlockTimeText(
            e,
          )),
        (e = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "AbyssUnlockTime",
          ),
          t,
        )),
        this.wVl?.SetTextByText(e));
    } else this.wVl?.SetTextByTextId("AbyssNeedPreChallengeFinish");
  }
  Fli(e) {
    this.GetItem(19).SetUIActive(e), this.GetItem(25).SetUIActive(!e);
  }
  Vli() {
    this.Pth.SetMatchingTime(0), this.Pth.StartTimer();
  }
  OnBeforeDestroy() {
    this.fqt?.Destroy(), this.df1?.Clear();
  }
}
exports.DangoAbyssInsSelectView = DangoAbyssInsSelectView;
class DangoScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
    ];
  }
  Refresh(e, t, i) {
    this.Aqe(e), this.Xy1(e);
  }
  Aqe(e) {
    e =
      ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(
        e,
      ).GetConfig().Icon;
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  Xy1(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e);
    e
      ? this.GetItem(1).SetUIActive(!e.GetIfLock())
      : this.GetItem(1).SetUIActive(!1);
  }
}
//# sourceMappingURL=DangoAbyssInsSelectView.js.map
