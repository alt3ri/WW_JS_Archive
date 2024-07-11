"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TowerDetailData_1 = require("./TowerDetailData");
class TowerDetailModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectDetailId = 0),
      (this.TowerTitle = ""),
      (this.SwitchButtonIndex = 0),
      (this.SwitchData = new Array()),
      (this.IQ = new Map()),
      (this.VLo = new Map());
  }
  AddSwitchData(e, t) {
    var s = new TowerDetailData_1.TowerSwitchData();
    (s.Index = e),
      (s.Name = t),
      this.IQ.set(s, new Array()),
      this.VLo.set(s, new Array()),
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
        e.Index === t && this.VLo.get(e).push(a);
      });
  }
  GetMonsters(e) {
    return this.VLo.get(e);
  }
  Reset() {
    (this.IQ = new Map()),
      (this.VLo = new Map()),
      (this.SwitchData = new Array());
  }
}
exports.TowerDetailModel = TowerDetailModel;
//# sourceMappingURL=TowerDetailModel.js.map
