"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetOffset = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetOffset extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    if (e) {
      const a = e.get("zOffset");
      var e = e.get("CreatureGen");
      if (e && a) {
        var e = UE.KismetStringLibrary.Conv_StringToInt64(e);
        const t = new Array();
        if (
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
            e,
            t,
          ),
          t.length)
        )
          for (const s of t) {
            const l = CharacterController_1.CharacterController.GetActor(s);
            const o = l.K2_GetActorLocation();
            (o.Z += parseFloat(a)),
              l.K2_SetActorLocation(o, !1, (0, puerts_1.$ref)(void 0), !1);
          }
      }
    }
  }
}
exports.LevelEventSetOffset = LevelEventSetOffset;
// # sourceMappingURL=LevelEventSetOffset.js.map
