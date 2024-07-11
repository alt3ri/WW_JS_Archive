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
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
const Info_1 = require("../../../../../Core/Common/Info"),
  UPDATE_TOLERATION = 0.1,
  PERCENT_TOLERATION = 0.01,
  SCALE_TOLERATION = 0.004;
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
      (this.Ult = void 0),
      (this.e_t = void 0),
      (this.t_t = void 0),
      (this.i_t = void 0),
      (this.o_t = void 0),
      (this.r_t = void 0),
      (this.n_t = void 0),
      (this.s_t = void 0),
      (this.a_t = void 0),
      (this.h_t = void 0),
      (this.l_t = void 0),
      (this.__t = void 0),
      (this.u_t = void 0),
      (this.Bst = -0),
      (this.c_t = !1),
      (this.NeedCorrectionOutside = !1),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.m_t = (0, puerts_1.$ref)(void 0)),
      (this.d_t = (0, puerts_1.$ref)(void 0)),
      (this.C_t = Vector_1.Vector.Create()),
      (this.g_t = Vector_1.Vector.Create()),
      (this.f_t = Vector_1.Vector.Create()),
      (this.p_t = () => {
        this.J1t &&
          (this.J1t(this.HeadStateData.GetEntity()), (this.z1t = void 0));
      }),
      (this.OnFallDownVisibleChange = () => {}),
      (this.OnAddOrRemoveBuff = (t, i, s, e) => {}),
      (this.OnRoleLevelChange = (t, i, s) => {}),
      (this.OnChangeTeam = () => {}),
      (this.OnShieldChanged = (t) => {}),
      (this.OnHardnessHideChanged = (t) => {}),
      (this.Zrt = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.ent = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.OnHardnessChanged = (t, i, s) => {}),
      (this.VulnerabilityActivated = (t) => {}),
      (this.OnLevelChanged = (t, i, s) => {});
  }
  async InitializeHeadState(t, i, s, e, h, r, a) {
    var o = this.GetResourceId();
    StringUtils_1.StringUtils.IsEmpty(o) ||
      ((this.Q1t = i),
      (this.DetailHeadStateRangeInternal = e),
      (this.StateViewDisplayMaxDistance = h),
      (this.StateViewDisplayMinDistance = r),
      this.Z1t.UpdateParams(i),
      (e = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(o))
        ? (this.CreateThenShowByActor(e),
          this.ActiveBattleHeadState(a),
          (this.c_t = !0))
        : ((h =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
          await this.CreateThenShowByPathAsync(h, t, !0),
          this.RootActor && this.ActiveBattleHeadState(a)));
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnBeforeDestroyImplementImplement() {
    this.RootActor && this.ResetBattleHeadState();
  }
  DestroyOverride() {
    var t;
    return !(
      !this.c_t ||
      !this.RootActor ||
      ((t = this.GetResourceId()),
      BattleUiControl_1.BattleUiControl.Pool.RecycleHeadStateView(
        t,
        this.RootActor,
      ),
      0)
    );
  }
  ActiveBattleHeadState(t) {
    this.HeadStateData = t;
    var t = this.GetHp(),
      i = this.GetMaxHp();
    (this.CurrentBarPercent = t && i ? t / i : 0),
      this.BindCallback(),
      this.v_t(0),
      this.RefreshHardnessAttributeId(),
      this.M_t(),
      this.InitChildType(14),
      this.ShowBattleVisibleChildView(),
      (this.NeedCorrectionOutside = !1),
      (this.jht = !0);
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
    Math.abs(this.X1t.Z - t) > this.ScaleToleration &&
      ((this.X1t.X = t),
      (this.X1t.Y = t),
      (this.X1t.Z = t),
      this.RootItem.SetUIRelativeScale3D(this.X1t.ToUeVector(!0)));
  }
  OnRefresh(t, i, s) {
    this.jht && ((this.Distance = t), this.v_t(i), this.LerpBarPercent(s));
  }
  v_t(t) {
    this.SetHeadStateScale(t), this.S_t(), this.RefreshHeadStateRotation();
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90;
    (Math.abs(i - this.$1t.Yaw) <= UPDATE_TOLERATION &&
      Math.abs(t - this.$1t.Roll) <= UPDATE_TOLERATION) ||
      ((this.$1t.Yaw = i),
      (this.$1t.Pitch = 0),
      (this.$1t.Roll = t),
      this.RootItem.SetUIRelativeRotation(this.$1t.ToUeRotator()));
  }
  S_t() {
    var t = this.HeadStateData.GetWorldLocation();
    this.NeedCorrectionOutside && this.CheckAndCorrectionOutside(t),
      this.Y1t.Equals(t, UPDATE_TOLERATION) ||
        (this.RootItem.SetUIRelativeLocation(t.ToUeVector()),
        this.Y1t.Set(t.X, t.Y, t.Z));
  }
  CheckAndCorrectionOutside(t) {
    var i,
      s,
      e,
      h,
      r = t.ToUeVector(),
      a = Global_1.Global.CharacterController;
    UE.GameplayStatics.ProjectWorldToScreen(a, r, this.S$e) &&
      ((i = (r = (0, puerts_1.$unref)(this.S$e)).X),
      (h = r.Y),
      Info_1.Info.IsInTouch() ||
        ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      i <
        -(s =
          (e = ModelManager_1.ModelManager.BattleUiModel.ViewportSize).X *
          this.HeadStateData.CommonParam.OutHorizontalMargin) ||
        i > e.X + s ||
        (i = e.Y * this.HeadStateData.CommonParam.OutTopMargin) < h ||
        ((r.Y = i),
        UE.GameplayStatics.DeprojectScreenToWorld(a, r, this.m_t, this.d_t),
        (s = (0, puerts_1.$unref)(this.m_t)),
        (e = (0, puerts_1.$unref)(this.d_t)),
        this.C_t.FromUeVector(s),
        this.g_t.FromUeVector(e),
        t.Subtraction(this.C_t, this.f_t),
        (h = (this.f_t.Size2D() * this.g_t.Size()) / this.g_t.Size2D()),
        this.C_t.AdditionEqual(this.g_t.MultiplyEqual(h)),
        this.C_t.Z > this.HeadStateData.ActorComponent.ActorLocationProxy.Z &&
          (t.Z = this.C_t.Z)));
  }
  ResetBattleHeadState() {
    this.UnBindCallback(),
      this.StopBarLerpAnimation(),
      this.E_t(),
      (this.jht = !1);
  }
  LerpBarPercent(t) {
    var i;
    -1 === this.K1t ||
      ((i = this.Z1t.UpdatePercent(t)) < 0
        ? this.StopBarLerpAnimation()
        : this.M_t(i),
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
      s = t,
      e = this.CurrentBarPercent;
    e <= s ||
      ((i = this.Z1t.IsOriginState()),
      this.Z1t.GetHit(s, e),
      (this.j1t = s),
      (this.W1t = e),
      (this.CurrentBarPercent = t),
      (this.K1t = 0),
      i && !this.Z1t.IsOriginState() && this.OnBeginBarAnimation(e));
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
  AddOrRemoveBuff(t, i, s, e) {
    this.OnAddOrRemoveBuff(t, i, s, e);
  }
  RoleLevelChange(t, i, s) {
    this.OnRoleLevelChange(t, i, s);
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
