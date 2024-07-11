"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetTargetPos = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTargetPos extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    if (e) {
      var a = e.get("xPos");
      const t = e.get("yPos");
      const o = e.get("zPos");
      var e = e.get("CreatureGen");
      if (e && a && t && o) {
        var e = UE.KismetStringLibrary.Conv_StringToInt64(e);
        const s = new UE.Vector(parseFloat(a), parseFloat(t), parseFloat(o));
        var a = new Array();
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
// # sourceMappingURL=LevelEventSetTargetPos.js.map
