"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraAnimationController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("./UiCameraAnimationManager");
class UiCameraAnimationController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenTabView,
        this.kUo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnViewLoadCompleted,
        this.FUo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.I$i,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.VUo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
        this.HUo,
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
        this.wke,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiSceneLoaded,
        this.jUo,
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.Initialize(),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenTabView,
        this.kUo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnViewLoadCompleted,
        this.FUo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.I$i,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.VUo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
        this.HUo,
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
        this.wke,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UiSceneLoaded,
        this.jUo,
      ),
      this.WUo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      !0
    );
  }
  static OnLeaveLevel() {
    return (
      this.WUo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      !0
    );
  }
  static KUo(e, a, i) {
    UiCameraAnimationManager_1.UiCameraAnimationManager.CanPushCameraHandle(
      a,
    ) &&
      (this.WUo(),
      (this.QUo = a),
      (this.XUo = i),
      (this.$Uo = TimerSystem_1.TimerSystem.Delay(this.YUo, e)));
  }
  static WUo() {
    TimerSystem_1.TimerSystem.Has(this.$Uo) &&
      (TimerSystem_1.TimerSystem.Remove(this.$Uo),
      (this.QUo = void 0),
      (this.XUo = void 0),
      (this.$Uo = void 0));
  }
}
(exports.UiCameraAnimationController = UiCameraAnimationController),
  ((_a = UiCameraAnimationController).QUo = ""),
  (UiCameraAnimationController.XUo = void 0),
  (UiCameraAnimationController.$Uo = void 0),
  (UiCameraAnimationController.PushCameraHandle = (e, a, i = !0) => {
    if (e === "BattleView") {
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
      let n =
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
        n > 0
          ? UiCameraAnimationController.KUo(n, e, a)
          : (UiCameraAnimationController.WUo(),
            UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
              e,
              a,
              i,
            )));
    }
  }),
  (UiCameraAnimationController.kUo = (e) => {
    let a =
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
      a > 0
        ? UiCameraAnimationController.KUo(a, e)
        : (UiCameraAnimationController.WUo(),
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
            e,
          )));
  }),
  (UiCameraAnimationController.PopCameraHandle = (e, a, i, n = !0) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("CameraAnimation", 8, "当隐藏界面时", ["viewName", e]),
      UiCameraAnimationController.WUo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandleByCloseView(
        e,
        a?.Name,
        i,
        n,
      );
  }),
  (UiCameraAnimationController.FUo = (e) => {
    const a =
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
  (UiCameraAnimationController.YUo = () => {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByOpenView(
      UiCameraAnimationController.QUo,
      _a.XUo,
    ),
      UiCameraAnimationController.WUo();
  }),
  (UiCameraAnimationController.I$i = () => {
    UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay();
  }),
  (UiCameraAnimationController.VUo = () => {
    UiCameraAnimationController.WUo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      CameraController_1.CameraController.ExitCameraMode(2);
  }),
  (UiCameraAnimationController.JDe = () => {
    UiCameraAnimationController.WUo();
  }),
  (UiCameraAnimationController.HUo = () => {
    UiCameraAnimationController.WUo(),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ClearDisplay(),
      CameraController_1.CameraController.ExitCameraMode(2);
  }),
  (UiCameraAnimationController.zpe = (e, a) => {
    const i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    i &&
      a.Id === i.Id &&
      UiCameraAnimationManager_1.UiCameraAnimationManager.DeactivateCurrentCameraHandle();
  }),
  (UiCameraAnimationController.GUe = (e, a, i) => {
    const n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
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
  (UiCameraAnimationController.wke = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "当角色系统切换角色时,尝试重新激活镜头状态",
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
  }),
  (UiCameraAnimationController.jUo = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "CameraAnimation",
        8,
        "当Ui场景加载完成时,尝试重新激活镜头状态",
      ),
      UiCameraAnimationManager_1.UiCameraAnimationManager.ReactivateCameraHandle();
  });
// # sourceMappingURL=UiCameraAnimationController.js.map
