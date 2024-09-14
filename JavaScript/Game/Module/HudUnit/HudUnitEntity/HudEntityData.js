"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudEntityData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ObjectSystem_1 = require("../../../../Core/Object/ObjectSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  CharacterController_1 = require("../../../NewWorld/Character/CharacterController");
class HudEntityData {
  constructor() {
    (this.Jh = void 0),
      (this.mPt = new Map()),
      (this.NYe = []),
      (this.eoi = void 0),
      (this.toi = (t, e) => {
        this.eoi && this.eoi(this, e);
      });
  }
  Initialize(t) {
    this.Jh = t;
  }
  Destroy() {
    (this.Jh = void 0),
      this.mPt.clear(),
      (this.eoi = void 0),
      this.ClearAllTagCountChangedCallback();
  }
  SetComponent(t) {
    var e = this.Jh.GetComponent(t);
    this.mPt.set(t, e);
  }
  GetComponent(t) {
    t = this.mPt.get(t);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "HudUnit",
            8,
            "获取Hud实体数据时，找不到实体对应组件，请在初始化时调用SetComponent记录对应组件",
          )),
      t
    );
  }
  IsValid() {
    return (
      !!ObjectSystem_1.ObjectSystem.IsValid(this.Jh) &&
      !!CharacterController_1.CharacterController.GetCharacter(this.Jh)
    );
  }
  GetId() {
    return this.Jh.Id;
  }
  ListenForTagCountChanged(t, e) {
    var r = this.GetComponent(190);
    r &&
      ((this.eoi = e),
      (e = r.ListenForTagAddOrRemove(t, this.toi)),
      this.NYe.push(e));
  }
  ClearAllTagCountChangedCallback() {
    if (this.NYe) {
      for (const t of this.NYe) t.EndTask();
      this.NYe.length = 0;
    }
  }
  ContainsTagById(t) {
    return this.GetComponent(190).HasTag(t);
  }
  GetLocationProxy() {
    return this.GetComponent(1).ActorLocationProxy;
  }
  GetLocation() {
    return this.GetComponent(1).ActorLocation;
  }
  GetMonsterMatchType() {
    return this.GetComponent(0).GetMonsterMatchType();
  }
  GetMonsterMatchTypeNumber() {
    var t = this.GetMonsterMatchType();
    return t || 0;
  }
  GetDistanceSquaredTo(t) {
    var e = this.GetLocationProxy();
    return Vector_1.Vector.DistSquared(t, e);
  }
}
exports.HudEntityData = HudEntityData;
//# sourceMappingURL=HudEntityData.js.map
