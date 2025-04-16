"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log");
class AnimNotifyAddMaterialControllerDataGroup extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  Constructor() {}
  IsAllValid(t, e) {
    if (!UE.KismetSystemLibrary.IsValid(this.MaterialAssetData))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            13,
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
            13,
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
            13,
            "错误：动画Owner不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", e?.GetName()],
          ),
        !1
      );
    for (let r = 0; r < this.MaterialAssetData.DataMap.Num(); r++)
      if (0 !== this.MaterialAssetData.DataMap.GetKey(r).DataType)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：DAGroup的每一个子项不能是Runtime类型,Runtime类型请使用AnimNotifyStateAddMaterialControllerDataGroup",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", e?.GetName()],
              ["DAGroup", this.MaterialAssetData?.GetName()],
            ),
          !1
        );
    return !0;
  }
  K2_Notify(r, t) {
    if (!this.IsAllValid(r, t)) return !1;
    t = r.GetOwner();
    if (t instanceof UE.TsBaseCharacter_C) {
      t.CharRenderingComponent.CheckInit() ||
        t.CharRenderingComponent.Init(t.RenderType);
      const o =
        t.CharRenderingComponent.AddMaterialControllerDataGroupWithAnimObject(
          this.MaterialAssetData,
          r,
        );
      return 0 <= o;
    }
    let e = t.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    e ||
      ((e = t.AddComponentByClass(
        UE.CharRenderingComponent_C.StaticClass(),
        !1,
        new UE.Transform(),
        !1,
      )).Init(8),
      e.SetLogicOwner(t));
    const o = e.AddMaterialControllerDataGroupWithAnimObject(
      this.MaterialAssetData,
      r,
    );
    return 0 <= o;
  }
  GetNotifyName() {
    var r = this.MaterialAssetData.GetName();
    return r
      ? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(r, !0)
      : "材质控制器组";
  }
}
exports.default = AnimNotifyAddMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyAddMaterialControllerDataGroup.js.map
