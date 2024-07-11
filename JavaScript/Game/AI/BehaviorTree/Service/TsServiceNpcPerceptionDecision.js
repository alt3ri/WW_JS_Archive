"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const WorldFunctionLibrary_1 = require("../../../World/Bridge/WorldFunctionLibrary");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceNpcPerceptionDecision extends UE.BTService_BlueprintBase {
  ReceiveTickAI(e, r, o) {
    if (e instanceof TsAiController_1.default) {
      e = e.AiController;
      const i = e.CharActorComp.Entity;
      const t = i.Id;
      let l = e.AiPerception.AllEnemies;
      let r = 0;
      let o = 0;
      if (l && l.size > 0)
        for (const n of l)
          switch (WorldFunctionLibrary_1.default.GetEntityTypeByEntity(n)) {
            case Protocol_1.Aki.Protocol.HBs.Proto_Monster:
              r++;
              break;
            case Protocol_1.Aki.Protocol.HBs.Proto_Player:
              o = n;
          }
      for (const c of e.AiPerception.Allies) {
        const i = EntitySystem_1.EntitySystem.Get(c);
        if (i?.GetComponent(0)?.IsRole()) {
          o = c;
          break;
        }
      }
      (l = e.AiPerception.Neutrals.size),
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          t,
          "MonsterCount",
          r,
        ),
        BlackboardController_1.BlackboardController.SetEntityIdByEntity(
          t,
          "NearerPlayerId",
          o,
        ),
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          t,
          "NeutralCount",
          l,
        );
    }
  }
}
exports.default = TsServiceNpcPerceptionDecision;
// # sourceMappingURL=TsServiceNpcPerceptionDecision.js.map
