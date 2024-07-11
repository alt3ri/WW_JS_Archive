"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const GuaranteeActionCenter_1 = require("./GuaranteeActionCenter");
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
        const n = r.Name;
        const o =
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
    let e =
      ModelManager_1.ModelManager.LevelGeneralModel?.RemoveSceneGuaranteeActionInfos();
    ModelManager_1.ModelManager.LevelGeneralModel?.ClearTreeGuaranteeActionInfosMap(),
      e &&
        e.length > 0 &&
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
    let t =
      ModelManager_1.ModelManager.LevelGeneralModel?.RemoveTreeGuaranteeActionInfos(
        e,
      );
    t &&
      t.length > 0 &&
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
    if (n && n.Type !== 7 && r && r.Name) {
      const a =
        GuaranteeActionCenter_1.GuaranteeActionCenter.GetActionFilterMode(
          r.Name,
        );
      const _ = ModelManager_1.ModelManager.LevelGeneralModel;
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
// # sourceMappingURL=GuaranteeController.js.map
