"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatDebugController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Time_1 = require("../../Core/Common/Time"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ThinkDataLaunchReporter_1 = require("../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatDebugHelper_1 = require("./CombatDebug/CombatDebugHelper"),
  CombatLog_1 = require("./CombatLog"),
  game = {},
  REFRESH_SERVER_INFO_PERIOD = 300;
class CombatDebugController extends ControllerBase_1.ControllerBase {
  static CombatInfo(t, e, o, ...r) {
    CombatLog_1.CombatLog.Info(t, e, o, ...r);
  }
  static CombatDebug(t, e, o) {}
  static CombatDebugEx(t, e, o) {}
  static CombatWarn(t, e, o, ...r) {
    CombatLog_1.CombatLog.Warn(t, e, o, ...r);
  }
  static CombatError(t, e, o, ...r) {
    CombatLog_1.CombatLog.Error(t, e, o, ...r);
  }
  static CombatErrorWithStack(t, e, o, r, ...a) {
    CombatLog_1.CombatLog.ErrorWithStack(t, e, o, r, ...a);
  }
  static CombatInfoMessage(t, e, o) {
    CombatLog_1.CombatLog.DebugCombatInfo &&
      this.lgr.get(e) &&
      (o
        ? ((o = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.P4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.F8n)}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o))
        : ((o = `[Message][${t}][${e}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o)));
  }
  static CombatContextInfoMessage(t, e, o) {
    CombatLog_1.CombatLog.DebugCombatInfo &&
      this.lgr.get(e) &&
      (o = o.G8n) &&
      ((t = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.P4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.F8n)}][MessageId:${MathUtils_1.MathUtils.LongToBigInt(o.k8n)}][PreMessageId:${MathUtils_1.MathUtils.LongToBigInt(o.N8n)}]`),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("CombatInfo", 51, t);
  }
  static FilterCmd(t) {
    return (
      CombatDebugController.ScriptHelper.Init(),
      CombatDebugController.ScriptHelper.FilterCmd(t)
    );
  }
  static EvalScript(script) {
    const filteredScript = CombatDebugController.FilterCmd(script);
    try {
      const preProcess = `
            const ModelManager = require('../Manager/ModelManager')?.ModelManager;
            const EntitySystem = require('../../Core/Entity/EntitySystem')?.EntitySystem;
            const EventSystem = require('../Common/Event/EventSystem')?.EventSystem;
            const EEventName = require('../Common/Event/EventDefine')?.EEventName;
            const isComponentInstance = require("../../Core/Entity/RegisterComponent").isComponentInstance
            const UE = require('ue');
            const CombatScriptHelper = this.ScriptHelper;
            const Log = require('../../Core/Common/Log')?.Log;
            const {ELogAuthor, ELogModule} = require('../../Core/Define/LogDefine') ?? {};
            const TimerSystem = require('../../Core/Timer/TimerSystem')?.TimerSystem;
            const FormationAttributeController = require("../Module/Abilities/FormationAttributeController").FormationAttributeController;
            
`,
        ret =
          (game,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Character", 20, "脚本执行...", [
              "代码",
              filteredScript,
            ]),
          String(eval(preProcess + filteredScript)));
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 20, "脚本执行执行完成", ["返回值", ret]),
        ret
      );
    } catch (error) {
      return error instanceof Error
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Editor",
              20,
              "脚本执行异常",
              error,
              ["err", error.name],
              ["msg", error.message],
            ),
          `${error.name}:${error.message}
` + error.stack)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("LocalStorage", 20, "脚本执行异常", [
              "error",
              error,
            ]),
          String(error));
    }
  }
  static _gr() {
    var t;
    UE.ThinkingAnalytics.HasInstanceInitialized(9) ||
      ((t = new UE.CreateInstanceParam(
        9,
        this.ugr,
        this.cgr,
        UE.ThinkingAnalytics.GetMachineID(),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString(),
        "CombatData",
        "",
        1e3,
        0,
        0,
        0,
        !0,
        !1,
        !1,
        !0,
        ThinkDataLaunchReporter_1.EXIT_WAIT_TIME,
        ThinkDataLaunchReporter_1.MAX_PENDING_LOG,
        ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT,
        !0,
        ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL,
        ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER,
      )),
      UE.ThinkingAnalytics.CreateSimpleInstance(t));
  }
  static DataReport(t, e) {
    ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS &&
      Info_1.Info.IsBuildDevelopmentOrDebug &&
      (this._gr(), cpp_1.FThinkingAnalyticsForPuerts.Track(t, e, 9));
  }
  static RefreshServerDebugInfo() {
    var t;
    !this.DebugEntityId ||
      !(t = EntitySystem_1.EntitySystem.Get(this.DebugEntityId)?.GetComponent(
        20,
      )) ||
      Time_1.Time.Now - this.c4t < REFRESH_SERVER_INFO_PERIOD ||
      ((this.c4t = Time_1.Time.Now), t?.ServerDebugInfoRequest());
  }
}
(exports.CombatDebugController = CombatDebugController),
  (CombatDebugController.DebugEntityId = 0),
  (CombatDebugController.ScriptHelper =
    new CombatDebugHelper_1.CombatScriptHelper()),
  (CombatDebugController.lgr = new Map([
    ["y3n", !0],
    ["I3n", !0],
    ["T3n", !0],
    ["L3n", !0],
    ["D3n", !0],
    ["x3n", !0],
    ["P3n", !0],
    ["U3n", !0],
    ["R3n", !0],
    ["V3n", !0],
    ["A3n", !0],
    ["gFn", !0],
    ["fFn", !0],
    ["pFn", !0],
    ["vFn", !0],
    ["MFn", !0],
    ["TFn", !0],
    ["AFn", !0],
    ["yFn", !0],
    ["IFn", !0],
    ["OFn", !0],
    ["SFn", !0],
    ["xFn", !0],
    ["DFn", !0],
    ["S3n", !0],
    ["O3n", !0],
    ["N3n", !0],
    ["E3n", !0],
    ["wFn", !0],
  ])),
  (CombatDebugController.cgr = "773a58b321b8462e8431e0b3010bb3d3"),
  (CombatDebugController.ugr = "https://ali-sh-datareceiver.kurogame.xyz"),
  (CombatDebugController.c4t = 0);
//# sourceMappingURL=CombatDebugController.js.map
