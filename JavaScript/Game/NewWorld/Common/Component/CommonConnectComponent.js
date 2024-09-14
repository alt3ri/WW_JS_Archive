"use strict";
var CommonConnectComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, r) {
      var s,
        o = arguments.length,
        n =
          o < 3
            ? e
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, r);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (s = t[h]) &&
            (n = (o < 3 ? s(n) : 3 < o ? s(e, i, n) : s(e, i)) || n);
      return 3 < o && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonConnectComponent = exports.PassThroughPortalParam = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GameSplineUtils_1 = require("../../../LevelGamePlay/Common/GameSplineUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  PortalUtils_1 = require("../../../Utils/PortalUtils"),
  ConnectNearbySensory_1 = require("../../Pawn/SensoryInfo/ConnectNearbySensory"),
  PROFILE_KEY = "CommonConnectComponent_LineTrace",
  TRACE_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal");
class PassThroughPortalParam {
  constructor(t, e, i) {
    (this.Type = 0),
      (this.PortalPairId = 0),
      (this.Distance = 0),
      (this.Type = t ?? 0),
      (this.PortalPairId = e ?? 0),
      (this.Distance = i ?? 0);
  }
}
exports.PassThroughPortalParam = PassThroughPortalParam;
let CommonConnectComponent =
  (CommonConnectComponent_1 = class CommonConnectComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.fie = 0),
        (this.ActorComp = void 0),
        (this.ConnectedEffectPath = void 0),
        (this.ConnectedEffectStartPoint = void 0),
        (this.ConnectedEffectEndPoint = void 0),
        (this.EffectSplines = new Map()),
        (this.cQs = 0),
        (this.mQs = MathUtils_1.MathUtils.MaxFloat),
        (this.pQs = void 0),
        (this.Gga = []),
        (this.bWa = 0),
        (this.NeedBeProcessingEntity = new Map()),
        (this.CanInteractEntity = new Set()),
        (this.ServerProcessingEntities = new Set()),
        (this.ServerProcessingEntitiesParams = new Map()),
        (this.qWa = -600601599),
        (this.Tna = void 0),
        (this.Lna = void 0),
        (this.OWa = void 0),
        (this.Dna = -1),
        (this.EZa = void 0),
        (this.uoe = void 0),
        (this.Ana = (t) => {
          for (const e of this.Una) if (e === t) return !0;
          return !1;
        }),
        (this.Una = new Set()),
        (this.Rna = void 0),
        (this.g_n = (t, e) => {
          !this.Kko() && this.pQs
            ? (TimerSystem_1.TimerSystem.Remove(this.pQs),
              (this.pQs = void 0),
              this.TryCancelAllConnect())
            : this.Kko() &&
              !this.pQs &&
              (this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
                this.xna();
              }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval));
        }),
        (this.DKo = []),
        (this.mBe = void 0),
        (this.EQs = void 0);
    }
    OnInitData(t) {
      switch (t.EntityType) {
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          return this.Pna(t);
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          return this.wna(t);
        default:
          return !1;
      }
    }
    OnStart() {
      switch (this.fie) {
        case 1:
          return this.Bna();
        case 2:
          return this.bna();
        default:
          return !1;
      }
    }
    OnActivate() {
      switch (this.fie) {
        case 1:
          this.qna();
          break;
        case 2:
          this.Gna();
      }
    }
    OnTick(t) {
      switch (this.fie) {
        case 1:
          this.Ona(t);
          break;
        case 2:
          this.Nna(t);
      }
    }
    OnEnd() {
      switch ((this.ClearEffectSplines(), this.fie)) {
        case 1:
          return this.kna();
        case 2:
          return this.Fna();
        default:
          return !1;
      }
    }
    GetNeedBeProcessingEntity(t, e) {
      var i =
        ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(
          this.Entity.Id,
        );
      for (const s of t) {
        var r = s.GetComponent(209);
        (i && i.has(s.Id)) ||
          (this.ServerProcessingEntities &&
            this.ServerProcessingEntities.has(s.Id)) ||
          (r &&
            r !== this &&
            this.CheckEntityMatchCondition(e, s) &&
            this.NeedBeProcessingEntity.set(s, new PassThroughPortalParam()));
      }
    }
    CheckEntityMatchCondition(t, e) {
      if (t && !(t.length <= 0)) {
        var i = e?.GetComponent(1),
          r = e?.GetComponent(181);
        if (i && r) {
          var s = i.CreatureData.GetBaseInfo();
          if (s)
            for (const o of t) {
              let e = !0;
              if ((0, IUtil_1.isEntitiyMatch)(o, s.Category)) {
                !o.State?.State ||
                  r.ContainsTagByName(o.State.State) ||
                  (e = !1);
                let t = !1;
                if (o.HasProperty && 0 < o.HasProperty.length) {
                  for (const n of o.HasProperty)
                    if (!r.ContainsTagByName(n)) {
                      t = !0;
                      break;
                    }
                  if (t) continue;
                }
                if (((t = !1), o.NoProperty && 0 < o.NoProperty.length)) {
                  for (const h of o.NoProperty)
                    if (r.ContainsTagByName(h)) {
                      t = !0;
                      break;
                    }
                  if (t) continue;
                }
                return [e, !0];
              }
            }
        }
      }
      return [!1, !1];
    }
    TryStartConnect() {
      if (!(this.NeedBeProcessingEntity.size <= 0)) {
        this.Gga.length = 0;
        for (var [t, e] of this.NeedBeProcessingEntity) {
          var i,
            r,
            s = [];
          0 !== e.Type &&
            ((i = e.PortalPairId),
            (r =
              ModelManager_1.ModelManager.CreatureModel?.GetEntity(
                i,
              )?.Entity?.GetComponent(200))) &&
            ((r = r.GetPairCreatureDataId()),
            1 === e.Type
              ? (s.push(MathUtils_1.MathUtils.NumberToLong(i)),
                s.push(MathUtils_1.MathUtils.NumberToLong(r)))
              : 2 === e.Type &&
                (s.push(MathUtils_1.MathUtils.NumberToLong(r)),
                s.push(MathUtils_1.MathUtils.NumberToLong(i)))),
            this.Gga.push({ Target: t, PortalsId: s }),
            ModelManager_1.ModelManager.ConnectGamePlayModel?.SetRelationPortalParam(
              t.Id,
              e,
            );
        }
        this.RequestConnect(this.Entity, this.Gga, !0);
      }
    }
    ServerConnectEntities(t) {
      var e = this.ActorComp.ActorLocationProxy,
        i = UE.NewArray(UE.Vector),
        r = [];
      for (const _ of t) {
        var s = ModelManager_1.ModelManager.CreatureModel?.GetEntity(_);
        if (this.ConnectedEffectPath) {
          var o = s?.Entity?.GetComponent(1);
          if (!o) continue;
          var n = s.Entity.Id,
            h =
              ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
                n,
              );
          switch (h?.Type) {
            case 0:
              this.Nga(e, i, o);
              var a = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
                e,
                i,
                this.ConnectedEffectPath,
              );
              a &&
                this.ActorComp?.Owner &&
                (EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
                  a.EffectHandle,
                  !0,
                ),
                this.EffectSplines.set(n, [a]));
              break;
            case 1:
              this.Fga(e, i, o, h.PortalPairId, !0), this.Vga(i, o, e, n);
              break;
            case 2:
              this.Fga(e, i, o, h.PortalPairId, !1), this.Vga(i, o, e, n);
          }
        }
        r.push(s.Entity.Id), this.ServerProcessingEntities.delete(s.Entity.Id);
      }
      ModelManager_1.ModelManager.ConnectGamePlayModel?.AddConnectedRelation(
        this.Entity.Id,
        r,
      );
    }
    Nga(t, e, i) {
      e.Empty();
      var r = Vector_1.Vector.Create(
          this.ConnectedEffectStartPoint
            ? this.ActorComp?.GetSocketLocation(this.ConnectedEffectStartPoint)
            : this.ActorComp?.ActorLocation,
        ),
        r =
          (r.SubtractionEqual(t),
          e.Add(r.ToUeVector()),
          Vector_1.Vector.Create(
            this.ConnectedEffectEndPoint
              ? i.GetSocketLocation(this.ConnectedEffectEndPoint)
              : i.ActorLocation,
          ));
      r.SubtractionEqual(t), e.Add(r.ToUeVector());
    }
    Fga(t, e, i, r, s) {
      e.Empty();
      var o = Vector_1.Vector.Create(
          this.ConnectedEffectStartPoint
            ? this.ActorComp?.GetSocketLocation(this.ConnectedEffectStartPoint)
            : this.ActorComp?.ActorLocation,
        ),
        n = Vector_1.Vector.Create(),
        h =
          (o.Subtraction(t, n),
          e.Add(n.ToUeVector()),
          Vector_1.Vector.Create(
            this.ConnectedEffectEndPoint
              ? i.GetSocketLocation(this.ConnectedEffectEndPoint)
              : i.ActorLocation,
          )),
        a = ModelManager_1.ModelManager.PortalModel?.GetPortal(r),
        _ = Vector_1.Vector.Create(),
        c =
          (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(h, r, !s, _),
          Vector_1.Vector.Create(
            (s
              ? a?.PortalWorldTransform1
              : a?.PortalWorldTransform2
            ).GetLocation(),
          )),
        l = Vector_1.Vector.Create(
          (s ? a?.PortalWorldTransform1 : a?.PortalWorldTransform2)
            .GetRotation()
            .GetForwardVector(),
        ),
        t =
          (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
            o,
            _,
            c,
            l,
            _,
          ),
          _.IsZero() || (_.SubtractionEqual(t), e.Add(_.ToUeVector())),
          Vector_1.Vector.Create(i.ActorLocationProxy)),
        _ =
          (h.Subtraction(t, n),
          e.Add(n.ToUeVector()),
          Vector_1.Vector.Create());
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, r, s, _),
        (c = Vector_1.Vector.Create(
          (s
            ? a?.PortalWorldTransform2
            : a?.PortalWorldTransform1
          ).GetLocation(),
        )),
        (l = Vector_1.Vector.Create(
          (s ? a?.PortalWorldTransform2 : a?.PortalWorldTransform1)
            .GetRotation()
            .GetForwardVector(),
        )),
        MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(h, _, c, l, _),
        _.IsZero() || (_.SubtractionEqual(t), e.Add(_.ToUeVector()));
    }
    Vga(t, e, i, r) {
      var s,
        o = UE.NewArray(UE.Vector);
      4 === t.Num() &&
        ((s = []),
        o.Empty(),
        o.Add(t.Get(0)),
        o.Add(t.Get(1)),
        (i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
          i,
          o,
          this.ConnectedEffectPath,
        ))) &&
        this.ActorComp?.Owner &&
        (EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
          i.EffectHandle,
          !0,
        ),
        s.push(i),
        o.Empty(),
        o.Add(t.Get(2)),
        o.Add(t.Get(3)),
        (i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
          e.ActorLocationProxy,
          o,
          this.ConnectedEffectPath,
        ))) &&
        e.Owner &&
        (EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
          i.EffectHandle,
          !0,
        ),
        s.push(i),
        this.EffectSplines.set(r, s));
    }
    UQs(t) {
      var e = [];
      for (const r of t) {
        var i = EntitySystem_1.EntitySystem.Get(r);
        i && e.push({ Target: i, PortalsId: [] }),
          ModelManager_1.ModelManager.ConnectGamePlayModel?.RemoveRelationPortalType(
            r,
          );
      }
      e.length <= 0 || this.RequestConnect(this.Entity, e, !1);
    }
    TryCancelAllConnect() {
      var t =
        ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(
          this.Entity.Id,
        );
      if (t && !(t.size <= 0)) {
        var e = [];
        for (const r of t) {
          var i = EntitySystem_1.EntitySystem.Get(r);
          i &&
            !this.ServerProcessingEntities.has(r) &&
            e.push({ Target: i, PortalsId: [] });
        }
        e.length <= 0 || this.RequestConnect(this.Entity, e, !1);
      }
    }
    ServerDisconnectEntities(t) {
      for (const i of t) {
        var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(i);
        e?.Entity &&
          (this.ServerProcessingEntities.delete(e.Entity.Id),
          this.RemoveSpecificSpline(e.Entity.Id),
          ModelManager_1.ModelManager.ConnectGamePlayModel?.RemoveConnectRelation(
            this.Entity.Id,
            e.Entity.Id,
          ));
      }
    }
    ClearEffectSplines() {
      for (var [, t] of this.EffectSplines)
        for (const e of t)
          EffectSystem_1.EffectSystem.IsValid(e.EffectHandle) &&
            EffectSystem_1.EffectSystem.StopEffectById(
              e.EffectHandle,
              "[SceneItemConnectorComponent.ClearEffectSplines]",
              !0,
            ),
            e.SplineActor?.IsValid() &&
              ActorSystem_1.ActorSystem.Put(e.SplineActor);
      this.EffectSplines.clear();
    }
    RemoveSpecificSpline(t) {
      var e = this.EffectSplines.get(t);
      if (e && !(e.length <= 0)) {
        for (const i of e)
          EffectSystem_1.EffectSystem.IsValid(i.EffectHandle) &&
            EffectSystem_1.EffectSystem.StopEffectById(
              i.EffectHandle,
              "[SceneItemConnectorComponent.RemoveSpecificSpline]",
              !0,
            ),
            i.SplineActor?.IsValid() &&
              ActorSystem_1.ActorSystem.Put(i.SplineActor);
        this.EffectSplines.delete(t);
      }
    }
    UpdateConnectorRange(t, i, h = void 0) {
      var e =
        ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(
          this.Entity.Id,
        );
      if (e && !(e.size <= 0)) {
        var a = [];
        for (const f of e)
          if (!this.ServerProcessingEntities.has(f)) {
            var _ = EntitySystem_1.EntitySystem.Get(f);
            if (_) {
              var c = _.GetComponent(1);
              if (c) {
                let e = Vector_1.Vector.Distance(
                  this.ActorComp.ActorLocationProxy,
                  c.ActorLocationProxy,
                );
                let r = MathUtils_1.MathUtils.MaxFloat,
                  s = 0,
                  o = MathUtils_1.MathUtils.MaxFloat,
                  n = 0;
                var c =
                    ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
                      f,
                    ),
                  l =
                    (ModelManager_1.ModelManager.PortalModel.GetPortals().forEach(
                      (t, e) => {
                        var i = this.$ga(f, !0, e);
                        i < r && ((r = i), (s = e)),
                          (i = this.$ga(f, !1)) < o && ((o = i), (n = e));
                      },
                    ),
                    Math.min(r, o)),
                  m = r < o ? 1 : 2;
                if ((m = e < l ? 0 : m) !== c?.Type) {
                  let t = 0;
                  0 != m && (t = 1 == m ? s : n),
                    (e = l),
                    ModelManager_1.ModelManager.ConnectGamePlayModel?.SetRelationPortalParam(
                      f,
                      new PassThroughPortalParam(m, t, e),
                    );
                }
                switch (m) {
                  case 1:
                    e = r;
                    break;
                  case 2:
                    e = o;
                }
                e > t
                  ? (a.push(f), this.jna(f))
                  : (this.CheckEntityMatchCondition(i, _) &&
                      (!h || h(f)) &&
                      this.ywa(f)) ||
                    a.push(f);
              } else a.push(f);
            } else a.push(f);
          }
        this.UQs(a);
      }
    }
    ywa(e, i, r) {
      this.uoe || this.k7r();
      var s = Global_1.Global.BaseCharacter,
        s =
          (s &&
            (this.uoe.ActorsToIgnore.Empty(), this.uoe.ActorsToIgnore.Add(s)),
          this.uoe.SetDrawDebugTrace(
            CommonConnectComponent_1.DrawTraceDebug ? 2 : 0,
          ),
          EntitySystem_1.EntitySystem.GetComponent(e, 1));
      if (!s) return !1;
      i =
        i ??
        ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
          e,
        )?.Type;
      if (0 === i)
        return (
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.uoe,
            this.ActorComp.ActorLocation,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            this.uoe,
            s.ActorLocation,
          ),
          !TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) || this.I0a(s)
        );
      if (1 === i || 2 === i) {
        var o = Vector_1.Vector.Create(s.ActorLocationProxy),
          i = 1 === i,
          r =
            r ??
            ModelManager_1.ModelManager.ConnectGamePlayModel.GetRelationPassThroughParam(
              e,
            ).PortalPairId,
          e = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
        if (!e) return !1;
        var n =
            ModelManager_1.ModelManager.CreatureModel?.GetEntity(
              r,
            )?.Entity?.GetComponent(200),
          h = ModelManager_1.ModelManager.CreatureModel?.GetEntity(
            n.GetPairCreatureDataId(),
          )?.Entity?.GetComponent(200),
          n = n?.GetTriggerComp(),
          h = h?.GetTriggerComp();
        if (!n || !h) return !1;
        var a = Vector_1.Vector.Create(),
          o = Vector_1.Vector.Create(o),
          _ = Vector_1.Vector.Create(),
          c =
            (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(o, r, !i, _),
            i ? e.PortalWorldTransform1 : e.PortalWorldTransform2),
          l = Vector_1.Vector.Create(c.GetLocation()),
          c = Vector_1.Vector.Create(c.GetRotation().GetForwardVector()),
          m = Vector_1.Vector.Create(this.ActorComp.ActorLocation),
          _ =
            (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
              m,
              _,
              l,
              c,
              a,
            ),
            i ? n : h),
          l = i ? e.PortalWorldTransform1 : e.PortalWorldTransform2;
        if (!this.Iwa(a, l, _.K2_GetComponentLocation(), _.BoxExtent))
          return !1;
        if (a.IsZero()) return !1;
        let t = !0;
        if (
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.uoe,
            this.ActorComp.ActorLocation,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a),
          !(t =
            !TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.uoe,
              PROFILE_KEY,
            ) || this.Twa()))
        )
          return t;
        (c = Vector_1.Vector.Create()),
          (n =
            (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(m, r, i, c),
            i ? e.PortalWorldTransform2 : e.PortalWorldTransform1)),
          (h = Vector_1.Vector.Create(n.GetLocation())),
          (l = Vector_1.Vector.Create(n.GetRotation().GetForwardVector()));
        if (
          (MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
            c,
            o,
            h,
            l,
            a,
          ),
          a.IsZero())
        )
          return !1;
        if (
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.uoe,
            a,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, o),
          !(t =
            !TraceElementCommon_1.TraceElementCommon.LineTrace(
              this.uoe,
              PROFILE_KEY,
            ) || this.Twa(s)))
        )
          return t;
      }
      return !0;
    }
    Iwa(t, e, i, r) {
      e.SetLocation(i);
      i = e.InverseTransformPositionNoScale(t.ToUeVector());
      return Math.abs(i.Y) <= r.Y && Math.abs(i.Z) <= r.Z;
    }
    I0a(e) {
      if (this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var i = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== i) {
            let t = void 0;
            if (
              (t = (
                UE.KuroStaticLibrary.IsImplementInterface(
                  i.GetClass(),
                  UE.BPI_CreatureInterface_C.StaticClass(),
                )
                  ? ActorUtils_1.ActorUtils
                  : ModelManager_1.ModelManager.SceneInteractionModel
              ).GetEntityByActor(i))?.Id === e.Entity.Id
            )
              break;
            return !1;
          }
        }
      return !0;
    }
    Twa(e) {
      if (this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var i = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== i) {
            if (!e) return !1;
            {
              let t = void 0;
              if (
                (t = (
                  UE.KuroStaticLibrary.IsImplementInterface(
                    i.GetClass(),
                    UE.BPI_CreatureInterface_C.StaticClass(),
                  )
                    ? ActorUtils_1.ActorUtils
                    : ModelManager_1.ModelManager.SceneInteractionModel
                ).GetEntityByActor(i))?.Id !== e.Entity.Id
              )
                return !1;
            }
          }
        }
      return !0;
    }
    $ga(t, e, i) {
      var r,
        s,
        o,
        n,
        h =
          ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
            t,
          );
      return !h ||
        !(r = ModelManager_1.ModelManager.PortalModel?.GetPortal(
          i ?? h.PortalPairId,
        )) ||
        !(t = EntitySystem_1.EntitySystem.GetComponent(t, 1)) ||
        (([r, n] = e
          ? [
              Vector_1.Vector.Create(
                r.PortalWorldTransform1.GetRotation().GetForwardVector(),
              ),
              Vector_1.Vector.Create(r.PortalWorldTransform1.GetLocation()),
            ]
          : [
              Vector_1.Vector.Create(
                r.PortalWorldTransform2.GetRotation().GetForwardVector(),
              ),
              Vector_1.Vector.Create(r.PortalWorldTransform2.GetLocation()),
            ]),
        (s = this.ActorComp.ActorLocationProxy),
        (o = Vector_1.Vector.Create()),
        s.Subtraction(n, o),
        o.Normalize(),
        Vector_1.Vector.DotProduct(r, o) < 0)
        ? MathUtils_1.MathUtils.MaxFloat
        : ((n = Vector_1.Vector.Create()),
          PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
            t.ActorLocationProxy,
            i ?? h.PortalPairId,
            !e,
            n,
          ),
          Vector_1.Vector.Dist(n, s));
    }
    UpdateSplineEffect() {
      var t,
        e,
        i = this.ActorComp.ActorLocationProxy,
        r = UE.NewArray(UE.Vector);
      for ([t, e] of this.EffectSplines) {
        var s = EntitySystem_1.EntitySystem.GetComponent(t, 1);
        if (s)
          if (1 === e.length) {
            var o =
              ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
                s.Entity.Id,
              );
            o &&
              (0 !== o.Type
                ? (this.RemoveSpecificSpline(s.Entity.Id),
                  this.Fga(i, r, s, o.PortalPairId, 1 === o.Type),
                  this.Vga(r, s, i, s.Entity.Id))
                : (this.Nga(i, r, s),
                  e[0].SplineActor.K2_SetActorLocation(
                    this.ActorComp?.ActorLocation,
                    !1,
                    void 0,
                    !1,
                  ),
                  e[0].SplineComp.SetSplinePoints(r, 0)));
          } else if (2 === e.length) {
            o =
              ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationPassThroughParam(
                s.Entity.Id,
              );
            if (o)
              if (0 === o.Type) {
                this.RemoveSpecificSpline(s.Entity.Id), this.Nga(i, r, s);
                var n = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(
                  i,
                  r,
                  this.ConnectedEffectPath,
                );
                if (!n || !this.ActorComp?.Owner) break;
                EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
                  n.EffectHandle,
                  !0,
                ),
                  this.EffectSplines.set(s.Entity.Id, [n]);
              } else {
                this.Fga(i, r, s, o.PortalPairId, 1 === o.Type);
                n = UE.NewArray(UE.Vector);
                e[0].SplineActor.K2_SetActorLocation(
                  this.ActorComp?.ActorLocation,
                  !1,
                  void 0,
                  !1,
                ),
                  n.Empty(),
                  n.Add(r.Get(0)),
                  n.Add(r.Get(1)),
                  e[0].SplineComp.SetSplinePoints(n, 0),
                  e[1].SplineActor.K2_SetActorLocation(
                    s.ActorLocation,
                    !1,
                    void 0,
                    !1,
                  ),
                  n.Empty(),
                  n.Add(r.Get(2)),
                  n.Add(r.Get(3)),
                  e[1].SplineComp.SetSplinePoints(n, 0);
              }
          }
      }
    }
    RequestConnect(t, e, i) {
      var r = Protocol_1.Aki.Protocol.a$s.create(),
        t = t.GetComponent(0),
        s = Protocol_1.Aki.Protocol.g$s.create();
      (s.d$s = MathUtils_1.MathUtils.NumberToLong(t.GetCreatureDataId())),
        (s.KHa = []);
      for (const h of e) {
        var o = h.Target.GetComponent(0),
          n = Protocol_1.Aki.Protocol.eoh.create();
        (n.CVn = MathUtils_1.MathUtils.NumberToLong(o.GetCreatureDataId())),
          (n.$Ha = h.PortalsId),
          s.KHa.push(n),
          this.ServerProcessingEntities.add(h.Target.Id);
      }
      (s.C$s = i),
        (r.g$s = s),
        Net_1.Net.Call(24239, r, (t) => {
          switch (
            (e.forEach((t) => {
              this.ServerProcessingEntities.delete(t.Target.Id);
            }),
            t?.Q4n)
          ) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrConnectorEntityNoExist:
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                21324,
              );
          }
        });
    }
    k7r() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = this.ActorComp.Owner),
        (this.uoe.bIgnoreSelf = !0),
        (this.uoe.bIsSingle = !1),
        (this.uoe.bIsProfile = !0),
        (this.uoe.ProfileName = TRACE_CHECK_PRESET_NAME),
        this.uoe.SetDrawDebugTrace(2),
        (this.uoe.DrawTime = 0.5),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.uoe,
          ColorUtils_1.ColorUtils.LinearRed,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.uoe,
          ColorUtils_1.ColorUtils.LinearGreen,
        );
    }
    wna(t) {
      this.fie = 2;
      t = t.GetParam(CommonConnectComponent_1)[0];
      return (this.Tna = t), !0;
    }
    bna() {
      return (
        (this.ActorComp = this.Entity.GetComponent(3)),
        (this.Lna = this.Entity.GetComponent(108)),
        (this.OWa = this.Entity.GetComponent(190)),
        "Range" === this.Tna.LogicType.Type &&
          ((this.cQs = this.Tna.LogicType.EnterRange),
          (this.mQs = this.Tna.LogicType.LeaveRange),
          (this.ConnectedEffectPath =
            this.Tna.LogicType.EffectConfig.EffectPath),
          (this.ConnectedEffectStartPoint =
            FNameUtil_1.FNameUtil.GetDynamicFName(
              this.Tna.LogicType.EffectConfig.StartPoint,
            )),
          (this.ConnectedEffectEndPoint = FNameUtil_1.FNameUtil.GetDynamicFName(
            this.Tna.LogicType.EffectConfig.EndPoint,
          ))),
        !0
      );
    }
    Gna() {
      this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
        this.Vna();
      }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval);
      var t = new ConnectNearbySensory_1.ConnectNearbySensory();
      t.Init(this.mQs),
        (t.OnEnterSensoryRange = (t) => this.Hna(t)),
        (t.OnExitSensoryRange = (t) => {
          this.jna(t);
        }),
        (this.EZa = t),
        (this.Dna = this.Lna.AddSensoryInfo(t));
    }
    Nna(t) {
      "Range" === this.Tna.LogicType.Type &&
        (this.GWa() || this.TryCancelAllConnect(),
        this.UpdateConnectorRange(
          this.mQs,
          this.Tna?.LogicType.KeepConditions,
          this.Ana,
        ),
        this.UpdateSplineEffect());
    }
    Fna() {
      return (
        0 <= this.Dna &&
          (this.Lna?.RemoveSensoryInfo(this.Dna), (this.Dna = -1)),
        this.pQs &&
          (TimerSystem_1.TimerSystem.Remove(this.pQs),
          (this.pQs = void 0),
          this.TryCancelAllConnect()),
        !0
      );
    }
    Vna() {
      this.NeedBeProcessingEntity.clear(), this.CanInteractEntity.clear();
      for (const r of this.Una) {
        var t,
          e,
          i = EntitySystem_1.EntitySystem.Get(r);
        i &&
          i?.Valid &&
          (this.NeedBeProcessingEntity.has(i) ||
            (([t, e] = this.yzt(i)),
            t &&
              this.NeedBeProcessingEntity.set(i, new PassThroughPortalParam()),
            e &&
              !this.CanInteractEntity.has(i) &&
              this.CanInteractEntity.add(i)));
      }
      ModelManager_1.ModelManager.PortalModel.GetPortals().forEach((t, e) => {
        this.Hga(e, !0), this.Hga(e, !1);
      }),
        this.GWa() && this.TryStartConnect(),
        0 === this.bWa && 0 !== this.CanInteractEntity.size
          ? this.OWa?.HasTag(this.qWa) ||
            (this.OWa?.AddTag(this.qWa), this.NXa(!0))
          : 0 !== this.bWa &&
            0 === this.CanInteractEntity.size &&
            this.OWa?.HasTag(this.qWa) &&
            (this.OWa?.RemoveTag(this.qWa), this.NXa(!1)),
        (this.bWa = this.CanInteractEntity.size);
    }
    NXa(t) {
      var e = Protocol_1.Aki.Protocol.bth.create(),
        i = MathUtils_1.MathUtils.NumberToLong(
          this.ActorComp.CreatureData.GetCreatureDataId(),
        );
      (e.F4n = i),
        (e.SDs = t),
        Net_1.Net.Call(16180, e, (t) => {
          t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Q4n,
              22034,
            );
        });
    }
    GWa() {
      var t = this.Tna?.LogicType.TagConditions;
      if (t && 0 !== t.length)
        for (const e of t) if (!this.OWa?.HasTag(e)) return !1;
      return !0;
    }
    Hga(t, e) {
      if (t) {
        var i = ModelManager_1.ModelManager.PortalModel.GetPortal(t);
        if (i && i.Portal1Enable && i.Portal2Enable) {
          var r =
              ModelManager_1.ModelManager.CreatureModel?.GetEntity(
                t,
              )?.Entity?.GetComponent(200),
            s = (0, puerts_1.$ref)(void 0),
            s = (r?.PortalCapture?.GetPair(s), (0, puerts_1.$unref)(s));
          if (e ? r?.GetPbDataId() : s?.PbdataId) {
            var [r, s] = e
                ? [i.PortalWorldTransform1, i.PortalWorldTransform2]
                : [i.PortalWorldTransform2, i.PortalWorldTransform1],
              i = Vector_1.Vector.Create(r.GetLocation()),
              o = Vector_1.Vector.Create(s.GetLocation()),
              n = this.ActorComp.ActorLocationProxy;
            const C = Vector_1.Vector.Create();
            n.Subtraction(i, C), (C.Z = 0), C.Normalize();
            n = Vector_1.Vector.Create(r.GetRotation().GetForwardVector());
            n.Normalize();
            const M = Vector_1.Vector.DotProduct(n, C);
            if (!(M < 0)) {
              var h = Vector_1.Vector.Create(
                  s.GetRotation().GetForwardVector(),
                ),
                i = (h.Normalize(), []),
                a =
                  (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
                    o,
                    this.cQs,
                    1,
                    i,
                  ),
                  this.Tna?.LogicType),
                _ =
                  ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(
                    this.Entity.Id,
                  );
              for (const E of i) {
                var c = E.Entity;
                if (
                  c &&
                  !_?.has(c.Id) &&
                  !this.ServerProcessingEntities.has(c.Id)
                ) {
                  var l,
                    m,
                    f,
                    v = c.GetComponent(1);
                  if (v) {
                    const C = Vector_1.Vector.Create(),
                      M =
                        (v.ActorLocationProxy.Subtraction(o, C),
                        C.Normalize(),
                        (C.Z = 0),
                        Vector_1.Vector.DotProduct(h, C));
                    M < 0.5 ||
                      ((l = Vector_1.Vector.Create()),
                      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                        v.ActorLocationProxy,
                        t,
                        !e,
                        l,
                      ),
                      (v = Vector_1.Vector.Distance(
                        l,
                        this.ActorComp.ActorLocationProxy,
                      )) > this.cQs) ||
                      (this.ywa(c.Id, e ? 1 : 2, t) &&
                        ((l = c.GetComponent(209)),
                        ([m, f] = this.CheckEntityMatchCondition(
                          a?.MatchConditions,
                          c,
                        )),
                        l &&
                          (m &&
                            this.NeedBeProcessingEntity.set(
                              c,
                              new PassThroughPortalParam(e ? 1 : 2, t, v),
                            ),
                          f) &&
                          this.CanInteractEntity.add(c),
                        this.Hna(c)));
                  }
                }
              }
            }
          }
        }
      }
    }
    yzt(t) {
      var e;
      return ModelManager_1.ModelManager.ConnectGamePlayModel?.GetRelationByEntityId(
        this.Entity.Id,
      )?.has(t.Id) || this.ServerProcessingEntities.has(t.Id)
        ? [!1, !0]
        : this.ActorComp &&
            (e = this.Tna?.LogicType) &&
            t.GetComponent(1) &&
            this.ywa(t.Id, 0) &&
            t.GetComponent(209)
          ? this.CheckEntityMatchCondition(e?.MatchConditions, t)
          : [!1, !1];
    }
    Hna(t) {
      return t.GetComponent(209) && this.Una.add(t.Id), !0;
    }
    jna(t) {
      this.Una.delete(t), this.EZa?.OnEntityExitConnectRange(t);
    }
    Pna(t) {
      this.fie = 1;
      t = t.GetParam(CommonConnectComponent_1)[0];
      return (this.Rna = t), !0;
    }
    Bna() {
      return (
        (this.ActorComp = this.Entity.GetComponent(187)),
        (this.mBe = this.Entity.GetComponent(120)),
        this.Rna?.LogicType.MatchConditions &&
          EventSystem_1.EventSystem.AddWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        (this.mBe = this.Entity.GetComponent(120)),
        "Range" === this.Rna.LogicType.Type &&
          ((this.EQs = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            this.Rna.LogicType.ActiveState,
          )),
          (this.cQs = this.Rna.LogicType.EnterRange),
          (this.mQs = this.Rna.LogicType.LeaveRange),
          (this.ConnectedEffectPath =
            this.Rna.LogicType.EffectConfig.EffectPath),
          (this.ConnectedEffectStartPoint =
            FNameUtil_1.FNameUtil.GetDynamicFName(
              this.Rna.LogicType.EffectConfig.StartPoint,
            )),
          (this.ConnectedEffectEndPoint = FNameUtil_1.FNameUtil.GetDynamicFName(
            this.Rna.LogicType.EffectConfig.EndPoint,
          ))),
        !0
      );
    }
    qna() {
      this.Kko() &&
        this.Rna?.LogicType.MatchConditions &&
        (this.pQs = TimerSystem_1.TimerSystem.Forever(() => {
          this.xna();
        }, ModelManager_1.ModelManager.ConnectGamePlayModel.TryConnectInterval));
    }
    Ona(t) {
      "Range" === this.Rna.LogicType.Type &&
        this.UpdateConnectorRange(this.mQs, this.Rna?.LogicType.KeepConditions);
    }
    kna() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.g_n,
          ),
        !0
      );
    }
    Kko() {
      return !(!this.mBe || !this.EQs) && this.mBe.StateTagId === this.EQs;
    }
    xna() {
      this.LQs(), this.TryStartConnect();
    }
    LQs() {
      if (this.ActorComp) {
        var t = this.Rna?.LogicType;
        if (t) {
          this.NeedBeProcessingEntity.clear(),
            ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
              this.ActorComp.ActorLocationProxy,
              this.cQs,
              1,
              this.DKo,
            );
          var e = [];
          for (const i of this.DKo) e.push(i.Entity);
          this.GetNeedBeProcessingEntity(e, t.MatchConditions);
        }
      }
    }
  });
(CommonConnectComponent.DrawTraceDebug = !1),
  (CommonConnectComponent = CommonConnectComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(209)],
      CommonConnectComponent,
    )),
  (exports.CommonConnectComponent = CommonConnectComponent);
//# sourceMappingURL=CommonConnectComponent.js.map
