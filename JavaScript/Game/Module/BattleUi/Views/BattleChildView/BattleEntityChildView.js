"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleEntityChildView = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const BattleChildView_1 = require("./BattleChildView");
class BattleEntityChildView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Jh = void 0),
      (this.T$e = new Map()),
      (this.L$e = []),
      (this.jQe = []),
      (this.D$e = []);
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
    this.R$e(t), this.U$e(), this.A$e(), this.P$e();
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
    t = t.GetComponent(156);
    t && (t.AddListener(e, i), this.T$e.set(e, i));
  }
  RemoveListenAttributeChanged(t, e, i) {
    t = t.GetComponent(156);
    t && (t.RemoveListener(e, i), this.T$e.delete(e));
  }
  R$e(t) {
    const e = t.GetComponent(156);
    if (e) for (const [i, s] of this.T$e) e.RemoveListener(i, s);
  }
  ListenForTagCountChanged(e, i, s) {
    e = e.GetComponent(185);
    if (e) {
      let t = void 0;
      typeof i === "number"
        ? (t = i)
        : typeof i === "string" &&
          (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
      i = e.ListenForTagAnyCountChanged(t, s);
      this.L$e.push(i);
    }
  }
  U$e() {
    if (this.L$e) {
      for (const t of this.L$e) t.EndTask();
      this.L$e.length = 0;
    }
  }
  ListenForTagSignificantChanged(t, e, i) {
    var t = t.GetComponent(185);
    t && ((t = t.ListenForTagAddOrRemove(e, i)), this.jQe.push(t));
  }
  ListenForTagAddNewOrRemovedWithTag(t, e, i, s) {
    t = t.ListenForTagAddOrRemove(e, i, s);
    this.jQe.push(t);
  }
  A$e() {
    if (this.jQe) {
      for (const t of this.jQe) t.EndTask();
      this.jQe.length = 0;
    }
  }
  P$e() {
    if (this.D$e) {
      for (const t of this.D$e) t.EndTask();
      this.D$e.length = 0;
    }
  }
}
exports.BattleEntityChildView = BattleEntityChildView;
// # sourceMappingURL=BattleEntityChildView.js.map
