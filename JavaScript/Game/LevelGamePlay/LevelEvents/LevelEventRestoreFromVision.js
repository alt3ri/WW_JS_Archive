"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventRestoreFromVision = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRestoreFromVision extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, s) {
    if (e) {
      const r = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
      e = r?.GetComponent(34);
      if (e && r) {
        var o = r.GetComponent(49)?.FollowIds;
        if (o) {
          for (const i of o) {
            const r = EntitySystem_1.EntitySystem.Get(i);
            if (r) return void r.GetComponent(190)?.AddTag(-2042072030);
          }
          e.EndOwnerAndFollowSkills();
        }
      }
    }
  }
}
exports.LevelEventRestoreFromVision = LevelEventRestoreFromVision;
//# sourceMappingURL=LevelEventRestoreFromVision.js.map
