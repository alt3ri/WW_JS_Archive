"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetTargetPos = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTargetPos extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    if (e) {
      var a = e.get("xPos"),
        t = e.get("yPos"),
        o = e.get("zPos"),
        e = e.get("CreatureGen");
      if (e && a && t && o) {
        var e = UE.KismetStringLibrary.Conv_StringToInt64(e),
          s = new UE.Vector(parseFloat(a), parseFloat(t), parseFloat(o)),
          a = new Array();
        if (
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
            e,
            a,
          ),
          a.length)
        )
          for (const l of a)
            CharacterController_1.CharacterController.GetActor(
              l,
            ).K2_SetActorLocation(s, !1, (0, puerts_1.$ref)(void 0), !1);
      }
    }
  }
}
exports.LevelEventSetTargetPos = LevelEventSetTargetPos;
//# sourceMappingURL=LevelEventSetTargetPos.js.map
