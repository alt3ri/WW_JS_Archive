"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerNotifyAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActionTask_1 = require("../../../World/Task/ActionTask"),
  DelayTask_1 = require("../../../World/Task/DelayTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase");
class ServerNotifyAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.X$t = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        o
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                19,
                "行为树节点状态更新",
                ["树Id", o.TreeConfigId],
                ["节点Id", e.L5n],
                [
                  "节点状态",
                  GeneralLogicTreeDefine_1.btNodeStatusLogString[e.w6n],
                ],
              ),
            o.UpdateNodeState(0, e.L5n, e.w6n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", r],
            );
      }),
      (this.$$t = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        o
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Quest",
                19,
                "行为树节点进度更新",
                ["树Id", o.TreeConfigId],
                ["节点Id", e.L5n],
              ),
            o.UpdateNodeProgress(e.L5n, e.zfs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", r],
            );
      }),
      (this.Y$t = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        r
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                19,
                "行为树ChildQuest节点状态更新",
                ["树Id", r.TreeConfigId],
                ["节点Id", e.L5n],
                [
                  "ChildQuest子节点状态",
                  GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[
                    e.w6n
                  ],
                ],
              ),
            r.UpdateChildQuestNodeState(e.L5n, e.w6n, 0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", e.s9n],
            );
      }),
      (this.J$t = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        r
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GeneralLogicTree",
                19,
                "服务器通知客户端做回退准备",
                ["treeConfigId", r.TreeConfigId],
              ),
            r.PrepareRollback(e.xEs, e.wEs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知回退准备时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", e.s9n],
            );
      }),
      (this.z$t = (e) => {
        (e.bEs || e.BEs) &&
          ((e = new DelayTask_1.DelayTask(
            "OnBtRollbackStartNotify",
            void 0,
            () => (
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
                3,
                3,
              ),
              !0
            ),
          )),
          TaskSystem_1.TaskSystem.AddTask(e),
          TaskSystem_1.TaskSystem.Run());
      }),
      (this.Z$t = (e) => {
        var r,
          o,
          t = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          _ =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        _
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GeneralLogicTree", 19, "服务器通知行为树回退", [
                "treeConfigId",
                _.TreeConfigId,
              ]),
            (o = ModelManager_1.ModelManager.GeneralLogicTreeModel),
            (r = _.IsTracking()),
            o.RemoveBehaviorTree(t),
            (o = o.CreateBehaviorTree(e.qEs)),
            r &&
              (_.BtType === Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay
                ? ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(
                    0,
                  )
                : o.SetTrack(!0)),
            (e = new ActionTask_1.ActionTask(
              "OnRollbackInfoNotify",
              () => (
                ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                  3,
                ),
                !0
              ),
            )),
            TaskSystem_1.TaskSystem.AddTask(e),
            TaskSystem_1.TaskSystem.Run())
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "收到服务器回退通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
                ["treeId", t],
              ),
            ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
              3,
            ));
      }),
      (this.eYt = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        o
          ? o.UpdateOccupations(e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", r],
            );
      }),
      (this.iYt = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        o
          ? o.UpdateTimer(e.GEs)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", r],
            );
      }),
      (this.oYt = (e) => {
        var r = MathUtils_1.MathUtils.LongToBigInt(e.s9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              r,
            );
        o ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              32,
              "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", r],
            )),
          o.UpdateTreeVars(e);
      }),
      (this.rYt = (e) => {
        e = e.nEs;
        if (e && 0 !== e.length)
          for (const r of e)
            ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(
              r,
            );
      }),
      (this.nYt = (e) => {
        e = e.sEs;
        if (e && 0 !== e.length)
          for (const o of e) {
            var r = MathUtils_1.MathUtils.LongToBigInt(o);
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(
              r,
            );
          }
      }),
      (this.sYt = (e) => {
        (ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip = e.h2s),
          ModelManager_1.ModelManager.AutoRunModel.SetAutoRunMode(
            e.h2s ? "ServerControlledSkip" : "Disabled",
          ),
          ModelManager_1.ModelManager.AutoRunModel.SetAutoRunState(
            e.h2s ? "Running" : "Stopped",
          );
      }),
      (this.Z0a = (e) => {
        var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        (r && e.q5n !== r) ||
          ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            e.wLa,
          )).FunctionMap.set(1, () => {
            this.efa(0, e.T5n);
          }),
          r.FunctionMap.set(2, () => {
            this.efa(1, e.T5n);
          }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r));
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(11514, this.X$t),
      Net_1.Net.Register(11219, this.$$t),
      Net_1.Net.Register(26861, this.Y$t),
      Net_1.Net.Register(16518, this.J$t),
      Net_1.Net.Register(28010, this.z$t),
      Net_1.Net.Register(27466, this.Z$t),
      Net_1.Net.Register(8158, this.eYt),
      Net_1.Net.Register(22708, this.iYt),
      Net_1.Net.Register(17191, this.oYt),
      Net_1.Net.Register(8222, this.rYt),
      Net_1.Net.Register(28911, this.nYt),
      Net_1.Net.Register(5528, this.sYt),
      Net_1.Net.Register(8854, this.Z0a);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(11514),
      Net_1.Net.UnRegister(11219),
      Net_1.Net.UnRegister(26861),
      Net_1.Net.UnRegister(16518),
      Net_1.Net.UnRegister(27466),
      Net_1.Net.UnRegister(8158),
      Net_1.Net.UnRegister(22708),
      Net_1.Net.UnRegister(17191),
      Net_1.Net.UnRegister(8222),
      Net_1.Net.UnRegister(28911),
      Net_1.Net.UnRegister(5528),
      Net_1.Net.UnRegister(8854);
  }
  efa(e, r) {
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      o = Protocol_1.Aki.Protocol.nLa.create({ q5n: o, b7n: e, T5n: r });
    Net_1.Net.Call(23222, o, (e) => {
      e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          3852,
          void 0,
          !1,
        );
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map
