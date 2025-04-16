"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneBattleInteractEffect = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  PROFILE_BATLLE_INTERACT_WATER_TRACE = "BattleInteractWaterTrace";
class SceneBattleInteractEffect {
  constructor() {
    (this.Id = 0),
      (this.WI = !1),
      (this.A2c = 0),
      (this.xOc = -1),
      (this.MW = 0),
      (this.UOc = void 0),
      (this.Znl = 0),
      (this.SIa = 0),
      (this.DOc = 0),
      (this.OC = void 0),
      (this.yen = void 0),
      (this.g1t = FNameUtil_1.FNameUtil.EMPTY),
      (this.mWi = void 0),
      (this.BOc = 0),
      (this.kOc = !0),
      (this.cz = Vector_1.Vector.Create()),
      (this.Yn1 = Vector_1.Vector.Create(0, 0, -1)),
      (this.r$t = !1),
      (this.Vln = Vector_1.Vector.Create()),
      (this.Wnr = Vector_1.Vector.Create()),
      (this.OOc = void 0),
      (this.zn1 = !1),
      (this.Jn1 = !1),
      (this.l$l = 0),
      (this._$l = 0),
      (this.c$l = void 0),
      (this.u$l = (t, s, e, h) => {
        if (
          this.UOc &&
          !(e < this.l$l) &&
          !(e === this.l$l && h < this._$l) &&
          0 === this.xOc &&
          !this.r$t &&
          t
        ) {
          var r = s.HitResult;
          let i = !1;
          var a = this.cz;
          if (r?.bBlockingHit) {
            var o = r.GetHitCount();
            for (let t = 0; t < o; t++) {
              var n = r.Components.Get(t).GetCollisionProfileName();
              if (
                RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(
                  n,
                )
              ) {
                (a.X = r.ImpactPointX_Array.Get(t)),
                  (a.Y = r.ImpactPointY_Array.Get(t)),
                  (a.Z = r.ImpactPointZ_Array.Get(t)),
                  (i = !0);
                break;
              }
            }
          }
          i &&
            ((this.l$l = e),
            (this._$l = h),
            GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(
              a.ToUeVector(),
              this.UOc,
              this.Wnr.ToUeVector(),
              this.Id,
            ),
            this.MW <= 0 ? (this.r$t = !0) : (this.xOc = this.MW));
        }
      });
  }
  Init(t, i = 0, s = 0) {
    (this.UOc = t),
      (this.Znl = 0 < this.UOc.CollisionRadius ? this.UOc.CollisionRadius : i),
      (this.SIa =
        0 < this.UOc.CollisionHalfHeight ? this.UOc.CollisionHalfHeight : s),
      (this.kOc = this.UOc.CollisionOffset.IsZero()),
      (this.MW = this.UOc.Interval),
      this.koe();
  }
  SetUpdateLocationFunc(t) {
    (this.DOc = 0), (this.OOc = t);
  }
  SetUpdateLocationActor(t) {
    (this.DOc = 1), (this.OC = t);
  }
  SetUpdateLocationSocket(t, i) {
    (this.DOc = 2),
      (this.yen = t),
      (this.g1t = i ?? FNameUtil_1.FNameUtil.EMPTY);
  }
  SetDownVector(t) {
    this.Yn1.FromUeVector(t);
  }
  koe() {
    switch (
      ((this.BOc = this.UOc.ShapeType),
      (this.zn1 = !0),
      (this.Jn1 = !0),
      this.BOc)
    ) {
      case 0:
        (this.mWi = this.qOc(
          UE.TraceSphereElement.StaticClass(),
          QueryTypeDefine_1.KuroTraceTypeQuery.Water,
        )),
          (this.mWi.Radius = this.Znl);
        break;
      case 1:
        (this.mWi = this.qOc(
          UE.TraceCapsuleElement.StaticClass(),
          QueryTypeDefine_1.KuroTraceTypeQuery.Water,
        )),
          (this.mWi.Radius = this.Znl),
          (this.mWi.HalfHeight = this.SIa);
        break;
      case 2:
        (this.mWi = this.qOc(
          UE.TraceLineElement.StaticClass(),
          QueryTypeDefine_1.KuroTraceTypeQuery.Water,
        )),
          (this.Jn1 = !1);
        break;
      default:
        (this.zn1 = !1), (this.Jn1 = !1);
    }
    this.zn1 &&
      ((this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l)),
      this.SetDebug(
        ModelManager_1.ModelManager.SceneBattleInteractModel.Debug,
      ));
  }
  qOc(t, i, s = !1) {
    t = UE.NewObject(t);
    return (
      (t.WorldContextObject = GlobalData_1.GlobalData.World),
      t.SetTraceTypeQuery(i),
      (t.bTraceComplex = !1),
      (t.bIgnoreSelf = !0),
      (t.bIsSingle = s),
      t
    );
  }
  OnTick(t) {
    if (!this.r$t && this.WI)
      if (0 < this.A2c && ((this.A2c -= t), this.A2c <= 0)) this.WI = !1;
      else if (
        (this.wVs(this.Vln),
        !(
          (-1 === this.xOc &&
            (this.Wnr.FromUeVector(this.Vln), (this.xOc = 0), this.Jn1)) ||
          ((this.xOc -= t), 0 < this.xOc)
        ))
      )
        if (((this.xOc = 0), this.zn1)) {
          if (this.c$l && this.mWi) {
            switch (this.BOc) {
              case -1:
                break;
              case 0:
                TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                  this.mWi,
                  this.Wnr,
                ),
                  TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                    this.mWi,
                    this.Vln,
                  ),
                  TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(
                    this.mWi,
                    PROFILE_BATLLE_INTERACT_WATER_TRACE,
                    this.c$l,
                  );
                break;
              case 1:
                TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                  this.mWi,
                  this.Wnr,
                ),
                  TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                    this.mWi,
                    this.Vln,
                  ),
                  TraceElementCommon_1.TraceElementCommon.AsyncCapsuleTrace(
                    this.mWi,
                    PROFILE_BATLLE_INTERACT_WATER_TRACE,
                    this.c$l,
                  );
                break;
              case 2:
                (this.cz.X = this.Vln.X + this.Yn1.X * this.Znl),
                  (this.cz.Y = this.Vln.Y + this.Yn1.Y * this.Znl),
                  (this.cz.Z = this.Vln.Z + this.Yn1.Z * this.Znl),
                  TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                    this.mWi,
                    this.Vln,
                  ),
                  TraceElementCommon_1.TraceElementCommon.SetEndLocation(
                    this.mWi,
                    this.cz,
                  ),
                  TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(
                    this.mWi,
                    PROFILE_BATLLE_INTERACT_WATER_TRACE,
                    this.c$l,
                  );
            }
            this.Wnr.FromUeVector(this.Vln);
          }
        } else
          GlobalData_1.GlobalData.BpEventManager.子弹撞到水面时.Broadcast(
            Vector_1.Vector.ZeroVectorDouble,
            this.UOc,
            this.Vln.ToUeVector(),
            this.Id,
          ),
            (this.xOc = this.MW),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 17, "SceneBattleInteractEffect None", [
                "",
                this.Vln,
              ]);
  }
  wVs(t) {
    switch (this.DOc) {
      case 0:
        this.kOc ? this.OOc?.(t) : this.OOc?.(t, this.UOc.CollisionOffset);
        break;
      case 1:
        this.OC &&
          (this.kOc
            ? t.FromUeVector(this.OC.D_K2_GetActorLocation())
            : ((i = this.OC.D_GetTransform()),
              t.FromUeVector(i.TransformPosition(this.UOc.CollisionOffset))));
        break;
      case 2:
        var i;
        this.yen &&
          (this.kOc
            ? t.FromUeVector(this.yen.D_GetSocketLocation(this.g1t))
            : ((i = this.yen.D_GetSocketTransform(this.g1t)),
              t.FromUeVector(i.TransformPosition(this.UOc.CollisionOffset))));
    }
  }
  SetEnable(t, i = 0) {
    (this.A2c = i),
      this.WI !== t &&
        ((this.WI = t),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "SceneBattleInteractEffect SetEnable",
            ["", t],
            ["Id", this.Id],
          ),
        (this.xOc = -1));
  }
  SetDebug(t) {
    this.mWi &&
      (0 === t
        ? this.mWi.SetDrawDebugTrace(0)
        : 1 === t
          ? (this.mWi.SetTraceColor(0, 1, 0, 0),
            this.mWi.SetTraceHitColor(1, 0, 0, 0),
            this.mWi.SetDrawDebugTrace(1))
          : 2 === t &&
            ((this.mWi.DrawTime = 3),
            this.mWi.SetTraceColor(0, 1, 0, 0),
            this.mWi.SetTraceHitColor(1, 0, 0, 0),
            this.mWi.SetDrawDebugTrace(2)));
  }
  Destroy() {
    (this.UOc = void 0),
      (this.OOc = void 0),
      (this.OC = void 0),
      (this.yen = void 0),
      this.c$l &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.u$l),
        (this.c$l = void 0));
  }
}
exports.SceneBattleInteractEffect = SceneBattleInteractEffect;
//# sourceMappingURL=SceneBattleInteractEffect.js.map
