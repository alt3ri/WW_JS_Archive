"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log");
class MaterialControllerData {
  constructor() {
    (this.HandleId = -1), (this.CharRenderingComponent = void 0);
  }
}
const materialControllerStateHandleMap = new Map();
class AnimNotifyStateAddMaterialControllerDataGroup extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.MaterialAssetData = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(e, a, t) {
    let o = -1;
    if (this.IsAllValid(e, a)) {
      a = e.GetOwner();
      if (a) {
        let r = void 0;
        if (
          0 <=
          (o =
            (a instanceof UE.TsBaseCharacter_C
              ? (r = a.CharRenderingComponent).CheckInit() ||
                r.Init(a.RenderType)
              : (r = a.GetComponentByClass(
                  UE.CharRenderingComponent_C.StaticClass(),
                )) ||
                ((r = a.AddComponentByClass(
                  UE.CharRenderingComponent_C.StaticClass(),
                  !1,
                  new UE.Transform(),
                  !1,
                )).Init(8),
                r.SetLogicOwner(a)),
            r.AddMaterialControllerDataGroupWithAnimObject(
              this.MaterialAssetData,
              e,
            )))
        ) {
          let t = materialControllerStateHandleMap.get(e);
          t || ((t = new Map()), materialControllerStateHandleMap.set(e, t));
          a = new MaterialControllerData();
          return (
            (a.HandleId = o), (a.CharRenderingComponent = r), t.set(this, a), !0
          );
        }
      }
    }
    return !1;
  }
  K2_NotifyEnd(t, r) {
    var e = materialControllerStateHandleMap.get(t);
    if (!e) return !0;
    var a = e.get(this);
    if (!a) return !0;
    e.delete(this), e.size || materialControllerStateHandleMap.delete(t);
    try {
      return (
        a.CharRenderingComponent?.RemoveMaterialControllerDataGroupWithEnding(
          a.HandleId,
        ),
        !0
      );
    } catch {
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderCharacter",
          25,
          "AnimNotifyStateAddMaterialControllerData移除材质控制器特效失败",
          ["Actor", t?.GetOwner()?.GetName()],
          ["动画", r?.GetName()],
          ["handleId", a.HandleId],
        );
    }
    return !1;
  }
  IsAllValid(t, r) {
    return UE.KismetSystemLibrary.IsValid(this.MaterialAssetData)
      ? t && UE.KismetSystemLibrary.IsValid(t)
        ? !!UE.KismetSystemLibrary.IsValid(t.GetOwner()) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：动画Owner不合法",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", r?.GetName()],
            ),
          !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderCharacter",
              13,
              "错误：动画Mesh不合法",
              ["Actor", t?.GetOwner()?.GetName()],
              ["动画", r?.GetName()],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderCharacter",
            13,
            "错误：特效DA不合法",
            ["Actor", t?.GetOwner()?.GetName()],
            ["动画", r?.GetName()],
          ),
        !1);
  }
  GetNotifyName() {
    var t = this.MaterialAssetData.GetName();
    return t
      ? "材质控制器组:" + UE.BlueprintPathsLibrary.GetBaseFilename(t, !0)
      : "材质控制器组";
  }
}
exports.default = AnimNotifyStateAddMaterialControllerDataGroup;
//# sourceMappingURL=AnimNotifyStateAddMaterialControllerDataGroup.js.map
