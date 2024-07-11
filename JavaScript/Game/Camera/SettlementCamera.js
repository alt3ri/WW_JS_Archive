"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SettlementCamera = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine"),
  MathCommon_1 = require("../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../GlobalData"),
  ColorUtils_1 = require("../Utils/ColorUtils"),
  CameraController_1 = require("./CameraController"),
  MIN_CAMERA_DISTANCE = 100,
  TARGET_PITCH_MIN = -5,
  TARGET_PITCH_MAX = -8,
  TRACE_TOP_ADDITION_Z = 50,
  TRACE_BOTTOM_ADDITION_Z = 50,
  LEFT_YAW_RANGE_MIN = -180,
  LEFT_YAW_RANGE_MAX = 0,
  RIGHT_YAW_RANGE_MIN = 0,
  RIGHT_YAW_RANGE_MAX = 180,
  MIN_VALID_YAW_RANGE = 0,
  MIN_SHAPE_RADUIS = 30,
  MAX_CACHE_CAPSULE_COUNT = 4,
  PTICH_MAX = 90,
  PITCH_MIN = -90,
  MINUS_FLAT_ANGLE = -180,
  FLAT_ANGLE = 180,
  PROFILE_KEY = "FightCameraLogicComponent_TraceValidRange_Camera",
  DEBUG_DRAW_DURATION = 10,
  THICKNESS = 5;
