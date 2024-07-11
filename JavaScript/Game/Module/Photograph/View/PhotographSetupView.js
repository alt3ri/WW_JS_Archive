"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographSetupView = void 0);
const UE = require("ue"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController"),
  PhotographExpressionItem_1 = require("./PhotographExpressionItem"),
  PhotographOptionSetup_1 = require("./PhotographOptionSetup"),
  PhotographValueSetup_1 = require("./PhotographValueSetup");
class PhotographSetupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.qKi = new Set()),
      (this.GKi = new Map()),
      (this.PhotoSetupMode = void 0),
      (this.NKi = void 0),
      (this.OKi = void 0),
      (this.kKi = new Map()),
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
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.HKi],
        [1, this.oHe],
        [2, this.jKi],
        [7, this.Vgt],
      ]);
  }
  async OnBeforeStartAsync() {
    this.tQi(), await this.iQi(), await this.oQi(), await this.rQi();
  }
  OnStart() {
    this.nQi(this.OpenParam ?? 1, !0, !0), this.eQi();
  }
  OnBeforeDestroy() {
    this.sQi(), this.aQi(), this.hQi(), this.FKi.clear(), (this.FKi = void 0);
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
  tQi() {
    var t = this.GetExtendToggle(0),
      i = this.GetExtendToggle(1),
      e = this.GetExtendToggle(2);
    i?.RootUIComp.SetUIActive(!1),
      e?.RootUIComp.SetUIActive(!1),
      this.FKi.set(1, t),
      this.FKi.set(0, i),
      this.FKi.set(2, e);
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
      this.cQi(2 === t);
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
      var i = this.GetItem(4);
      i.SetUIActive(!0);
      for await (const e of t) 1 === e.MotionType && (await this.mQi(e.Id));
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
  }
  QKi(t) {
    this.NKi && this.NKi.SetSelected(!1);
    var i = t.GetPhotoMontageId(),
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    PhotographController_1.PhotographController.PlayPhotoMontage(e, i),
      (this.NKi = t),
      this.NKi.SetSelected(!0);
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
    var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          0,
        ).GetRoleId(),
      t =
        (await this.dQi(),
        ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
            t,
          ),
        ));
    if (t) {
      t.sort((t, i) => t.Sort - i.Sort);
      var i = this.GetItem(4);
      i.SetUIActive(!0);
      for await (const e of t) 0 === e.MotionType && (await this.CQi(e.Id));
      i.SetUIActive(!1),
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
      this.OKi.SetSelected(!0);
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
      e = this.GetItem(6);
    i.SetUIActive(!0), e.SetUIActive(!0);
    for await (const s of t) await this.gQi(s.ValueType, s.Type);
    i.SetUIActive(!1), e.SetUIActive(!1);
  }
  async gQi(t, i) {
    var e = this.GetItem(3);
    let s = void 0;
    switch (i) {
      case 0:
        var o = this.GetItem(5),
          o = LguiUtil_1.LguiUtil.DuplicateActor(o.GetOwner(), e);
        await (s =
          new PhotographOptionSetup_1.PhotographOptionSetup()).CreateThenShowByActorAsync(
          o,
        ),
          s.Initialize(t),
          s.BindOnIndexChanged(this.zKi);
        break;
      case 1:
        (o = this.GetItem(6)),
          (o = LguiUtil_1.LguiUtil.DuplicateActor(o.GetOwner(), e));
        await (s =
          new PhotographValueSetup_1.PhotographValueSetup()).CreateThenShowByActorAsync(
          o,
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
    for (const h of this.kKi.values()) h.SetEnable(!0);
    var t,
      i,
      e = ModelManager_1.ModelManager.PhotographModel.GetAllPhotographOption(),
      s = ConfigManager_1.ConfigManager.PhotographConfig;
    for ([t, i] of e) {
      var o = s.GetPhotoSetupConfig(t);
      if (0 === o.Type) {
        o = o.SubOptions.get(i);
        if (o) for (const a of o.ArrayInt) this.fQi(a).SetEnable(!1);
      }
    }
  }
}
exports.PhotographSetupView = PhotographSetupView;
//# sourceMappingURL=PhotographSetupView.js.map
