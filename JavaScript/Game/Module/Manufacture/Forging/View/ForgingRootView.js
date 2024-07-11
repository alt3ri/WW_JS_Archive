"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingRootView = void 0);
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
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ForgingController_1 = require("../ForgingController"),
  ForgingIngredientsView_1 = require("./ForgingIngredientsView"),
  ForgingMediumItemGrid_1 = require("./ForgingMediumItemGrid"),
  TIMERGAP = 1e3;
class ForgingRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.yLi = 0),
      (this.wTi = void 0),
      (this.ILi = void 0),
      (this.ENt = !1),
      (this.TLi = new Array()),
      (this.LLi = void 0),
      (this.vNt = void 0),
      (this.MNt = void 0),
      (this.GOe = void 0),
      (this.qjs = void 0),
      (this.zVs = !1),
      (this.DLi = void 0),
      (this.BNt = () => {
        this.AGt(),
          (this.bNt() || this.NNt()) &&
            ForgingController_1.ForgingController.SendForgeInfoRequestAsync().then(
              () => {
                this.RLi();
              },
            );
      }),
      (this.ULi = () => {
        this.ChildPopView?.PlaySequenceAsync(
          "Close",
          new CustomPromise_1.CustomPromise(),
          !0,
          !1,
        ).then(() => {
          this.ChildPopView?.PopItem.SetActive(!1);
        });
      }),
      (this.VTi = () => {
        UiManager_1.UiManager.IsViewShow("ForgingRootView") &&
          ForgingController_1.ForgingController.PlayForgingLoopDisplay();
      }),
      (this.$Ge = (e) => {
        "CompositeRewardView" === e &&
          (this.ChildPopView?.PopItem.SetActive(!0),
          this.ChildPopView?.PlayLevelSequenceByName("Start"),
          (e = ModelManager_1.ModelManager.ComposeModel.ComposeSuccessFlow),
          ForgingController_1.ForgingController.PlayForgingFlow(e));
      }),
      (this.Gjs = () => {
        this.MNt.UpdateData(24, this.LNt()), this.AGt();
      }),
      (this.jwe = (e) => {
        "OnBlackScreen" === e &&
          (this.ChildPopView?.PlayLevelSequenceByName("BlackScreenShow"),
          this.qjs?.IsPending() && this.qjs.SetResult(),
          this.ChildPopView?.PopItem.SetActive(!0),
          ForgingController_1.ForgingController.PlayForgingEnterDisplay(
            this.VTi,
          ),
          (this.zVs = !0));
      }),
      (this.xNt = (e, i, t) => {
        i = new MainTypeItem(i, e);
        return (
          i.Update(), i.SetMainTypeCallback(this.wNt), { Key: t, Value: i }
        );
      }),
      (this.wNt = (e) => {
        for (const i of this.wTi.GetLayoutItemMap().values())
          i.OnDeselectedItem();
        (this.ENt = !0), this.xLi();
      }),
      (this.cHe = () => {
        var e = new ForgingMediumItemGrid_1.ForgingMediumItemGrid();
        return e.BindOnExtendToggleStateChanged(this.HTi), e;
      }),
      (this.HTi = (e) => {
        e = e.Data;
        this.ILi.DeselectCurrentGridProxy(),
          (this.yLi = this.TLi.indexOf(e)),
          (this.LLi = e),
          this.ILi.IsGridDisplaying(this.yLi) &&
            (e.IsNew &&
              !this.ENt &&
              ((e.IsNew = !1),
              ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
                e.ItemId,
              )),
            this.ILi.SelectGridProxy(this.yLi),
            this.ILi.RefreshGridProxy(this.yLi),
            this.DLi.RefreshTips(e),
            (this.ENt = !1));
      }),
      (this.RLi = () => {
        this.MNt.UpdateData(24, this.LNt());
      }),
      (this.jNt = () => {
        this.ILi.ReloadData(this.TLi);
      }),
      (this.Q9t = () => {
        UiManager_1.UiManager.OpenView(
          "ManufactureHelpRoleView",
          this.LLi.ItemId,
        );
      }),
      (this.FNt = (e) => {
        (this.TLi = e),
          (this.TLi = this.TLi.filter(
            (e) =>
              e.ExistStartTime <= 0 ||
              TimeUtil_1.TimeUtil.IsInTimeSpan(
                e.ExistStartTime,
                e.ExistEndTime,
              ),
          )),
          this.jNt(),
          0 === this.TLi.length
            ? (this.GetItem(8).SetUIActive(!0), this.DLi.SetActive(!1))
            : (this.GetItem(8).SetUIActive(!1),
              this.DLi.SetActive(!0),
              this.wLi(!0));
      }),
      (this.xLi = () => {
        this.MNt.UpdateData(24, this.LNt());
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetForgingData,
      this.Gjs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenHelpRole,
        this.Q9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingSuccess,
        this.RLi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingFail,
        this.RLi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
        this.ULi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetForgingData,
      this.Gjs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenHelpRole,
        this.Q9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingSuccess,
        this.jNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingFail,
        this.jNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay,
        this.ULi,
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
    var e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime();
    e
      ? (this.GetItem(12).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
      : this.GetItem(12).SetUIActive(!1);
  }
  bNt() {
    return (
      ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  NNt() {
    var e = this.LNt();
    if (e)
      for (const i of e)
        if (
          0 < i.ExistEndTime &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(i.ExistStartTime, i.ExistEndTime)
        )
          return !0;
    return !1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
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
      [12, UE.UIItem],
      [13, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.DLi = new ForgingIngredientsView_1.ForgingIngredientsView()),
      await this.DLi.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.DLi.SetActive(!0);
  }
  OnStart() {
    (this.wTi = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetHorizontalLayout(0),
      this.xNt,
    )),
      this.GetButton(5)
        .GetOwner()
        ?.GetComponentByClass(UE.UIItem.StaticClass())
        ?.SetUIActive(!1),
      this.wTi.RebuildLayoutByDataNew([0]),
      (this.vNt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(3),
        this.FNt,
      )),
      (this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.FNt)),
      this.vNt.SetActive(!1),
      (this.ILi = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetLoopScrollViewComponent(2).TemplateGrid,
        this.cHe,
      )),
      ForgingController_1.ForgingController.RegisterCurrentInteractionEntity(),
      CommonManager_1.CommonManager.SetCurrentSystem(2),
      (ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 0);
    for (const e of this.wTi.GetLayoutItemMap().values()) e.OnSelectedItem();
    (this.qjs = new CustomPromise_1.CustomPromise()),
      (ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      void 0 ===
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Forging",
            8,
            "[LevelEventOpenSystem] 打开合成界面时找不到交互对象，直接关闭界面",
          ),
        this.CloseMe()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      );
  }
  async OnBeforeShowAsyncImplement() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
      this.qjs &&
      (await this.qjs.Promise);
  }
  OnBeforeShow() {
    this.Gjs(), this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
  }
  OnAfterShow() {
    this.JNt(), (this.qjs = void 0);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
      this.jwe,
    ),
      this.vNt.Destroy(),
      this.MNt.Destroy(),
      this.wTi.ClearChildren(),
      this.DLi.Destroy(),
      ForgingController_1.ForgingController.PlayLeaveForgingAudio(),
      ForgingController_1.ForgingController.ClearCurrentInteractionEntityDisplay(),
      (this.qjs = void 0),
      (ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = 0);
  }
  JNt() {
    var e,
      i = this.ChildPopView.PopItem;
    i &&
      !this.zVs &&
      ((e =
        !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence()),
      i.GetActive() !== e) &&
      i.SetActive(e);
  }
  wLi(e = !1) {
    this.ILi.DeselectCurrentGridProxy(),
      e && this.ILi.ScrollToGridIndex(this.yLi),
      this.ILi.SelectGridProxy(this.yLi);
    e = this.TLi[this.yLi];
    this.DLi.RefreshTips(e);
  }
  LNt(e = !0) {
    let i = ModelManager_1.ModelManager.ForgingModel.GetForgingDataList();
    return (i =
      i && e ? i.filter((e) => 0 < e.IsUnlock || 0 < e.FormulaItemId) : i);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i;
    if (this.ILi?.DataInited)
      return (
        (i = Number(e[0])),
        (i = this.ILi.GetGridByDisplayIndex(i))
          ? [i, i]
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                54,
                "印造界面聚焦引导的额外参数配置错误",
                ["configParams", e],
              )
            )
      );
  }
}
exports.ForgingRootView = ForgingRootView;
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super(),
      (this.OnClickedCallback = void 0),
      (this.OnItemButtonClicked = (e) => {
        1 === e && this.SelectedItem();
      }),
      this.CreateThenShowByActor(e.GetOwner()),
      (this.ZNt = i);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[1, this.OnItemButtonClicked]]);
  }
  GetMainType() {
    return this.ZNt;
  }
  SetMainTypeCallback(e) {
    this.OnClickedCallback = e;
  }
  Update() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_Forging",
      );
    this.SetSpriteByPath(e, this.GetSprite(0), !1);
  }
  SelectedItem() {
    this.OnClickedCallback && this.OnClickedCallback(this.ZNt);
  }
  OnSelectedItem() {
    this.GetExtendToggle(1).SetToggleState(1, !1);
  }
  OnDeselectedItem() {
    this.GetExtendToggle(1).SetToggleState(0, !1);
  }
}
//# sourceMappingURL=ForgingRootView.js.map
