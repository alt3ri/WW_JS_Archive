"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTimeDilation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Game/Manager/ModelManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiConfig_1 = require("../Define/UiConfig");
class UiTimeDilation {
  static set GmSwitch(i) {
    UiTimeDilation.sjs = i;
  }
  static get GmSwitch() {
    return UiTimeDilation.sjs;
  }
  static get s1t() {
    return UiTimeDilation.ajs?.TimeDilation ?? 1;
  }
  static get hjs() {
    return UiTimeDilation.ajs?.ViewId ?? 0;
  }
  static get ljs() {
    return UiTimeDilation.ajs?.DebugName;
  }
  static get pLe() {
    return UiTimeDilation.ajs?.Reason ?? "UiTimeDilation";
  }
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenView,
      UiTimeDilation.Sur,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        UiTimeDilation.yur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
        UiTimeDilation.Iur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        UiTimeDilation.Iur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeMode,
        UiTimeDilation.Tur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
        UiTimeDilation.Lur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectSuccess,
        UiTimeDilation.Dur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSequenceCameraStatus,
        UiTimeDilation.Rur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterGameSuccess,
        UiTimeDilation.Dur,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        UiTimeDilation.NBn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFinishLoadingState,
        UiTimeDilation.kBn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
        UiTimeDilation._js,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LevelLoadingUnlockDilation,
        UiTimeDilation.ujs,
      );
  }
  static Destroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenView,
      UiTimeDilation.Sur,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        UiTimeDilation.yur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
        UiTimeDilation.Iur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        UiTimeDilation.Iur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeMode,
        UiTimeDilation.Tur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
        UiTimeDilation.Lur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectSuccess,
        UiTimeDilation.Dur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSequenceCameraStatus,
        UiTimeDilation.Rur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterGameSuccess,
        UiTimeDilation.Dur,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartLoadingState,
        UiTimeDilation.NBn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFinishLoadingState,
        UiTimeDilation.kBn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
        UiTimeDilation._js,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LevelLoadingUnlockDilation,
        UiTimeDilation.ujs,
      );
  }
  static Aur(i, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiTimeDilation",
        11,
        "输出外部调用时停原因",
        ["原因", e],
        ["是否触发真时停", i < MathUtils_1.MathUtils.KindaSmallNumber],
      );
  }
  static cjs(i) {
    (UiTimeDilation.Nur && 1 !== UiTimeDilation.Nur.TimeDilation) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiTimeDilation",
          11,
          "缓存数据添加",
          ["触发界面", i.DebugName],
          ["界面Id", i.ViewId],
        ),
      (UiTimeDilation.Nur = i));
  }
  static mjs(i) {
    return ModelManager_1.ModelManager.GameModeModel
      ? UiTimeDilation.qur()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "联机状态,不允许设置界面时停",
              ["触发界面", i.DebugName],
              ["界面Id", i.ViewId],
            ),
          !1)
        : (UiTimeDilation.Pur(i),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "界面时停设置",
              ["触发界面", i.DebugName],
              ["设置流速", i.TimeDilation],
              ["界面Id", i.ViewId],
            ),
          !0)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiTimeDilation",
            11,
            "GameModeModel不存在,不允许设置界面时停",
            ["触发界面", i.DebugName],
            ["界面Id", i.ViewId],
          ),
        !1);
  }
  static Pur(i) {
    var e = i.TimeDilation;
    (UiTimeDilation.ajs = 1 !== e ? i : void 0),
      UiTimeDilation.Aur(e, i.Reason),
      UiTimeDilation.wur
        ? ((UiTimeDilation.Bur = e < MathUtils_1.MathUtils.KindaSmallNumber),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "界面时停被更高级别时停影响，实际未生效",
            ))
        : UiTimeDilation.GmSwitch
          ? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
              e * UiTimeDilation.djs,
            )
          : e < MathUtils_1.MathUtils.KindaSmallNumber
            ? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
                !0,
                "UiTimeDilation",
              )
            : ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
                !1,
                "UiTimeDilation",
                e * UiTimeDilation.djs,
              );
  }
  static SetGameTimeDilation(i) {
    return (
      Net_1.Net.IsServerConnected() || UiTimeDilation.pur("ServerConnect"),
      UiTimeDilation.Gur()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "有需要等待设置时停的tag,不允许设置界面时停",
              ["触发界面", i.DebugName],
              ["界面Id", i.ViewId],
              ["Tag", UiTimeDilation.vur],
            ),
          UiTimeDilation.cjs(i),
          !1)
        : UiTimeDilation.mjs(i)
    );
  }
  static qur() {
    return ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }
  static SetTimeDilationHighLevel(i, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "UiTimeDilation",
        11,
        "设置高级别时停",
        ["时停参数", i],
        ["Reason", e],
      ),
      (UiTimeDilation.wur = !0),
      UiTimeDilation.GmSwitch
        ? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
            i,
          )
        : i < MathUtils_1.MathUtils.KindaSmallNumber
          ? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
              !0,
              e,
            )
          : ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
              !1,
              "UiTimeDilation",
              i,
            );
  }
  static ResetTimeDilationHighLevel(i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiTimeDilation", 11, "恢复高级别时停"),
      (UiTimeDilation.wur = !1),
      ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
        UiTimeDilation.Bur,
        "UiTimeDilation",
      );
    var e = UiTimeDilation.s1t;
    UiTimeDilation.GmSwitch
      ? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
          e,
        )
      : e < MathUtils_1.MathUtils.KindaSmallNumber
        ? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
            !1,
            i,
          )
        : ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
            !1,
            i,
            e,
          );
  }
  static Our() {
    var i;
    UiTimeDilation.Nur &&
      (UiTimeDilation.kur && UiTimeDilation.kur !== UiTimeDilation.Nur.ViewId
        ? (UiTimeDilation.Nur = void 0)
        : UiTimeDilation.SetGameTimeDilation(UiTimeDilation.Nur) &&
          ((UiTimeDilation.kur = UiTimeDilation.Nur.ViewId),
          (i = UiTimeDilation.Nur.DebugName),
          (UiTimeDilation.Nur = void 0),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "UiTimeDilation",
            11,
            "缓存数据设置成功",
            ["界面", i],
            ["界面Id", UiTimeDilation.kur],
          ));
  }
  static AddViewData(i, e) {
    i = UiConfig_1.UiConfig.TryGetViewInfo(i);
    i.TimeDilation < 1 &&
      (UiTimeDilation.Fur.push(e),
      UiTimeDilation.Vur.set(e, {
        ViewId: e,
        TimeDilation: i.TimeDilation,
        DebugName: i.Name,
        Reason: "UiTimeDilation",
      }));
  }
  static RemoveViewData(i) {
    UiTimeDilation.Vur.delete(i) &&
      ((i = UiTimeDilation.Fur.indexOf(i)), UiTimeDilation.Fur.splice(i, 1));
  }
  static SetNextViewTimeDilation() {
    var i,
      e = UiTimeDilation.Fur.shift();
    e &&
      ((i = UiTimeDilation.Vur.get(e)),
      UiTimeDilation.SetGameTimeDilation(i)) &&
      ((UiTimeDilation.kur = e), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "UiTimeDilation",
        11,
        "界面时停设置下个数据",
        ["界面", i?.DebugName],
        ["界面Id", e],
      );
  }
  static pur(i) {
    UiTimeDilation.vur.add(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiTimeDilation", 11, "添加等待设置时停的tag", [
          "Tag",
          i,
        ]),
      UiTimeDilation.ajs &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiTimeDilation",
            11,
            "目前存在界面正在时停中,缓存并且临时恢复",
            ["Tag", i],
          ),
        UiTimeDilation.cjs(UiTimeDilation.ajs),
        UiTimeDilation.mjs({
          ViewId: UiTimeDilation.ajs.ViewId,
          TimeDilation: 1,
          DebugName: UiTimeDilation.ajs.DebugName,
          Reason: UiTimeDilation.ajs.Reason,
        }));
  }
  static Mur(i) {
    UiTimeDilation.vur.delete(i) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("UiTimeDilation", 11, "删除等待设置时停的tag", ["Tag", i]),
      UiTimeDilation.Our();
  }
  static Gur() {
    return 0 < UiTimeDilation.vur.size;
  }
}
((exports.UiTimeDilation = UiTimeDilation).sjs = !1),
  (UiTimeDilation.kur = void 0),
  (UiTimeDilation.Bur = !1),
  (UiTimeDilation.wur = !1),
  (UiTimeDilation.Nur = void 0),
  (UiTimeDilation.ajs = void 0),
  (UiTimeDilation.Sur = (i, e) => {
    i &&
      (UiTimeDilation.AddViewData(i, e),
      UiTimeDilation.kur ||
        (1 !== (i = UiConfig_1.UiConfig.TryGetViewInfo(i)).TimeDilation &&
          UiTimeDilation.SetGameTimeDilation({
            ViewId: e,
            TimeDilation: i.TimeDilation,
            DebugName: i.Name,
            Reason: "UiTimeDilation",
          }) &&
          (UiTimeDilation.kur = e)));
  }),
  (UiTimeDilation.yur = (i, e) => {
    UiTimeDilation.RemoveViewData(e),
      UiTimeDilation.Nur?.ViewId === e
        ? ((UiTimeDilation.Nur = void 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "缓存的数据清除",
              ["恢复界面", i],
              ["界面Id", e],
            ),
          UiTimeDilation.kur === e && (UiTimeDilation.kur = void 0))
        : e === UiTimeDilation.kur &&
          UiTimeDilation.SetGameTimeDilation({
            ViewId: e,
            TimeDilation: 1,
            DebugName: i,
            Reason: "UiTimeDilation",
          }) &&
          ((UiTimeDilation.kur = void 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "UiTimeDilation",
              11,
              "界面时停恢复",
              ["恢复界面", i],
              ["界面Id", e],
            ),
          UiTimeDilation.SetNextViewTimeDilation());
  }),
  (UiTimeDilation.Iur = () => {
    !ModelManager_1.ModelManager.GameModeModel ||
      UiTimeDilation.qur() ||
      (Net_1.Net.IsServerConnected() && UiTimeDilation.Tur());
  }),
  (UiTimeDilation.Tur = () => {
    (UiTimeDilation.ajs = void 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiTimeDilation", 11, "时停强制重置为1"),
      UiTimeDilation.GmSwitch
        ? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
            1,
          )
        : ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
            !1,
            "UiTimeDilation",
            1,
          ),
      (UiTimeDilation.Nur = void 0),
      (UiTimeDilation.kur = void 0),
      (UiTimeDilation.Bur = !1);
  }),
  (UiTimeDilation.djs = 1),
  (UiTimeDilation.Lur = (i) => {
    UiTimeDilation.djs !== i &&
      ((UiTimeDilation.djs = i), 0 !== UiTimeDilation.s1t) &&
      ((i = UiTimeDilation.ajs ?? {
        ViewId: UiTimeDilation.hjs,
        TimeDilation: UiTimeDilation.s1t,
        DebugName: UiTimeDilation.ljs,
        Reason: UiTimeDilation.pLe,
      }),
      UiTimeDilation.Pur(i));
  }),
  (UiTimeDilation.Dur = () => {
    UiTimeDilation.Mur("ServerConnect");
  }),
  (UiTimeDilation.Rur = (i) => {
    i
      ? UiTimeDilation.pur("CameraSequence")
      : UiTimeDilation.Mur("CameraSequence");
  }),
  (UiTimeDilation.NBn = () => {
    UiTimeDilation.pur("Loading");
  }),
  (UiTimeDilation.kBn = () => {
    UiTimeDilation.Mur("Loading");
  }),
  (UiTimeDilation._js = () => {
    UiTimeDilation.pur("LevelLoading");
  }),
  (UiTimeDilation.ujs = () => {
    UiTimeDilation.Mur("LevelLoading");
  }),
  (UiTimeDilation.Fur = []),
  (UiTimeDilation.Vur = new Map()),
  (UiTimeDilation.vur = new Set());
//# sourceMappingURL=UiTimeDilation.js.map
