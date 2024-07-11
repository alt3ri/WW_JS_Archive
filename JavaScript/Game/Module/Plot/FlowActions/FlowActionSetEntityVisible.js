"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetEntityVisible = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionUtils_1 = require("../Flow/FlowActionUtils");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSetEntityVisible extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.QXi = (t) => {
        this.Task = void 0;
        const e = this.ActionInfo.Params;
        const o =
          (t ||
            ControllerHolder_1.ControllerHolder.FlowController.LogError(
              "加载实体失败",
            ),
          new Array());
        for (const r of e.EntityIds) {
          const i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
          i
            ? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                i.Entity,
                e.Visible,
                "FlowActionSetEntityVisible.OnEntityReady",
              )
            : o.push(r);
        }
        o.length > 0 &&
          (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "实体未下发，联系服务端检查配置",
            ["ids", o],
          ),
          e.Visible || this.RequestServerAction(!1)),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      const e = this.ActionInfo.Params;
      if (e.EntityIds?.length) {
        let t = !1;
        for (const o of e.EntityIds)
          FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(o) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "剧情中显隐实体过远，请检查配置",
                ["pbDataId", o],
                ["flow", this.Context.FormatId],
                ["id", this.ActionInfo.ActionId],
              ),
            (t = !0));
        t
          ? (this.RequestServerAction(!1), this.FinishExecute(!0))
          : (this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
              e.EntityIds,
              this.QXi,
              !0,
              FlowActionUtils_1.WAIT_ENTITY_TIME,
              e.Visible,
            ));
      } else this.FinishExecute(!0);
    } else this.FinishExecute(!0);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this.Task?.Cancel(), (this.Task = void 0), this.FinishExecute(!0);
  }
}
exports.FlowActionSetEntityVisible = FlowActionSetEntityVisible;
// # sourceMappingURL=FlowActionSetEntityVisible.js.map
