"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceNpcPerceptionDecision extends UE.BTService_BlueprintBase {
  Constructor() {}
  ReceiveTickAI(o, r, e) {
    if (o instanceof TsAiController_1.default) {
      o = o.AiController;
      const l = o.CharActorComp.Entity;
      var t = l.Id,
        i = o.AiPerception.AllEnemies;
      let r = 0,
        e = 0;
      if (i && 0 < i.size)
        for (const n of i)
          switch (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(n)) {
            case Protocol_1.Aki.Protocol.kks.Proto_Monster:
              r++;
              break;
            case Protocol_1.Aki.Protocol.kks.Proto_Player:
              e = n;
          }
      for (const c of o.AiPerception.Allies) {
        const l = EntitySystem_1.EntitySystem.Get(c);
        if (l?.GetComponent(0)?.IsRole()) {
          e = c;
          break;
        }
      }
      (i = o.AiPerception.Neutrals.size),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
          t,
          "MonsterCount",
          r,
        ),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
          t,
          "NearerPlayerId",
          e,
        ),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
          t,
          "NeutralCount",
          i,
        );
    }
  }
}
exports.default = TsServiceNpcPerceptionDecision;
//# sourceMappingURL=TsServiceNpcPerceptionDecision.js.map
