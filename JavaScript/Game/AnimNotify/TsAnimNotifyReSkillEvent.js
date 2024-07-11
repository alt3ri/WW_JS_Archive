"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
const CharacterSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/CharacterSkillComponent");
class TsAnimNotifyReSkillEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments),
      (this.子弹数据名 = void 0),
      (this.子弹出生位置偏移 = void 0),
      (this.子弹id数组 = void 0),
      (this.子弹出生位置偏移数组 = void 0),
      (this.使用子弹id数组 = !1),
      (this.使用召唤者子弹 = !1),
      (this.随机子弹权重数组 = void 0);
  }
  K2_Notify(t, e) {
    let i = !1;
    let r = t.GetOwner();
    if (this.使用召唤者子弹 && r instanceof TsBaseCharacter_1.default) {
      let e = r.CharacterActorComponent?.Entity;
      if (!e?.Valid) return !1;
      var s = e.GetComponent(0).GetSummonerId();
      if (!(s > 0)) return !1;
      (i = !0),
        e.GetComponent(33)?.SetCurSkillAnIndex(this.exportIndex),
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(s)?.Entity),
        (r = e.GetComponent(3).Actor);
    }
    if (r instanceof TsBaseCharacter_1.default) {
      s = r.CharacterActorComponent?.Entity;
      if (!s?.Valid) return !1;
      s = s.GetComponent(33);
      if (!s?.Valid) return !1;
      s.SetCurSkillAnIndex(this.exportIndex);
      var l = s.GetCurrentMontageCorrespondingSkillId()?.toString() ?? "0";
      const o =
        l === "0"
          ? s
              .GetSkillIdWithGroupId(CharacterSkillComponent_1.SKILL_GROUP_MAIN)
              .toString()
          : l;
      const a = new UE.Transform();
      if (this.使用子弹id数组) {
        const h = this.子弹id数组.Num();
        var s = this.GetRandomIndex();
        const n = this.子弹出生位置偏移数组.Num();
        if (s >= 0 && s < h) {
          let e = void 0;
          s < n && (e = this.子弹出生位置偏移数组.Get(s)),
            BulletUtil_1.BulletUtil.CreateBulletFromAN(
              r,
              this.子弹id数组.Get(s),
              a,
              o,
              !1,
              void 0,
              e,
              i,
            );
        } else
          for (let t = 0; t < h; t++) {
            let e = void 0;
            n > t && (e = this.子弹出生位置偏移数组.Get(t)),
              BulletUtil_1.BulletUtil.CreateBulletFromAN(
                r,
                this.子弹id数组.Get(t),
                a,
                o,
                !1,
                void 0,
                e,
                i,
              );
          }
      } else
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          r,
          this.子弹数据名.toString(),
          a,
          o,
          !1,
          void 0,
          this.子弹出生位置偏移,
          i,
        );
      return !0;
    }
    if (
      !(this.使用子弹id数组
        ? this.子弹id数组.Num() <= 0
        : FNameUtil_1.FNameUtil.IsNothing(this.子弹数据名))
    ) {
      l = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(r.GetWorld());
      if (l === 2 || l === 4) {
        var s = UE.KismetSystemLibrary.GetOuterObject(this);
        const u = UE.KismetSystemLibrary.GetPathName(s);
        if (this.使用子弹id数组) {
          const f = this.子弹id数组;
          const v = f.Num();
          var l = this.GetRandomIndex();
          if (l >= 0 && l < v)
            UE.BPL_BulletPreview_C.ShowBulletPreview(
              u,
              new UE.FName(f.Get(l)),
              r,
              t,
              r.GetWorld(),
              void 0,
            );
          else
            for (let e = 0; e < v; e++)
              UE.BPL_BulletPreview_C.ShowBulletPreview(
                u,
                new UE.FName(f.Get(e)),
                r,
                t,
                r.GetWorld(),
                void 0,
              );
        } else
          UE.BPL_BulletPreview_C.ShowBulletPreview(
            u,
            this.子弹数据名,
            r,
            t,
            r.GetWorld(),
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
    const r = this.随机子弹权重数组.Num();
    if (!(r <= 0))
      if (r !== this.子弹id数组.Num())
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 29, "随机子弹权重数量对不上！");
      else {
        let t = 0;
        for (let e = 0; e < r; e++) {
          const s = this.随机子弹权重数组.Get(e);
          s > 0 && (t += s);
        }
        let i = Math.random() * t;
        for (let e = 0; e < r; e++) {
          const l = this.随机子弹权重数组.Get(e);
          if (!(l <= 0) && (i -= l) <= 0) return e;
        }
      }
    return -1;
  }
}
exports.default = TsAnimNotifyReSkillEvent;
// # sourceMappingURL=TsAnimNotifyReSkillEvent.js.map
