"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EndSkillInfo = void 0);
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
class EndSkillInfo {
  constructor() {
    (this.Reason = Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_Default),
      (this.EntityId = 0),
      (this.SkillId = 0),
      (this.BulletId = 0);
  }
  Reset() {
    (this.Reason = Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_Default),
      (this.EntityId = 0),
      (this.SkillId = 0),
      (this.BulletId = 0);
  }
}
exports.EndSkillInfo = EndSkillInfo;
//# sourceMappingURL=EndSkillInfo.js.map
