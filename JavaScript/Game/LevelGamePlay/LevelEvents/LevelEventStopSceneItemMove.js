"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventStopSceneItemMove = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.qAt = void 0);
  }
  ExecuteNew(e, t) {
    e
      ? ((this.qAt = e), (e = this.qAt.EntityIds), this.CreateWaitEntityTask(e))
      : (Log_1.Log.CheckError() && Log_1.Log.Error("Event", 32, "参数配置错误"),
        this.FinishExecute(!1));
  }
  ExecuteWhenEntitiesReady() {
    if (this.qAt) {
      const e = this.qAt.EntityIds;
      const t = [];
      const o = Protocol_1.Aki.Protocol.e7s.create();
      const r =
        ((o.i7s = []),
        this.qAt.StopType === IAction_1.EStopSceneItemMoveType.StopAtNextPos);
      for (const a of e) {
        const n = Protocol_1.Aki.Protocol.r7s.create();
        const i =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
        if (i?.Valid) {
          const s = i.Entity.GetComponent(113);
          if (s?.Valid) {
            let e = void 0;
            r && (e = s.GetNextTarget());
            var l = i.Entity.GetComponent(0);
            const v = i.Entity.GetComponent(1);
            var l =
              ((n.rkn = MathUtils_1.MathUtils.NumberToLong(
                l.GetCreatureDataId(),
              )),
              (n.$kn = v.ActorLocationProxy),
              {
                Entity: i.Entity,
                Location: Vector_1.Vector.Create(v.ActorLocationProxy),
                Velocity: e?.HasTarget ? e?.Velocity : void 0,
              });
            r &&
              e.HasTarget &&
              ((n.$kn = e.Target),
              (l.Location = Vector_1.Vector.Create(e.Target)),
              (l.Velocity = e.Velocity)),
              s.IsMoving && o.i7s.push(n),
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
      Net_1.Net.Call(15916, o, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            27191,
          );
      });
      for (const m of t) {
        const _ = m.Entity.GetComponent(113);
        let c =
          (_.StopMove(),
          EventSystem_1.EventSystem.EmitWithTarget(
            m.Entity,
            EventDefine_1.EEventName.OnSceneItemMoveEventBroken,
            m.Entity,
          ),
          Vector_1.Vector.Create(m.Entity.GetComponent(1)?.ActorLocationProxy));
        m.Velocity &&
          ((c = Vector_1.Vector.Distance(c, m.Location) / m.Velocity.Size()),
          _.AddMoveTarget(
            new SceneItemMoveComponent_1.MoveTarget(m.Location, c),
          ));
      }
    }
  }
  OnReset() {
    this.qAt = void 0;
  }
}
exports.LevelEventStopSceneItemMove = LevelEventStopSceneItemMove;
// # sourceMappingURL=LevelEventStopSceneItemMove.js.map
