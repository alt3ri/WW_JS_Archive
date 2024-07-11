"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillCdModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PassiveSkillCdData_1 = require("./SkillCd/PassiveSkillCdData"),
  SkillCdData_1 = require("./SkillCd/SkillCdData");
class SkillCdModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.dQe = new SkillCdData_1.WorldSkillCdData()),
      (this.CQe = new PassiveSkillCdData_1.WorldPassiveSkillCdData()),
      (this.gQe = new SkillCdData_1.WorldSkillCdData()),
      (this.fQe = new PassiveSkillCdData_1.WorldPassiveSkillCdData());
  }
  OnInit() {
    return !0;
  }
  OnLeaveLevel() {
    return this.gQe.Clear(), this.fQe.Clear(), !0;
  }
  OnClear() {
    return (
      this.dQe.Clear(), this.CQe.Clear(), this.gQe.Clear(), this.fQe.Clear(), !0
    );
  }
  Tick(e) {
    this.dQe.Tick(e), this.CQe.Tick(e), this.gQe.Tick(e), this.fQe.Tick(e);
  }
  GetCurWorldSkillCdData() {
    return this.pQe() ? this.dQe : this.gQe;
  }
  GetCurWorldPassiveSkillCdData() {
    return this.pQe() ? this.CQe : this.fQe;
  }
  HandlePlayerSkillInfoPbNotify(e) {
    this.dQe.HandlePlayerSkillInfoPbNotify(e);
  }
  HandlePassiveSkillNotify(e) {
    this.CQe.HandlePassiveSkillNotify(e);
  }
  pQe() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (
      0 !== e &&
      0 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          .ShareAttri
    )
      return !1;
    return !0;
  }
  GetGroupSkillCdInfoBySkillId(e, i) {
    var a = this.GetCurWorldSkillCdData();
    let t = a.AllShareSkillCdData;
    var l = t.SkillId2GroupIdMap.get(i);
    return l ||
      ((t = a.EntitySkillCdMap.get(e)) && (l = t.SkillId2GroupIdMap.get(i)))
      ? t.GroupSkillCdInfoMap.get(l)
      : void 0;
  }
}
exports.SkillCdModel = SkillCdModel;
//# sourceMappingURL=SkillCdModel.js.map
