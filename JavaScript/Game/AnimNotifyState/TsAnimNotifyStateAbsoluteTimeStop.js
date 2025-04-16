"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatMessage_1 = require("../Module/CombatMessage/CombatMessage"),
  CharacterUtils_1 = require("../NewWorld/Character/CharacterUtils"),
  CombatLog_1 = require("../Utils/CombatLog");
class TsAnimNotifyStateAbsoluteTimeStop extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.副本计时停止 = !1),
      (this.角色战斗机制停止 = !0),
      (this.怪物战斗机制停止 = !0),
      (this.是否冻结移动效果 = !0);
  }
  Constructor() {}
  K2_NotifyBegin(e, r, t) {
    e = e.GetOwner();
    if (!(e instanceof TsBaseCharacter_1.default)) return !1;
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti) return !1;
    var o = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(
      e.CharacterActorComponent?.Entity,
    );
    if (!o || !o.Valid || !o.Entity) return !1;
    if (
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        o,
      )
    )
      return !1;
    var a = o.Entity.GetComponent(0),
      s = o.Entity.GetComponent(3);
    if (
      !(
        !!a?.IsRole() ||
        4 === s?.CreatureData.GetBaseInfo()?.Category.MonsterMatchType
      )
    )
      return (
        CombatLog_1.CombatLog.Error(
          "Actor",
          o.Entity,
          "只有角色才能使用动画和子弹冻结功能",
        ),
        !1
      );
    ControllerHolder_1.ControllerHolder.TimeController.AddLock(
      o,
      this.是否冻结移动效果,
    );
    a = Protocol_1.Aki.Protocol.Qe_.create();
    return (
      (a.o5n = !0),
      (a.n5n = t * TimeUtil_1.TimeUtil.InverseMillisecond),
      CombatMessage_1.CombatNet.Send(
        28789,
        e.CharacterActorComponent.Entity,
        a,
      ),
      !0
    );
  }
  K2_NotifyEnd(e, r) {
    var t,
      e = e?.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((t = ModelManager_1.ModelManager.CharacterModel?.GetHandleByEntity(
        e.CharacterActorComponent?.Entity,
      ))?.Valid &&
        ControllerHolder_1.ControllerHolder.TimeController.RemoveLock(t),
      ((t = Protocol_1.Aki.Protocol.Qe_.create()).o5n = !1),
      (t.n5n = 0),
      CombatMessage_1.CombatNet.Send(
        28789,
        e.CharacterActorComponent.Entity,
        t,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "动画和子弹冻结";
  }
}
exports.default = TsAnimNotifyStateAbsoluteTimeStop;
//# sourceMappingURL=TsAnimNotifyStateAbsoluteTimeStop.js.map
