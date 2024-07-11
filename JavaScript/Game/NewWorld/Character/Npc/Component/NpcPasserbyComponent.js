"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let r;
    const s = arguments.length;
    let n =
      s < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, o, i);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (n = (s < 3 ? r(n) : s > 3 ? r(e, o, n) : r(e, o)) || n);
    return s > 3 && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPasserbyComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NPC_PB = "dps";
const END_DISTANCE = 30;
const ENTITY_REMOVE_DELAY = 3;
const DEFUALT_MOVE_SPEED = 100;
let NpcPasserbyComponent = class NpcPasserbyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this._in = 0),
      (this.uin = 0),
      (this.Hte = void 0),
      (this.Gce = void 0),
      (this.cin = !1),
      (this.lJo = !1),
      (this.tu = void 0),
      (this.Qrr = void 0),
      (this.JLe = void 0),
      (this.din = Vector_1.Vector.Create());
  }
  OnCreate(t) {
    return (
      (this.cin = !1),
      (this.Hte = this.Entity.CheckGetComponent(2)),
      (this.Gce = this.Entity.GetComponent(36)),
      !(!this.Hte || !this.Gce)
    );
  }
  OnStart() {
    let t = this.Hte.CreatureData;
    let e = t.ComponentDataMap.get(NPC_PB)?.dps;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("NPC", 43, "特效NPC没有NpcPb相关配置数据", [
            "PbDataId",
            t.GetPbDataId(),
          ]),
        !1
      );
    (this._in = e.HMs), (this.uin = e.qVn);
    e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
      this.uin,
    );
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("NPC", 51, "特效NPC没有行人生成器相关配置数据", [
            "GeneratorEntityId",
            this.uin,
          ]),
        !1
      );
    const o = (0, IComponent_1.getComponent)(
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
      if (this._in === i.SplineEntityId) {
        (this.lJo = !!i.IsLoop),
          i.MoveState &&
            ((this.tu = i.MoveState.MoveState),
            (this.Qrr = i.MoveState.MoveSpeed));
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
    const e = new GameSplineComponent_1.GameSplineComponent(t);
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
    const o = e.PathPoint;
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
    const i = [];
    const r = e.GetNumberOfSplinePoints();
    let s = 0;
    for (const a of o) {
      const n = {
        Index: a.IsMain ? s : -1,
        Position: a.Point,
        MoveState: this.tu ?? IComponent_1.EPatrolMoveState.Walk,
        MoveSpeed:
          this.Qrr ??
          this.Gce?.CurrentMovementSettings?.WalkSpeed ??
          DEFUALT_MOVE_SPEED,
      };
      a.IsMain &&
        (this.lJo ||
          s !== r - 2 ||
          (n.Callback = () => {
            this.cin = !0;
          }),
        s++),
        i.push(n);
    }
    t = i[i.length - 1].Position;
    return (
      this.din.Set(t.X, t.Y, t.Z),
      (this.JLe = {
        Points: i,
        Navigation: !1,
        IsFly: !1,
        DebugMode: !0,
        Loop: this.lJo,
        CircleMove: this.lJo,
        UsePreviousIndex: !0,
        UseNearestPoint: !0,
        ReturnFalseWhenNavigationFailed: !1,
      }),
      this.lJo ||
        (this.JLe.Callback = (t) => {
          this.cin && this.Cin();
        }),
      !0
    );
  }
  OnActivate() {
    this.HC(this._in) && this.JLe && this.Gce.MoveAlongPath(this.JLe);
  }
  OnTick(t) {
    let e;
    !this.lJo &&
      this.cin &&
      ((e = Vector_1.Vector.Dist(this.din, this.Hte.ActorLocationProxy)) <
        this.Gce.Speed * ENTITY_REMOVE_DELAY ||
        e <= END_DISTANCE) &&
      this.Cin();
  }
  Cin() {
    this.cin = !1;
    const t = Protocol_1.Aki.Protocol.zYn.create();
    (t.rkn = MathUtils_1.MathUtils.NumberToLong(
      this.Hte.CreatureData.GetCreatureDataId(),
    )),
      Net_1.Net.Call(11735, t, (t) => {
        t &&
          t.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Kms,
            14299,
          );
      });
  }
};
(NpcPasserbyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(78)],
  NpcPasserbyComponent,
)),
  (exports.NpcPasserbyComponent = NpcPasserbyComponent);
// # sourceMappingURL=NpcPasserbyComponent.js.map
