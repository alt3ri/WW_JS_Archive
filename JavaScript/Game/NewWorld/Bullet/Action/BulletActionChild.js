"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionChild = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletChildInfo_1 = require("../Model/BulletChildInfo"),
  BulletActionBase_1 = require("./BulletActionBase");
class BulletActionChild extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments), (this.ChildInfo = void 0), (this.L5o = void 0);
  }
  OnExecute() {
    (this.ChildInfo = new BulletChildInfo_1.BulletChildInfo()),
      (this.BulletInfo.ChildInfo = this.ChildInfo),
      (this.ChildInfo.HaveSummonedBulletNumber = []),
      (this.L5o = this.BulletInfo.BulletDataMain.Children);
    var i = this.L5o.length;
    for (let t = 0; t < i; t++) this.ChildInfo.HaveSummonedBulletNumber.push(0);
    this.D5o();
  }
  Clear() {
    super.Clear(), (this.ChildInfo = void 0), (this.L5o = void 0);
  }
  D5o() {
    for (const t of this.L5o)
      if (2 === t.Condition)
        return void (this.ChildInfo.HaveSpecialChildrenBullet = !0);
  }
  OnTick(t) {
    this.BulletInfo.NeedDestroy || this.R5o();
  }
  R5o() {
    var i = this.L5o.length;
    for (let t = 0; t < i; ++t) {
      var e = this.L5o[t],
        l = t;
      if (
        !(
          e.RowName <= MathCommon_1.MathCommon.KindaSmallNumber ||
          0 !== e.Condition
        ) &&
        !(
          (0 < e.Num &&
            !(this.ChildInfo.HaveSummonedBulletNumber[l] < e.Num)) ||
          (e.Delay < 0 &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "子弹Delay为负数！"),
          this.BulletInfo.LiveTime <
            e.Delay * TimeUtil_1.TimeUtil.InverseMillisecond +
              this.ChildInfo.HaveSummonedBulletNumber[l] *
                e.Interval *
                TimeUtil_1.TimeUtil.InverseMillisecond)
        )
      ) {
        var o = BulletController_1.BulletController.CreateBulletCustomTarget(
          this.BulletInfo.AttackerActorComp.Actor,
          e.RowName.toString(),
          this.BulletInfo.ActorComponent.ActorTransform,
          {
            SkillId: this.BulletInfo.BulletInitParams.SkillId,
            ParentTargetId: this.BulletInfo.Target?.Id,
            ParentId: this.BulletInfo.Entity.Id,
            DtType: this.BulletInfo.BulletInitParams.DtType,
          },
          this.BulletInfo.ContextId,
        );
        if (o)
          BulletUtil_1.BulletUtil.ProcessHandOverEffectToSon(
            this.BulletInfo,
            o,
          ),
            this.ChildInfo.HaveSummonedBulletNumber[l]++;
        else if (e.BreakOnFail) return;
      }
    }
  }
}
exports.BulletActionChild = BulletActionChild;
//# sourceMappingURL=BulletActionChild.js.map
