"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  K2_NotifyBegin(t, e, r) {
    let a = -1;
    if (
      (this.IsAllValid(t, e) &&
        (e = t.GetOwner()) instanceof UE.TsBaseCharacter_C &&
        (e.CharRenderingComponent.CheckInit() ||
          e.CharRenderingComponent.Init(e.RenderType),
        (a = e.CharRenderingComponent.AddMaterialControllerDataGroup(
          this.MaterialAssetData,
        ))),
      0 <= a)
    ) {
      let e = materialControllerStateHandleMap.get(t);
      return (
        e || ((e = new Map()), materialControllerStateHandleMap.set(t, e)),
        e.set(this, a),
        !0
      );
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    var r = materialControllerStateHandleMap.get(e);
    if (!r) return !0;
    var a = r.get(this);
    if (!a) return !0;
    if (
      (r.delete(this),
      r.size || materialControllerStateHandleMap.delete(e),
      0 <= a)
    ) {
      r = e.GetOwner();
      if (r instanceof UE.TsBaseCharacter_C)
        return (
          r.CharRenderingComponent.RemoveMaterialControllerDataGroupWithEnding(
            a,
          ),
          !0
        );
    }
    return !1;
  }
  IsAllValid(e, t) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? e && UE.KismetSystemLibrary.IsValid(e)
        ? UE.KismetSystemLibrary.IsValid(e.GetOwner())
          ? e.GetOwner() instanceof UE.TsBaseCharacter_C ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "RenderCharacter",
                14,
                "错误：必须是TsBaseCharacter及其派生类调用",
                ["Actor", e?.GetOwner()?.GetName()],
                ["动画", t?.GetName()],
              ),
            !1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderCharacter",
                14,
                "错误：动画Owner不合法",
                ["Actor", e?.GetOwner()?.GetName()],
                ["动画", t?.GetName()],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "错误：动画Mesh不合法",
              ["Actor", e?.GetOwner()?.GetName()],
              ["动画", t?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：特效DA不合法",
            ["Actor", e?.GetOwner()?.GetName()],
            ["动画", t?.GetName()],
          ),
        !1);
  }
  GetNotifyName() {
    var e = this.MaterialAssetData.GetName();
    return e
      ? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(e, !0)
      : "材质控制器组";
  }
}
exports.default = AnimNotifyStateAddMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerDataGroup.js.map
