"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerfSightController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  CommonDefine_1 = require("../../Core/Define/CommonDefine"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  PerfSight_1 = require("../../Core/PerfSight/PerfSight"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  Global_1 = require("../Global"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CHECKTIMEGAP =
    CommonDefine_1.MILLIONSECOND_PER_SECOND *
    CommonDefine_1.SECOND_PER_MINUTE *
    5,
  BOSS_TYPE = 2;
class PerfSightController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (PerfSight_1.PerfSight.IsEnable) {
      var e = UE.KuroLauncherLibrary.GetAppVersion(),
        e =
          e +
          "_" +
          LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
            e,
          );
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Performance", 55, "当前母包_热更版本号", [
            "version",
            e,
          ]),
        Info_1.Info.IsPcOrGamepadPlatform())
      )
        PerfSight_1.PerfSight.SetPcAppVersion(e);
      else {
        if (!Info_1.Info.IsMobilePlatform()) return !0;
        PerfSight_1.PerfSight.SetVersionIden(e);
      }
      PerfSightController.sCe();
    }
    return !0;
  }
  static OnClear() {
    return (
      PerfSight_1.PerfSight.IsEnable &&
        (PerfSightController.aCe(),
        PerfSightController.StopRecord(),
        PerfSightController.RemoveTimer(),
        PerfSightController.Jla(),
        PerfSightController.STa()),
      super.OnClear()
    );
  }
  static kot() {
    PerfSightController.RemoveTimer(),
      PerfSightController.j3
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Performance",
            55,
            "PerfSightController.Timer不该有值,请检查",
          )
        : (PerfSightController.j3 = TimerSystem_1.RealTimeTimerSystem.Forever(
            PerfSightController.LHe,
            CHECKTIMEGAP,
            1,
            void 0,
            void 0,
            !1,
          ));
  }
  static RemoveTimer() {
    PerfSightController.j3 &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(PerfSightController.j3),
      (PerfSightController.j3 = void 0));
  }
  static STa() {
    if (0 < this.oWe.size) {
      for (const e of this.oWe) this.ETa(e, !1);
      this.oWe.clear();
    }
  }
  static zla() {
    PerfSightController.Jla(),
      PerfSightController.Zla
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Performance",
            55,
            "PerfSightController.PositionTimer,请检查",
          )
        : (PerfSightController.Zla = TimerSystem_1.RealTimeTimerSystem.Forever(
            PerfSightController.e1a,
            CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ));
  }
  static Jla() {
    PerfSightController.Zla &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(PerfSightController.Zla),
      (PerfSightController.Zla = void 0));
  }
  static StartRecord(e) {
    PerfSightController.IsRecording
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Performance", 55, "正在录制, 本次StartRecord无效")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Performance", 55, "开始录制MarkLevelLoad", [
            "tagName",
            e,
          ]),
        (PerfSightController.IsRecording = !0),
        PerfSight_1.PerfSight.MarkLevelLoad(e));
  }
  static StopRecord() {
    PerfSightController.IsRecording &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "停止录制MarkLevelFin"),
      (PerfSightController.IsRecording = !1),
      PerfSight_1.PerfSight.MarkLevelFin());
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      PerfSightController.Wvi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        PerfSightController.FWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        PerfSightController.Ilt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        PerfSightController.Zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroAdd,
        this.lWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.cWe,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      PerfSightController.Wvi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        PerfSightController.FWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        PerfSightController.Ilt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        PerfSightController.Zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroAdd,
        this.lWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.cWe,
      );
  }
  static StartPersistentOrDungeon(e = !0) {
    var r;
    PerfSightController.StopRecord(),
      PerfSightController.RemoveTimer(),
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? ((r =
            "Dungeon_" +
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
          PerfSightController.StartRecord(r))
        : (PerfSightController.StartRecord("Persistent"),
          e && PerfSightController.kot());
  }
  static MarkLevelLoadCompleted() {
    PerfSightController.IsRecording &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "MarkLevelLoadCompleted"),
      PerfSight_1.PerfSight.MarkLevelLoadCompleted());
  }
  static ETa(e, r) {
    var t,
      o = EntitySystem_1.EntitySystem.Get(e);
    o &&
      (o = o.GetComponent(3)?.CreatureData) &&
      (t = o.GetBaseInfo()) &&
      t.Category.MonsterMatchType >= BOSS_TYPE &&
      (r
        ? (cpp_1.FPerfSightHelper.BeginExtTagUtf8(
            `Battle_${o.GetModelConfig().描述}_` + o.GetPbDataId(),
          ),
          this.oWe.add(e))
        : (cpp_1.FPerfSightHelper.EndExtTagUtf8(
            `Battle_${o.GetModelConfig().描述}_` + o.GetPbDataId(),
          ),
          this.oWe.delete(e)));
  }
  static OnTick(e) {
    PerfSight_1.PerfSight.IsEnable &&
      PerfSight_1.PerfSight.PostFrame(e, Time_1.Time.Frame);
  }
}
(exports.PerfSightController = PerfSightController),
  ((_a = PerfSightController).IsTickEvenPausedInternal = !0),
  (PerfSightController.j3 = void 0),
  (PerfSightController.Zla = void 0),
  (PerfSightController.IsEnable = !0),
  (PerfSightController.IsRecording = !1),
  (PerfSightController.oWe = new Set()),
  (PerfSightController.MJ = void 0),
  (PerfSightController.LHe = () => {
    PerfSightController.StopRecord(),
      PerfSightController.StartRecord("Persistent");
  }),
  (PerfSightController.e1a = () => {
    var e =
      Global_1.Global.BaseCharacter?.CharacterActorComponent
        ?.ActorLocationProxy;
    e &&
      PerfSight_1.PerfSight.PostValueF3(
        "PositionAnalysis",
        "position",
        e.X,
        e.Y,
        e.Z,
        Time_1.Time.Frame,
      );
  }),
  (PerfSightController.Wvi = () => {
    var e = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
    PerfSight_1.PerfSight.SetUserId(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Performance", 55, "SetUserId", ["playerId", e]),
      PerfSightController.zla();
  }),
  (PerfSightController.Ilt = () => {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      PerfSightController.j3?.Valid() ||
      PerfSightController.kot();
  }),
  (PerfSightController.FWe = () => {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      PerfSightController.j3?.Valid() ||
      PerfSightController.kot();
  }),
  (PerfSightController.Zpe = (e) => {
    e
      ? PerfSight_1.PerfSight.BeginExtTag("Battle")
      : (PerfSight_1.PerfSight.EndExtTag("Battle"), _a.STa());
  }),
  (PerfSightController.lWe = (e) => {
    _a.ETa(e, !0);
  }),
  (PerfSightController.cWe = (e) => {
    _a.ETa(e, !1);
  });
//# sourceMappingURL=PerfSightController.js.map
