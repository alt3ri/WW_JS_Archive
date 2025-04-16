"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkItem = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo"),
  FbActorLookAt_1 = require("./FbActorLookAt"),
  FbActorTurnTo_1 = require("./FbActorTurnTo"),
  FbCameraData_1 = require("./FbCameraData"),
  FbCaptionParam_1 = require("./FbCaptionParam"),
  FbMontageData_1 = require("./FbMontageData"),
  FbPlayMontage_1 = require("./FbPlayMontage"),
  FbSetFlowTemplate_1 = require("./FbSetFlowTemplate"),
  FbTalkOption_1 = require("./FbTalkOption"),
  FbUniversalTone_1 = require("./FbUniversalTone"),
  UnionPostAkEventHelper_1 = require("./UnionPostAkEventHelper"),
  UnionTalkBackgroundHelper_1 = require("./UnionTalkBackgroundHelper");
class FbTalkItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.igh = !1),
      (this.rgh = 0),
      (this.vCh = !1),
      (this.yCh = void 0),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.sgh = !1),
      (this.agh = void 0),
      (this.Dmh = !1),
      (this.Bmh = 0),
      (this.CCh = !1),
      (this.gCh = 0),
      (this.hgh = !1),
      (this.lgh = void 0),
      (this.vmh = !1),
      (this.ymh = 0),
      (this._gh = !1),
      (this.cgh = void 0),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.ugh = !1),
      (this.dgh = void 0),
      (this.mgh = !1),
      (this.Cgh = void 0),
      (this.ggh = !1),
      (this.fgh = void 0),
      (this.pgh = !1),
      (this.vgh = void 0),
      (this.Qk_ = !1),
      (this.Kk_ = void 0),
      (this.ygh = !1),
      (this.Sgh = void 0),
      (this.Mgh = !1),
      (this.Egh = void 0),
      (this.Igh = !1),
      (this.Tgh = void 0),
      (this.bgh = !1),
      (this.Lgh = void 0),
      (this.Agh = !1),
      (this.xgh = void 0),
      (this.Rgh = !1),
      (this.wgh = void 0),
      (this.Pgh = !1),
      (this.Ugh = !1);
  }
  static Create(t) {
    if (t) return new FbTalkItem(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get PlotLineId() {
    return (
      this.igh ||
        ((this.igh = !0), (this.rgh = this.FbDataInternal.plotLineId())),
      this.rgh
    );
  }
  get PlotLineKey() {
    return (
      this.vCh ||
        ((this.vCh = !0), (this.yCh = this.FbDataInternal.plotLineKey())),
      this.yCh
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get _editFlag() {
    return (
      this.sgh ||
        ((this.sgh = !0), (this.agh = this.FbDataInternal.editFlag())),
      this.agh
    );
  }
  get WhoId() {
    return (
      this.Dmh || ((this.Dmh = !0), (this.Bmh = this.FbDataInternal.whoId())),
      this.Bmh
    );
  }
  get TextId() {
    return (
      this.CCh || ((this.CCh = !0), (this.gCh = this.FbDataInternal.textId())),
      this.gCh
    );
  }
  get TidTalk() {
    return (
      this.hgh || ((this.hgh = !0), (this.lgh = this.FbDataInternal.tidTalk())),
      this.lgh
    );
  }
  get WaitTime() {
    return (
      this.vmh ||
        ((this.vmh = !0), (this.ymh = this.FbDataInternal.waitTime())),
      this.ymh
    );
  }
  get CaptionParams() {
    return (
      this._gh ||
        ((this._gh = !0),
        (this.cgh = FbCaptionParam_1.FbCaptionParam.Create(
          this.FbDataInternal.captionParams(),
        ))),
      this.cgh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
  get Options() {
    if (!this.ugh) {
      (this.ugh = !0), (this.dgh = new Array());
      var i = this.FbDataInternal.optionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.options(t, new fb_action_1.TalkOption());
          this.dgh.push(FbTalkOption_1.FbTalkOption.Create(s));
        }
    }
    return this.dgh;
  }
  get Montage() {
    return (
      this.mgh ||
        ((this.mgh = !0),
        (this.Cgh = FbPlayMontage_1.FbPlayMontage.Create(
          this.FbDataInternal.montage(),
        ))),
      this.Cgh
    );
  }
  get CameraData() {
    return (
      this.ggh ||
        ((this.ggh = !0),
        (this.fgh = FbCameraData_1.FbCameraData.Create(
          this.FbDataInternal.cameraData(),
        ))),
      this.fgh
    );
  }
  get FlowTemplate() {
    return (
      this.pgh ||
        ((this.pgh = !0),
        (this.vgh = FbSetFlowTemplate_1.FbSetFlowTemplate.Create(
          this.FbDataInternal.flowTemplate(),
        ))),
      this.vgh
    );
  }
  get FlowTemplateList() {
    if (!this.Qk_) {
      (this.Qk_ = !0), (this.Kk_ = new Array());
      var i = this.FbDataInternal.flowTemplateListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.flowTemplateList(
            t,
            new fb_action_1.SetFlowTemplate(),
          );
          this.Kk_.push(FbSetFlowTemplate_1.FbSetFlowTemplate.Create(s));
        }
    }
    return this.Kk_;
  }
  get ActorMontageArray() {
    if (!this.ygh) {
      (this.ygh = !0), (this.Sgh = new Array());
      var i = this.FbDataInternal.actorMontageArrayLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorMontageArray(
            t,
            new fb_action_1.MontageData(),
          );
          this.Sgh.push(FbMontageData_1.FbMontageData.Create(s));
        }
    }
    return this.Sgh;
  }
  get ActorLookAtArray() {
    if (!this.Mgh) {
      (this.Mgh = !0), (this.Egh = new Array());
      var i = this.FbDataInternal.actorLookAtArrayLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorLookAtArray(
            t,
            new fb_action_1.ActorLookAt(),
          );
          this.Egh.push(FbActorLookAt_1.FbActorLookAt.Create(s));
        }
    }
    return this.Egh;
  }
  get ActorTurnToArray() {
    if (!this.Igh) {
      (this.Igh = !0), (this.Tgh = new Array());
      var i = this.FbDataInternal.actorTurnToArrayLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actorTurnToArray(
            t,
            new fb_action_1.ActorTurnTo(),
          );
          this.Tgh.push(FbActorTurnTo_1.FbActorTurnTo.Create(s));
        }
    }
    return this.Tgh;
  }
  get TalkAkEvent() {
    var t, i;
    return (
      !this.bgh &&
        ((this.bgh = !0),
        (t = this.FbDataInternal.talkAkEventType()),
        (i =
          UnionPostAkEventHelper_1.UnionPostAkEventHelper.GetUnionPostAkEventObject(
            t,
          ))) &&
        (this.Lgh =
          UnionPostAkEventHelper_1.UnionPostAkEventHelper.ReadUnionPostAkEvent(
            t,
            this.FbDataInternal.talkAkEvent(i),
          )),
      this.Lgh
    );
  }
  get UniversalTone() {
    return (
      this.Agh ||
        ((this.Agh = !0),
        (this.xgh = FbUniversalTone_1.FbUniversalTone.Create(
          this.FbDataInternal.universalTone(),
        ))),
      this.xgh
    );
  }
  get BackgroundConfig() {
    var t, i;
    return (
      !this.Rgh &&
        ((this.Rgh = !0),
        (t = this.FbDataInternal.backgroundConfigType()),
        (i =
          UnionTalkBackgroundHelper_1.UnionTalkBackgroundHelper.GetUnionTalkBackgroundObject(
            t,
          ))) &&
        (this.wgh =
          UnionTalkBackgroundHelper_1.UnionTalkBackgroundHelper.ReadUnionTalkBackground(
            t,
            this.FbDataInternal.backgroundConfig(i),
          )),
      this.wgh
    );
  }
  get PlayVoice() {
    return (
      this.Pgh ||
        ((this.Pgh = !0), (this.Ugh = this.FbDataInternal.playVoice())),
      this.Ugh
    );
  }
}
exports.FbTalkItem = FbTalkItem;
//# sourceMappingURL=FbTalkItem.js.map
