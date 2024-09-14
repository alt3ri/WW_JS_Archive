"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateSoftLock extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(t, e, a) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!CameraUtility_1.CameraUtility.CheckFormationControlState(
        ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId),
        !0,
        !0,
      ) &&
      (this.EnableSoftLock(t), !0)
    );
  }
  K2_NotifyTick(t, e, a) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !CameraUtility_1.CameraUtility.CheckFormationControlState(
        ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId),
        !0,
        !0,
      ) &&
      (this.DisableSoftLock(t), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default && (this.DisableSoftLock(t), !0)
    );
  }
  EnableSoftLock(t) {
    void 0 === TsAnimNotifyStateSoftLock.CacheMap.get(t) &&
      TsAnimNotifyStateSoftLock.CacheMap.set(
        t,
        ModelManager_1.ModelManager.CameraModel.EnableSoftLock(
          "TsAnimNotifyStateSoftLock Enable",
        ),
      );
  }
  DisableSoftLock(t) {
    var e = TsAnimNotifyStateSoftLock.CacheMap.get(t);
    void 0 !== e &&
      (ModelManager_1.ModelManager.CameraModel.DisableSoftLock(
        e,
        "TsAnimNotifyStateSoftLock Disable",
      ),
      TsAnimNotifyStateSoftLock.CacheMap.delete(t));
  }
  GetNotifyName() {
    return "开启镜头软锁";
  }
}
(TsAnimNotifyStateSoftLock.CacheMap = new Map()),
  (exports.default = TsAnimNotifyStateSoftLock);
//# sourceMappingURL=TsAnimNotifyStateSoftLock.js.map
