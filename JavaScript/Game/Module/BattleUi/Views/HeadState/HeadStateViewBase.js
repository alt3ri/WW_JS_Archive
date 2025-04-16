"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStateViewBase = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../../World/Define/GameBudgetAllocatorConfigCreator"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  HpBufferStateMachine_1 = require("./HpBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const UPDATE_TOLERATION = 0.1,
  PERCENT_TOLERATION = 0.01,
  SCALE_TOLERATION = 0.004;
class HeadStateViewNode {
  constructor() {
    (this.OQt = void 0),
      (this.Vge = !0),
      (this.xC = !0),
      (this.cka = 0),
      (this.mka = 0),
      (this.dka = 0),
      (this.Cka = !1),
      (this.yW = void 0),
      (this.ScheduledAfterTick = void 0),
      (this.LocationProxyFunction = void 0);
  }
  RegisterTick(t) {
    (this.OQt = t),
      this.yW &&
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            66,
            "HeadStateViewNode RegisterTick: 重复注册Tick",
            ["HeadStateViewNode", this.constructor.name],
          ),
        this.UnregisterTick());
    t =
      GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
        .TsBattleHeadStateViewConfig;
    this.yW =
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
        t.GroupName,
        t.SignificanceGroup,
        this,
        this.OQt.GetRootActor(),
      );
  }
  UnregisterTick() {
    this.yW &&
      (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ),
      (this.yW = void 0));
  }
  CacheRefreshInfo(t, e, i) {
    (this.cka = t), (this.mka = e), (this.dka = i), (this.Cka = !0);
  }
  ScheduledTick(t, e, i) {
    this.Cka &&
      this.Vge &&
      this.xC &&
      (this.OQt.OnRefresh(this.cka, this.mka, this.dka), (this.Cka = !1));
  }
  OnEnabledChange(t, e) {
    this.Vge = t;
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    this.xC = t;
  }
}
class HeadStateViewBase extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.ScaleToleration = SCALE_TOLERATION),
      (this.CurrentBarPercent = 1),
      (this.j1t = 0),
      (this.W1t = 0),
      (this.K1t = -1),
      (this.jht = !1),
      (this.HeadStateData = void 0),
      (this.Q1t = 0),
      (this.DetailHeadStateRangeInternal = 0),
      (this.StateViewDisplayMaxDistance = 0),
      (this.StateViewDisplayMinDistance = 0),
      (this.X1t = Vector_1.Vector.Create(0, 0, -1)),
      (this.Gue = Rotator_1.Rotator.Create()),
      (this.$1t = Rotator_1.Rotator.Create()),
      (this.Distance = 0),
      (this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.Y1t = Vector_1.Vector.Create()),
      (this.yB_ = Vector_1.Vector.Create()),
      (this.J1t = void 0),
      (this.z1t = void 0),
      (this.Z1t = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.u_t = Stats_1.Stat.Create("[HeadState]HeadState-Destroy")),
      (this.Bst = -0),
      (this.c_t = !1),
      (this.NeedCorrectionOutside = !1),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.m_t = (0, puerts_1.$ref)(void 0)),
      (this.d_t = (0, puerts_1.$ref)(void 0)),
      (this.C_t = Vector_1.Vector.Create()),
      (this.g_t = Vector_1.Vector.Create()),
      (this.f_t = Vector_1.Vector.Create()),
      (this.gka = new HeadStateViewNode()),
      (this.p_t = () => {
        this.J1t &&
          (this.J1t(this.HeadStateData.GetEntity()), (this.z1t = void 0));
      }),
      (this.OnFallDownVisibleChange = () => {}),
      (this.OnAddOrRemoveBuff = (t, e, i, s) => {}),
      (this.OnRoleLevelChange = (t, e, i) => {}),
      (this.OnChangeTeam = () => {}),
      (this.OnShieldChanged = (t) => {}),
      (this.OnHardnessHideChanged = (t) => {}),
      (this.Zrt = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.ent = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.OnHardnessChanged = (t, e, i) => {}),
      (this.VulnerabilityActivated = (t) => {}),
      (this.OnLevelChanged = (t, e, i) => {}),
      (this.OnLifeChanged = (t, e, i) => {
        this.OnHealthChanged();
      }),
      (this.OnCampChanged = () => {
        this.RefreshOnCampChanged();
      });
  }
  async InitializeHeadState(t, e, i, s, h, a, r) {
    var o = this.GetResourceId();
    StringUtils_1.StringUtils.IsEmpty(o) ||
      ((this.Q1t = e),
      (this.DetailHeadStateRangeInternal = s),
      (this.StateViewDisplayMaxDistance = h),
      (this.StateViewDisplayMinDistance = a),
      this.Z1t.UpdateParams(e),
      (s = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(o))
        ? (this.CreateByActor(s),
          (this.c_t = !0),
          r &&
            (this.ShowCompatible(),
            this.ActiveBattleHeadState(r),
            this.gka.RegisterTick(this)))
        : ((h =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
          await this.CreateByPathAsync(h, t, !0),
          r &&
            (await this.ShowAsync(),
            this.RootActor && this.ActiveBattleHeadState(r),
            this.gka.RegisterTick(this))));
  }
  async ActiveBattleHeadStatePreload(t) {
    await this.ShowAsync(),
      this.ActiveBattleHeadState(t),
      this.gka.RegisterTick(this);
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  Recycle() {
    this.ResetBattleHeadState(),
      (this.HeadStateData = void 0),
      this.gka.UnregisterTick(),
      this.Hide();
  }
  OnBeforeDestroyImplementImplement() {
    this.RootActor && this.ResetBattleHeadState();
  }
  DestroyOverride() {
    var t;
    return (
      this.gka.UnregisterTick(),
      !(
        !this.c_t ||
        !this.RootActor ||
        ((t = this.GetResourceId()),
        BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(
          t,
          this.RootActor,
        ),
        0)
      )
    );
  }
  ActiveBattleHeadState(t) {
    HeadStateViewBase.t_t.Start(), (this.HeadStateData = t);
    var t = this.GetHp(),
      e = this.GetMaxHp();
    (this.CurrentBarPercent = t && e ? t / e : 0),
      this.BindCallback(),
      this.v_t(0),
      this.RefreshHardnessAttributeId(),
      this.M_t(),
      this.InitChildType(14),
      HeadStateViewBase.hT1.Start(),
      this.ShowBattleVisibleChildView(),
      HeadStateViewBase.hT1.Stop(),
      (this.NeedCorrectionOutside = !1),
      (this.jht = !0),
      HeadStateViewBase.t_t.Stop();
  }
  ActivateHideTimeDown(t, e = void 0) {
    this.E_t(),
      t
        ? ((this.J1t = e),
          (this.z1t = TimerSystem_1.TimerSystem.Delay(this.p_t, t)))
        : this.p_t();
  }
  E_t() {
    this.z1t &&
      (TimerSystem_1.TimerSystem.Remove(this.z1t), (this.z1t = void 0));
  }
  SetHeadStateScale(t) {
    Math.abs(this.X1t.Z - t) > this.ScaleToleration &&
      ((this.X1t.X = t),
      (this.X1t.Y = t),
      (this.X1t.Z = t),
      this.RootItem.SetUIRelativeScale3D(this.X1t.ToUeVectorOld(!0)));
  }
  OnCacheRefresh(t, e, i) {
    this.jht && this.gka.CacheRefreshInfo(t, e, i);
  }
  OnRefresh(t, e, i) {
    this.jht &&
      (HeadStateViewBase.Ult.Start(),
      (this.Distance = t),
      this.v_t(e),
      this.LerpBarPercent(i),
      HeadStateViewBase.Ult.Stop());
  }
  v_t(t) {
    HeadStateViewBase.lT1.Start(),
      this.SetHeadStateScale(t),
      this.S_t(),
      this.RefreshHeadStateRotation(),
      HeadStateViewBase.lT1.Stop();
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator,
      e =
        this.HeadStateData?.ActorComponent?.ActorGravityDirectProxy ??
        Vector_1.Vector.DownVectorProxy;
    0 === e.SizeSquared2D()
      ? (e.Z <= 0
          ? ((this.Gue.Yaw = t.Yaw + 90), (this.Gue.Roll = t.Pitch - 90))
          : ((this.Gue.Yaw = t.Yaw - 90), (this.Gue.Roll = 90 - t.Pitch)),
        (this.Gue.Pitch = 0))
      : MathUtils_1.MathUtils.ComposeRotator(
          HeadStateViewBase.aAc,
          t,
          this.Gue,
        ),
      (Math.abs(this.Gue.Yaw - this.$1t.Yaw) <= UPDATE_TOLERATION &&
        Math.abs(this.Gue.Roll - this.$1t.Roll) <= UPDATE_TOLERATION &&
        Math.abs(this.Gue.Pitch - this.$1t.Pitch) <= UPDATE_TOLERATION) ||
        (this.$1t.FromUeRotator(this.Gue),
        this.RootItem.SetUIRelativeRotation(this.$1t.ToUeRotator()));
  }
  S_t() {
    this.yB_.FromUeVector(this.HeadStateData.GetWorldLocation());
    var t = this.yB_;
    this.NeedCorrectionOutside && this.CheckAndCorrectionOutside(t),
      this.Y1t.Equals(t, UPDATE_TOLERATION) ||
        (this.RootItem.SetUIRelativeLocation(t.ToUeVectorOld()),
        this.Y1t.Set(t.X, t.Y, t.Z));
  }
  CheckAndCorrectionOutside(t) {
    var e,
      i,
      s,
      h,
      a = t.ToUeVector(),
      r = Global_1.Global.CharacterController;
    UE.GameplayStatics.D_ProjectWorldToScreen(r, a, this.S$e) &&
      ((e = (a = (0, puerts_1.$unref)(this.S$e)).X),
      (h = a.Y),
      e <
        -(i =
          (s = ModelManager_1.ModelManager.BattleUiModel.ViewportSize).X *
          this.HeadStateData.CommonParam.OutHorizontalMargin) ||
        e > s.X + i ||
        (e = s.Y * this.HeadStateData.CommonParam.OutTopMargin) < h ||
        ((a.Y = e),
        UE.GameplayStatics.DeprojectScreenToWorld(r, a, this.m_t, this.d_t),
        (i = (0, puerts_1.$unref)(this.m_t)),
        (s = (0, puerts_1.$unref)(this.d_t)),
        this.C_t.FromUeVector(i),
        this.g_t.FromUeVector(s),
        t.Subtraction(this.C_t, this.f_t),
        (h = (this.f_t.Size2D() * this.g_t.Size()) / this.g_t.Size2D()),
        this.C_t.AdditionEqual(this.g_t.MultiplyEqual(h)),
        this.C_t.Z > this.HeadStateData.ActorComponent.ActorLocationProxy.Z &&
          (t.Z = this.C_t.Z)));
  }
  ResetBattleHeadState() {
    this.u_t.Start(),
      this.ClearChildViewData(),
      this.UnBindCallback(),
      this.StopBarLerpAnimation(),
      this.E_t(),
      (this.jht = !1),
      this.u_t.Stop();
  }
  LerpBarPercent(t) {
    var e;
    -1 === this.K1t ||
      (HeadStateViewBase.e_t.Start(),
      (e = this.Z1t.UpdatePercent(t)) < 0
        ? this.StopBarLerpAnimation()
        : this.M_t(e),
      HeadStateViewBase.e_t.Stop(),
      this.j1t >= this.W1t) ||
      (this.K1t = this.K1t + t);
  }
  M_t(t) {
    Math.abs(this.Bst - t) < PERCENT_TOLERATION ||
      (t
        ? this.OnLerpBarBufferPercent(t)
        : this.OnLerpBarBufferPercent(this.CurrentBarPercent),
      (this.Bst = t));
  }
  OnLerpBarBufferPercent(t) {}
  PlayBarAnimation(t) {
    var e,
      i = t,
      s = this.CurrentBarPercent;
    s <= i ||
      ((e = this.Z1t.IsOriginState()),
      this.Z1t.GetHit(i, s),
      (this.j1t = i),
      (this.W1t = s),
      (this.CurrentBarPercent = t),
      (this.K1t = 0),
      e && !this.Z1t.IsOriginState() && this.OnBeginBarAnimation(s));
  }
  OnBeginBarAnimation(t) {}
  StopBarLerpAnimation() {
    (this.j1t = 0), (this.W1t = 0), (this.K1t = -1), this.Z1t.Reset();
  }
  get HeadStateType() {
    return this.Q1t;
  }
  BindCallback() {
    this.HeadStateData.BindOnShieldChanged(this.OnShieldChanged),
      this.HeadStateData.BindOnFallDownVisibleChange(
        this.OnFallDownVisibleChange,
      ),
      this.HeadStateData.BindOnHardnessHideChanged(this.OnHardnessHideChanged),
      this.HeadStateData.BindOnHardnessActivated(this.Zrt),
      this.HeadStateData.BindOnRageActivated(this.ent),
      this.HeadStateData.BindOnHardnessChanged(this.OnHardnessChanged),
      this.HeadStateData.BindOnVulnerabilityActivated(
        this.VulnerabilityActivated,
      ),
      this.HeadStateData.BindOnLevelChanged(this.OnLevelChanged),
      this.HeadStateData.BindOnLifeChanged(this.OnLifeChanged),
      this.HeadStateData.BindOnCampChanged(this.OnCampChanged);
  }
  UnBindCallback() {
    this.HeadStateData?.UnBindAllCallback();
  }
  RefreshHardnessAttributeId() {
    this.HeadStateData.ContainsTagById(-1838149281)
      ? ((this.HardnessAttributeId = EAttributeId.Proto_Rage),
        (this.MaxHardnessAttributeId = EAttributeId.Proto_RageMax))
      : ((this.HardnessAttributeId = EAttributeId.Proto_Hardness),
        (this.MaxHardnessAttributeId = EAttributeId.Proto_HardnessMax)),
      this.OnEliteStateChange();
  }
  OnEliteStateChange() {}
  AddOrRemoveBuff(t, e, i, s) {
    this.OnAddOrRemoveBuff(t, e, i, s);
  }
  RoleLevelChange(t, e, i) {
    this.OnRoleLevelChange(t, e, i);
  }
  ChangeTeam() {
    this.OnChangeTeam();
  }
  OnHardnessAttributeChanged() {
    this.RefreshHardnessAttributeId();
  }
  OnHealthChanged() {}
  RefreshOnCampChanged() {}
  GetHpAndShieldPercent() {
    return this.HeadStateData.GetHpAndShieldPercent();
  }
  GetHpAndMaxHp() {
    return this.HeadStateData.GetHpAndMaxHp();
  }
  IsDetailVisible() {
    return (
      !(this.Distance <= this.StateViewDisplayMinDistance) &&
      (!!this.HeadStateData.HasFightTag ||
        this.Distance <= this.DetailHeadStateRangeInternal)
    );
  }
  IsLevelTextVisible() {
    return (
      this.Distance >= this.StateViewDisplayMinDistance &&
      this.Distance <= this.StateViewDisplayMaxDistance
    );
  }
  IsBuffVisible() {
    return (
      this.Distance >= this.StateViewDisplayMinDistance &&
      this.Distance <= this.DetailHeadStateRangeInternal
    );
  }
  GetLevel() {
    return this.HeadStateData.GetLevel();
  }
  GetMaxHp() {
    return this.HeadStateData.GetMaxHp();
  }
  GetHp() {
    return this.HeadStateData.GetHp();
  }
  GetMonsterShield() {
    return this.HeadStateData.GetShield();
  }
  GetHpColor() {
    return this.HeadStateData.GetHpColor();
  }
}
((exports.HeadStateViewBase = HeadStateViewBase).aAc = Rotator_1.Rotator.Create(
  0,
  90,
  -90,
)),
  (HeadStateViewBase.Ult = Stats_1.Stat.Create("[HeadState]HeadState-Tick")),
  (HeadStateViewBase.e_t = Stats_1.Stat.Create("[HeadState]HeadState-Lerp")),
  (HeadStateViewBase.t_t = Stats_1.Stat.Create(
    "[HeadState]HeadState-Activate",
  )),
  (HeadStateViewBase.lT1 = Stats_1.Stat.Create(
    "[HeadState]HeadState-RefreshTransform",
  )),
  (HeadStateViewBase.hT1 = Stats_1.Stat.Create("[HeadState]HeadState-Show"));
//# sourceMappingURL=HeadStateViewBase.js.map
