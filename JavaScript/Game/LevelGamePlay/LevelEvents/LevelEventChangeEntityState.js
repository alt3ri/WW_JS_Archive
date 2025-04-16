"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventChangeEntityState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventChangeEntityState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.Lo = void 0),
      (this.tRl = 0),
      (this.fLe = void 0);
  }
  ExecuteNew(t, e, i) {
    if (1 === e.Type && e.ClientExecuteActions) {
      this.Lo = t;
      let e = void 0;
      switch (this.Lo.Type) {
        case IAction_1.EChangeEntityState.Directly:
          (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            this.Lo.State,
          )),
            (this.fLe = [this.Lo.EntityId]);
          break;
        case IAction_1.EChangeEntityState.Loop:
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelEvent", 26, "不支持的切换实体状态"),
            void this.FinishExecute(!0)
          );
        case IAction_1.EChangeEntityState.BatchDirectly:
          (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            this.Lo.State,
          )),
            (this.fLe = this.Lo.EntityIds);
      }
      void 0 === e
        ? this.FinishExecute(!0)
        : ((this.tRl = e), this.CreateWaitEntityTask(this.fLe));
    } else this.FinishExecute(!0);
  }
  ExecuteWhenEntitiesReady() {
    for (const e of this.fLe)
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
        e,
        this.tRl,
        "ShowInRefSequence",
      );
    this.FinishExecute(!0);
  }
  OnReset() {
    (this.Lo = void 0), (this.tRl = 0), (this.fLe = void 0);
  }
}
exports.LevelEventChangeEntityState = LevelEventChangeEntityState;
//# sourceMappingURL=LevelEventChangeEntityState.js.map
