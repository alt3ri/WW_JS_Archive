"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventTriggerCameraShake = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  MAX_SHAKE_DURATION = CommonDefine_1.SECOND_PER_MINUTE;
class LevelEventTriggerCameraShake extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    if (e) {
      const l = e.CameraShakeConfig;
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e.CameraShakeBp + "_C",
        UE.Class,
        (e) => {
          var r, o;
          e?.IsValid() &&
            ((r = (0, puerts_1.$ref)(void 0)),
            UE.KuroStaticLibrary.GetCameraShakeInfo(e, r)
              ? 1 === (r = (0, puerts_1.$unref)(r)).Duration.Type ||
                r.Duration.Duration > MAX_SHAKE_DURATION
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    39,
                    "振荡类型为无限或时长过长，取消振荡",
                    ["时长类型", r.Duration.Type],
                    ["时长", r.Duration.Duration],
                    ["限制最大时长", MAX_SHAKE_DURATION],
                  )
                : "Constant" === l.Type
                  ? ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(
                      e,
                      ControllerHolder_1.ControllerHolder.CameraController.Model
                        .ShakeModify,
                    )
                  : "LinearOverRange" === l.Type &&
                    (r =
                      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                        l.CenterEntityId,
                      )) &&
                    ((o =
                      ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(
                        r,
                      )),
                    (r = r.Entity.GetComponent(0)),
                    (o = o?.ActorLocation ?? r.GetLocation()),
                    ControllerHolder_1.ControllerHolder.CameraController.PlayWorldCameraShake(
                      e,
                      o,
                      l.MinRange,
                      l.MaxRange,
                      0,
                      !1,
                    ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  39,
                  "振荡时长检测失败，取消振荡",
                  ["CameraShakeClass", e],
                ));
        },
      );
    }
  }
}
exports.LevelEventTriggerCameraShake = LevelEventTriggerCameraShake;
//# sourceMappingURL=LevelEventTriggerCameraShake.js.map
