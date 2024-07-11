"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionSummonBullet = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonBullet extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.ChildInfo = void 0), (this.L5o = void 0);
  }
  OnExecute() {
    var t;
    (this.ChildInfo = this.BulletInfo.ChildInfo),
      this.ChildInfo &&
        ((this.L5o = this.BulletInfo.BulletDataMain.Children),
        (t = this.ActionInfo).IsStayInCharacter ? this.GVo(t) : this.NVo(t));
  }
  Clear() {
    super.Clear(), (this.ChildInfo = void 0), (this.L5o = void 0);
  }
  NVo(e) {
    var l = this.L5o,
      i = l.length;
    let s = void 0;
    for (let t = 0; t < i; ++t)
      if (l[t].Condition === e.ChildrenType) {
        var r = l[t];
        if (
          (!(0 < r.Num) ||
            this.ChildInfo.HaveSummonedBulletNumber[t] < r.Num) &&
          0 !== Number(r.RowName)
        ) {
          !s &&
            e.ParentImpactPoint &&
            e.ParentLastPosition &&
            ((o = BulletPool_1.BulletPool.CreateVector()),
            (u = BulletPool_1.BulletPool.CreateVector()),
            o.FromUeVector(e.ParentImpactPoint),
            o.SubtractionEqual(e.ParentLastPosition),
            u.FromUeVector(this.BulletInfo.MoveInfo.BulletSpeedDir),
            u.Normalize(),
            (h = o.DotProduct(u)),
            u.Multiply(h, o),
            e.ParentLastPosition.Addition(o, u),
            (s = this.BulletInfo.ActorComponent.ActorTransform).SetLocation(
              u.ToUeVector(),
            ),
            BulletPool_1.BulletPool.RecycleVector(u),
            BulletPool_1.BulletPool.RecycleVector(o));
          var o,
            u,
            h = BulletController_1.BulletController.CreateBulletCustomTarget(
              this.BulletInfo.AttackerActorComp.Actor,
              r.RowName.toString(),
              s ?? this.BulletInfo.ActorComponent.ActorTransform,
              {
                SkillId: this.BulletInfo.BulletInitParams.SkillId,
                ParentVictimId: e.Victim?.Id,
                ParentTargetId: this.BulletInfo.Target?.Id,
                ParentId: this.BulletInfo.Entity.Id,
                DtType: this.BulletInfo.BulletInitParams.DtType,
              },
              this.BulletInfo.ContextId,
            );
          if (h)
            BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
              this.BulletInfo,
              h,
            ),
              this.ChildInfo.HaveSummonedBulletNumber[t]++;
          else if (r.BreakOnFail) return;
        }
      }
  }
  GVo(e) {
    var l = this.L5o.length;
    for (let t = 0; t < l; ++t) {
      var i = this.L5o[t],
        s = t;
      if (
        5 === i.Condition &&
        !(
          (0 < i.Num &&
            !(this.ChildInfo.HaveSummonedBulletNumber[s] < i.Num)) ||
          this.BulletInfo.LiveTime <
            this.ChildInfo.HaveSummonedBulletNumber[s] *
              i.Interval *
              TimeUtil_1.TimeUtil.InverseMillisecond
        )
      ) {
        var r = BulletController_1.BulletController.CreateBulletCustomTarget(
          this.BulletInfo.AttackerActorComp.Actor,
          i.RowName.toString(),
          this.BulletInfo.ActorComponent.ActorTransform,
          {
            SkillId: this.BulletInfo.BulletInitParams.SkillId,
            ParentVictimId: e.Victim?.Id,
            ParentTargetId: this.BulletInfo.Target?.Id,
            ParentId: this.BulletInfo.Entity.Id,
            DtType: this.BulletInfo.BulletInitParams.DtType,
          },
          this.BulletInfo.ContextId,
        );
        if (r)
          BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
            this.BulletInfo,
            r,
          ),
            this.ChildInfo.HaveSummonedBulletNumber[s]++;
        else if (i.BreakOnFail) return;
      }
    }
  }
}
exports.BulletActionSummonBullet = BulletActionSummonBullet;
//# sourceMappingURL=BulletActionSummonBullet.js.map
