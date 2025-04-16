"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbInteractOption_1 = require("../Action/FbInteractOption"),
  FbPlayFlow_1 = require("../Action/FbPlayFlow"),
  FbInteractSectorRange_1 = require("./FbInteractSectorRange"),
  FbRandomInteract_1 = require("./FbRandomInteract"),
  UnionInteractAdditionalInfoHelper_1 = require("./UnionInteractAdditionalInfoHelper"),
  UnionInteractPlayerDiractionOptionHelper_1 = require("./UnionInteractPlayerDiractionOptionHelper"),
  UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbInteractComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.uDh = !1),
      (this.dDh = void 0),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.mDh = !1),
      (this.CDh = 0),
      (this.y_h = !1),
      (this.S_h = void 0),
      (this.gDh = !1),
      (this.fDh = void 0),
      (this.pDh = !1),
      (this.vDh = void 0),
      (this.ugh = !1),
      (this.dgh = void 0),
      (this.yDh = !1),
      (this.SDh = void 0),
      (this.MDh = !1),
      (this.EDh = void 0),
      (this.IDh = !1),
      (this.TDh = void 0),
      (this.bDh = !1),
      (this.LDh = void 0),
      (this.ADh = !1),
      (this.xDh = !1),
      (this.RDh = !1),
      (this.wDh = !1),
      (this.PDh = !1),
      (this.UDh = void 0),
      (this.C_h = !1),
      (this.g_h = void 0),
      (this.DDh = !1),
      (this.BDh = void 0),
      (this.qDh = !1),
      (this.PAe = void 0),
      (this.LJl = !1),
      (this.AJl = void 0);
  }
  static Create(t) {
    if (t) return new FbInteractComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get QuestIds() {
    if (!this.uDh) {
      (this.uDh = !0), (this.dDh = new Array());
      var i = this.FbDataInternal.questIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.dDh.push(this.FbDataInternal.questIds(t));
    }
    return this.dDh;
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get ExitRange() {
    return (
      this.mDh ||
        ((this.mDh = !0), (this.CDh = this.FbDataInternal.exitRange())),
      this.CDh
    );
  }
  get DoIntactType() {
    return (
      this.y_h ||
        ((this.y_h = !0), (this.S_h = this.FbDataInternal.doIntactType())),
      this.S_h
    );
  }
  get SectorRange() {
    return (
      this.gDh ||
        ((this.gDh = !0),
        (this.fDh = FbInteractSectorRange_1.FbInteractSectorRange.Create(
          this.FbDataInternal.sectorRange(),
        ))),
      this.fDh
    );
  }
  get SectorRangeFromPlayerToEntity() {
    var t, i;
    return (
      !this.pDh &&
        ((this.pDh = !0),
        (t = this.FbDataInternal.sectorRangeFromPlayerToEntityType()),
        (i =
          UnionInteractPlayerDiractionOptionHelper_1.UnionInteractPlayerDiractionOptionHelper.GetUnionInteractPlayerDiractionOptionObject(
            t,
          ))) &&
        (this.vDh =
          UnionInteractPlayerDiractionOptionHelper_1.UnionInteractPlayerDiractionOptionHelper.ReadUnionInteractPlayerDiractionOption(
            t,
            this.FbDataInternal.sectorRangeFromPlayerToEntity(i),
          )),
      this.vDh
    );
  }
  get Options() {
    if (!this.ugh) {
      (this.ugh = !0), (this.dgh = new Array());
      var i = this.FbDataInternal.optionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.options(
            t,
            new fb_action_1.InteractOption(),
          );
          this.dgh.push(FbInteractOption_1.FbInteractOption.Create(e));
        }
    }
    return this.dgh;
  }
  get RandomInteract() {
    return (
      this.yDh ||
        ((this.yDh = !0),
        (this.SDh = FbRandomInteract_1.FbRandomInteract.Create(
          this.FbDataInternal.randomInteract(),
        ))),
      this.SDh
    );
  }
  get InteractDefaultIcon() {
    return (
      this.MDh ||
        ((this.MDh = !0),
        (this.EDh = this.FbDataInternal.interactDefaultIcon())),
      this.EDh
    );
  }
  get InteractIcon() {
    return (
      this.IDh ||
        ((this.IDh = !0), (this.TDh = this.FbDataInternal.interactIcon())),
      this.TDh
    );
  }
  get TurnAroundType() {
    return (
      this.bDh ||
        ((this.bDh = !0), (this.LDh = this.FbDataInternal.turnAroundType())),
      this.LDh
    );
  }
  get IsWaitForTurnAroundComplete() {
    return (
      this.ADh ||
        ((this.ADh = !0),
        (this.xDh = this.FbDataInternal.isWaitForTurnAroundComplete())),
      this.xDh
    );
  }
  get IsWaitForInteractComplete() {
    return (
      this.RDh ||
        ((this.RDh = !0),
        (this.wDh = this.FbDataInternal.isWaitForInteractComplete())),
      this.wDh
    );
  }
  get PreFlow() {
    return (
      this.PDh ||
        ((this.PDh = !0),
        (this.UDh = FbPlayFlow_1.FbPlayFlow.Create(
          this.FbDataInternal.preFlow(),
        ))),
      this.UDh
    );
  }
  get TidContent() {
    return (
      this.C_h ||
        ((this.C_h = !0), (this.g_h = this.FbDataInternal.tidContent())),
      this.g_h
    );
  }
  get InteractPointOffset() {
    return (
      this.DDh ||
        ((this.DDh = !0),
        (this.BDh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.interactPointOffset(),
        ))),
      this.BDh
    );
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      (this.qDh = !0), (this.PAe = new Array());
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t),
            s =
              UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(
                  e,
                  this.FbDataInternal.matchRoleOption(t, s),
                )) &&
            this.PAe.push(e);
        }
    }
    return this.PAe;
  }
  get InteractAdditionalInfo() {
    var t, i;
    return (
      !this.LJl &&
        ((this.LJl = !0),
        (t = this.FbDataInternal.interactAdditionalInfoType()),
        (i =
          UnionInteractAdditionalInfoHelper_1.UnionInteractAdditionalInfoHelper.GetUnionInteractAdditionalInfoObject(
            t,
          ))) &&
        (this.AJl =
          UnionInteractAdditionalInfoHelper_1.UnionInteractAdditionalInfoHelper.ReadUnionInteractAdditionalInfo(
            t,
            this.FbDataInternal.interactAdditionalInfo(i),
          )),
      this.AJl
    );
  }
}
exports.FbInteractComponent = FbInteractComponent;
//# sourceMappingURL=FbInteractComponent.js.map
