"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventExecution = void 0);
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExecution extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.E0 = 0);
  }
  ExecuteNew(e, t) {
    t.Type === 1 && EntitySystem_1.EntitySystem.Get(t.EntityId)?.Valid
      ? ((this.E0 = t.EntityId), this.MDe(), this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
  MDe() {
    let e = EntitySystem_1.EntitySystem.Get(this.E0);
    e &&
      ((e = e.GetComponent(76))
        ? e.StartExecution()
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "Can not find ExecutionComponent"));
  }
  OnReset() {
    this.E0 = 0;
  }
}
exports.LevelEventExecution = LevelEventExecution;
// # sourceMappingURL=LevelEventExecution.js.map
