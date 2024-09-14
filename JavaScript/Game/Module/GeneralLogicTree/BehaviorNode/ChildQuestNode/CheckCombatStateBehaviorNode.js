"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CheckCombatStateBehaviorNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class CheckCombatStateBehaviorNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.RXt = !1),
      (this.UXt = 0),
      (this.AXt = 0),
      (this.PXt = []),
      (this.Foa = !0),
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
      (e = e.Condition).Type !== IQuest_1.EChildQuest.DetectCombatState ||
      ((this.RXt = !1),
      (this.AXt = e.EntityId),
      (this.PXt = [e.EntityId]),
      this.AXt
        ? ((this.UXt = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            e.State,
          )),
          this.UXt
            ? ((this.Foa = "Ne" !== e.Compare), 0)
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
        let e = t.Entity.GetComponent(190);
        (e = e || t.Entity.GetComponent(181)) &&
          (e.HasTag(this.UXt)
            ? this.Foa && this.SubmitNode()
            : this.Foa || this.SubmitNode());
      }
    }
  }
  OnBeforeSubmit() {
    this.RXt = !0;
  }
}
exports.CheckCombatStateBehaviorNode = CheckCombatStateBehaviorNode;
//# sourceMappingURL=CheckCombatStateBehaviorNode.js.map
