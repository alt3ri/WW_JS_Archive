"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const TimeUtil_1 = require("../Common/TimeUtil");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatMessage_1 = require("../Module/CombatMessage/CombatMessage");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateAbsoluteTimeStop extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.副本计时停止 = !1),
      (this.角色战斗机制停止 = !0),
      (this.怪物战斗机制停止 = !0);
  }
  K2_NotifyBegin(e, t, r) {
    const o = e.GetOwner();
    if (!(o instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    var e = o.CharacterActorComponent?.Entity;
    const a = e?.GetComponent(162);
    if (!e || !a) return !1;
    a.ResetTimeScale();
    let s;
    let i;
    const l = e.GetComponent(0);
    for (const n of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      n.IsInit &&
        n.Entity.Active &&
        ((s = n.Entity.GetComponent(3)?.Actor),
        (i = n.Entity.GetComponent(0).GetSummonerId()),
        s) &&
        s !== o &&
        i !== l?.GetCreatureDataId() &&
        (n.Entity?.GetComponent(107)?.AddPauseLock(
          "ANS AbsoluteTimeStop monster",
        ),
        BulletUtil_1.BulletUtil.FrozenCharacterBullet(n.Id),
        a.TimeStopEntitySet.add(n));
    e = Protocol_1.Aki.Protocol.XNn.create();
    return (
      (e.Mkn = !0),
      (e.Skn = r * TimeUtil_1.TimeUtil.InverseMillisecond),
      CombatMessage_1.CombatNet.Call(7807, o.CharacterActorComponent.Entity, e),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    if (e.CharacterActorComponent?.Entity?.Valid) {
      var r = e.CharacterActorComponent.Entity.GetComponent(162);
      for (const o of r.TimeStopEntitySet)
        o.Valid &&
          (o.Entity?.GetComponent(107)?.RemovePauseLock(
            "ANS AbsoluteTimeStop monster",
          ),
          BulletUtil_1.BulletUtil.UnFrozenCharacterBullet(o.Id));
      r.TimeStopEntitySet.clear();
    }
    r = Protocol_1.Aki.Protocol.XNn.create();
    return (
      (r.Mkn = !1),
      (r.Skn = 0),
      CombatMessage_1.CombatNet.Call(7807, e.CharacterActorComponent.Entity, r),
      !0
    );
  }
  GetNotifyName() {
    return "动画和子弹冻结";
  }
}
exports.default = TsAnimNotifyStateAbsoluteTimeStop;
// # sourceMappingURL=TsAnimNotifyStateAbsoluteTimeStop.js.map
