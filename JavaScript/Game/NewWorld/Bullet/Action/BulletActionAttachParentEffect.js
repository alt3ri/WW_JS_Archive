"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionAttachParentEffect = void 0);
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionAttachParentEffect extends BulletActionBase_1.BulletActionBase {
  OnTick(t) {
    let e;
    const l = this.BulletInfo;
    l.NeedDestroy ||
      ((e = EffectSystem_1.EffectSystem.GetSureEffectActor(l.ParentEffect)) &&
        (BulletUtil_1.BulletUtil.AttachParentEffectSkeleton(
          l,
          e,
          l.ParentEffect,
        ),
        (this.IsFinish = !0)));
  }
}
exports.BulletActionAttachParentEffect = BulletActionAttachParentEffect;
// # sourceMappingURL=BulletActionAttachParentEffect.js.map
