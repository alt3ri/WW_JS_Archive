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
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BuffItemContainer_1 = require("../BuffItemContainer"),
  HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine"),
  RageBufferStateMachine_1 = require("../HeadState/RageBufferStateMachine"),
  VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
  BossStateViewBase_1 = require("./BossStateViewBase"),
  FallDownPercentMachine_1 = require("./FallDownPercentMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
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
      (this.SPe = void 0),
      (this.int = void 0),
      (this.ont = void 0),
      (this.rnt = void 0),
      (this.nnt = -0),
      (this.snt = 1),
      (this.ant = 1),
      (this.hnt = !1),
      (this.mkn = new BuffItemContainer_1.BuffItemContainer()),
      (this.cnt = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.mnt = new FallDownPercentMachine_1.FallDownPercentMachine()),
      (this.dnt = new RageBufferStateMachine_1.RageBufferStateMachine()),
      (this.Cnt = void 0),
      (this.gnt = -1),
      (this.fnt = -0),
      (this.pnt = 0),
      (this.vnt = 0),
      (this.Mnt = !1),
      (this.Ent = !1),
      (this.Snt = !1),
      (this.ynt = !0),
      (this.Tnt = !0),
      (this.Lnt = !1),
      (this.Dnt = !1),
      (this.Rnt = 0),
      (this.Unt = 0),
      (this.Ant = !1),
      (this.OnBossHeathChanged = (t, i, s) => {
        this.Pnt(!0);
      }),
      (this.OnBossMaxHealthChanged = (t, i, s) => {
        this.Pnt();
      }),
      (this.OnVulnerabilityActivated = (t, i) => {
        this.Dnt = i;
        var s = this.GetSprite(21);
        s.SetUIActive(i),
          this.Dnt
            ? (([i] = this.GetHpAndShieldPercent()),
              s.SetFillAmount(i),
              this.int.Play())
            : this.int.Stop();
      }),
      (this.OnLevelChanged = (t, i, s) => {
        this.xnt();
      }),
      (this.wnt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "狂暴条刷新", ["visible", t]),
          this.GetItem(11).SetUIActive(t),
          t && this.GetItem(11).SetAlpha(1);
      }),
      (this.Bnt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "播放狂暴条动画", ["visible", t]),
          t ? this.bnt(27) : this.bnt(30);
      }),
      (this.qnt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 18, "停止狂暴条动画", ["visible", t]),
          t ? this.Gnt(27) : this.Gnt(30);
      }),
      (this.Nnt = (t, i, s) => {
        var e;
        t <= i
          ? this.Ont()
          : ((e = this.GetSprite(20)).SetUIActive(!0),
            e.SetStretchRight(this.vnt * (1 - t)),
            e.SetStretchLeft(this.vnt * i),
            s && this.bnt(28));
      }),
      (this.knt = (t, i) => {
        var s;
        t <= i
          ? this.Fnt()
          : ((s = this.GetItem(22)).SetUIActive(!0),
            s.SetStretchRight(this.vnt * (1 - t)),
            s.SetStretchLeft(this.vnt * i),
            this.GetUiNiagara(23).ActivateSystem(!0),
            this.bnt(26));
      }),
      (this.Vnt = () => {
        this.bnt(31);
      }),
      (this.Hnt = new Map()),
      (this.jnt = (t) => {
        t || this.Hide();
      }),
      (this.Wnt = (t) => {
        t
          ? this.SPe.PlaySequencePurely("ShowView")
          : this.SPe.PlaySequencePurely("CloseView");
      }),
      (this.Knt = (t) => {
        this.SPe.StopCurrentSequence();
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
      (this.fnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitEffectDuration",
        ));
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Qnt(),
      (this.nnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargeBufferPercent",
        ) / 1e4),
      (this.ont = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.ont.InitCallback(this.jnt, this.Wnt, this.Knt),
      this.ont.InitVisible(!1),
      (this.rnt = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.rnt.InitCallback(this.wnt, this.Bnt, this.qnt),
      this.mkn.Init(this.GetItem(13));
  }
  OnBeforeDestroy() {
    this.SPe.Clear(),
      (this.SPe = void 0),
      this.ont.Reset(),
      (this.ont = void 0),
      this.rnt.Reset(),
      (this.rnt = void 0);
  }
  OnActivate() {
    super.OnActivate(),
      (this.Ent = this.HasFallDownTag),
      (this.Mnt = this.GetItem(11).bIsUIActive),
      (this.Tnt = this.GetItem(2).bIsUIActive),
      (this.Snt = this.GetSprite(18).bIsUIActive),
      this.rnt.InitVisible(this.Mnt),
      this.xnt(),
      this.Xnt(),
      this.$nt(),
      this.Pnt(),
      this.Ynt(),
      this.Jnt(),
      this.znt(),
      this.Znt(),
      this.est(),
      this.tst(),
      this.dnt.SetUpdateCallback(this.Nnt, this.knt, this.Vnt),
      this.ont.SetVisible(!0, SHOW_VIEW_ANIM_TIME);
  }
  OnDeactivate() {
    super.OnDeactivate(),
      this.ist(),
      this.Ont(),
      this.Fnt(),
      this.dnt.Reset(),
      this.ost(),
      this.mkn.ClearAll(),
      (this.Ent = !1),
      this.rnt?.Reset();
  }
  Initialize(t) {
    super.Initialize(t);
    t = this.GetSprite(21);
    (this.int = t
      .GetOwner()
      .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.pnt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
      (this.vnt = this.GetSprite(20).GetParentAsUIItem().GetWidth()),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        "/LGUI/MPC_UIShader.MPC_UIShader",
        UE.MaterialParameterCollection,
        (t) => {
          this.Cnt = t;
        },
        103,
      ),
      (this.Ent = this.HasFallDownTag);
  }
  OnBossShieldChanged(t) {
    this.Pnt(!0);
  }
  OnFallDownVisibleChanged(t) {
    t
      ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "进入倒地状态"),
        this.dnt.GetHit(0, this.ant),
        this.nst(),
        this.sst(!0))
      : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 18, "退入倒地状态"),
        this.sst(!1));
  }
  OnBossHardnessChanged(t) {
    this.Znt();
  }
  OnBossLanguageChange() {
    this.Xnt();
  }
  OnBossStateChange() {
    this.Jnt(!0), this.znt();
  }
  Tick(t) {
    var i;
    this.Ant &&
      ((i = this.cnt.UpdatePercent(t)) < 0
        ? this.ist()
        : i <= 1 && this.ast(i)),
      this.dnt.Update(t),
      this.nst(t),
      this.gnt > this.fnt && (this.hst(0), (this.gnt = -1)),
      0 <= this.gnt && (this.gnt += t),
      this.mkn.Tick(t),
      super.Tick(t);
  }
  ChangeBuff(t, i, s) {
    i ? this.mkn.AddBuffByCue(t, s, !0) : this.mkn.RemoveBuffByCue(t, s, !0);
  }
  Pnt(t = !1) {
    var [i, s] = this.GetHpAndShieldPercent();
    this.Cst(i), this.gst(s), t ? this.fst(i) : this.ist(), (this.snt = i);
  }
  fst(t) {
    var i;
    t < this.snt &&
      ((i = this.cnt.IsOriginState()),
      this.cnt.GetHit(t, this.snt),
      i && !this.cnt.IsOriginState() && this.ast(this.snt),
      (this.Ant = !0),
      this.snt - t < this.nnt
        ? this.bnt(25)
        : (this.bnt(26), (this.gnt = 0), this.hst(1)));
  }
  hst(t) {
    this.Cnt &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.GameInstance.GetWorld(),
        this.Cnt,
        rgbSplitProgress,
        t,
      );
  }
  ist() {
    this.GetItem(8).SetUIActive(!1), this.cnt.Reset(), (this.Ant = !1);
  }
  Cst(t) {
    this.GetSprite(7).SetFillAmount(t),
      this.Dnt && this.GetSprite(21).SetFillAmount(t);
  }
  ast(t) {
    var i = this.pnt * this.snt,
      t = this.pnt * t,
      i = t - i,
      t = t - (this.pnt + i) / 2,
      s = this.GetItem(8);
    s.SetAnchorOffsetX(t),
      s.SetWidth(i),
      s.SetUIActive(!0),
      this.GetSprite(9).SetAnchorOffsetX(-t);
  }
  gst(t) {
    var i = this.GetSprite(10);
    0 < t ? (i.SetFillAmount(t), i.SetUIActive(!0)) : i.SetUIActive(!1);
  }
  tst() {
    var t = this.GetEntityId();
    void 0 === t
      ? this.mkn.ClearAll()
      : ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t)),
        this.mkn.RefreshBuff(t));
  }
  xnt() {
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
  $nt() {
    var t, i;
    this.IsValid() &&
      ((i = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv)),
      (t = this.GetText(0)),
      (i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(i, 1)),
      (i = UE.Color.FromHex(i)),
      t.SetColor(i),
      this.GetText(1).SetColor(i));
  }
  Xnt() {
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
  znt() {
    var t = this.Ent || this.ynt;
    this.Mnt !== t && ((this.Mnt = t), this.rnt.SetVisible(t, TOUGH_ANIM_TIME));
  }
  Znt() {
    var t;
    this.IsValid() &&
      this.HardnessAttributeId === EAttributeId.Proto_Rage &&
      ((t =
        this.GetCurrentAttributeValueById(this.HardnessAttributeId) /
        this.GetCurrentAttributeValueById(this.MaxHardnessAttributeId)),
      this.pst(t),
      this.vst(t),
      (this.ant = t));
  }
  pst(t) {
    this.GetSprite(4).SetFillAmount(t), this.dnt.GetHit(t, this.ant);
  }
  vst(t) {
    t < 1
      ? (this.hnt = !1)
      : this.hnt ||
        (this.ynt
          ? ((this.Lnt = !1),
            (this.hnt = !0),
            (t = this.GetUiNiagara(12)).IsUIActiveSelf()
              ? t.ActivateSystem(!0)
              : t.SetUIActive(!0),
            this.est())
          : (this.Lnt = !0));
  }
  ost() {
    var t = this.GetUiNiagara(12);
    t.IsUIActiveSelf() && t.SetUIActive(!1);
  }
  Jnt(t = !1) {
    this.Mst(),
      this.Tnt !== this.ynt &&
        ((this.Tnt = this.ynt),
        this.GetSprite(4).SetUIActive(this.Tnt),
        t || (this.Tnt && this.Lnt)) &&
        this.Znt();
  }
  Mst() {
    this.Ent || this.HardnessAttributeId !== EAttributeId.Proto_Rage
      ? (this.ynt = !1)
      : (this.ynt = !0);
  }
  Ont() {
    this.GetSprite(20).SetUIActive(!1);
  }
  Fnt() {
    this.GetItem(22).SetUIActive(!1);
  }
  est() {}
  sst(t) {
    (this.Ent = t), this.Ynt(), this.Jnt(!t), this.znt();
  }
  Ynt() {
    this.Ent !== this.Snt &&
      ((this.Snt = this.Ent),
      this.GetSprite(18).SetUIActive(this.Snt),
      this.Snt ? this.bnt(29) : this.Gnt(29));
  }
  nst(t = 0) {
    if (this.Ent) {
      var i = this.GetCurrentAttributeValueById(fallDownAttributeId),
        s = this.GetCurrentAttributeValueById(fallDownMaxAttributeId),
        i =
          (this.mnt.SetTargetPercent(1 - i / s),
          0 < t && this.mnt.Update(t),
          this.mnt.GetCurPercent());
      if (0 <= i && i <= 1) {
        s = this.GetSprite(18);
        this.Rnt || (this.Rnt = this.GetItem(17).GetWidth()),
          s.SetStretchRight(this.Rnt * i);
        let t = 1;
        i > FALL_DOWN_DISAPPEAR_PERCENT &&
          (t = (1 - i) * FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR),
          this.Unt !== t &&
            ((this.Unt = t),
            this.GetUiNiagara(19).SetNiagaraVarFloat("Count", t));
      }
    }
  }
  Qnt() {
    this.Est(25),
      this.Est(26),
      this.Est(27),
      this.Est(28),
      this.Est(29),
      this.Est(30),
      this.Est(31);
  }
  Est(t) {
    var i = [],
      s = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      e = s.Num();
    for (let t = 0; t < e; t++) i.push(s.Get(t));
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Play();
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) for (const i of t) i.Stop();
  }
  HideWithAnim() {
    this.ont.SetVisible(!1, CLOSE_VIEW_ANIM_TIME);
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
}
exports.CommonBossStateView = CommonBossStateView;
//# sourceMappingURL=CommonBossStateView.js.map
