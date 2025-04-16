"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log");
class TsAnimNotifyStateMeshVisibility extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.HideMeshName = ""),
      (this.Visibility = !0),
      (this.EntityMeshMap = void 0);
  }
  Constructor() {
    this.EntityMeshMap = void 0;
  }
  K2_NotifyBegin(t, i, e) {
    this.EntityMeshMap || (this.EntityMeshMap = new Map());
    var t = t.GetOwner(),
      s = t.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    let r = !1,
      o = void 0;
    for (let t = 0; t < s.Num(); t++)
      if (s.Get(t).GetName() === this.HideMeshName) {
        (o = s.Get(t)), (r = !0);
        break;
      }
    var h = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (1 !== h && 3 !== h) o && o.SetVisibility(this.Visibility);
    else {
      (h = t), (t = h.GetEntityId());
      if (
        (this.EntityMeshMap.has(t) || this.EntityMeshMap.set(t, new Array()),
        !h)
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Render",
              4,
              "TsAnimNotifyStateHideMesh,该Actor不是一个实体",
            ),
          !1
        );
      if (!r)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Render",
              4,
              "TsAnimNotifyStateHideMesh无法找到Mesh",
              ["填入Mesh名", this.HideMeshName],
            ),
          !1
        );
      this.EntityMeshMap.get(t).push(o), o.SetVisibility(this.Visibility);
    }
    return !0;
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner(),
      e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (1 !== e && 3 !== e) {
      var s = t.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let i = void 0;
      for (let t = 0; t < s.Num(); t++)
        if (s.Get(t).GetName() === this.HideMeshName) {
          i = s.Get(t);
          break;
        }
      i && i.SetVisibility(!this.Visibility);
    } else {
      e = t.GetEntityId();
      this.EntityMeshMap.has(e) &&
        (t = this.EntityMeshMap.get(e).find(
          (t) => t.GetName() === this.HideMeshName,
        )) &&
        t.SetVisibility(!this.Visibility);
    }
    return !0;
  }
  GetNotifyName() {
    return "控制角色Mesh显隐";
  }
}
exports.default = TsAnimNotifyStateMeshVisibility;
//# sourceMappingURL=TsAnimNotifyStateMeshVisibility.js.map
