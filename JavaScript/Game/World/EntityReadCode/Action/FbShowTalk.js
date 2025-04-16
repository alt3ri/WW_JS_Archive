"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowTalk = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  FbShowTalkFrameEvent_1 = require("./FbShowTalkFrameEvent"),
  FbShowTalkOutline_1 = require("./FbShowTalkOutline"),
  FbTalkItem_1 = require("./FbTalkItem"),
  FbTalkSequenceTransition_1 = require("./FbTalkSequenceTransition");
class FbShowTalk {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Pdh = !1),
      (this.Udh = !1),
      (this.NCh = !1),
      (this.VCh = void 0),
      (this.jCh = !1),
      (this.HCh = void 0),
      (this.WCh = !1),
      (this.QCh = void 0),
      (this.KCh = !1),
      (this.$Ch = void 0),
      (this.XCh = !1),
      (this.YCh = void 0),
      (this.zCh = !1),
      (this.JCh = void 0),
      (this.ZCh = !1),
      (this.egh = void 0),
      (this.amh = !1),
      (this.hmh = !1);
  }
  static Create(t) {
    if (t) return new FbShowTalk(t);
  }
  get ResetCamera() {
    return (
      this.Pdh ||
        ((this.Pdh = !0), (this.Udh = this.FbDataInternal.resetCamera())),
      this.Udh
    );
  }
  get TalkItems() {
    if (!this.NCh) {
      (this.NCh = !0), (this.VCh = new Array());
      var i = this.FbDataInternal.talkItemsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkItems(t, new fb_action_1.TalkItem());
          this.VCh.push(FbTalkItem_1.FbTalkItem.Create(e));
        }
    }
    return this.VCh;
  }
  get TalkOutline() {
    return (
      this.jCh ||
        ((this.jCh = !0),
        (this.HCh = FbShowTalkOutline_1.FbShowTalkOutline.Create(
          this.FbDataInternal.talkOutline(),
        ))),
      this.HCh
    );
  }
  get SequenceDataAsset() {
    return (
      this.WCh ||
        ((this.WCh = !0), (this.QCh = this.FbDataInternal.sequenceDataAsset())),
      this.QCh
    );
  }
  get TalkFrameEvents() {
    if (!this.KCh) {
      (this.KCh = !0), (this.$Ch = new Array());
      var i = this.FbDataInternal.talkFrameEventsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkFrameEvents(
            t,
            new fb_action_1.ShowTalkFrameEvent(),
          );
          this.$Ch.push(FbShowTalkFrameEvent_1.FbShowTalkFrameEvent.Create(e));
        }
    }
    return this.$Ch;
  }
  get TalkSequence() {
    if (!this.XCh) {
      this.XCh = !0;
      var i = this.FbDataInternal.talkSequenceLength();
      if (i) {
        this.YCh = new Array();
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.talkSequence(t, new fb_var_1.IntArray()),
            s = e.valuesLength(),
            h = new Array();
          for (let t = 0; t < s; t++) h.push(e.values(t));
          this.YCh.push(h);
        }
      }
    }
    return this.YCh;
  }
  get SequenceNames() {
    if (!this.zCh) {
      (this.zCh = !0), (this.JCh = new Array());
      var i = this.FbDataInternal.sequenceNamesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.JCh.push(this.FbDataInternal.sequenceNames(t));
    }
    return this.JCh;
  }
  get SequenceTransitions() {
    if (!this.ZCh) {
      this.ZCh = !0;
      var i = this.FbDataInternal.sequenceTransitionsLength();
      if (i) {
        this.egh = {};
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.sequenceTransitions(
              t,
              new fb_action_1.RecordTalkSequenceTransition(),
            ),
            s = e.key(),
            h = new Array(),
            r = e.valueLength();
          for (let t = 0; t < r; ++t) {
            var a = FbTalkSequenceTransition_1.FbTalkSequenceTransition.Create(
              e.value(t),
            );
            h.push(a);
          }
          this.egh[s] = h;
        }
      }
    }
    return this.egh;
  }
  get SaveFinalPos() {
    return (
      this.amh ||
        ((this.amh = !0), (this.hmh = this.FbDataInternal.saveFinalPos())),
      this.hmh
    );
  }
}
exports.FbShowTalk = FbShowTalk;
//# sourceMappingURL=FbShowTalk.js.map
