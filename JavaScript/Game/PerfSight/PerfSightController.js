"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerfSightController = void 0);
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const CommonDefine_1 = require("../../Core/Define/CommonDefine");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const NetInfo_1 = require("../../Core/Net/NetInfo");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const APP_ID_LOCAL = "688476493";
const APP_ID_GLOBAL = "424155224";
const CHECKTIMEGAP =
  CommonDefine_1.MILLIONSECOND_PER_SECOND *
  CommonDefine_1.SECOND_PER_MINUTE *
  5;
const DEBUG_LOG = !1;
class PerfSightController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (!super.OnInit())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Performance", 55, "PerfSightController OnInit失败"),
        !1
      );
    if (PerfSightController.IsEnable) {
      if (Info_1.Info.IsPlayInEditor)
        return !(PerfSightController.IsEnable = !1);
      DEBUG_LOG && UE.PerfSightHelper.EnableDebugMode();
      var e =
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "SdkArea",
        ) !== "CN";
      var e =
        (e
          ? UE.PerfSightHelper.SetPCServerURL("pc.perfsight.wetest.net")
          : UE.PerfSightHelper.SetPCServerURL("pc.perfsight.qq.com"),
        e
          ? UE.PerfSightHelper.InitContext(APP_ID_GLOBAL)
          : UE.PerfSightHelper.InitContext(APP_ID_LOCAL),
        UE.KuroLauncherLibrary.GetAppVersion());
      var e =
        e +
        "_" +
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
          e,
        );
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "当前母包_热更版本号", [
          "version",
          e,
        ]),
        UE.PerfSightHelper.SetPCAppVersion(e),
        PerfSightController.sCe();
    }
    return !0;
  }
  static OnClear() {
    return (
      PerfSightController.IsEnable &&
        (PerfSightController.aCe(),
        PerfSightController.k9s(),
        PerfSightController.p7e(),
        PerfSightController.F9s()),
      super.OnClear()
    );
  }
  static Tit() {
    PerfSightController.p7e(),
      PerfSightController.j3
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Performance",
            55,
            "PerfSightController.Timer不该有值,请检查",
          )
        : (PerfSightController.j3 = TimerSystem_1.TimerSystem.Forever(
            PerfSightController.c7e,
            CHECKTIMEGAP,
          ));
  }
  static p7e() {
    PerfSightController.j3 &&
      (TimerSystem_1.TimerSystem.Remove(PerfSightController.j3),
      (PerfSightController.j3 = void 0));
  }
  static V9s() {
    PerfSightController.F9s(),
      PerfSightController.H9s
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Performance",
            55,
            "PerfSightController.PositionTimer,请检查",
          )
        : (PerfSightController.H9s = TimerSystem_1.TimerSystem.Forever(
            PerfSightController.j9s,
            CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ));
  }
  static F9s() {
    PerfSightController.H9s &&
      (TimerSystem_1.TimerSystem.Remove(PerfSightController.H9s),
      (PerfSightController.H9s = void 0));
  }
  static mbn(e) {
    PerfSightController.IsRecording
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Performance", 55, "正在录制, 本次StartRecord无效")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Performance", 55, "开始录制MarkLevelLoad", [
            "tagName",
            e,
          ]),
        (PerfSightController.IsRecording = !0),
        UE.PerfSightHelper.MarkLevelLoad(e));
  }
  static k9s() {
    PerfSightController.IsRecording
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Performance", 55, "停止录制MarkLevelFin"),
        (PerfSightController.IsRecording = !1),
        UE.PerfSightHelper.MarkLevelFin())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Performance", 55, "当前未录制, 本次StopRecord无效");
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      PerfSightController.Wpi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        PerfSightController.N9s,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        PerfSightController.NUr,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      PerfSightController.Wpi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        PerfSightController.N9s,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        PerfSightController.NUr,
      );
  }
  static OnTick(e) {
    PerfSightController.IsEnable && UE.PerfSightHelper.PostFrame(e);
  }
}
((exports.PerfSightController = PerfSightController).j3 = void 0),
  (PerfSightController.H9s = void 0),
  (PerfSightController.IsEnable = !0),
  (PerfSightController.IsRecording = !1),
  (PerfSightController.MJ = void 0),
  (PerfSightController.c7e = () => {
    PerfSightController.k9s(), PerfSightController.mbn("Persistent");
  }),
  (PerfSightController.j9s = () => {
    const e =
      Global_1.Global.BaseCharacter?.CharacterActorComponent
        ?.ActorLocationProxy;
    e &&
      UE.PerfSightHelper.PostValueF3(
        "PositionAnalysis",
        "position",
        e.X,
        e.Y,
        e.Z,
      );
  }),
  (PerfSightController.Wpi = () => {
    const e = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
    UE.PerfSightHelper.SetUserId(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "SetUserId", ["playerId", e]),
      NetInfo_1.NetInfo.SetCallback(PerfSightController.W9s),
      PerfSightController.mbn("Persistent"),
      PerfSightController.Tit(),
      PerfSightController.V9s();
  }),
  (PerfSightController.N9s = () => {
    PerfSightController.k9s(), PerfSightController.p7e();
    const e =
      "Dungeon_" +
        ModelManager_1.ModelManager.InstanceDungeonModel?.GetInstanceId() ?? 0;
    PerfSightController.mbn(e);
  }),
  (PerfSightController.NUr = () => {
    PerfSightController.k9s(), PerfSightController.mbn("PersistentLevel");
  }),
  (PerfSightController.W9s = (e) => {
    PerfSightController.IsEnable && UE.PerfSightHelper.PostNetworkLatency(e);
  });
// # sourceMappingURL=PerfSightController.js.map
