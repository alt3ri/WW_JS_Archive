"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ControlScreenController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  InputController_1 = require("../../Input/InputController"),
  InputEnums_1 = require("../../Input/InputEnums"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager"),
  BattleUiControl_1 = require("../BattleUi/BattleUiControl"),
  ControlScreenDefine_1 = require("./ControlScreenDefine");
class ControlScreenController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUpdateSceneTeam,
      this.OnFormationLoadCompleted,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.OnChangeRole,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleGoDown,
        this.OnRoleGoDown,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      ),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.Eqt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUpdateSceneTeam,
      this.OnFormationLoadCompleted,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.OnChangeRole,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleGoDown,
        this.OnRoleGoDown,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      ),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.Eqt,
      );
  }
  static Mgt(e, n) {
    var t,
      r,
      o,
      i = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(n);
    i &&
      ((t = ModelManager_1.ModelManager.ControlScreenModel),
      e
        ? ((r = (e = i.GetPointerEventData()).enterComponent),
          (o = e.pressComponent),
          i.IsTouchEmpty() ||
          i.IsTouchComponentContainTag(ControlScreenDefine_1.ignoreTag)
            ? (t.AddTouchEmptyFingerData(i),
              t.IsDoubleTouch(n) &&
                t.IsDoubleTouchResetCameraComponent(
                  i,
                  ControlScreenDefine_1.resetCameraTag,
                ) &&
                BattleUiControl_1.BattleUiControl.ResetFocus(),
              t.SetCurrentTouchTimeStamp(
                TimeUtil_1.TimeUtil.GetServerTimeStamp(),
              ),
              t.SetCurrentTouchId(n),
              t.SetCurrentEnterComponent(r),
              t.SetCurrentPressComponent(o))
            : ((n = i.GetFingerIndex()),
              e
                ? ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Input",
                    8,
                    "[InputLog][InputController]当开始触摸时，手指没有触摸在空白部分",
                    ["fingerIndex", n],
                    ["enterComponent", r?.GetOwner()?.GetName()],
                    ["fingerIndex", o?.GetOwner()?.GetName()],
                  )
                : ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Input",
                    8,
                    "[InputLog][InputController]当开始触摸时，PointerEventData不存在",
                    ["fingerIndex", n],
                  )))
        : t.RemoveTouchEmptyFingerData(i));
  }
  static Egt(e) {
    var n = ModelManager_1.ModelManager.ControlScreenModel;
    switch (n.GetTouchEmptyFingerDataCount()) {
      case 1:
        this.RefreshCameraRotation(e);
        break;
      case 2:
        var t = n.GetTouchEmptyFingerDataByCount(2),
          r = t[0],
          t = t[1],
          r = r.GetFingerIndex(),
          t = t.GetFingerIndex();
        this.RefreshCameraSpringLength(r, t);
    }
  }
  static RefreshCameraRotation(e) {
    var n;
    return ControlScreenController.Sqt()
      ? (n = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e))
        ? n.IsInTouch()
          ? ModelManager_1.ModelManager.ControlScreenModel.IsTouchEmpty(e)
            ? (this.ExecuteCameraRotation(e), !0)
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Input",
                  8,
                  "[InputLog][InputController]尝试旋转镜头失败，失败原因，对应手指开始触摸时，没有触摸在空白部分",
                  ["fingerIndex", e],
                ),
              !1)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Input",
                8,
                "[InputLog][InputController]尝试旋转镜头失败，失败原因，对应手指触摸数据没有触摸",
                ["fingerIndex", e],
              ),
            !1)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Input",
              8,
              "[InputLog][InputController]尝试旋转镜头失败，失败原因，找不到对应手指触摸数据",
              ["fingerIndex", e],
            ),
          !1)
      : (ModelManager_1.ModelManager.BattleUiModel.IsOpenJoystickLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Input",
            8,
            "[InputLog][InputController]尝试旋转镜头失败，失败原因，当前状态不允许控制摄像机",
          ),
        !1);
  }
  static RefreshCameraSpringLength(e, n) {
    return (
      !!ControlScreenController.yqt() && (this.ExecuteCameraZoom(e, n), !0)
    );
  }
  static ExecuteCameraRotation(e) {
    var e = TouchFingerManager_1.TouchFingerManager.GetFingerDirection(e),
      n =
        ModelManager_1.ModelManager.ControlScreenModel.GetRotationScreenRate(),
      t = e.X * n,
      e = e.Y * n;
    InputController_1.InputController.InputAxis(
      InputEnums_1.EInputAxis.Turn,
      t,
    ),
      InputController_1.InputController.InputAxis(
        InputEnums_1.EInputAxis.LookUp,
        e,
      );
  }
  static ExecuteCameraZoom(e, n) {
    var t = ModelManager_1.ModelManager.ControlScreenModel,
      e = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        e,
        n,
      ),
      n = MathUtils_1.MathUtils.RangeClamp(
        e,
        t.MinTouchMoveDifference,
        t.MaxTouchMoveDifference,
        t.MinTouchMoveValue,
        t.MaxTouchMoveValue,
      );
    InputController_1.InputController.InputAxis(
      InputEnums_1.EInputAxis.Zoom,
      n,
    );
  }
  static Iqt(e) {
    var n = e.Id;
    this.Tqt !== n &&
      ((this.Tqt = n), e) &&
      !EventSystem_1.EventSystem.HasWithTarget(
        e,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        ControlScreenController.OnCharCameraStateChanged,
      ) &&
      EventSystem_1.EventSystem.AddWithTarget(
        e,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        ControlScreenController.OnCharCameraStateChanged,
      );
  }
  static Lqt(e) {
    EventSystem_1.EventSystem.HasWithTarget(
      e.Entity,
      EventDefine_1.EEventName.CharOnDirectionStateChanged,
      ControlScreenController.OnCharCameraStateChanged,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        e.Entity,
        EventDefine_1.EEventName.CharOnDirectionStateChanged,
        ControlScreenController.OnCharCameraStateChanged,
      );
  }
  static Sqt() {
    return InputDistributeController_1.InputDistributeController.IsAllowFightCameraRotationInput();
  }
  static yqt() {
    return InputDistributeController_1.InputDistributeController.IsAllowFightCameraZoomInput();
  }
}
((exports.ControlScreenController = ControlScreenController).Eqt = (e, n) => {
  var n = n.TouchType,
    t = Number(e);
  switch (n) {
    case 0:
      ControlScreenController.Mgt(!0, t);
      break;
    case 1:
      ControlScreenController.Mgt(!1, t);
      break;
    case 2:
      ControlScreenController.Egt(t);
  }
}),
  (ControlScreenController.OnFormationLoadCompleted = () => {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e &&
      (ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate(),
      ControlScreenController.Iqt(e.Entity));
  }),
  (ControlScreenController.OnChangeRole = () => {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e &&
      (ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate(),
      ControlScreenController.Iqt(e.Entity));
  }),
  (ControlScreenController.OnRoleGoDown = (e) => {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    e && ControlScreenController.Lqt(e);
  }),
  (ControlScreenController.OnRemoveEntity = (e, n) => {
    var t = n.Entity.GetComponent(0);
    t?.Valid &&
      t.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player &&
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t.GetPlayerId() &&
      ControlScreenController.Lqt(n);
  }),
  (ControlScreenController.OnCharCameraStateChanged = (e, n) => {
    n !== e &&
      ModelManager_1.ModelManager.ControlScreenModel.RefreshRotationScreenRate();
  });
//# sourceMappingURL=ControlScreenController.js.map
