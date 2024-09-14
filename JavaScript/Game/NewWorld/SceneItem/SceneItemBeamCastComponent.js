"use strict";
var SceneItemBeamCastComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        r = arguments.length,
        o =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (h = t[a]) &&
            (o = (r < 3 ? h(o) : 3 < r ? h(e, i, o) : h(e, i)) || o);
      return 3 < r && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBeamCastComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ColorUtils_1 = require("../../Utils/ColorUtils"),
  RoleTriggerController_1 = require("../Character/Role/RoleTriggerController"),
  UPDATE_INTERVAL_MS = 100;
let SceneItemBeamCastComponent =
  (SceneItemBeamCastComponent_1 = class SceneItemBeamCastComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.vtn = void 0),
        (this.mBe = void 0),
        (this.Lie = void 0),
        (this.Hte = void 0),
        (this.Smn = void 0),
        (this.ymn = Time_1.Time.WorldTime),
        (this.Imn = -0),
        (this.Tmn = void 0),
        (this.mWi = void 0),
        (this.Lmn = Vector_1.Vector.Create()),
        (this.Dmn = Vector_1.Vector.Create()),
        (this.Rmn = -0),
        (this.Umn = Vector_1.Vector.Create()),
        (this.Amn = Vector_1.Vector.Create()),
        (this.Pmn = -0),
        (this.xmn = void 0),
        (this.wmn = void 0),
        (this.Bmn = void 0),
        (this.bmn = void 0),
        (this.qmn = void 0),
        (this.jUn = void 0),
        (this.Uai = !1),
        (this.DFa = void 0),
        (this.Rnn = () => {
          (this.Uai = !0),
            this.mBe.IsInState(0) || this.g_n(),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.g_n,
            );
        }),
        (this.g_n = () => {
          this.Gmn();
        }),
        (this.Nmn = (t, e) => {
          var i = this.ftn(e);
          (i && i.Id === this.Entity.Id) ||
            (t ? this.Tmn.add(e) : this.Tmn.delete(e), this.Gmn(), this.RFa());
        });
    }
    OnInitData(t) {
      this.EIe = this.Entity.GetComponent(0);
      t = t.GetParam(SceneItemBeamCastComponent_1)[0];
      if (!t)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 40, "[BeamCastComp] 组件配置缺失", [
              "PbDataId",
              this.EIe?.GetPbDataId(),
            ]),
          !1
        );
      this.Lo = t;
      t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
        this.Lo.TargetState,
      );
      if (!t) return !1;
      (this.Imn = t), (this.Rmn = this.Lo.Range.Height);
      t = this.Lo.Range.Center;
      return (
        this.Lmn.FromConfigVector(t),
        this.Dmn.FromConfigVector(t),
        (this.Lmn.Z -= this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
        (this.Dmn.Z += this.Lo.Range.Height / 2 - this.Lo.Range.Radius),
        this.Umn.FromConfigVector(t),
        this.Amn.FromConfigVector(t),
        (this.Umn.Z -= this.Lo.Range.Height / 2),
        (this.Amn.Z = this.Umn.Z),
        (this.bmn = UE.NewArray(UE.Vector)),
        this.bmn.Add(this.Umn.ToUeVector()),
        this.bmn.Add(this.Amn.ToUeVector()),
        !0
      );
    }
    OnStart() {
      return (
        (this.vtn = this.Entity.GetComponent(77)),
        (this.mBe = this.Entity.GetComponent(120)),
        (this.Hte = this.Entity.GetComponent(187)),
        (this.Lie = this.Entity.GetComponent(181)),
        this.vtn && this.mBe && this.Hte && this.Lie
          ? ((this.Tmn = new Set()),
            EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnActorInOutRangeLocal,
              this.Nmn,
            ),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                40,
                "[BeamCastComp] 组件缺失",
                ["PbDataId", this.EIe?.GetPbDataId()],
                ["RangeComponent", !!this.vtn],
                ["SceneItemStateComponent", !!this.mBe],
                ["SceneItemActorComponent", !!this.Hte],
                ["EntityCommonTagComponent", !!this.Lie],
              ),
            !1)
      );
    }
    OnActivate() {
      this.Omn("[BeamCastComp] 初始停止Tick"),
        this.Hte.GetIsSceneInteractionLoadCompleted()
          ? this.Rnn()
          : EventSystem_1.EventSystem.AddWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
              this.Rnn,
            );
    }
    OnEnd() {
      return (
        this.UFa(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnActorInOutRangeLocal,
          this.Nmn,
        ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
          this.Rnn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
            this.Rnn,
          ),
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
        this.qmn &&
          EffectSystem_1.EffectSystem.IsValid(this.qmn) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.qmn,
            "[BeamCastComp.OnEnd]",
            !0,
          ),
        this.jUn &&
          EffectSystem_1.EffectSystem.IsValid(this.jUn) &&
          EffectSystem_1.EffectSystem.StopEffectById(
            this.jUn,
            "[BeamCastComp.OnEnd]",
            !0,
          ),
        this.wmn?.IsValid() &&
          (this.wmn.K2_DetachFromActor(),
          ActorSystem_1.ActorSystem.Put(this.wmn),
          (this.wmn = void 0),
          (this.Bmn = void 0)),
        (this.Tmn = void 0),
        !(this.mWi = void 0)
      );
    }
    OnTick(t) {
      !this.kmn() ||
        this.Tmn.size < 0 ||
        (Time_1.Time.WorldTime - this.ymn > UPDATE_INTERVAL_MS &&
          ((this.ymn = Time_1.Time.WorldTime), this.Fmn()));
    }
    OnChangeTimeDilation(t) {
      this.DFa &&
        TimerSystem_1.TimerSystem.Has(this.DFa) &&
        (0 === t
          ? TimerSystem_1.TimerSystem.IsPause(this.DFa) ||
            TimerSystem_1.TimerSystem.Pause(this.DFa)
          : 0 < t &&
            (TimerSystem_1.TimerSystem.IsPause(this.DFa) &&
              TimerSystem_1.TimerSystem.Resume(this.DFa),
            TimerSystem_1.TimerSystem.ChangeDilation(this.DFa, t)));
    }
    Gmn() {
      this.kmn()
        ? (this.Vmn(),
          this.Tmn.size < 0
            ? this.Omn("[BeamCastComp] 范围内无Actor，停止Tick")
            : this.Hmn())
        : (this.jmn(),
          this.WUn(),
          this.Omn("[BeamCastComp] 不在活跃状态，停止Tick"));
    }
    kmn() {
      return this.Uai && this.Lie.HasTag(this.Imn);
    }
    Wmn() {
      return void 0 === this.Smn;
    }
    Hmn() {
      this.Wmn() ||
        (this.Enable(this.Smn, "SceneItemBeamCastComponent.EnableTraceTick"),
        (this.Smn = void 0));
    }
    Omn(t) {
      this.Wmn() && (this.Smn = this.Disable(t));
    }
    RFa() {
      this.DFa &&
        TimerSystem_1.TimerSystem.Has(this.DFa) &&
        (TimerSystem_1.TimerSystem.Remove(this.DFa), (this.DFa = void 0)),
        (this.DFa = TimerSystem_1.TimerSystem.Delay(() => {
          this.kmn() && (this.Fmn(), (this.DFa = void 0));
        }, UPDATE_INTERVAL_MS)),
        this.DFa &&
          (0 === this.TimeDilation
            ? TimerSystem_1.TimerSystem.Pause(this.DFa)
            : 0 < this.TimeDilation &&
              TimerSystem_1.TimerSystem.ChangeDilation(
                this.DFa,
                this.TimeDilation,
              ));
    }
    UFa() {
      this.DFa &&
        TimerSystem_1.TimerSystem.Has(this.DFa) &&
        TimerSystem_1.TimerSystem.Remove(this.DFa),
        (this.DFa = void 0);
    }
    WYr() {
      if (!this.mWi) {
        (this.mWi = UE.NewObject(UE.TraceSphereElement.StaticClass())),
          (this.mWi.bIsSingle = !0),
          this.mWi.ActorsToIgnore.Empty();
        var e =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
            this.Hte.GetSceneInteractionLevelHandleId(),
          );
        for (let t = 0; t < e.Num(); t++) this.mWi.ActorsToIgnore.Add(e.Get(t));
        (this.mWi.bIgnoreSelf = !0), (this.mWi.Radius = this.Lo.Range.Radius);
        var t = UE.NewArray(UE.BuiltinByte),
          t =
            (t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
            t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic),
            t.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster),
            (0, puerts_1.$ref)(t));
        this.mWi.SetObjectTypesQuery(t);
      }
      this.mWi.WorldContextObject = this.Hte.Owner;
      (t = MathUtils_1.MathUtils.CommonTempVector),
        MathUtils_1.MathUtils.TransformPosition(
          this.Hte.ActorLocationProxy,
          this.Hte.ActorRotationProxy,
          this.Hte.ActorScaleProxy,
          this.Lmn,
          t,
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, t),
        (t = MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.TransformPosition(
        this.Hte.ActorLocationProxy,
        this.Hte.ActorRotationProxy,
        this.Hte.ActorScaleProxy,
        this.Dmn,
        t,
      ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, t);
    }
    Fmn() {
      this.WYr();
      let e = this.Rmn,
        i = void 0;
      var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.mWi,
          "[BeamCastComp.TraceAndUpdate]",
        ),
        s = this.mWi.HitResult;
      if (t && s?.bBlockingHit)
        for (let t = 0; t < s.GetHitCount(); ++t) {
          var h = s.ImpactPointX_Array.Get(t),
            r = s.ImpactPointY_Array.Get(t),
            o = s.ImpactPointZ_Array.Get(t),
            h = Vector_1.Vector.Create(h, r, o),
            r = MathUtils_1.MathUtils.CommonTempVector,
            o =
              (MathUtils_1.MathUtils.InverseTransformPosition(
                this.Hte.ActorLocationProxy,
                this.Hte.ActorRotationProxy,
                this.Hte.ActorScaleProxy,
                h,
                r,
              ),
              r.Z - this.Umn.Z);
          o < 0 ||
            o > e ||
            !(h = s.Actors.Get(t))?.IsValid() ||
            ((r = this.ftn(h)) && r.Id === this.Entity.Id) ||
            ((e = o), (i = h));
        }
      this.Kmn(i, e), this.mWi.ClearCacheData();
    }
    Kmn(t, e) {
      this.Qmn(e), this.Xmn(), this.KUn();
      var i,
        e = this.EIe.GetEntityOnlineInteractType(),
        e =
          LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
            e,
            !1,
          ),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          this.Entity.Id,
        ),
        t = this.ftn(t);
      !this.xmn?.Valid ||
        (t?.Valid && t.Id === this.xmn.Id) ||
        ((i = this.xmn.Entity),
        (this.xmn = void 0),
        e &&
          EventSystem_1.EventSystem.EmitWithTarget(
            i,
            EventDefine_1.EEventName.BeamCastStop,
            s,
          )),
        t?.Valid &&
          !this.xmn?.Valid &&
          ((i = t.Entity), (this.xmn = t), e) &&
          EventSystem_1.EventSystem.EmitWithTarget(
            i,
            EventDefine_1.EEventName.BeamCastStart,
            s,
          );
    }
    Qmn(t) {
      (this.Pmn = MathUtils_1.MathUtils.Clamp(t, 0, this.Rmn)),
        (this.Amn.Z = this.Umn.Z + this.Pmn);
    }
    Vmn() {
      if (!this.wmn?.IsValid()) {
        if (
          ((this.wmn = ActorSystem_1.ActorSystem.Get(
            UE.BP_BasePathLine_C.StaticClass(),
            this.Hte.Owner.GetTransform(),
          )),
          !this.wmn?.IsValid())
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] BeamSplineActor创建失败",
              ["PbDataId", this.EIe?.GetPbDataId()],
            )
          );
        this.wmn.K2_AttachToActor(this.Hte.Owner, void 0, 2, 2, 2, !1),
          (this.Bmn = this.wmn.GetComponentByClass(
            UE.SplineComponent.StaticClass(),
          )),
          this.Bmn.ClearSplinePoints();
      }
      var t = this.Lo.EffectPath;
      if (!this.qmn || !EffectSystem_1.EffectSystem.IsValid(this.qmn)) {
        if (
          ((this.qmn = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            this.wmn.GetTransform(),
            t,
            "[BeamCastComp.CastBeam]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          )),
          !EffectSystem_1.EffectSystem.IsValid(this.qmn))
        )
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] BeamEffect创建失败",
              ["PbDataId", this.EIe?.GetPbDataId()],
            )
          );
        EffectSystem_1.EffectSystem.GetEffectActor(this.qmn).K2_AttachToActor(
          this.wmn,
          void 0,
          2,
          2,
          2,
          !1,
        );
      }
      (this.ymn = Time_1.Time.WorldTime), this.Fmn();
    }
    jmn() {
      this.qmn &&
        EffectSystem_1.EffectSystem.IsValid(this.qmn) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.qmn,
          "[BeamCastComp.StopBeam]",
          !0,
        ),
        this.Kmn(void 0, 0);
    }
    hst() {
      var t, e, i, s;
      !this.Hte?.Owner ||
        !(t = this.Lo.HitEffectPath) ||
        (this.jUn && EffectSystem_1.EffectSystem.IsValid(this.jUn)) ||
        ((i = (e = this.Hte.ActorTransform).TransformPosition(
          this.Amn.ToUeVector(),
        )),
        (s = MathUtils_1.MathUtils.CommonTempQuat),
        Vector_1.Vector.UpVectorProxy.ToOrientationQuat(s),
        (s = e.TransformRotation(s.ToUeQuat())),
        (s = new UE.Transform(s, i, e.GetScale3D())),
        (this.jUn = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          s,
          t,
          "[BeamCastComp.UpdateHitEffect]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        )),
        EffectSystem_1.EffectSystem.IsValid(this.jUn)
          ? EffectSystem_1.EffectSystem.GetEffectActor(
              this.jUn,
            ).K2_AttachToActor(this.Hte.Owner, void 0, 1, 1, 1, !1)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              40,
              "[BeamCastComp] HitEffect创建失败",
              ["PbDataId", this.EIe?.GetPbDataId()],
            ));
    }
    WUn() {
      this.jUn &&
        EffectSystem_1.EffectSystem.IsValid(this.jUn) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.jUn,
          "[BeamCastComp.StopHitEffect]",
          !0,
        );
    }
    Xmn() {
      this.wmn?.IsValid() &&
        (this.qmn &&
          EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(
            this.qmn,
            0 < this.Pmn,
          ),
        this.bmn.Empty(),
        this.bmn.Add(this.Umn.ToUeVector()),
        this.bmn.Add(this.Amn.ToUeVector()),
        this.Bmn.SetSplinePoints(this.bmn, 0, !0));
    }
    KUn() {
      var t, e;
      this.Hte?.Owner?.IsValid() &&
        (this.Pmn >= this.Rmn
          ? this.WUn()
          : (this.hst(),
            this.jUn &&
              EffectSystem_1.EffectSystem.IsValid(this.jUn) &&
              ((t = EffectSystem_1.EffectSystem.GetEffectActor(this.jUn)),
              (e = MathUtils_1.MathUtils.CommonTempRotator).Set(90, 0, 0),
              t?.K2_SetActorRelativeLocation(
                this.Amn.ToUeVector(),
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
    ftn(t) {
      if (t?.IsValid())
        return UE.KismetMathLibrary.EqualEqual_ObjectObject(
          t,
          RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(),
        )
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(
              Global_1.Global.BaseCharacter.EntityId,
            )
          : ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(t);
    }
    ToggleDebugMode(t) {
      this.mWi &&
        (t &&
          ((this.mWi.DrawTime = 0.5),
          TraceElementCommon_1.TraceElementCommon.SetTraceColor(
            this.mWi,
            ColorUtils_1.ColorUtils.LinearGreen,
          ),
          TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
            this.mWi,
            ColorUtils_1.ColorUtils.LinearRed,
          )),
        this.mWi.SetDrawDebugTrace(t ? 2 : 0));
    }
  });
(SceneItemBeamCastComponent = SceneItemBeamCastComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(199)],
    SceneItemBeamCastComponent,
  )),
  (exports.SceneItemBeamCastComponent = SceneItemBeamCastComponent);
//# sourceMappingURL=SceneItemBeamCastComponent.js.map
