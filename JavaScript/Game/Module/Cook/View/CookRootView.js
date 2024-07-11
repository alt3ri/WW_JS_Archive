"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRootView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const FilterEntrance_1 = require("../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const StarLevelComponent_1 = require("../../Manufacture/Common/StarLevelComponent");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CookController_1 = require("../CookController");
const CookingIngredientsView_1 = require("./CookingIngredientsView");
const CookMediumItemGrid_1 = require("./CookMediumItemGrid");
const TIMERGAP = 1e3;
class CookRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cGt = 0),
      (this.mGt = 0),
      (this.dGt = void 0),
      (this.CGt = void 0),
      (this.gGt = new Array()),
      (this.Ybt = new Array()),
      (this.fGt = void 0),
      (this.pGt = void 0),
      (this.vGt = void 0),
      (this.MGt = !1),
      (this.SGt = void 0),
      (this.EPe = void 0),
      (this.m5s = void 0),
      (this.c4s = !1),
      (this.EGt = () => {
        this.yGt(),
          this.IGt(),
          this.pGt.UpdateData(19, this.TGt()),
          this.vGt.UpdateData(19, this.TGt()),
          this.Qqt();
        const e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel();
        const t =
          ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel;
        this.SGt.ShowLevel(t, e), this.LGt(), this.Dqt();
      }),
      (this.DGt = (e) => {
        this.RGt(e);
      }),
      (this.UGt = () => {
        this.AGt();
      }),
      (this.GOe = void 0),
      (this.PGt = () => {
        const e = new MainTypeItem();
        return e.SetMainTypeCallback(this.xGt), e;
      }),
      (this.wGt = () => {
        this.Dqt(),
          this.fGt?.OnSecondTimerRefresh(),
          this.BGt() || this.bGt()
            ? CookController_1.CookController.SendCookingDataRequestAsync().then(
                (e) => {
                  e && this.qGt();
                },
              )
            : this.GGt() &&
              CookController_1.CookController.SendCookingDataRequestAsync().then(
                (e) => {
                  e && this.pGt.UpdateData(19, this.TGt());
                },
              );
      }),
      (this.z9e = () => {
        const e = new CookMediumItemGrid_1.CookMediumItemGrid();
        return e.BindOnExtendToggleStateChanged(this.NGt), e;
      }),
      (this.jwe = (e) => {
        e === "OnBlackScreen" &&
          (this.EPe ||
            (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
              this.ChildPopView?.PopItem.GetRootItem(),
            )),
          this.EPe?.PlayLevelSequenceByName("Start", !0),
          this.m5s?.SetResult(),
          this.ChildPopView?.PopItem.SetActive(!0),
          (this.c4s = !0));
      }),
      (this.bpt = (e, t) => {
        this.CGt.DeselectCurrentGridProxy(!1), (this.cGt = 0), this.kGt(e);
      }),
      (this.FGt = (e, t) => {
        this.kGt(e);
      }),
      (this.qGt = () => {
        ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0
          ? (this.pGt.UpdateData(19, this.TGt()),
            this.vGt.UpdateData(19, this.TGt()))
          : (this.pGt.UpdateData(27, this.TGt()),
            this.vGt.UpdateData(27, this.TGt()));
      }),
      (this.VGt = (e = !0) => {
        this.HGt(), this.fGt.RefreshTipsWithSavedData(), this.jGt(e);
      }),
      (this.HGt = () => {
        this.CGt.DeselectCurrentGridProxy(),
          ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0
            ? this.CGt.RefreshByData(this.gGt)
            : this.CGt.RefreshByData(this.Ybt);
      }),
      (this.WGt = () => {
        this.EPe?.PlaySequenceAsync(
          "Close",
          new CustomPromise_1.CustomPromise(),
          !0,
          !1,
        ).then(() => {
          this.ChildPopView?.PopItem.SetActive(!1);
        });
      }),
      (this.QGt = () => {
        this.ChildPopView?.PopItem.SetUiActive(!1);
      }),
      (this.$Ge = (e) => {
        e === "CompositeRewardView" &&
          (this.ChildPopView?.PopItem.SetActive(!0),
          this.EPe?.PlayLevelSequenceByName("Start"));
      }),
      (this.$Gt = () => {
        CookController_1.CookController.IsPlayingSuccessDisplay
          ? CookController_1.CookController.SkipCookSuccessDisplay()
          : CookController_1.CookController.IsPlayingFailDisplay &&
            CookController_1.CookController.SkipCookFailDisplay();
      }),
      (this.xGt = (e) => {
        ModelManager_1.ModelManager.CookModel.CurrentCookListType !== e &&
          (e === 0
            ? ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchCookType,
              ),
              this.GetItem(3).SetUIActive(!0),
              (this.MGt = !0))
            : ((ModelManager_1.ModelManager.CookModel.CurrentCookListType = 1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SwitchCookType,
              ),
              (this.MGt = !0),
              this.GetItem(3).SetUIActive(!1)),
          this.qGt(),
          this.LGt(),
          (this.MGt = !1));
      }),
      (this.NGt = (e) => {
        let t = 0;
        let i;
        var e = e.Data;
        this.CGt.DeselectCurrentGridProxy(),
          e.MainType === 0
            ? ((this.cGt = this.gGt.indexOf((i = e))),
              (t = this.cGt),
              this.fGt.RefreshTips(i))
            : ((this.mGt = this.Ybt.indexOf((i = e))),
              (t = this.mGt),
              this.fGt.RefreshTips(i)),
          this.CGt.IsGridDisplaying(t) &&
            (e.IsNew &&
              !this.MGt &&
              (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
                e.ItemId,
              ),
              (e.IsNew = !1)),
            this.CGt.SelectGridProxy(t),
            this.CGt.RefreshGridProxy(t),
            this.LGt(),
            (this.MGt = !1));
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
      (this.BtnBindInfo = [[5, this.UGt]]);
  }
  async OnBeforeStartAsync() {
    (this.fGt = new CookingIngredientsView_1.CookingIngredientsView()),
      (this.dGt = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.PGt,
      )),
      await Promise.all([
        this.fGt.CreateByActorAsync(this.GetItem(4).GetOwner()),
        this.dGt.RefreshByDataAsync([0, 1]),
      ]);
  }
  OnStart() {
    (this.CGt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetLoopScrollViewComponent(2).TemplateGrid,
      this.z9e,
    )),
      (this.pGt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(3),
        this.bpt,
      )),
      (this.vGt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.FGt)),
      this.vGt.SetSortToggleState(!0),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "CookLevelButtonText"),
      (this.SGt = new StarLevelComponent_1.StarLevelComponent(
        this.GetHorizontalLayout(11),
      )),
      CookController_1.CookController.SendCookingDataRequest(),
      (this.m5s = new CustomPromise_1.CustomPromise()),
      (ModelManager_1.ModelManager.CookModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      );
  }
  OnBeforeShow() {
    this.EGt(), this.ChildPopView?.PopItem.SetMaskResponsibleState(!1);
  }
  async OnBeforeShowAsyncImplement() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() &&
      this.m5s &&
      (await this.m5s.Promise);
  }
  OnAfterShow() {
    this.YGt();
  }
  YGt() {
    let e;
    const t = this.ChildPopView.PopItem;
    t &&
      !this.c4s &&
      ((e =
        !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence()),
      t.GetActive() !== e) &&
      t.SetActive(e);
  }
  OnAfterPlayStartSequence() {
    const e = this.cGt;
    this.CGt.DeselectCurrentGridProxy(),
      this.CGt.ScrollToGridIndex(e),
      this.CGt.SelectGridProxy(e);
  }
  yGt() {
    ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 0;
    const t = this.dGt.GetLayoutItemList();
    let i = !1;
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      this.JGt(s.GetMainType()).length > 0 || e === t.length - 1
        ? (s.SetUiActive(!0),
          i ||
            (this.dGt.SelectGridProxy(s.GridIndex),
            (ModelManager_1.ModelManager.CookModel.CurrentCookListType =
              s.GetMainType()),
            (i = !0)))
        : s.SetUiActive(!1);
    }
  }
  RGt(e) {
    UiManager_1.UiManager.OpenView("CookRoleView", e);
  }
  AGt() {
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
      this.qGt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CookSuccess,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CookFail,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningSuccess,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MachiningStudyFail,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GetCookData,
        this.EGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenCookRole,
        this.DGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenCookLevel,
        this.UGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
        this.WGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
        this.QGt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.$Gt,
      ),
      InputDistributeController_1.InputDistributeController.BindTouch(
        TouchFingerDefine_1.EFingerIndex.One,
        this.$Gt,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.wGt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateFormula,
      this.qGt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CookSuccess,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CookFail,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningSuccess,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MachiningStudyFail,
        this.VGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GetCookData,
        this.EGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenCookRole,
        this.DGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenCookLevel,
        this.UGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay,
        this.WGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeginPlayCookFailDisplay,
        this.QGt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.$Gt,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouch(
        TouchFingerDefine_1.EFingerIndex.One,
        this.$Gt,
      ),
      this.GOe &&
        TimerSystem_1.TimerSystem.Has(this.GOe) &&
        (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  Dqt() {
    const e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime();
    e
      ? (this.GetItem(12).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e))
      : this.GetItem(12).SetUIActive(!1);
  }
  BGt() {
    return (
      ModelManager_1.ModelManager.CookModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  bGt() {
    return ModelManager_1.ModelManager.CookModel.CheckHasItemTimeoutStateChangedCore();
  }
  GGt() {
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0)
      for (const e of this.TGt())
        if (
          e.ExistEndTime > 0 &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime)
        )
          return !0;
    return !1;
  }
  IGt() {
    const e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_CookLevel",
      );
    this.SetSpriteByPath(e, this.GetSprite(6), !1);
  }
  Qqt() {
    const e = this.GetItem(7);
    RedDotController_1.RedDotController.BindRedDot("CookerLevel", e);
  }
  DisableRedDot() {
    RedDotController_1.RedDotController.UnBindRedDot("CookerLevel");
  }
  kGt(e) {
    ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0
      ? ((this.gGt = e),
        (this.gGt = this.gGt.filter(
          (e) =>
            e.IsUnLock ||
            e.ExistEndTime <= 0 ||
            TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime),
        )))
      : (this.Ybt = e),
      this.HGt(),
      e.length === 0
        ? (this.GetItem(8).SetUIActive(!0), this.fGt.SetUiActive(!1))
        : (this.GetItem(8).SetUIActive(!1),
          this.fGt.SetUiActive(!0),
          this.jGt(!0));
  }
  LGt() {
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
  JGt(e) {
    return e === 0
      ? ModelManager_1.ModelManager.CookModel.GetCookingDataList()
      : ModelManager_1.ModelManager.CookModel.GetMachiningDataList();
  }
  TGt() {
    return this.JGt(ModelManager_1.ModelManager.CookModel.CurrentCookListType);
  }
  jGt(e = !1) {
    let t = 0;
    ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0
      ? ((t = this.cGt), this.fGt.RefreshTips(this.gGt[t]))
      : ((t = this.mGt), this.fGt.RefreshTips(this.Ybt[t])),
      this.CGt.DeselectCurrentGridProxy(),
      e && this.CGt.ScrollToGridIndex(t),
      this.CGt.SelectGridProxy(t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
      this.jwe,
    ),
      CookController_1.CookController.ClearCookDisplay(),
      this.DisableRedDot(),
      this.CGt && (this.CGt.ClearGridProxies(), (this.CGt = void 0)),
      this.pGt && (this.pGt.Destroy(), (this.pGt = void 0)),
      this.vGt && this.vGt.Destroy(),
      this.dGt && (this.dGt.ClearChildren(), (this.dGt = void 0)),
      this.SGt.Clear();
    const e = ModelManager_1.ModelManager.CookModel;
    (e.CurrentCookRoleId = void 0),
      e.ClearCookRoleItemDataList(),
      this.EPe?.Clear(),
      (this.EPe = void 0),
      (this.m5s = void 0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    let t = this.GetGuideUiItem(e[0]);
    if (t) return [t, t];
    t = Number(e[0]);
    if (this.CGt?.DataInited) {
      if (t !== 0) {
        t = this.CGt.GetGridAndScrollToByJudge(t, (e, t) => {
          return t.MainType === 0 && t.SubType === 6e4 && e === t.DataId;
        });
        if (t) return [t, t];
      } else {
        t = this.CGt.GetGridByDisplayIndex(0);
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
      (this.zGt = void 0),
      (this.OnClickedCallback = void 0),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.OnItemButtonClicked = (e) => {
        e === 1 &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          );
      });
  }
  Refresh(e, t, i) {
    this.zGt = e;
    let s = "";
    (s =
      this.zGt === 0
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
      this.OnClickedCallback?.(this.zGt);
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
    return this.zGt;
  }
  SetMainTypeCallback(e) {
    this.OnClickedCallback = e;
  }
}
// # sourceMappingURL=CookRootView.js.map
