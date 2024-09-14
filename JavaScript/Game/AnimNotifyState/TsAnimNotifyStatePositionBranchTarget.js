"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  BlackboardController_1 = require("../World/Controller/BlackboardController"),
  INVALID_LAST_LOCATION_THRESHOLD_SQUARED = 4e6;
class PositionBranchTargetParams {
  constructor() {
    (this.CharActorComp = void 0),
      (this.CharUnifiedComp = void 0),
      (this.CharSkillComp = void 0),
      (this.TargetActorComp = void 0),
      (this.TargetCharActorComp = void 0),
      (this.NowTime = -0),
      (this.TotalTime = -0),
      (this.SocketName = ""),
      (this.LastLocation = Vector_1.Vector.Create());
  }
  RefreshTarget(i) {
    if (
      (this.TargetActorComp?.Entity?.Valid ||
        ((this.TargetActorComp = void 0), (this.TargetCharActorComp = void 0)),
      i)
    ) {
      let t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
        this.CharActorComp.Entity.Id,
        i,
      );
      if (
        !t &&
        !(t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
          this.CharActorComp.Entity.Id,
          i,
        ))
      )
        return !1;
      i = EntitySystem_1.EntitySystem.Get(t);
      if (!i?.Valid) return !1;
      if (
        this.TargetActorComp?.Entity?.Valid &&
        this.TargetActorComp.Entity.Id === i.Id
      )
        return !1;
      (this.TargetActorComp = i.GetComponent(1)),
        (this.TargetCharActorComp = void 0),
        (this.SocketName = "");
    } else {
      i = this.CharSkillComp?.GetSkillTargetForAns();
      if (!i) return !1;
      if (
        this.TargetActorComp?.Entity?.Valid &&
        i.Id === this.TargetActorComp.Entity.Id
      )
        return !1;
      (this.TargetActorComp = i.Entity.GetComponent(1)),
        (this.TargetCharActorComp = i.Entity.GetComponent(3)),
        (this.SocketName = this.CharSkillComp.SkillTargetSocket);
    }
    return this.LastLocation.DeepCopy(this.CharActorComp.LastActorLocation), !0;
  }
  Clear() {
    (this.CharActorComp = void 0),
      (this.CharUnifiedComp = void 0),
      (this.CharSkillComp = void 0),
      (this.TargetActorComp = void 0),
      (this.TargetCharActorComp = void 0),
      (this.SocketName = "");
  }
}
const paramPool = new Array(),
  paramMap = new Map();
class TsAnimNotifyStatePositionBranchTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MoveCurve = void 0),
      (this.Distance = 30),
      (this.MaxSpeed = 2e3),
      (this["是否永远面向目标"] = !0),
      (this["忽略Z轴方向"] = !0),
      (this["永远修正Z轴"] = !1),
      (this["忽略双方半径"] = !1),
      (this.IsShareTarget = !1),
      (this.TargetOffset = void 0),
      (this.TargetRotation = void 0),
      (this["允许反向移动"] = !1),
      (this["允许正向移动"] = !0),
      (this["黑板值"] = ""),
      (this.IsInitialize = !1),
      (this.TsMoveCurve = void 0),
      (this.TsDistance = -0),
      (this.TsMaxSpeed = -0),
      (this.TsLookAtTarget = !1),
      (this.TsIgnoreZ = !1),
      (this.TsAlwaysMoveZ = !1),
      (this.TsIgnoreRadius = !1),
      (this.TsIsShareTarget = !1),
      (this.TsTargetOffset = void 0),
      (this.TargetPos = void 0),
      (this.TmpVector = void 0),
      (this.TmpVector2 = void 0),
      (this.TmpRotator = void 0),
      (this.TmpQuat = void 0),
      (this.TsAllowReverseMovement = !1),
      (this.TsAllowForwardMovement = !0),
      (this.TsBlackboardKey = "");
  }
  Initialize() {
    (this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitialize = !0),
      (this.TsMoveCurve = this.MoveCurve),
      (this.TsDistance = this.Distance),
      (this.TsMaxSpeed = this.MaxSpeed),
      (this.TsLookAtTarget = this.是否永远面向目标),
      (this.TsIgnoreZ = this.忽略Z轴方向),
      (this.TsAlwaysMoveZ = this.永远修正Z轴),
      (this.TsIgnoreRadius = this.忽略双方半径),
      (this.TsIsShareTarget = this.IsShareTarget),
      (this.TsAllowReverseMovement = this.允许反向移动),
      (this.TsAllowForwardMovement = this.允许正向移动),
      (this.TsBlackboardKey = this.黑板值),
      (this.TsTargetOffset = Vector_1.Vector.Create(this.TargetOffset)),
      (this.TmpRotator = Rotator_1.Rotator.Create(this.TargetRotation)),
      (this.TmpQuat = Quat_1.Quat.Create()),
      this.TmpRotator.Quaternion(this.TmpQuat),
      this.TmpQuat.RotateVector(this.TsTargetOffset, this.TsTargetOffset),
      (this.TargetPos = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()));
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    t = t.CharacterActorComponent;
    if (!t) return !1;
    var h,
      r = t.Entity.GetComponent(34);
    let e = void 0;
    if (
      !(e =
        (this.TsIsShareTarget &&
          ((h = t.Entity.GetComponent(49)),
          (e = EntitySystem_1.EntitySystem.Get(h.RoleId)?.GetComponent(34)))) ||
        r)
    )
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Test", 6, "No SkillComponent", [
            "Actor",
            t.Actor.GetName(),
          ]),
        !1
      );
    let a = paramMap.get(t.Entity.Id);
    return (
      ((a =
        a ||
        (paramPool.length
          ? paramPool.pop()
          : new PositionBranchTargetParams())).CharActorComp = t),
      (a.CharUnifiedComp = t.Entity.GetComponent(161)),
      (a.CharSkillComp = e),
      a.RefreshTarget(this.TsBlackboardKey),
      (a.NowTime = 0),
      (a.TotalTime = s),
      a.TargetActorComp
        ? paramMap.set(t.Entity.Id, a)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Movement", 6, "BranchTarget No Target"),
      !0
    );
  }
  K2_NotifyTick(t, i, s) {
    return (
      !(s < MathUtils_1.MathUtils.KindaSmallNumber) &&
      (t = t.GetOwner()) instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent), !!(t = paramMap.get(t.Entity.Id))) &&
      (t.RefreshTarget(this.TsBlackboardKey),
      t.TargetActorComp &&
        (this.MoveToTarget(s, t),
        t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy)),
      (t.NowTime += s),
      !0)
    );
  }
  K2_NotifyEnd(t, i) {
    var s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent), !!(s = paramMap.get(t.Entity.Id))) &&
      (paramMap.delete(t.Entity.Id), s.Clear(), paramPool.push(s), !0)
    );
  }
  GetTargetPos(t, i) {
    t.SocketName && t.TargetCharActorComp?.Actor
      ? i.FromUeVector(
          t.TargetCharActorComp.Actor.Mesh.GetSocketLocation(
            FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName),
          ),
        )
      : i.DeepCopy(t.TargetActorComp.ActorLocationProxy),
      t.TargetActorComp.ActorQuatProxy.RotateVector(
        this.TsTargetOffset,
        this.TmpVector,
      ),
      i.AdditionEqual(this.TmpVector);
  }
  GetTowardVector(t, i) {
    this.GetTargetPos(t, this.TargetPos),
      this.TargetPos.Subtraction(
        t.CharActorComp.ActorLocationProxy,
        this.TmpVector,
      ),
      this.TargetPos.Subtraction(t.LastLocation, this.TmpVector2);
    t = this.TmpVector.DotProduct(this.TmpVector2);
    return (
      i.DeepCopy(this.TmpVector),
      this.TsIgnoreZ && (i.Z = 0),
      t < 0 ? -1 : i.Size2D()
    );
  }
  GetRate(t, i) {
    let s = 1;
    t = i.NowTime + t;
    if (i.TotalTime <= t) s = 1;
    else if (this.TsMoveCurve) {
      var h = this.TsMoveCurve.GetFloatValue(i.NowTime / i.TotalTime),
        r = this.TsMoveCurve.GetFloatValue(t / i.TotalTime);
      if (1 <= h) return 0;
      s = (r - h) / (1 - h);
    } else {
      (r = MathUtils_1.MathUtils.GetCubicValue(i.NowTime / i.TotalTime)),
        (h = MathUtils_1.MathUtils.GetCubicValue(t / i.TotalTime));
      if (1 <= r) return 0;
      s = (h - r) / (1 - r);
    }
    return s;
  }
  MoveToTarget(t, i) {
    var s = this.GetTowardVector(i, this.TmpVector);
    let h = this.TsDistance;
    if (
      (this.TsIgnoreRadius ||
        ((h += i.CharActorComp.ScaledRadius),
        i.TargetCharActorComp &&
          !i.SocketName &&
          (h += i.TargetCharActorComp.ScaledRadius)),
      s > MathUtils_1.MathUtils.KindaSmallNumber &&
        ((h < s && this.TsAllowForwardMovement) ||
          (h > s && this.TsAllowReverseMovement)))
    ) {
      if (this.TsMaxSpeed <= 0) return;
      var s = this.GetRate(t, i);
      if (s <= 0) return;
      var r = this.TmpVector.Size(),
        s = MathUtils_1.MathUtils.Clamp(
          (r - h) * s,
          -this.TsMaxSpeed * t,
          this.TsMaxSpeed * t,
        );
      this.TmpVector.MultiplyEqual(s / r);
    } else
      i.LastLocation.Subtraction(
        i.CharActorComp.ActorLocationProxy,
        this.TmpVector,
      ),
        this.TsAlwaysMoveZ && !this.TsIgnoreZ
          ? ((s = this.GetRate(t, i)),
            (this.TmpVector.Z = MathUtils_1.MathUtils.Clamp(
              (this.TargetPos.Z - i.CharActorComp.ActorLocationProxy.Z) * s,
              -this.TsMaxSpeed * t,
              this.TsMaxSpeed * t,
            )))
          : (this.TmpVector.Z = 0),
        this.TmpVector.SizeSquared() >
          INVALID_LAST_LOCATION_THRESHOLD_SQUARED &&
          (this.TmpVector.Reset(), Log_1.Log.CheckWarn()) &&
          Log_1.Log.Warn(
            "Movement",
            6,
            "LastLocation太远，很危险，无视掉",
            ["Actor", i.CharActorComp?.Actor.GetName()],
            ["Last", i.LastLocation],
            ["ActorLast", i.CharActorComp?.LastActorLocation],
            ["Now", i.CharActorComp?.ActorLocationProxy],
          );
    i.CharActorComp.MoveComp.MoveCharacter(
      this.TmpVector,
      t,
      "TsAnimNotifyStatePositionBranchTarget",
    ),
      this.TsLookAtTarget &&
        (this.TargetPos.Subtraction(
          i.CharActorComp.ActorLocationProxy,
          this.TmpVector,
        ),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.TmpVector,
          Vector_1.Vector.UpVectorProxy,
          this.TmpQuat,
        ),
        this.TmpQuat.Rotator(this.TmpRotator),
        i.CharActorComp.SetActorRotation(
          this.TmpRotator.ToUeRotator(),
          "TsAnimNotifyStatePositionBranchTarget",
          !1,
        ));
  }
  GetNotifyName() {
    return "位移吸附到目标位置";
  }
}
exports.default = TsAnimNotifyStatePositionBranchTarget;
//# sourceMappingURL=TsAnimNotifyStatePositionBranchTarget.js.map
