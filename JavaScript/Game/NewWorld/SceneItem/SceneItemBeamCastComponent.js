"use strict";
let SceneItemBeamCastComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const o = arguments.length;
    let a =
      o < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, s);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (h = t[r]) && (a = (o < 3 ? h(a) : o > 3 ? h(e, i, a) : h(e, i)) || a);
    return o > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBeamCastComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ColorUtils_1 = require("../../Utils/ColorUtils");
const RoleTriggerController_1 = require("../Character/Role/RoleTriggerController");
const UPDATE_INTERVAL_MS = 100;
let SceneItemBeamCastComponent =
  (SceneItemBeamCastComponent_1 = class SceneItemBeamCastComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.SIe = void 0),
        (this.ktn = void 0),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.Hte = void 0),
        (this.Hmn = void 0),
        (this.jmn = Time_1.Time.WorldTime),
        (this.Wmn = -0),
        (this.Kmn = void 0),
        (this.Cji = void 0),
        (this.Qmn = Vector_1.Vector.Create()),
        (this.Xmn = Vector_1.Vector.Create()),
        (this.$mn = -0),
        (this.Ymn = Vector_1.Vector.Create()),
        (this.Jmn = Vector_1.Vector.Create()),
        (this.zmn = -0),
        (this.Zmn = void 0),
        (this.edn = void 0),
        (this.tdn = void 0),
        (this.idn = void 0),
        (this.odn = void 0),
        (this.GDn = void 0),
        (this.Usi = !1),
        (this.Qnn = () => {
          (this.Usi = !0),
            this.mBe.IsInState(0) || this.G_n(),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.G_n,
            );
        }),
        (this.G_n = () => {
          this.rdn();
        }),
        (this.ndn = (t, e) => {
          const i = this.Ntn(e);
          (i && i.Id === this.Entity.Id) ||
            (t ? this.Kmn.add(e) : this.Kmn.delete(e), this.rdn());
        });
    }
    OnInitData(t) {
      this.SIe = this.Entity.GetComponent(0);
      t = t.GetParam(SceneItemBeamCastComponent_1)[0];
      if (!t)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 40, "[BeamCastComp] 组件配置缺失", [
              "PbDataId",
              this.SIe?.GetPbDataId(),
            ]),
          !1
        );
      this.Lo = t;
      t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
        this.Lo.TargetState,
      );
      if (!t) return !1;
      (this.Wmn = t), (this.$mn = this.Lo.Range.Height);
      t = this.Lo.Range.Center;
      return (
        this.Qmn.FromConfigVector(t),
        this.Xmn.FromConfigVector(t),
        (this.Qmn.Z -= this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
        (this.Xmn.Z += this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
        this.Ymn.FromConfigVector(t),
        this.Jmn.FromConfigVector(t),
        (this.Ymn.Z -= this.Lo.Range.Height / 2),
        (this.Jmn.Z = this.Ymn.Z),
        (this.idn = UE.NewArray(UE.Vector)),
        this.idn.Add(this.Ymn.ToUeVector()),
        this.idn.Add(this.Jmn.ToUeVector()),
        !0
      );
    }
    OnStart() {
      return (
        (this.ktn = this.Entity.GetComponent(74)),
        (this.mBe = this.Entity.GetComponent(117)),
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Lie = this.Entity.GetComponent(177)),
        this.ktn && this.mBe && this.Hte && this.Lie
          ? ((this.Kmn = new Set()),
            this.ktn.AddOnActorOverlapCallback(this.ndn),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[BeamCastComp] 组件缺失",
                ["PbDataId", this.SIe?.GetPbDataId()],
                ["RangeComponent", !!this.ktn],
                ["SceneItemStateComponent", !!this.mBe],
                ["SceneItemActorComponent", !!this.Hte],
                ["EntityCommonTagComponent", !!this.Lie],
              ),
            !1)
      );
    }
    OnActivate() {
      this.sdn("[BeamCastComp] 初始停止Tick"),
        this.Hte.GetIsSceneInteractionLoadCompleted()
          ? this.Qnn()
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Qnn,
            );
    }
    OnEnd() {
      return (
        this.ktn?.RemoveOnActorOverlapCallback(this.ndn),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Qnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Qnn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.G_n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.G_n,
          ),
        this.odn &&
          EffectSystem_1.EffectSystem.IsValid(this.odn) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.odn,
            "[BeamCastComp.OnEnd]",
            !0,
          ),
        this.GDn &&
          EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.GDn,
            "[BeamCastComp.OnEnd]",
            !0,
          ),
        this.edn?.IsValid() &&
          (this.edn.K2_DetachFromActor(),
          ActorSystem_1.ActorSystem.Put(this.edn),
          (this.edn = void 0),
          (this.tdn = void 0)),
        (this.Kmn = void 0),
        !(this.Cji = void 0)
      );
    }
    OnTick(t) {
      !this.adn() ||
        this.Kmn.size < 0 ||
        (Time_1.Time.WorldTime - this.jmn > UPDATE_INTERVAL_MS &&
          ((this.jmn = Time_1.Time.WorldTime), this.hdn()));
    }
    rdn() {
      this.adn()
        ? (this.ldn(),
          this.Kmn.size < 0
            ? this.sdn("[BeamCastComp] 范围内无Actor，停止Tick")
            : this._dn())
        : (this.udn(),
          this.NDn(),
          this.sdn("[BeamCastComp] 不在活跃状态，停止Tick"));
    }
    adn() {
      return this.Usi && this.Lie.HasTag(this.Wmn);
    }
    mdn() {
      return void 0 === this.Hmn;
    }
    _dn() {
      this.mdn() ||
        (this.Enable(this.Hmn, "SceneItemBeamCastComponent.EnableTraceTick"),
        (this.Hmn = void 0));
    }
    sdn(t) {
      this.mdn() && (this.Hmn = this.Disable(t));
    }
    uJr() {
      if (!this.Cji) {
        (this.Cji = UE.NewObject(UE.TraceBoxElement.StaticClass())),
          (this.Cji.bIsSingle = !0),
          this.Cji.ActorsToIgnore.Empty();
        const e =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
            this.Hte.GetSceneInteractionLevelHandleId(),
          );
        for (let t = 0; t < e.Num(); t++) this.Cji.ActorsToIgnore.Add(e.Get(t));
        (this.Cji.bIgnoreSelf = !0),
          this.Cji.SetBoxHalfSize(
            this.Lo.Range.Radius,
            this.Lo.Range.Radius,
            this.Lo.Range.Radius,
          );
        var t = UE.NewArray(UE.BuiltinByte);
        var t =
          (t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
          t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic),
          t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
          (0, puerts_1.$ref)(t));
        this.Cji.SetObjectTypesQuery(t);
      }
      (this.Cji.WorldContextObject = this.Hte.Owner),
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
          this.Cji,
          this.Hte.ActorRotationProxy,
        );
      (t = MathUtils_1.MathUtils.CommonTempVector),
        MathUtils_1.MathUtils.TransformPosition(
          this.Hte.ActorLocationProxy,
          this.Hte.ActorRotationProxy,
          this.Hte.ActorScaleProxy,
          this.Qmn,
          t,
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Cji, t),
        (t = MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.TransformPosition(
        this.Hte.ActorLocationProxy,
        this.Hte.ActorRotationProxy,
        this.Hte.ActorScaleProxy,
        this.Xmn,
        t,
      ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Cji, t);
    }
    hdn() {
      this.uJr();
      let e = this.$mn;
      let i = void 0;
      const t = TraceElementCommon_1.TraceElementCommon.BoxTrace(
        this.Cji,
        "[BeamCastComp.TraceAndUpdate]",
      );
      const s = this.Cji.HitResult;
      if (t && s?.bBlockingHit)
        for (let t = 0; t < s.GetHitCount(); ++t) {
          var h = s.ImpactPointX_Array.Get(t);
          var o = s.ImpactPointY_Array.Get(t);
          var a = s.ImpactPointZ_Array.Get(t);
          var h = Vector_1.Vector.Create(h, o, a);
          var o = MathUtils_1.MathUtils.CommonTempVector;
          var a =
            (MathUtils_1.MathUtils.InverseTransformPosition(
              this.Hte.ActorLocationProxy,
              this.Hte.ActorRotationProxy,
              this.Hte.ActorScaleProxy,
              h,
              o,
            ),
            o.Z - this.Ymn.Z);
          a < 0 ||
            a > e ||
            !(h = s.Actors.Get(t))?.IsValid() ||
            ((o = this.Ntn(h)) && o.Id === this.Entity.Id) ||
            ((e = a), (i = h));
        }
      this.ddn(i, e), this.Cji.ClearCacheData();
    }
    ddn(t, e) {
      this.Cdn(e), this.gdn(), this.ODn();
      let i;
      var e = this.SIe.GetEntityOnlineInteractType();
      var e =
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          e,
          !1,
        );
      const s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        this.Entity.Id,
      );
      var t = this.Ntn(t);
      !this.Zmn?.Valid ||
        (t && t.Id === this.Zmn.Id) ||
        ((i = this.Zmn.Entity),
        (this.Zmn = void 0),
        e &&
          EventSystem_1.EventSystem.EmitWithTarget(
            i,
            EventDefine_1.EEventName.BeamCastStop,
            s,
          )),
        t?.Valid &&
          !this.Zmn &&
          ((i = t.Entity), (this.Zmn = t), e) &&
          EventSystem_1.EventSystem.EmitWithTarget(
            i,
            EventDefine_1.EEventName.BeamCastStart,
            s,
          );
    }
    Cdn(t) {
      (this.zmn = MathUtils_1.MathUtils.Clamp(t, 0, this.$mn)),
        (this.Jmn.Z = this.Ymn.Z + this.zmn);
    }
    ldn() {
      if (!this.edn?.IsValid()) {
        if (
          ((this.edn = ActorSystem_1.ActorSystem.Get(
            UE.BP_BasePathLine_C.StaticClass(),
            this.Hte.Owner.GetTransform(),
          )),
          !this.edn?.IsValid())
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] BeamSplineActor创建失败",
              ["PbDataId", this.SIe?.GetPbDataId()],
            )
          );
        this.edn.K2_AttachToActor(this.Hte.Owner, void 0, 2, 2, 2, !1),
          (this.tdn = this.edn.GetComponentByClass(
            UE.SplineComponent.StaticClass(),
          )),
          this.tdn.ClearSplinePoints();
      }
      const t = this.Lo.EffectPath;
      if (!this.odn || !EffectSystem_1.EffectSystem.IsValid(this.odn)) {
        if (
          ((this.odn = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            this.edn.GetTransform(),
            t,
            "[BeamCastComp.CastBeam]",
          )),
          !EffectSystem_1.EffectSystem.IsValid(this.odn))
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] BeamEffect创建失败",
              ["PbDataId", this.SIe?.GetPbDataId()],
            )
          );
        EffectSystem_1.EffectSystem.GetEffectActor(this.odn).K2_AttachToActor(
          this.edn,
          void 0,
          2,
          2,
          2,
          !1,
        );
      }
      (this.jmn = Time_1.Time.WorldTime), this.hdn();
    }
    udn() {
      this.odn &&
        EffectSystem_1.EffectSystem.IsValid(this.odn) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.odn,
          "[BeamCastComp.StopBeam]",
          !0,
        ),
        this.ddn(void 0, 0);
    }
    $rt() {
      let t, e, i, s;
      !this.Hte?.Owner ||
        !(t = this.Lo.HitEffectPath) ||
        (this.GDn && EffectSystem_1.EffectSystem.IsValid(this.GDn)) ||
        ((i = (e = this.Hte.ActorTransform).TransformPosition(
          this.Jmn.ToUeVector(),
        )),
        (s = MathUtils_1.MathUtils.CommonTempQuat),
        Vector_1.Vector.UpVectorProxy.ToOrientationQuat(s),
        (s = e.TransformRotation(s.ToUeQuat())),
        (s = new UE.Transform(s, i, e.GetScale3D())),
        (this.GDn = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          s,
          t,
          "[BeamCastComp.UpdateHitEffect]",
        )),
        EffectSystem_1.EffectSystem.IsValid(this.GDn)
          ? EffectSystem_1.EffectSystem.GetEffectActor(
              this.GDn,
            ).K2_AttachToActor(this.Hte.Owner, void 0, 1, 1, 1, !1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] HitEffect创建失败",
              ["PbDataId", this.SIe?.GetPbDataId()],
            ));
    }
    NDn() {
      this.GDn &&
        EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.GDn,
          "[BeamCastComp.StopHitEffect]",
          !0,
        );
    }
    gdn() {
      this.edn?.IsValid() &&
        (this.odn &&
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
            this.odn,
            this.zmn > 0,
          ),
        this.idn.Empty(),
        this.idn.Add(this.Ymn.ToUeVector()),
        this.idn.Add(this.Jmn.ToUeVector()),
        this.tdn.SetSplinePoints(this.idn, 0, !0));
    }
    ODn() {
      let t, e;
      this.Hte?.Owner?.IsValid() &&
        (this.zmn >= this.$mn
          ? this.NDn()
          : (this.$rt(),
            this.GDn &&
              EffectSystem_1.EffectSystem.IsValid(this.GDn) &&
              ((t = EffectSystem_1.EffectSystem.GetEffectActor(this.GDn)),
              (e = MathUtils_1.MathUtils.CommonTempRotator).Set(90, 0, 0),
              t?.K2_SetActorRelativeLocation(
                this.Jmn.ToUeVector(),
                !1,
                void 0,
                !1,
              ),
              t?.K2_SetActorRelativeRotation(
                e.ToUeRotator(),
                !1,
                void 0,
                !1,
              ))));
    }
    Ntn(t) {
      if (t?.IsValid())
        return t ===
          RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              Global_1.Global.BaseCharacter.EntityId,
            )
          : ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
    }
    ToggleDebugMode(t) {
      this.Cji &&
        (t &&
          ((this.Cji.DrawTime = 0.5),
          TraceElementCommon_1.TraceElementCommon.SetTraceColor(
            this.Cji,
            ColorUtils_1.ColorUtils.LinearGreen,
          ),
          TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
            this.Cji,
            ColorUtils_1.ColorUtils.LinearRed,
          )),
        this.Cji.SetDrawDebugTrace(t ? 2 : 0));
    }
  });
(SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(192)],
    SceneItemBeamCastComponent,
  )),
  (exports.SceneItemBeamCastComponent = SceneItemBeamCastComponent);
// # sourceMappingURL=SceneItemBeamCastComponent.js.map
