"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  ActorUtils_1 = require("../Utils/ActorUtils");
class TsAnimNotifyStateIgnoreLockOnTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.IgnoreSocket = "");
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && this.ForceIgnore(e, !0);
  }
  K2_NotifyEnd(e, r) {
    e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && this.ForceIgnore(e, !1);
  }
  GetNotifyName() {
    return "强制忽略目标";
  }
  ForceIgnore(e, r) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !!t &&
      ((e = ActorUtils_1.ActorUtils.GetEntityByActor(e)),
      !!(t = t?.Entity?.GetComponent(32))) &&
      (t.ForceIgnore(
        new CharacterLockOnComponent_1.LockOnInfo(e, this.IgnoreSocket),
        r,
      ),
      !0)
    );
  }
}
exports.default = TsAnimNotifyStateIgnoreLockOnTarget;
//# sourceMappingURL=TsAnimNotifyStateIgnoreLockOnTarget.js.map
