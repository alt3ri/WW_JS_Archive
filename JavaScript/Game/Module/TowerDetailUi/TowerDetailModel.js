"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TowerDetailData_1 = require("./TowerDetailData");
class TowerDetailModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectDetailId = 0),
      (this.TowerTitle = ""),
      (this.SwitchButtonIndex = 0),
      (this.SwitchData = new Array()),
      (this.IQ = new Map()),
      (this.WTo = new Map());
  }
  AddSwitchData(e, t) {
    const s = new TowerDetailData_1.TowerSwitchData();
    (s.Index = e),
      (s.Name = t),
      this.IQ.set(s, new Array()),
      this.WTo.set(s, new Array()),
      this.SwitchData.push(s);
  }
  AddBuff(t, e, s, r) {
    const a = new TowerDetailData_1.TowerDetailBuffData();
    (a.Buffs = e),
      (a.Title = s),
      (a.Priority = r),
      this.SwitchData.forEach((e) => {
        e.Index === t && this.IQ.get(e).push(a);
      });
  }
  GetBuffs(e) {
    return this.IQ.get(e);
  }
  AddMonster(t, e, s, r) {
    const a = new TowerDetailData_1.TowerDetailMonsterData();
    (a.Title = s),
      (a.MonsterInfos = e),
      (a.Priority = r),
      this.SwitchData.forEach((e) => {
        e.Index === t && this.WTo.get(e).push(a);
      });
  }
  GetMonsters(e) {
    return this.WTo.get(e);
  }
  Reset() {
    (this.IQ = new Map()),
      (this.WTo = new Map()),
      (this.SwitchData = new Array());
  }
}
exports.TowerDetailModel = TowerDetailModel;
// # sourceMappingURL=TowerDetailModel.js.map
