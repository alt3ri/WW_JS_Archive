"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
class TsAnimNotifyHideMesh extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.ChildMeshName = ""),
      (this.HideChildren = !0),
      (this.HideChildrenActors = !1),
      (this.Hide = !0);
  }
  K2_Notify(e, t) {
    const s = e.GetOwner();
    if (!s) return !1;
    let i = void 0;
    if (this.ChildMeshName) {
      const r = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let e = r.Num() - 1; e >= 0; --e) {
        const o = r.Get(e);
        if (o.GetName() === this.ChildMeshName) {
          i = o;
          break;
        }
      }
    } else i = e;
    return !!i && (i.SetHiddenInGame(this.Hide, this.HideChildren), !0);
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyHideMesh;
// # sourceMappingURL=TsAnimNotifyHideMesh.js.map
