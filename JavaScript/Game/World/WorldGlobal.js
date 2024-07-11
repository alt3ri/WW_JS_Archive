"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldGlobal =
    exports.ONE_METER_FOR_CENTIMETER =
    exports.ONE_SECOND_FOR_MILLISECOND =
    exports.RAY_DISTANCE =
      void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const SeamlessTravelController_1 = require("../Module/SeamlessTravel/SeamlessTravelController");
(exports.RAY_DISTANCE = 200),
  (exports.ONE_SECOND_FOR_MILLISECOND = 1e3),
  (exports.ONE_METER_FOR_CENTIMETER = 100);
class WorldGlobal {
  constructor() {}
  static Initialize() {
    (GlobalData_1.GlobalData.GameInstance.场景加载通知器 = UE.NewObject(
      UE.LoadMapNotify.StaticClass(),
      GlobalData_1.GlobalData.GameInstance,
    )),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear(),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginTravelLoadMap(
        (0, puerts_1.toManualReleaseDelegate)(WorldGlobal.ZMr),
      ),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginLoadMap(
        (0, puerts_1.toManualReleaseDelegate)(WorldGlobal.eSr),
      ),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindEndLoadMap(
        (0, puerts_1.toManualReleaseDelegate)(WorldGlobal.tSr),
      ),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindLoadStreamLevel(
        (0, puerts_1.toManualReleaseDelegate)(WorldGlobal.iSr),
      ),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindUnLoadStreamLevel(
        (0, puerts_1.toManualReleaseDelegate)(WorldGlobal.Kxn),
      );
  }
  static Clear() {
    (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.eSr),
      (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.ZMr),
      (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.tSr),
      (0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.iSr),
      GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear();
  }
  static LoadFromMap(o) {
    const a =
      ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(o);
    a
      ? this.OpenLevel(a.MapPath)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[WorldGlobal.LoadFromMap] 不存在Id:的AkiMapSourceConfig。",
          ["id", o],
        );
  }
  static OpenLevel(o) {
    (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
      SeamlessTravelController_1.SeamlessTravelController.StartTravel(o)) ||
      WorldGlobal.PlayerClientTravel(
        Global_1.Global.CharacterController,
        ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
      );
  }
  static PlayerClientTravel(o, a) {
    o.ClientTravel(a, 2, !0, void 0);
  }
  static ToUeInt32Array(o, a) {
    if ((a.Empty(), o)) for (const e of o) a.Add(e);
  }
  static ToUeInt64Array(o, a) {
    if ((a.Empty(), o)) for (const e of o) a.Add(e);
  }
  static ToUeFloatArray(o, a) {
    if ((a.Empty(), o)) for (const e of o) a.Add(e);
  }
  static ToUeStringArray(o, a) {
    if ((a.Empty(), o)) for (const e of o) a.Add(e);
  }
  static ToTsArray(a, e) {
    if (a) {
      const l = a.Num();
      e.length = l;
      for (let o = 0; o < l; ++o) e[o] = a.Get(o);
    } else e.length = 0;
  }
  static ResetArraySize(o, a, e) {
    for (; o.Num() > a; ) o.RemoveAt(o.Num() - 1);
    for (; o.Num() < a; ) o.Add(e);
  }
  static ResetTsArraySize(o, a, e) {
    for (; o.length > a; ) o.pop();
    for (; o.length < a; ) o.push(e);
  }
  static ToTsVector(o) {
    const a = Protocol_1.Aki.Protocol.VBs.create();
    return (a.X = o.X), (a.Y = o.Y), (a.Z = o.Z), a;
  }
  static ToUeVector(o) {
    return o ? new UE.Vector(o.X, o.Y, o.Z) : Vector_1.Vector.ZeroVector;
  }
  static ToTsRotator(o) {
    const a = Protocol_1.Aki.Protocol.iws.create();
    return (a.Pitch = o.Pitch), (a.Yaw = o.Yaw), (a.Roll = o.Roll), a;
  }
  static ToUeRotator(o) {
    return o ? new UE.Rotator(o.Pitch, o.Yaw, o.Roll) : new UE.Rotator();
  }
  static ToUeGameplayAttribute(o) {
    const a = new UE.GameplayAttributeData();
    return (
      void 0 !== o &&
        ((a.AttributeType = o.Ugs),
        (a.BaseValue = o.Pgs),
        (a.CurrentValue = o.NFn)),
      a
    );
  }
}
((exports.WorldGlobal = WorldGlobal).OnStatStart = () => {
  GlobalData_1.GlobalData.World &&
    !UE.KuroStaticLibrary.IsBuildShipping() &&
    (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Stat", 34, "STAT统计开启"),
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      "STAT STARTFILE",
    ));
}),
  (WorldGlobal.OnStatStop = () => {
    GlobalData_1.GlobalData.World &&
      !UE.KuroStaticLibrary.IsBuildShipping() &&
      (UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "STAT STOPFILE",
      ),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Stat", 34, "STAT统计结束");
  }),
  (WorldGlobal.ResetLoadTime = () => {
    GlobalData_1.GlobalData.World &&
      !UE.KuroStaticLibrary.IsBuildShipping() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Stat", 34, "重置LoadTime时长"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "LoadTimes.TestTime 0",
      ));
  }),
  (WorldGlobal.GetLoadTime = () => {
    return UE.KuroStaticLibrary.IsBuildShipping()
      ? 0
      : UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
          "LoadTimes.TestTime",
        );
  }),
  (WorldGlobal.LoadTimesCheckBegin = (o = "default") => {
    GlobalData_1.GlobalData.World &&
      !UE.KuroStaticLibrary.IsBuildShipping() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Stat", 34, "LoadTime统计开启：", ["groupName", o]),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "LoadTimes.TestSwitch 1",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "LoadTimes.DumpTest Start " + o,
      ));
  }),
  (WorldGlobal.LoadTimesCheckEnd = () => {
    GlobalData_1.GlobalData.World &&
      !UE.KuroStaticLibrary.IsBuildShipping() &&
      (UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "LoadTimes.DumpTest LOWTIME=-1",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "LoadTimes.TestSwitch 0",
      ),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Stat", 34, "LoadTime统计结束");
  }),
  (WorldGlobal.ZMr = (o) => {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTravelMap);
  }),
  (WorldGlobal.eSr = (o) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("World", 3, "地图开始加载", ["mapName", o]),
      ModelManager_1.ModelManager.GameModeModel.MapPath === o &&
        ControllerHolder_1.ControllerHolder.GameModeController.BeforeLoadMap();
  }),
  (WorldGlobal.tSr = (o) => {
    GlobalData_1.GlobalData.World?.IsValid()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("World", 3, "地图加载完成。", ["MapName", o]),
        ModelManager_1.ModelManager.GameModeModel.MapPath === o &&
          (ControllerHolder_1.ControllerHolder.GameModeController.AfterLoadMap(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EndTravelMap,
          )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("World", 3, "加载地图失败，因为World为空。", [
          "MapName",
          o,
        ]);
  }),
  (WorldGlobal.iSr = (o, a, e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 3, "LoadStream完成。", [
        "LevelName",
        a.toString(),
      ]),
      GlobalData_1.GlobalData.World?.IsValid() &&
        ControllerHolder_1.ControllerHolder.GameModeController.OnLoadSubLevel(
          o,
          a.toString(),
          e,
        );
  }),
  (WorldGlobal.Kxn = (o, a) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        3,
        "UnLoadStream完成。",
        ["LinkId", o],
        ["LevelName", a.toString()],
      ),
      GlobalData_1.GlobalData.World?.IsValid() &&
        ControllerHolder_1.ControllerHolder.GameModeController.OnUnLoadSubLevel(
          o,
          a.toString(),
        );
  });
// # sourceMappingURL=WorldGlobal.js.map
