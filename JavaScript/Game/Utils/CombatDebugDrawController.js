"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatDebugDrawController = void 0);
const UE = require("ue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatDebugController_1 = require("./CombatDebugController");
class CombatDebugDrawController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.RedColor = new UE.LinearColor(1, 0, 0, 1)),
      (this.GreenColor = new UE.LinearColor(0, 1, 0, 1)),
      (this.BlueColor = new UE.LinearColor(0, 0, 1, 1)),
      (this.YellowColor = new UE.LinearColor(1, 1, 0, 1)),
      (this.EntityBoxColor = new UE.LinearColor(1, 1, 0, 0.5)),
      (this.EntityBoxInfoColor = new UE.LinearColor(0.8, 0.8, 1, 0.5)),
      !0
    );
  }
  static OnTick(t) {
    this.DebugMonsterControl && this.gCr(),
      this.fCr(CombatDebugController_1.CombatDebugController.DebugEntityId);
  }
  static gCr() {
    this.pCr.clear();
    for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
      []) {
      var t;
      e.Entity.Active &&
        (t = e.Entity.GetComponent(0)).IsRole() &&
        this.pCr.set(t.GetPlayerId(), e.Entity);
    }
    for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
      []) {
      var r, o;
      a.Entity.Active &&
        a.Entity.GetComponent(0).IsMonster() &&
        (o = a.Entity.GetComponent(38)?.AiController) &&
        (r = this.pCr.get(o.ControllerPlayerId)) &&
        (this.vCr.DeepCopy(a.Entity.GetComponent(3).ActorLocationProxy),
        this.MCr.DeepCopy(r.GetComponent(3).ActorLocationProxy),
        UE.KismetSystemLibrary.DrawDebugArrow(
          GlobalData_1.GlobalData.World,
          this.vCr.ToUeVector(),
          this.MCr.ToUeVector(),
          2,
          this.GreenColor,
        ),
        (r = a.Entity.GetComponent(57))) &&
        o.ControllerPlayerId !== r.ControllerPlayerId &&
        (o = this.pCr.get(r.ControllerPlayerId)) &&
        (this.MCr.DeepCopy(o.GetComponent(3).ActorLocationProxy),
        UE.KismetSystemLibrary.DrawDebugArrow(
          GlobalData_1.GlobalData.World,
          this.vCr.ToUeVector(),
          this.MCr.ToUeVector(),
          2,
          this.YellowColor,
        ));
    }
  }
  static fCr(r) {
    var r = EntitySystem_1.EntitySystem.Get(r);
    let o = r?.GetComponent(3);
    const e = o?.Actor;
    let a = e?.CapsuleComponent;
    if (e?.IsValid() && a?.IsValid()) {
      let l = e.K2_GetActorLocation();
      if (
        (CombatDebugDrawController.IsDrawEntityBoxEnabled &&
          UE.KismetSystemLibrary.DrawDebugCapsule(
            e,
            l,
            a.CapsuleHalfHeight,
            a.CapsuleRadius,
            e.K2_GetActorRotation(),
            this.YellowColor,
          ),
        CombatDebugDrawController.IsDrawEntityBoxInfoEnabled)
      ) {
        a = new UE.Vector(l.X, l.Y, l.Z - a.CapsuleHalfHeight - 30);
        let t =
          `${e.GetName()}_${r?.Id.toString()}
` + l.ToCompactString();
        t +=
          `
` + (o?.IsAutonomousProxy ? "主控" : "非主控");
        (l = r.GetComponent(107)),
          (o =
            (l &&
              (t +=
                `
时间缩放: ` + l.CurrentTimeScale.toFixed(2)),
            r.GetComponent(65)));
        for (const i of o?.StateMachineGroup?.StateMachines ?? []) {
          t +=
            `
状态机${i.Name}: ` + i.GetCurrentStateString();
        }
        l = r.GetComponent(33);
        l &&
          (t =
            (t +=
              `
技能目标: ` +
              (l.SkillTarget?.Entity.GetComponent(3)?.Actor?.GetName() ??
                "无")) +
            `
当前技能: ` +
            (l.CurrentSkill?.SkillId ?? "无")),
          UE.KismetSystemLibrary.DrawDebugString(
            e,
            a,
            t,
            void 0,
            this.EntityBoxInfoColor,
          );
      }
    }
  }
}
((exports.CombatDebugDrawController =
  CombatDebugDrawController).DebugMonsterMovePath = !1),
  (CombatDebugDrawController.DebugMonsterControl = !1),
  (CombatDebugDrawController.IsDrawEntityBoxEnabled = !0),
  (CombatDebugDrawController.IsDrawEntityBoxInfoEnabled = !1),
  (CombatDebugDrawController.RedColor = void 0),
  (CombatDebugDrawController.GreenColor = void 0),
  (CombatDebugDrawController.BlueColor = void 0),
  (CombatDebugDrawController.YellowColor = void 0),
  (CombatDebugDrawController.EntityBoxColor = void 0),
  (CombatDebugDrawController.EntityBoxInfoColor = void 0),
  (CombatDebugDrawController.vCr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.MCr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.pCr = new Map());
// # sourceMappingURL=CombatDebugDrawController.js.map
