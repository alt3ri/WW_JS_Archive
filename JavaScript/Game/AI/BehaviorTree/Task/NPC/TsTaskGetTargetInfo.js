"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../../GlobalData");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const TsAiController_1 = require("../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
class TsTaskGetTargetInfo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TargetKey = ""),
      (this.PositionKey = ""),
      (this.HpKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsTargetKey = ""),
      (this.TsPositionKey = ""),
      (this.TsHpKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsTargetKey = this.TargetKey),
      (this.TsPositionKey = this.PositionKey),
      (this.TsHpKey = this.HpKey));
  }
  ReceiveExecuteAI(e, t) {
    if ((this.InitTsVariables(), e instanceof TsAiController_1.default)) {
      let t = e.AiController.CharActorComp;
      if (this.TsTargetKey) {
        e = BlackboardController_1.BlackboardController.GetIntValueByWorld(
          this.TsTargetKey,
        );
        if (!e) return void this.FinishExecute(!1);
        e = EntitySystem_1.EntitySystem.Get(e);
        t = e.GetComponent(3);
      }
      t
        ? ((e = t.ActorLocation),
          BlackboardController_1.BlackboardController.SetVectorValueByGlobal(
            this.TsPositionKey,
            e.X,
            e.Y,
            e.Z,
          ),
          (e = t.Actor.AttributeSet) &&
            ((e = e.Life.CurrentValue),
            BlackboardController_1.BlackboardController.SetIntValueByWorld(
              this.TsHpKey,
              e,
            )),
          this.FinishExecute(!0))
        : this.FinishExecute(!1);
    } else this.FinishExecute(!1);
  }
}
exports.default = TsTaskGetTargetInfo;
// # sourceMappingURL=TsTaskGetTargetInfo.js.map
