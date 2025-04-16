"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EliteMonsterHeadStateView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BuffItemContainer_1 = require("../BuffItemContainer"),
  VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
  HeadStateViewBase_1 = require("./HeadStateViewBase"),
  RageBufferStateMachine_1 = require("./RageBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const SCALE_TOLERATION = 0.003,
  FALL_DOWN_DISAPPEAR_PERCENT = 0.8,
  FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 5,
  TOUGH_ANIM_TIME = 250,
  fallDownAttributeId = EAttributeId.Proto_ParalysisTime,
  fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
class EliteMonsterHeadStateView extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.rnt = void 0),
      (this.nnt = 0),
      (this.hnt = !1),
      (this.mkn = new BuffItemContainer_1.BuffItemContainer()),
      (this.t1t = new RageBufferStateMachine_1.RageBufferStateMachine()),
      (this.i1t = 1),
      (this.pnt = 0),
      (this.vnt = 1),
      (this.Mnt = !0),
      (this.Ent = !1),
      (this.Snt = !1),
      (this.ynt = !0),
      (this.Tnt = !0),
      (this.Lnt = !1),
      (this.Dnt = !1),
      (this.Rnt = 0),
      (this.Unt = 0),
      (this.OnFallDownVisibleChange = () => {
        this.HeadStateData.HasFallDownTag
          ? (this.t1t.GetHit(0, this.i1t), this.nst(), this.sst(!0))
          : this.sst(!1);
      }),
      (this.OnAddOrRemoveBuff = (t, i, e, s) => {
        this.HeadStateData.GetEntityId() === t &&
          (e
            ? this.mkn.AddBuffByCue(i, s, !0)
            : this.mkn.RemoveBuffByCue(i, s, !0));
      }),
      (this.OnShieldChanged = (t) => {
        this.RefreshHpAndShield(!0);
      }),
      (this.OnHardnessHideChanged = (t) => {
        this.Jnt(), this.znt();
      }),
      (this.OnHardnessChanged = (t, i, e) => {
        (t !== this.HardnessAttributeId && t !== this.MaxHardnessAttributeId) ||
          this.Znt();
      }),
      (this.VulnerabilityActivated = (t) => {
        this.Dnt = t;
        var i = this.GetSprite(15);
        i.SetUIActive(t),
          this.Dnt
            ? (([t] = this.GetHpAndShieldPercent()),
              i.SetFillAmount(t),
              this.SPe?.PlaySequencePurely("Flicker"))
            : this.SPe?.StopSequenceByKey("Flicker");
      }),
      (this.OnLevelChanged = (t, i, e) => {
        this.Olt();
      }),
      (this.OnRoleLevelChange = (t, i, e) => {
        this.Olt();
      }),
      (this.OnChangeTeam = () => {
        this.Olt();
      }),
      (this.wnt = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 17, "狂暴条刷新", ["visible", t]),
          this.GetItem(8).SetUIActive(t);
      }),
      (this.Bnt = (t) => {
        t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "[EliteHeadState]播放狂暴条Start动画",
              ),
            this.bnt(21))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "[EliteHeadState]播放狂暴条Close动画",
              ),
            this.bnt(24));
      }),
      (this.qnt = (t) => {
        t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "[EliteHeadState]停止狂暴条Start动画",
              ),
            this.Gnt(21))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                17,
                "[EliteHeadState]停止狂暴条Close动画",
              ),
            this.Gnt(24));
      }),
      (this.Nnt = (t, i, e) => {
        var s;
        t <= i
          ? this.Ont()
          : ((s = this.GetSprite(14)).SetUIActive(!0),
            s.SetStretchRight(this.vnt * (1 - t)),
            s.SetStretchLeft(this.vnt * i),
            e && this.bnt(22));
      }),
      (this.knt = (t, i) => {
        this.bnt(20);
      }),
      (this.Vnt = () => {
        var t = this.GetUiNiagara(18);
        t.bIsUIActive || t.SetUIActive(!0), t.ActivateSystem(!0);
      }),
      (this.Hnt = new Map());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UINiagara],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UISprite],
      [11, UE.UIItem],
      [12, UE.UISprite],
      [13, UE.UINiagara],
      [14, UE.UISprite],
      [15, UE.UISprite],
      [16, UE.UIItem],
      [17, UE.UINiagara],
      [18, UE.UINiagara],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIItem],
      [24, UE.UIItem],
    ]),
      (this.ScaleToleration = SCALE_TOLERATION);
  }
  ActiveBattleHeadState(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[EliteHeadState]激活血条"),
      super.ActiveBattleHeadState(t),
      (this.Mnt = this.GetItem(8).bIsUIActive),
      (this.Tnt = this.GetItem(5).bIsUIActive),
      (this.Snt = this.GetSprite(12).bIsUIActive),
      this.rnt.InitVisible(this.Mnt),
      this.GetItem(8).SetAlpha(1),
      (this.Ent = t.HasFallDownTag),
      this.o1t(),
      this.RefreshHpAndShield(),
      this.Olt(),
      this.RefreshHeadStateRotation(),
      this.klt(),
      this.Flt(),
      this.Vlt(),
      this.Ynt(),
      this.Jnt(),
      this.znt(),
      this.Znt(),
      this.est(),
      this.tst(),
      this.Hlt();
  }
  OnStart() {
    this.Qnt(),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.nnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargeBufferPercent",
        ) / 1e4),
      this.t1t.SetUpdateCallback(this.Nnt, this.knt, this.Vnt),
      (this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth()),
      (this.vnt = this.GetSprite(14).GetParentAsUIItem().GetWidth()),
      (this.rnt = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.rnt.InitCallback(this.wnt, this.Bnt, this.qnt),
      this.mkn.Init(this.GetItem(9), void 0, !0);
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[EliteHeadState]销毁血条"),
      this.SPe.Clear(),
      (this.SPe = void 0),
      this.Ont(),
      this.est(),
      this.t1t.Reset(),
      this.rnt.Deactivate(),
      (this.rnt = void 0);
  }
  ResetBattleHeadState() {
    this.mkn.ClearAll(), super.ResetBattleHeadState();
  }
  GetResourceId() {
    return "UiItem_EliteMonsterState_Prefab";
  }
  OnRefresh(t, i, e) {
    super.OnRefresh(t, i, e),
      this.klt(),
      this.Flt(),
      this.Vlt(),
      this.jlt(e),
      this.t1t.Update(e),
      this.nst();
  }
  tst() {
    var t;
    this.HeadStateData
      ? ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(
          this.HeadStateData.GetEntityId(),
        )),
        this.mkn.RefreshBuff(t))
      : this.mkn.ClearAll();
  }
  klt() {
    var t = this.IsDetailVisible();
    this.GetItem(7).SetUIActive(t);
  }
  Flt() {
    var t = this.IsLevelTextVisible();
    this.GetText(4).SetUIActive(t);
  }
  Vlt() {
    var t = this.IsBuffVisible();
    this.GetItem(9).SetUIActive(t);
  }
  jlt(t) {
    this.IsBuffVisible() && this.mkn.Tick(t);
  }
  OnEliteStateChange() {
    this.Jnt(), this.znt();
  }
  o1t() {
    var t = this.HeadStateData.ActorComponent;
    (0, RegisterComponent_1.isComponentInstance)(t, 3) &&
      t.HalfHeight > this.HeadStateData.CommonParam.OutMonsterHalfHeight &&
      (this.NeedCorrectionOutside = !0);
  }
  RefreshHpAndShield(t = !1) {
    var [i, e] = this.GetHpAndShieldPercent();
    this.Cst(i),
      this.gst(e),
      t
        ? (i < this.CurrentBarPercent &&
            (this.CurrentBarPercent - i < this.nnt
              ? this.bnt(19)
              : this.bnt(20)),
          this.PlayBarAnimation(i))
        : this.StopBarLerpAnimation();
  }
  OnBeginBarAnimation(t) {
    this.ast(t);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation(), this.GetSprite(1).SetUIActive(!1);
  }
  OnLerpBarBufferPercent(t) {
    this.ast(t);
  }
  Cst(t) {
    this.GetSprite(0).SetFillAmount(t),
      this.Dnt && this.GetSprite(15).SetFillAmount(t);
  }
  ast(t) {
    var i = this.GetSprite(1),
      i = (i.SetFillAmount(t), i.SetUIActive(!0), this.GetSprite(2));
    i.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2),
      i.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  gst(t) {
    var i = this.GetSprite(3);
    0 < t ? (i.SetFillAmount(t), i.SetUIActive(!0)) : i.SetUIActive(!1);
  }
  OnHardnessAttributeChanged() {
    super.OnHardnessAttributeChanged(), this.Znt();
  }
  OnHealthChanged() {
    this.RefreshHpAndShield(!0);
  }
  Olt() {
    var t, i, e;
    this.HeadStateData &&
      ((t = this.GetLevel()),
      (i = this.GetText(4)),
      (e = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(
        t,
        this.HeadStateData.Camp,
      )),
      i.SetColor(UE.Color.FromHex(e)),
      LguiUtil_1.LguiUtil.SetLocalText(i, "LevelShow", t));
  }
  RefreshOnCampChanged() {
    this.Olt(), this.Hlt();
  }
  znt() {
    var t = this.Ent || this.ynt;
    this.Mnt !== t &&
      ((this.Mnt = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "[EliteHeadState]ToughItemVisible改变",
          ["visible", this.Mnt],
          ["EntityId", this.HeadStateData?.GetEntityId()],
        ),
      this.rnt.SetVisible(t, TOUGH_ANIM_TIME),
      t) &&
      this.GetItem(8).SetAlpha(1);
  }
  Znt() {
    var t, i, e;
    this.HardnessAttributeId === EAttributeId.Proto_Rage &&
      ((t = this.HeadStateData.GetAttributeCurrentValueById(
        this.MaxHardnessAttributeId,
      )),
      (e =
        (i = this.HeadStateData.GetAttributeCurrentValueById(
          this.HardnessAttributeId,
        )) / t),
      this.GetSprite(10).SetFillAmount(e),
      this.t1t.GetHit(e, this.i1t),
      (this.i1t = i / t),
      this.vst(e));
  }
  vst(t) {
    t < 1
      ? (this.hnt = !1)
      : this.hnt ||
        (this.ynt
          ? ((this.Lnt = !1),
            (this.hnt = !0),
            this.GetUiNiagara(6).ActivateSystem(!0),
            this.est())
          : (this.Lnt = !0));
  }
  Jnt() {
    this.Mst(),
      this.Tnt !== this.ynt &&
        ((this.Tnt = this.ynt),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[EliteHeadState]白条Visible改变",
            ["visible", this.Tnt],
            ["EntityId", this.HeadStateData?.GetEntityId()],
          ),
        this.GetItem(5).SetUIActive(this.Tnt),
        this.Tnt) &&
        this.Lnt &&
        this.Znt();
  }
  Mst() {
    var t;
    this.Ent ||
    this.HardnessAttributeId !== EAttributeId.Proto_Rage ||
    this.HeadStateData.ContainsTagById(1261361093)
      ? (this.ynt = !1)
      : ((t = this.HeadStateData.GetAttributeCurrentValueById(
          this.MaxHardnessAttributeId,
        )),
        (this.ynt = !(t <= 0)));
  }
  Ont() {
    this.GetSprite(14).SetUIActive(!1);
  }
  est() {
    var t = this.GetUiNiagara(18);
    t.bIsUIActive && t.SetUIActive(!1);
  }
  sst(t) {
    (this.Ent = t), this.Ynt(), this.Jnt(), this.znt();
  }
  Ynt() {
    this.Ent !== this.Snt &&
      ((this.Snt = this.Ent),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "[EliteHeadState]倒地条Visible改变",
          ["visible", this.Snt],
          ["EntityId", this.HeadStateData?.GetEntityId()],
        ),
      this.GetSprite(12).SetUIActive(this.Snt),
      this.Snt ? this.bnt(23) : this.Gnt(23));
  }
  nst() {
    if (this.Ent) {
      var i =
        1 -
        this.HeadStateData.GetAttributeCurrentValueById(fallDownAttributeId) /
          this.HeadStateData.GetAttributeCurrentValueById(
            fallDownMaxAttributeId,
          );
      if (0 <= i && i <= 1) {
        var e = this.GetSprite(12);
        this.Rnt || (this.Rnt = this.GetItem(11).GetWidth()),
          e.SetStretchRight(this.Rnt * i);
        let t = 1;
        i > FALL_DOWN_DISAPPEAR_PERCENT &&
          (t = (1 - i) * FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR),
          this.Unt !== t &&
            ((this.Unt = t),
            this.GetUiNiagara(13).SetNiagaraVarFloat("Count", t));
      }
    }
  }
  Hlt() {
    var t = this.GetHpColor();
    t && ((t = UE.Color.FromHex(t)), this.GetSprite(0)?.SetColor(t));
  }
  Qnt() {
    this.Est(19),
      this.Est(20),
      this.Est(21),
      this.Est(22),
      this.Est(23),
      this.Est(24);
  }
  Est(t) {
    var i = [],
      e = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let t = 0; t < s; t++) i.push(e.Get(t));
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
}
exports.EliteMonsterHeadStateView = EliteMonsterHeadStateView;
//# sourceMappingURL=EliteMonsterHeadStateView.js.map
