"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionSelfState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, t) {
    if (!e) return !1;
    let l = void 0;
    return (
      r && (l = ActorUtils_1.ActorUtils.GetEntityByActor(r)),
      !!(l =
        t && t.Type === 1
          ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId)
          : l)?.Valid &&
        !!(r = l.Entity.GetComponent(177)) &&
        ((t = r.ContainsTagByName(e.State)), e.Compare === "Eq" ? t : !t)
    );
  }
}
exports.LevelConditionSelfState = LevelConditionSelfState;
// # sourceMappingURL=LevelConditionSelfState.js.map
