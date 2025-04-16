"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEntityTurnTo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEntityTurnTo extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.pDe = void 0),
      (this.sDe = void 0),
      (this.zpe = (e, t) => {
        this.sDe === t &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              26,
              "实体被移除 LevelEventEntityTurnTo保底结束",
              ["PbDataId", t.PbDataId],
            ),
          this.ej_());
      }),
      (this.ej_ = () => {
        EventSystem_1.EventSystem.HasWithTarget(
          this.sDe,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.sDe,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
          this.FinishExecute(!0);
      });
  }
  ExecuteNew(e, t, o) {
    (this.pDe = e), this.CreateWaitEntityTask(this.pDe.EntityId);
  }
  ExecuteWhenEntitiesReady() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      this.pDe.EntityId,
    );
    if (t?.IsInit) {
      var o = t.Entity.GetComponent(45);
      if (o) {
        let e = void 0;
        switch (this.pDe.Target.Type) {
          case 2: {
            const n =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                this.pDe.Target.EntityId,
              )?.Entity?.GetComponent(1);
            n && (e = Vector_1.Vector.Create(n.ActorLocationProxy));
            break;
          }
          case 3:
            (e = Vector_1.Vector.Create()).FromConfigVector(
              this.pDe.Target.Pos,
            );
            break;
          case 4: {
            const n =
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                1,
              );
            n && (e = Vector_1.Vector.Create(n.ActorLocationProxy));
            break;
          }
        }
        if (e) {
          const n = t.Entity.GetComponent(1);
          var r = Vector_1.Vector.Create(),
            i = Rotator_1.Rotator.Create(),
            r =
              (e.Subtraction(n.ActorLocationProxy, r),
              r.ToOrientationRotator(i),
              (i.Pitch = 0),
              (i.Roll = 0),
              Protocol_1.Aki.Protocol.ecs.create()),
            s = Protocol_1.Aki.Protocol.Zks.create();
          (s.F4n = t.CreatureDataId),
            (s.P5n = n.ActorLocationProxy),
            (s.g8n = i),
            (r.iVn = [s]),
            Net_1.Net.Send(17177, r),
            this.IsAsync
              ? (o.PerformTurn(2, { TargetLocation: e }),
                this.FinishExecute(!0))
              : ((this.sDe = t),
                EventSystem_1.EventSystem.AddWithTarget(
                  t,
                  EventDefine_1.EEventName.RemoveEntity,
                  this.zpe,
                ),
                o.PerformTurn(2, { TargetLocation: e }, void 0, this.ej_));
        } else this.FinishExecute(!0);
      } else this.FinishExecute(!0);
    } else this.FinishExecute(!0);
  }
}
exports.LevelEventEntityTurnTo = LevelEventEntityTurnTo;
//# sourceMappingURL=LevelEventEntityTurnTo.js.map
