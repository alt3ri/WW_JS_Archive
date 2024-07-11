"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelConditionRegistry_1 = require("../../LevelGamePlay/LevelConditions/LevelConditionRegistry"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  GuidePrefabDefine_1 = require("./Views/GuidePrefabDefine");
class GuideController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(10149, this.vJt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(10149);
  }
  static MJt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e,
        o,
        t = i.AutoOpenCondition;
      t &&
        ((e = i.Id),
        ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e)) &&
        !GuideController.EJt.has(e) &&
        ((o = new LevelConditionRegistry_1.ConditionPassCallback(
          GuideController.SJt,
          [e],
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          t,
          o,
        ),
        GuideController.EJt.set(e, o));
    }
  }
  static yJt() {
    for (const i of ConfigManager_1.ConfigManager.GuideConfig.GetAllGroup()) {
      var e,
        o,
        t = i.AutoOpenCondition;
      t &&
        ((e = i.Id), (o = this.EJt.get(e))) &&
        (LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
          t,
          o,
        ),
        this.EJt.delete(e));
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GuideGroupOpening,
      this.IJt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.TJt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.LJt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBlackFadeScreenFinish,
        this.LJt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        this.LJt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GuideGroupOpening,
      this.IJt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.TJt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.LJt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBlackFadeScreenFinish,
        this.LJt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleSettlementStateChanged,
        this.LJt,
      ),
      this.yJt();
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "GuideTutorialView",
      GuideController.DJt,
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
    var t = ModelManager_1.ModelManager.GuideModel.TryGetGuideGroup(e);
    (ModelManager_1.ModelManager.GuideModel.IsGmInvoke = !1),
      t
        ? (t.IsFake = o)
          ? 0 !== t.StateMachine.CurrentState
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
    var e = Protocol_1.Aki.Protocol.oos.create();
    (e.c9n = o),
      Net_1.Net.Call(11984, e, (e) => {
        e?.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "引导请求服务端完成失败", ["组Id", o]),
          GuideController.RJt(o);
      });
  }
  static GmCleanGuideData() {
    ModelManager_1.ModelManager.GuideModel.GmResetAllGuideGroup(),
      GuideController.yJt(),
      GuideController.MJt();
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
  static TryFinishRunningGuides() {
    for (const e of ModelManager_1.ModelManager.GuideModel.GetRunningGroupIdList())
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Guide", 65, "停止当前引导: " + e),
        GuideController.TryFinishGuide(e);
  }
  static FinishGuideGm(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "引导GM命令请求完成", ["groupId", e]),
      ModelManager_1.ModelManager.GuideModel.CheckGuideInfoExist(e)
        ? GuideController.RJt(e)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "引导GM命令请求完成时错误, 当前引导数据不存在",
            ["引导Id", e],
          );
  }
  static RJt(e) {
    ModelManager_1.ModelManager.GuideModel.FinishGroup(e),
      GuideController.UJt(e),
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
      GuideController.AJt(e));
  }
  static AJt(e) {
    var o, t;
    GuideController.EJt.has(e) ||
      (ModelManager_1.ModelManager.GuideModel.CanGroupInvoke(e) &&
        (o =
          ConfigManager_1.ConfigManager.GuideConfig.GetGroup(
            e,
          ).AutoOpenCondition) &&
        ((t = new LevelConditionRegistry_1.ConditionPassCallback(
          GuideController.SJt,
          [e],
        )),
        LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
          o,
          t,
        ),
        GuideController.EJt.set(e, t)));
  }
  static UJt(e) {
    var o,
      t = GuideController.EJt.get(e);
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
      GuideController.EJt.delete(e));
  }
  static CheckAvailableWhenOnline(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (1 !== e) return !0;
    } else if (2 !== e) return !0;
    return !1;
  }
  static CheckHasNewTagInHookNameForShow(e) {
    return e.HookNameForShow.includes(GuidePrefabDefine_1.NEW_TAG);
  }
}
((exports.GuideController = GuideController).vJt = (e) => {
  e
    ? (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Guide",
          17,
          "初始化GuideTriggerNotify发来的数据, 服务端监听的打开条件通过，主动发一个引导组下来",
          ["groupId", e.c9n],
        ),
      (e = e.c9n),
      GuideController.TryStartGuide(e))
    : Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 17, "服务端发来的GuideTriggerNotify为空");
}),
  (GuideController.EJt = new Map()),
  (GuideController.SJt = (e) => {
    GuideController.TryStartGuide(e[0]);
  }),
  (GuideController.DJt = () =>
    !ModelManager_1.ModelManager.BattleUiModel.IsInBattleSettlement),
  (GuideController.IJt = (o, t) => {
    var e = Protocol_1.Aki.Protocol.ios.create();
    (e.c9n = o),
      Net_1.Net.Call(29377, e, (e) => {
        e?.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? (ModelManager_1.ModelManager.GuideModel.SwitchGroupState(o, 0),
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              4234,
              e.ivs,
            ))
          : t || ModelManager_1.ModelManager.GuideModel.SwitchGroupState(o, 2);
      });
  }),
  (GuideController.LJt = () => {
    ModelManager_1.ModelManager.GuideModel.ShowFailedOpenTutorialView();
  }),
  (GuideController.nye = () => {
    ModelManager_1.ModelManager.GuideModel.EnsureCurrentDungeonId();
  }),
  (GuideController.$Js = [20013]),
  (GuideController.FWe = () => {
    var e = ModelManager_1.ModelManager.GuideModel.CurrentGroupMap;
    if (e)
      for (const t of GuideController.$Js) {
        var o = e.get(t);
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
  (GuideController.TJt = () => {
    var e = Protocol_1.Aki.Protocol.eos.create();
    Net_1.Net.Call(28789, e, (e) => {
      if (e) {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "初始化GuideInfoNotify发来的数据", [
            "FinishedList",
            e.ZUs,
          ]);
        for (const o of e.ZUs)
          ModelManager_1.ModelManager.GuideModel.FinishGroup(o);
        GuideController.MJt();
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Guide", 17, "服务端发来的GuideInfoNotify为空");
    });
  }),
  (GuideController.XBo = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "控制器类型发生变更，引导组数据重置"),
      ModelManager_1.ModelManager.GuideModel.ClearAllGroup();
  });
//# sourceMappingURL=GuideController.js.map
