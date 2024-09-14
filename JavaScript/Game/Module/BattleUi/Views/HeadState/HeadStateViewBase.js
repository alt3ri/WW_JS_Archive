"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStateViewBase = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  Global_1 = require("../../../../Global"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  HpBufferStateMachine_1 = require("./HpBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  GameBudgetAllocatorConfigCreator_1 = require("../../../../World/Define/GameBudgetAllocatorConfigCreator"),
  UPDATE_TOLERATION = 0.1,
  PERCENT_TOLERATION = 0.01,
  SCALE_TOLERATION = 0.004;
class HeadStateViewNode {
  constructor() {
    (this.OQt = void 0),
      (this.Vge = !0),
      (this.xC = !0),
      (this.cOa = 0),
      (this.mOa = 0),
      (this.dOa = 0),
      (this.COa = !1),
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
            67,
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
  CacheRefreshInfo(t, i, e) {
    (this.cOa = t), (this.mOa = i), (this.dOa = e), (this.COa = !0);
  }
  ScheduledTick(t, i, e) {
    this.COa &&
      this.Vge &&
      this.xC &&
      (this.OQt.OnRefresh(this.cOa, this.mOa, this.dOa), (this.COa = !1));
  }
  OnEnabledChange(t, i) {
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
      (this.$1t = Rotator_1.Rotator.Create()),
      (this.Distance = 0),
      (this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.Y1t = Vector_1.Vector.Create()),
      (this.J1t = void 0),
      (this.z1t = void 0),
      (this.Z1t = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.Ult = Stats_1.Stat.Create("[HeadState]HeadState-Tick")),
      (this.e_t = Stats_1.Stat.Create("[HeadState]HeadState-Lerp")),
      (this.t_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate")),
      (this.i_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate1")),
      (this.o_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate2")),
      (this.r_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate3")),
      (this.n_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate4")),
      (this.s_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate5")),
      (this.a_t = Stats_1.Stat.Create("[HeadState]HeadState-Activate6")),
      (this.h_t = Stats_1.Stat.Create("[HeadState]HeadState-RefreshScale")),
      (this.l_t = Stats_1.Stat.Create("[HeadState]HeadState-RefreshLocation")),
      (this.__t = Stats_1.Stat.Create("[HeadState]HeadState-RefreshRotation")),
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
      (this.gOa = new HeadStateViewNode()),
      (this.p_t = () => {
        this.J1t &&
          (this.J1t(this.HeadStateData.GetEntity()), (this.z1t = void 0));
      }),
      (this.OnFallDownVisibleChange = () => {}),
      (this.OnAddOrRemoveBuff = (t, i, e, s) => {}),
      (this.OnRoleLevelChange = (t, i, e) => {}),
      (this.OnChangeTeam = () => {}),
      (this.OnShieldChanged = (t) => {}),
      (this.OnHardnessHideChanged = (t) => {}),
      (this.Zrt = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.ent = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.OnHardnessChanged = (t, i, e) => {}),
      (this.VulnerabilityActivated = (t) => {}),
      (this.OnLevelChanged = (t, i, e) => {});
  }
  async InitializeHeadState(t, i, e, s, h, a, r) {
    var o = this.GetResourceId();
    StringUtils_1.StringUtils.IsEmpty(o) ||
      ((this.Q1t = i),
      (this.DetailHeadStateRangeInternal = s),
      (this.StateViewDisplayMaxDistance = h),
      (this.StateViewDisplayMinDistance = a),
      this.Z1t.UpdateParams(i),
      (s = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(o))
        ? (this.CreateThenShowByActor(s),
          this.ActiveBattleHeadState(r),
          (this.c_t = !0))
        : ((h =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
          await this.CreateThenShowByPathAsync(h, t, !0),
          this.RootActor && this.ActiveBattleHeadState(r)),
      this.gOa.RegisterTick(this));
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnBeforeDestroyImplementImplement() {
    this.RootActor && this.ResetBattleHeadState();
  }
  DestroyOverride() {
    var t;
    return (
      this.gOa.UnregisterTick(),
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
    this.t_t.Start(),
      this.i_t.Start(),
      (this.HeadStateData = t),
      this.i_t.Stop(),
      this.o_t.Start();
    var t = this.GetHp(),
      i = this.GetMaxHp();
    (this.CurrentBarPercent = t && i ? t / i : 0),
      this.o_t.Stop(),
      this.r_t.Start(),
      this.BindCallback(),
      this.r_t.Stop(),
      this.v_t(0),
      this.n_t.Start(),
      this.RefreshHardnessAttributeId(),
      this.n_t.Stop(),
      this.s_t.Start(),
      this.M_t(),
      this.s_t.Stop(),
      this.a_t.Start(),
      this.InitChildType(14),
      this.ShowBattleVisibleChildView(),
      this.a_t.Stop(),
      (this.NeedCorrectionOutside = !1),
      (this.jht = !0),
      this.t_t.Stop();
  }
  ActivateHideTimeDown(t, i = void 0) {
    this.E_t(),
      t
        ? ((this.J1t = i),
          (this.z1t = TimerSystem_1.TimerSystem.Delay(this.p_t, t)))
        : this.p_t();
  }
  E_t() {
    this.z1t &&
      (TimerSystem_1.TimerSystem.Remove(this.z1t), (this.z1t = void 0));
  }
  SetHeadStateScale(t) {
    this.h_t.Start(),
      Math.abs(this.X1t.Z - t) > this.ScaleToleration &&
        ((this.X1t.X = t),
        (this.X1t.Y = t),
        (this.X1t.Z = t),
        this.RootItem.SetUIRelativeScale3D(this.X1t.ToUeVector(!0))),
      this.h_t.Stop();
  }
  OnCacheRefresh(t, i, e) {
    this.jht && this.gOa.CacheRefreshInfo(t, i, e);
  }
  OnRefresh(t, i, e) {
    this.jht &&
      (this.Ult.Start(),
      (this.Distance = t),
      this.v_t(i),
      this.LerpBarPercent(e),
      this.Ult.Stop());
  }
  v_t(t) {
    this.SetHeadStateScale(t), this.S_t(), this.RefreshHeadStateRotation();
  }
  RefreshHeadStateRotation() {
    this.__t.Start();
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90;
    (Math.abs(i - this.$1t.Yaw) <= UPDATE_TOLERATION &&
      Math.abs(t - this.$1t.Roll) <= UPDATE_TOLERATION) ||
      ((this.$1t.Yaw = i),
      (this.$1t.Pitch = 0),
      (this.$1t.Roll = t),
      this.RootItem.SetUIRelativeRotation(this.$1t.ToUeRotator())),
      this.__t.Stop();
  }
  S_t() {
    this.l_t.Start();
    var t = this.HeadStateData.GetWorldLocation();
    this.NeedCorrectionOutside && this.CheckAndCorrectionOutside(t),
      this.Y1t.Equals(t, UPDATE_TOLERATION) ||
        (this.RootItem.SetUIRelativeLocation(t.ToUeVector()),
        this.Y1t.Set(t.X, t.Y, t.Z)),
      this.l_t.Stop();
  }
  CheckAndCorrectionOutside(t) {
    var i,
      e,
      s,
      h,
      a = t.ToUeVector(),
      r = Global_1.Global.CharacterController;
    UE.GameplayStatics.ProjectWorldToScreen(r, a, this.S$e) &&
      ((i = (a = (0, puerts_1.$unref)(this.S$e)).X),
      (h = a.Y),
      Info_1.Info.IsInTouch() ||
        ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      i <
        -(e =
          (s = ModelManager_1.ModelManager.BattleUiModel.ViewportSize).X *
          this.HeadStateData.CommonParam.OutHorizontalMargin) ||
        i > s.X + e ||
        (i = s.Y * this.HeadStateData.CommonParam.OutTopMargin) < h ||
        ((a.Y = i),
        UE.GameplayStatics.DeprojectScreenToWorld(r, a, this.m_t, this.d_t),
        (e = (0, puerts_1.$unref)(this.m_t)),
        (s = (0, puerts_1.$unref)(this.d_t)),
        this.C_t.FromUeVector(e),
        this.g_t.FromUeVector(s),
        t.Subtraction(this.C_t, this.f_t),
        (h = (this.f_t.Size2D() * this.g_t.Size()) / this.g_t.Size2D()),
        this.C_t.AdditionEqual(this.g_t.MultiplyEqual(h)),
        this.C_t.Z > this.HeadStateData.ActorComponent.ActorLocationProxy.Z &&
          (t.Z = this.C_t.Z)));
  }
  ResetBattleHeadState() {
    this.u_t.Start(),
      this.UnBindCallback(),
      this.StopBarLerpAnimation(),
      this.E_t(),
      (this.jht = !1),
      this.u_t.Stop();
  }
  LerpBarPercent(t) {
    var i;
    -1 === this.K1t ||
      (this.e_t.Start(),
      (i = this.Z1t.UpdatePercent(t)) < 0
        ? this.StopBarLerpAnimation()
        : this.M_t(i),
      this.e_t.Stop(),
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
    var i,
      e = t,
      s = this.CurrentBarPercent;
    s <= e ||
      ((i = this.Z1t.IsOriginState()),
      this.Z1t.GetHit(e, s),
      (this.j1t = e),
      (this.W1t = s),
      (this.CurrentBarPercent = t),
      (this.K1t = 0),
      i && !this.Z1t.IsOriginState() && this.OnBeginBarAnimation(s));
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
      this.HeadStateData.BindOnLevelChanged(this.OnLevelChanged);
  }
  UnBindCallback() {
    this.HeadStateData.UnBindAllCallback();
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
  AddOrRemoveBuff(t, i, e, s) {
    this.OnAddOrRemoveBuff(t, i, e, s);
  }
  RoleLevelChange(t, i, e) {
    this.OnRoleLevelChange(t, i, e);
  }
  ChangeTeam() {
    this.OnChangeTeam();
  }
  OnHardnessAttributeChanged() {
    this.RefreshHardnessAttributeId();
  }
  OnHealthChanged(t) {}
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
exports.HeadStateViewBase = HeadStateViewBase;
//# sourceMappingURL=HeadStateViewBase.js.map
