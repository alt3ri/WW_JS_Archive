"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatDebugDrawController = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatDebugController_1 = require("./CombatDebugController");
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
    this.DebugMonsterControl && this.mgr(),
      this.dgr(CombatDebugController_1.CombatDebugController.DebugEntityId);
  }
  static mgr() {
    this.Cgr.clear();
    for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
      []) {
      var t;
      e.Entity.Active &&
        (t = e.Entity.GetComponent(0)).IsRole() &&
        this.Cgr.set(t.GetPlayerId(), e.Entity);
    }
    for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities() ??
      []) {
      var r, o;
      a.Entity.Active &&
        a.Entity.GetComponent(0).IsMonster() &&
        (o = a.Entity.GetComponent(39)?.AiController) &&
        (r = this.Cgr.get(o.ControllerPlayerId)) &&
        (this.ggr.DeepCopy(a.Entity.GetComponent(3).ActorLocationProxy),
        this.fgr.DeepCopy(r.GetComponent(3).ActorLocationProxy),
        UE.KismetSystemLibrary.DrawDebugArrow(
          GlobalData_1.GlobalData.World,
          this.ggr.ToUeVector(),
          this.fgr.ToUeVector(),
          2,
          this.GreenColor,
        ),
        (r = a.Entity.GetComponent(59))) &&
        o.ControllerPlayerId !== r.ControllerPlayerId &&
        (o = this.Cgr.get(r.ControllerPlayerId)) &&
        (this.fgr.DeepCopy(o.GetComponent(3).ActorLocationProxy),
        UE.KismetSystemLibrary.DrawDebugArrow(
          GlobalData_1.GlobalData.World,
          this.ggr.ToUeVector(),
          this.fgr.ToUeVector(),
          2,
          this.YellowColor,
        ));
    }
  }
  static dgr(r) {
    var r = EntitySystem_1.EntitySystem.Get(r),
      o = r?.GetComponent(3),
      e = o?.Actor,
      a = e?.CapsuleComponent;
    if (e?.IsValid() && a?.IsValid()) {
      var l = e.K2_GetActorLocation();
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
        (l = r.GetComponent(109)),
          (o =
            (l &&
              (t +=
                `
时间缩放: ` + l.CurrentTimeScale.toFixed(2)),
            r.GetComponent(67)));
        for (const i of o?.StateMachineGroup?.StateMachines ?? [])
          t +=
            `
状态机${i.Name}: ` + i.GetCurrentStateString();
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
  (CombatDebugDrawController.ggr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.fgr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.Cgr = new Map());
//# sourceMappingURL=CombatDebugDrawController.js.map
