"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCombatStateBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class CheckCombatStateBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.RXt = !1),
      (this.UXt = 0),
      (this.AXt = 0),
      (this.PXt = []),
      (this.Lia = !0),
      (this.OnAfterSubmit = (e) => {
        this.RXt = !1;
      });
  }
  get CorrelativeEntities() {
    return this.PXt;
  }
  OnCreate(e) {
    return !(
      !super.OnCreate(e) ||
      "DetectCombatState" !== (e = e.Condition).Type ||
      ((this.RXt = !1),
      (this.AXt = e.EntityId),
      (this.PXt = [e.EntityId]),
      this.AXt
        ? ((this.UXt = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            e.State,
          )),
          this.UXt
            ? ((this.Lia = "Ne" !== e.Compare), 0)
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
    if (!this.RXt && this.UXt) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        this.AXt,
      );
      if (t?.IsInit) {
        let e = t.Entity.GetComponent(188);
        (e = e || t.Entity.GetComponent(180)) &&
          (e.HasTag(this.UXt)
            ? this.Lia && this.SubmitNode()
            : this.Lia || this.SubmitNode());
      }
    }
  }
  OnBeforeSubmit() {
    this.RXt = !0;
  }
}
exports.CheckCombatStateBehaviorNode = CheckCombatStateBehaviorNode;
//# sourceMappingURL=CheckCombatStateBehaviorNode.js.map
