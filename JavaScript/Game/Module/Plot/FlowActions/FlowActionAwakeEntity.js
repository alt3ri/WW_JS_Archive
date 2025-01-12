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
                !0,
                "FlowActionAwakeEntity.OnEntityReady",
              )
            : e.push(r);
        }
        0 < e.length &&
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "实体未下发，联系服务端检查配置",
            ["ids", e],
          ),
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
                "剧情中唤醒实体过远，请检查配置",
                ["pbDataId", e],
                ["flow", this.Context.FormatId],
                ["id", this.ActionInfo.ActionId],
              ),
            (t = !0));
        t
          ? (this.RequestServerAction(!1), this.FinishExecute(!0))
          : (this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
              o.EntityIds,
              this.W$i,
              !0,
              FlowActionUtils_1.WAIT_ENTITY_TIME,
              !1,
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
exports.FlowActionAwakeEntity = FlowActionAwakeEntity;
//# sourceMappingURL=FlowActionAwakeEntity.js.map
