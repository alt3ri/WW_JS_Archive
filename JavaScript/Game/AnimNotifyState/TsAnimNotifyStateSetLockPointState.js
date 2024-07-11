"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyStateSetLockPointState extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.BoneName = ""),
      (this.SoftLockValid = !1),
      (this.HardLockValid = !1),
      (this.OldSoftLockValid = !1),
      (this.OldHardLockValid = !1);
  }
  K2_NotifyBegin(t, e, a) {
    let i;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t.CharacterActorComponent.LockOnParts.has(this.BoneName)
        ? ((i = t.CharacterActorComponent.LockOnParts.get(this.BoneName)),
          (this.OldSoftLockValid = i.SoftLockValid),
          (this.OldHardLockValid = i.HardLockValid),
          (i.SoftLockValid = this.SoftLockValid),
          (i.HardLockValid = this.HardLockValid),
          Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(
            29,
          )?.RefreshCurrentLockState(
            ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
              t.CharacterActorComponent.Entity,
            ),
          ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              58,
              `[TsAnimNotifyStateSetLockPointState.NotifyBegin]: 角色'${t.GetName()}'未找到锁定点'${this.BoneName}'`,
            ),
          !1))
    );
  }
  K2_NotifyEnd(t, e) {
    let a;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t.CharacterActorComponent.LockOnParts.has(this.BoneName)
        ? (((a = t.CharacterActorComponent.LockOnParts.get(
            this.BoneName,
          )).SoftLockValid = this.OldSoftLockValid),
          (a.HardLockValid = this.OldHardLockValid),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              58,
              `[TsAnimNotifyStateSetLockPointState.NotifyEnd]: 角色'${t.GetName()}'未找到锁定点'${this.BoneName}'`,
            ),
          !1))
    );
  }
  GetNotifyName() {
    return "设置部位软硬锁是否启用";
  }
}
exports.default = TsAnimNotifyStateSetLockPointState;
// # sourceMappingURL=TsAnimNotifyStateSetLockPointState.js.map
