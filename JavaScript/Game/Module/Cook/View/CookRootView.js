"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRootView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FilterEntrance_1 = require("../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance"),
  StarLevelComponent_1 = require("../../Manufacture/Common/StarLevelComponent"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  CookController_1 = require("../CookController"),
  CookingIngredientsView_1 = require("./CookingIngredientsView"),
  CookMediumItemGrid_1 = require("./CookMediumItemGrid"),
  TIMERGAP = 1e3;
class CookRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.mNt = 0),
      (this.dNt = 0),
      (this.CNt = void 0),
      (this.gNt = void 0),
      (this.fNt = new Array()),
      (this.Zqt = new Array()),
      (this.pNt = void 0),
      (this.vNt = void 0),
      (this.MNt = void 0),
      (this.ENt = !1),
      (this.SNt = void 0),
      (this.qjs = void 0),
      (this.zVs = !1),
      (this.yNt = () => {
        this.INt(),
          this.TNt(),
          this.vNt.UpdateData(19, this.LNt()),
          this.MNt.SetResultDataDirty(),
          this.MNt.UpdateData(19, this.LNt()),
          this.YGt();
        var e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel(),
          t =
            ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel;
        this.SNt.ShowLevel(t, e), this.AGt();
      }),
      (this.RNt = (e) => {
        this.UNt(e);
      }),
      (this.ANt = () => {
        this.PNt();
      }),
      (this.GOe = void 0),
      (this.xNt = () => {
        var e = new MainTypeItem();
        return e.SetMainTypeCallback(this.wNt), e;
      }),
      (this.BNt = () => {
        this.AGt(),
          this.pNt?.OnSecondTimerRefresh(),
          this.bNt() || this.qNt()
            ? CookController_1.CookController.SendCookingDataRequestAsync().then(
                (e) => {
                  e && this.GNt();
                },
              )
            : this.NNt() &&
              CookController_1.CookController.SendCookingDataRequestAsync().then(
                (e) => {
                  e && this.vNt.UpdateData(19, this.LNt());
                },
              );
      }),
      (this.cHe = () => {
        var e = new CookMediumItemGrid_1.CookMediumItemGrid();
        return e.BindOnExtendToggleStateChanged(this.ONt), e;
      }),
      (this.jwe = (e) => {
        "OnBlackScreen" === e &&
          (this.ChildPopView?.PlayLevelSequenceByName("BlackScreenShow"),
          this.qjs?.IsPending() && this.qjs.SetResult(),
          (this.zVs = !0));
      }),
      (this.Qvt = (e, t) => {
        this.gNt.DeselectCurrentGridProxy(!1), (this.mNt = 0), this.FNt(e);
      }),
      (this.VNt = (e, t) => {
        this.FNt(e);
      }),
      (this.GNt = () => {
        0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
          ? (this.vNt.UpdateData(19, this.LNt()),
            this.MNt.SetResultDataDirty(),
            this.MNt.UpdateData(19, this.LNt()))
          : (this.vNt.UpdateData(27, this.LNt()),
            this.MNt.SetResultDataDirty(),
            this.MNt.UpdateData(27, this.LNt()));
      }),
      (this.HNt = (e = !0) => {
        this.jNt(), this.pNt.RefreshTipsWithSavedData(), this.WNt(e);
      }),
      (this.jNt = () => {
        this.gNt.DeselectCurrentGridProxy(),
          0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
            ? this.gNt.RefreshByData(this.fNt)
            : this.gNt.RefreshByData(this.Zqt);
      }),
      (this.KNt = () => {
        this.ChildPopView?.PlaySequenceAsync(
          "Close",
          new CustomPromise_1.CustomPromise(),
          !0,
          !1,
        ).then(() => {
          this.ChildPopView?.PopItem.SetActive(!1);
        });
      }),
      (this.XNt = () => {
        this.ChildPopView?.PopItem.SetUiActive(!1);
      }),
      (this.$Ge = (e) => {
        "CompositeRewardView" === e &&
          (this.ChildPopView?.PopItem.SetActive(!0),
          this.ChildPopView?.PlayLevelSequenceByName("Start"));
      }),
      (this.Msa = () => {
        this.pNt.RefreshCooking();
      }),
      (this.YNt = () => {
        CookController_1.CookController.IsPlayingSuccessDisplay
          ? CookController_1.CookController.SkipCookSuccessDisplay()
          : CookController_1.CookController.IsPlayingFailDisplay &&
            CookController_1.CookController.SkipCookFailDisplay();
      }),
      (this.wNt = (e) => {
        ModelManager_1.ModelManager.CookModel.CurrentCookListType !== e &&
          (0 === e
            ? ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchCookType,
              ),
              this.GetItem(3).SetUIActive(!0),
              (this.ENt = !0))
            : ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchCookType,
              ),
              (this.ENt = !0),
              this.GetItem(3).SetUIActive(!1)),
          this.GNt(),
          this.DNt(),
          (this.ENt = !1));
      }),
      (this.ONt = (e) => {
        let t = 0;
        var i,
          e = e.Data;
        this.gNt.DeselectCurrentGridProxy(),
          0 === e.MainType
            ? ((this.mNt = this.fNt.indexOf((i = e))),
              (t = this.mNt),
              this.pNt.RefreshTips(i))
            : ((this.dNt = this.Zqt.indexOf((i = e))),
              (t = this.dNt),
              this.pNt.RefreshTips(i)),
          this.gNt.IsGridDisplaying(t) &&
            (e.IsNew &&
              !this.ENt &&
              (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
                e.ItemId,
              ),
              (e.IsNew = !1)),
            this.gNt.SelectGridProxy(t),
            this.gNt.RefreshGridProxy(t),
            this.DNt(),
            (this.ENt = !1));
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
      (this.BtnBindInfo = [[5, this.ANt]]);
  }
  async OnBeforeStartAsync() {
    (this.pNt = new CookingIngredientsView_1.CookingIngredientsView()),
      (this.CNt = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.xNt,
      )),
      await Promise.all([
        this.pNt.CreateByActorAsync(this.GetItem(4).GetOwner()),
        this.CNt.RefreshByDataAsync([0, 1]),
        CookController_1.CookController.SendCookingDataRequestAsync(),
      ]);
  }
  OnStart() {
    (this.gNt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetLoopScrollViewComponent(2).TemplateGrid,
      this.cHe,
    )),
      (this.vNt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(3),
        this.Qvt,
      )),
      (this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.VNt)),
      this.MNt.SetSortToggleState(!0),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "CookLevelButtonText"),
      (this.SNt = new StarLevelComponent_1.StarLevelComponent(
        this.GetHorizontalLayout(11),
      )),
      void 0 ===
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Cook",
            8,
            "[LevelEventOpenSystem] 打开烹饪界面时找不到交互对象，直接关闭界面",
          ),
        this.CloseMe()),
      (this.qjs = new CustomPromise_1.CustomPromise());
    var e = ModelManager_1.ModelManager.CookModel;
    (e.CurrentInteractCreatureDataLongId =
      ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      (e.CurrentCookListType = 0),
      this.yNt(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseCookRole,
        this.Msa,
      );
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
  }
  async OnBeforeShowAsyncImplement() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
      this.qjs &&
      (await this.qjs.Promise);
  }
  OnAfterShow() {
    this.JNt(), (this.qjs = void 0);
  }
  JNt() {
    var e,
      t = this.ChildPopView.PopItem;
    t &&
      !this.zVs &&
      ((e =
        !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence()),
      t.GetActive() !== e) &&
      t.SetActive(e);
  }
  OnAfterPlayStartSequence() {
    var e = this.mNt;
    this.gNt.DeselectCurrentGridProxy(),
      this.gNt.ScrollToGridIndex(e),
      this.gNt.SelectGridProxy(e);
  }
  INt() {
    ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 0;
    var t = this.CNt.GetLayoutItemList();
    let i = !1;
    for (let e = 0; e < t.length; e++) {
      var s = t[e];
      0 < this.zNt(s.GetMainType()).length || e === t.length - 1
        ? (s.SetUiActive(!0),
          i ||
            (this.CNt.SelectGridProxy(s.GridIndex),
            (ModelManager_1.ModelManager.CookModel.CurrentCookListType =
              s.GetMainType()),
            (i = !0)))
        : s.SetUiActive(!1);
    }
  }
  UNt(e) {
    UiManager_1.UiManager.OpenView("CookRoleView", e);
  }
  PNt() {
    UiManager_1.UiManager.OpenView("CookLevelView");
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateFormula,
      this.GNt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CookSuccess,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CookFail,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningSuccess,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningStudyFail,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GetCookData,
        this.yNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenCookRole,
        this.RNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenCookLevel,
        this.ANt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
        this.KNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
        this.XNt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.YNt,
      ),
      InputDistributeController_1.InputDistributeController.BindTouch(
        TouchFingerDefine_1.EFingerIndex.One,
        this.YNt,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateFormula,
      this.GNt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CookSuccess,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CookFail,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningSuccess,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningStudyFail,
        this.HNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GetCookData,
        this.yNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenCookRole,
        this.RNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenCookLevel,
        this.ANt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
        this.KNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
        this.XNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.YNt,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouch(
        TouchFingerDefine_1.EFingerIndex.One,
        this.YNt,
      ),
      this.GOe &&
        TimerSystem_1.TimerSystem.Has(this.GOe) &&
        (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  AGt() {
    var e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime();
    e
      ? (this.GetItem(12).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
      : this.GetItem(12).SetUIActive(!1);
  }
  bNt() {
    return (
      ModelManager_1.ModelManager.CookModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  qNt() {
    return ModelManager_1.ModelManager.CookModel.CheckHasItemTimeoutStateChangedCore();
  }
  NNt() {
    if (0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType)
      for (const e of this.LNt())
        if (
          0 < e.ExistEndTime &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime)
        )
          return !0;
    return !1;
  }
  TNt() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_CookLevel",
      );
    this.SetSpriteByPath(e, this.GetSprite(6), !1);
  }
  YGt() {
    var e = this.GetItem(7);
    RedDotController_1.RedDotController.BindRedDot("CookerLevel", e);
  }
  DisableRedDot() {
    RedDotController_1.RedDotController.UnBindRedDot("CookerLevel");
  }
  FNt(e) {
    0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
      ? ((this.fNt = e),
        (this.fNt = this.fNt.filter(
          (e) =>
            e.IsUnLock ||
            e.ExistEndTime <= 0 ||
            TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime),
        )))
      : (this.Zqt = e),
      this.jNt(),
      0 === e.length
        ? (this.GetItem(8).SetUIActive(!0), this.pNt.SetUiActive(!1))
        : (this.GetItem(8).SetUIActive(!1),
          this.pNt.SetUiActive(!0),
          this.WNt(!0));
  }
  DNt() {
    switch (
      (this.ChildPopView?.PopItem.SetTitleVisible(!0),
      ModelManager_1.ModelManager.CookModel.CurrentCookListType)
    ) {
      case 0:
        this.ChildPopView?.PopItem.SetTitleText(
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "MakingDishes",
          ) ?? "",
        );
        break;
      case 1:
        this.ChildPopView?.PopItem.SetTitleText(
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "MakingAccessory",
          ) ?? "",
        );
    }
  }
  zNt(e) {
    return 0 === e
      ? ModelManager_1.ModelManager.CookModel.GetCookingDataList()
      : ModelManager_1.ModelManager.CookModel.GetMachiningDataList();
  }
  LNt() {
    return this.zNt(ModelManager_1.ModelManager.CookModel.CurrentCookListType);
  }
  WNt(e = !1) {
    let t = 0;
    0 === ModelManager_1.ModelManager.CookModel.CurrentCookListType
      ? ((t = this.mNt), this.pNt.RefreshTips(this.fNt[t]))
      : ((t = this.dNt), this.pNt.RefreshTips(this.Zqt[t])),
      this.gNt.DeselectCurrentGridProxy(),
      e && this.gNt.ScrollToGridIndex(t),
      this.gNt.SelectGridProxy(t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
      this.jwe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseCookRole,
        this.Msa,
      ),
      CookController_1.CookController.ClearCookDisplay(),
      this.DisableRedDot(),
      this.gNt && (this.gNt.ClearGridProxies(), (this.gNt = void 0)),
      this.vNt && (this.vNt.Destroy(), (this.vNt = void 0)),
      this.MNt && this.MNt.Destroy(),
      this.CNt && (this.CNt.ClearChildren(), (this.CNt = void 0)),
      this.SNt.Clear();
    var e = ModelManager_1.ModelManager.CookModel;
    (e.CurrentCookRoleId = void 0),
      e.ClearCookRoleItemDataList(),
      (this.qjs = void 0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetGuideUiItem(e[0]);
    if (t) return [t, t];
    t = Number(e[0]);
    if (this.gNt?.DataInited) {
      if (0 !== t) {
        t = this.gNt.GetGridAndScrollToByJudge(t, (e, t) => {
          return 0 === t.MainType && 6e4 === t.SubType && e === t.DataId;
        });
        if (t) return [t, t];
      } else {
        t = this.gNt.GetGridByDisplayIndex(0);
        if (t) return [t, t];
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Guide", 17, "烹饪界面聚焦引导的额外参数配置错误", [
          "configParams",
          e,
        ]);
    }
  }
}
exports.CookRootView = CookRootView;
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ZNt = void 0),
      (this.OnClickedCallback = void 0),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.OnItemButtonClicked = (e) => {
        1 === e &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          );
      });
  }
  Refresh(e, t, i) {
    this.ZNt = e;
    let s = "";
    (s =
      0 === this.ZNt
        ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_Cooking",
          )
        : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_Machining",
          )),
      this.SetSpriteByPath(s, this.GetSprite(0), !1);
  }
  Clear() {}
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1, e),
      this.OnClickedCallback?.(this.ZNt);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0, !1);
  }
  GetKey(e, t) {
    return t;
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
}
//# sourceMappingURL=CookRootView.js.map
