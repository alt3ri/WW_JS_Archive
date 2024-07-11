"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillCdModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const PassiveSkillCdData_1 = require("./SkillCd/PassiveSkillCdData");
const SkillCdData_1 = require("./SkillCd/SkillCdData");
class SkillCdModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.iKe = new SkillCdData_1.WorldSkillCdData()),
      (this.oKe = new PassiveSkillCdData_1.WorldPassiveSkillCdData()),
      (this.rKe = new SkillCdData_1.WorldSkillCdData()),
      (this.nKe = new PassiveSkillCdData_1.WorldPassiveSkillCdData());
  }
  OnInit() {
    return !0;
  }
  OnLeaveLevel() {
    return this.rKe.Clear(), this.nKe.Clear(), !0;
  }
  OnClear() {
    return (
      this.iKe.Clear(), this.oKe.Clear(), this.rKe.Clear(), this.nKe.Clear(), !0
    );
  }
  Tick(e) {
    this.iKe.Tick(e), this.oKe.Tick(e), this.rKe.Tick(e), this.nKe.Tick(e);
  }
  GetCurWorldSkillCdData() {
    return this.sKe() ? this.iKe : this.rKe;
  }
  GetCurWorldPassiveSkillCdData() {
    return this.sKe() ? this.oKe : this.nKe;
  }
  HandlePlayerSkillInfoPbNotify(e) {
    this.iKe.HandlePlayerSkillInfoPbNotify(e);
  }
  HandlePassiveSkillNotify(e) {
    this.oKe.HandlePassiveSkillNotify(e);
  }
  sKe() {
    const e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (
      e !== 0 &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        .ShareAttri === 0
    )
      return !1;
    return !0;
  }
  GetGroupSkillCdInfoBySkillId(e, i) {
    const a = this.GetCurWorldSkillCdData();
    let t = a.AllShareSkillCdData;
    let l = t.SkillId2GroupIdMap.get(i);
    return l ||
      ((t = a.EntitySkillCdMap.get(e)) && (l = t.SkillId2GroupIdMap.get(i)))
      ? t.GroupSkillCdInfoMap.get(l)
      : void 0;
  }
}
exports.SkillCdModel = SkillCdModel;
// # sourceMappingURL=SkillCdModel.js.map
