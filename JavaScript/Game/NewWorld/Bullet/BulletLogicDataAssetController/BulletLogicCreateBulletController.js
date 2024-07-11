"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicCreateBulletController = void 0);
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletController_1 = require("../BulletController");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletHitActorData_1 = require("../Model/BulletHitActorData");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicCreateBulletController extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e), (this.u9o = void 0), (this.u9o = t);
  }
  BulletLogicAction(e = void 0) {
    let r = this.u9o;
    var i = r.CreateBulletRowName;
    if (i !== StringUtils_1.NONE_STRING) {
      let l = this.Bullet.GetBulletInfo();
      let t = void 0;
      e &&
        e instanceof BulletHitActorData_1.BulletHitActorData &&
        (t = e.Entity);
      const n = r.FlashBulletRowName;
      if (n !== StringUtils_1.NONE_STRING) {
        e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(
          l.Attacker.Id,
        );
        let i = !1;
        var o = t.GetComponent(1);
        if (e && (0, RegisterComponent_1.isComponentInstance)(o, 3)) {
          const a = o?.Actor;
          a &&
            e.forEach((t, e, r) => {
              t.GetBulletInfo().BulletRowName === n &&
                t.GetComponent(1).Owner.GetAttachParentActor() === a &&
                ((t.GetBulletInfo().GenerateTime = Time_1.Time.WorldTime),
                (i = !0));
            });
        }
        if (i) return;
      }
      var o = this.Bullet.GetBulletInfo().ContextId;
      var e = this.c9o(r.BulletTransform, t);
      var i = BulletController_1.BulletController.CreateBulletCustomTarget(
        this.c9o(r.BulletOwner, t),
        i,
        e?.GetTransform() ?? MathUtils_1.MathUtils.DefaultTransform,
        {
          SkillId: l.BulletInitParams.SkillId,
          ParentVictimId: t?.Id,
          ParentTargetId: l.Target?.Id,
          ParentId: this.Bullet.Id,
          DtType: l.BulletInitParams.DtType,
        },
        o,
      );
      i &&
        ((e = i.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect
          ? BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(l, e)
          : ((o = r.AttachToBoneName),
            (l = this.c9o(r.AttachToActor, t)) &&
              o !== StringUtils_1.NONE_STRING &&
              ((e = FNameUtil_1.FNameUtil.GetDynamicFName(o)),
              (r = i.GetComponent(152)),
              (o = l.Mesh),
              r.SetActorLocation(o.GetSocketLocation(e)),
              r.SetAttachToComponent(o, e, 1, 0, 0, !1),
              (r.NeedDetach = !0))));
    }
  }
  c9o(t, e) {
    switch (t) {
      case 1:
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
      case 2:
        var r = e.GetComponent(3);
        if (r) {
          r = r?.Actor;
          if (r?.IsValid()) return r;
        }
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
      default:
        return this.Bullet.GetBulletInfo().AttackerActorComp.Actor;
    }
  }
}
exports.BulletLogicCreateBulletController = BulletLogicCreateBulletController;
// # sourceMappingURL=BulletLogicCreateBulletController.js.map
