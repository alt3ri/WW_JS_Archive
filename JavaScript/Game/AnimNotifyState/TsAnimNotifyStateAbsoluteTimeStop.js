"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
  BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
class TsAnimNotifyStateAbsoluteTimeStop extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.副本计时停止 = !1),
      (this.角色战斗机制停止 = !0),
      (this.怪物战斗机制停止 = !0),
      (this.是否冻结移动效果 = !0);
  }
  K2_NotifyBegin(e, t, o) {
    var r = e.GetOwner();
    if (!(r instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    var e = r.CharacterActorComponent?.Entity,
      s = e?.GetComponent(164);
    if (!e || !s) return !1;
    s.AddDelayLock("ANS AbsoluteTimeStop Role");
    var i,
      a,
      l = e.GetComponent(0);
    for (const u of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
      u.IsInit &&
        u.Entity.Active &&
        ((i = u.Entity.GetComponent(3)?.Actor),
        (a = u.Entity.GetComponent(0).GetSummonerId()),
        i) &&
        i !== r &&
        a !== l?.GetCreatureDataId() &&
        (u.Entity.GetComponent(109)?.AddPauseLock(
          "ANS AbsoluteTimeStop monster",
        ),
        this.是否冻结移动效果 &&
          u.Entity.GetComponent(37)?.AddPauseLock(
            "ANS AbsoluteTimeStop monster",
          ),
        BulletUtil_1.BulletUtil.FrozenCharacterBullet(u.Id),
        s.TimeStopEntitySet.add(u));
    e = Protocol_1.Aki.Protocol.I4n.create();
    return (
      (e.$4n = !0),
      (e.Y4n = o * TimeUtil_1.TimeUtil.InverseMillisecond),
      CombatMessage_1.CombatNet.Call(
        28342,
        r.CharacterActorComponent.Entity,
        e,
      ),
      !0
    );
  }
  K2_NotifyEnd(e, t) {
    e = e?.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (e.CharacterActorComponent?.Entity?.Valid) {
      var o = e.CharacterActorComponent.Entity.GetComponent(164);
      o.RemoveDelayLock("ANS AbsoluteTimeStop Role");
      for (const r of o.TimeStopEntitySet)
        r.Valid &&
          (r.Entity.GetComponent(109)?.RemovePauseLock(
            "ANS AbsoluteTimeStop monster",
          ),
          this.是否冻结移动效果 &&
            r.Entity.GetComponent(37)?.RemovePauseLock(
              "ANS AbsoluteTimeStop monster",
            ),
          BulletUtil_1.BulletUtil.UnFrozenCharacterBullet(r.Id));
      o.TimeStopEntitySet.clear();
    }
    o = Protocol_1.Aki.Protocol.I4n.create();
    return (
      (o.$4n = !1),
      (o.Y4n = 0),
      CombatMessage_1.CombatNet.Call(
        28342,
        e.CharacterActorComponent.Entity,
        o,
      ),
      !0
    );
  }
  GetNotifyName() {
    return "动画和子弹冻结";
  }
}
exports.default = TsAnimNotifyStateAbsoluteTimeStop;
//# sourceMappingURL=TsAnimNotifyStateAbsoluteTimeStop.js.map
