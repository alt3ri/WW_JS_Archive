"use strict";
var CharacterSkillComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        h = arguments.length,
        a =
          h < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, i, e, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (r = t[o]) &&
            (a = (h < 3 ? r(a) : 3 < h ? r(i, e, a) : r(i, e)) || a);
      return 3 < h && a && Object.defineProperty(i, e, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillComponent = void 0);
const Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../../Global"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("../Move/CustomMovementDefine"),
  BaseSkillComponent_1 = require("./BaseSkillComponent"),
  ROLLING_GROUNDED_RECOVER_TIME = 600;
let CharacterSkillComponent =
  (CharacterSkillComponent_1 = class CharacterSkillComponent extends (
    BaseSkillComponent_1.BaseSkillComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Yzr = Stats_1.Stat.Create("DoSkillBegin5 SetAnimState")),
        (this.Jzr = Stats_1.Stat.Create("DoSkillBegin6 Target&Rotation")),
        (this.zzr = Stats_1.Stat.Create("DoSkillBegin7 SetMoveState")),
        (this.ActorComp = void 0),
        (this.Gce = void 0),
        (this.mBe = void 0),
        (this.oRe = void 0),
        (this.fZr = () => {
          this.TagComp.HasTag(-1371021686) ||
            (CombatLog_1.CombatLog.Info(
              "Skill",
              this.Entity,
              "疑难杂症debug日志，RollingGroundedDelay",
            ),
            (this.IsMainSkillReadyEnd = !0)),
            (this.pZr = void 0);
        }),
        (this.pZr = void 0),
        (this.DZr = 0),
        (this.RZr = 0);
    }
    OnInitData() {
      return (
        !!super.OnInitData() &&
        ((this.ActorComp = this.Entity.GetComponent(3)),
        CharacterSkillComponent_1.AZr ||
          ((CharacterSkillComponent_1.PZr =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "jump_priority",
            )),
          (CharacterSkillComponent_1.xZr =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "fly_priority",
            )),
          (CharacterSkillComponent_1.AZr = !0)),
        !0)
      );
    }
    OnInit() {
      return (
        !!super.OnInit() &&
        ((this.Gce = this.Entity.GetComponent(176)),
        (this.mBe = this.Entity.CheckGetComponent(173)),
        (this.oRe = this.Entity.GetComponent(175)),
        !0)
      );
    }
    OnEnd() {
      return (
        !!super.OnEnd() &&
        ((this.DZr = 0),
        void (this.RZr = 0) !== this.pZr &&
          (TimerSystem_1.TimerSystem.Remove(this.pZr), (this.pZr = void 0)),
        !0)
      );
    }
    DoSkillBeginMoveAction(t, i) {
      this.Yzr.Start(),
        this.mBe.ExitHitState("释放技能"),
        t.HasAnimTag || this.mBe.ExitAimStatus(),
        this.Yzr.Stop(),
        this.Jzr.Start(),
        this.SetSkillTargetDirection(
          i.SkillDirection,
          i.SkillTarget.SkillTargetPriority,
        ),
        this.Jzr.Stop(),
        this.zzr.Start(),
        this.RGl(t.SkillId, i),
        this.zzr.Stop();
    }
    SetSkillTargetDirection(t, i = 0) {
      if (this.LockOnComp?.Valid)
        switch (t) {
          case 0:
            this.SkillTarget?.Valid
              ? this.ZZr()
              : 6 === i
                ? this.ten()
                : this.een();
            break;
          case 1:
            this.een();
            break;
          case 3:
            this.ten();
        }
    }
    een() {
      this.ActorComp.IsAutonomousProxy &&
        this.IsHasInputDir() &&
        (this.TmpRotator.FromUeRotator(this.oen()),
        this.TmpTransform.Set(
          this.ActorComp.ActorLocationProxy,
          this.TmpRotator.Quaternion(),
          this.ActorComp.ActorScaleProxy,
        ),
        this.ActorComp.SetActorTransform(
          this.TmpTransform.ToUeTransform(),
          "释放技能.转向输入方向",
          !1,
          1,
        ));
    }
    IsHasInputDir() {
      var t;
      return (
        !!this.CheckIsLoaded() &&
        ((t = this.ActorComp.InputDirectProxy),
        0 < Math.abs(t.X) || 0 < Math.abs(t.Y))
      );
    }
    ten() {
      this.TmpRotator.FromUeRotator(
        Global_1.Global.CharacterCameraManager.GetCameraRotation(),
      ),
        this.TmpRotator.Vector(this.TmpVector),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.TmpVector,
          this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy,
          this.TmpRotator,
        ),
        this.TmpTransform.Set(
          this.ActorComp.ActorLocationProxy,
          this.TmpRotator.Quaternion(),
          this.ActorComp.ActorScaleProxy,
        ),
        this.ActorComp.SetActorTransform(
          this.TmpTransform.ToUeTransform(),
          "释放技能.转向摄像机方向",
          !1,
          1,
        );
    }
    ZZr() {
      this.SkillTarget &&
        (this.TmpVector.FromUeVector(this.GetTargetTransform().GetLocation()),
        this.TmpVector.SubtractionEqual(this.ActorComp.ActorLocationProxy),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.TmpVector,
          this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy,
          this.TmpRotator,
        ),
        this.ActorComp.SetActorRotation(
          this.TmpRotator.ToUeRotator(),
          "释放技能.转向技能目标",
          !1,
        ));
    }
    oen() {
      return this.ActorComp.InputRotatorProxy;
    }
    RGl(t, i) {
      if (
        (i.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!1),
        i.SkillStepUp && this.Gce.SetStepUpParamsRecord(!1),
        BaseSkillComponent_1.SKILL_GROUP_MAIN === i.GroupId)
      ) {
        this.Gce &&
          6 === this.Gce.CharacterMovement.MovementMode &&
          ((i = this.Gce.CharacterMovement.CustomMovementMode) ===
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE
            ? (e = this.Entity.GetComponent(58)).Valid && e.ExitGlideState()
            : i === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR &&
              (e = this.Entity.GetComponent(58)).Valid &&
              e.ExitSoarState());
        var e,
          s,
          i = this.mBe.MoveState;
        switch (i) {
          case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
            this.TagComp.HasTag(-1800191060) ||
              (this.TagComp.RemoveTag((s = 388142570)),
              this.BuffComp?.RemoveBuffByTag(s, `技能${t}结束移动`),
              this.mBe.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Run,
              ));
            break;
          case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
          case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
          case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
            this.mBe.SetMoveState(
              CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
            );
        }
      }
      (this.Gce.CharacterMovement.OverrideTerminalVelocity = 99999),
        this.Gce.SetFallingHorizontalMaxSpeed(99999);
    }
    DoSkillEndMoveAction(t) {
      t.WalkOffLedge && this.Gce.SetWalkOffLedgeRecord(!0),
        t.SkillStepUp && this.Gce.SetStepUpParamsRecord(!0),
        (this.Gce.CharacterMovement.OverrideTerminalVelocity = 0),
        this.Gce.ClearFallingHorizontalMaxSpeed();
    }
    OnBeforePlaySkillMontage() {
      this.mBe.ExitHitState("播放技能蒙太奇");
    }
    GetMainAnimInstance() {
      return this.oRe.MainAnimInstance;
    }
    RollingGrounded() {
      (this.IsMainSkillReadyEnd = !1),
        (this.pZr = TimerSystem_1.TimerSystem.Delay(
          this.fZr,
          ROLLING_GROUNDED_RECOVER_TIME,
        )),
        this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.mBe.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll,
          );
    }
    UpdateAllSkillRotator(t) {
      if (!this.CheckIsLoaded() || !this.Gce) return !1;
      if (this.TagComp.HasTag(504239013)) return !1;
      if (!this.SkillCanRotateInternal) return !1;
      if (!this.ActorComp.IsMoveAutonomousProxy) return !1;
      var i = Math.abs(this.SkillRotateSpeedInternal);
      if (this.SkillRotateToTargetInternal) {
        var e = this.GetCurrentSkillRotateDirect();
        if (!e) return !1;
        MathUtils_1.MathUtils.LookRotationUpFirst(
          e,
          this.ActorComp?.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy,
          this.TmpRotator,
        ),
          this.Gce.SmoothCharacterRotation(
            this.TmpRotator,
            i,
            t,
            !1,
            "Skill.UpdateAllSkillRotator",
          );
      } else
        this.Gce.SmoothCharacterRotation(
          this.oen(),
          i,
          t,
          !1,
          "Skill.UpdateAllSkillRotator",
        );
      return !0;
    }
    CheckJumpCanInterrupt() {
      return this.DoCheckInterrupt(
        BaseSkillComponent_1.SKILL_GROUP_MAIN,
        CharacterSkillComponent_1.PZr,
      );
    }
    CheckGlideCanInterrupt() {
      return this.DoCheckInterrupt(
        BaseSkillComponent_1.SKILL_GROUP_MAIN,
        CharacterSkillComponent_1.xZr,
      );
    }
    get SkillElevationAngle() {
      return this.DZr;
    }
    SetSkillElevationAngle(t) {
      this.DZr = t;
    }
    get LastActivateSkillTime() {
      return this.RZr;
    }
    SetLastActivateSkillTime(t) {
      this.RZr = t;
    }
    GetReplaceEffect(t) {
      return this.ActorComp?.GetReplaceEffect(t);
    }
  });
(CharacterSkillComponent.AZr = !1),
  (CharacterSkillComponent.PZr = 0),
  (CharacterSkillComponent.xZr = 0),
  (CharacterSkillComponent = CharacterSkillComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(39)],
      CharacterSkillComponent,
    )),
  (exports.CharacterSkillComponent = CharacterSkillComponent);
//# sourceMappingURL=CharacterSkillComponent.js.map
