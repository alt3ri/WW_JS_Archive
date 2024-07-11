"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionDestroyEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionUtils_1 = require("../Flow/FlowActionUtils");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionDestroyEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.QXi = (t) => {
        this.Task = void 0;
        const e = this.ActionInfo.Params;
        t ||
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "加载实体失败",
          );
        let o = !1;
        for (const n of e.EntityIds) {
          var i;
          const r =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
          r
            ? (i = r.Entity.GetComponent(117))
              ? (r.Entity.GetComponent(177)?.RemoveServerTagByIdLocal(
                  -1152559349,
                  "[SceneItemStateComponent]ForceHandleDestroyState",
                ),
                r.Entity.GetComponent(177)?.AddServerTagByIdLocal(
                  -1278190765,
                  "[SceneItemStateComponent]ForceHandleDestroyState",
                ),
                i.HandleDestroyState())
              : ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                  r.Entity,
                  !1,
                  "FlowActionDestroyEntity.OnEntityReady",
                )
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Plot", 27, "实体未下发，联系服务端检查配置", [
                  "ids",
                  n,
                ]),
              (o = !0));
        }
        o && this.RequestServerAction(!1), this.FinishExecute(!0);
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
                "剧情中销毁实体过远，请检查配置",
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
exports.FlowActionDestroyEntity = FlowActionDestroyEntity;
// # sourceMappingURL=FlowActionDestroyEntity.js.map
