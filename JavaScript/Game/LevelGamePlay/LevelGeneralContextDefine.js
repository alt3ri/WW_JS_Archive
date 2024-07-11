"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralLogicTreeContext =
    exports.PlotContext =
    exports.GmLevelActionContext =
    exports.GuaranteeContext =
    exports.TriggerContext =
    exports.InstanceDungeonContext =
    exports.LevelPlayContext =
    exports.QuestContext =
    exports.EntityContext =
    exports.GeneralContext =
      void 0);
class GeneralContext {
  constructor() {
    (this.Type = void 0), (this.SubType = void 0), (this.DUe = !1);
  }
  Reset() {
    this.SubType = void 0;
  }
  static GetObj(t, e, n) {
    let s = void 0,
      r = GeneralContext.RUe.get(t);
    return (
      r || ((r = []), GeneralContext.RUe.set(t, r)),
      0 < r.length ? ((s = r.pop()).DUe = !1) : (s = new n()),
      (s.SubType = e),
      s
    );
  }
  Release() {
    if ((this.Reset(), !this.DUe)) {
      let t = GeneralContext.RUe.get(this.Type);
      t || ((t = []), GeneralContext.RUe.set(this.Type, t)),
        t.push(this),
        (this.DUe = !0);
    }
  }
  static Copy(e) {
    if (e) {
      let t = void 0;
      switch (e.Type) {
        case 2:
          t = QuestContext.Create(e.QuestId, e.SubType);
          break;
        case 3:
          t = LevelPlayContext.Create(e.LevelPlayId, e.SubType);
          break;
        case 1:
          t = EntityContext.Create(e.EntityId, e.SubType);
          break;
        case 4:
          t = InstanceDungeonContext.Create(e.InstanceDungeonId, e.SubType);
          break;
        case 5:
          t = TriggerContext.Create(
            e.TriggerEntityId,
            e.OtherEntityId,
            e.SubType,
          );
          break;
        case 6:
          t = GeneralLogicTreeContext.Create(
            e.BtType,
            e.TreeIncId,
            e.TreeConfigId,
            e.NodeId,
            e.SubType,
          );
          break;
        case 7:
          t = TriggerContext.Create(e.SubType);
      }
      return t;
    }
  }
}
(exports.GeneralContext = GeneralContext).RUe = new Map();
class EntityContext extends GeneralContext {
  constructor() {
    super(), (this.EntityId = 0), (this.Type = 1);
  }
  Reset() {
    this.EntityId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(1, e, EntityContext);
    return (e.EntityId = t), e;
  }
}
exports.EntityContext = EntityContext;
class QuestContext extends GeneralContext {
  constructor() {
    super(), (this.QuestId = 0), (this.Type = 2);
  }
  Reset() {
    this.QuestId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(2, e, QuestContext);
    return (e.QuestId = t), e;
  }
}
exports.QuestContext = QuestContext;
class LevelPlayContext extends GeneralContext {
  constructor() {
    super(), (this.LevelPlayId = 0), (this.Type = 3);
  }
  Reset() {
    this.LevelPlayId = 0;
  }
  static Create(t = 0, e) {
    e = GeneralContext.GetObj(3, e, LevelPlayContext);
    return (e.LevelPlayId = t), e;
  }
}
exports.LevelPlayContext = LevelPlayContext;
class InstanceDungeonContext extends GeneralContext {
  constructor() {
    super(), (this.InstanceDungeonId = 0), (this.Type = 4);
  }
  Reset() {
    this.InstanceDungeonId = 0;
  }
  static Create(t = 0, e, n) {
    n = GeneralContext.GetObj(4, n, InstanceDungeonContext);
    return (n.InstanceDungeonId = t), n;
  }
}
exports.InstanceDungeonContext = InstanceDungeonContext;
class TriggerContext extends GeneralContext {
  constructor() {
    super(),
      (this.TriggerEntityId = 0),
      (this.OtherEntityId = 0),
      (this.Type = 5);
  }
  static Create(t = 0, e = 0, n) {
    n = GeneralContext.GetObj(5, n, TriggerContext);
    return (n.TriggerEntityId = t), (n.OtherEntityId = e), n;
  }
}
exports.TriggerContext = TriggerContext;
class GuaranteeContext extends GeneralContext {
  constructor() {
    super(), (this.Type = 7);
  }
  static Create(t) {
    return GeneralContext.GetObj(7, t, GuaranteeContext);
  }
}
exports.GuaranteeContext = GuaranteeContext;
class GmLevelActionContext extends GeneralContext {
  constructor() {
    super(), (this.Type = 8);
  }
  Reset() {}
  static Create(t) {
    return GeneralContext.GetObj(8, t, GmLevelActionContext);
  }
}
exports.GmLevelActionContext = GmLevelActionContext;
class PlotContext extends GeneralContext {
  constructor() {
    super(), (this.FlowIncId = 0), (this.Type = 9);
  }
  Reset() {
    this.FlowIncId = 0;
  }
  static Create(t, e) {
    e = GeneralContext.GetObj(8, e, PlotContext);
    return (e.FlowIncId = t), e;
  }
}
exports.PlotContext = PlotContext;
class GeneralLogicTreeContext extends GeneralContext {
  constructor() {
    super(),
      (this.TreeIncId = void 0),
      (this.TreeConfigId = 0),
      (this.NodeId = 0),
      (this.BtType = 0),
      (this.Type = 6);
  }
  Reset() {
    (this.TreeIncId = BigInt(0)), (this.NodeId = 0);
  }
  static Create(t, e = BigInt(0), n = 0, s = 0, r) {
    r = GeneralContext.GetObj(6, r, GeneralLogicTreeContext);
    return (
      (r.BtType = t), (r.TreeIncId = e), (r.TreeConfigId = n), (r.NodeId = s), r
    );
  }
}
exports.GeneralLogicTreeContext = GeneralLogicTreeContext;
//# sourceMappingURL=LevelGeneralContextDefine.js.map
