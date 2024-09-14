"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerNotifyAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
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
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        r
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                19,
                "行为树节点状态更新",
                ["树Id", r.TreeConfigId],
                ["节点Id", e.b5n],
                [
                  "节点状态",
                  GeneralLogicTreeDefine_1.btNodeStatusLogString[e.H6n],
                ],
              ),
            r.UpdateNodeState(0, e.b5n, e.H6n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", t],
            );
      }),
      (this.$$t = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        r
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Quest",
                19,
                "行为树节点进度更新",
                ["树Id", r.TreeConfigId],
                ["节点Id", e.b5n],
              ),
            r.UpdateNodeProgress(e.b5n, e.nvs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", t],
            );
      }),
      (this.Y$t = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        t
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                19,
                "行为树ChildQuest节点状态更新",
                ["树Id", t.TreeConfigId],
                ["节点Id", e.b5n],
                [
                  "ChildQuest子节点状态",
                  GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[
                    e.H6n
                  ],
                ],
              ),
            t.UpdateChildQuestNodeState(e.b5n, e.H6n, 0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", e.C9n],
            );
      }),
      (this.J$t = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        t
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GeneralLogicTree",
                19,
                "服务器通知客户端做回退准备",
                ["treeConfigId", t.TreeConfigId],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.GeneralLogicTreePrepareRollback,
              t.TreeConfigId,
            ),
            t.PrepareRollback(e.NEs, e.kEs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知回退准备时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", e.C9n],
            );
      }),
      (this.z$t = (e) => {
        (e.FEs || e.VEs) &&
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
        var t,
          r,
          o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          _ =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        _
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GeneralLogicTree", 19, "服务器通知行为树回退", [
                "treeConfigId",
                _.TreeConfigId,
              ]),
            (r = ModelManager_1.ModelManager.GeneralLogicTreeModel),
            (t = _.IsTracking()),
            _.ExecuteTreeGuaranteeActions(),
            r.RemoveBehaviorTree(o),
            (r = r.CreateBehaviorTree(e.$Es)),
            t &&
              (_.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay
                ? ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(
                    0,
                  )
                : r.SetTrack(!0)),
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
                ["treeId", o],
              ),
            ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
              3,
            ));
      }),
      (this.eYt = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        r
          ? r.UpdateOccupations(e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", t],
            );
      }),
      (this.iYt = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        r
          ? r.UpdateTimer(e.HEs)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              19,
              "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", t],
            );
      }),
      (this.oYt = (e) => {
        var t = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          r =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
        r ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              32,
              "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", t],
            )),
          r.UpdateTreeVars(e);
      }),
      (this.rYt = (e) => {
        e = e.cEs;
        if (e && 0 !== e.length)
          for (const t of e)
            ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(
              t,
            );
      }),
      (this.nYt = (e) => {
        e = e.dEs;
        if (e && 0 !== e.length)
          for (const r of e) {
            var t = MathUtils_1.MathUtils.LongToBigInt(r);
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(
              t,
            );
          }
      }),
      (this.sYt = (e) => {
        (ModelManager_1.ModelManager.AutoRunModel.ShouldFastSkip = e.C2s),
          ModelManager_1.ModelManager.AutoRunModel.SetAutoRunMode(
            e.C2s ? "ServerControlledSkip" : "Disabled",
          ),
          ModelManager_1.ModelManager.AutoRunModel.SetAutoRunState(
            e.C2s ? "Running" : "Stopped",
          );
      }),
      (this.SMa = (e) => {
        var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        (t && e.W5n !== t) ||
          ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
            e.pih,
          )).FunctionMap.set(1, () => {
            this.EMa(0, e.w5n);
          }),
          t.FunctionMap.set(2, () => {
            this.EMa(1, e.w5n);
          }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t));
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(19141, this.X$t),
      Net_1.Net.Register(29935, this.$$t),
      Net_1.Net.Register(24604, this.Y$t),
      Net_1.Net.Register(29392, this.J$t),
      Net_1.Net.Register(26363, this.z$t),
      Net_1.Net.Register(29325, this.Z$t),
      Net_1.Net.Register(18822, this.eYt),
      Net_1.Net.Register(25025, this.iYt),
      Net_1.Net.Register(15699, this.oYt),
      Net_1.Net.Register(23352, this.rYt),
      Net_1.Net.Register(27975, this.nYt),
      Net_1.Net.Register(15066, this.sYt),
      Net_1.Net.Register(23652, this.SMa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19141),
      Net_1.Net.UnRegister(29935),
      Net_1.Net.UnRegister(24604),
      Net_1.Net.UnRegister(29392),
      Net_1.Net.UnRegister(29325),
      Net_1.Net.UnRegister(18822),
      Net_1.Net.UnRegister(25025),
      Net_1.Net.UnRegister(15699),
      Net_1.Net.UnRegister(23352),
      Net_1.Net.UnRegister(27975),
      Net_1.Net.UnRegister(15066),
      Net_1.Net.UnRegister(23652);
  }
  EMa(e, t) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = Protocol_1.Aki.Protocol.Teh.create({ W5n: r, j7n: e, w5n: t });
    Net_1.Net.Call(19325, r, (e) => {
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          17882,
          void 0,
          !1,
        );
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map
