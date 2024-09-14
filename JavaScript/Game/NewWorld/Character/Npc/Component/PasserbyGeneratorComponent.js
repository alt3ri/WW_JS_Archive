"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var n,
      i = arguments.length,
      s =
        i < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (s = (i < 3 ? n(s) : 3 < i ? n(t, o, s) : n(t, o)) || s);
    return 3 < i && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyGeneratorComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../../Global"),
  GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class SplineStateInfo {
  constructor(e, t) {
    (this.PbDataId = 0),
      (this.Location = Vector_1.Vector.Create()),
      (this.InRange = !1),
      (this.PbDataId = e),
      (this.Location = t);
  }
}
let PasserbyGeneratorComponent = class PasserbyGeneratorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.EIe = void 0),
      (this.Tin = Array()),
      (this.Lin = 0),
      (this.Din = !0),
      (this.Xot = Vector_1.Vector.Create());
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(1)),
      (this.EIe = this.Entity.GetComponent(0));
    var e,
      t,
      o = (0, IComponent_1.getComponent)(
        this.EIe.GetPbEntityInitData().ComponentsData,
        "PasserbyNpcSpawnComponent",
      );
    if (!o?.SpawnConfig.MinDistance) return !(this.Din = !1);
    this.Lin = o.SpawnConfig.MinDistance * o.SpawnConfig.MinDistance;
    for (const r of o.MoveConfig.Routes)
      r.IsLoop &&
        ((e = r.SplineEntityId),
        (t = new GameSplineComponent_1.GameSplineComponent(e)).Initialize()
          ? t.GetNumberOfSplinePoints() &&
            this.Tin.push(
              new SplineStateInfo(e, t.GetWorldLocationAtSplinePoint(0)),
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "NPC",
              51,
              "行人生成器获取样条信息错误",
              ["PbDataId", this.EIe?.GetPbDataId()],
              ["SplinePbDataId", e],
            ));
    return this.Tin.length || (this.Din = !1), !0;
  }
  OnTick(e) {
    if (this.Din)
      for (const t of this.Tin)
        this.Rin(t.Location)
          ? t.InRange ||
            ((t.InRange = !0),
            this.Uin(t.PbDataId, !0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("NPC", 51, "进入生成范围", [
                "PbDataId",
                this.EIe?.GetPbDataId(),
              ]))
          : t.InRange &&
            ((t.InRange = !1),
            this.Uin(t.PbDataId, !1),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("NPC", 51, "离开生成范围", [
              "PbDataId",
              this.EIe?.GetPbDataId(),
            ]);
  }
  Rin(e) {
    let t = MathUtils_1.MathUtils.MaxFloat;
    var o;
    return (
      ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? ((o = this.Ain(e)), (t = o.MinDistSquared))
        : (o = Global_1.Global.BaseCharacter)?.IsValid() &&
          (o.CharacterActorComponent.ActorLocationProxy.Subtraction(
            e,
            this.Xot,
          ),
          (t = this.Xot.SizeSquared2D())),
      t < this.Lin
    );
  }
  Uin(e, t) {
    var o = Protocol_1.Aki.Protocol.rts.create();
    (o.F4n = MathUtils_1.MathUtils.NumberToLong(
      this.Hte.CreatureData.GetCreatureDataId(),
    )),
      (o.eKn = e),
      (o.tKn = t),
      Net_1.Net.Call(17028, o, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            23198,
          );
      });
  }
  Ain(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap,
      o = ModelManager_1.ModelManager.SceneTeamModel;
    let r = void 0,
      n = MathUtils_1.MathUtils.MaxFloat;
    for (const a of t) {
      var i,
        s = o.GetTeamItem(a[0], { ParamType: 2, IsControl: !0 })?.EntityHandle;
      s &&
        (s.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.Xot),
        (i = this.Xot.SizeSquared2D()) < n) &&
        ((n = i), (r = s));
    }
    return { PlayerEntity: r, MinDistSquared: n };
  }
};
(PasserbyGeneratorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(196)],
  PasserbyGeneratorComponent,
)),
  (exports.PasserbyGeneratorComponent = PasserbyGeneratorComponent);
//# sourceMappingURL=PasserbyGeneratorComponent.js.map
