"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationDataModel = void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  CACHE_ON_LAND_SIZE = 15;
class FormationDataModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PlayerAggroSet = new Set()),
      (this.OnLandPositionQueue = new Queue_1.Queue(CACHE_ON_LAND_SIZE)),
      (this.KeyboardLockEnemyMode = 0),
      (this.GamepadLockEnemyMode = 0);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.PlayerAggroSet.clear(), this.OnLandPositionQueue.Clear(), !0;
  }
  OnLeaveLevel() {
    return this.OnLandPositionQueue.Clear(), !0;
  }
  RefreshOnLandPosition() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity;
    if (t) {
      var e = t.GetComponent(160)?.PositionState;
      if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        (e = t.GetComponent(1)), (t = e?.Owner);
        if (t && !t.bHidden) {
          t = e.ActorLocationProxy;
          if (t) {
            let e = void 0;
            (e =
              (e =
                this.OnLandPositionQueue.Size >= CACHE_ON_LAND_SIZE
                  ? this.OnLandPositionQueue.Pop()
                  : e) || Vector_1.Vector.Create())?.DeepCopy(t),
              this.OnLandPositionQueue.Push(e);
          }
        }
      }
    }
  }
  GetLastPositionOnLand() {
    return this.OnLandPositionQueue.Front;
  }
}
exports.FormationDataModel = FormationDataModel;
//# sourceMappingURL=FormationDataModel.js.map
