"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateSubMeshControl extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.MeshName = ""),
      (this.开始是否可见 = !0),
      (this.开始材质 = void 0),
      (this.开始特效 = void 0),
      (this.开始延迟时间 = 0),
      (this.结束是否可见 = !0),
      (this.结束材质 = void 0),
      (this.结束特效 = void 0),
      (this.结束延迟时间 = 0);
  }
  K2_NotifyBegin(t, s, i) {
    var t = t?.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.GetEntityNoBlueprint()?.GetComponent(203)) &&
      (t.SetSubMeshOrder(
        this.MeshName,
        this.开始是否可见,
        this.开始材质,
        this.开始特效,
        this.开始延迟时间 * MathUtils_1.MathUtils.SecondToMillisecond,
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, s) {
    var t = t?.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.GetEntityNoBlueprint()?.GetComponent(203)) &&
      (t.SetSubMeshOrder(
        this.MeshName,
        this.结束是否可见,
        this.结束材质,
        this.结束特效,
        this.结束延迟时间 * MathUtils_1.MathUtils.SecondToMillisecond,
      ),
      !0)
    );
  }
}
exports.default = TsAnimNotifyStateSubMeshControl;
//# sourceMappingURL=TsAnimNotifyStateSubMeshControl.js.map
