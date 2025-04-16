"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
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
  Constructor() {
    (this.IsEnter = !1),
      (this.IsInit = !1),
      (this.MinRangeSquared = 0),
      (this.MaxRangeSquared = 0),
      (this.IsSetNearerPlayerId = !1);
  }
  ReceiveTickAI(r, e, t) {
    if (r instanceof TsAiController_1.default) {
      var i = Global_1.Global.BaseCharacter;
      if (i) {
        r = r.AiController;
        if (r) {
          r = r.CharActorComp;
          if (r) {
            var r = r.Entity,
              s = r.GetComponent(119);
            if (s) {
              this.IsInit ||
                ((this.IsInit = !0),
                (o = this.SenseRadius.LowerBound.Value),
                (l = this.SenseRadius.UpperBound.Value),
                (this.MinRangeSquared = o * o),
                (this.MaxRangeSquared = l * l),
                s.SetLogicRange(l));
              var l,
                o = s.PlayerDistSquared;
              let e = 0;
              o > this.MaxRangeSquared
                ? ((e = 0), this.IsEnter && (this.IsEnter = !1))
                : o > this.MinRangeSquared
                  ? (e = this.IsEnter ? i.CharacterActorComponent.Entity.Id : 0)
                  : ((e = i.CharacterActorComponent.Entity.Id),
                    this.IsEnter || (this.IsEnter = !0)),
                0 === e
                  ? this.IsSetNearerPlayerId &&
                    ((this.IsSetNearerPlayerId = !1),
                    ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
                      r.Id,
                      "NearerPlayerId",
                    ))
                  : (ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(
                      r.Id,
                      "NearerPlayerId",
                      e,
                    ),
                    (this.IsSetNearerPlayerId = !0)),
                ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
                  r.Id,
                  NRARER_PLAYER_INT_ID,
                  e,
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
