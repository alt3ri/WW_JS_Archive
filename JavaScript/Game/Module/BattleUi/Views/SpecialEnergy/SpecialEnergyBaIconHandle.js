"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBaIconHandle = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBaIconHandle {
  constructor() {
    (this.B1l = void 0),
      (this.OOi = void 0),
      (this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.gdt = !1),
      (this.fdt = void 0);
  }
  Init(s, e = void 0) {
    (this.B1l = s), (this.OOi = e);
  }
  SetIcon(s) {
    for (const e of this.B1l) e.SetUIActive(!1);
    s &&
      (this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.Texture2D,
        (s) => {
          if (((this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId), s))
            for (const e of this.B1l) e.SetUIActive(!0), e.SetTexture(s);
        },
        103,
      ));
  }
  PlayEndAnim(s) {
    if (this.gdt !== s)
      if (((this.gdt = s), this.Est(), s)) for (const e of this.fdt) e.Play();
      else {
        for (const t of this.fdt) t.Stop();
        for (const i of this.B1l) i.SetAlpha(1);
      }
  }
  Est() {
    if (!this.fdt && ((this.fdt = []), this.OOi)) {
      var e = this.OOi.GetOwner().K2_GetComponentsByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      );
      for (let s = 0; s < e.Num(); s++) {
        var t = e.Get(s);
        this.fdt.push(t);
      }
    }
  }
  OnBeforeDestroy() {
    this.PlayEndAnim(!1),
      this.Cdt !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Cdt),
        (this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId));
  }
}
exports.SpecialEnergyBaIconHandle = SpecialEnergyBaIconHandle;
//# sourceMappingURL=SpecialEnergyBaIconHandle.js.map
