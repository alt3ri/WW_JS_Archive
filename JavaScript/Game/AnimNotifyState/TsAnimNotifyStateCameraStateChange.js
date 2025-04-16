"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateCameraStateChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.是否为单客户端 = !1), (this.是否跟随 = !1);
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    return (
      (!this.是否为单客户端 ||
        (e instanceof TsBaseCharacter_1.default &&
          Global_1.Global.BaseCharacter === e)) &&
      ((ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing =
        this.是否跟随),
      !0)
    );
  }
  K2_NotifyEnd(e, r) {
    e = e.GetOwner();
    return (
      (!this.是否为单客户端 ||
        (e instanceof TsBaseCharacter_1.default &&
          Global_1.Global.BaseCharacter === e)) &&
      (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.IsFollowing =
        !0)
    );
  }
  GetNotifyName() {
    return "相机是否跟随角色移动";
  }
}
exports.default = TsAnimNotifyStateCameraStateChange;
//# sourceMappingURL=TsAnimNotifyStateCameraStateChange.js.map
