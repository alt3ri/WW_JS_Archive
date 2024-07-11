"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateWeaponHang extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Id = 10),
      (this.新的挂载点名 = void 0),
      (this.挂载相对位置 = void 0),
      (this.结束后状态 = 1),
      (this.缓冲时间 = -0);
  }
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      (t?.CharacterActorComponent?.Entity?.GetComponent(
        69,
      )?.ChangeWeaponHangState(
        this.Id,
        this.新的挂载点名,
        this.挂载相对位置,
        this.缓冲时间,
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t?.CharacterActorComponent?.Entity?.GetComponent(69);
      if (!t?.Valid) return !1;
      if (t.BPr === this.Id)
        return (
          (0 === this.结束后状态 || 1 === this.结束后状态) &&
          (t.ChangeWeaponHangState(
            this.结束后状态,
            UE.NewArray(UE.BuiltinName),
            UE.NewArray(UE.Transform),
            this.缓冲时间,
          ),
          !0)
        );
    }
    return !1;
  }
  GetNotifyName() {
    return "切换武器到挂点";
  }
}
exports.default = TsAnimNotifyStateWeaponHang;
//# sourceMappingURL=TsAnimNotifyStateWeaponHang.js.map
