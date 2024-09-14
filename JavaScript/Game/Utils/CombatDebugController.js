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
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ThinkDataLaunchReporter_1 = require("../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
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
        ? ((o = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.F4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.Y8n)}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o))
        : ((o = `[Message][${t}][${e}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o)));
  }
  static CombatContextInfoMessage(t, e, o) {
    CombatLog_1.CombatLog.DebugCombatInfo &&
      this.lgr.get(e) &&
      (o = o.K8n) &&
      ((t = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.F4n)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.Y8n)}][MessageId:${MathUtils_1.MathUtils.LongToBigInt(o.$8n)}][PreMessageId:${MathUtils_1.MathUtils.LongToBigInt(o.X8n)}]`),
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
    ["P3n", !0],
    ["B3n", !0],
    ["w3n", !0],
    ["b3n", !0],
    ["q3n", !0],
    ["k3n", !0],
    ["F3n", !0],
    ["O3n", !0],
    ["N3n", !0],
    ["J3n", !0],
    ["G3n", !0],
    ["TFn", !0],
    ["LFn", !0],
    ["DFn", !0],
    ["AFn", !0],
    ["UFn", !0],
    ["wFn", !0],
    ["GFn", !0],
    ["PFn", !0],
    ["BFn", !0],
    ["QFn", !0],
    ["RFn", !0],
    ["kFn", !0],
    ["qFn", !0],
    ["R3n", !0],
    ["Q3n", !0],
    ["X3n", !0],
    ["x3n", !0],
    ["HFn", !0],
  ])),
  (CombatDebugController.cgr = "773a58b321b8462e8431e0b3010bb3d3"),
  (CombatDebugController.ugr = "https://ali-sh-datareceiver.kurogame.xyz"),
  (CombatDebugController.c4t = 0),
  (CombatDebugController.RYa = new Map());
//# sourceMappingURL=CombatDebugController.js.map
