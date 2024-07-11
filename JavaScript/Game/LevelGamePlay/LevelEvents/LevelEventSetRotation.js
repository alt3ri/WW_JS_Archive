"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetRotation = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetRotation extends LevelGeneralBase_1.LevelEventBase {
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
          for (const n of t) {
            const o = CharacterController_1.CharacterController.GetActor(n);
            const l = o.K2_GetActorRotation();
            (l.Yaw += parseFloat(a)), o.K2_SetActorRotation(l, !1);
          }
      }
    }
  }
}
exports.LevelEventSetRotation = LevelEventSetRotation;
// # sourceMappingURL=LevelEventSetRotation.js.map
