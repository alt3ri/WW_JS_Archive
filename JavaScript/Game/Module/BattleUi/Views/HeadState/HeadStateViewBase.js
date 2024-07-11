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
  PlatformController_1 = require("../../../Platform/PlatformController"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView"),
  HpBufferStateMachine_1 = require("./HpBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const UPDATE_TOLERATION = 0.1,
  PERCENT_TOLERATION = 0.01,
  SCALE_TOLERATION = 0.004;
class HeadStateViewBase extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.ScaleToleration = SCALE_TOLERATION),
      (this.CurrentBarPercent = 1),
      (this.xlt = 0),
      (this.wlt = 0),
      (this.Blt = -1),
      (this.xat = !1),
      (this.HeadStateData = void 0),
      (this.blt = 0),
      (this.DetailHeadStateRangeInternal = 0),
      (this.StateViewDisplayMaxDistance = 0),
      (this.StateViewDisplayMinDistance = 0),
      (this.qlt = Vector_1.Vector.Create(0, 0, -1)),
      (this.Glt = Rotator_1.Rotator.Create()),
      (this.Distance = 0),
      (this.HardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.MaxHardnessAttributeId = EAttributeId.Proto_EAttributeType_None),
      (this.Nlt = Vector_1.Vector.Create()),
      (this.Olt = void 0),
      (this.klt = void 0),
      (this.Flt = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.ght = void 0),
      (this.Vlt = void 0),
      (this.Hlt = void 0),
      (this.jlt = void 0),
      (this.Wlt = void 0),
      (this.Klt = void 0),
      (this.Qlt = void 0),
      (this.Xlt = void 0),
      (this.$lt = void 0),
      (this.Ylt = void 0),
      (this.Jlt = void 0),
      (this.zlt = void 0),
      (this.Zlt = void 0),
      (this.Snt = -0),
      (this.e1t = !1),
      (this.NeedCorrectionOutside = !1),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.t1t = (0, puerts_1.$ref)(void 0)),
      (this.i1t = (0, puerts_1.$ref)(void 0)),
      (this.o1t = Vector_1.Vector.Create()),
      (this.r1t = Vector_1.Vector.Create()),
      (this.n1t = Vector_1.Vector.Create()),
      (this.s1t = () => {
        this.Olt &&
          (this.Olt(this.HeadStateData.GetEntity()), (this.klt = void 0));
      }),
      (this.OnFallDownVisibleChange = () => {}),
      (this.OnAddOrRemoveBuff = (t, i, s, e) => {}),
      (this.OnRoleLevelChange = (t, i, s) => {}),
      (this.OnChangeTeam = () => {}),
      (this.OnShieldChanged = (t) => {}),
      (this.OnHardnessHideChanged = (t) => {}),
      (this.Fot = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.Vot = (t) => {
        this.OnHardnessAttributeChanged();
      }),
      (this.OnHardnessChanged = (t, i, s) => {}),
      (this.VulnerabilityActivated = (t) => {}),
      (this.OnLevelChanged = (t, i, s) => {});
  }
  async InitializeHeadState(t, i, s, e, h, r, a) {
    var o = this.GetResourceId();
    StringUtils_1.StringUtils.IsEmpty(o) ||
      ((this.blt = i),
      (this.DetailHeadStateRangeInternal = e),
      (this.StateViewDisplayMaxDistance = h),
      (this.StateViewDisplayMinDistance = r),
      this.Flt.UpdateParams(i),
      (e = BattleUiControl_1.BattleUiControl.Pool.GetHeadStateView(o))
        ? (this.CreateThenShowByActor(e),
          this.ActiveBattleHeadState(a),
          (this.e1t = !0))
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
      !this.e1t ||
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
      this.a1t(0),
      this.RefreshHardnessAttributeId(),
      this.h1t(),
      this.InitChildType(14),
      this.ShowBattleVisibleChildView(),
      (this.NeedCorrectionOutside = !1),
      (this.xat = !0);
  }
  ActivateHideTimeDown(t, i = void 0) {
    this.l1t(),
      t
        ? ((this.Olt = i),
          (this.klt = TimerSystem_1.TimerSystem.Delay(this.s1t, t)))
        : this.s1t();
  }
  l1t() {
    this.klt &&
      (TimerSystem_1.TimerSystem.Remove(this.klt), (this.klt = void 0));
  }
  SetHeadStateScale(t) {
    Math.abs(this.qlt.Z - t) > this.ScaleToleration &&
      ((this.qlt.X = t),
      (this.qlt.Y = t),
      (this.qlt.Z = t),
      this.RootItem.SetUIRelativeScale3D(this.qlt.ToUeVector(!0)));
  }
  OnRefresh(t, i, s) {
    this.xat && ((this.Distance = t), this.a1t(i), this.LerpBarPercent(s));
  }
  a1t(t) {
    this.SetHeadStateScale(t), this._1t(), this.RefreshHeadStateRotation();
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator,
      i = t.Yaw + 90,
      t = t.Pitch - 90;
    (Math.abs(i - this.Glt.Yaw) <= UPDATE_TOLERATION &&
      Math.abs(t - this.Glt.Roll) <= UPDATE_TOLERATION) ||
      ((this.Glt.Yaw = i),
      (this.Glt.Pitch = 0),
      (this.Glt.Roll = t),
      this.RootItem.SetUIRelativeRotation(this.Glt.ToUeRotator()));
  }
  _1t() {
    var t = this.HeadStateData.GetWorldLocation();
    this.NeedCorrectionOutside && this.CheckAndCorrectionOutside(t),
      this.Nlt.Equals(t, UPDATE_TOLERATION) ||
        (this.RootItem.SetUIRelativeLocation(t.ToUeVector()),
        this.Nlt.Set(t.X, t.Y, t.Z));
  }
  CheckAndCorrectionOutside(t) {
    var i,
      s,
      e,
      h,
      r = t.ToUeVector(),
      a = Global_1.Global.CharacterController;
    UE.GameplayStatics.ProjectWorldToScreen(a, r, this._Xe) &&
      ((i = (r = (0, puerts_1.$unref)(this._Xe)).X),
      (h = r.Y),
      PlatformController_1.PlatformController.IsMobile() ||
        ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      i <
        -(s =
          (e = ModelManager_1.ModelManager.BattleUiModel.ViewportSize).X *
          this.HeadStateData.CommonParam.OutHorizontalMargin) ||
        i > e.X + s ||
        (i = e.Y * this.HeadStateData.CommonParam.OutTopMargin) < h ||
        ((r.Y = i),
        UE.GameplayStatics.DeprojectScreenToWorld(a, r, this.t1t, this.i1t),
        (s = (0, puerts_1.$unref)(this.t1t)),
        (e = (0, puerts_1.$unref)(this.i1t)),
        this.o1t.FromUeVector(s),
        this.r1t.FromUeVector(e),
        t.Subtraction(this.o1t, this.n1t),
        (h = (this.n1t.Size2D() * this.r1t.Size()) / this.r1t.Size2D()),
        this.o1t.AdditionEqual(this.r1t.MultiplyEqual(h)),
        this.o1t.Z > this.HeadStateData.ActorComponent.ActorLocationProxy.Z &&
          (t.Z = this.o1t.Z)));
  }
  ResetBattleHeadState() {
    this.UnBindCallback(),
      this.StopBarLerpAnimation(),
      this.l1t(),
      (this.xat = !1);
  }
  LerpBarPercent(t) {
    var i;
    -1 === this.Blt ||
      ((i = this.Flt.UpdatePercent(t)) < 0
        ? this.StopBarLerpAnimation()
        : this.h1t(i),
      this.xlt >= this.wlt) ||
      (this.Blt = this.Blt + t);
  }
  h1t(t) {
    Math.abs(this.Snt - t) < PERCENT_TOLERATION ||
      (t
        ? this.OnLerpBarBufferPercent(t)
        : this.OnLerpBarBufferPercent(this.CurrentBarPercent),
      (this.Snt = t));
  }
  OnLerpBarBufferPercent(t) {}
  PlayBarAnimation(t) {
    var i,
      s = t,
      e = this.CurrentBarPercent;
    e <= s ||
      ((i = this.Flt.IsOriginState()),
      this.Flt.GetHit(s, e),
      (this.xlt = s),
      (this.wlt = e),
      (this.CurrentBarPercent = t),
      (this.Blt = 0),
      i && !this.Flt.IsOriginState() && this.OnBeginBarAnimation(e));
  }
  OnBeginBarAnimation(t) {}
  StopBarLerpAnimation() {
    (this.xlt = 0), (this.wlt = 0), (this.Blt = -1), this.Flt.Reset();
  }
  get HeadStateType() {
    return this.blt;
  }
  BindCallback() {
    this.HeadStateData.BindOnShieldChanged(this.OnShieldChanged),
      this.HeadStateData.BindOnFallDownVisibleChange(
        this.OnFallDownVisibleChange,
      ),
      this.HeadStateData.BindOnHardnessHideChanged(this.OnHardnessHideChanged),
      this.HeadStateData.BindOnHardnessActivated(this.Fot),
      this.HeadStateData.BindOnRageActivated(this.Vot),
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
