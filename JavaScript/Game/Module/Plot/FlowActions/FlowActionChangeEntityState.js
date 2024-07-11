"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeEntityState = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    const t = this.ActionInfo.Params;
    let o = void 0;
    switch (t.Type) {
      case IAction_1.EChangeEntityState.Directly:
        var e = t;
        o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
        break;
      case IAction_1.EChangeEntityState.Loop:
      case IAction_1.EChangeEntityState.BatchDirectly:
        return;
    }
    o &&
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
        t.EntityId,
        (e) => {
          e
            ? (LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
                t.EntityId,
                o,
                "ShowInPlotSequence",
              ),
              this.FinishExecute(!0))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Level",
                  32,
                  "[ChangePerformanceTag] 等待Entity加载超时",
                  ["pbDataId", t.EntityId],
                ),
              this.FinishExecute(!1));
        },
        !0,
      );
  }
}
exports.FlowActionChangeEntityState = FlowActionChangeEntityState;
//# sourceMappingURL=FlowActionChangeEntityState.js.map
