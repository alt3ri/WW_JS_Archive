"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalRewardData = void 0);
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById");
class CiacconaGalRewardData {
  constructor(e) {
    (this.Lo = e), (this.sJh = !1), (this.s4c = !1);
  }
  get Id() {
    return this.Lo.Id;
  }
  get ActivityId() {
    return this.Lo.ActivityId;
  }
  get RewardId() {
    return this.Lo.RewardId;
  }
  get RewardItemDataList() {
    var e,
      t,
      r = [],
      a = DropPackageById_1.configDropPackageById.GetConfig(this.RewardId);
    if (a) for ([e, t] of a.DropPreview) r.push([{ ItemId: e, IncId: 0 }, t]);
    return r;
  }
  get Title() {
    return this.Lo.Title;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get CanReceive() {
    return this.s4c;
  }
  get IsReceived() {
    return this.sJh;
  }
  UpdateByServerData(e) {
    (this.s4c = e.m3c), (this.sJh = e.d3c);
  }
}
exports.CiacconaGalRewardData = CiacconaGalRewardData;
//# sourceMappingURL=CiacconaGalRewardData.js.map
