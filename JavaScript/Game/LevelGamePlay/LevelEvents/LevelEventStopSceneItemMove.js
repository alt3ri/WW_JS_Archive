"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventStopSceneItemMove = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.OPt = void 0);
  }
  ExecuteNew(e, t) {
    e
      ? ((this.OPt = e), (e = this.OPt.EntityIds), this.CreateWaitEntityTask(e))
      : (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 32, "参数配置错误"),
        this.FinishExecute(!1));
  }
  ExecuteWhenEntitiesReady() {
    if (this.OPt) {
      var e = this.OPt.EntityIds,
        t = [],
        o = Protocol_1.Aki.Protocol.eZs.create(),
        r =
          ((o.rZs = []),
          this.OPt.StopType === IAction_1.EStopSceneItemMoveType.StopAtNextPos);
      for (const a of e) {
        var n = Protocol_1.Aki.Protocol.nZs.create(),
          i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
        if (i?.Valid) {
          var s = i.Entity.GetComponent(115);
          if (s?.Valid) {
            let e = void 0;
            r && (e = s.GetNextTarget());
            var l = i.Entity.GetComponent(0),
              v = i.Entity.GetComponent(1),
              l =
                ((n.P4n = MathUtils_1.MathUtils.NumberToLong(
                  l.GetCreatureDataId(),
                )),
                (n.y5n = v.ActorLocationProxy),
                {
                  Entity: i.Entity,
                  Location: Vector_1.Vector.Create(v.ActorLocationProxy),
                  Velocity: e?.HasTarget ? e?.Velocity : void 0,
                });
            r &&
              e.HasTarget &&
              ((n.y5n = e.Target),
              (l.Location = Vector_1.Vector.Create(e.Target)),
              (l.Velocity = e.Velocity)),
              s.IsMoving && o.rZs.push(n),
              t.push(l);
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Event",
                32,
                "Entity找不到SceneItemMoveComponent",
                ["entityId", a],
              );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Event", 32, "实体不合法", ["entityId", a]);
      }
      Net_1.Net.Call(18221, o, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            17217,
          );
      });
      for (const m of t) {
        var _ = m.Entity.GetComponent(115),
          c =
            (_.StopMove(),
            EventSystem_1.EventSystem.EmitWithTarget(
              m.Entity,
              EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
              m.Entity,
            ),
            Vector_1.Vector.Create(
              m.Entity.GetComponent(1)?.ActorLocationProxy,
            ));
        m.Velocity &&
          ((c = Vector_1.Vector.Distance(c, m.Location) / m.Velocity.Size()),
          _.AddMoveTarget(
            new SceneItemMoveComponent_1.MoveTarget(m.Location, c),
          ));
      }
    }
  }
  OnReset() {
    this.OPt = void 0;
  }
}
exports.LevelEventStopSceneItemMove = LevelEventStopSceneItemMove;
//# sourceMappingURL=LevelEventStopSceneItemMove.js.map
