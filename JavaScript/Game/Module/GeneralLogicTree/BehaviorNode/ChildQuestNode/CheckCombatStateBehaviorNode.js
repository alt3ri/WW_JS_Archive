"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCombatStateBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TickBehaviorNode_1 = require("./TickBehaviorNode");
class CheckCombatStateBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.RQt = !1),
      (this.UQt = 0),
      (this.AQt = 0),
      (this.PQt = []),
      (this.B9s = !0),
      (this.OnAfterSubmit = (e) => {
        this.RQt = !1;
      });
  }
  get CorrelativeEntities() {
    return this.PQt;
  }
  OnCreate(e) {
    return !(
      !super.OnCreate(e) ||
      (e = e.Condition).Type !== "DetectCombatState" ||
      ((this.RQt = !1),
      (this.AQt = e.EntityId),
      (this.PQt = [e.EntityId]),
      this.AQt
        ? ((this.UQt = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            e.State,
          )),
          this.UQt
            ? ((this.B9s = e.Compare !== "Ne"), 0)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "GeneralLogicTree",
                  19,
                  "行为树检测的GameplayTag不存在",
                  ["tag", e.State],
                ),
              1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "行为树检测实体的GameplayTag时，实体不存在",
            ),
          1))
    );
  }
  OnTick() {
    if (!this.RQt && this.UQt) {
      const t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.AQt,
      );
      if (t?.IsInit) {
        let e = t.Entity.GetComponent(185);
        (e = e || t.Entity.GetComponent(177)) &&
          (e.HasTag(this.UQt)
            ? this.B9s && this.SubmitNode()
            : this.B9s || this.SubmitNode());
      }
    }
  }
  OnBeforeSubmit() {
    this.RQt = !0;
  }
}
exports.CheckCombatStateBehaviorNode = CheckCombatStateBehaviorNode;
// # sourceMappingURL=CheckCombatStateBehaviorNode.js.map
