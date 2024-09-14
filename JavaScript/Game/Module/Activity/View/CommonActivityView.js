"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonActivityView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../Help/HelpController"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ActivityCommonDefine_1 = require("../ActivityCommonDefine"),
  ActivityManager_1 = require("../ActivityManager"),
  ActivityModel_1 = require("../ActivityModel"),
  ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent"),
  ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle");
class CommonActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.e5e = !0),
      (this.lqe = void 0),
      (this.t5e = 0),
      (this.i5e = void 0),
      (this.o5e = void 0),
      (this.r5e = void 0),
      (this.n5e = void 0),
      (this.s5e = void 0),
      (this.a5e = new Map()),
      (this.h5e = []),
      (this.l5e = !0),
      (this.PRn = []),
      (this._5e = () => {
        this.u5e(!0);
      }),
      (this.XOe = () => {
        HelpController_1.HelpController.OpenHelpById(this.t5e);
      }),
      (this.$Oe = () => {
        this.CloseMe();
      }),
      (this.c5e = (t, e) => {
        e && this.m5e(t);
      }),
      (this.d5e = (t, e) => this.n5e !== t),
      (this.C5e = () => {
        return new ActivityPageSelectContent_1.ActivityPageSelectContent();
      }),
      (this.CLn = (t) => {
        t.length <= 0 ||
          (this.lqe.SetCurrencyItemVisible(!0),
          this.lqe.SetCurrencyItemList(t).catch(() => {}));
      }),
      (this.g5e = () => {
        this.f5e();
      }),
      (this.p5e = () => {
        this.v5e();
      }),
      (this.M5e = (t) => {
        ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
          ?.Id === t && this.s5e?.RefreshView();
      }),
      (this.OnActivityUpdate = () => {
        var t = () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetToBattleView,
            );
          },
          e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
        e.FunctionMap.set(1, t),
          e.FunctionMap.set(0, t),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.E5e = (t) => {
        this.s5e?.PlaySubViewSequence(t);
      }),
      (this.u5e = (t, e = 0, i) => {
        (this.PRn = ActivityCommonDefine_1.activityViewStateSequence[e]),
          t !== this.e5e &&
            ((this.e5e = t),
            this.UiViewSequence.PlaySequence(t ? this.PRn[0] : this.PRn[1], i),
            this.s5e?.OnCommonViewStateChange(t)),
          this.RefreshTabIcon();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[8, this._5e]]);
  }
  OnAddEventListener() {
    this.S5e(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectActivity,
        this.g5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityViewChange,
        this.p5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.M5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityClose,
        this.OnActivityUpdate,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityOpen,
        this.OnActivityUpdate,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlaySequenceEventByStringParam,
        this.E5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetActivityViewState,
        this.u5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        this.CLn,
      );
  }
  OnRemoveEventListener() {
    this.y5e(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectActivity,
        this.g5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityViewChange,
        this.p5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.M5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityClose,
        this.OnActivityUpdate,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityOpen,
        this.OnActivityUpdate,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlaySequenceEventByStringParam,
        this.E5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetActivityViewState,
        this.u5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        this.CLn,
      );
  }
  async OnBeforeStartAsync() {
    this.I5e(), await this.T5e();
  }
  I5e() {
    var t = this.GetScrollViewWithScrollbar(1);
    this.i5e = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.C5e);
  }
  async T5e() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpCallBack(this.XOe),
      this.lqe.SetCloseCallBack(this.$Oe),
      (this.o5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(0)),
      await this.o5e.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.o5e.BindOnToggleFunction(this.c5e),
      this.o5e.BindOnCanToggleExecuteChange(this.d5e),
      (this.r5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(1)),
      await this.r5e.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.r5e.BindOnToggleFunction(this.c5e),
      this.r5e.BindOnCanToggleExecuteChange(this.d5e);
  }
  OnStart() {
    var t = this.OpenParam ?? 4;
    ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(t),
      (this.PRn = ActivityCommonDefine_1.activityViewStateSequence[0]),
      this.lqe.SetTitleLocalText("Activity_Title"),
      this.o5e.SetUiActive(!0),
      this.r5e.SetUiActive(!1);
  }
  OnBeforeShow() {
    this.l5e && (this.o5e.SetToggleState(!0, !0), (this.l5e = !1));
    for (const t of this.h5e)
      if (!t.CheckIfInShowTime())
        return void ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(
          () => {
            this.OnActivityUpdate();
          },
        );
    this.s5e?.RefreshView();
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync();
  }
  OnBeforeDestroy() {
    this.a5e.forEach((t, e) => {
      this.AddChild(t);
    }),
      this.a5e.clear();
  }
  m5e(t) {
    (0 === (this.n5e = t) ? this.r5e : this.o5e).SetToggleState(!1, !1),
      this.v5e(t);
  }
  L5e(t) {
    t = this.i5e.GetScrollItemByIndex(t);
    t && (this.i5e.ScrollTo(t.GetRootItem()), t.SetToggleState(!0, !0));
  }
  S5e() {
    RedDotController_1.RedDotController.BindRedDot(
      "ActivityEntrance",
      this.o5e.GetToggleRedDot(),
    );
  }
  y5e() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "ActivityEntrance",
      this.o5e.GetToggleRedDot(),
    );
  }
  v5e(t = 0) {
    const s =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    s.sort(ActivityModel_1.ActivityModel.SortFunc),
      (this.h5e = s),
      this.i5e.RefreshByData(s, () => {
        var e =
          ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId();
        let i = 0;
        for (let t = 0; t < s.length; t++)
          if (e === s[t].Id) {
            i = t;
            break;
          }
        ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(0),
          this.L5e(i);
      });
  }
  f5e() {
    var t =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity();
    this.D5e(t), this.R5e(t);
  }
  D5e(t) {
    var e = t.GetTitle();
    (this.t5e = t.GetHelpId()),
      this.lqe.SetHelpBtnActive(0 !== this.t5e),
      this.lqe.SetTitle(e.replace(/<.*?>/g, "")),
      this.RefreshTabIcon();
  }
  async WNe(t) {
    const e = new CustomPromise_1.CustomPromise();
    var i = this.GetTexture(7),
      t = (i.SetUIActive(!1), t.LocalConfig.BgResource);
    this.SetTextureByPath(t, i, void 0, () => {
      e.SetResult();
    }),
      await e.Promise;
  }
  async R5e(t) {
    let e = this.a5e.get(t);
    if (!e) {
      var i = ActivityManager_1.ActivityManager.GetActivityController(t.Type),
        s = this.GetItem(5),
        n = i.GetActivityResource(t);
      if (!(e = i.CreateSubPageComponent(t))) return;
      e.SetData(t), await e.CreateByPathAsync(n, s), this.a5e.set(t, e);
    }
    i = ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId();
    i === t.Id &&
      (await this.WNe(t),
      this.s5e?.SetActive(!1),
      this.lqe.SetCurrencyItemVisible(!1),
      (this.s5e = e),
      await this.s5e.BeforeShowSelfAsync(),
      this.s5e.RefreshView(),
      this.GetTexture(7).SetUIActive(!0),
      this.s5e.SetActive(!0),
      this.UiViewSequence.HasSequenceNameInPlaying("Switch")
        ? this.UiViewSequence.ReplaySequence("Switch")
        : this.UiViewSequence.PlaySequence("Switch"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectActivityAndSubViewReady,
        i,
      ));
  }
  RefreshTabIcon() {
    var t =
        ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
          .LocalConfig,
      t = this.e5e ? t.TabResource : t.TabResource2;
    t && this.lqe.SetTitleIcon(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e =
        ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity(),
      e = this.a5e.get(e);
    if (void 0 !== e) return e.GetGuideUiItemAndUiItemForShowEx(t);
  }
}
exports.CommonActivityView = CommonActivityView;
//# sourceMappingURL=CommonActivityView.js.map