class YawRange {
  constructor(t, i) {
    (this.Min = 0), (this.Max = 0), (this.Min = t), (this.Max = i);
  }
}
class SettlementCamera {
  constructor() {
    (this.Hh = void 0),
      (this.Ime = MIN_CAMERA_DISTANCE),
      (this.Fse = void 0),
      (this.Tme = void 0),
      (this.Lme = void 0),
      (this.Dme = MIN_CAMERA_DISTANCE),
      (this.Rme = TARGET_PITCH_MIN),
      (this.Ume = TARGET_PITCH_MAX),
      (this.Ame = TRACE_TOP_ADDITION_Z),
      (this.Pme = TRACE_BOTTOM_ADDITION_Z),
      (this.xme = LEFT_YAW_RANGE_MIN),
      (this.wme = LEFT_YAW_RANGE_MAX),
      (this.Bme = RIGHT_YAW_RANGE_MIN),
      (this.bme = RIGHT_YAW_RANGE_MAX),
      (this.qme = MIN_VALID_YAW_RANGE),
      (this.Gme = 0),
      (this.Nme = void 0),
      (this.Ome = new Rotator_1.Rotator()),
      (this.kme = new Map()),
      (this.Fme = new Map()),
      (this.Vme = new Map()),
      (this.Hme = (0, puerts_1.$ref)(void 0)),
      (this.jme = []),
      (this.Wme = []),
      (this.Kme = []),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Tz = Vector_1.Vector.Create()),
      (this.Qme = []),
      (this.EnableDebugDraw = !1);
  }
  Init(t) {
    (this.Hh = t),
      (this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass())),
      (this.Fse.bIsSingle = !1),
      (this.Fse.bTraceComplex = !1),
      (this.Fse.bIgnoreSelf = !0);
  }
  SetSettlementCamera(t) {
    t && t.CameraModifier
      ? ((this.Tme = t),
        (this.Lme = t.CameraModifier),
        (this.Dme = this.Lme.Settings.ArmLength),
        this.Dme < MIN_CAMERA_DISTANCE &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】臂长配置过小:${this.Dme},将自动修正为:` +
                MIN_CAMERA_DISTANCE,
            ),
          (this.Dme = MIN_CAMERA_DISTANCE)),
        (this.Rme = this.Tme.MinRandomPitch),
        (this.Rme > PTICH_MAX || this.Rme < PITCH_MIN) &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】最小Pitch配置不正确:${this.Rme},合理区间为(${PITCH_MIN},${PTICH_MAX}),将自动修正为:` +
                TARGET_PITCH_MIN,
            ),
          (this.Rme = TARGET_PITCH_MIN)),
        (this.Ume = this.Tme.MaxRandomPitch),
        (this.Ume > PTICH_MAX || this.Ume < PITCH_MIN) &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】最大Pitch配置不正确:${this.Ume},合理区间为(${PITCH_MIN},${PTICH_MAX}),将自动修正为:` +
                TARGET_PITCH_MAX,
            ),
          (this.Ume = TARGET_PITCH_MAX)),
        (this.Ame = this.Tme.TopAdditionZ),
        this.Ame < TRACE_TOP_ADDITION_Z &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】探测合法值上限叠加值过小:${this.Ame},将自动修正为:` +
                TRACE_TOP_ADDITION_Z,
            ),
          (this.Ame = TRACE_TOP_ADDITION_Z)),
        (this.Pme = this.Tme.BottomAdditionZ),
        this.Pme < TRACE_BOTTOM_ADDITION_Z &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】探测合法值下限叠加值过小:${this.Pme},将自动修正为:` +
                TRACE_BOTTOM_ADDITION_Z,
            ),
          (this.Pme = TRACE_BOTTOM_ADDITION_Z)),
        (this.xme = this.Tme.LeftMinYawRange),
        (this.wme = this.Tme.LeftMaxYawRange),
        this.xme < LEFT_YAW_RANGE_MIN &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】左侧Yaw区间合法值最小值过小:${this.xme},将自动修正为:` +
                LEFT_YAW_RANGE_MIN,
            ),
          (this.xme = LEFT_YAW_RANGE_MIN)),
        this.wme > LEFT_YAW_RANGE_MAX &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】左侧Yaw区间合法值最大值过大:${this.wme},将自动修正为:` +
                LEFT_YAW_RANGE_MAX,
            ),
          (this.wme = LEFT_YAW_RANGE_MAX)),
        this.wme < this.xme &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】左侧Yaw区间合法值最小值大于最大值,最小值:${this.xme},最大值:${this.wme},将自动修正为,最小值:${LEFT_YAW_RANGE_MIN},最大值:` +
                LEFT_YAW_RANGE_MAX,
            ),
          (this.xme = LEFT_YAW_RANGE_MIN),
          (this.wme = LEFT_YAW_RANGE_MAX)),
        (this.Bme = this.Tme.RightMinYawRange),
        (this.bme = this.Tme.RightMaxYawRange),
        this.Bme < RIGHT_YAW_RANGE_MIN &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】右侧Yaw区间合法值最小值过小:${this.Bme},将自动修正为:` +
                RIGHT_YAW_RANGE_MIN,
            ),
          (this.Bme = RIGHT_YAW_RANGE_MIN)),
        this.bme > RIGHT_YAW_RANGE_MAX &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】右侧Yaw区间合法值最大值过大:${this.bme},将自动修正为:` +
                RIGHT_YAW_RANGE_MAX,
            ),
          (this.bme = RIGHT_YAW_RANGE_MAX)),
        this.bme < this.Bme &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】右侧Yaw区间合法值最小值大于最大值,最小值:${this.Bme},最大值:${this.bme},将自动修正为,最小值:${RIGHT_YAW_RANGE_MIN},最大值:` +
                RIGHT_YAW_RANGE_MAX,
            ),
          (this.Bme = RIGHT_YAW_RANGE_MIN),
          (this.bme = RIGHT_YAW_RANGE_MAX)),
        (this.qme = this.Tme.MinValidYawRange),
        this.qme < MIN_VALID_YAW_RANGE &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              `【结算镜头】最小合法区间过小:${this.qme},将自动修正为:` +
                MIN_VALID_YAW_RANGE,
            ),
          (this.qme = MIN_VALID_YAW_RANGE)),
        StringUtils_1.StringUtils.IsEmpty(this.Lme.Settings.Name) &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Camera",
              58,
              "【结算镜头】没有配置CameraModifier名称，将自动修正为 SettlementCamera",
            ),
          (this.Lme.Settings.Name = "SettlementCamera")))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Camera", 58, "无结算镜头配置数据");
  }
  PlaySettlementCamera() {
    CameraController_1.CameraController.IsSequenceCameraInCinematic() ||
      (this.Tme &&
        this.Tme.CameraModifier &&
        ((this.Gme = this.Hh.PlayerRotator.Yaw),
        (this.Nme = this.Hh.PlayerLocation),
        (this.Ime = Math.max(this.Hh.FinalCameraDistance, this.Dme)),
        (this.Fse.bTraceComplex = !1),
        this.Fse.HitResult?.Clear(),
        (this.Fse.WorldContextObject = GlobalData_1.GlobalData.World),
        (this.Fse.Radius = this.Ime),
        this.Fse.ActorsToIgnore.Add(this.Hh.Character),
        this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera),
        this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
        this.Fse.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
        ),
        this.Fse.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.Fse,
          this.Hh.PlayerLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.Fse,
          this.Hh.PlayerLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.Fse,
          PROFILE_KEY,
        ),
        this.UpdateRotator(this.Fse.HitResult),
        this.PlaySettlementCameraInternal(),
        this.EnableDebugDraw) &&
        (this.Xme(), this.$me(), this.Yme()));
  }
  UpdateRotator(t) {
    this.Jme(t), this.zme(t), this.Zme(), this.UpdateFinalRotator();
  }
  UpdateFinalRotator() {
    this.Qme.length = 0;
    for (const i of this.Wme) i.Max - i.Min > this.qme && this.Qme.push(i);
    for (const s of this.Kme) s.Max - s.Min > this.qme && this.Qme.push(s);
    var t;
    0 < this.Qme.length
      ? ((t = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Qme)),
        (t =
          MathUtils_1.MathUtils.Lerp(t.Min, t.Max, Math.random()) + this.Gme),
        (this.Ome.Pitch = MathUtils_1.MathUtils.Lerp(
          this.Rme,
          this.Ume,
          Math.random(),
        )),
        (this.Ome.Yaw = MathCommon_1.MathCommon.WrapAngle(t + FLAT_ANGLE)),
        (this.Ome.Roll = 0))
      : this.Hh.CameraForward.ToOrientationRotator(this.Ome);
  }
  PlaySettlementCameraInternal() {
    CameraController_1.CameraController.StopAllCameraShakes(),
      this.Ome.SubtractionEqual(
        this.Hh.Character.CharacterActorComponent.ActorRotationProxy,
      ),
      (this.Lme.Settings.ArmRotation = new UE.Rotator(
        this.Ome.Pitch,
        this.Ome.Yaw,
        this.Ome.Roll,
      )),
      this.Hh.CameraModifyController.ApplyCameraModify(
        void 0,
        this.Lme.Duration,
        this.Lme.BlendInTime,
        this.Lme.BlendOutTime,
        this.Lme.BreakBlendOutTime,
        this.Lme.Settings,
        void 0,
        this.Lme.BlendInCurve,
        this.Lme.BlendOutCurve,
        this.Hh.Character,
        "HitCase",
        void 0,
      );
  }
  IsPlayingSettlementCamera() {
    return (
      !!this.Hh.CameraModifyController.IsModified &&
      this.Hh.CameraModifyController.ModifySettings.Name ===
        this.Lme.Settings.Name
    );
  }
  Jme(i) {
    if ((this.kme.clear(), this.Fme.clear(), this.Vme.clear(), i)) {
      var s = i.GetHitCount(),
        h = this.Hh.PlayerLocation.Z + this.Ame,
        _ = this.Hh.PlayerLocation.Z - this.Pme;
      for (let t = 0; t < s; ++t) {
        var e,
          a,
          r = i.Actors.Get(t);
        r &&
          (e = i.Components?.Get(t)) &&
          (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            this.Fse.HitResult,
            t,
            this.Lz,
          ),
          this.Lz.Z < _ ||
            this.Lz.Z > h ||
            (e instanceof UE.StaticMeshComponent
              ? (!this.kme.has(r) ||
                  ((a = this.kme.get(r)),
                  TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                    this.Fse.HitResult,
                    a,
                    this.Tz,
                  ),
                  (a = Vector_1.Vector.DistSquared(
                    this.Lz,
                    this.Hh.PlayerLocation,
                  )),
                  Vector_1.Vector.DistSquared(this.Tz, this.Hh.PlayerLocation) <
                    a)) &&
                this.kme.set(r, t)
              : e instanceof UE.ShapeComponent &&
                this.ede(e) > MIN_SHAPE_RADUIS &&
                (this.Fme.has(r)
                  ? this.Fme.get(r).push(t)
                  : this.Fme.set(r, [t]))));
      }
    }
  }
  tde(t, i) {
    return (
      i.GetLocalBounds(void 0, this.Hme),
      [
        (0, puerts_1.$unref)(this.Hme).X * t.GetScale3D().X,
        (0, puerts_1.$unref)(this.Hme).Y * t.GetScale3D().Y,
      ]
    );
  }
  zme(_) {
    this.jme.length = 0;
    for (var [t, i] of this.kme) {
      var s = _.Components?.Get(i);
      s &&
        (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(_, i, this.Lz),
        this.jme.push(this.ide(t.GetTransform(), s, this.Lz)));
    }
    for (var [, h] of this.Fme) {
      h.sort((t, i) => {
        var s = _.Components?.Get(t),
          h = _.Components?.Get(i);
        return h ? (s ? ((s = this.ode(s, t)), this.ode(h, i) - s) : 1) : -1;
      });
      for (let t = 0; t < h.length && t < MAX_CACHE_CAPSULE_COUNT; ++t) {
        var e = _.Components?.Get(h[t]);
        e && this.jme.push(this.rde(e, h[t]));
      }
    }
  }
  rde(t, i) {
    let s = 0;
    this.Lz.DeepCopy(t.K2_GetComponentLocation());
    var h = this.Ime,
      t = this.ode(t, i),
      i = Vector_1.Vector.Dist2D(this.Hh.PlayerLocation, this.Lz),
      _ = this.nde(this.Lz);
    return (
      (s =
        i < h
          ? Math.atan(t / i)
          : MathUtils_1.MathUtils.GetObliqueTriangleAngle(h, i, t)),
      (s *= MathUtils_1.MathUtils.RadToDeg),
      new YawRange(_ - s, _ + s)
    );
  }
  ide(t, i, s) {
    var h = t.InverseTransformPositionNoScale(this.Nme.ToUeVector()),
      s = t.InverseTransformPositionNoScale(s.ToUeVector()),
      _ = this.Ime,
      [i, e] = this.tde(t, i);
    let a = 0,
      r = 0;
    var o,
      A,
      T = Vector_1.Vector.Create(),
      n = Vector_1.Vector.Create(),
      i =
        (h.Y >= -e && h.Y <= e
          ? ((E = e + h.Y),
            (o = e - h.Y),
            (A = s.X - h.X),
            (a =
              _ * _ < E * E + A * A ? h.Y - Math.sqrt(_ * _ - A * A) : h.Y - E),
            (r =
              _ * _ < o * o + A * A ? h.Y + Math.sqrt(_ * _ - A * A) : h.Y + o),
            (T.X = s.X),
            (T.Y = h.X <= 0 ? a : r),
            (T.Z = s.Z),
            (n.X = s.X),
            (n.Y = 0 < h.X ? a : r),
            (n.Z = s.Z))
          : h.X >= -i && h.X <= i
            ? ((E = i - h.X),
              (A = i + h.X),
              (o = s.Y - h.Y),
              (a =
                _ * _ < E * E + o * o
                  ? h.X + Math.sqrt(_ * _ - o * o)
                  : h.X + E),
              (r =
                _ * _ < A * A + o * o
                  ? h.X - Math.sqrt(_ * _ - o * o)
                  : h.X - A),
              (T.X = h.Y <= 0 ? a : r),
              (T.Y = s.Y),
              (T.Z = s.Z),
              (n.X = 0 < h.Y ? a : r),
              (n.Y = s.Y),
              (n.Z = s.Z))
            : h.Y < -e && h.X < -i
              ? ((E = i - h.X),
                (o = e - h.Y),
                (A = s.X - h.X),
                (M = s.Y - h.Y),
                (a =
                  _ * _ < E * E + M * M
                    ? h.X + Math.sqrt(_ * _ - M * M)
                    : h.X + E),
                (r =
                  _ * _ < o * o + A * A
                    ? h.Y + Math.sqrt(_ * _ - A * A)
                    : h.Y + o),
                (T.X = a),
                (T.Y = s.Y),
                (T.Z = s.Z),
                (n.X = s.X),
                (n.Y = r),
                (n.Z = s.Z))
              : h.Y > e && h.X < -i
                ? ((M = i - h.X),
                  (E = e + h.Y),
                  (A = s.X - h.X),
                  (o = s.Y - h.Y),
                  (a =
                    _ * _ < M * M + o * o
                      ? h.X + Math.sqrt(_ * _ - o * o)
                      : h.X + M),
                  (r =
                    _ * _ < E * E + A * A
                      ? h.Y - Math.sqrt(_ * _ - A * A)
                      : h.Y - E),
                  (n.X = a),
                  (n.Y = s.Y),
                  (n.Z = s.Z),
                  (T.X = s.X),
                  (T.Y = r),
                  (T.Z = s.Z))
                : h.Y < -e && h.X > i
                  ? ((o = i + h.X),
                    (M = e - h.Y),
                    (A = s.X - h.X),
                    (E = s.Y - h.Y),
                    (a =
                      _ * _ < o * o + E * E
                        ? h.X - Math.sqrt(_ * _ - E * E)
                        : h.X - o),
                    (r =
                      _ * _ < M * M + A * A
                        ? h.Y + Math.sqrt(_ * _ - A * A)
                        : h.Y + M),
                    (T.X = s.X),
                    (T.Y = r),
                    (T.Z = s.Z),
                    (n.X = a),
                    (n.Y = s.Y),
                    (n.Z = s.Z))
                  : h.Y > e &&
                    h.X > i &&
                    ((E = i + h.X),
                    (o = e + h.Y),
                    (A = s.X - h.X),
                    (M = s.Y - h.Y),
                    (a =
                      _ * _ < E * E + M * M
                        ? h.X - Math.sqrt(_ * _ - M * M)
                        : h.X - E),
                    (r =
                      _ * _ < o * o + A * A
                        ? h.Y - Math.sqrt(_ * _ - A * A)
                        : h.Y - o),
                    (T.X = a),
                    (T.Y = s.Y),
                    (T.Z = s.Z),
                    (n.X = s.X),
                    (n.Y = r),
                    (n.Z = s.Z)),
        t.TransformPositionNoScale(T.ToUeVector())),
      e = t.TransformPositionNoScale(n.ToUeVector()),
      M = this.sde(i),
      E = this.sde(e);
    return new YawRange(M, E);
  }
  Zme() {
    (this.Wme.length = 0),
      (this.Kme.length = 0),
      this.Wme.push(new YawRange(this.xme, this.wme)),
      this.Kme.push(new YawRange(this.Bme, this.bme));
    for (const l of this.jme) {
      var t = MathCommon_1.MathCommon.WrapAngle(l.Max - this.Gme),
        i = MathCommon_1.MathCommon.WrapAngle(l.Min - this.Gme);
      let s = 0,
        h = 0,
        _ = 0,
        e = 0,
        a = 0,
        r = 0,
        o = 0,
        A = 0,
        T = 0,
        n = 0;
      t < 0 && i < 0
        ? t < i
          ? ((T = 1), (s = t), (h = i))
          : ((T = 2),
            (s = MINUS_FLAT_ANGLE),
            (h = i),
            (_ = t),
            (e = 0),
            (n = 1),
            (a = 0),
            (r = FLAT_ANGLE))
        : 0 < t && 0 < i
          ? t < i
            ? ((n = 1), (a = t), (r = i))
            : ((n = 2),
              (a = 0),
              (r = i),
              (o = t),
              (A = FLAT_ANGLE),
              (T = 1),
              (s = MINUS_FLAT_ANGLE),
              (h = 0))
          : t < 0 && 0 < i
            ? ((T = 1), (n = 1), (s = t), (h = 0), (a = 0), (r = i))
            : 0 < t &&
              i < 0 &&
              ((T = 1),
              (n = 1),
              (s = MINUS_FLAT_ANGLE),
              (h = i),
              (a = t),
              (r = FLAT_ANGLE));
      for (let i = this.Wme.length - 1; 0 <= i; --i) {
        let t = !0;
        var M,
          E,
          C = this.Wme[i];
        2 <= T &&
          (C.Min > e ||
            C.Max < _ ||
            ((M = Math.max(C.Min, _)),
            (E = Math.min(C.Max, e)),
            this.Wme.push(new YawRange(M, E)))),
          1 <= T &&
            (C.Min > h ||
              C.Max < s ||
              ((t = !1),
              (C.Min = Math.max(C.Min, s)),
              (C.Max = Math.min(C.Max, h)))),
          t && this.Wme.splice(i, 1);
      }
      for (let i = this.Kme.length - 1; 0 <= i; --i) {
        let t = !0;
        var I,
          R,
          N = this.Kme[i];
        2 <= n &&
          (N.Min > A ||
            N.Max < o ||
            ((I = Math.max(N.Min, o)),
            (R = Math.min(N.Max, A)),
            this.Kme.push(new YawRange(I, R)))),
          1 <= n &&
            (N.Min > r ||
              N.Max < a ||
              ((t = !1),
              (N.Min = Math.max(N.Min, a)),
              (N.Max = Math.min(N.Max, r)))),
          t && this.Kme.splice(i, 1);
      }
    }
  }
  ode(t, i) {
    return this.Vme.has(i) || this.Vme.set(i, this.ede(t)), this.Vme.get(i);
  }
  ede(t) {
    return t
      ? t instanceof UE.CapsuleComponent
        ? t.CapsuleRadius
        : t instanceof UE.BoxComponent
          ? Math.max(t.BoxExtent.X, t.BoxExtent.Y)
          : t instanceof UE.SphereComponent
            ? t.SphereRadius
            : 0
      : 0;
  }
  sde(t) {
    return this.Lz.Set(t.X, t.Y, t.Z), this.nde(this.Lz);
  }
  nde(t) {
    return (
      t.Subtraction(this.Nme, this.Lz),
      this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg
    );
  }
  SetDrawDebugEnable(t) {
    t
      ? (this.Fse.SetDrawDebugTrace(2), (this.Fse.DrawTime = 10))
      : (this.Fse.SetDrawDebugTrace(0), (this.Fse.DrawTime = 0)),
      (this.EnableDebugDraw = t);
  }
  Xme() {
    for (const _ of this.jme) {
      var i = _.Min,
        s = _.Max,
        h = Vector_1.Vector.Create();
      let t = s - i;
      t < 0 && (t += 360),
        new Rotator_1.Rotator(0, t / 2 + i, 0).Vector(h),
        UE.KismetSystemLibrary.DrawDebugCone(
          GlobalData_1.GlobalData.World,
          this.Nme.ToUeVector(),
          h.ToUeVector(),
          this.Hh.FinalCameraDistance,
          (MathCommon_1.MathCommon.UnwindDegrees(s - i) *
            MathUtils_1.MathUtils.DegToRad) /
            2,
          0,
          100,
          ColorUtils_1.ColorUtils.LinearRed,
          DEBUG_DRAW_DURATION,
          1,
        );
    }
  }
  $me() {
    for (const o of this.Wme) {
      var t = o.Min + this.Gme,
        i = o.Max + this.Gme,
        s = new Rotator_1.Rotator(0, (i + t) / 2, 0),
        h = Vector_1.Vector.Create();
      s.Vector(h),
        UE.KismetSystemLibrary.DrawDebugCone(
          GlobalData_1.GlobalData.World,
          this.Hh.PlayerLocation.ToUeVector(),
          h.ToUeVector(),
          this.Hh.FinalCameraDistance,
          (MathCommon_1.MathCommon.UnwindDegrees(i - t) *
            MathUtils_1.MathUtils.DegToRad) /
            2,
          0,
          100,
          ColorUtils_1.ColorUtils.LinearCyan,
          DEBUG_DRAW_DURATION,
          1,
        );
    }
    for (const A of this.Kme) {
      var _ = A.Min + this.Gme,
        e = A.Max + this.Gme,
        a = new Rotator_1.Rotator(0, (e + _) / 2, 0),
        r = Vector_1.Vector.Create();
      a.Vector(r),
        UE.KismetSystemLibrary.DrawDebugCone(
          GlobalData_1.GlobalData.World,
          this.Hh.PlayerLocation.ToUeVector(),
          r.ToUeVector(),
          this.Hh.FinalCameraDistance,
          (MathCommon_1.MathCommon.UnwindDegrees(e - _) *
            MathUtils_1.MathUtils.DegToRad) /
            2,
          0,
          100,
          ColorUtils_1.ColorUtils.LinearCyan,
          DEBUG_DRAW_DURATION,
          1,
        );
    }
  }
  Yme() {
    var t = Vector_1.Vector.Create(),
      i = (this.Ome.Vector(t), Vector_1.Vector.Create());
    t.MultiplyEqual(this.Hh.FinalCameraDistance),
      t.Addition(this.Nme, i),
      UE.KismetSystemLibrary.DrawDebugArrow(
        GlobalData_1.GlobalData.World,
        this.Nme.ToUeVector(),
        i.ToUeVector(),
        this.Hh.FinalCameraDistance,
        ColorUtils_1.ColorUtils.LinearRed,
        DEBUG_DRAW_DURATION,
        THICKNESS,
      );
  }
  Clear() {
    this.Fse && (this.Fse.Dispose(), (this.Fse = void 0)),
      (this.Hh = void 0),
      this.kme.clear(),
      this.Fme.clear(),
      this.Vme.clear(),
      (this.jme.length = 0),
      (this.Wme.length = 0),
      (this.Kme.length = 0);
  }
}
exports.SettlementCamera = SettlementCamera;
//# sourceMappingURL=SettlementCamera.js.map
