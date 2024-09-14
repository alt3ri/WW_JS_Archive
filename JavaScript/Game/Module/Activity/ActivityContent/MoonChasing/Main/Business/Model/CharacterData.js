"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterData = void 0);
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
class CharacterData {
  constructor(t) {
    (this.Id = t),
      (this.kke = 0),
      (this.Fke = 0),
      (this.ValueInterval = 0),
      (this.Dga = !1);
    t = ConfigManager_1.ConfigManager.BusinessConfig.GetRoleCharacterMax();
    this.Fke = t;
  }
  SetCurrentValue(t) {
    (this.ValueInterval = t - this.kke), (this.kke = t);
  }
  get CurrentValue() {
    return this.kke;
  }
  SetMaxValue(t) {
    this.Fke = t;
  }
  get MaxValue() {
    return this.Fke;
  }
  SetUseScoreName(t) {
    this.Dga = t;
  }
  get UseScoreName() {
    return this.Dga;
  }
}
exports.CharacterData = CharacterData;
//# sourceMappingURL=CharacterData.js.map
