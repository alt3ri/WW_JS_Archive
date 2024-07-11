"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelConditionRegistry_1 = require("../../LevelGamePlay/LevelConditions/LevelConditionRegistry");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class GuideController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(13151, this.vYt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(13151);
  }
  static MYt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e;
      var o;
      const t = i.AutoOpenCondition;
      t &&
        ((e = i.Id),
        ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e)) &&
        !GuideController.SYt.has(e) &&
        ((o = new LevelConditionRegistry_1.ConditionPassCallback(
          GuideController.EYt,
          [e],
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          t,
          o,
        ),
        GuideController.SYt.set(e, o));
    }
  }
  static yYt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e;
      var o;
      const t = i.AutoOpenCondition;
      t &&
        ((e = i.Id), (o = this.SYt.get(e))) &&
        (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          t,
          o,
        ),
        this.SYt.delete(e));
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GuideGroupOpening,
      this.IYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.TYt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.Uje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.LYt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBlackFadeScreenFinish,
        this.LYt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        this.LYt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GuideGroupOpening,
      this.IYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.TYt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.Uje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.LYt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBlackFadeScreenFinish,
        this.LYt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        this.LYt,
      ),
      this.yYt();
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "GuideTutorialView",
      GuideController.DYt,
      "GuideController.CanOpenTutorial",
    );
  }
  static InvokeGuideGroupByGm(e, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Guide",
        17,
        "通过GM指令调用引导组 ",
        ["groupId", e],
        ["是否触发服务端完成", !o],
      ),
      (ModelManager_1.ModelManager.GuideModel.IsGmInvoke = !0);
    const t = ModelManager_1.ModelManager.GuideModel.TryGetGuideGroup(e);
    (ModelManager_1.ModelManager.GuideModel.IsGmInvoke = !1),
      t
        ? (t.IsFake = o)
          ? t.StateMachine.CurrentState !== 0
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Guide",
                17,
                "(GM)引导组  正在执行中, 不再重复执行",
                ["group.Id", t.Id],
              )
            : t.SwitchState(2)
          : GuideController.TryStartGuide(e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "引导组  数据创建失败！", [
            "groupId",
            e,
          ]);
  }
  static FinishGuide(o) {
    const e = Protocol_1.Aki.Protocol._es.create();
    (e.P5n = o),
      Net_1.Net.Call(19247, e, (e) => {
        e?.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "引导请求服务端完成失败", ["组Id", o]),
          GuideController.RYt(o);
      });
  }
  static GmCleanGuideData() {
    ModelManager_1.ModelManager.GuideModel.GmResetAllGuideGroup(),
      GuideController.yYt(),
      GuideController.MYt();
  }
  static TryStartGuide(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "开始执行引导组", ["组Id", e]);
    e = ModelManager_1.ModelManager.GuideModel.TryGetGuideGroup(e);
    return !!e && (e.SwitchState(1), !0);
  }
  static TryFinishGuide(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Guide", 17, "引导外部请求完成", ["groupId", e]),
      !ModelManager_1.ModelManager.GuideModel.IsGroupFinished(e) &&
        (this.FinishGuide(e), !0)
    );
  }
  static FinishGuideGm(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "引导GM命令请求完成", ["groupId", e]),
      ModelManager_1.ModelManager.GuideModel.CheckGuideInfoExist(e)
        ? GuideController.RYt(e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "引导GM命令请求完成时错误, 当前引导数据不存在",
            ["引导Id", e],
          );
  }
  static RYt(e) {
    ModelManager_1.ModelManager.GuideModel.FinishGroup(e),
      GuideController.UYt(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GuideGroupFinished,
        e,
      );
  }
  static ResetFinishedGuide(e) {
    ModelManager_1.ModelManager.GuideModel.IsGroupFinished(e) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Guide", 54, "重置已完成引导", ["groupId", e]),
      ModelManager_1.ModelManager.GuideModel.ResetFinishedGuide(e),
      GuideController.AYt(e));
  }
  static AYt(e) {
    let o, t;
    GuideController.SYt.has(e) ||
      (ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e) &&
        (o =
          ConfigManager_1.ConfigManager.GuideConfig.GetGroup(
            e,
          ).AutoOpenCondition) &&
        ((t = new LevelConditionRegistry_1.ConditionPassCallback(
          GuideController.EYt,
          [e],
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          o,
          t,
        ),
        GuideController.SYt.set(e, t)));
  }
  static UYt(e) {
    let o;
    const t = GuideController.SYt.get(e);
    t &&
      !ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e) &&
      (o =
        ConfigManager_1.ConfigManager.GuideConfig.GetGroup(
          e,
        ).AutoOpenCondition) &&
      (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
        o,
        t,
      ),
      GuideController.SYt.delete(e));
  }
}
((exports.GuideController = GuideController).vYt = (e) => {
  e
    ? (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "初始化GuideTriggerNotify发来的数据, 服务端监听的打开条件通过，主动发一个引导组下来",
          ["groupId", e.P5n],
        ),
      (e = e.P5n),
      GuideController.TryStartGuide(e))
    : Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 17, "服务端发来的GuideTriggerNotify为空");
}),
  (GuideController.SYt = new Map()),
  (GuideController.EYt = (e) => {
    GuideController.TryStartGuide(e[0]);
  }),
  (GuideController.DYt = () =>
    !ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement),
  (GuideController.IYt = (o, t) => {
    const e = Protocol_1.Aki.Protocol.hes.create();
    (e.P5n = o),
      Net_1.Net.Call(20570, e, (e) => {
        e?.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? (ModelManager_1.ModelManager.GuideModel.SwitchGroupState(o, 0),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              24403,
              e.Fms,
            ))
          : t || ModelManager_1.ModelManager.GuideModel.SwitchGroupState(o, 2);
      });
  }),
  (GuideController.LYt = () => {
    ModelManager_1.ModelManager.GuideModel.ShowFailedOpenTutorialView();
  }),
  (GuideController.nye = () => {
    ModelManager_1.ModelManager.GuideModel.EnsureCurrentDungeonId(),
      ModelManager_1.ModelManager.GuideModel.SetLock(
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld(),
      );
  }),
  (GuideController.K8s = [20013]),
  (GuideController.Uje = () => {
    const e = ModelManager_1.ModelManager.GuideModel.CurrentGroupMap;
    if (e)
      for (const t of GuideController.K8s) {
        const o = e.get(t);
        o &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Guide",
              17,
              "引导组在场景加载完成（包括客户端加载和服务器交互确认）前被触发，强制终止引导",
              ["GuideGroupId", t],
            ),
          o.Break(),
          e.delete(t));
      }
  }),
  (GuideController.TYt = () => {
    const e = Protocol_1.Aki.Protocol.ses.create();
    Net_1.Net.Call(18828, e, (e) => {
      if (e) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "初始化GuideInfoNotify发来的数据", [
            "FinishedList",
            e.bRs,
          ]);
        for (const o of e.bRs)
          ModelManager_1.ModelManager.GuideModel.FinishGroup(o);
        GuideController.MYt();
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "服务端发来的GuideInfoNotify为空");
    });
  }),
  (GuideController.dKe = (e, o, t) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "控制器类型发生变更，引导组数据重置"),
      ModelManager_1.ModelManager.GuideModel.ClearAllGroup();
  });
// # sourceMappingURL=GuideController.js.map
