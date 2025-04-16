"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonActivityView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Macro_1 = require("../../../../Core/Preprocessor/Macro"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  HelpController_1 = require("../../Help/HelpController"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ActivityCommonDefine_1 = require("../ActivityCommonDefine"),
  ActivityManager_1 = require("../ActivityManager"),
  ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent"),
  ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle"),
  ActivityTipsButton_1 = require("./SubView/ActivityTipsButton");
class CommonActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.e5e = !0),
      (this.lqe = void 0),
      (this.t5e = 0),
      (this.bel = void 0),
      (this.i5e = void 0),
      (this.o5e = void 0),
      (this.r5e = void 0),
      (this.n5e = void 0),
      (this.qel = new Map([
        [0, 0],
        [1, 0],
      ])),
      (this.s5e = void 0),
      (this.a5e = new Map()),
      (this.SPe = void 0),
      (this.h5e = []),
      (this.Nel = new Map()),
      (this.PRn = []),
      (this.FY_ = [void 0, void 0]),
      (this.XY_ = [void 0, void 0]),
      (this.NY_ = () => {
        this.FY_[0] && this.i5e.ScrollTo(this.FY_[0]);
      }),
      (this.VY_ = () => {
        this.FY_[1] && this.i5e.ScrollTo(this.FY_[1]);
      }),
      (this._5e = () => {
        this.u5e(!0);
      }),
      (this.XOe = () => {
        HelpController_1.HelpController.OpenHelpById(this.t5e);
      }),
      (this.$Oe = () => {
        this.CloseMe();
      }),
      (this.c5e = (t, i) => {
        i && this.m5e(t);
      }),
      (this.d5e = (t, i) => this.n5e !== t),
      (this.C5e = () => {
        var t = new ActivityPageSelectContent_1.ActivityPageSelectContent();
        return (
          t.BindCanToggleExecuteChange(this.A5e), t.BindToggleClick(this.Bke), t
        );
      }),
      (this.A5e = (t, i) => !0),
      (this.Bke = (t, i) => {
        i && this.Gel(t, !0);
      }),
      (this.jY_ = (t) => {
        this.BNe(t), this.HY_();
      }),
      (this.$Y_ = () => {
        var t,
          i = this.FY_;
        i[0] && i[1]
          ? ((t = this.i5e.IsItemInViewport(
              i[0],
              ActivityCommonDefine_1.REDDOT_TOLERANCE,
            )),
            (i = this.i5e.IsItemInViewport(
              i[1],
              ActivityCommonDefine_1.REDDOT_TOLERANCE,
            )),
            this.XY_[0].SetUIActive(1 === t),
            this.XY_[1].SetUIActive(2 === i))
          : (this.XY_[0].SetUIActive(!1), this.XY_[1].SetUIActive(!1));
      }),
      (this.CLn = (t) => {
        t.length <= 0 ||
          (this.lqe.SetCurrencyItemVisible(!0),
          this.lqe.SetCurrencyItemList(t).catch(() => {}));
      }),
      (this.cMl = (t) => {
        this.UiBlurBehaviour?.ChangeNeedBlurState(t);
      }),
      (this.p5e = (t) => {
        t &&
          (t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)) &&
          t.CheckIfInShowTime() &&
          (this.qel.set(t.TimeType, t.Id),
          t.TimeType !== this.n5e
            ? this.Oel(t.TimeType, !0)
            : this.v5e(this.n5e, !0));
      }),
      (this.M5e = (t) => {
        this.k4e === t && this.s5e?.RefreshView();
      }),
      (this.OnActivityUpdate = () => {
        var t = () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ResetToBattleView,
            );
          },
          i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
        i.FunctionMap.set(1, t),
          i.FunctionMap.set(0, t),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.E5e = (t) => {
        this.s5e?.PlaySubViewSequence(t);
      }),
      (this.u5e = (t, i = 0, e) => {
        (this.PRn = ActivityCommonDefine_1.activityViewStateSequence[i]),
          t !== this.e5e &&
            ((this.e5e = t),
            this.UiViewSequence.PlaySequence(t ? this.PRn[0] : this.PRn[1], e),
            this.s5e?.OnCommonViewStateChange(t)),
          this.RefreshTabIcon();
      });
  }
  get k4e() {
    return this.qel.get(this.n5e ?? 0);
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
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIText],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [8, this._5e],
        [14, this.NY_],
        [15, this.VY_],
      ]);
  }
  OnAddEventListener() {
    this.S5e(),
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeActivityViewNeedBlurState,
        this.cMl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.jY_,
      );
  }
  OnRemoveEventListener() {
    this.y5e(),
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeActivityViewNeedBlurState,
        this.cMl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.jY_,
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
    var t = [];
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpCallBack(this.XOe),
      this.lqe.SetCloseCallBack(this.$Oe),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.o5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(0)),
      t.push(this.o5e.CreateByActorAsync(this.GetItem(3).GetOwner())),
      this.AddChild(this.o5e),
      this.o5e.BindOnToggleFunction(this.c5e),
      this.o5e.BindOnCanToggleExecuteChange(this.d5e),
      (this.r5e = new ActivitySwitchToggle_1.ActivitySwitchToggle(1)),
      t.push(this.r5e.CreateByActorAsync(this.GetItem(4).GetOwner())),
      this.AddChild(this.r5e),
      this.r5e.BindOnToggleFunction(this.c5e),
      this.r5e.BindOnCanToggleExecuteChange(this.d5e),
      (this.bel = new ActivityTipsButton_1.ActivityTipsButton()),
      t.push(this.bel.CreateByActorAsync(this.GetItem(10).GetOwner())),
      await Promise.all(t);
  }
  OnStart() {
    var [t, i] = this.OpenParam ?? [4, 0],
      t =
        (ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(
          t,
        ),
        (this.PRn = ActivityCommonDefine_1.activityViewStateSequence[0]),
        this.lqe.SetTitleLocalText("Activity_Title"),
        this.uxt(),
        ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities());
    let e = void 0;
    var s = [],
      h = [],
      n = [],
      r = [];
    for (const v of t)
      v.Id === i && (e = v),
        (0 === v.TimeType ? (h.push(v.Id), s) : (r.push(v.Id), n)).push(v);
    var [t, o] = [0 < s.length, 0 < n.length];
    (e = e || (t ? s : n)[0]),
      this.GetItem(9).SetUIActive(t && o),
      this.BindRedDotIds(h),
      this.BindRedDotIds(r),
      this.o5e.BindRedDotIds(h),
      this.r5e.BindRedDotIds(r),
      (this.XY_[0] = this.GetButton(14).RootUIComp),
      (this.XY_[1] = this.GetButton(15).RootUIComp),
      (this.h5e = 0 === e.TimeType ? s : n),
      this.qel.set(e.TimeType, e.Id),
      this.Oel(e.TimeType, !1),
      this.m5e(e.TimeType, !1);
  }
  OnBeforeShow() {
    for (const t of this.h5e)
      if (!t.CheckIfInShowTime())
        return void ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(
          () => {
            this.OnActivityUpdate();
          },
        );
    this.BNe(),
      this.HY_(),
      this.i5e.BindScrollValueChange(this.$Y_),
      this.s5e?.RefreshView(),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableDLSSG(
        "CommonActivityView",
      );
  }
  async OnBeforeHideAsync() {
    await this.s5e?.BeforeHideSelfAsync(),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableDLSSG(
        "CommonActivityView",
      );
  }
  OnBeforeDestroy() {
    this.a5e.forEach((t, i) => {
      this.AddChild(t);
    }),
      this.i5e.UnBindScrollValueChange(),
      this.a5e.clear();
  }
  m5e(t, i = !0) {
    (0 === (this.n5e = t) ? this.r5e : this.o5e).SetToggleState(!1, !1),
      this.GetItem(11).SetUIActive(!1),
      this.GetItem(12).SetUIActive(!1),
      this.XY_[0]?.SetUIActive(!1),
      this.XY_[1]?.SetUIActive(!1),
      this.v5e(t, !1).finally(() => {
        this.SPe.PlayLevelSequenceByName(i ? "SwitchModel" : "SwitchList", !0),
          this.GetItem(11).SetUIActive(!0),
          this.GetItem(12).SetUIActive(!0),
          this.HY_();
      });
  }
  Oel(t, i) {
    (0 === t ? this.o5e : this.r5e).SetToggleState(!0, i);
  }
  async Gel(t, i) {
    t.Id !== this.k4e &&
      this.i5e.GetScrollItemByKey(this.k4e)?.SetToggleState(!1, !1),
      this.qel.set(this.n5e, t.Id),
      t.NeedSelfControlFirstRedPoint() ||
        ControllerHolder_1.ControllerHolder.ActivityController.RequestReadActivity(
          t,
        ),
      await this.f5e(i);
  }
  S5e() {}
  y5e() {}
  BindRedDotIds(t) {
    for (const i of t) this.BNe(i);
  }
  BNe(t) {
    if (t) {
      var i =
        ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(t);
      this.Nel.set(t, i);
    } else
      for (const s of this.h5e) {
        var e =
          ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(
            s.Id,
          );
        this.Nel.set(s.Id, e);
      }
  }
  HY_() {
    var i = [];
    for (let t = 0; t < this.h5e.length; t++) {
      var e = this.h5e[t].Id;
      this.Nel.get(e) && i.push(t);
    }
    this.FY_ =
      i.length <= 0
        ? [void 0, void 0]
        : [
            this.i5e.GetItemByIndex(i[0]),
            this.i5e.GetItemByIndex(i[i.length - 1]),
          ];
  }
  async v5e(i, t) {
    var e =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    (this.h5e = e.filter((t) => t.TimeType === i)),
      await this.i5e.RefreshByDataAsync(this.h5e);
    let s = 0;
    for (let t = 0; t < this.h5e.length; t++)
      if (this.k4e === this.h5e[t].Id) {
        s = t;
        break;
      }
    e = this.i5e.GetScrollItemByIndex(s);
    e &&
      (this.i5e.LateScrollTo(e.GetRootItem()),
      e.SetToggleState(!0, !1),
      await this.Gel(this.h5e[s], t));
  }
  async f5e(t) {
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.k4e);
    this.D5e(i), await this.R5e(i, t);
  }
  D5e(t) {
    var i = t.GetTitle();
    (this.t5e = t.GetHelpId()),
      this.lqe.SetHelpBtnActive(0 !== this.t5e),
      this.lqe.SetTitle(i.replace(/<.*?>/g, "")),
      this.bel.SetActive(t.LocalConfig.ShowPermanentTips),
      this.RefreshTabIcon();
  }
  async WNe(t) {
    const i = new CustomPromise_1.CustomPromise();
    var e = this.GetTexture(7),
      t = (e.SetUIActive(!1), t.BgTexturePath);
    this.SetTextureByPath(t, e, void 0, () => {
      i.SetResult();
    }),
      await i.Promise;
  }
  async R5e(t, i) {
    let e = this.a5e.get(t);
    if (!e) {
      var s = ActivityManager_1.ActivityManager.GetActivityController(t.Type),
        h = this.GetItem(5),
        n = s.GetActivityResource(t);
      if (!(e = s.CreateSubPageComponent(t))) return;
      e.SetData(t), await e.CreateByPathAsync(n, h), this.a5e.set(t, e);
    }
    this.k4e === t.Id &&
      (await this.WNe(t),
      this.s5e?.SetActive(!1),
      this.lqe.SetCurrencyItemVisible(!1),
      (this.s5e = e),
      await this.s5e.BeforeShowSelfAsync(),
      this.s5e.RefreshView(),
      this.GetTexture(7).SetUIActive(!0),
      this.s5e.SetActive(!0),
      i &&
        (this.UiViewSequence.HasSequenceNameInPlaying("Switch")
          ? this.UiViewSequence.ReplaySequence("Switch")
          : this.UiViewSequence.PlaySequence("Switch")),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSelectActivityAndSubViewReady,
        this.k4e,
      ));
  }
  RefreshTabIcon() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        this.k4e,
      ).LocalConfig,
      t = this.e5e ? t.TabResource : t.TabResource2;
    t && this.lqe.SetTitleIcon(t);
  }
  uxt() {
    var t = this.GetText(13);
    GlobalData_1.GlobalData.IsPlayInEditor
      ? t.SetUIActive(!0)
      : t.SetUIActive(!1);
  }
  W6l(t) {
    this.GetText(13).SetText("DebugId: " + t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (void 0 !== this.s5e)
      return this.s5e.GetGuideUiItemAndUiItemForShowEx(t);
  }
}
exports.CommonActivityView = CommonActivityView;
//# sourceMappingURL=CommonActivityView.js.map
