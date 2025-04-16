"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceGameplayModeController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager");
class InstanceGameplayModeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      !0
    );
  }
  static OnChangeMode() {
    return this.st1(), !0;
  }
  static OnLeaveLevel() {
    return this.st1(), !0;
  }
  static st1() {
    1 ===
      ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode &&
      this.at1(),
      (ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode = 0),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CreateEntity,
          this.Jpe,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        );
  }
  static ht1(e, t) {
    0 !==
      (ModelManager_1.ModelManager.InstanceGameplayModeModel.DefaultCameraMode =
        e) &&
      1 === e &&
      this.lt1(t);
  }
  static lt1(e) {
    ModelManager_1.ModelManager.CameraModel.CreateFreeCamera(),
      ModelManager_1.ModelManager.CameraModel.FreeCamera.LogicComponent.InitConfig(
        e,
      ),
      ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(5);
  }
  static at1() {
    ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(5),
      ModelManager_1.ModelManager.CameraModel.DestroyFreeCamera();
  }
  static DisableAllPlayerRole() {
    var e,
      t,
      n = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (n)
      for (const r of n)
        r.Valid &&
          r.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player &&
          (e = r.Entity) &&
          ((t = r.CreatureDataId),
          e.DisableByKey(5, !0),
          ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.add(
            t,
          ));
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.CreateEntity,
      this.Jpe,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        );
  }
}
(exports.InstanceGameplayModeController = InstanceGameplayModeController),
  ((_a = InstanceGameplayModeController).nye = () => {
    var e =
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.GameplayMode ??
      0;
    e <= 0 ||
      ((e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetGameplayModeConfig(
          e,
        )) &&
        (e.DisableAllPlayerRole && _a.DisableAllPlayerRole(),
        _a.ht1(e.DefaultCameraMode, e.CameraParams)));
  }),
  (InstanceGameplayModeController.Jpe = (e, t) => {
    var n;
    t.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player &&
      (n = t.Entity)?.Valid &&
      (n.DisableByKey(5, !0),
      ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.add(
        t.CreatureDataId,
      ));
  }),
  (InstanceGameplayModeController.zpe = (e, t) => {
    t.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player &&
      ModelManager_1.ModelManager.InstanceGameplayModeModel.DisabledCreatureSet.delete(
        t.CreatureDataId,
      );
  });
//# sourceMappingURL=InstanceGameplayModeController.js.map
