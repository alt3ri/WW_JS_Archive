"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const collisionDisableHandleMap = new Map();
class TsAnimNotifyStateSimpleDisableCollision extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(a, e, i) {
    let s = a.GetOwner();
    if (s instanceof TsBaseCharacter_1.default) {
      s = s.CharacterActorComponent.DisableCollision(
        "TsAnimNotifyStateSimpleDisableCollision.K2_NotifyBegin",
      );
      let e = collisionDisableHandleMap.get(a);
      e || ((e = new Map()), collisionDisableHandleMap.set(a, e)),
        e.set(this, s);
    }
    return !0;
  }
  K2_NotifyEnd(e, a) {
    const i = e.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      const s = collisionDisableHandleMap.get(e);
      if (s) {
        const l = s.get(this);
        if (!l) return !0;
        ModelManager_1.ModelManager.CharacterModel.GetHandle(i.EntityId)
          ?.Valid && i.CharacterActorComponent.EnableCollision(l),
          s.delete(this),
          s.size || collisionDisableHandleMap.delete(e);
      }
    }
    return !0;
  }
  GetNotifyName() {
    return "设置Actor碰撞";
  }
}
exports.default = TsAnimNotifyStateSimpleDisableCollision;
// # sourceMappingURL=TsAnimNotifyStateSimpleDisableCollision.js.map
