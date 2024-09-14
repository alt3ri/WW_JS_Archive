"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionDestroyEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
  FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionDestroyEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.W$i = (t) => {
        this.Task = void 0;
        var e = this.ActionInfo.Params;
        t ||
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "加载实体失败",
          );
        let o = !1;
        for (const l of e.EntityIds) {
          var i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l);
          if (i) {
            var r = i.Entity.GetComponent(0).GetPbEntityInitData(),
              n = i.Entity.GetComponent(120);
            let t = !1;
            r &&
              ((r = (0, IComponent_1.getComponent)(
                r?.ComponentsData,
                "SceneItemLifeCycleComponent",
              )),
              (t = Boolean(n && r?.DestroyStageConfig.PerformDuration))),
              t
                ? (i.Entity.GetComponent(181)?.RemoveServerTagByIdLocal(
                    -1152559349,
                    "[SceneItemStateComponent]ForceHandleDestroyState",
                  ),
                  i.Entity.GetComponent(181)?.AddServerTagByIdLocal(
                    -1278190765,
                    "[SceneItemStateComponent]ForceHandleDestroyState",
                  ),
                  n.HandleDestroyState())
                : ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    i.Entity,
                    !1,
                    "FlowActionDestroyEntity.OnEntityReady",
                  );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 27, "实体未下发，联系服务端检查配置", [
                "ids",
                l,
              ]),
              (o = !0);
        }
        o && this.RequestServerAction(!1),
          this.RecordAction(),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      var e = this.ActionInfo.Params;
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
              this.W$i,
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
  OnRollback(t, e) {
    for (const i of t.ActionInfo.Params.EntityIds) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
      o?.IsInit &&
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          o.Entity,
          !0,
          "FlowActionAwakeEntity.OnRollback",
        );
    }
  }
}
exports.FlowActionDestroyEntity = FlowActionDestroyEntity;
//# sourceMappingURL=FlowActionDestroyEntity.js.map
