"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventEnableHostility = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableHostility extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.fLe = void 0), (this.vq = !1);
  }
  ExecuteNew(e, t) {
    if (e) {
      (this.vq = e.IsEnable), (this.fLe = e.EntityIds);
      for (const o of this.fLe) {
        var s =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
        s?.Valid
          ? this.vq
            ? (s.Entity.GetComponent(38)?.SetAiHateConfig(""),
              s.Entity.GetComponent(38)?.SetAiTickLock(!1))
            : (s.Entity.GetComponent(38)?.SetAiTickLock(!0),
              s.Entity.GetComponent(38)?.SetAiHateConfig("10"))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("LevelEvent", 34, "实体不存在 可能已被销毁", [
              "entityId",
              o,
            ]);
      }
      this.FinishExecute(!0);
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 34, "参数不合法"),
        this.FinishExecute(!1);
  }
}
exports.LevelEventEnableHostility = LevelEventEnableHostility;
//# sourceMappingURL=LevelEventEnableHostility.js.map
