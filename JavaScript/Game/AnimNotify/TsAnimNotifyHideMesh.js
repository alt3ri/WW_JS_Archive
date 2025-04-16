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
  Constructor() {}
  K2_Notify(t, e) {
    var s = t.GetOwner();
    if (!s) return !1;
    let i = void 0;
    if (this.ChildMeshName) {
      var r = s.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = r.Num() - 1; 0 <= t; --t) {
        var o = r.Get(t);
        if (o.GetName() === this.ChildMeshName) {
          i = o;
          break;
        }
      }
    } else i = t;
    return !!i && (i.SetHiddenInGame(this.Hide, this.HideChildren), !0);
  }
  GetNotifyName() {
    return "隐藏网格体";
  }
}
exports.default = TsAnimNotifyHideMesh;
//# sourceMappingURL=TsAnimNotifyHideMesh.js.map
