"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CameraCollision = void 0);
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const MIN_DITHER = 0.01;
const MAX_VALUE = 9999999;
const PROBE_RATIO = 4;
const PLAYER_COLLISION_RADUIS = 20;
const PROFILE_KEY1 = "FightCameraLogicComponent_CheckCollision_Camera";
const PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Npc";
const PROFILE_KEY3 =
  "FightCameraLogicComponent_CheckCollision_Camera_Caught_PlayerLocation";
const PROFILE_KEY4 = "FightCameraLogicComponent_CheckCollision_Player";
class CameraCollision {
  constructor() {
    (this.Hh = void 0),
      (this.Tae = void 0),
      (this.Lae = void 0),
      (this.Fse = void 0),
      (this.Hse = void 0),
      (this.jse = void 0),
      (this.Dae = void 0),
      (this.Rae = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Uae = Vector_1.Vector.Create()),
      (this.Aae = Vector_1.Vector.Create()),
      (this.Pae = Vector_1.Vector.Create()),
      (this.xae = Vector_1.Vector.Create()),
      (this.wae = Vector_1.Vector.Create()),
      (this.Bae = Vector_1.Vector.Create()),
      (this.bae = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.qae = 0),
      (this.Gae = 0),
      (this.Nae = 0),
      (this.Oae = !1),
      (this.kae = !1),
      (this.IsLeftCollision = !1),
      (this.IsRightCollision = !1),
      (this.IsOpenBlend = !0),
      (this.CurrentBlendState = 0),
      (this.Fae = 0),
      (this.Vae = 0),
      (this.Hae = 0),
      (this.jae = 0),
      (this.Wae = 0),
      (this.IsNpcDitherEnable = !0),
      (this.IsPlayerXRayEnable = !0),
      (this.Kae = new Set()),
      (this.Qae = new Map());
  }
  Init(t) {
    this.Hh = t;
  }
  InitTraceElements() {
    (this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Fse.bIsSingle = !1),
      (this.Fse.bTraceComplex = !1),
      (this.Fse.bIgnoreSelf = !0),
      this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.jse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.jse.bIsSingle = !0),
      (this.jse.bTraceComplex = !1),
      (this.jse.bIgnoreSelf = !0),
      this.jse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.Hse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Hse.bIsSingle = !0),
      (this.Hse.bTraceComplex = !1),
      (this.Hse.bIgnoreSelf = !0),
      this.Hse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
      (this.Dae = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Dae.bIsSingle = !1),
      (this.Dae.bTraceComplex = !1),
      (this.Dae.bIgnoreSelf = !0),
      this.Dae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
      this.Dae.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
      ),
      this.Dae.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
      ),
      (this.Rae = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Rae.bIsSingle = !1),
      (this.Rae.bTraceComplex = !1),
      (this.Rae.bIgnoreSelf = !0),
      this.Rae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
      this.Rae.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
      ),
      this.Rae.AddObjectTypeQuery(
        QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
      );
  }
  SetDrawDebugEnable(t) {
    t
      ? (this.Fse.SetDrawDebugTrace(1),
        (this.Fse.DrawTime = 5),
        this.jse.SetDrawDebugTrace(1),
        (this.jse.DrawTime = 5),
        this.Hse.SetDrawDebugTrace(1),
        (this.Hse.DrawTime = 5),
        this.Dae.SetDrawDebugTrace(1),
        (this.Dae.DrawTime = 5),
        this.Rae.SetDrawDebugTrace(0),
        (this.Rae.DrawTime = 5))
      : (this.Fse.SetDrawDebugTrace(0),
        (this.Fse.DrawTime = 0),
        this.jse.SetDrawDebugTrace(0),
        (this.jse.DrawTime = 0),
        this.Hse.SetDrawDebugTrace(0),
        (this.Hse.DrawTime = 0),
        this.Dae.SetDrawDebugTrace(0),
        (this.Dae.DrawTime = 0),
        this.Rae.SetDrawDebugTrace(0),
        (this.Rae.DrawTime = 0));
  }
  SetCharacter(t) {
    (this.Tae = t),
      this.Fse.ActorsToIgnore.Add(t),
      this.jse.ActorsToIgnore.Add(t),
      this.Hse.ActorsToIgnore.Add(t),
      this.Dae.ActorsToIgnore.Add(t),
      this.Rae.ActorsToIgnore.Add(t),
      (this.Lae = t?.CharacterActorComponent?.Entity?.GetComponent(66));
  }
  SetCameraConfig(t) {
    this.Wae = t * t * PROBE_RATIO;
  }
  Clear() {
    this.Fse && (this.Fse.Dispose(), (this.Fse = void 0)),
      this.Hse && (this.Hse.Dispose(), (this.Hse = void 0)),
      this.jse && (this.jse.Dispose(), (this.jse = void 0)),
      this.Dae && (this.Dae.Dispose(), (this.Dae = void 0)),
      this.Rae && (this.Rae.Dispose(), (this.Rae = void 0)),
      (this.Oae = !1),
      (this.kae = !1),
      (this.IsLeftCollision = !1),
      (this.IsRightCollision = !1),
      this.Kae.clear();
  }
  ResetBlendData() {
    this.CurrentBlendState = 0;
  }
  CheckCollision(t, i, s) {
    return (
      this.Pae.DeepCopy(i),
      this.pae(),
      this.Xae(t, i),
      this.$ae(t, i),
      this.Yae(),
      this.Jae(t, i),
      this.zae(t, i, s),
      this.Zae(i),
      this.ehe(t),
      this.Pae
    );
  }
  Xae(t, i) {
    this._ae.DeepCopy(t),
      this.uae.DeepCopy(i),
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Fse.Radius = this.Hh.CurrentCollisionSize),
      this.Lae &&
        (this._ae.Z = Math.max(
          this._ae.Z,
          this.Lae.GetWaterLocation().Z +
            this.Hh.CollisionAdditionalHeightInWater,
        )),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.Fse,
        this._ae,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.Fse,
        this.uae,
      ),
      (this.Oae = !1),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY1,
      ) &&
        ((this.Nae = this.the(this._ae, this.uae, this.Fse.HitResult)),
        this.Nae >= 0) &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Fse.HitResult,
          this.Nae,
          this.Pae,
        ),
        (this.Oae = !0));
  }
  Yae() {
    let t;
    (this.kae = !1),
      this.Oae &&
        (t = this.Fse.HitResult?.Components?.Get(this.Nae))?.IsValid() &&
        t.GetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.Water,
        ) === 2 &&
        ((this.Pae.Z = Math.max(
          this.Pae.Z,
          this.Pae.Z +
            this.Hh.CollisionProbeSize +
            MathUtils_1.MathUtils.KindaSmallNumber,
        )),
        (this.kae = !0));
  }
  $ae(t, i) {
    let s;
    this.Oae &&
      (t.Subtraction(i, this.Uae),
      this.Uae.Normalize(),
      (s = (this.Hh.CheckWidth + this.Fae) / Vector_1.Vector.Dist(i, this.Pae)),
      (s = Vector_1.Vector.Dist(i, t) * s),
      this.Uae.CrossProduct(Vector_1.Vector.DownVectorProxy, this.Aae),
      this.Aae.MultiplyEqual(s),
      t.Addition(this.Aae, this._ae),
      this.jse.HitResult?.Clear(),
      (this.jse.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.jse.Radius = this.Hh.CheckCollisionProbeSize),
      this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.jse.Radius)),
      this.uae.DeepCopy(i),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.jse,
        this._ae,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.jse,
        this.uae,
      ),
      (this.IsRightCollision =
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.jse,
          PROFILE_KEY1,
        )),
      this.IsRightCollision ||
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.jse,
          this.uae,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.jse,
          this._ae,
        ),
        (this.IsRightCollision =
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.jse,
            PROFILE_KEY1,
          ))),
      this.Aae.UnaryNegation(this.Aae),
      t.Addition(this.Aae, this._ae),
      this.Hse.HitResult?.Clear(),
      (this.Hse.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Hse.Radius = this.Hh.CheckCollisionProbeSize),
      this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.Hse.Radius)),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.Hse,
        this._ae,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.Hse,
        this.uae,
      ),
      (this.IsLeftCollision =
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Hse,
          PROFILE_KEY1,
        )),
      this.IsLeftCollision ||
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.Hse,
          this.uae,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Hse,
          this._ae,
        ),
        (this.IsLeftCollision =
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            this.Hse,
            PROFILE_KEY1,
          ))));
  }
  Jae(t, i) {
    if (this.IsOpenBlend) {
      if (!this.ohe())
        switch (this.CurrentBlendState) {
          case 0:
            this.Oae &&
              (this.IsLeftCollision || this.IsRightCollision) &&
              (t.Subtraction(this.Hh.CameraLocation, this.wae),
              t.Subtraction(this.Pae, this.Bae),
              (this.qae = this.wae.Size()),
              (this.Gae = this.Bae.Size()),
              (this.CurrentBlendState = 1));
            break;
          case 1:
            if (this.Oae && this.IsLeftCollision && this.IsRightCollision)
              this.CurrentBlendState = 2;
            else if (
              this.Oae &&
              (this.IsLeftCollision || this.IsRightCollision)
            ) {
              if (
                (t.Subtraction(this.Hh.CameraLocation, this.wae),
                t.Subtraction(this.Pae, this.Bae),
                (this.qae = this.wae.Size()),
                (this.Gae = this.Bae.Size()),
                this.rhe(t, i, this.qae))
              )
                return void this.ResetBlendData();
              this.qae <= this.Gae && (this.CurrentBlendState = 2);
            } else
              this.Oae
                ? (this.CurrentBlendState = 1)
                : (this.CurrentBlendState = 3);
            break;
          case 3:
            if (this.Oae && (this.IsLeftCollision || this.IsRightCollision))
              this.CurrentBlendState = 1;
            else {
              if (
                (t.Subtraction(this.Hh.CameraLocation, this.wae),
                t.Subtraction(i, this.Bae),
                (this.qae = this.wae.Size()),
                (this.Gae = this.Bae.Size()),
                this.rhe(t, i, this.qae))
              )
                return void this.ResetBlendData();
              (this.qae >= this.Gae || this.qae >= this.Hh.MaxArmLength) &&
                (this.CurrentBlendState = 0);
            }
            break;
          case 2:
            this.Oae ||
              this.IsLeftCollision ||
              this.IsRightCollision ||
              (t.Subtraction(this.Hh.CameraLocation, this.wae),
              t.Subtraction(i, this.Bae),
              (this.qae = this.wae.Size()),
              (this.Gae = this.Bae.Size()),
              (this.CurrentBlendState = 3));
        }
    } else this.CurrentBlendState = this.Oae ? 2 : 0;
  }
  zae(t, i, s) {
    switch (this.CurrentBlendState) {
      case 1:
        var h = this.qae - this.Hh.InSpeed * s;
        var h = Math.max(this.Gae, h);
        i.Subtraction(t, this.Uae),
          this.Uae.Normalize(),
          this.Uae.Multiply(h, this.bae),
          t.Addition(this.bae, this.Pae);
        break;
      case 3:
        (h = this.qae + this.Hh.OutSpeed * s), (h = Math.min(this.Gae, h));
        (h = Math.min(this.Hh.MaxArmLength, h)),
          i.Subtraction(t, this.Uae),
          this.Uae.Normalize(),
          this.Uae.Multiply(h, this.bae),
          t.Addition(this.bae, this.Pae);
        break;
      case 0:
        this.kae || this.Pae.DeepCopy(i);
    }
  }
  Zae(t) {
    if (this.IsNpcDitherEnable) {
      this.nhe(),
        this.she(),
        this.Dae.HitResult?.Clear(),
        (this.Dae.WorldContextObject = GlobalData_1.GlobalData.World),
        (this.Dae.Radius = this.Vae),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.Dae,
          this.Pae,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Dae,
          this.xae,
        );
      const i = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Dae,
        PROFILE_KEY2,
      );
      const s = this.Dae.HitResult.GetHitCount();
      if (i) {
        this.ahe(this.Dae.HitResult);
        for (let [h, e] of this.Qae)
          this.hhe(h)
            ? (h.SetDitherEffect(1, 1),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Camera",
                  58,
                  `[NPC Dither] 存在忽略Tag,恢复Npc'${h?.GetName()}'Dither`,
                ))
            : (h.SetDitherEffect(this.lhe(h, e), 1),
              (e = this.Kae.has(h)) && this.Kae.delete(h),
              this.Kae.add(h),
              e ||
                (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Camera", 58, "[NPC Dither] 应用Npc Dither", [
                    "actor?.GetName()",
                    h?.GetName(),
                  ])));
      }
      const r = this.Kae.values();
      for (let t = 0; t < this.Kae.size - s; t++) {
        const a = r.next();
        a.value &&
          a.value instanceof TsBaseCharacter_1.default &&
          a.value.IsValid() &&
          (a.value.SetDitherEffect(1, 1), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Camera",
            58,
            `[NPC Dither] 恢复Npc'${a.value?.GetName()}'Dither`,
          ),
          this.Kae.delete(a.value);
      }
    } else
      this.Kae.size > 0 &&
        (this.Kae.forEach((t) => {
          t?.IsValid() &&
            (t.SetDitherEffect(1, 1), Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Camera",
              58,
              `[NPC Dither] 禁用Npc虚化时恢复Npc'${t?.GetName()}'Dither`,
            );
        }),
        this.Kae.clear());
  }
  ehe(t) {
    this.IsPlayerXRayEnable &&
    (this.Rae.HitResult?.Clear(),
    (this.Rae.WorldContextObject = GlobalData_1.GlobalData.World),
    (this.Rae.Radius = PLAYER_COLLISION_RADUIS),
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(
      this.Rae,
      this.Pae,
    ),
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Rae, t),
    TraceElementCommon_1.TraceElementCommon.SphereTrace(
      this.Rae,
      PROFILE_KEY4,
    )) &&
    this._he(this.Rae.HitResult)
      ? this.Tae?.CharacterActorComponent?.SetActorXRayState(!0)
      : this.Tae?.CharacterActorComponent?.SetActorXRayState(!1);
  }
  ResetAllNpcDither() {
    for (const t of this.Kae) {
      if (!t?.IsValid()) return;
      t.SetDitherEffect(1, 1);
    }
    this.Kae.clear();
  }
  pae() {
    let t;
    this.Hh.NearCollisionProbeSize <= this.Hh.CollisionProbeSize
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          58,
          "CollisionSize数据错误:NearCollisionProbeSize <= this.CollisionProbeSize",
          ["CollisionProbeSize", this.Hh.CollisionProbeSize],
          ["NearCollisionProbeSize", this.Hh.NearCollisionProbeSize],
        )
      : ((this.Fae =
          this.Hh.NearCollisionProbeSize - this.Hh.CollisionProbeSize),
        (t = MathUtils_1.MathUtils.Clamp(
          this.Hh.CameraInputController.InputSpeedPercentage /
            this.Hh.CollisionSizePercentage,
          0,
          1,
        )),
        (this.Hh.CurrentCollisionSize =
          this.Fae * t + this.Hh.CollisionProbeSize),
        (this.Hh.CurrentCollisionSize = MathUtils_1.MathUtils.Clamp(
          this.Hh.CurrentCollisionSize,
          this.Hh.CurrentCollisionSize,
          this.Hh.NearCollisionProbeSize,
        )),
        this.CurrentBlendState !== 0 &&
          (this.Hh.CurrentCollisionSize = this.Hh.NearCollisionProbeSize));
  }
  ihe(t, i, s) {
    return i.Multiply(s, this.Lz), t.Addition(this.Lz, this.Lz), this.Lz;
  }
  ohe() {
    return this.Hh.CameraDialogueController.State !== 0
      ? ((this.CurrentBlendState = this.Oae ? 2 : 0), !0)
      : !!ModelManager_1.ModelManager.GameModeModel.IsSilentLogin &&
          !(this.CurrentBlendState = 0);
  }
  rhe(t, i, s) {
    return t.Subtraction(i, this.Lz).SizeSquared() < s * s;
  }
  hhe(t) {
    return !!t.GetEntityNoBlueprint()?.GetComponent(185)?.HasTag(-1151151013);
  }
  nhe() {
    let t, i;
    (MathUtils_1.MathUtils.IsNearlyEqual(
      this.Hae,
      ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance,
    ) &&
      MathUtils_1.MathUtils.IsNearlyEqual(this.jae, this.Hh.Fov)) ||
      ((this.Hae =
        ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance),
      (this.jae = this.Hh.Fov),
      (t = this.Hae),
      (i = this.Hh.CameraActor.CameraComponent.AspectRatio),
      (i = MathUtils_1.MathUtils.VerticalFovToHorizontally(this.Hh.Fov, i)),
      (i = Math.sin((i / 2) * MathUtils_1.MathUtils.DegToRad) * t * 2),
      (this.Vae = MathUtils_1.MathUtils.GetTriangleCircumradius(t, t, i)));
  }
  she() {
    this.Hh.CameraForward.Normalize(),
      this.Hh.CameraForward.Multiply(this.Vae, this.Lz),
      this.Pae.Addition(this.Lz, this.xae);
  }
  ahe(i) {
    const s = i.GetHitCount();
    this.Qae.clear();
    for (let t = 0; t < s; ++t) {
      var h;
      const e = i.Actors.Get(t);
      e &&
        e instanceof UE.Object &&
        e.IsValid() &&
        e.IsA(UE.TsBaseCharacter_C.StaticClass()) &&
        (e.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()
          ?.主角蓝透 ||
          (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            i,
            t,
            this.Lz,
          ),
          (this.Qae.get(e) ?? MAX_VALUE) <=
            (h = Vector_1.Vector.Dist(this.Lz, this.Pae))) ||
          this.Qae.set(e, h));
    }
  }
  lhe(t, i) {
    if (!t?.IsValid() || !t.CapsuleComponent) return 1;
    let s = this.Hh.CompleteHideDistance;
    let h = this.Hh.StartHideDistance;
    let e = this.Hh.StartDitherValue;
    return (
      t.CapsuleComponent.GetCollisionObjectType() ===
        QueryTypeDefine_1.KuroCollisionChannel.PawnMonster &&
        (t = t.GetEntityNoBlueprint()?.GetComponent(3)) &&
        ((s = t.CompleteHideDistance),
        (h = t.StartHideDistance),
        (e = t.StartDitherValue)),
      MathUtils_1.MathUtils.RangeClamp(i, s, h, MIN_DITHER, e)
    );
  }
  the(i, t, s) {
    if (i.Z > t.Z) return 0;
    let h = -1;
    let e = MAX_VALUE;
    const r = s.GetHitCount();
    for (let t = 0; t < r; ++t) {
      var a;
      const o = this.Fse.HitResult?.Components?.Get(t);
      o?.IsValid() &&
        (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(s, t, this.Lz),
        (a = Vector_1.Vector.DistSquared(this.Lz, i)),
        (o.GetCollisionResponseToChannel(
          QueryTypeDefine_1.KuroCollisionChannel.Water,
        ) === 2 &&
          a <= this.Wae) ||
          (a < e && ((e = a), (h = t))));
    }
    return h;
  }
  _he(i) {
    const s = i.GetHitCount();
    for (let t = 0; t < s; ++t) {
      const h = i.Actors.Get(t);
      if (h)
        if (
          h instanceof UE.Object &&
          h.IsValid() &&
          h.IsA(UE.TsBaseCharacter_C.StaticClass())
        )
          if (
            h.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()
              ?.主角蓝透
          )
            return !0;
    }
    return !1;
  }
  TraceCheckPlayerLocation(t, i, s) {
    return (
      (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Fse.Radius = this.Hh.CurrentCollisionSize),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, t),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, i),
      !!TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Fse,
        PROFILE_KEY3,
      ) &&
        (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          this.Fse.HitResult,
          0,
          s,
        ),
        !0)
    );
  }
}
exports.CameraCollision = CameraCollision;
// # sourceMappingURL=CameraCollision.js.map
