"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBaIconHandle = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBaIconHandle {
  constructor() {
    (this.ddt = void 0),
      (this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.gdt = !1),
      (this.fdt = void 0);
  }
  Init(s) {
    this.ddt = s;
  }
  SetIcon(s) {
    for (const e of this.ddt) e.SetUIActive(!1);
    s &&
      (this.Cdt = ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.LGUISpriteData_BaseObject,
        (s) => {
          if (((this.Cdt = ResourceSystem_1.ResourceSystem.InvalidId), s))
            for (const e of this.ddt) e.SetUIActive(!0), e.SetSprite(s);
        },
        103,
      ));
  }
  PlayEndAnim(s) {
    if (this.gdt !== s)
      if (((this.gdt = s), this.Est(), s)) for (const e of this.fdt) e.Play();
      else {
        for (const t of this.fdt) t.Stop();
        for (const o of this.ddt) o.SetAlpha(1);
      }
  }
  Est() {
    if (!this.fdt) {
      this.fdt = [];
      for (const e of this.ddt) {
        var s = e
          .GetOwner()
          .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
        this.fdt.push(s);
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
