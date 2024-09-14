"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleEntityChildView = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  BattleChildView_1 = require("./BattleChildView");
class BattleEntityChildView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Jh = void 0),
      (this.GYe = new Map()),
      (this.NYe = []),
      (this.i$e = []),
      (this.OYe = []);
  }
  Reset() {
    this.Deactivate(this.Jh), super.Reset();
  }
  Reactivate(t) {
    ObjectSystem_1.ObjectSystem.IsValid(t) &&
      (this.IsValid()
        ? this.GetEntityId() !== t.Id &&
          (this.Deactivate(this.GetEntity()), this.Activate(t))
        : this.Activate(t));
  }
  Activate(t) {
    ObjectSystem_1.ObjectSystem.IsValid(t) &&
      ((this.Jh = t), this.OnActivate(), this.AddEntityEvents(t));
  }
  Deactivate(t) {
    ObjectSystem_1.ObjectSystem.IsValid(t) &&
      (ObjectSystem_1.ObjectSystem.IsValid(this.Jh)
        ? this.GetEntityId() !== t.Id
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 8, "在休眠时，休眠实体不是当前实体")
          : (this.RemoveEntityEvents(t),
            this.OnDeactivate(),
            (this.Jh = void 0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            8,
            "在休眠时，当前实体不存在，请先调用Activate",
          ));
  }
  OnActivate() {}
  OnDeactivate() {}
  AddEntityEvents(t) {}
  RemoveEntityEvents(t) {
    this.kYe(t), this.FYe(), this.VYe(), this.HYe();
  }
  GetEntity() {
    return this.Jh;
  }
  GetEntityId() {
    return this.Jh?.Id;
  }
  IsValid() {
    return ObjectSystem_1.ObjectSystem.IsValid(this.Jh);
  }
  ListenForAttributeChanged(t, e, i) {
    t = t.GetComponent(159);
    t && (t.AddListener(e, i), this.GYe.set(e, i));
  }
  RemoveListenAttributeChanged(t, e, i) {
    t = t.GetComponent(159);
    t && (t.RemoveListener(e, i), this.GYe.delete(e));
  }
  kYe(t) {
    var e = t.GetComponent(159);
    if (e) for (var [i, s] of this.GYe) e.RemoveListener(i, s);
  }
  ListenForTagCountChanged(e, i, s) {
    e = e.GetComponent(190);
    if (e) {
      let t = void 0;
      "number" == typeof i
        ? (t = i)
        : "string" == typeof i &&
          (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
      i = e.ListenForTagAnyCountChanged(t, s);
      this.NYe.push(i);
    }
  }
  FYe() {
    if (this.NYe) {
      for (const t of this.NYe) t.EndTask();
      this.NYe.length = 0;
    }
  }
  ListenForTagSignificantChanged(t, e, i) {
    var t = t.GetComponent(190);
    t && ((t = t.ListenForTagAddOrRemove(e, i)), this.i$e.push(t));
  }
  ListenForTagAddNewOrRemovedWithTag(t, e, i, s) {
    t = t.ListenForTagAddOrRemove(e, i, s);
    this.i$e.push(t);
  }
  VYe() {
    if (this.i$e) {
      for (const t of this.i$e) t.EndTask();
      this.i$e.length = 0;
    }
  }
  HYe() {
    if (this.OYe) {
      for (const t of this.OYe) t.EndTask();
      this.OYe.length = 0;
    }
  }
}
exports.BattleEntityChildView = BattleEntityChildView;
//# sourceMappingURL=BattleEntityChildView.js.map
