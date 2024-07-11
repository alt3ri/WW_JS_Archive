"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionLiftLocation = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionLiftLocation extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) return !1;
    let t = void 0;
    return (
      e.IsSelf
        ? r && (t = ActorUtils_1.ActorUtils.GetEntityByActor(r))
        : (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            e.EntityId,
          )),
      !!t?.Valid &&
        !!(r = t.Entity.GetComponent(123)) &&
        ((r = r.CurLiftFloor === e.Location), e.Compare === "Eq" ? r : !r)
    );
  }
}
exports.LevelConditionLiftLocation = LevelConditionLiftLocation;
// # sourceMappingURL=LevelConditionLiftLocation.js.map
