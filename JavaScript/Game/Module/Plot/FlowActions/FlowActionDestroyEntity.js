"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionDestroyEntity = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  FlowActionUtils_1 = require("../Flow/FlowActionUtils"),
  FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionDestroyEntity extends FlowActionServerAction_1.FlowActionServerAction {
  constructor() {
    super(...arguments),
      (this.Task = void 0),
      (this.W$i = (e) => {
        this.Task = void 0;
        var o = this.ActionInfo.Params;
        e ||
          ControllerHolder_1.ControllerHolder.FlowController.LogError(
            "加载实体失败",
          );
        let t = !1;
        for (const l of o.EntityIds) {
          var i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l);
          if (i) {
            var r = i.Entity.GetComponent(0).GetPbEntityInitData(),
              n = i.Entity.GetComponent(131);
            let e = !1;
            r &&
              ((r = (0, IComponent_1.getComponent)(
                r?.ComponentsData,
                "SceneItemLifeCycleComponent",
              )),
              (e = Boolean(n && r?.DestroyStageConfig.PerformDuration))),
              e
                ? (LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(
                    l,
                  ),
                  n.HandleDestroyState())
                : ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    i.Entity,
                    !1,
                    "FlowActionDestroyEntity.OnEntityReady",
                  );
          } else
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("Plot", 26, "实体未下发，联系服务端检查配置", [
                "ids",
                l,
              ]),
              (t = !0);
        }
        t && this.RequestServerAction(!1),
          this.RecordAction(),
          this.FinishExecute(!0);
      });
  }
  OnExecute() {
    if (this.ActionInfo.Params) {
      var o = this.ActionInfo.Params;
      if (o.EntityIds?.length) {
        let e = !1;
        for (const t of o.EntityIds)
          FlowActionUtils_1.FlowActionUtils.CheckEntityInAoi(t) ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                26,
                "剧情中销毁实体过远，请检查配置",
                ["pbDataId", t],
                ["flow", this.Context.FormatId],
                ["id", this.ActionInfo.ActionId],
              ),
            (e = !0));
        e
          ? (this.RequestServerAction(!1), this.FinishExecute(!0))
          : (this.Task = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
              "FlowActionDestroyEntity.OnExecute",
              o.EntityIds,
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
  OnRollback(e, o) {
    for (const i of e.ActionInfo.Params.EntityIds) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i);
      t?.IsInit &&
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
          t.Entity,
          !0,
          "FlowActionAwakeEntity.OnRollback",
        );
    }
  }
}
exports.FlowActionDestroyEntity = FlowActionDestroyEntity;
//# sourceMappingURL=FlowActionDestroyEntity.js.map
