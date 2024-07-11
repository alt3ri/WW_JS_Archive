"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonBossStateView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleUiDefine_1 = require("../../BattleUiDefine"),
  BuffItem_1 = require("../BuffItem"),
  HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine"),
  RageBufferStateMachine_1 = require("../HeadState/RageBufferStateMachine"),
  VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
  BossStateViewBase_1 = require("./BossStateViewBase"),
  FallDownPercentMachine_1 = require("./FallDownPercentMachine");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
  FALL_DOWN_DISAPPEAR_PERCENT = 0.9,
  FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 10,
  SHOW_VIEW_ANIM_TIME = 667,
  CLOSE_VIEW_ANIM_TIME = 167,
  TOUGH_ANIM_TIME = 250,
  fallDownAttributeId = EAttributeId.Proto_ParalysisTime,
  fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
class CommonBossStateView extends BossStateViewBase_1.BossStateViewBase {
  constructor() {
    super(...arguments),
      (this.EPe = void 0),
      (this.jot = void 0),
      (this.Wot = void 0),
      (this.Kot = void 0),
      (this.Qot = -0),
      (this.Xot = 1),
      (this.$ot = 1),
      (this.Yot = !1),
      (this.Jot = new Map()),
      (this.zot = []),
      (this.Zot = []),
      (this.ert = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.trt = new FallDownPercentMachine_1.FallDownPercentMachine()),
      (this.irt = new RageBufferStateMachine_1.RageBufferStateMachine()),
      (this.ort = void 0),
      (this.rrt = -1),
      (this.nrt = -0),
      (this.srt = 0),
      (this.art = 0),
      (this.hrt = !1),
      (this.lrt = !1),
      (this._rt = !1),
      (this.urt = !0),
      (this.crt = !0),
      (this.mrt = !1),
      (this.drt = !1),
      (this.Crt = 0),
      (this.grt = 0),
      (this.frt = !1),
      (this.OnBossHeathChanged = (t, i, s) => {
        this.prt(!0);
      }),
      (this.OnBossMaxHealthChanged = (t, i, s) => {
        this.prt();
      }),
      (this.OnVulnerabilityActivated = (t, i) => {
        this.drt = i;
        var s = this.GetSprite(21);
        s.SetUIActive(i),
          this.drt
            ? (([i] = this.GetHpAndShieldPercent()),
              s.SetFillAmount(i),
              this.jot.Play())
            : this.jot.Stop();
      }),
      (this.OnLevelChanged = (t, i, s) => {
        this.vrt();
      }),
      (this.Mrt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "狂暴条刷新", ["visible", t]),
          this.GetItem(11).SetUIActive(t),
          t && this.GetItem(11).SetAlpha(1);
      }),
      (this.Srt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "播放狂暴条动画", ["visible", t]),
          t ? this.Ert(27) : this.Ert(30);
      }),
      (this.yrt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "停止狂暴条动画", ["visible", t]),
          t ? this.Irt(27) : this.Irt(30);
      }),
      (this.Trt = (t, i, s) => {
        var e;
        t <= i
          ? this.Lrt()
          : ((e = this.GetSprite(20)).SetUIActive(!0),
            e.SetStretchRight(this.art * (1 - t)),
            e.SetStretchLeft(this.art * i),
            s && this.Ert(28));
      }),
      (this.Drt = (t, i) => {
        var s;
        t <= i
          ? this.Rrt()
          : ((s = this.GetItem(22)).SetUIActive(!0),
            s.SetStretchRight(this.art * (1 - t)),
            s.SetStretchLeft(this.art * i),
            this.GetUiNiagara(23).ActivateSystem(!0),
            this.Ert(26));
      }),
      (this.Urt = () => {
        this.Ert(31);
      }),
      (this.Art = new Map()),
      (this.Prt = (t) => {
        t || this.Hide();
      }),
      (this.xrt = (t) => {
        t
          ? this.EPe.PlaySequencePurely("ShowView")
          : this.EPe.PlaySequencePurely("CloseView");
      }),
      (this.wrt = (t) => {
        this.EPe.StopCurrentSequence();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UIItem],
      [12, UE.UINiagara],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UISprite],
      [19, UE.UINiagara],
      [20, UE.UISprite],
      [21, UE.UISprite],
      [22, UE.UIItem],
      [23, UE.UINiagara],
      [24, UE.UINiagara],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIItem],
      [31, UE.UIItem],
    ]),
      (this.nrt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitEffectDuration",
        ));
  }
  OnStart() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Brt(),
      (this.Qot =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargeBufferPercent",
        ) / 1e4),
      (this.Wot = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.Wot.InitCallback(this.Prt, this.xrt, this.wrt),
      this.Wot.InitVisible(!1),
      (this.Kot = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.Kot.InitCallback(this.Mrt, this.Srt, this.yrt);
  }
  OnBeforeDestroy() {
    this.EPe.Clear(),
      (this.EPe = void 0),
      this.Wot.Reset(),
      (this.Wot = void 0),
      this.Kot.Reset(),
      (this.Kot = void 0);
  }
  OnActivate() {
    super.OnActivate(),
      (this.lrt = this.HasFallDownTag),
      (this.hrt = this.GetItem(11).bIsUIActive),
      (this.crt = this.GetItem(2).bIsUIActive),
      (this._rt = this.GetSprite(18).bIsUIActive),
      this.Kot.InitVisible(this.hrt),
      this.vrt(),
      this.brt(),
      this.qrt(),
      this.prt(),
      this.Grt(),
      this.Nrt(),
      this.Ort(),
      this.krt(),
      this.Frt(),
      this.Vrt(),
      this.irt.SetUpdateCallback(this.Trt, this.Drt, this.Urt),
      this.Wot.SetVisible(!0, SHOW_VIEW_ANIM_TIME);
  }
  OnDeactivate() {
    super.OnDeactivate(),
      this.Hrt(),
      this.Lrt(),
      this.Rrt(),
      this.irt.Reset(),
      this.jrt(),
      this.Wrt(),
      (this.lrt = !1),
      this.Kot?.Reset();
  }
  Initialize(t) {
    super.Initialize(t);
    t = this.GetSprite(21);
    (this.jot = t
      .GetOwner()
      .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.srt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
      (this.art = this.GetSprite(20).GetParentAsUIItem().GetWidth()),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        "/LGUI/MPC_UIShader.MPC_UIShader",
        UE.MaterialParameterCollection,
        (t) => {
          this.ort = t;
        },
        103,
      ),
      (this.lrt = this.HasFallDownTag);
  }
  OnBossShieldChanged(t) {
    this.prt(!0);
  }
  OnFallDownVisibleChanged(t) {
    t
      ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "进入倒地状态"),
        this.irt.GetHit(0, this.$ot),
        this.Krt(),
        this.Qrt(!0))
      : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "退入倒地状态"),
        this.Qrt(!1));
  }
  OnBossHardnessChanged(t) {
    this.krt();
  }
  OnBossLanguageChange() {
    this.brt();
  }
  OnBossStateChange() {
    this.Nrt(!0), this.Ort();
  }
  Tick(i) {
    var t;
    this.frt &&
      ((t = this.ert.UpdatePercent(i)) < 0
        ? this.Hrt()
        : t <= 1 && this.Xrt(t)),
      this.irt.Update(i),
      this.Krt(i),
      this.rrt > this.nrt && (this.$rt(0), (this.rrt = -1)),
      0 <= this.rrt && (this.rrt += i);
    for (const e of this.Jot.values()) e.Tick(i);
    for (let t = this.zot.length - 1; 0 <= t; t--) {
      var s = this.zot[t];
      s.TickHiding(i) || (this.zot.splice(t, 1), this.Zot.push(s));
    }
    super.Tick(i);
  }
  ChangeBuff(t, i, s) {
    i ? this.Yrt(t, s, !0) : this.Jrt(s, !0);
  }
  Yrt(i, s, e = !1) {
    if (!this.Jot.has(s)) {
      let t = this.zrt();
      (t = t || this.Zrt()), this.ent(t, i, s, e);
    }
  }
  Zrt() {
    var t = this.GetItem(13);
    return new BuffItem_1.BuffItem(t);
  }
  ent(t, i, s, e = !1) {
    var h = this.Jot.size,
      r = this.GetEntity().CheckGetComponent(157)?.GetBuffByHandle(s);
    t.Activate(i, r, e),
      t.GetRootItem().SetHierarchyIndex(h),
      this.Jot.set(s, t);
  }
  Jrt(t, i = !1) {
    var s = this.tnt(t);
    s &&
      (this.Jot.delete(t),
      (i
        ? (s.DeactivateWithCloseAnim(), this.zot)
        : (s.Deactivate(), this.Zot)
      ).push(s));
  }
  zrt() {
    var t;
    if (!(this.Zot.length < 1))
      return (t = this.Zot[0]), this.Zot.splice(0, 1), t;
  }
  tnt(t) {
    return this.Jot.get(t);
  }
  Wrt() {
    for (const t of this.Jot.values()) t.DestroyCompatible();
    this.Jot.clear();
    for (const i of this.zot) i.Deactivate(), i.DestroyCompatible();
    this.zot.length = 0;
    for (const s of this.Zot) s.DestroyCompatible();
    this.Zot.length = 0;
  }
  prt(t = !1) {
    var [i, s] = this.GetHpAndShieldPercent();
    this.int(i), this.ont(s), t ? this.rnt(i) : this.Hrt(), (this.Xot = i);
  }
  rnt(t) {
    var i;
    t < this.Xot &&
      ((i = this.ert.IsOriginState()),
      this.ert.GetHit(t, this.Xot),
      i && !this.ert.IsOriginState() && this.Xrt(this.Xot),
      (this.frt = !0),
      this.Xot - t < this.Qot
        ? this.Ert(25)
        : (this.Ert(26), (this.rrt = 0), this.$rt(1)));
  }
  $rt(t) {
    this.ort &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.GameInstance.GetWorld(),
        this.ort,
        rgbSplitProgress,
        t,
      );
  }
  Hrt() {
    this.GetItem(8).SetUIActive(!1), this.ert.Reset(), (this.frt = !1);
  }
  int(t) {
    this.GetSprite(7).SetFillAmount(t),
      this.drt && this.GetSprite(21).SetFillAmount(t);
  }
  Xrt(t) {
    var i = this.srt * this.Xot,
      t = this.srt * t,
      i = t - i,
      t = t - (this.srt + i) / 2,
      s = this.GetItem(8);
    s.SetAnchorOffsetX(t),
      s.SetWidth(i),
      s.SetUIActive(!0),
      this.GetSprite(9).SetAnchorOffsetX(-t);
  }
  ont(t) {
    var i = this.GetSprite(10);
    0 < t ? (i.SetFillAmount(t), i.SetUIActive(!0)) : i.SetUIActive(!1);
  }
  Vrt() {
    if ((this.Wrt(), this.IsValid()))
      for (const i of this.GetEntity().GetComponent(19).GetAllCurrentCueRef()) {
        var t = i.CueConfig;
        t.CueType === BattleUiDefine_1.UI_EFFECT_CUE_TYPE &&
          this.Yrt(t, i.ActiveHandleId);
      }
  }
  vrt() {
    var t, i;
    this.IsValid() &&
      (t = this.GetText(0)) &&
      (1 === this.GetMonsterConfig()?.BossStateInfoShowType
        ? t.SetText("")
        : (i = this.GetMonsterConfig()?.TidLevelText)
          ? ((i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i)),
            LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i))
          : ((i = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv)),
            LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i)));
  }
  qrt() {
    var t, i;
    this.IsValid() &&
      ((i = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv)),
      (t = this.GetText(0)),
      (i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(i, 1)),
      (i = UE.Color.FromHex(i)),
      t.SetColor(i),
      this.GetText(1).SetColor(i));
  }
  brt() {
    var t, i, s;
    this.IsValid() &&
      ((t = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.GetBaseInfo().TidName,
      )),
      (i = PublicUtil_1.PublicUtil.GetConfigTextByKey(
        this.GetMonsterConfig().TidBossSubTitle,
      )),
      (s = this.GetText(1))) &&
      s.SetText(t + i);
  }
  Ort() {
    var t = this.lrt || this.urt;
    this.hrt !== t && ((this.hrt = t), this.Kot.SetVisible(t, TOUGH_ANIM_TIME));
  }
  krt() {
    var t;
    this.IsValid() &&
      this.HardnessAttributeId === EAttributeId.Proto_Rage &&
      ((t =
        this.GetCurrentAttributeValueById(this.HardnessAttributeId) /
        this.GetCurrentAttributeValueById(this.MaxHardnessAttributeId)),
      this.nnt(t),
      this.snt(t),
      (this.$ot = t));
  }
  nnt(t) {
    this.GetSprite(4).SetFillAmount(t), this.irt.GetHit(t, this.$ot);
  }
  snt(t) {
    t < 1
      ? (this.Yot = !1)
      : this.Yot ||
        (this.urt
          ? ((this.mrt = !1),
            (this.Yot = !0),
            (t = this.GetUiNiagara(12)).IsUIActiveSelf()
              ? t.ActivateSystem(!0)
              : t.SetUIActive(!0),
            this.Frt())
          : (this.mrt = !0));
  }
  jrt() {
    var t = this.GetUiNiagara(12);
    t.IsUIActiveSelf() && t.SetUIActive(!1);
  }
  Nrt(t = !1) {
    this.ant(),
      this.crt !== this.urt &&
        ((this.crt = this.urt),
        this.GetSprite(4).SetUIActive(this.crt),
        t || (this.crt && this.mrt)) &&
        this.krt();
  }
  ant() {
    this.lrt || this.HardnessAttributeId !== EAttributeId.Proto_Rage
      ? (this.urt = !1)
      : (this.urt = !0);
  }
  Lrt() {
    this.GetSprite(20).SetUIActive(!1);
  }
  Rrt() {
    this.GetItem(22).SetUIActive(!1);
  }
  Frt() {}
  Qrt(t) {
    (this.lrt = t), this.Grt(), this.Nrt(!t), this.Ort();
  }
  Grt() {
    this.lrt !== this._rt &&
      ((this._rt = this.lrt),
      this.GetSprite(18).SetUIActive(this._rt),
      this._rt ? this.Ert(29) : this.Irt(29));
  }
  Krt(t = 0) {
    if (this.lrt) {
      var i = this.GetCurrentAttributeValueById(fallDownAttributeId),
        s = this.GetCurrentAttributeValueById(fallDownMaxAttributeId),
        i =
          (this.trt.SetTargetPercent(1 - i / s),
          0 < t && this.trt.Update(t),
          this.trt.GetCurPercent());
      if (0 <= i && i <= 1) {
        s = this.GetSprite(18);
        this.Crt || (this.Crt = this.GetItem(17).GetWidth()),
          s.SetStretchRight(this.Crt * i);
        let t = 1;
        i > FALL_DOWN_DISAPPEAR_PERCENT &&
          (t = (1 - i) * FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR),
          this.grt !== t &&
            ((this.grt = t),
            this.GetUiNiagara(19).SetNiagaraVarFloat("Count", t));
      }
    }
  }
  Brt() {
    this.hnt(25),
      this.hnt(26),
      this.hnt(27),
      this.hnt(28),
      this.hnt(29),
      this.hnt(30),
      this.hnt(31);
  }
  hnt(t) {
    var i = [],
      s = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      e = s.Num();
    for (let t = 0; t < e; t++) i.push(s.Get(t));
    this.Art.set(t, i);
  }
  Ert(t) {
    t = this.Art.get(t);
    if (t) for (const i of t) i.Play();
  }
  Irt(t) {
    t = this.Art.get(t);
    if (t) for (const i of t) i.Stop();
  }
  HideWithAnim() {
    this.Wot.SetVisible(!1, CLOSE_VIEW_ANIM_TIME);
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
}
exports.CommonBossStateView = CommonBossStateView;
//# sourceMappingURL=CommonBossStateView.js.map
