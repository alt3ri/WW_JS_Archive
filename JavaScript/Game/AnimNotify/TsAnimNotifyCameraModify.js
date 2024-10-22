"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraController_1 = require("../Camera/CameraController"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyCameraModify extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.Tag = void 0),
      (this.持续时间 = -0),
      (this.淡入时间 = -0),
      (this.淡出时间 = -0),
      (this.打断淡出时间 = -0),
      (this.相机修改配置 = void 0),
      (this.生效客户端类型 = 0),
      (this.CameraAttachSocket = "CameraPosition"),
      (this.条件 = void 0);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.EntityId);
    if (!i?.Valid) return !1;
    var r = CameraController_1.CameraController.FightCamera.LogicComponent;
    if (!r?.Valid) return !1;
    let a = void 0;
    if (
      (t instanceof UE.AnimMontage && (a = t),
      CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
        i,
        this.相机修改配置,
        this.生效客户端类型,
        this.条件,
      ))
    ) {
      let t = void 0;
      0 !== this.生效客户端类型 &&
        1 !== this.生效客户端类型 &&
        6 !== this.生效客户端类型 &&
        ((t = e),
        (this.相机修改配置.IsLockInput = !0),
        (this.相机修改配置.OverrideCameraInput = !0)),
        r.ApplyCameraModify(
          this.Tag,
          this.持续时间,
          this.淡入时间,
          this.淡出时间,
          this.相机修改配置,
          a,
          this.打断淡出时间,
          void 0,
          void 0,
          t,
          this.CameraAttachSocket,
          e,
        );
    }
    return !0;
  }
  GetNotifyName() {
    return "Modify镜头";
  }
}
exports.default = TsAnimNotifyCameraModify;
//# sourceMappingURL=TsAnimNotifyCameraModify.js.map
