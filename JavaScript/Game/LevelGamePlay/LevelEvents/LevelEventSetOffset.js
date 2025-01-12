"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetOffset = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetOffset extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    if (e) {
      var a = e.get("zOffset"),
        e = e.get("CreatureGen");
      if (e && a) {
        var e = UE.KismetStringLibrary.Conv_StringToInt64(e),
          t = new Array();
        if (
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
            e,
            t,
          ),
          t.length)
        )
          for (const s of t) {
            var l = CharacterController_1.CharacterController.GetActor(s),
              o = l.K2_GetActorLocation();
            (o.Z += parseFloat(a)),
              l.K2_SetActorLocation(o, !1, (0, puerts_1.$ref)(void 0), !1);
          }
      }
    }
  }
}
exports.LevelEventSetOffset = LevelEventSetOffset;
//# sourceMappingURL=LevelEventSetOffset.js.map
