"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Global_1 = require("../../../Global"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  NRARER_PLAYER_INT_ID = "NearerPlayerIntId";
class TsServiceSimpleSense extends UE.BTService_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.SenseRadius = void 0),
      (this.IsEnter = !1),
      (this.IsInit = !1),
      (this.MinRangeSquared = 0),
      (this.MaxRangeSquared = 0),
      (this.IsSetNearerPlayerId = !1);
  }
  ReceiveTickAI(e, r, t) {
    if (e instanceof TsAiController_1.default) {
      var i = Global_1.Global.BaseCharacter;
      if (i) {
        e = e.AiController;
        if (e) {
          e = e.CharActorComp;
          if (e) {
            var e = e.Entity,
              l = e.GetComponent(109);
            if (l) {
              this.IsInit ||
                ((this.IsInit = !0),
                (o = this.SenseRadius.LowerBound.Value),
                (s = this.SenseRadius.UpperBound.Value),
                (this.MinRangeSquared = o * o),
                (this.MaxRangeSquared = s * s),
                l.SetLogicRange(s));
              var s,
                o = l.PlayerDistSquared;
              let r = 0;
              o > this.MaxRangeSquared
                ? ((r = 0), this.IsEnter && (this.IsEnter = !1))
                : o > this.MinRangeSquared
                  ? (r = this.IsEnter ? i.CharacterActorComponent.Entity.Id : 0)
                  : ((r = i.CharacterActorComponent.Entity.Id),
                    this.IsEnter || (this.IsEnter = !0)),
                0 === r
                  ? this.IsSetNearerPlayerId &&
                    ((this.IsSetNearerPlayerId = !1),
                    BlackboardController_1.BlackboardController.RemoveValueByEntity(
                      e.Id,
                      "NearerPlayerId",
                    ))
                  : (BlackboardController_1.BlackboardController.SetEntityIdByEntity(
                      e.Id,
                      "NearerPlayerId",
                      r,
                    ),
                    (this.IsSetNearerPlayerId = !0)),
                BlackboardController_1.BlackboardController.SetIntValueByEntity(
                  e.Id,
                  NRARER_PLAYER_INT_ID,
                  r,
                );
            }
          }
        }
      }
    }
  }
}
exports.default = TsServiceSimpleSense;
//# sourceMappingURL=TsServiceSimpleSense.js.map
