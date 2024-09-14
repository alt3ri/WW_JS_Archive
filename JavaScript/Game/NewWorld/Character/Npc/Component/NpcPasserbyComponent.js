"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, i);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (r = t[a]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, o, n) : r(e, o)) || n);
    return 3 < s && n && Object.defineProperty(e, o, n), n;
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
  DEFUALT_MOVE_SPEED = 100;
let NpcPasserbyComponent = class NpcPasserbyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Htn = 0),
      (this.jtn = 0),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.Wtn = !1),
      (this.szo = !1),
      (this.tu = void 0),
      (this.jnr = void 0),
      (this.JLe = void 0),
      (this.Ktn = Vector_1.Vector.Create());
  }
  OnCreate(t) {
    return (
      (this.Wtn = !1),
      (this.Hte = this.Entity.CheckGetComponent(2)),
      (this.Gce = this.Entity.GetComponent(38)),
      !(!this.Hte || !this.Gce)
    );
  }
  OnStart() {
    var t = this.Hte.CreatureData,
      e = t.ComponentDataMap.get(NPC_PB)?.Gys;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("NPC", 43, "特效NPC没有NpcPb相关配置数据", [
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
          Log_1.Log.Error("NPC", 51, "特效NPC没有行人生成器相关配置数据", [
            "GeneratorEntityId",
            this.jtn,
          ]),
        !1
      );
    var o = (0, IComponent_1.getComponent)(
      e.ComponentsData,
      "PasserbyNpcSpawnComponent",
    );
    if (!o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            51,
            "获取行人NPC生成器配置失败",
            ["PbDataId", t.GetPbDataId()],
            ["GeneratorId", e?.Id],
          ),
        !1
      );
    for (const i of o.MoveConfig.Routes)
      if (this.Htn === i.SplineEntityId) {
        (this.szo = !!i.IsLoop),
          i.MoveState &&
            ((this.tu = i.MoveState.MoveState),
            (this.jnr = i.MoveState.MoveSpeed));
        break;
      }
    t = this.Hte.Actor.CharacterMovement;
    return (
      t.KuroSetPredictionDataMaxMoveDeltaTime(1),
      (t.MaxSimulationTimeStep = 1),
      !0
    );
  }
  HC(t) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (!e.InitializeWithSubPoints(this.Hte.CreatureData.GetPbDataId()))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            43,
            "特效NPC找不到对应的样条实体或实体上没有样条组件",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ),
        !1
      );
    var o = e.PathPoint;
    if (o.length < 2)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            43,
            "特效NPC样条点数量小于2",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["SplineId", t],
          ),
        !1
      );
    var i = [],
      r = e.GetNumberOfSplinePoints();
    let s = 0;
    for (const a of o) {
      var n = {
        Index: a.IsMain ? s : -1,
        Position: a.Point,
        MoveState: this.tu ?? IComponent_1.EPatrolMoveState.Walk,
        MoveSpeed:
          this.jnr ??
          this.Gce?.CurrentMovementSettings?.WalkSpeed ??
          DEFUALT_MOVE_SPEED,
      };
      a.IsMain &&
        (this.szo ||
          s !== r - 2 ||
          (n.Callback = () => {
            this.Wtn = !0;
          }),
        s++),
        i.push(n);
    }
    t = i[i.length - 1].Position;
    return (
      this.Ktn.Set(t.X, t.Y, t.Z),
      (this.JLe = {
        Points: i,
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
          this.Wtn && this.Qtn();
        }),
      !0
    );
  }
  OnActivate() {
    this.HC(this.Htn) && this.JLe && this.Gce.MoveAlongPath(this.JLe);
  }
  OnTick(t) {
    var e;
    !this.szo &&
      this.Wtn &&
      ((e = Vector_1.Vector.Dist(this.Ktn, this.Hte.ActorLocationProxy)) <
        this.Gce.Speed * ENTITY_REMOVE_DELAY ||
        e <= END_DISTANCE) &&
      this.Qtn();
  }
  Qtn() {
    this.Wtn = !1;
    var t = Protocol_1.Aki.Protocol.Zes.create();
    (t.F4n = MathUtils_1.MathUtils.NumberToLong(
      this.Hte.CreatureData.GetCreatureDataId(),
    )),
      Net_1.Net.Call(15661, t, (t) => {
        t &&
          t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Cvs,
            27078,
          );
      });
  }
};
(NpcPasserbyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(81)],
  NpcPasserbyComponent,
)),
  (exports.NpcPasserbyComponent = NpcPasserbyComponent);
//# sourceMappingURL=NpcPasserbyComponent.js.map
