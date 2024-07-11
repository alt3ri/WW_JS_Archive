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
      for (const r of e) {
        var n = r.Name,
          o =
            GuaranteeActionCenter_1.GuaranteeActionCenter.GetGuaranteeAction(n);
        o &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelEvent",
              40,
              "执行保底行为：",
              ["actionName", n],
              ["ActionInfo", r],
            ),
          o.Execute(r, t));
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
  (GuaranteeController.rIe = (e, t, n) => {
    _a.aIe(e, t, !0, n);
  }),
  (GuaranteeController.nIe = (e, t, n) => {
    _a.aIe(e, t, !1, n);
  }),
  (GuaranteeController.aIe = (t, n, o, r) => {
    if (n && 7 !== n.Type && r && r.Name) {
      var a = GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(
          r.Name,
        ),
        _ = ModelManager_1.ModelManager.LevelGeneralModel;
      let e = void 0;
      switch (n?.Type) {
        case 4:
          var i =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();
          e = i?.TreeId;
          break;
        case 3:
          i =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              n.LevelPlayId,
            );
          e = i?.TreeId;
          break;
        case 6:
          n.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
            (e = n.TreeIncId);
      }
      e &&
        e !== BigInt(0) &&
        (o
          ? _.HasTreeGuaranteeActionInfo(e, r, a) ||
            (_.AddTreeGuaranteeActionInfo(e, r),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "添加行为树保底行为：" + r.Name,
                ["触发行为", t],
                ["ActionInfo", r],
                ["treeIncId", e],
              ))
          : (_.PopTreeGuaranteeActionInfo(e, r),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "移除行为树保底行为：" + r.Name,
                ["触发行为", t],
                ["ActionInfo", r],
                ["treeIncId", e],
              ))),
        o
          ? _.HasSceneGuaranteeActionInfo(r, a) ||
            (_.AddSceneGuaranteeActionInfo(r),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "添加场景保底行为：" + r.Name,
                ["触发行为", t],
                ["ActionInfo", r],
              ))
          : (_.PopSceneGuaranteeActionInfo(r),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelEvent",
                40,
                "移除场景保底行为：" + r.Name,
                ["触发行为", t],
                ["ActionInfo", r],
              ));
    }
  });
//# sourceMappingURL=GuaranteeController.js.map
