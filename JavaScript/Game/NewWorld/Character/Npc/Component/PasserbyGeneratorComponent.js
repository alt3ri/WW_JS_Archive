"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    let n;
    const i = arguments.length;
    let s =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, o, r);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (n = e[a]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s);
    return i > 3 && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PasserbyGeneratorComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../../Global");
const GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
      (this.SIe = void 0),
      (this.Win = Array()),
      (this.Kin = 0),
      (this.Qin = !0),
      (this.wit = Vector_1.Vector.Create());
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(1)),
      (this.SIe = this.Entity.GetComponent(0));
    let e;
    let t;
    const o = (0, IComponent_1.getComponent)(
      this.SIe.GetPbEntityInitData().ComponentsData,
      "PasserbyNpcSpawnComponent",
    );
    if (!o?.SpawnConfig.MinDistance) return !(this.Qin = !1);
    this.Kin = o.SpawnConfig.MinDistance * o.SpawnConfig.MinDistance;
    for (const r of o.MoveConfig.Routes)
      r.IsLoop &&
        ((e = r.SplineEntityId),
        (t = new GameSplineComponent_1.GameSplineComponent(e)).Initialize()
          ? t.GetNumberOfSplinePoints() &&
            this.Win.push(
              new SplineStateInfo(e, t.GetWorldLocationAtSplinePoint(0)),
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "NPC",
              51,
              "行人生成器获取样条信息错误",
              ["PbDataId", this.SIe?.GetPbDataId()],
              ["SplinePbDataId", e],
            ));
    return this.Win.length || (this.Qin = !1), !0;
  }
  OnTick(e) {
    if (this.Qin)
      for (const t of this.Win)
        this.Xin(t.Location)
          ? t.InRange ||
            ((t.InRange = !0),
            this.$in(t.PbDataId, !0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("NPC", 51, "进入生成范围", [
                "PbDataId",
                this.SIe?.GetPbDataId(),
              ]))
          : t.InRange &&
            ((t.InRange = !1),
            this.$in(t.PbDataId, !1),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("NPC", 51, "离开生成范围", [
              "PbDataId",
              this.SIe?.GetPbDataId(),
            ]);
  }
  Xin(e) {
    let t = MathUtils_1.MathUtils.MaxFloat;
    let o;
    return (
      ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? ((o = this.Yin(e)), (t = o.MinDistSquared))
        : (o = Global_1.Global.BaseCharacter)?.IsValid() &&
          (o.CharacterActorComponent.ActorLocationProxy.Subtraction(
            e,
            this.wit,
          ),
          (t = this.wit.SizeSquared2D())),
      t < this.Kin
    );
  }
  $in(e, t) {
    const o = Protocol_1.Aki.Protocol.iJn.create();
    (o.rkn = MathUtils_1.MathUtils.NumberToLong(
      this.Hte.CreatureData.GetCreatureDataId(),
    )),
      (o.d7n = e),
      (o.C7n = t),
      Net_1.Net.Call(25538, o, (e) => {
        e &&
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            11896,
          );
      });
  }
  Yin(e) {
    const t = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap;
    const o = ModelManager_1.ModelManager.SceneTeamModel;
    let r = void 0;
    let n = MathUtils_1.MathUtils.MaxFloat;
    for (const a of t) {
      var i;
      const s = o.GetTeamItem(a[0], {
        ParamType: 2,
        IsControl: !0,
      })?.EntityHandle;
      s &&
        (s.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.wit),
        (i = this.wit.SizeSquared2D()) < n) &&
        ((n = i), (r = s));
    }
    return { PlayerEntity: r, MinDistSquared: n };
  }
};
(PasserbyGeneratorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(189)],
  PasserbyGeneratorComponent,
)),
  (exports.PasserbyGeneratorComponent = PasserbyGeneratorComponent);
// # sourceMappingURL=PasserbyGeneratorComponent.js.map
