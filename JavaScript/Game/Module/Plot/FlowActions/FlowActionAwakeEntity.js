"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionAwakeEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
  FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionAwakeEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.W$i = (o) => {
        this.Task = void 0;
        var t = this.ActionInfo.Params,
          e =
            (o ||
              ControllerHolder_1.ControllerHolder.FlowController.LogError(
                "加载实体失败",
              ),
            new Array());
        for (const i of t.EntityIds) {
          var r =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
          r
            ? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                r.Entity,
                !0,
                "FlowActionAwakeEntity.OnEntityReady",
              )
            : e.push(i);
        }
        0 < e.length &&
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "实体未下发，联系服务端检查配置",
            ["ids", e],
          ),
          this.RecordAction(),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      var t = this.ActionInfo.Params;
      if (t.EntityIds?.length) {
        let o = !1;
        for (const e of t.EntityIds)
          FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(e) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "剧情中唤醒实体过远，请检查配置",
                ["pbDataId", e],
                ["flow", this.Context.FormatId],
                ["id", this.ActionInfo.ActionId],
              ),
            (o = !0));
        if (o) this.RequestServerAction(!1), this.FinishExecute(!0);
        else {
          for (const r of t.EntityIds)
            ControllerHolder_1.ControllerHolder.CreatureController.RecoverDensityEntity(
              r,
              "Plot",
            );
          this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
            t.EntityIds,
            this.W$i,
            FlowActionUtils_1.WAIT_ENTITY_TIME,
            !1,
          );
        }
      } else this.FinishExecute(!0);
    } else this.FinishExecute(!0);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  OnInterruptExecute() {
    this.Task?.Cancel(), (this.Task = void 0), this.FinishExecute(!0);
  }
  OnRollback(o, t) {
    for (const r of o.ActionInfo.Params.EntityIds) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      e?.IsInit &&
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          e.Entity,
          !1,
          "FlowActionAwakeEntity.OnRollback",
        );
    }
  }
}
exports.FlowActionAwakeEntity = FlowActionAwakeEntity;
//# sourceMappingURL=FlowActionAwakeEntity.js.map
