"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatrolMoveLogic = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CharacterActorComponent_1 = require("../CharacterActorComponent"),
  MoveToLocationLogic_1 = require("./MoveToLocationLogic"),
  FIX_LOCATION_TOLERANCE = 2,
  PROFILE_KEY = "PatrolMoveLogic_ResetActorLocation",
  RESET_LOCATION_TOLERANCE = 10;
class PatrolMoveLogic {
  constructor() {
    (this.Entity = void 0),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.mBe = void 0),
      (this.sJo = !1),
      (this.lJo = 0),
      (this.nJo = 0),
      (this.Gco = Rotator_1.Rotator.Create()),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.jJo = Quat_1.Quat.Create()),
      (this.nRi = -0),
      (this.WJo = Vector_1.Vector.Create()),
      (this.KJo = Vector_1.Vector.Create(0, 0, 0)),
      (this.XJo = 0),
      (this.NOe = 0),
      (this.$Jo = Vector_1.Vector.Create()),
      (this.YJo = []),
      (this.JJo = void 0);
  }
  Init(t) {
    (this.Entity = t),
      (this.Hte = t.CheckGetComponent(3)),
      (this.oRe = t.CheckGetComponent(162)),
      (this.mBe = t.GetComponent(91)),
      this.zJo();
  }
  GetMovePoint(t) {
    if (0 <= t && t < this.YJo.length) return this.YJo[t];
  }
  UpdateMovePath(t, i, s, e) {
    (this.YJo.length = 0),
      this.YJo.push(...t),
      (this.nJo = e),
      (this.sJo = i),
      (this.lJo = s),
      (this.NOe = 0),
      this.ZJo(1);
  }
  StopMove() {
    (this.YJo.length = 0), (this.XJo = 0), (this.NOe = 0);
  }
  UpdateMove(t, i) {
    if (!this.GetMovePoint(this.NOe)) return this.StopMove(), !1;
    for (
      GlobalData_1.GlobalData.IsPlayInEditor &&
        MoveToLocationLogic_1.MoveToLocationController.DebugDraw &&
        this.IJo(),
        this.ezo();
      this.tzo();

    ) {
      if (this.NOe === this.YJo.length - 1) return !1;
      this.ZJo(this.NOe + 1);
    }
    return (
      this.WJo.Normalize(),
      this.mBe &&
      this.mBe.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb
        ? (this.jJo.DeepCopy(this.Hte.ActorQuatProxy),
          this.jJo.Inverse(this.jJo),
          this.jJo.RotateVector(this.WJo, this.WJo),
          this.Hte.SetInputDirect(this.WJo))
        : (this.Hte.SetOverrideTurnSpeed(this.lJo),
          this.sJo
            ? this.Hte.SetInputDirect(this.Hte.ActorForwardProxy)
            : this.Hte.SetInputDirect(this.WJo),
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            this.Hte,
            this.WJo,
            this.lJo,
            this.sJo,
          )),
      !0
    );
  }
  ZJo(t) {
    (this.XJo = this.NOe),
      (this.NOe = t),
      (this.$Jo = this.YJo[this.NOe]),
      this.ezo(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "UpdateMovePoint",
          ["EntityId", this.Entity.Id],
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["CurrentIndex", this.NOe],
          ["CurrentToLocation", this.$Jo],
        );
  }
  ezo() {
    this.WJo.DeepCopy(this.$Jo),
      this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.sJo || (this.WJo.Z = 0),
      (this.nRi = this.WJo.Size());
  }
  tzo() {
    if (this.XJo === this.NOe || this.nRi <= this.nJo)
      return (
        this.ozo(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "到达目标位置",
            ["EntityId", this.Entity.Id],
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["distance", this.nRi],
            ["index", this.NOe],
          ),
        !0
      );
    this.$Jo.Subtraction(this.YJo[this.XJo], this.jye),
      (this.jye.Z = 0),
      this.RTe.DeepCopy(this.WJo),
      (this.RTe.Z = 0);
    var t = this.RTe.DotProduct(this.jye);
    return (
      (t < 0 || this.nRi < this.nJo) &&
        (this.ozo(), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "AI",
          43,
          "经过了目标位置",
          ["EntityId", this.Entity.Id],
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["distance", this.nRi],
          ["index", this.NOe],
          ["dotProduct", t],
        ),
      t < 0 || this.nRi < this.nJo
    );
  }
  ozo() {
    this.jye.DeepCopy(this.$Jo),
      this.sJo || (this.jye.Z += this.Hte.HalfHeight),
      this.KJo.DeepCopy(this.jye),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "ResetActorLocation",
          ["EntityId", this.Entity.Id],
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["LastPatrolPoint", this.KJo],
          ["CurrentPoint", this.Hte.ActorLocationProxy],
        );
  }
  ResetLastPointCondition() {
    return !(
      this.KJo.Size() < 1 ||
      (Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy) <
        this.nJo + RESET_LOCATION_TOLERANCE &&
        (this.KJo.Set(0, 0, 0), 1))
    );
  }
  ResetLastPatrolPoint(t, i) {
    var s;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        43,
        "Reset目标位置",
        ["EntityId", this.Entity.Id],
        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
        ["deltaSeconds", t],
        ["LastPatrolPoint", this.KJo],
        ["CurrentPoint", this.Hte.ActorLocationProxy],
        [
          "Distance",
          Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy),
        ],
      ),
      this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1),
      this.Hte.ClearInput(),
      this.oRe && this.Entity.GetTickInterval() <= 1
        ? ((s = this.oRe.GetMeshTransform()),
          this.rzo(i),
          this.oRe.SetModelBuffer(
            s,
            t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))
        : this.rzo(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "Reset目标位置结束",
          ["EntityId", this.Entity.Id],
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["ActorLocation", this.Hte.ActorLocationProxy],
          [
            "Distance",
            Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy),
          ],
        ),
      this.KJo.Set(0, 0, 0);
  }
  rzo(t) {
    this.sJo || this.nzo(this.KJo, this.KJo),
      t
        ? (this.jye.DeepCopy(this.WJo),
          this.jye.ToOrientationRotator(this.Gco),
          this.Hte.SetActorLocationAndRotation(
            this.KJo.ToUeVector(),
            this.Gco.ToUeRotator(),
            "拉回目标点设置坐标",
            !1,
          ))
        : this.Hte.SetActorLocation(
            this.KJo.ToUeVector(),
            "拉回目标点设置坐标",
            !1,
          );
  }
  zJo() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    (t.bIsSingle = !1),
      (t.bIgnoreSelf = !0),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        t,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        t,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.JJo = t);
  }
  nzo(t, o) {
    this.jye.DeepCopy(t), (this.jye.Z += this.Hte.HalfHeight);
    var i = this.jye,
      t =
        (this.RTe.DeepCopy(t),
        (this.RTe.Z += CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
        this.RTe),
      s = this.JJo;
    (s.WorldContextObject = this.Hte.Actor),
      (s.Radius = this.Hte.ScaledRadius),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, i),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, t),
      s.ActorsToIgnore.Empty();
    for (const e of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
      s.ActorsToIgnore.Add(e);
    var i = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Hte.Actor.CapsuleComponent,
        s,
        PROFILE_KEY,
        PROFILE_KEY,
      ),
      h = s.HitResult;
    if (i && h.bBlockingHit) {
      var r = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let i = "";
      var a = h.Actors.Num();
      let s = -1,
        e = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, 0, r);
      for (let t = 0; t < a; ++t) {
        var n = h.Actors.Get(t);
        if (
          n?.IsValid() &&
          ((i += n.GetName() + ", "), !n.IsA(UE.Character.StaticClass()))
        ) {
          (s = t),
            (e = n.GetName()),
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(h, t, r);
          break;
        }
      }
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
            ["EntityId", this.Entity.Id],
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["经过修正的位置", r],
            ["Actors", i],
            ["HitLocationIndex", s],
            ["HitLocationName", e],
            ["this.ActorComp!.ScaledHalfHeight", this.Hte.ScaledHalfHeight],
            ["this.ActorComp!.ScaledRadius", this.Hte.ScaledRadius],
          ),
        (r.Z += this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
        (r.Z += FIX_LOCATION_TOLERANCE),
        this.JJo &&
          ((this.JJo.WorldContextObject = void 0),
          this.JJo.ActorsToIgnore.Empty()),
        o.DeepCopy(r),
        !0
      );
    }
    return (
      this.JJo &&
        ((this.JJo.WorldContextObject = void 0),
        this.JJo.ActorsToIgnore.Empty()),
      !1
    );
  }
  IJo() {
    if (0 !== this.YJo.length && GlobalData_1.GlobalData.IsPlayInEditor)
      for (let t = this.YJo.length - 1; -1 < t; t--) {
        var i = this.YJo[t];
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          35,
          10,
          t === this.NOe
            ? ColorUtils_1.ColorUtils.LinearRed
            : ColorUtils_1.ColorUtils.LinearGreen,
          1,
        );
      }
  }
}
exports.PatrolMoveLogic = PatrolMoveLogic;
//# sourceMappingURL=PatrolMoveLogic.js.map
