"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeEntityState = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    let a = void 0,
      o = [];
    switch (e.Type) {
      case IAction_1.EChangeEntityState.Directly:
        (a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State)),
          (o = [e.EntityId]);
        break;
      case IAction_1.EChangeEntityState.BatchDirectly:
        (a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State)),
          (o = e.EntityIds);
        break;
      case IAction_1.EChangeEntityState.Loop:
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "不支持的切换实体状态",
        );
    }
    void 0 !== a
      ? WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          "FlowActionChangeEntityState.OnExecute",
          o,
          (e) => {
            for (const t of o)
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
                ?.IsInit &&
                LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
                  t,
                  a,
                  "ShowInPlotSequence",
                );
            this.FinishExecute(!0);
          },
        )
      : this.FinishExecute(!0);
  }
}
exports.FlowActionChangeEntityState = FlowActionChangeEntityState;
//# sourceMappingURL=FlowActionChangeEntityState.js.map
