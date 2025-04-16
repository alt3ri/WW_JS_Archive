"use strict";
var SceneItemCameraAlertComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var n,
        r = arguments.length,
        h =
          r < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(t, e, i, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (n = t[o]) &&
            (h = (r < 3 ? n(h) : 3 < r ? n(e, i, h) : n(e, i)) || h);
      return 3 < r && h && Object.defineProperty(e, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemCameraAlertComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  PROFILE_KEY = "SceneItemCameraAlertComponent_LineTrace",
  INTERACTION_BODY = "Body";
let SceneItemCameraAlertComponent =
  (SceneItemCameraAlertComponent_1 = class SceneItemCameraAlertComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.vtn = void 0),
        (this.Hte = void 0),
        (this.mBe = void 0),
        (this.zqa = Vector_1.Vector.Create()),
        (this.iOl = Vector_1.Vector.Create()),
        (this.Zqa = Vector_1.Vector.Create()),
        (this.e2a = 0),
        (this.t2a = 0),
        (this.cz = Vector_1.Vector.Create()),
        (this.fz = Vector_1.Vector.Create()),
        (this.i2a = !1),
        (this.r2a = !1),
        (this.o2a = !1),
        (this.uoe = void 0),
        (this.JGa = !1),
        (this.wJl = void 0),
        (this.KHr = (t) => {
          SceneItemCameraAlertComponent_1.l2a.Start(),
            this.a2a(),
            SceneItemCameraAlertComponent_1.l2a.Stop();
        }),
        (this.Rnn = () => {
          (this.r2a = !0), this.n2a(), this.s2a();
          var t =
            this.Hte.GetActorInSceneInteraction(INTERACTION_BODY) ??
            this.Hte?.GetInteractionMainActor();
          this.vtn?.SetRangeActorParent(t),
            EventSystem_1.EventSystem.HasWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSceneItemStateChange,
              this.g_n,
            ) ||
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnSceneItemStateChange,
                this.g_n,
              );
        }),
        (this.g_n = () => {
          this.s2a(), this.UJl() || (this.o2a = !1);
        }),
        (this.H0n = (t) => {
          (this.i2a = t),
            this.r2a && (this.s2a(), t ? this.a2a() : this.h2a(!1));
        });
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemCameraAlertComponent_1)[0];
      if (t.AvailableStates) {
        this.wJl = new Set();
        for (const i of t.AvailableStates) {
          var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
          if (void 0 === e)
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  39,
                  "[CameraAlertComp] 探测状态Tag有误",
                  ["TagName", i],
                  ["EntityId", this.Entity.Id],
                ),
              !1
            );
          this.wJl.add(e);
        }
      }
      return !0;
    }
    OnStart() {
      var t;
      return (
        (this.vtn = this.Entity.GetComponent(84)),
        (this.mBe = this.Entity.GetComponent(131)),
        (this.Hte = this.Entity.GetComponent(200)),
        this.vtn && this.Hte
          ? (t = this.vtn.GetShapeConfig())
            ? "Cone" !== t.Type
              ? (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    57,
                    "[CameraAlert] 组件初始化类型错误",
                    ["type", t.Type],
                  ),
                !1)
              : ((this.t2a = t.Radius),
                (this.e2a = t.Height),
                this.Zqa.Set(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0),
                this.t2a < 0 || this.e2a < 0
                  ? (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "SceneItem",
                        57,
                        "[CameraAlert] 组件初始化参数错误",
                        ["ConeRadius", this.t2a],
                        ["ConeHeight", this.e2a],
                      ),
                    !1)
                  : (this.Rmt(),
                    EventSystem_1.EventSystem.HasWithTarget(
                      this.Entity,
                      EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
                      this.H0n,
                    ) ||
                      EventSystem_1.EventSystem.AddWithTarget(
                        this.Entity,
                        EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
                        this.H0n,
                      ),
                    !0))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  57,
                  "[CameraAlert] 组件初始化数据为空",
                ),
              !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "SceneItem",
                57,
                "[CameraAlertComp] 组件缺失",
                ["RangeComponent", !!this.vtn],
                ["StateComp", !!this.mBe],
                ["ActorComp", !!this.Hte],
              ),
            !1)
      );
    }
    OnActivate() {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnSceneInteractionLoadCompleted,
        this.Rnn,
      ),
        this.Hte.GetIsSceneInteractionLoadCompleted() ? this.Rnn() : this.s2a();
    }
    Rmt() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = GlobalData_1.GlobalData.World),
        (this.uoe.bIgnoreSelf = !0),
        (this.uoe.bIsSingle = !0),
        this.uoe.ActorsToIgnore.Empty(),
        this.uoe.ActorsToIgnore.Add(this.vtn.GetRangeActor()),
        this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    }
    kmn() {
      return (
        this.i2a &&
        this.r2a &&
        !this.mBe.IsInState(0) &&
        !this.mBe.IsInState(3) &&
        this.UJl()
      );
    }
    UJl() {
      return !this.wJl || this.wJl.has(this.mBe.StateTagId);
    }
    _2a(t) {
      return (
        !!MathUtils_1.MathUtils.IsLocationInsideCone(
          this.zqa,
          this.iOl,
          this.e2a,
          this.t2a,
          this.cz,
        ) && !this.uye(t, this.zqa)
      );
    }
    uye(t, e) {
      return (
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, e),
        TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY)
      );
    }
    u2a() {
      var t =
          this.Hte.GetActorInSceneInteraction(INTERACTION_BODY) ??
          this.Hte?.GetInteractionMainActor(),
        e = this.Entity.GetComponent(1);
      t
        ? this.iOl.DeepCopy(t.D_GetActorUpVector())
        : this.iOl.DeepCopy(e.ActorUpProxy),
        this.iOl.MultiplyEqual(-1),
        this.iOl.Multiply(-this.e2a / 2, this.cz),
        t
          ? this.fz.FromUeVector(
              t
                .D_GetTransform()
                .TransformPositionNoScale(this.Zqa.ToUeVector()),
            )
          : (e.ActorQuatProxy.RotateVector(this.Zqa, this.fz),
            e.ActorLocationProxy.Addition(this.fz, this.fz)),
        this.fz.Addition(this.cz, this.cz),
        this.zqa.DeepCopy(this.cz);
    }
    a2a() {
      var t, e;
      this.kmn() &&
        ((t = Global_1.Global.BaseCharacter?.CharacterActorComponent) &&
        ((e = this.Hte.CreatureData.GetEntityOnlineInteractType()),
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
          e,
          !1,
        )) &&
        (this.u2a(),
        t.ActorUpProxy.Multiply(t.ScaledHalfHeight, this.fz),
        this.cz.DeepCopy(t.ActorLocationProxy),
        this.cz.SubtractionEqual(this.fz),
        this._2a(this.cz) ||
          (this.cz.AdditionEqual(this.fz), this._2a(this.cz)) ||
          (this.cz.AdditionEqual(this.fz), this._2a(this.cz)))
          ? this.h2a(!0)
          : this.h2a(!1));
    }
    n2a() {
      var e =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          this.Hte.GetSceneInteractionLevelHandleId(),
        );
      for (let t = 0; t < e?.Num(); t++) this.uoe.ActorsToIgnore.Add(e.Get(t));
    }
    h2a(t) {
      var e;
      this.UJl() &&
        this.o2a !== t &&
        ((this.o2a = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSceneItemCameraAlertStateChange,
          this.o2a,
        ),
        (e = this.Entity.GetComponent(0).GetCreatureDataId()),
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntityCameraAlertStateChange(
          e,
          t,
        ));
    }
    s2a() {
      this.kmn() && !this.JGa
        ? (ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
            this,
            this.KHr,
          ),
          (this.JGa = !0))
        : this.JGa &&
          (ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
          (this.JGa = !1));
    }
    IsAlertState() {
      return this.o2a;
    }
    OnEnd() {
      return (
        (this.o2a = !1),
        (this.i2a = !1),
        (this.r2a = !1),
        this.JGa &&
          (ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
          (this.JGa = !1)),
        this.uoe && (this.uoe.Dispose(), (this.uoe = void 0)),
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
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
          this.H0n,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.H0n,
          ),
        !0
      );
    }
  });
(SceneItemCameraAlertComponent.l2a = Stats_1.Stat.Create(
  "SceneItemCameraAlertComponentStat",
)),
  (SceneItemCameraAlertComponent = SceneItemCameraAlertComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(215)],
      SceneItemCameraAlertComponent,
    )),
  (exports.SceneItemCameraAlertComponent = SceneItemCameraAlertComponent);
//# sourceMappingURL=SceneItemCameraAlertComponent.js.map
