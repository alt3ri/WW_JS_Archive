"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeEntityState = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionBase_1 = require("./FlowActionBase");
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
// # sourceMappingURL=FlowActionChangeEntityState.js.map
