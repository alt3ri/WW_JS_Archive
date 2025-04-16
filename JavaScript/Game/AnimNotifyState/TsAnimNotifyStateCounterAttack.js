"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateCounterAttack extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.弹反摄像机预设 = void 0),
      (this.弹反特效预设 = void 0),
      (this.弹反设置 = void 0),
      (this.生成子弹ID = void 0),
      (this.AnMessageId = void 0);
  }
  Constructor() {
    this.AnMessageId = void 0;
  }
  K2_NotifyBegin(t, i, e) {
    t = t.GetOwner();
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 20, "CounterAttack Begin", [
          "Owner",
          t?.GetName(),
        ]),
      t instanceof TsBaseCharacter_1.default)
    ) {
      t = t.CharacterActorComponent?.Entity;
      if (!t?.Valid) return !1;
      var s = t.GetComponent(207),
        s =
          ((this.AnMessageId = s?.CreateAnimNotifyContent(
            i.GetName(),
            this.exportIndex,
          )),
          t.GetComponent(39)),
        i = t.GetComponent(60);
      if (!s?.Valid || !i?.Valid) return !1;
      if (!this.弹反设置) return !1;
      if (
        (i.SetCounterAttackAnsInfo(this.AnMessageId, this.exportIndex),
        this.弹反摄像机预设 || this.弹反特效预设)
      )
        return (
          (t = new UE.SCounterAttack(
            this.弹反设置?.弹反部位,
            this.弹反设置?.无弹反动作效果,
            this.弹反设置?.有弹反动作效果,
            this.弹反设置?.削韧倍率,
            this.弹反设置?.最大触发距离,
            this.弹反设置?.最大触发夹角,
            this.弹反设置?.被弹反者应用BuffID,
            this.弹反设置?.攻击者应用BuffID,
            this.弹反设置?.受击动画忽略Buff检测,
            this.弹反设置?.检测Buff列表,
            this.弹反设置?.ANS期间被弹反者生效的BuffID,
            this.弹反设置?.结束事件Tag,
            this.弹反设置?.QTE弹刀忽略角度距离检测,
          )),
          this.弹反摄像机预设 &&
            ((t.无弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData),
            (t.无弹反动作效果.攻击者顿帧 =
              this.弹反摄像机预设.AttackerTimeScale),
            (t.无弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale),
            (t.无弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake),
            (t.有弹反动作效果.摄像机设置 = this.弹反摄像机预设.CameraData),
            (t.有弹反动作效果.攻击者顿帧 =
              this.弹反摄像机预设.AttackerTimeScale),
            (t.有弹反动作效果.被击者顿帧 = this.弹反摄像机预设.VictimTimeScale),
            (t.有弹反动作效果.震屏 = this.弹反摄像机预设.CameraShake)),
          this.弹反特效预设 &&
            ((t.无弹反动作效果.特效DA = this.弹反特效预设.EffectDA),
            (t.无弹反动作效果.特效Offset = this.弹反特效预设.Offset),
            (t.无弹反动作效果.特效Scale = this.弹反特效预设.Scale),
            (t.有弹反动作效果.特效DA = this.弹反特效预设.EffectDA),
            (t.有弹反动作效果.特效Offset = this.弹反特效预设.Offset),
            (t.有弹反动作效果.特效Scale = this.弹反特效预设.Scale)),
          i.SetCounterAttackInfo(t),
          i.SetCounterAttackEndTime(e),
          !0
        );
      i.SetCounterAttackInfo(this.弹反设置), i.SetCounterAttackEndTime(e);
    }
    return !0;
  }
  K2_NotifyEnd(t, i) {
    var e = t.GetOwner();
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Battle", 20, "CounterAttack End", [
          "Owner",
          e?.GetName(),
        ]),
      e instanceof TsBaseCharacter_1.default)
    ) {
      var s = e.CharacterActorComponent?.Entity;
      if (!s?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "CounterAttack End entity not valid",
              ["Owner", e?.GetName()],
            ),
          !1
        );
      var r = s.GetComponent(39),
        s = s.GetComponent(60);
      if (!r?.Valid || !s?.Valid)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              20,
              "CounterAttack End skillComp or hitComp not valid",
              ["Owner", e?.GetName()],
              ["SkillComp", r?.Valid],
              ["HitComp", s?.Valid],
            ),
          !1
        );
      var h = s.IsTriggerCounterAttack;
      if ((s.CounterAttackEnd(), !h)) {
        if (FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID)) return !1;
        BulletUtil_1.BulletUtil.CreateBulletFromAN(
          e,
          this.生成子弹ID.toString(),
          void 0,
          r.GetCurrentMontageCorrespondingSkillId().toString(),
          !1,
          this.AnMessageId,
        );
      }
      return !0;
    }
    return (
      FNameUtil_1.FNameUtil.IsNothing(this.生成子弹ID) ||
        (2 !==
          (s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(
            e.GetWorld(),
          )) &&
          4 !== s) ||
        ((h = UE.KismetSystemLibrary.GetOuterObject(this)),
        (r = UE.KismetSystemLibrary.GetPathName(h)),
        UE.BPL_BulletPreview_C.ShowBulletPreview(
          r,
          this.生成子弹ID,
          e,
          t,
          e.GetWorld(),
          void 0,
        )),
      !1
    );
  }
  GetNotifyName() {
    return "弹反配置";
  }
}
exports.default = TsAnimNotifyStateCounterAttack;
//# sourceMappingURL=TsAnimNotifyStateCounterAttack.js.map
