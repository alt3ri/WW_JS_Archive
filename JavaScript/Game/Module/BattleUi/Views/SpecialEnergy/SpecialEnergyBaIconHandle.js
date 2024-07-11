"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBaIconHandle = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
class SpecialEnergyBaIconHandle {
  constructor() {
    (this.imt = void 0),
      (this.omt = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.rmt = !1),
      (this.nmt = void 0);
  }
  Init(s) {
    this.imt = s;
  }
  SetIcon(s) {
    for (const e of this.imt) e.SetUIActive(!1);
    s &&
      (this.omt = ResourceSystem_1.ResourceSystem.LoadAsync(
        s,
        UE.LGUISpriteData_BaseObject,
        (s) => {
          if (((this.omt = ResourceSystem_1.ResourceSystem.InvalidId), s))
            for (const e of this.imt) e.SetUIActive(!0), e.SetSprite(s);
        },
        103,
      ));
  }
  PlayEndAnim(s) {
    if (this.rmt !== s)
      if (((this.rmt = s), this.hnt(), s)) for (const e of this.nmt) e.Play();
      else {
        for (const t of this.nmt) t.Stop();
        for (const o of this.imt) o.SetAlpha(1);
      }
  }
  hnt() {
    if (!this.nmt) {
      this.nmt = [];
      for (const e of this.imt) {
        var s = e
          .GetOwner()
          .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
        this.nmt.push(s);
      }
    }
  }
  OnBeforeDestroy() {
    this.PlayEndAnim(!1),
      this.omt !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.omt),
        (this.omt = ResourceSystem_1.ResourceSystem.InvalidId));
  }
}
exports.SpecialEnergyBaIconHandle = SpecialEnergyBaIconHandle;
//# sourceMappingURL=SpecialEnergyBaIconHandle.js.map
