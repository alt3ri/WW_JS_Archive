"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatDebugController = void 0);
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ModelManager_1 = require("../Manager/ModelManager");
const LogSetting_1 = require("../Module/LogReport/LogSetting");
const CombatDebugHelper_1 = require("./CombatDebug/CombatDebugHelper");
const game = {};
const REFRESH_SERVER_INFO_PERIOD = 300;
class CombatDebugController extends ControllerBase_1.ControllerBase {
  static CombatInfo(t, e, o, ...r) {
    this.A5(0, t, e, o, r);
  }
  static CombatDebug(t, e, o, ...r) {
    Info_1.Info.IsBuildDevelopmentOrDebug && this.A5(1, t, e, o, r);
  }
  static CombatDebugEx(t, e, o, ...r) {
    this.DebugCombatInfo && this.A5(1, t, e, o, r);
  }
  static CombatWarn(t, e, o, ...r) {
    this.A5(2, t, e, o, r);
  }
  static CombatError(t, e, o, ...r) {
    this.A5(3, t, e, o, r);
  }
  static CombatErrorWithStack(t, e, o, r, ...i) {
    r instanceof Error
      ? this.A5(3, t, e, o, i, r)
      : this.A5(3, t, e, o, [...i, ["error", r]]);
  }
  static A5(t, e, o, r, i, a) {
    let s = 0;
    let n = "";
    let l = "";
    typeof o === "number"
      ? (s = o)
      : ((_ = o?.GetComponent(0)) &&
          ((s = _.GetCreatureDataId()),
          (n = Protocol_1.Aki.Protocol.HBs[_.GetEntityType()])),
        (_ = o?.GetComponent(3))?.Actor && (l = _.Actor.GetName()));
    let _;
    const g = `[${e}][EntityId:${s}:${n}:${l}] ` + r;
    switch (t) {
      case 0:
        Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, g, ...i);
        break;
      case 1:
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("CombatInfo", 15, g, ...i);
        break;
      case 2:
        Log_1.Log.CheckWarn() && Log_1.Log.Warn("CombatInfo", 15, g, ...i);
        break;
      case 3:
        a
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("CombatInfo", 15, g, a, ...i)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("CombatInfo", 15, g, ...i);
    }
  }
  static CombatInfoMessage(t, e, o) {
    this.DebugCombatInfo &&
      this.cCr.get(e) &&
      (o
        ? ((o = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.rkn)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.a4n)}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o))
        : ((o = `[Message][${t}][${e}]`),
          Log_1.Log.CheckInfo() && Log_1.Log.Info("CombatInfo", 15, o)));
  }
  static CombatContextInfoMessage(t, e, o) {
    this.DebugCombatInfo &&
      this.cCr.get(e) &&
      (o = o.r4n) &&
      ((t = `[Message][${t}][${e}][EntityId:${MathUtils_1.MathUtils.LongToBigInt(o.rkn)}][PlayerId:${MathUtils_1.MathUtils.LongToNumber(o.a4n)}][MessageId:${MathUtils_1.MathUtils.LongToBigInt(o.s4n)}][PreMessageId:${MathUtils_1.MathUtils.LongToBigInt(o.n4n)}]`),
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
            
`;
      const ret =
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

  static mCr() {
    let t;
    UE.ThinkingAnalytics.HasInstanceInitialized(9) ||
      ((t = new UE.CreateInstanceParam(
        9,
        this.dCr,
        this.CCr,
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
        LogSetting_1.EXIT_WAIT_TIME,
        LogSetting_1.MAX_PENDING_LOG,
        LogSetting_1.SEND_HTTP_TIMEOUT,
        !0,
      )),
      UE.ThinkingAnalytics.CreateSimpleInstance(t));
  }
  static DataReport(t, e) {
    Info_1.Info.IsBuildDevelopmentOrDebug &&
      (this.mCr(), cpp_1.FThinkingAnalyticsForPuerts.Track(t, e, 9));
  }
  static RefreshServerDebugInfo() {
    let t;
    !this.DebugEntityId ||
      !(t = EntitySystem_1.EntitySystem.Get(this.DebugEntityId)?.GetComponent(
        20,
      )) ||
      Time_1.Time.Now - this.u3t < REFRESH_SERVER_INFO_PERIOD ||
      ((this.u3t = Time_1.Time.Now), t?.ServerDebugInfoRequest());
  }
}
(exports.CombatDebugController = CombatDebugController),
  (CombatDebugController.DebugEntityId = 0),
  (CombatDebugController.DebugCombatInfo = !1),
  (CombatDebugController.ScriptHelper =
    new CombatDebugHelper_1.CombatScriptHelper()),
  (CombatDebugController.cCr = new Map([
    ["$2n", !0],
    ["X2n", !0],
    ["Y2n", !0],
    ["J2n", !0],
    ["z2n", !0],
    ["iNn", !0],
    ["rNn", !0],
    ["eNn", !0],
    ["tNn", !0],
    ["mNn", !0],
    ["Z2n", !0],
    ["FOn", !0],
    ["VOn", !0],
    ["HOn", !0],
    ["jOn", !0],
    ["WOn", !0],
    ["YOn", !0],
    ["ZOn", !0],
    ["$On", !0],
    ["XOn", !0],
    ["l2n", !0],
    ["KOn", !0],
    ["i2n", !0],
    ["zOn", !0],
    ["K2n", !0],
    ["lNn", !0],
    ["_Nn", !0],
    ["Q2n", !0],
    ["n2n", !0],
  ])),
  (CombatDebugController.CCr = "773a58b321b8462e8431e0b3010bb3d3"),
  (CombatDebugController.dCr = "https://ali-sh-datareceiver.kurogame.xyz"),
  (CombatDebugController.u3t = 0);
// # sourceMappingURL=CombatDebugController.js.map
