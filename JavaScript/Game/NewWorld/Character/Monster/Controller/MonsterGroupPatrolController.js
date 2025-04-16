"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterGroupPatrolController = void 0);
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  INTERVAL_TIME = 1e3;
class MonsterGroupPatrolController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !0;
  }
  static OnTick(r) {
    if (((this.mie += r), !(this.mie < INTERVAL_TIME))) {
      this.mie = 0;
      r = ModelManager_1.ModelManager.MonsterGroupPatrolModel?.MonsterGroups;
      if (r && 0 !== r.size) {
        let e = void 0;
        for (const a of r) {
          var o = a[1],
            t = o.CheckMonsterValid();
          if (t)
            switch (o.GetAllMonsterInState()) {
              case 0:
                break;
              case 1:
                o.ReadyToStartPatrol();
                break;
              case 2:
                o.CheckMonsterMoveSpeed();
                break;
              case 3:
                (e = e || []).push(a[0]);
            }
          else (e = e || []).push(a[0]);
        }
        if (e && 0 < e.length)
          for (const s of e)
            ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RemoveMonsterGroup(
              s,
            );
      }
    }
  }
  static OnClear() {
    return !0;
  }
}
(exports.MonsterGroupPatrolController = MonsterGroupPatrolController).mie = -0;
//# sourceMappingURL=MonsterGroupPatrolController.js.map
