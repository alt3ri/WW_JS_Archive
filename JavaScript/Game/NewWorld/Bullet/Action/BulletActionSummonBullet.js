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
    var i = this.L5o,
      l = i.length;
    let r = void 0;
    for (let t = 0; t < l; ++t)
      if (i[t].Condition === e.ChildrenType) {
        var s = i[t];
        if (
          (!(0 < s.Num) ||
            this.ChildInfo.HaveSummonedBulletNumber[t] < s.Num) &&
          0 !== Number(s.RowName)
        ) {
          !r &&
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
            (r = this.BulletInfo.ActorComponent.ActorTransform).SetLocation(
              u.ToUeVector(),
            ),
            BulletPool_1.BulletPool.RecycleVector(u),
            BulletPool_1.BulletPool.RecycleVector(o));
          var o,
            u,
            h = BulletController_1.BulletController.CreateBulletCustomTarget(
              this.BulletInfo.AttackerActorComp.Actor,
              s.RowName.toString(),
              r ?? this.BulletInfo.ActorComponent.ActorTransform,
              {
                SkillId: this.BulletInfo.BulletInitParams.SkillId,
                ParentVictimId: e.Victim?.Id,
                ParentTargetId: this.BulletInfo.Target?.Id,
                ParentId: this.BulletInfo.Entity.Id,
                DtType: this.BulletInfo.BulletInitParams.DtType,
                CreateOnAuthority: e.CreateOnAuthority,
              },
              this.BulletInfo.ContextId,
            );
          if (h)
            BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
              this.BulletInfo,
              h,
            ),
              this.ChildInfo.HaveSummonedBulletNumber[t]++;
          else if (s.BreakOnFail) return;
        }
      }
  }
  GVo(e) {
    var i = this.L5o.length;
    for (let t = 0; t < i; ++t) {
      var l = this.L5o[t],
        r = t;
      if (
        5 === l.Condition &&
        !(
          (0 < l.Num &&
            !(this.ChildInfo.HaveSummonedBulletNumber[r] < l.Num)) ||
          this.BulletInfo.LiveTime <
            this.ChildInfo.HaveSummonedBulletNumber[r] *
              l.Interval *
              TimeUtil_1.TimeUtil.InverseMillisecond
        )
      ) {
        var s = BulletController_1.BulletController.CreateBulletCustomTarget(
          this.BulletInfo.AttackerActorComp.Actor,
          l.RowName.toString(),
          this.BulletInfo.ActorComponent.ActorTransform,
          {
            SkillId: this.BulletInfo.BulletInitParams.SkillId,
            ParentVictimId: e.Victim?.Id,
            ParentTargetId: this.BulletInfo.Target?.Id,
            ParentId: this.BulletInfo.Entity.Id,
            DtType: this.BulletInfo.BulletInitParams.DtType,
            CreateOnAuthority: e.CreateOnAuthority,
          },
          this.BulletInfo.ContextId,
        );
        if (s)
          BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
            this.BulletInfo,
            s,
          ),
            this.ChildInfo.HaveSummonedBulletNumber[r]++;
        else if (l.BreakOnFail) return;
      }
    }
  }
}
exports.BulletActionSummonBullet = BulletActionSummonBullet;
//# sourceMappingURL=BulletActionSummonBullet.js.map
