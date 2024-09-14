"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AwakeAndLoadEntityNode = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
  TickBehaviorNode_1 = require("./TickBehaviorNode");
class AwakeAndLoadEntityNode extends TickBehaviorNode_1.TickBehaviorNode {
  constructor() {
    super(...arguments),
      (this.fLe = void 0),
      (this.u$t = !1),
      (this.aHa = (e) => {
        this.u$t = !1;
      });
  }
  OnCreate(e) {
    return (
      !!super.OnCreate(e) &&
      (e = e.Condition).Type === IQuest_1.EChildQuest.AwakeAndLoadEntity &&
      ((this.fLe = e.EntityIds), !0)
    );
  }
  OnTick() {
    if (!this.u$t) {
      if (this.fLe && 0 !== this.fLe.length)
        for (const t of this.fLe)
          if (ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)) {
            var e =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
            if (e) {
              if (!e.IsInit) return;
            } else
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  19,
                  "GeneralLogicTree.AwakeAndLoadEntityNode AOI范围外的实体",
                  ["entityId", t],
                );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                19,
                "GeneralLogicTree.AwakeAndLoadEntityNode 找不到实体配置",
                ["entityId", t],
              );
      this.lHa();
    }
  }
  lHa() {
    this.Blackboard.ContainTag(6) ||
      this.Blackboard.IsSuspend() ||
      (this.hHa(),
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestSubmitAwakeAndLoadEntityNode(
        this.Context,
        this.aHa,
      ));
  }
  hHa() {
    this.u$t = !0;
  }
}
exports.AwakeAndLoadEntityNode = AwakeAndLoadEntityNode;
//# sourceMappingURL=AwakeAndLoadEntityNode.js.map
