"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceManager = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  PerformanceModel_1 = require("../../../Core/Performance/PerformanceModel"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ThinkingAnalyticsReporter_1 = require("../LogReport/ThinkingAnalyticsReporter"),
  GamePlayerInfo_1 = require("./Data/GamePlayerInfo"),
  PerformanceCollectionData_1 = require("./Data/PerformanceCollectionData"),
  PerformanceConfig_1 = require("./PerformanceConfig");
class PerformanceManager {
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDone,
      PerformanceManager.Ao,
    );
  }
  static A4i() {
    PerformanceManager.h5i = TickSystem_1.TickSystem.Add(
      this.Tick,
      "PerformanceManager.Tick",
      2,
      !0,
    ).Id;
  }
  static l5i() {
    PerformanceManager.h5i &&
      (TickSystem_1.TickSystem.Remove(PerformanceManager.h5i),
      (PerformanceManager.h5i = void 0));
  }
  static Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      PerformanceManager.Ao,
    ),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (PerformanceController_1.PerformanceController.SetOpen(!1),
        PerformanceController_1.PerformanceController.SetHandle(void 0, void 0),
        PerformanceModel_1.PerformanceModel.Clear());
  }
  static _5i(e) {
    ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report("c4", e);
  }
  static ke() {
    return cpp_1.KuroTime.GetMilliseconds64();
  }
}
((exports.PerformanceManager = PerformanceManager).u5i = 0),
  (PerformanceManager.c5i = void 0),
  (PerformanceManager.m5i = 0),
  (PerformanceManager.h5i = void 0),
  (PerformanceManager.Ao = () => {
    Info_1.Info.IsBuildDevelopmentOrDebug
      ? (PerformanceController_1.PerformanceController.SetOpen(
          PerformanceConfig_1.IS_OPEN,
        ),
        PerformanceConfig_1.IS_OPEN
          ? (PerformanceController_1.PerformanceController.SetHandle(
              PerformanceManager.d5i,
              PerformanceManager.d5i,
            ),
            PerformanceManager.A4i())
          : (PerformanceController_1.PerformanceController.SetHandle(
              void 0,
              void 0,
            ),
            PerformanceManager.l5i()))
      : PerformanceController_1.PerformanceController.SetOpen(!1);
  }),
  (PerformanceManager.Tick = (e) => {
    if (e > PerformanceConfig_1.TICK_TIME_MAX)
      PerformanceModel_1.PerformanceModel.Clear();
    else if (
      (PerformanceController_1.PerformanceController.CollectionEngineInfo(),
      (PerformanceManager.u5i += e),
      !(PerformanceManager.u5i < PerformanceConfig_1.COLLECTION_INTERVAL_TIME))
    ) {
      var r,
        e = PerformanceController_1.PerformanceController.StartMonitor(
          "PerformanceManager.Tick",
        ),
        a =
          ((PerformanceManager.u5i = 0),
          PerformanceController_1.PerformanceController.CollectionLLMInfo(),
          new PerformanceCollectionData_1.PerformanceCollectionData()),
        n = PerformanceManager.ke(),
        o = new Array();
      for (const m of PerformanceModel_1.PerformanceModel.MonitorMap.values())
        m.HaveData() &&
          ((a.Name = m.GetName()),
          (r = ModelManager_1.ModelManager.AreaModel.AreaInfo),
          (a.AreaId = r ? r.AreaId : -1),
          (a.Max = m.Max),
          (a.Average = m.GetAverage()),
          (a.MaxInfo = m.GetMaxOverInfo()),
          a.MaxInfo && (a.PlayerId = a.MaxInfo.PlayerId),
          o.push(a));
      var c = { Data: o };
      PerformanceManager._5i(JSON.stringify(c)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Performance",
            10,
            "http发送一共耗时：",
            ["time", PerformanceManager.ke() - n],
            ["count", PerformanceModel_1.PerformanceModel.MonitorMap.size],
          ),
        PerformanceController_1.PerformanceController.EndMonitor(e),
        PerformanceModel_1.PerformanceModel.Clear();
    }
  }),
  (PerformanceManager.d5i = () => {
    var e, r;
    return (
      PerformanceManager.c5i ||
        (PerformanceManager.c5i = new GamePlayerInfo_1.GamePlayerInfo()),
      PerformanceManager.m5i !== Time_1.Time.Frame &&
        (((e = PerformanceManager.c5i).PlayerId =
          ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
        Global_1.Global.BaseCharacter
          ? ((r =
              Global_1.Global.BaseCharacter.CharacterActorComponent
                .ActorLocationProxy),
            (e.PlayerPosition = r.X + "," + r.Y + "," + r.Z),
            (r =
              ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
                160,
              )),
            (e.IsFight = !!r && r.IsInFightState()))
          : ((e.PlayerPosition = "undefined"), (e.IsFight = !1)),
        (r = ModelManager_1.ModelManager.CameraModel.CameraLocation),
        (e.CameraPosition = r.X + "," + r.Y + "," + r.Z),
        (r = ModelManager_1.ModelManager.CameraModel.CameraRotator),
        (e.CameraRotation = r.Pitch + "," + r.Yaw + "," + r.Roll),
        (e.EntityCount =
          ModelManager_1.ModelManager.CreatureModel.GetAllEntities().length),
        (e.ActorCount = UE.KuroStaticLibrary.GetActorCount()),
        (PerformanceManager.m5i = Time_1.Time.Frame)),
      PerformanceManager.c5i
    );
  });
//# sourceMappingURL=PerformanceManager.js.map
