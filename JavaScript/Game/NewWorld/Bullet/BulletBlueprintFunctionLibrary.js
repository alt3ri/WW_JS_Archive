"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
  BulletController_1 = require("./BulletController"),
  BulletUtil_1 = require("./BulletUtil");
class BulletBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  static CreateBulletForDebug(t, e) {
    return BulletController_1.BulletController.CreateBulletForDebug(t, e);
  }
  static GetSpecialBulletToSkillId(t, e) {
    return "" !== e
      ? e
      : (e = CharacterBuffIds_1.specialBulletToSkillIdMap.get(t))
        ? e.toString()
        : "";
  }
  static CreateBulletFromGA(t, e, r, l, a = !0, o = void 0) {
    l = BulletBlueprintFunctionLibrary.GetSpecialBulletToSkillId(e, l);
    if ("" === l)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 36, "CreateBulletFromGA的SkillId为空", [
            "bullet",
            e,
          ]),
        -1
      );
    var i = t.GetEntityNoBlueprint()?.GetComponent(34);
    let u = i?.GetLoadingSkill(Number(l))?.CombatMessageId;
    if (!u && i?.Entity?.Id) {
      var n = EntitySystem_1.EntitySystem.GetComponent(
        i?.Entity?.Id,
        0,
      ).GetSummonerId();
      if (0 < n) {
        const t =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(n)?.Entity;
        n = t?.GetComponent(34);
        u = n?.GetLoadingSkill(Number(l))?.CombatMessageId;
      } else {
        n = PhantomUtil_1.PhantomUtil.GetSummonedEntity(
          i?.Entity,
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
        )?.Entity?.GetComponent(34);
        u = n?.GetLoadingSkill(Number(l))?.CombatMessageId;
      }
    }
    i = BulletController_1.BulletController.CreateBulletCustomTarget(
      t,
      e,
      r,
      { SkillId: Number(l), SyncType: a ? 1 : 0, InitTargetLocation: o },
      u,
    );
    return i ? i.Id : -1;
  }
  static GetBulletActorById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) return t.GetComponent(155).Owner;
  }
  static DestroyBullet(t, e) {
    return BulletController_1.BulletController.DestroyBullet(t, e), !0;
  }
  static DestroyAllBullet(t = !1) {
    BulletController_1.BulletController.DestroyAllBullet(t);
  }
  static DestroySpecifiedBullet(t, e, r = !1, l = 0, a = 0) {
    BulletController_1.BulletController.DestroySpecifiedBullet(t, e, r, l, a);
  }
  static GetSpecifiedBulletCount(t, e) {
    return BulletController_1.BulletController.GetSpecifiedBulletCount(t, e);
  }
  static GetCharacterLaunchedBulletIds(t) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      var e = UE.NewArray(UE.BuiltinInt);
      for (const r of t) e.Add(r.Id);
      return e;
    }
  }
  static DebugShowBulletCollision(t, e) {
    ModelManager_1.ModelManager.BulletModel.SetBulletCollisionDraw(e, t);
  }
  static DebugShowBulletTrace(t, e) {
    ModelManager_1.ModelManager.BulletModel.SetBulletTraceDraw(e, t);
  }
  static GetIsShowBulletCollision(t) {
    return ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(t);
  }
  static GetIsShowBulletTrace(t) {
    return ModelManager_1.ModelManager.BulletModel?.ShowBulletTrace(t) ?? !1;
  }
  static FrozenBulletTimeByBulletName(t, e, r) {
    BulletUtil_1.BulletUtil.FrozenCharacterBullet(
      t.GetEntityIdNoBlueprint(),
      e,
      r,
    );
  }
  static SetEntityIdByCustomKey(t, e, r) {
    ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(t, e, r);
  }
  static GetAllBullet() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const r of e) t.Add(r.Id);
    return t;
  }
  static GetBulletTransform(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.ActorComponent
      .ActorTransform;
  }
  static GetBulletAttacker(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.AttackerActorComp
      .Actor;
  }
  static GetBulletCollision(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo
      .CollisionComponent;
  }
  static GetBulletName(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.BulletDataMain
      .BulletName;
  }
  static SetBulletStopHitTrue(t) {
    t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo;
    t && (t.StopHit = !0);
  }
  static SetBulletTarget(t, e) {
    t = BulletBlueprintFunctionLibrary.GetBulletInfo(t);
    e ? t?.SetTargetById(e.GetEntityIdNoBlueprint()) : t?.SetTargetById(0);
  }
  static SetBulletSummon(t) {
    BulletBlueprintFunctionLibrary.GetBulletInfo(
      t,
    )?.ChildInfo?.SetIsActiveSummonChildBullet(!0);
  }
  static SetBulletTransform(t, e) {
    BulletBlueprintFunctionLibrary.GetBulletInfo(
      t,
    )?.ActorComponent.SetActorTransform(e);
  }
  static SetBeginSpeed(t, e) {
    t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.MoveInfo;
    t && (t.BulletSpeedRatio = e);
  }
  static GetBulletInfo(t) {
    return ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
      t,
    )?.GetBulletInfo();
  }
  static CalSectorPoints(e, t, r, l, a, o, i) {
    t.Normalize(MathCommon_1.MathCommon.SmallNumber),
      r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var u = 0 < o ? l / o : l;
    let n = t.RotateAngleAxis((l / 2) * -1, r).op_Multiply(a);
    t = e.op_Addition(n);
    i.Add(t);
    for (let t = 0; t < o; t++) {
      n = n.RotateAngleAxis(u, r);
      var c = e.op_Addition(n);
      i.Add(c);
    }
  }
  static RectangleTriangles(t, e, r, l, a) {
    a.Add(r), a.Add(l), a.Add(e), a.Add(r), a.Add(e), a.Add(t);
  }
  static CalcPipe(t, e, r, l, a, o, i, u, n) {
    e.Normalize(MathCommon_1.MathCommon.SmallNumber),
      r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var c = Vector_1.Vector.Create(r),
      o = (c.MultiplyEqual(o), Vector_1.Vector.Create(t)),
      t = Vector_1.Vector.Create(),
      s = (o.Subtraction(c, t), Vector_1.Vector.Create()),
      o = (o.Addition(c, s), (0, puerts_1.$unref)(u)),
      B = (0, puerts_1.$unref)(n),
      _ =
        (BulletBlueprintFunctionLibrary.CalSectorPoints(
          t.ToUeVector(),
          e,
          r,
          360,
          a,
          i,
          o,
        ),
        o.Num()),
      m =
        (BulletBlueprintFunctionLibrary.CalSectorPoints(
          t.ToUeVector(),
          e,
          r,
          360,
          l,
          i,
          o,
        ),
        o.Num()),
      C =
        (BulletBlueprintFunctionLibrary.CalSectorPoints(
          s.ToUeVector(),
          e,
          r,
          360,
          a,
          i,
          o,
        ),
        o.Num());
    BulletBlueprintFunctionLibrary.CalSectorPoints(
      s.ToUeVector(),
      e,
      r,
      360,
      l,
      i,
      o,
    );
    for (let t = 0; t < _ - 1; t++) {
      var M = m + t,
        b = m + t + 1,
        h = C + t,
        y = C + t + 1;
      BulletBlueprintFunctionLibrary.RectangleTriangles(M, h, b, y, B),
        (M = 0 + t + 1),
        (b = 0 + t),
        (h = _ + t + 1),
        (y = _ + t),
        BulletBlueprintFunctionLibrary.RectangleTriangles(M, h, b, y, B),
        (M = 0 + t),
        (b = 0 + t + 1),
        (h = m + t),
        (y = m + t + 1),
        BulletBlueprintFunctionLibrary.RectangleTriangles(M, h, b, y, B),
        (M = _ + t + 1),
        (b = _ + t),
        (h = C + t + 1),
        (y = C + t),
        BulletBlueprintFunctionLibrary.RectangleTriangles(M, h, b, y, B);
    }
  }
  static CircleTriangles(e, r, l, a, o) {
    for (let t = r; t < l; t++)
      a
        ? (o.Add(e), o.Add(t + 1), o.Add(t))
        : (o.Add(e), o.Add(t), o.Add(t + 1));
  }
  static CalcSector(t, e, r, l, a, o, i, u, n) {
    e.Normalize(MathCommon_1.MathCommon.SmallNumber),
      r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var u = (0, puerts_1.$unref)(u),
      c = (0, puerts_1.$unref)(n),
      n =
        l > MathCommon_1.MathCommon.RoundAngle
          ? MathCommon_1.MathCommon.RoundAngle
          : l,
      l = t.op_Subtraction(r.op_Multiply(o)),
      t = t.op_Addition(r.op_Multiply(o)),
      s =
        (u.Add(l),
        BulletBlueprintFunctionLibrary.CalSectorPoints(l, e, r, n, a, i, u),
        u.Num() - 1),
      B = u.Num(),
      o =
        (u.Add(t),
        BulletBlueprintFunctionLibrary.CalSectorPoints(t, e, r, n, a, i, u),
        u.Num() - 1);
    BulletBlueprintFunctionLibrary.CircleTriangles(0, 1, s, !1, c),
      BulletBlueprintFunctionLibrary.CircleTriangles(B, B + 1, o, !0, c),
      MathUtils_1.MathUtils.IsNearlyEqual(
        n,
        MathCommon_1.MathCommon.RoundAngle,
      ) ||
        (BulletBlueprintFunctionLibrary.RectangleTriangles(1, B + 1, 0, B, c),
        BulletBlueprintFunctionLibrary.RectangleTriangles(0, B, s, o, c));
    for (let t = 1; t < s; t++) {
      var _ = t,
        m = t + 1,
        C = B + _,
        M = B + m;
      BulletBlueprintFunctionLibrary.RectangleTriangles(m, M, _, C, c);
    }
  }
  static CalcBulletInitLocation(a, o, i) {
    var u = o.GetTransform(),
      o = Quat_1.Quat.Create();
    if (
      (Rotator_1.Rotator.Create(0, 90, 0).Quaternion(o),
      u.SetRotation(o.ToUeQuat()),
      3 === a.移动设置.运动轨迹类型)
    ) {
      let t = void 0,
        e = 0,
        r = void 0;
      r =
        0 === a.移动设置.运动轨迹参数目标 ||
        6 === a.移动设置.运动轨迹参数目标 ||
        1 === a.移动设置.运动轨迹参数目标
          ? ((t = u.GetLocation()),
            (e = u.Rotator().Yaw),
            u.GetRotation().GetForwardVector())
          : ((t = i.GetLocation()),
            (e = i.GetRotation().Rotator().Yaw),
            i.GetRotation().Vector());
      o = a.移动设置.运动轨迹参数数据.Get(0);
      let l = r.RotateAngleAxis(o.Y, Vector_1.Vector.UpVector);
      return (
        (l.Z =
          -Math.sin((e + o.Y) * MathCommon_1.MathCommon.DegToRad) *
          Math.tan(o.Z * MathCommon_1.MathCommon.DegToRad)),
        l.Normalize(MathCommon_1.MathCommon.SmallNumber),
        (l = (l = l.op_Multiply(o.X)).op_Addition(t))
      );
    }
    var t = Vector_1.Vector.Create(),
      e = Vector_1.Vector.Create();
    switch (
      (e.FromUeVector(a.基础设置.出生位置偏移), a.基础设置.出生位置基准)
    ) {
      case 0:
      case 6:
        t.FromUeVector(u.TransformPosition(e.ToUeVector()));
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
      case 9:
      case 10:
        t.FromUeVector(i.TransformPosition(e.ToUeVector()));
    }
    return t.ToUeVector();
  }
  static AttachToBone(t, e, r) {
    var l = r.移动设置.子弹跟随类型;
    0 === l
      ? e.K2_AttachToComponent(t, r.移动设置.骨骼名字, 1, 1, 1, !0)
      : 3 === l &&
        (e.K2_AttachToComponent(t, r.移动设置.骨骼名字, 1, 1, 1, !0),
        e.K2_SetActorRelativeLocation(r.基础设置.出生位置偏移, !1, void 0, !1),
        e.K2_SetActorRelativeRotation(
          Rotator_1.Rotator.ZeroRotator,
          !1,
          void 0,
          !0,
        ));
  }
  static CalcBulletInitRotator(t, e, r, l, a) {
    var o = Rotator_1.Rotator.Create();
    if (3 === t.移动设置.运动轨迹类型) return e.K2_GetActorRotation();
    switch (t.移动设置.出生初速度方向基准) {
      case 0:
        var i = e
          .GetActorForwardVector()
          .RotateAngleAxis(90, Vector_1.Vector.UpVector);
        o.FromUeRotator(i.Rotation());
        break;
      case 2:
      case 7:
        o.FromUeRotator(
          UE.KismetMathLibrary.FindLookAtRotation(
            e.K2_GetActorLocation(),
            r.K2_GetActorLocation(),
          ),
        );
        break;
      case 1:
      case 5:
      case 6:
      case 10:
      case 9:
      case 8:
      case 11:
        o.FromUeRotator(
          UE.KismetMathLibrary.FindLookAtRotation(
            e.K2_GetActorLocation(),
            l.GetLocation(),
          ),
        );
        break;
      case 3:
        o.FromUeRotator(a.K2_GetActorRotation());
        break;
      case 4:
        o.FromUeRotator(e.K2_GetActorRotation());
    }
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 21, "CalcBulletInitRotator", ["ret", o]),
      o.ToUeRotator()
    );
  }
  static CalcBulletRotator(e, r, l, a, o) {
    var t = Rotator_1.Rotator.Create(),
      i = Vector_1.Vector.Create();
    switch (e.移动设置.运动轨迹类型) {
      case 0:
        t.FromUeRotator(r.K2_GetActorRotation());
        break;
      case 1:
        break;
      case 2:
        t.FromUeRotator(
          UE.KismetMathLibrary.FindLookAtRotation(r.K2_GetActorLocation(), a),
        );
        break;
      case 3: {
        var u = e.移动设置.运动轨迹参数数据.Get(0),
          n =
            (e.移动设置.移动速度 * o * MathCommon_1.MathCommon.RadToDeg) / u.X;
        i.Set(
          0,
          Math.sin(u.Z * MathCommon_1.MathCommon.DegToRad),
          Math.cos(u.Z * MathCommon_1.MathCommon.DegToRad),
        );
        let t = void 0;
        (u = (t =
          0 === e.移动设置.运动轨迹参数目标 ||
          6 === e.移动设置.运动轨迹参数目标 ||
          1 === e.移动设置.运动轨迹参数目标
            ? l.K2_GetActorLocation()
            : a)
          .op_Subtraction(r.K2_GetActorLocation())
          .RotateAngleAxis(n, i.ToUeVector())),
          (n = t.op_Addition(u));
        r.K2_SetActorRotation(
          UE.KismetMathLibrary.FindLookAtRotation(t, n),
          !1,
        ),
          r.K2_SetActorLocation(n, !1, void 0, !0);
        break;
      }
    }
    return t.ToUeRotator();
  }
  static CalcBulletLocation(t, e, r) {
    return e
      .K2_GetActorLocation()
      .op_Addition(
        e.GetActorForwardVector().op_Multiply(t.移动设置.移动速度 * r),
      );
  }
}
exports.default = BulletBlueprintFunctionLibrary;
//# sourceMappingURL=BulletBlueprintFunctionLibrary.js.map
