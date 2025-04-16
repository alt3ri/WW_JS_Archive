"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  CameraUtility_1 = require("../Camera/CameraUtility"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils");
class TsAnimNotifyStateCameraModify extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.Tag = void 0),
      (this.淡入时间 = -0),
      (this.淡出时间 = -0),
      (this.打断淡出时间 = -0),
      (this.相机修改配置 = void 0),
      (this.生效客户端类型 = 0),
      (this.CameraAttachSocket = "CameraPosition"),
      (this.条件 = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, i) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId);
    if (!r?.Valid) return !1;
    if (
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        r,
      )
    )
      return !1;
    var a =
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera
        .LogicComponent;
    if (!a?.Valid) return !1;
    if (
      CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(
        r,
        this.相机修改配置,
        this.生效客户端类型,
        this.条件,
      )
    ) {
      let r = void 0;
      0 !== this.生效客户端类型 &&
        1 !== this.生效客户端类型 &&
        6 !== this.生效客户端类型 &&
        ((r = t),
        (this.相机修改配置.IsLockInput = !0),
        (this.相机修改配置.OverrideCameraInput = !0)),
        a.ApplyCameraModify(
          this.Tag,
          i,
          this.淡入时间,
          this.淡出时间,
          this.相机修改配置,
          e,
          this.打断淡出时间,
          void 0,
          void 0,
          r,
          this.CameraAttachSocket,
          t,
        );
    }
    return !0;
  }
  K2_NotifyEnd(r, t) {
    return (
      r.GetOwner() instanceof TsBaseCharacter_1.default &&
      !!(r =
        ControllerHolder_1.ControllerHolder.CameraController.FightCamera
          .LogicComponent)?.Valid &&
      (r.StopCameraModify(t), !0)
    );
  }
  GetNotifyName() {
    return "ModifyANS镜头";
  }
}
exports.default = TsAnimNotifyStateCameraModify;
//# sourceMappingURL=TsAnimNotifyStateCameraModify.js.map
