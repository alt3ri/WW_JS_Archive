"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class AnimNotifyAddMaterialControllerDataGroup extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  IsAllValid(t, e) {
    if (!UE.KismetSystemLibrary.IsValid(this.MaterialAssetData))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：特效DA不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1
      );
    if (!t || !UE.KismetSystemLibrary.IsValid(t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：动画Mesh不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1
      );
    if (!UE.KismetSystemLibrary.IsValid(t.GetOwner()))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            14,
            "错误：动画Owner不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1
      );
    for (let r = 0; r < this.MaterialAssetData.DataMap.Num(); r++)
      if (this.MaterialAssetData.DataMap.GetKey(r).DataType !== 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              14,
              "错误：DAGroup的每一个子项不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerDataGroup",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", e?.GetName()],
              ["DAGroup", this.MaterialAssetData?.GetName()],
            ),
          !1
        );
    return (
      t.GetOwner() instanceof UE.TsBaseCharacter_C ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderCharacter",
          14,
          "错误：必须是TsBaseCharacter及其派生类调用",
          ["Actor", t?.GetOwner()?.GetName()],
          ["动画", e?.GetName()],
        ),
      !1)
    );
  }
  K2_Notify(r, t) {
    return (
      !!this.IsAllValid(r, t) &&
      (t = r.GetOwner()) instanceof UE.TsBaseCharacter_C &&
      (t.CharRenderingComponent.CheckInit() ||
        t.CharRenderingComponent.Init(t.RenderType),
      t.CharRenderingComponent.AddMaterialControllerDataGroup(
        this.MaterialAssetData,
      ) >= 0)
    );
  }
  GetNotifyName() {
    const r = this.MaterialAssetData.GetName();
    return r
      ? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(r, !0)
      : "材质控制器组";
  }
}
exports.default = AnimNotifyAddMaterialControllerDataGroup;
// # sourceMappingURL=AnimNotifyAddMaterialControllerDataGroup.js.map
