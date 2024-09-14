"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionSetEntityVisible = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
  FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionSetEntityVisible extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.W$i = (t) => {
        this.Task = void 0;
        var o = this.ActionInfo.Params,
          e =
            (t ||
              ControllerHolder_1.ControllerHolder.FlowController.LogError(
                "加载实体失败",
              ),
            new Array());
        for (const r of o.EntityIds) {
          var i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
          i
            ? ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                i.Entity,
                o.Visible,
                "FlowActionSetEntityVisible.OnEntityReady",
              )
            : e.push(r);
        }
        0 < e.length &&
          (ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "实体未下发，联系服务端检查配置",
            ["ids", e],
          ),
          o.Visible || this.RequestServerAction(!1)),
          this.RecordAction(),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      var o = this.ActionInfo.Params;
      if (o.EntityIds?.length) {
        let t = !1;
        for (const e of o.EntityIds)
          FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(e) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "剧情中显隐实体过远，请检查配置",
                ["pbDataId", e],
                ["flow", this.Context.FormatId],
                ["id", this.ActionInfo.ActionId],
              ),
            (t = !0));
        if (t) this.RequestServerAction(!1), this.FinishExecute(!0);
        else {
          if (o.Visible)
            for (const i of o.EntityIds)
              ControllerHolder_1.ControllerHolder.CreatureController.RecoverDensityEntity(
                i,
                "Plot",
              );
          this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
            o.EntityIds,
            this.W$i,
            FlowActionUtils_1.WAIT_ENTITY_TIME,
            !o.Visible,
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
  OnRollback(t, o) {
    var e = t.ActionInfo.Params;
    for (const r of e.EntityIds) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      i?.IsInit &&
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          i.Entity,
          !e.Visible,
          "FlowActionAwakeEntity.OnRollback",
        );
    }
  }
}
exports.FlowActionSetEntityVisible = FlowActionSetEntityVisible;
//# sourceMappingURL=FlowActionSetEntityVisible.js.map
