"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ModelManager_1 = require("../Manager/ModelManager"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil"),
  CharacterSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/CharacterSkillComponent");
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
      (this.随机子弹权重数组 = void 0);
  }
  K2_Notify(e, i) {
    let r = !1,
      s = e.GetOwner();
    if (this.使用召唤者子弹 && s instanceof TsBaseCharacter_1.default) {
      let t = s.CharacterActorComponent?.Entity;
      if (!t?.Valid) return !1;
      var l = t.GetComponent(0).GetSummonerId();
      if (!(0 < l)) return !1;
      (r = !0),
        t.GetComponent(34)?.SetCurAnInfo(this.exportIndex, i.GetName()),
        (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)?.Entity),
        (s = t.GetComponent(3).Actor);
    }
    if (s instanceof TsBaseCharacter_1.default) {
      l = s.CharacterActorComponent?.Entity;
      if (!l?.Valid) return !1;
      l = l.GetComponent(34);
      if (!l?.Valid) return !1;
      l.SetCurAnInfo(this.exportIndex, i.GetName());
      var i = l.GetCurrentMontageCorrespondingSkillId()?.toString() ?? "0",
        o =
          "0" === i
            ? l
                .GetSkillIdWithGroupId(
                  CharacterSkillComponent_1.SKILL_GROUP_MAIN,
                )
                .toString()
            : i,
        a = new UE.Transform();
      if (this.使用子弹id数组) {
        var t = this.子弹id数组.Num(),
          l = this.GetRandomIndex(),
          h = this.子弹出生位置偏移数组.Num(),
          n = this.子弹初速度偏移数组.Num();
        if (0 <= l && l < t) {
          let t = void 0,
            e = void 0;
          l < h && (t = this.子弹出生位置偏移数组.Get(l)),
            l < n && (e = this.子弹初速度偏移数组.Get(l)),
            BulletUtil_1.BulletUtil.CreateBulletFromAN(
              s,
              this.子弹id数组.Get(l),
              a,
              o,
              !1,
              void 0,
              t,
              e,
              r,
            );
        } else
          for (let i = 0; i < t; i++) {
            let t = void 0,
              e = void 0;
            h > i && (t = this.子弹出生位置偏移数组.Get(i)),
              n > i && (e = this.子弹初速度偏移数组.Get(i)),
              BulletUtil_1.BulletUtil.CreateBulletFromAN(
                s,
                this.子弹id数组.Get(i),
                a,
                o,
                !1,
                void 0,
                t,
                e,
                r,
              );
          }
      } else
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          s,
          this.子弹数据名.toString(),
          a,
          o,
          !1,
          void 0,
          this.子弹出生位置偏移,
          this.子弹初速度偏移,
          r,
        );
      return !0;
    }
    if (
      !(this.使用子弹id数组
        ? this.子弹id数组.Num() <= 0
        : FNameUtil_1.FNameUtil.IsNothing(this.子弹数据名))
    ) {
      i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(s.GetWorld());
      if (2 === i || 4 === i) {
        var l = UE.KismetSystemLibrary.GetOuterObject(this),
          u = UE.KismetSystemLibrary.GetPathName(l);
        if (this.使用子弹id数组) {
          var v = this.子弹id数组,
            d = v.Num(),
            i = this.GetRandomIndex();
          if (0 <= i && i < d)
            UE.BPL_BulletPreview_C.ShowBulletPreview(
              u,
              new UE.FName(v.Get(i)),
              s,
              e,
              s.GetWorld(),
              void 0,
            );
          else
            for (let t = 0; t < d; t++)
              UE.BPL_BulletPreview_C.ShowBulletPreview(
                u,
                new UE.FName(v.Get(t)),
                s,
                e,
                s.GetWorld(),
                void 0,
              );
        } else
          UE.BPL_BulletPreview_C.ShowBulletPreview(
            u,
            this.子弹数据名,
            s,
            e,
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
  GetRandomIndex() {
    var r = this.随机子弹权重数组.Num();
    if (!(r <= 0))
      if (r !== this.子弹id数组.Num())
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 29, "随机子弹权重数量对不上！");
      else {
        let e = 0;
        for (let t = 0; t < r; t++) {
          var s = this.随机子弹权重数组.Get(t);
          0 < s && (e += s);
        }
        let i = Math.random() * e;
        for (let t = 0; t < r; t++) {
          var l = this.随机子弹权重数组.Get(t);
          if (!(l <= 0) && (i -= l) <= 0) return t;
        }
      }
    return -1;
  }
}
exports.default = TsAnimNotifyReSkillEvent;
//# sourceMappingURL=TsAnimNotifyReSkillEvent.js.map
