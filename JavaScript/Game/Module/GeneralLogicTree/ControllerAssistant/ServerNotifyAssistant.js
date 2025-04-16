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
  UiManager_1 = require("../../../Ui/UiManager"),
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
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        t
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                18,
                "行为树节点状态更新",
                ["树Id", t.TreeConfigId],
                ["节点Id", e.b5n],
                [
                  "节点状态",
                  GeneralLogicTreeDefine_1.btNodeStatusLogString[e.H6n],
                ],
              ),
            t.UpdateNodeState(0, e.b5n, e.H6n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "收到节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            );
      }),
      (this.$$t = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        t
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Quest",
                18,
                "行为树节点进度更新",
                ["树Id", t.TreeConfigId],
                ["节点Id", e.b5n],
              ),
            t.UpdateNodeProgress(e.b5n, e.nvs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "收到节点进度更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            );
      }),
      (this.Y$t = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        o
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Quest",
                18,
                "行为树ChildQuest节点状态更新",
                ["树Id", o.TreeConfigId],
                ["节点Id", e.b5n],
                [
                  "ChildQuest子节点状态",
                  GeneralLogicTreeDefine_1.btChildQuestNodeStatusLogString[
                    e.H6n
                  ],
                ],
              ),
            o.UpdateChildQuestNodeState(e.b5n, e.H6n, 0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "收到子任务节点状态更新协议时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", e.C9n],
            );
      }),
      (this.J$t = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          o =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        o
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GeneralLogicTree",
                18,
                "服务器通知客户端做回退准备",
                ["treeConfigId", o.TreeConfigId],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.GeneralLogicTreePrepareRollback,
              o.TreeConfigId,
            ),
            o.PrepareRollback(e.NEs, e.kEs))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
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
                2,
                3,
              ),
              !0
            ),
          )),
          TaskSystem_1.TaskSystem.AddTask(e),
          TaskSystem_1.TaskSystem.Run());
      }),
      (this.Z$t = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        if (t) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GeneralLogicTree", 18, "服务器通知行为树回退", [
              "treeConfigId",
              t.TreeConfigId,
            ]);
          var r = ModelManager_1.ModelManager.GeneralLogicTreeModel,
            i = t.IsTracking();
          t.ExecuteTreeGuaranteeActions(), r.RemoveBehaviorTree(o);
          const n = r.CreateBehaviorTree(e.$Es);
          i &&
            (t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay
              ? ModelManager_1.ModelManager.LevelPlayModel.SetTrackLevelPlayId(
                  0,
                )
              : n.SetTrack(!0));
          r = new ActionTask_1.ActionTask(
            "OnRollbackInfoNotify",
            () => (
              ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
                2,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.GeneralLogicTreePrepareRollbackFinish,
                n?.TreeConfigId ?? 0,
              ),
              !0
            ),
          );
          TaskSystem_1.TaskSystem.AddTask(r), TaskSystem_1.TaskSystem.Run();
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "收到服务器回退通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            ),
            ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
              2,
            );
      }),
      (this.Ahl = (e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnQuestRedDotStateChange,
          e.B5n,
        );
      }),
      (this.eYt = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        t
          ? t.UpdateOccupations(e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "收到服务器挂起通知时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            );
      }),
      (this.iYt = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        t
          ? t.UpdateTimer(e.HEs)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              18,
              "服务器通知更新定时器时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            );
      }),
      (this.oYt = (e) => {
        var o = MathUtils_1.MathUtils.LongToBigInt(e.C9n),
          t =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              o,
            );
        t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GeneralLogicTree",
              31,
              "服务器通知更新变量时：行为树不存在，1.检查本地配置是否正确 2.服务端检查协议下发顺序",
              ["treeId", o],
            )),
          t.UpdateTreeVars(e);
      }),
      (this.rYt = (e) => {
        e = e.cEs;
        if (e && 0 !== e.length)
          for (const o of e)
            ModelManager_1.ModelManager.GeneralLogicTreeModel.CreateBehaviorTree(
              o,
            );
      }),
      (this.nYt = (e) => {
        e = e.dEs;
        if (e && 0 !== e.length)
          for (const t of e) {
            var o = MathUtils_1.MathUtils.LongToBigInt(t);
            ModelManager_1.ModelManager.GeneralLogicTreeModel.RemoveBehaviorTree(
              o,
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
      (this.uMa = (e) => {
        var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        if (!o || e.W5n === o) {
          const r = e.K4s;
          if (r)
            switch (r.uS_) {
              case Protocol_1.Aki.Protocol.tw_.Proto_ActionOpenSystem:
                var t = r.dS_;
                t
                  ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      t.cS_,
                    )).FunctionMap.set(1, () => {
                      this.OpenSystemBoardResultRequest(0, r.w5n);
                    }),
                    t.FunctionMap.set(2, () => {
                      this.OpenSystemBoardResultRequest(1, r.w5n);
                    }),
                    ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(
                      t,
                    ))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "GeneralLogicTree",
                      18,
                      "ActionOpenSystemBoardNotify:打开带返回值的确认框时，服务端下发参数为空",
                    );
                break;
              case Protocol_1.Aki.Protocol.tw_.Proto_SoaringChallenge:
                t = r.mS_;
                if (!t)
                  return void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "GeneralLogicTree",
                      18,
                      "ActionOpenSystemBoardNotify:打开翱翔结算时，服务端下发参数为空",
                    )
                  );
                t = new GeneralLogicTreeDefine_1.FlySettlementViewParams(
                  t.SMs,
                  t.aS_,
                  t.hS_,
                  t.lS_,
                  ModelManager_1.ModelManager.GeneralLogicTreeModel.HistorySoarScore,
                  r.w5n,
                );
                UiManager_1.UiManager.OpenView("FlySettlementView", t);
                break;
              case Protocol_1.Aki.Protocol.tw_.Proto_FishingHandIn:
                t = r.fS_;
                if (!t)
                  return void (
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "GeneralLogicTree",
                      10,
                      "ActionOpenSystemBoardNotify:打开捕鱼交付界面时，服务端下发参数为空",
                    )
                  );
                ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardInteractView(
                  t._S_,
                  r.w5n,
                );
            }
        }
      });
  }
  OnDestroy() {}
  OnRegisterNetEvent() {
    Net_1.Net.Register(26656, this.X$t),
      Net_1.Net.Register(19745, this.$$t),
      Net_1.Net.Register(28791, this.Y$t),
      Net_1.Net.Register(20563, this.J$t),
      Net_1.Net.Register(22504, this.z$t),
      Net_1.Net.Register(27756, this.Z$t),
      Net_1.Net.Register(15093, this.eYt),
      Net_1.Net.Register(15832, this.iYt),
      Net_1.Net.Register(17892, this.oYt),
      Net_1.Net.Register(21878, this.rYt),
      Net_1.Net.Register(17084, this.nYt),
      Net_1.Net.Register(28119, this.sYt),
      Net_1.Net.Register(29102, this.uMa),
      Net_1.Net.Register(22212, this.Ahl);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26656),
      Net_1.Net.UnRegister(19745),
      Net_1.Net.UnRegister(28791),
      Net_1.Net.UnRegister(20563),
      Net_1.Net.UnRegister(27756),
      Net_1.Net.UnRegister(15093),
      Net_1.Net.UnRegister(15832),
      Net_1.Net.UnRegister(17892),
      Net_1.Net.UnRegister(21878),
      Net_1.Net.UnRegister(17084),
      Net_1.Net.UnRegister(28119),
      Net_1.Net.UnRegister(29102),
      Net_1.Net.UnRegister(22212);
  }
  OpenSystemBoardResultRequest(e, o) {
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      t = Protocol_1.Aki.Protocol.mm_.create({ W5n: t, j7n: e, w5n: o });
    Net_1.Net.Call(28032, t, (e) => {
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          20819,
          void 0,
          !1,
        );
    });
  }
}
exports.ServerNotifyAssistant = ServerNotifyAssistant;
//# sourceMappingURL=ServerNotifyAssistant.js.map
