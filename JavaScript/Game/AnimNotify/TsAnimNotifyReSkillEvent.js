"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil"),
  BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent");
class TsAnimNotifyReSkillEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.子弹数据名 = void 0),
      (this.子弹出生位置偏移 = void 0),
      (this.子弹初速度偏移 = void 0),
      (this.子弹id数组 = void 0),
      (this.子弹出生位置偏移数组 = void 0),
      (this.子弹初速度偏移数组 = void 0),
      (this.使用子弹id数组 = !1),
      (this.使用召唤者子弹 = !1),
      (this.随机子弹权重数组 = void 0),
      (this.传入当前实体位置 = !1),
      (this.骨骼名字 = void 0);
  }
  Constructor() {}
  K2_Notify(i, r) {
    let s = i.GetOwner(),
      t = void 0;
    if (s instanceof TsBaseCharacter_1.default) {
      if (!(t = s.CharacterActorComponent?.Entity)?.Valid) return !1;
      var o = t
          .GetComponent(207)
          ?.CreateAnimNotifyContent(r.GetName(), this.exportIndex),
        l = this.GetInitTransform(s);
      if (this.使用召唤者子弹) {
        var e = t.GetComponent(0).GetSummonerId();
        if (!(0 < e)) return !1;
        if (
          ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity),
          (s = t.GetComponent(3).Actor),
          !t?.Valid)
        )
          return !1;
        if (!(s instanceof TsBaseCharacter_1.default)) return !1;
      }
      e = t.GetComponent(39);
      if (!e?.Valid) return !1;
      var h = e.GetCurrentMontageCorrespondingSkillId()?.toString() ?? "0",
        a =
          "0" === h
            ? e
                .GetSkillIdWithGroupId(BaseSkillComponent_1.SKILL_GROUP_MAIN)
                .toString()
            : h;
      if (this.使用子弹id数组) {
        var n = this.子弹id数组.Num(),
          e = this.GetRandomIndex(),
          u = this.子弹出生位置偏移数组.Num(),
          f = this.子弹初速度偏移数组.Num();
        if (0 <= e && e < n) {
          if (!this.CanCreateBullet(s, r, e)) return !1;
          let t = void 0,
            i = void 0;
          e < u && (t = this.子弹出生位置偏移数组.Get(e)),
            e < f && (i = this.子弹初速度偏移数组.Get(e)),
            BulletUtil_1.BulletUtil.CreateBulletFromAN(
              s,
              this.子弹id数组.Get(e),
              l,
              a,
              !1,
              o,
              void 0,
              t,
              i,
            );
        } else
          for (let e = 0; e < n; e++)
            if (this.CanCreateBullet(s, r, e)) {
              let t = void 0,
                i = void 0;
              u > e && (t = this.子弹出生位置偏移数组.Get(e)),
                f > e && (i = this.子弹初速度偏移数组.Get(e)),
                BulletUtil_1.BulletUtil.CreateBulletFromAN(
                  s,
                  this.子弹id数组.Get(e),
                  l,
                  a,
                  !1,
                  o,
                  void 0,
                  t,
                  i,
                );
            }
      } else {
        if (!this.CanCreateBullet(s, r, 0)) return !1;
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          s,
          this.子弹数据名.toString(),
          l,
          a,
          !1,
          o,
          void 0,
          this.子弹出生位置偏移,
          this.子弹初速度偏移,
        );
      }
      return !0;
    }
    if (
      !(this.使用子弹id数组
        ? this.子弹id数组.Num() <= 0
        : FNameUtil_1.FNameUtil.IsNothing(this.子弹数据名))
    ) {
      h = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(s.GetWorld());
      if (2 === h || 4 === h) {
        var e = UE.KismetSystemLibrary.GetOuterObject(this),
          v = UE.KismetSystemLibrary.GetPathName(e);
        if (this.使用子弹id数组) {
          var d = this.子弹id数组,
            U = d.Num(),
            h = this.GetRandomIndex();
          if (0 <= h && h < U)
            UE.BPL_BulletPreview_C.ShowBulletPreview(
              v,
              new UE.FName(d.Get(h)),
              s,
              i,
              s.GetWorld(),
              void 0,
            );
          else
            for (let t = 0; t < U; t++)
              UE.BPL_BulletPreview_C.ShowBulletPreview(
                v,
                new UE.FName(d.Get(t)),
                s,
                i,
                s.GetWorld(),
                void 0,
              );
        } else
          UE.BPL_BulletPreview_C.ShowBulletPreview(
            v,
            this.子弹数据名,
            s,
            i,
            s.GetWorld(),
            void 0,
          );
      }
    }
    return !1;
  }
  GetNotifyName() {
    return "添加子弹";
  }
  GetInitTransform(t) {
    if (!this.传入当前实体位置) return new UE.TransformDouble();
    if (
      !FNameUtil_1.FNameUtil.IsNothing(this.骨骼名字) &&
      t.Mesh.DoesSocketExist(this.骨骼名字)
    )
      return t.Mesh.D_GetSocketTransform(this.骨骼名字, 0);
    return t.D_GetTransform();
  }
  GetRandomIndex() {
    var r = this.随机子弹权重数组.Num();
    if (!(r <= 0))
      if (r !== this.子弹id数组.Num())
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 28, "随机子弹权重数量对不上！");
      else {
        let i = 0;
        for (let t = 0; t < r; t++) {
          var s = this.随机子弹权重数组.Get(t);
          0 < s && (i += s);
        }
        let e = Math.random() * i;
        for (let t = 0; t < r; t++) {
          var o = this.随机子弹权重数组.Get(t);
          if (!(o <= 0) && (e -= o) <= 0) return t;
        }
      }
    return -1;
  }
  CanCreateBullet(t, i, e) {
    return !0;
  }
}
exports.default = TsAnimNotifyReSkillEvent;
//# sourceMappingURL=TsAnimNotifyReSkillEvent.js.map
