"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimationController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenTabView,
        this.GAo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewLoadCompleted,
        this.NAo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
        this.LMa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
        this.kAo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
        this.Y2e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiSceneLoaded,
        this.FAo,
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.Initialize(),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenTabView,
        this.GAo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewLoadCompleted,
        this.NAo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleAfterResetToBattleView,
        this.LMa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
        this.kAo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectedRoleChanged,
        this.Y2e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UiSceneLoaded,
        this.FAo,
      ),
      this.VAo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      !0
    );
  }
  static OnLeaveLevel() {
    return (
      this.VAo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      !0
    );
  }
  static HAo(e, a, i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.CanPushCameraHandle(
      a,
    ) &&
      (this.VAo(),
      (this.jAo = a),
      (this.WAo = i),
      (this.KAo = TimerSystem_1.TimerSystem.Delay(this.QAo, e)));
  }
  static VAo() {
    TimerSystem_1.TimerSystem.Has(this.KAo) &&
      (TimerSystem_1.TimerSystem.Remove(this.KAo),
      (this.jAo = void 0),
      (this.WAo = void 0),
      (this.KAo = void 0));
  }
}
(exports.UiCameraAnimationController = UiCameraAnimationController),
  ((_a = UiCameraAnimationController).jAo = ""),
  (UiCameraAnimationController.WAo = void 0),
  (UiCameraAnimationController.KAo = void 0),
  (UiCameraAnimationController.PushCameraHandle = (e, a, i = !0) => {
    if ("BattleView" === e) {
      if (UiCameraAnimationManager_1.UiCameraAnimationManager.IsActivate()) {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "CameraAnimation",
            8,
            "当打开主界面时，Ui镜头栈有未抛出的数据，检查是否没有关闭界面，或手动播放了Ui镜头但没有手动抛出",
          );
        for (const t of UiCameraAnimationManager_1.UiCameraAnimationManager.GetHandleDataStack())
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "CameraAnimation",
              8,
              "未抛出的Ui镜头数据",
              ["HandleName", t.HandleName],
              ["ViewName", t.ViewName],
            );
        UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
      }
    } else {
      var n =
        UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(
          e,
        );
      n &&
        ((n = n.GetUiCameraDelayTime()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "CameraAnimation",
            8,
            "当打开界面时",
            ["viewName", e],
            ["delayTime", n],
          ),
        0 < n
          ? UiCameraAnimationController.HAo(n, e, a)
          : (UiCameraAnimationController.VAo(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
              e,
              a,
              i,
            )));
    }
  }),
  (UiCameraAnimationController.GAo = (e) => {
    var a =
      UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(
        e,
      );
    a &&
      ((a = a.GetUiCameraDelayTime()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "当打开页签界面时",
          ["tabViewName", e],
          ["delayTime", a],
        ),
      0 < a
        ? UiCameraAnimationController.HAo(a, e)
        : (UiCameraAnimationController.VAo(),
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
            e,
          )));
  }),
  (UiCameraAnimationController.PopCameraHandle = (e, a, i, n = !0) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CameraAnimation", 8, "当隐藏界面时", ["viewName", e]),
      UiCameraAnimationController.VAo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandleByCloseView(
        e,
        a?.Name,
        i,
        n,
      );
  }),
  (UiCameraAnimationController.NAo = (e) => {
    var a =
      UiCameraAnimationManager_1.UiCameraAnimationManager.GetCurrentCameraHandle();
    a &&
      a.GetHandleData() &&
      a.GetIsActivate() &&
      a.GetViewName() === e &&
      a.IsViewInLoading &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "当界面加载完成时,重新激活镜头状态",
        ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle(
        !1,
        !0,
      ));
  }),
  (UiCameraAnimationController.QAo = () => {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
      UiCameraAnimationController.jAo,
      _a.WAo,
    ),
      UiCameraAnimationController.VAo();
  }),
  (UiCameraAnimationController.SYi = () => {
    UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
  }),
  (UiCameraAnimationController.LMa = () => {
    UiCameraAnimationController.VAo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      CameraController_1.CameraController.ExitCameraMode(2);
  }),
  (UiCameraAnimationController.JDe = () => {
    UiCameraAnimationController.VAo();
  }),
  (UiCameraAnimationController.kAo = () => {
    UiCameraAnimationController.VAo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      CameraController_1.CameraController.ExitCameraMode(2);
  }),
  (UiCameraAnimationController.zpe = (e, a) => {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    i &&
      a.Id === i.Id &&
      UiCameraAnimationManager_1.UiCameraAnimationManager.DeactivateCurrentCameraHandle();
  }),
  (UiCameraAnimationController.GUe = (e, a, i) => {
    var n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    n &&
      a.Id === n.Id &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "CameraAnimation",
          8,
          "当玩家角色添加实体时,重新激活镜头状态",
        ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle());
  }),
  (UiCameraAnimationController.Y2e = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "当角色系统切换角色时,尝试重新激活镜头状态",
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
  }),
  (UiCameraAnimationController.FAo = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "当Ui场景加载完成时,尝试重新激活镜头状态",
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
  });
//# sourceMappingURL=UiCameraAnimationController.js.map
