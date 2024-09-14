"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeRootView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CommonManager_1 = require("../../Common/CommonManager"),
  StarLevelComponent_1 = require("../../Common/StarLevelComponent"),
  ComposeController_1 = require("../ComposeController"),
  ComposeMediumItemGrid_1 = require("../Item/ComposeMediumItemGrid"),
  MainTypeItem_1 = require("../Item/MainTypeItem"),
  ComposeIngredientsView_1 = require("./ComposeIngredientsView"),
  TIMERGAP = 1e3;
class ComposeRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.UTi = 0),
      (this.ATi = 0),
      (this.PTi = 0),
      (this.xTi = void 0),
      (this.wTi = void 0),
      (this.BTi = void 0),
      (this.vNt = void 0),
      (this.MNt = void 0),
      (this.aTi = []),
      (this.hTi = []),
      (this.lTi = []),
      (this.SNt = void 0),
      (this.bTi = !1),
      (this.p9s = !1),
      (this.oWs = void 0),
      (this.qTi = () => {
        this.INt(),
          (this.bTi = !0),
          this.MNt.SetResultDataDirty(),
          this.MNt.UpdateData(20, this.LNt()),
          this.vNt.SetActive(!0),
          this.vNt.UpdateData(20, this.LNt()),
          (this.bTi = !1),
          this.GTi(),
          this.YGt(),
          this.DNt();
        var e = CommonManager_1.CommonManager.GetComposeMaxLevel(),
          t = CommonManager_1.CommonManager.GetCurrentRewardLevel();
        this.SNt.ShowLevel(t, e), this.AGt();
      }),
      (this.GOe = void 0),
      (this.BNt = () => {
        this.AGt(),
          this.xTi.OnSecondTimerRefresh(),
          this.bNt()
            ? ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
                () => {
                  this.NTi();
                },
              )
            : this.NNt() &&
              ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
                () => {
                  (this.bTi = !1), this.OTi();
                },
              );
      }),
      (this.kTi = () => {
        this.ChildPopView?.PlaySequenceAsync(
          "Close",
          new CustomPromise_1.CustomPromise(),
          !0,
          !1,
        ).then(() => {
          this.ChildPopView?.PopItem.SetActive(!1);
        }),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.HangPlotViewHud,
            !0,
          );
      }),
      (this.jwe = (e) => {
        "OnBlackScreen" === e &&
          (this.ChildPopView?.PlayLevelSequenceByName("BlackScreenShow"),
          this.oWs?.IsPending() && this.oWs.SetResult(),
          ComposeController_1.ComposeController.PlayCompositeEnterDisplay(
            this.VTi,
          ),
          (this.p9s = !0));
      }),
      (this.VTi = () => {
        UiManager_1.UiManager.IsViewShow("ComposeRootView") &&
          ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
      }),
      (this.$Ge = (e) => {
        "CompositeRewardView" === e &&
          (this.ChildPopView?.PopItem.SetActive(!0),
          this.ChildPopView?.PlayLevelSequenceByName("Start"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.HangPlotViewHud,
            !1,
          ),
          (e = ModelManager_1.ModelManager.ComposeModel.ComposeSuccessFlow),
          ComposeController_1.ComposeController.PlayCompositeFlow(e));
      }),
      (this.cHe = () => {
        var e = new ComposeMediumItemGrid_1.ComposeMediumItemGrid();
        return e.BindOnExtendToggleStateChanged(this.HTi), e;
      }),
      (this.HTi = (e) => {
        var t = e.Data;
        let i = 0;
        switch ((this.BTi.DeselectCurrentGridProxy(), t.MainType)) {
          case 1:
            (this.UTi = this.aTi.indexOf(t)), (i = this.UTi);
            break;
          case 2:
            (this.ATi = this.hTi.indexOf(t)), (i = this.ATi);
            break;
          case 3:
            (this.PTi = this.lTi.indexOf(t)), (i = this.PTi);
        }
        this.BTi.IsGridDisplaying(i) &&
          (t.IsNew &&
            (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              t.ItemId,
            ),
            (t.IsNew = !1)),
          this.BTi.SelectGridProxy(i),
          this.BTi.RefreshGridProxy(i),
          this.xTi.RefreshTips(t));
      }),
      (this.xNt = () => {
        var e = new MainTypeItem_1.MainTypeItem();
        return e.SetMainTypeCallback(this.wNt), e;
      }),
      (this.wNt = (e) => {
        if (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== e
        )
          switch (e) {
            case 1:
              (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 1),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SwitchComposeType,
                ),
                this.GTi(),
                this.OTi(),
                this.DNt();
              break;
            case 2:
              (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 2),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SwitchComposeType,
                ),
                this.GTi(),
                this.OTi(),
                this.DNt();
              break;
            case 3:
              (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 3),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SwitchComposeType,
                ),
                this.GTi(),
                this.OTi(),
                this.DNt();
          }
      }),
      (this.OTi = () => {
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            this.vNt.UpdateData(20, this.LNt()),
              this.MNt.SetResultDataDirty(),
              this.MNt.UpdateData(20, this.LNt());
            break;
          case 2:
            this.vNt.UpdateData(22, this.LNt()),
              this.MNt.SetResultDataDirty(),
              this.MNt.UpdateData(22, this.LNt());
            break;
          case 3:
            this.MNt.SetResultDataDirty(), this.MNt.UpdateData(23, this.LNt());
        }
      }),
      (this.FNt = (e) => {
        var t = e.filter((e) => {
          return (
            e.ExistStartTime <= 0 ||
            TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime)
          );
        });
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            (this.UTi = this.bTi ? this.UTi : 0), (this.aTi = t);
            break;
          case 2:
            (this.ATi = this.bTi ? this.ATi : 0), (this.hTi = t);
            break;
          case 3:
            (this.PTi = this.bTi ? this.PTi : 0), (this.lTi = t);
        }
        this.BTi.DeselectCurrentGridProxy(),
          this.jNt(),
          0 === t.length
            ? (this.GetItem(8).SetUIActive(!0), this.xTi.SetActive(!1))
            : (this.GetItem(8).SetUIActive(!1),
              this.xTi.SetActive(!0),
              this.jTi(!this.bTi));
      }),
      (this.NTi = () => {
        (this.bTi = !0), this.OTi(), (this.bTi = !1);
      }),
      (this.jNt = () => {
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            this.BTi.RefreshByData(this.aTi);
            break;
          case 2:
            this.BTi.RefreshByData(this.hTi);
            break;
          case 3:
            this.BTi.RefreshByData(this.lTi);
        }
      }),
      (this.WTi = (e) => {
        (ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2),
          UiManager_1.UiManager.OpenView("ComposeLevelView");
      }),
      (this.KTi = (e) => {
        (ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1),
          UiManager_1.UiManager.OpenView("ManufactureHelpRoleView", e);
      }),
      (this.DNt = () => {
        switch (
          (this.ChildPopView?.PopItem.SetTitleVisible(!0),
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType)
        ) {
          case 1:
            this.ChildPopView?.PopItem.SetTitleText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                "ReagentProduction",
              ) ?? "",
            );
            break;
          case 2:
            this.ChildPopView?.PopItem.SetTitleText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                "Structure",
              ) ?? "",
            );
            break;
          case 3:
            this.ChildPopView?.PopItem.SetTitleText(
              ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                "Purification",
              ) ?? "",
            );
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIHorizontalLayout],
      [12, UE.UIItem],
      [13, UE.UIText],
    ]),
      (this.BtnBindInfo = [[5, this.WTi]]);
  }
  async OnBeforeStartAsync() {
    (this.xTi = new ComposeIngredientsView_1.ComposeIngredientsView()),
      (this.wTi = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.xNt,
      )),
      await Promise.all([
        this.wTi.RefreshByDataAsync([1, 2, 3]),
        this.xTi.CreateByActorAsync(this.GetItem(4).GetOwner()),
        ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync(),
      ]),
      this.xTi.SetActive(!0);
  }
  OnStart() {
    (this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.FNt)),
      this.vNt.SetActive(!1),
      (this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.FNt)),
      this.MNt.SetSortToggleState(!0),
      (this.BTi = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetLoopScrollViewComponent(2).TemplateGrid,
        this.cHe,
      )),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(9),
        "ComposeLevelButtonText",
      ),
      (this.SNt = new StarLevelComponent_1.StarLevelComponent(
        this.GetHorizontalLayout(11),
      )),
      CommonManager_1.CommonManager.SetCurrentSystem(1),
      ComposeController_1.ComposeController.RegisterCurrentInteractionEntity(),
      (this.oWs = new CustomPromise_1.CustomPromise()),
      (ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      ),
      void 0 ===
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Compose",
            8,
            "[LevelEventOpenSystem] 打开合成界面时找不到交互对象，直接关闭界面",
          ),
        this.CloseMe());
  }
  OnBeforeShow() {
    this.qTi(), this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
  }
  async OnBeforeShowAsyncImplement() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
      this.oWs &&
      (await this.oWs.Promise);
  }
  OnAfterShow() {
    this.JNt(), (this.oWs = void 0);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
      this.jwe,
    ),
      this.wTi.ClearChildren(),
      this.BTi.ClearGridProxies(),
      this.SNt.Clear();
    var e = ModelManager_1.ModelManager.ComposeModel;
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
    ),
      ComposeController_1.ComposeController.PlayLeaveCompositeAudio(),
      ComposeController_1.ComposeController.ClearCurrentInteractionEntityDisplay(),
      e.ClearComposeRoleItemDataList(),
      (e.CurrentComposeRoleId = 0),
      (e.CurrentComposeListType = 1),
      RedDotController_1.RedDotController.UnBindRedDot(
        "ComposeReagentProduction",
      ),
      (this.oWs = void 0);
  }
  JNt() {
    var e,
      t = this.ChildPopView.PopItem;
    t &&
      !this.p9s &&
      ((e =
        !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence()),
      t.GetActive() !== e) &&
      t.SetActive(e);
  }
  INt() {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 0;
    var t = this.wTi.GetLayoutItemList();
    let i = !1;
    var s = ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType;
    for (let e = 0; e < t.length; e++) {
      var r = t[e],
        o = r.GetMainType();
      0 < this.zNt(s).length || e === t.length - 1
        ? (r.SetUiActive(!0),
          s !== o || i || (this.wTi.SelectGridProxy(r.GridIndex), (i = !0)))
        : r.SetUiActive(!1);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetComposeData,
      this.qTi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenHelpRole,
        this.KTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeSuccess,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeFail,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
        this.kTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetComposeData,
      this.qTi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeSuccess,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeFail,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenHelpRole,
        this.KTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay,
        this.kTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      this.GOe &&
        TimerSystem_1.TimerSystem.Has(this.GOe) &&
        (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  AGt() {
    var e = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime();
    e
      ? (this.GetItem(12).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
      : this.GetItem(12).SetUIActive(!1);
  }
  bNt() {
    return (
      ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  NNt() {
    var e = this.LNt();
    if (e)
      for (const t of e)
        if (
          0 < t.ExistEndTime &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)
        )
          return !0;
    return !1;
  }
  jTi(e = !1) {
    let t = 0;
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        (t = this.UTi), this.xTi.RefreshTips(this.aTi[t]);
        break;
      case 2:
        (t = this.ATi), this.xTi.RefreshTips(this.hTi[t]);
        break;
      case 3:
        (t = this.PTi), this.xTi.RefreshTips(this.lTi[t]);
    }
    this.BTi.DeselectCurrentGridProxy(),
      e && this.BTi.ScrollToGridIndex(t),
      this.BTi.SelectGridProxy(t);
  }
  GTi() {
    this.GetButton(5)
      .GetOwner()
      .GetUIItem()
      .SetUIActive(
        1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
      ),
      this.QTi();
  }
  QTi() {
    var e;
    1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
      ((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_ReagentProductionLevel",
      )),
      this.SetSpriteByPath(e, this.GetSprite(6), !1));
  }
  zNt(e) {
    let t = void 0;
    switch (e) {
      case 1:
        t =
          ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataList();
        break;
      case 2:
        t = ModelManager_1.ModelManager.ComposeModel.GetStructureDataList();
        break;
      case 3:
        t = ModelManager_1.ModelManager.ComposeModel.GetPurificationDataList();
        break;
      default:
        return;
    }
    return t;
  }
  LNt() {
    return this.zNt(
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
    );
  }
  YGt() {
    RedDotController_1.RedDotController.BindRedDot(
      "ComposeReagentProduction",
      this.GetItem(7),
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (this.BTi?.DataInited)
      return (
        (t = Number(e[0])),
        (t = this.BTi.GetGridByDisplayIndex(t))
          ? [t, t]
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                54,
                "合成界面聚焦引导的额外参数配置错误",
                ["configParams", e],
              )
            )
      );
  }
}
exports.ComposeRootView = ComposeRootView;
//# sourceMappingURL=ComposeRootView.js.map
