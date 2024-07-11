"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const CameraController_1 = require("../Camera/CameraController");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
class TsAnimNotifyStateCameraStateChange extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.是否为单客户端 = !1), (this.是否跟随 = !1);
  }
  K2_NotifyBegin(e, r, a) {
    e = e.GetOwner();
    return (
      (!this.是否为单客户端 ||
        (e instanceof TsBaseCharacter_1.default &&
          Global_1.Global.BaseCharacter === e)) &&
      ((CameraController_1.CameraController.FightCamera.LogicComponent.IsFollowing =
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
      (CameraController_1.CameraController.FightCamera.LogicComponent.IsFollowing =
        !0)
    );
  }
  GetNotifyName() {
    return "相机是否跟随角色移动";
  }
}
exports.default = TsAnimNotifyStateCameraStateChange;
// # sourceMappingURL=TsAnimNotifyStateCameraStateChange.js.map
