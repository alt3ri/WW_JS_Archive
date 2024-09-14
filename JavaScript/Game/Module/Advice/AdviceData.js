"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceMotionSelectData =
    exports.AdviceSelectItemData =
    exports.AdviceEntityData =
    exports.AdviceContentData =
    exports.LogAdviceData =
    exports.AdviceData =
      void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class AdviceData {
  constructor() {
    (this.T9e = void 0),
      (this.L9e = 0),
      (this.D9e = 0),
      (this.R9e = new Array()),
      (this.U9e = 0),
      (this.A9e = 0),
      (this.P9e = ""),
      (this.x9e = "");
  }
  Phrase(t) {
    (this.T9e = MathUtils_1.MathUtils.LongToBigInt(t.s5n)),
      (this.L9e = t.p6n),
      this.PhraseUpDownData(t.XMs),
      (this.R9e = new Array()),
      t.u8n.forEach((t) => {
        var e = new AdviceContentData();
        e.Phrase(t), this.R9e.push(e);
      }),
      this.PhraseContentInfo(this.R9e);
  }
  PhraseData(t) {
    (this.R9e = new Array()),
      t.forEach((t) => {
        var e = new AdviceContentData();
        e.PhraseData(t), this.R9e.push(e);
      }),
      this.PhraseContentInfo(this.R9e);
  }
  PhraseUpDownData(t) {
    this.D9e = t;
  }
  PhraseContentInfo(t) {
    this.x9e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    const s = new StringBuilder_1.StringBuilder();
    t.forEach((i) => {
      switch (i.GetType()) {
        case Protocol_1.Aki.Protocol.qks.Proto_Sentence:
          {
            var t =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
                i.GetId(),
              ).split("{}");
            let e = 0;
            t.forEach((t) => {
              s.Append(t),
                0 === e &&
                  ((t =
                    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
                      i.GetWord(),
                    )),
                  s.Append(t)),
                e++;
            });
          }
          break;
        case Protocol_1.Aki.Protocol.qks.Proto_Conjunction:
          t =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
              i.GetId(),
            );
          s.Append(t);
          break;
        case Protocol_1.Aki.Protocol.qks.Proto_Expression:
          this.U9e = i.GetId();
          break;
        case Protocol_1.Aki.Protocol.qks.c8n:
          this.A9e = i.GetId();
      }
    }),
      (this.P9e = s.ToString());
  }
  PhraseShowText(e, i = 0) {
    this.x9e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    var s = new StringBuilder_1.StringBuilder(),
      r = e.length;
    for (let t = 0; t < r; t++) {
      var a = e[t],
        n = a.GetType();
      if (n === Protocol_1.Aki.Protocol.qks.Proto_Sentence) {
        var o,
          h = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
            a.GetId(),
          ).split("{}"),
          c = h.length;
        for (let t = 0; t < c; t++)
          if ((s.Append(h[t]), 0 === t)) {
            let t = "";
            0 < a.GetWord()
              ? ((o =
                  ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTemplateText()),
                (o =
                  ((t =
                    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
                      a.GetWord(),
                    )),
                  o.replace("{0}", t))),
                s.Append(o))
              : ((t =
                  0 === i
                    ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
                        0,
                      )
                    : ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
                        2,
                      )),
                s.Append(t));
          }
      } else if (n === Protocol_1.Aki.Protocol.qks.Proto_Conjunction) {
        let t = "";
        0 < a.GetId()
          ? ((n =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceTemplateText()),
            (t =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
                a.GetId(),
              )),
            (n = n.replace("{0}", t)),
            s.Append(n))
          : ((t =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
                1,
              )),
            s.Append(t));
      }
    }
    this.P9e = s.ToString();
  }
  GetAdviceShowText() {
    return (
      this.x9e !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
        this.PhraseContentInfo(this.R9e),
      this.P9e
    );
  }
  GetAdviceId() {
    return MathUtils_1.MathUtils.BigIntToLong(this.T9e);
  }
  GetAdviceBigId() {
    return this.T9e;
  }
  GetAreaId() {
    return this.L9e;
  }
  GetVote() {
    let t = this.D9e;
    var e;
    return (
      t <= 0
        ? (t = 0)
        : ((e =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceLikeShowMax()),
          t >= e && (t = e)),
      t
    );
  }
  GetAdviceContentData() {
    return this.R9e;
  }
  GetAdviceExpressionId() {
    return this.U9e;
  }
  GetAdviceMotionId() {
    return this.A9e;
  }
}
exports.AdviceData = AdviceData;
class LogAdviceData {
  constructor() {
    (this.id = 0), (this.word = 0), (this.type = 0);
  }
  Phrase(t) {
    (this.id = t.GetId()), (this.word = t.GetWord()), (this.type = t.GetType());
  }
}
exports.LogAdviceData = LogAdviceData;
class AdviceContentData {
  constructor() {
    (this.xe = 0), (this.w9e = 0), (this.E9 = void 0);
  }
  Phrase(t) {
    (this.xe = t.s5n), (this.w9e = t.m8n), (this.E9 = t.h5n);
  }
  PhraseData(t) {
    t instanceof AdviceContentData
      ? ((this.xe = t.xe), (this.w9e = t.w9e), (this.E9 = t.E9))
      : t instanceof Protocol_1.Aki.Protocol.Bks &&
        ((this.xe = t.s5n), (this.w9e = t.m8n), (this.E9 = t.h5n));
  }
  SetData(t, e, i) {
    (this.xe = t), (this.w9e = e), (this.E9 = i);
  }
  GetId() {
    return this.xe;
  }
  GetWord() {
    return this.w9e;
  }
  GetType() {
    return this.E9;
  }
  ConvertToPb() {
    var t = new Protocol_1.Aki.Protocol.Bks();
    return (t.s5n = this.xe), (t.h5n = this.E9), (t.m8n = this.w9e), t;
  }
}
exports.AdviceContentData = AdviceContentData;
class AdviceEntityData {
  constructor() {
    (this.j8 = 0), (this.B9e = ""), (this.b9e = void 0);
  }
  Phrase(t) {
    (this.b9e = new AdviceData()),
      (this.j8 = t.W5n),
      (this.B9e = t.JMs),
      this.b9e.Phrase(t.YMs);
  }
  PhraseVote(t) {
    this.b9e.PhraseUpDownData(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceEntityNotify,
      );
  }
  PhraseContent(t) {
    this.b9e.PhraseData(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceEntityNotify,
      );
  }
  GetPlayerId() {
    return this.j8;
  }
  GetPlayerName() {
    return this.B9e;
  }
  GetAdviceData() {
    return this.b9e;
  }
}
exports.AdviceEntityData = AdviceEntityData;
class AdviceSelectItemData {
  constructor(t) {
    this.Xy = t;
  }
  GetIndex() {
    return this.Xy;
  }
}
exports.AdviceSelectItemData = AdviceSelectItemData;
class AdviceMotionSelectData {
  constructor(t) {
    this.Xy = t;
  }
  GetIndex() {
    return this.Xy;
  }
}
exports.AdviceMotionSelectData = AdviceMotionSelectData;
//# sourceMappingURL=AdviceData.js.map
