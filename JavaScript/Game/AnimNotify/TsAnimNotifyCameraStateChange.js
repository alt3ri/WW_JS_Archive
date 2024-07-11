"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraController_1 = require("../Camera/CameraController"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  Global_1 = require("../Global");
class TsAnimNotifyCameraStateChange extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.是否为单客户端 = !1), (this.是否跟随 = !1);
  }
  K2_Notify(e, r) {
    e = e.GetOwner();
    return (
      (!this.是否为单客户端 ||
        (e instanceof TsBaseCharacter_1.default &&
          e === Global_1.Global.BaseCharacter)) &&
        (CameraController_1.CameraController.FightCamera.LogicComponent.IsFollowing =
          this.是否跟随),
      !0
    );
  }
  GetNotifyName() {
    return "摄像机状态改变";
  }
}
exports.default = TsAnimNotifyCameraStateChange;
//# sourceMappingURL=TsAnimNotifyCameraStateChange.js.map
