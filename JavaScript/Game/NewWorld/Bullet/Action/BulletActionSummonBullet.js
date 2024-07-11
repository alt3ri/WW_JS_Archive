"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionSummonBullet = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletPool_1 = require("../Model/BulletPool");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionSummonBullet extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.ChildInfo = void 0), (this.U4o = void 0);
  }
  OnExecute() {
    let t;
    (this.ChildInfo = this.BulletInfo.ChildInfo),
      this.ChildInfo &&
        ((this.U4o = this.BulletInfo.BulletDataMain.Children),
        (t = this.ActionInfo).IsStayInCharacter ? this.k5o(t) : this.F5o(t));
  }
  Clear() {
    super.Clear(), (this.ChildInfo = void 0), (this.U4o = void 0);
  }
  F5o(e) {
    const l = this.U4o;
    const i = l.length;
    let s = void 0;
    for (let t = 0; t < i; ++t)
      if (l[t].Condition === e.ChildrenType) {
        const r = l[t];
        if (
          (!(r.Num > 0) ||
            this.ChildInfo.HaveSummonedBulletNumber[t] < r.Num) &&
          Number(r.RowName) !== 0
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
          var o;
          var u;
          var h = BulletController_1.BulletController.CreateBulletCustomTarget(
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
  k5o(e) {
    const l = this.U4o.length;
    for (let t = 0; t < l; ++t) {
      const i = this.U4o[t];
      const s = t;
      if (
        i.Condition === 5 &&
        !(
          (i.Num > 0 &&
            !(this.ChildInfo.HaveSummonedBulletNumber[s] < i.Num)) ||
          this.BulletInfo.LiveTime <
            this.ChildInfo.HaveSummonedBulletNumber[s] *
              i.Interval *
              TimeUtil_1.TimeUtil.InverseMillisecond
        )
      ) {
        const r = BulletController_1.BulletController.CreateBulletCustomTarget(
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
// # sourceMappingURL=BulletActionSummonBullet.js.map
