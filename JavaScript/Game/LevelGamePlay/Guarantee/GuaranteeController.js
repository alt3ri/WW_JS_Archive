"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine"),
  GuaranteeActionCenter_1 = require("./GuaranteeActionCenter");
class GuaranteeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddGuaranteeAction,
        this.rIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemGuaranteeAction,
        this.nIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.sIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.ExecSceneGuaranteeActions,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddGuaranteeAction,
        this.rIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemGuaranteeAction,
        this.nIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.sIe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.ExecSceneGuaranteeActions,
      ),
      !0
    );
  }
  static ExecuteActions(e, t) {
    if (t)
      for (const o of e) {
        var n = o.Name,
          r =
            GuaranteeActionCenter_1.GuaranteeActionCenter.GetGuaranteeAction(n);
        r &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              40,
              "执行保底行为：",
              ["actionName", n],
              ["ActionInfo", o],
            ),
          r.Execute(o, t));
      }
  }
}
(exports.GuaranteeController = GuaranteeController),
  ((_a = GuaranteeController).ExecSceneGuaranteeActions = () => {
    var e =
      ModelManager_1.ModelManager.LevelGeneralModel?.RemoveSceneGuaranteeActionInfos();
    ModelManager_1.ModelManager.LevelGeneralModel?.ClearTreeGuaranteeActionInfosMap(),
      e &&
        0 < e.length &&
        ((e = e.reverse()),
        _a.ExecuteActions(
          e,
          LevelGeneralContextDefine_1.GuaranteeContext.Create(),
        ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("LevelEvent", 40, "场景保底行为已全部完成", [
          "保底行为列表",
          e,
        ]);
  }),
  (GuaranteeController.sIe = (e) => {
    var t =
      ModelManager_1.ModelManager.LevelGeneralModel?.RemoveTreeGuaranteeActionInfos(
        e,
      );
    t &&
      0 < t.length &&
      ((t = t.reverse()).forEach((e) => {
        ModelManager_1.ModelManager.LevelGeneralModel.PopSceneGuaranteeActionInfo(
          e,
        );
      }),
      _a.ExecuteActions(
        t,
        LevelGeneralContextDefine_1.GuaranteeContext.Create(),
      ),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "LevelEvent",
        40,
        "树保底行为已全部完成",
        ["treeIncId", e],
        ["保底行为列表", t],
      );
  }),
  (GuaranteeController.rIe = (e, t, n, r = !1) => {
    _a.aIe(e, t, !0, n, r);
  }),
  (GuaranteeController.nIe = (e, t, n, r = !1) => {
    _a.aIe(e, t, !1, n, r);
  }),
  (GuaranteeController.aIe = (t, n, r, o, a) => {
    if (n && 7 !== n.Type && o && o.Name) {
      var _ = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(
          o.Name,
        ),
        i = ModelManager_1.ModelManager.LevelGeneralModel;
      let e = void 0;
      switch (n?.Type) {
        case 4:
          var l =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
          e = l?.TreeId;
          break;
        case 3:
          var l =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              n.LevelPlayId,
            );
          e = l?.TreeId;
          break;
        case 2:
          a &&
            ((l =
              ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()),
            (e = l?.TreeId));
          break;
        case 6:
          (n.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || a) &&
            (e = n.TreeIncId);
      }
      e &&
        e !== BigInt(0) &&
        (r
          ? i.HasTreeGuaranteeActionInfo(e, o, _) ||
            (i.AddTreeGuaranteeActionInfo(e, o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "添加行为树保底行为：" + o.Name,
                ["触发行为", t],
                ["ActionInfo", o],
                ["treeIncId", e],
              ))
          : (i.PopTreeGuaranteeActionInfo(e, o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "移除行为树保底行为：" + o.Name,
                ["触发行为", t],
                ["ActionInfo", o],
                ["treeIncId", e],
              ))),
        r
          ? i.HasSceneGuaranteeActionInfo(o, _) ||
            (i.AddSceneGuaranteeActionInfo(o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "添加场景保底行为：" + o.Name,
                ["触发行为", t],
                ["ActionInfo", o],
              ))
          : (i.PopSceneGuaranteeActionInfo(o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "移除场景保底行为：" + o.Name,
                ["触发行为", t],
                ["ActionInfo", o],
              ));
    }
  });
//# sourceMappingURL=GuaranteeController.js.map
