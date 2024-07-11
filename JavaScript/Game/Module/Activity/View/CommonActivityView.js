"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonActivityView = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../Help/HelpController");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ActivityCommonDefine_1 = require("../ActivityCommonDefine");
const ActivityManager_1 = require("../ActivityManager");
const ActivityModel_1 = require("../ActivityModel");
const ActivityPageSelectContent_1 = require("./SubView/ActivityPageSelectContent");
const ActivitySwitchToggle_1 = require("./SubView/ActivitySwitchToggle");
class CommonActivityView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.N3e = !0),
      (this.lqe = void 0),
      (this.O3e = 0),
      (this.k3e = void 0),
      (this.F3e = void 0),
      (this.V3e = void 0),
      (this.H3e = void 0),
      (this.j3e = void 0),
      (this.W3e = new Map()),
      (this.K3e = []),
      (this.Q3e = !0),
      (this.LLn = []),
      (this.X3e = () => {
        this.$3e(!0);
      }),
      (this.XOe = () => {
        HelpController_1.HelpController.OpenHelpById(this.O3e);
      }),
      (this.$Oe = () => {
        this.CloseMe();
      }),
      (this.Y3e = (t, e) => {
        e && this.J3e(t);
      }),
      (this.z3e = (t, e) => this.H3e !== t),
      (this.Z3e = () => {
        return new ActivityPageSelectContent_1.ActivityPageSelectContent();
      }),
      (this.YIn = (t) => {
        t.length <= 0 ||
          (this.lqe.SetCurrencyItemVisible(!0),
          this.lqe.SetCurrencyItemList(t).catch(() => {}));
      }),
      (this.e4e = () => {
        this.t4e();
      }),
      (this.i4e = () => {
        this.o4e();
      }),
      (this.r4e = (t) => {
        ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
          ?.Id === t && this.j3e?.RefreshView();
      }),
      (this.OnActivityUpdate = () => {
        const t = () => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ResetToBattleView,
          );
        };
        const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
        e.FunctionMap.set(1, t),
          e.FunctionMap.set(0, t),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.n4e = (t) => {
        this.j3e?.PlaySubViewSequence(t);
      }),
      (this.$3e = (t, e, i) => {
        e && (this.LLn = ActivityCommonDefine_1.activityViewStateSequence[e]),
          t !== this.N3e &&
            ((this.N3e = t),
            this.UiViewSequence.PlaySequence(t ? this.LLn[0] : this.LLn[1], i),
            this.j3e?.OnCommonViewStateChange(t)),
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
      (this.BtnBindInfo = [[8, this.X3e]]);
  }
  OnAddEventListener() {
    this.s4e(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectActivity,
        this.e4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityViewChange,
        this.i4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.r4e,
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
        this.n4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetActivityViewState,
        this.$3e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        this.YIn,
      );
  }
  OnRemoveEventListener() {
    this.a4e(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectActivity,
        this.e4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityViewChange,
        this.i4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActivityViewRefreshCurrent,
        this.r4e,
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
        this.n4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetActivityViewState,
        this.$3e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetActivityViewCurrency,
        this.YIn,
      );
  }
  async OnBeforeStartAsync() {
    this.h4e(), await this.l4e();
  }
  h4e() {
    const t = this.GetScrollViewWithScrollbar(1);
    this.k3e = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.Z3e);
  }
  async l4e() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetHelpCallBack(this.XOe),
      this.lqe.SetCloseCallBack(this.$Oe),
      (this.F3e = new ActivitySwitchToggle_1.ActivitySwitchToggle(0)),
      await this.F3e.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.F3e.BindOnToggleFunction(this.Y3e),
      this.F3e.BindOnCanToggleExecuteChange(this.z3e),
      (this.V3e = new ActivitySwitchToggle_1.ActivitySwitchToggle(1)),
      await this.V3e.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.V3e.BindOnToggleFunction(this.Y3e),
      this.V3e.BindOnCanToggleExecuteChange(this.z3e);
  }
  OnStart() {
    const t = this.OpenParam ?? 4;
    ModelManager_1.ModelManager.ActivityModel.SendActivityViewOpenLogData(t),
      (this.LLn = ActivityCommonDefine_1.activityViewStateSequence[0]),
      this.lqe.SetTitleLocalText("Activity_Title"),
      this.F3e.SetUiActive(!0),
      this.V3e.SetUiActive(!1);
  }
  OnBeforeShow() {
    this.Q3e && (this.F3e.SetToggleState(!0, !0), (this.Q3e = !1));
    for (const t of this.K3e)
      if (!t.CheckIfInShowTime())
        return void ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().finally(
          () => {
            this.OnActivityUpdate();
          },
        );
    this.j3e?.RefreshView();
  }
  async OnBeforeHideAsync() {
    await this.j3e?.BeforeHideSelfAsync();
  }
  OnBeforeDestroy() {
    this.W3e.forEach((t, e) => {
      this.AddChild(t);
    }),
      this.W3e.clear();
  }
  J3e(t) {
    ((this.H3e = t) === 0 ? this.V3e : this.F3e).SetToggleState(!1, !1),
      this.o4e(t);
  }
  _4e(t) {
    t = this.k3e.GetScrollItemByIndex(t);
    t && (this.k3e.ScrollTo(t.GetRootItem()), t.SetToggleState(!0, !0));
  }
  s4e() {
    RedDotController_1.RedDotController.BindRedDot(
      "ActivityEntrance",
      this.F3e.GetToggleRedDot(),
    );
  }
  a4e() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "ActivityEntrance",
      this.F3e.GetToggleRedDot(),
    );
  }
  o4e(t = 0) {
    const s =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities();
    s.sort(ActivityModel_1.ActivityModel.SortFunc),
      (this.K3e = s),
      this.k3e.RefreshByData(s, () => {
        const e =
          ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId();
        let i = 0;
        for (let t = 0; t < s.length; t++)
          if (e === s[t].Id) {
            i = t;
            break;
          }
        ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(0),
          this._4e(i);
      });
  }
  t4e() {
    const t =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity();
    this.u4e(t), this.c4e(t);
  }
  u4e(t) {
    const e = t.GetTitle();
    (this.O3e = t.GetHelpId()),
      this.lqe.SetHelpBtnActive(this.O3e !== 0),
      this.lqe.SetTitle(e.replace(/<.*?>/g, "")),
      this.RefreshTabIcon();
  }
  async WNe(t) {
    const e = new CustomPromise_1.CustomPromise();
    const i = this.GetTexture(7);
    var t = t.LocalConfig.BgResource;
    this.SetTextureByPath(t, i, void 0, () => {
      e.SetResult();
    }),
      await e.Promise;
  }
  async c4e(t) {
    let e = this.W3e.get(t);
    if (!e) {
      const i = ActivityManager_1.ActivityManager.GetActivityController(t.Type);
      const s = this.GetItem(5);
      const n = i.GetActivityResource(t);
      if (!(e = i.CreateSubPageComponent(t))) return;
      e.SetData(t), await e.CreateByPathAsync(n, s), this.W3e.set(t, e);
    }
    ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivityId() ===
      t.Id &&
      (await this.WNe(t),
      this.j3e?.SetActive(!1),
      this.lqe.SetCurrencyItemVisible(!1),
      (this.j3e = e),
      await this.j3e.BeforeShowSelfAsync(),
      this.j3e.SetActive(!0),
      this.j3e.RefreshView(),
      this.UiViewSequence.HasSequenceNameInPlaying("Switch")
        ? this.UiViewSequence.ReplaySequence("Switch")
        : this.UiViewSequence.PlaySequence("Switch"));
  }
  RefreshTabIcon() {
    var t =
      ModelManager_1.ModelManager.ActivityModel.GetCurrentSelectActivity()
        .LocalConfig;
    var t = this.N3e ? t.TabResource : t.TabResource2;
    t && this.lqe.SetTitleIcon(t);
  }
}
exports.CommonActivityView = CommonActivityView;
// # sourceMappingURL=CommonActivityView.js.map
