"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyRoleFinishInteract extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Type = 3);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var s = e.CharacterActorComponent.Entity.GetComponent(26);
      if (s)
        switch (this.Type) {
          case 2:
            s.EndCatapult();
            break;
          case 1:
            s.EndBounce();
        }
    }
    return !0;
  }
  GetNotifyName() {
    return "设置角色交互";
  }
}
exports.default = TsAnimNotifyRoleFinishInteract;
//# sourceMappingURL=TsAnimNotifyRoleFinishInteract.js.map
