"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographSetupView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhotographController_1 = require("../PhotographController"),
  PhotographExpressionItem_1 = require("./PhotographExpressionItem"),
  PhotographOptionSetup_1 = require("./PhotographOptionSetup"),
  PhotographValueSetup_1 = require("./PhotographValueSetup"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
class PhotographSetupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NWi = new Set()),
      (this.OWi = new Map()),
      (this.PhotoSetupMode = void 0),
      (this.kWi = void 0),
      (this.FWi = void 0),
      (this.VWi = new Map()),
      (this.HWi = new Map()),
      (this.ACt = () => {
        this.CloseMe();
      }),
      (this.H9e = () => {
        this.jWi(0);
      }),
      (this.WWi = () => {
        this.jWi(1);
      }),
      (this.KWi = () => {
        this.jWi(2);
      }),
      (this.QWi = () => {
        var t = this.OWi.get(0);
        t &&
          (this.FWi?.SetSelected(!1), (this.FWi = t), this.FWi.SetSelected(!0));
      }),
      (this.XWi = (t, i) => {
        i ? this.$Wi(t) : this.YWi(t);
      }),
      (this.DWi = (t) => this.FWi !== t),
      (this.JWi = (t, i) => {
        i ? this.zWi(t) : this.ZWi(t);
      }),
      (this.eKi = (t) => {
        this.tKi(), this.iKi();
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
        [0, this.WWi],
        [1, this.H9e],
        [2, this.KWi],
        [7, this.ACt],
      ]);
  }
  async OnBeforeStartAsync() {
    this.oKi(), await this.rKi(), await this.nKi(), await this.sKi();
  }
  OnStart() {
    this.aKi(this.OpenParam ?? 1, !0, !0), this.iKi();
  }
  OnBeforeDestroy() {
    this.hKi(), this.lKi(), this._Ki(), this.HWi.clear(), (this.HWi = void 0);
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
      this.QWi,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnResetPhotographCamera,
      this.QWi,
    );
  }
  oKi() {
    var t = this.GetExtendToggle(0),
      i = this.GetExtendToggle(1),
      e = this.GetExtendToggle(2);
    i?.RootUIComp.SetUIActive(!1),
      e?.RootUIComp.SetUIActive(!1),
      this.HWi.set(1, t),
      this.HWi.set(0, i),
      this.HWi.set(2, e);
  }
  jWi(e) {
    this.HWi.forEach((t, i) => {
      i !== e && t.SetToggleStateForce(0, !1);
    }),
      this.uKi(e);
  }
  aKi(t, i, e = !1) {
    (i = i ? 1 : 0), (t = this.HWi.get(t));
    t && t.SetToggleStateForce(i, e);
  }
  uKi(t) {
    (this.PhotoSetupMode = t),
      this.cKi(1 === t),
      this.mKi(0 === t),
      this.dKi(2 === t);
  }
  async rKi() {
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
      for await (const e of t) 1 === e.MotionType && (await this.CKi(e.Id));
      i.SetUIActive(!1),
        0 !== this.NWi.size && this.HWi.get(0)?.RootUIComp.SetUIActive(!0);
    }
  }
  async CKi(t) {
    var i = this.GetItem(3),
      e = this.GetItem(4),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e),
      i.Refresh(t),
      i.BindOnSelected(this.XWi),
      this.NWi.add(i);
  }
  lKi() {
    for (const t of this.NWi) t.Destroy();
    this.NWi.clear(), (this.kWi = void 0);
  }
  mKi(t) {
    for (const i of this.NWi) i.SetActive(t);
  }
  $Wi(t) {
    this.kWi && this.kWi.SetSelected(!1);
    var i = t.GetPhotoMontageId(),
      e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    PhotographController_1.PhotographController.PlayPhotoMontage(e, i),
      (this.kWi = t),
      this.kWi.SetSelected(!0);
  }
  YWi(t) {
    this.kWi === t &&
      (PhotographController_1.PhotographController.ResetPhotoMontage(),
      (this.kWi = void 0));
  }
  iKi() {
    var t = ModelManager_1.ModelManager.PhotographModel.MontageId,
      t = this.OWi.get(t);
    this.FWi !== t &&
      (this.FWi && this.FWi.SetSelected(!1),
      (this.FWi = t),
      this.FWi?.SetSelected(!0));
  }
  async sKi() {
    var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          0,
        ).GetRoleId(),
      t =
        (await this.gKi(),
        ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListByRoleId(
            t,
          ),
        ));
    if (t) {
      t.sort((t, i) => t.Sort - i.Sort);
      var i = this.GetItem(4);
      i.SetUIActive(!0);
      for await (const e of t) 0 === e.MotionType && (await this.fKi(e.Id));
      i.SetUIActive(!1),
        0 !== this.OWi.size && this.HWi.get(2)?.RootUIComp.SetUIActive(!0);
    }
  }
  async gKi() {
    var t = new PhotographExpressionItem_1.PhotographExpressionItem();
    await t.CreateByActorAsync(this.GetItem(8).GetOwner()),
      t.Refresh(0),
      t.BindOnSelected(this.JWi),
      t.BindOnCanExecuteChange(this.DWi),
      t.SetUiActive(!1),
      this.OWi.set(0, t);
  }
  async fKi(t) {
    var i = this.GetItem(3),
      e = this.GetItem(4),
      e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i),
      i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e),
      i.Refresh(t),
      i.BindOnSelected(this.JWi),
      i.BindOnCanExecuteChange(this.DWi),
      this.OWi.set(t, i);
  }
  dKi(t) {
    for (const i of this.OWi.values()) i.SetActive(t);
  }
  hKi() {
    for (const t of this.OWi.values()) t.Destroy();
    this.OWi.clear(), (this.FWi = void 0);
  }
  zWi(t) {
    this.FWi && this.FWi.SetSelected(!1);
    var i,
      e = t.GetPhotoMontageId();
    0 === e
      ? PhotographController_1.PhotographController.ResetPhotoMontage()
      : ((i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
        PhotographController_1.PhotographController.PlayPhotoMontage(i, e)),
      (this.FWi = t),
      this.FWi.SetSelected(!0);
  }
  ZWi(t) {
    this.FWi === t &&
      (PhotographController_1.PhotographController.ResetPhotoMontage(),
      (this.FWi = void 0));
  }
  async nKi() {
    var t =
        ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig(),
      i = this.GetItem(5),
      e = this.GetItem(6);
    i.SetUIActive(!0), e.SetUIActive(!0);
    for await (const s of t) await this.pKi(s.ValueType, s.Type);
    i.SetUIActive(!1), e.SetUIActive(!1);
  }
  async pKi(t, i) {
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
          s.BindOnIndexChanged(this.eKi);
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
    this.VWi.set(t, s);
  }
  vKi(t) {
    return this.VWi.get(t);
  }
  _Ki() {
    for (const t of this.VWi.values()) t.Destroy();
    this.VWi.clear();
  }
  cKi(t) {
    for (const i of this.VWi.values()) i.SetActive(t);
    t && this.tKi();
  }
  tKi() {
    for (const h of this.VWi.values()) h.SetEnable(!0);
    var t,
      i,
      e = ModelManager_1.ModelManager.PhotographModel.GetAllPhotographOption(),
      s = ConfigManager_1.ConfigManager.PhotographConfig;
    for ([t, i] of e) {
      var o = s.GetPhotoSetupConfig(t);
      if (0 === o.Type) {
        o = o.SubOptions.get(i);
        if (o) for (const a of o.ArrayInt) this.vKi(a).SetEnable(!1);
      }
    }
  }
}
exports.PhotographSetupView = PhotographSetupView;
//# sourceMappingURL=PhotographSetupView.js.map
