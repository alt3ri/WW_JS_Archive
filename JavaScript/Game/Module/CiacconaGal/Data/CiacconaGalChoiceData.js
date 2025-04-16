"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChoiceData = void 0);
class CiacconaGalChoiceData {
  constructor(t) {
    (this.Lo = t), (this.i4c = !0), (this.r4c = !1), (this.o4c = !0);
  }
  get Id() {
    return this.Lo.Id;
  }
  get Content() {
    return this.Lo.Content;
  }
  get RequiredInspiration() {
    return this.Lo.RequiredInspiration;
  }
  get NeedInspiration() {
    return 0 < this.Lo.RequiredInspiration;
  }
  get IsAvailable() {
    return 0 === this.State;
  }
  get State() {
    return this.vbc ? (this.ybc ? (this.Sbc ? 3 : 0) : 1) : 2;
  }
  get ToStepId() {
    return this.Lo.ToStep;
  }
  get CorrSubEndingId() {
    return this.Lo.CorrSubEnding;
  }
  get Sbc() {
    return this.r4c;
  }
  get ybc() {
    return !this.NeedInspiration || this.i4c;
  }
  get vbc() {
    return this.o4c;
  }
  UpdateByServerData(t) {
    for (const e of t.h3c)
      if (e.l3c === this.Id) {
        (this.i4c = e._3c), (this.o4c = e.c3c);
        break;
      }
    this.r4c = t.a3c.some((t) => t.u3c === this.CorrSubEndingId && t.a3_);
  }
}
exports.CiacconaGalChoiceData = CiacconaGalChoiceData;
//# sourceMappingURL=CiacconaGalChoiceData.js.map
