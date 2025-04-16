"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographSetupView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController"),
  PhotographDefine_1 = require("../PhotographDefine"),
  PhotoFilterItem_1 = require("./PhotoFilterItem"),
  PhotoFilterToggleItem_1 = require("./PhotoFilterToggleItem"),
  PhotographExpressionItem_1 = require("./PhotographExpressionItem"),
  PhotographOptionSetup_1 = require("./PhotographOptionSetup"),
  PhotographTab_1 = require("./PhotographTab"),
  PhotographValueSetup_1 = require("./PhotographValueSetup");
class PhotographSetupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qKi = new Set()),
      (this.GKi = new Map()),
      (this.M1_ = new Map()),
      (this.E1_ = void 0),
      (this.c4_ = void 0),
      (this.PhotoSetupMode = void 0),
      (this.NKi = void 0),
      (this.OKi = void 0),
      (this.I1_ = void 0),
      (this.UiScrollView = void 0),
      (this.kKi = new Map()),
      (this.Xva = void 0),
      (this.FKi = new Map()),
      (this.Vgt = () => {
        this.CloseMe();
      }),
      (this.oHe = () => {
        this.VKi(0);
      }),
      (this.HKi = () => {
        this.VKi(1);
      }),
      (this.jKi = () => {
        this.VKi(2);
      }),
      (this.T1_ = () => {
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint,
          !0,
        ) &&
          (LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint,
            !1,
          ),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotFilter),
          this.c4_?.RefreshRedDot()),
          this.VKi(3);
      }),
      (this.apc = (i) => {
        this.UiScrollView.OnLateUpdate.Bind((t) => {
          TimerSystem_1.TimerSystem.Next(() => {
            var t = (0, puerts_1.$ref)(
              new UE.Vector2D(this.UiScrollView.ContentUIItem.RelativeLocation),
            );
            this.UiScrollView.StopMovement(),
              this.UiScrollView.ScrollToBottom(t, i.GetRootItem());
          }),
            this.UiScrollView?.IsValid() &&
              this.UiScrollView.OnLateUpdate.Unbind();
        });
      }),
      (this.WKi = () => {
        var t = this.GKi.get(0);
        t &&
          (this.OKi?.SetSelected(!1), (this.OKi = t), this.OKi.SetSelected(!0));
      }),
      (this.KKi = (t, i) => {
        i ? this.QKi(t) : this.XKi(t);
      }),
      (this.TKi = (t) => this.OKi !== t),
      (this.$Ki = (t, i) => {
        i ? this.YKi(t) : this.JKi(t);
      }),
      (this.zKi = (t) => {
        this.ZKi(), this.eQi();
      }),
      (this.b1_ = (t, i = !1) => {
        for (const h of this.M1_.values()) {
          var e;
          t
            ? (h.ShowFilterItem(),
              (e =
                ModelManager_1.ModelManager.PhotographModel.GetPhotographFilter()),
              h.GetPhotoFilterId() === e && (this.I1_ = h))
            : h.PlayDisappearSequence(i);
        }
        var s;
        t && i && this.Xva?.Play("SwitchIn"),
          t &&
            !this.I1_ &&
            (s = this.M1_.get(PhotographDefine_1.DEFAULT_FILTER_CONFIGID)) &&
            (ModelManager_1.ModelManager.PhotographModel?.SetPhotographFilter(
              s.GetPhotoFilterId(),
            ),
            (this.I1_ = s));
      }),
      (this.A1_ = (t, i) => {
        i && this.L1_(t);
      }),
      (this.S1_ = () => {
        this.I1_ &&
          (this.I1_.SetSelected(!1),
          (this.I1_ = void 0),
          ModelManager_1.ModelManager.PhotographModel.ClearSelectedPhotographFilter());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [9, UE.UIExtendToggle],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [10, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.HKi],
        [1, this.oHe],
        [2, this.jKi],
        [9, this.T1_],
        [7, this.Vgt],
      ]);
  }
  async OnBeforeStartAsync() {
    this.tQi(),
      await this.iQi(),
      await this.oQi(),
      await this.rQi(),
      await this.R1_();
  }
  OnStart() {
    (this.Xva = this.GetItem(3)
      .GetOwner()
      .GetComponentByClass(UE.UIInturnAnimController.StaticClass())),
      this.nQi(this.OpenParam ?? 1, !0, !0),
      this.eQi(),
      (this.UiScrollView = this.GetScrollViewWithScrollbar(12));
  }
  OnBeforeDestroy() {
    this.sQi(),
      this.aQi(),
      this.hQi(),
      this.P1_(),
      this.FKi.clear(),
      (this.FKi = void 0),
      this.c4_.Destroy(),
      this.E1_.Destroy();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
      !0,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged,
      !1,
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnResetPhotographCamera,
      this.WKi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnResetPhotographCamera,
      this.WKi,
    );
  }
  SetPanelVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  tQi() {
    var t = this.GetExtendToggle(0),
      i = this.GetExtendToggle(1),
      e = this.GetExtendToggle(2),
      s = this.GetExtendToggle(9);
    i?.RootUIComp.SetUIActive(!1),
      e?.RootUIComp.SetUIActive(!1),
      this.GetItem(10).SetUIActive(!1),
      this.FKi.set(1, t),
      this.FKi.set(0, i),
      this.FKi.set(2, e),
      this.FKi.set(3, s);
  }
  VKi(e) {
    this.FKi.forEach((t, i) => {
      i !== e && t.SetToggleStateForce(0, !1);
    }),
      this.lQi(e);
  }
  nQi(t, i, e = !1) {
    (i = i ? 1 : 0), (t = this.FKi.get(t));
    t && t.SetToggleStateForce(i, e);
  }
  lQi(t) {
    (this.PhotoSetupMode = t),
      this._Qi(1 === t),
      this.uQi(0 === t),
      this.cQi(2 === t),
      this.w1_(3 === t);
  }
  async iQi() {
    var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          0,
        ).GetRoleId(),
      t = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
          t,
        ),
      );
    if (t) {
      t.sort((t, i) => t.Sort - i.Sort);
      var i = this.GetItem(4),
        e = (i.SetUIActive(!0), []);
      for (const s of t) 1 === s.MotionType && e.push(this.mQi(s.Id));
      await Promise.all(e),
        i.SetUIActive(!1),
        0 !== this.qKi.size && this.FKi.get(0)?.RootUIComp.SetUIActive(!0);
    }
  }
  async mQi(t) {
    var i = this.GetItem(3),
      e = this.GetItem(4),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e),
      i.Refresh(t),
      i.BindOnSelected(this.KKi),
      this.qKi.add(i);
  }
  aQi() {
    for (const t of this.qKi) t.Destroy();
    this.qKi.clear(), (this.NKi = void 0);
  }
  uQi(t) {
    for (const i of this.qKi) i.SetActive(t);
    this.Xva?.Play("Start03");
  }
  QKi(t) {
    this.NKi && this.NKi.SetSelected(!1);
    var i = t.GetPhotoMontageId(),
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    PhotographController_1.PhotographController.PlayPhotoMontage(e, i),
      (this.NKi = t),
      this.NKi.SetSelected(!0),
      this.apc(this.NKi);
  }
  XKi(t) {
    this.NKi === t &&
      (PhotographController_1.PhotographController.ResetPhotoMontage(),
      (this.NKi = void 0));
  }
  eQi() {
    var t = ModelManager_1.ModelManager.PhotographModel.MontageId,
      t = this.GKi.get(t);
    this.OKi !== t &&
      (this.OKi && this.OKi.SetSelected(!1),
      (this.OKi = t),
      this.OKi?.SetSelected(!0));
  }
  async rQi() {
    var t = [],
      i =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          0,
        ).GetRoleId(),
      i =
        (t.push(this.dQi()),
        ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
            i,
          ),
        ));
    if (i) {
      i.sort((t, i) => t.Sort - i.Sort);
      var e = this.GetItem(4);
      e.SetUIActive(!0);
      for (const s of i) 0 === s.MotionType && t.push(this.CQi(s.Id));
      await Promise.all(t),
        e.SetUIActive(!1),
        0 !== this.GKi.size && this.FKi.get(2)?.RootUIComp.SetUIActive(!0);
    }
  }
  async dQi() {
    var t = new PhotographExpressionItem_1.PhotographExpressionItem();
    await t.CreateByActorAsync(this.GetItem(8).GetOwner()),
      t.Refresh(0),
      t.BindOnSelected(this.$Ki),
      t.BindOnCanExecuteChange(this.TKi),
      t.SetUiActive(!1),
      this.GKi.set(0, t);
  }
  async CQi(t) {
    var i = this.GetItem(3),
      e = this.GetItem(4),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e),
      i.Refresh(t),
      i.BindOnSelected(this.$Ki),
      i.BindOnCanExecuteChange(this.TKi),
      this.GKi.set(t, i);
  }
  cQi(t) {
    for (const i of this.GKi.values()) i.SetActive(t);
  }
  sQi() {
    for (const t of this.GKi.values()) t.Destroy();
    this.GKi.clear(), (this.OKi = void 0);
  }
  YKi(t) {
    this.OKi && this.OKi.SetSelected(!1);
    var i,
      e = t.GetPhotoMontageId();
    0 === e
      ? PhotographController_1.PhotographController.ResetPhotoMontage()
      : ((i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
        PhotographController_1.PhotographController.PlayPhotoMontage(i, e)),
      (this.OKi = t),
      this.OKi.SetSelected(!0),
      this.apc(this.OKi);
  }
  JKi(t) {
    this.OKi === t &&
      (PhotographController_1.PhotographController.ResetPhotoMontage(),
      (this.OKi = void 0));
  }
  async oQi() {
    var t =
        ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig(),
      i = this.GetItem(5),
      e = this.GetItem(6),
      s = (i.SetUIActive(!0), e.SetUIActive(!0), []);
    for (const h of t) s.push(this.gQi(h.ValueType, h.Type));
    await Promise.all(s), i.SetUIActive(!1), e.SetUIActive(!1);
  }
  async gQi(t, i) {
    var e = this.GetItem(3);
    let s = void 0;
    switch (i) {
      case 0:
        var h = this.GetItem(5),
          h = LguiUtil_1.LguiUtil.DuplicateActor(h.GetOwner(), e);
        await (s =
          new PhotographOptionSetup_1.PhotographOptionSetup()).CreateThenShowByActorAsync(
          h,
        ),
          s.Initialize(t),
          s.BindOnIndexChanged(this.zKi);
        break;
      case 1:
        (h = this.GetItem(6)),
          (h = LguiUtil_1.LguiUtil.DuplicateActor(h.GetOwner(), e));
        await (s =
          new PhotographValueSetup_1.PhotographValueSetup()).CreateThenShowByActorAsync(
          h,
        ),
          s.Initialize(t);
    }
    this.kKi.set(t, s);
  }
  fQi(t) {
    return this.kKi.get(t);
  }
  hQi() {
    for (const t of this.kKi.values()) t.Destroy();
    this.kKi.clear();
  }
  _Qi(t) {
    for (const i of this.kKi.values()) i.SetActive(t);
    t && this.ZKi();
  }
  ZKi() {
    for (const o of this.kKi.values()) o.SetEnable(!0);
    var t,
      i,
      e = ModelManager_1.ModelManager.PhotographModel.GetAllPhotographOption(),
      s = ConfigManager_1.ConfigManager.PhotographConfig;
    for ([t, i] of e) {
      var h = s.GetPhotoSetupConfig(t);
      if (0 === h.Type) {
        h = h.SubOptions.get(i);
        if (h) for (const r of h.ArrayInt) this.fQi(r).SetEnable(!1);
      }
    }
  }
  async R1_() {
    var t = [],
      i =
        ((this.c4_ = new PhotographTab_1.PhotographTab()),
        t.push(
          this.c4_.CreateThenShowByActorAsync(
            this.GetExtendToggle(9).GetOwner(),
          ),
        ),
        this.GetItem(3)),
      e = this.GetItem(5),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotoFilterToggleItem_1.PhotoFilterToggleItem(),
      e =
        (t.push(i.CreateThenShowByActorAsync(e)),
        i.Initialize(),
        i.BindSetSubOptionVisible(this.b1_),
        i.BindDeselectOnFilterItem(this.S1_),
        (this.E1_ = i),
        ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoFilterConfig());
    for (const s of e) t.push(this.U1_(s.Id));
    await Promise.all(t);
  }
  async U1_(t) {
    var i = this.GetItem(3),
      e = this.GetItem(10),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotoFilterItem_1.PhotoFilterItem();
    await i.CreateByActorAsync(e),
      i.Refresh(t),
      i.BindOnSelected(this.A1_),
      i.BindScrollToSelectedItem(this.apc),
      this.M1_.set(t, i);
  }
  P1_() {
    for (const t of this.M1_.values()) t.Destroy();
    this.M1_.clear(), (this.I1_ = void 0);
  }
  w1_(t) {
    this.E1_.SetActive(t), t ? this.Xva?.Play("Start02") : this.b1_(!1);
  }
  L1_(t) {
    this.I1_ && this.I1_.SetSelected(!1),
      (this.I1_ = t),
      this.I1_.SetSelected(!0),
      this.apc(this.I1_);
  }
}
exports.PhotographSetupView = PhotographSetupView;
//# sourceMappingURL=PhotographSetupView.js.map
