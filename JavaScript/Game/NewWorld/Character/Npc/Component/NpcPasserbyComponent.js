"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (r = t[h]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, i, n) : r(e, i)) || n);
    return 3 < s && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPasserbyComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NPC_PB = "Gys",
  END_DISTANCE = 30,
  ENTITY_REMOVE_DELAY = 3,
  DEFAULT_MOVE_SPEED = 100,
  DEFAULT_EXCEPTION_COUNTER_TIME = 5e3,
  MIN_MOVE_SPEED = 20;
let NpcPasserbyComponent = class NpcPasserbyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.Htn = 0),
      (this.jtn = 0),
      (this.szo = !1),
      (this.tu = void 0),
      (this.jnr = void 0),
      (this.JLe = void 0),
      (this.Nd1 = !1),
      (this.Ktn = Vector_1.Vector.Create()),
      (this.Vd1 = DEFAULT_EXCEPTION_COUNTER_TIME),
      (this.jd1 = !1);
  }
  OnCreate(t) {
    return (
      (this.Nd1 = !1),
      (this.Hte = this.Entity.CheckGetComponent(2)),
      (this.Gce = this.Entity.GetComponent(44)),
      !(!this.Hte || !this.Gce)
    );
  }
  OnStart() {
    var t = this.Hte.CreatureData,
      e = t.ComponentDataMap.get(NPC_PB)?.Gys;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("NPC", 42, "特效NPC没有NpcPb相关配置数据", [
            "PbDataId",
            t.GetPbDataId(),
          ]),
        !1
      );
    (this.Htn = e.dTs), (this.jtn = e.Ejn);
    e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
      this.jtn,
    );
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("NPC", 50, "特效NPC没有行人生成器相关配置数据", [
            "GeneratorEntityId",
            this.jtn,
          ]),
        !1
      );
    var i = (0, IComponent_1.getComponent)(
      e.ComponentsData,
      "PasserbyNpcSpawnComponent",
    );
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            50,
            "获取行人NPC生成器配置失败",
            ["PbDataId", t.GetPbDataId()],
            ["GeneratorId", e?.Id],
          ),
        !1
      );
    for (const o of i.MoveConfig.Routes)
      if (this.Htn === o.SplineEntityId) {
        (this.szo = !!o.IsLoop),
          o.MoveState &&
            ((this.tu = o.MoveState.MoveState),
            (this.jnr = o.MoveState.MoveSpeed));
        break;
      }
    t = this.Hte.Actor.CharacterMovement;
    return (
      t.KuroSetPredictionDataMaxMoveDeltaTime(1),
      (t.MaxSimulationTimeStep = 1),
      !0
    );
  }
  OnActivate() {
    this.HC(this.Htn) && this.JLe && this.Gce.MoveAlongPath(this.JLe);
  }
  OnTick(t) {
    var e;
    !this.szo &&
      this.Nd1 &&
      ((e = Vector_1.Vector.Dist(this.Ktn, this.Hte.ActorLocationProxy)) <
        this.Gce.Speed * ENTITY_REMOVE_DELAY ||
        e <= END_DISTANCE) &&
      this.SendMessage(),
      this.CheckMoveException(t) && this.Vd1 <= 0 && this.SendMessage();
  }
  HC(t) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (!e.InitializeWithSubPoints(this.Hte.CreatureData.GetPbDataId()))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            42,
            "特效NPC找不到对应的样条实体或实体上没有样条组件",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ),
        !1
      );
    var i = e.PathPoint;
    if (i.length < 2)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            42,
            "特效NPC样条点数量小于2",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ),
        !1
      );
    var o = [],
      r = e.GetNumberOfSplinePoints();
    let s = 0;
    for (const h of i) {
      var n = {
        Index: h.IsMain ? s : -1,
        Position: h.Point,
        MoveState: this.tu ?? IComponent_1.EPatrolMoveState.Walk,
        MoveSpeed:
          this.jnr ??
          this.Gce?.CurrentMovementSettings?.WalkSpeed ??
          DEFAULT_MOVE_SPEED,
      };
      h.IsMain &&
        (this.szo ||
          s !== r - 2 ||
          (n.Callback = () => {
            this.Nd1 = !0;
          }),
        s++),
        o.push(n);
    }
    t = o[o.length - 1].Position;
    return (
      this.Ktn.Set(t.X, t.Y, t.Z),
      (this.JLe = {
        Points: o,
        Navigation: !1,
        IsFly: !1,
        DebugMode: !0,
        Loop: this.szo,
        CircleMove: this.szo,
        UsePreviousIndex: !0,
        UseNearestPoint: !0,
        ReturnFalseWhenNavigationFailed: !1,
      }),
      this.szo ||
        (this.JLe.Callback = (t) => {
          this.Nd1 && this.SendMessage();
        }),
      !0
    );
  }
  CheckMoveException(t) {
    return this.Hte
      ? Vector_1.Vector.Dist(
          this.Hte.ActorLocationProxy,
          this.Hte.LastActorLocation,
        ) <
        MIN_MOVE_SPEED * t * MathUtils_1.MathUtils.MillisecondToSecond
        ? ((this.Vd1 -= t), !0)
        : ((this.Vd1 = DEFAULT_EXCEPTION_COUNTER_TIME), !1)
      : !(this.Vd1 = 0);
  }
  SendMessage() {
    var t;
    (this.Nd1 = !1),
      this.jd1 ||
        ((this.jd1 = !0),
        ((t = Protocol_1.Aki.Protocol.Zes.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(
            this.Hte.CreatureData.GetCreatureDataId(),
          )),
        Net_1.Net.Call(21831, t, (t) => {
          t &&
            t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.Cvs,
              15464,
            );
        }));
  }
};
(NpcPasserbyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(88)],
  NpcPasserbyComponent,
)),
  (exports.NpcPasserbyComponent = NpcPasserbyComponent);
//# sourceMappingURL=NpcPasserbyComponent.js.map
