"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceMotionSelectData =
    exports.AdviceSelectItemData =
    exports.AdviceEntityData =
    exports.AdviceContentData =
    exports.LogAdviceData =
    exports.AdviceData =
      void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class AdviceData {
  constructor() {
    (this.u8e = void 0),
      (this.c8e = 0),
      (this.m8e = 0),
      (this.d8e = new Array()),
      (this.C8e = 0),
      (this.g8e = 0),
      (this.f8e = ""),
      (this.p8e = "");
  }
  Phrase(t) {
    (this.u8e = MathUtils_1.MathUtils.LongToBigInt(t.Ekn)),
      (this.c8e = t.wFn),
      this.PhraseUpDownData(t.Tgs),
      (this.d8e = new Array()),
      t.E3n.forEach((t) => {
        const e = new AdviceContentData();
        e.Phrase(t), this.d8e.push(e);
      }),
      this.PhraseContentInfo(this.d8e);
  }
  PhraseData(t) {
    (this.d8e = new Array()),
      t.forEach((t) => {
        const e = new AdviceContentData();
        e.PhraseData(t), this.d8e.push(e);
      }),
      this.PhraseContentInfo(this.d8e);
  }
  PhraseUpDownData(t) {
    this.m8e = t;
  }
  PhraseContentInfo(t) {
    this.p8e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    const s = new StringBuilder_1.StringBuilder();
    t.forEach((i) => {
      switch (i.GetType()) {
        case Protocol_1.Aki.Protocol.FBs.Proto_Sentence:
          {
            var t =
              ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
                i.GetId(),
              ).split("{}");
            let e = 0;
            t.forEach((t) => {
              s.Append(t),
                e === 0 &&
                  ((t =
                    ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceWordText(
                      i.GetWord(),
                    )),
                  s.Append(t)),
                e++;
            });
          }
          break;
        case Protocol_1.Aki.Protocol.FBs.Proto_Conjunction:
          t =
            ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceConjunctionText(
              i.GetId(),
            );
          s.Append(t);
          break;
        case Protocol_1.Aki.Protocol.FBs.Proto_Expression:
          this.C8e = i.GetId();
          break;
        case Protocol_1.Aki.Protocol.FBs.y3n:
          this.g8e = i.GetId();
      }
    }),
      (this.f8e = s.ToString());
  }
  PhraseShowText(e, i = 0) {
    this.p8e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    const s = new StringBuilder_1.StringBuilder();
    const r = e.length;
    for (let t = 0; t < r; t++) {
      const a = e[t];
      let n = a.GetType();
      if (n === Protocol_1.Aki.Protocol.FBs.Proto_Sentence) {
        var o;
        const h =
          ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSentenceText(
            a.GetId(),
          ).split("{}");
        const c = h.length;
        for (let t = 0; t < c; t++)
          if ((s.Append(h[t]), t === 0)) {
            let t = "";
            a.GetWord() > 0
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
                  i === 0
                    ? ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
                        0,
                      )
                    : ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceCreateText(
                        2,
                      )),
                s.Append(t));
          }
      } else if (n === Protocol_1.Aki.Protocol.FBs.Proto_Conjunction) {
        let t = "";
        a.GetId() > 0
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
    this.f8e = s.ToString();
  }
  GetAdviceShowText() {
    return (
      this.p8e !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
        this.PhraseContentInfo(this.d8e),
      this.f8e
    );
  }
  GetAdviceId() {
    return MathUtils_1.MathUtils.BigIntToLong(this.u8e);
  }
  GetAdviceBigId() {
    return this.u8e;
  }
  GetAreaId() {
    return this.c8e;
  }
  GetVote() {
    let t = this.m8e;
    let e;
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
    return this.d8e;
  }
  GetAdviceExpressionId() {
    return this.C8e;
  }
  GetAdviceMotionId() {
    return this.g8e;
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
    (this.xe = 0), (this.v8e = 0), (this.S9 = void 0);
  }
  Phrase(t) {
    (this.xe = t.Ekn), (this.v8e = t.I3n), (this.S9 = t.Ikn);
  }
  PhraseData(t) {
    t instanceof AdviceContentData
      ? ((this.xe = t.xe), (this.v8e = t.v8e), (this.S9 = t.S9))
      : t instanceof Protocol_1.Aki.Protocol.NBs &&
        ((this.xe = t.Ekn), (this.v8e = t.I3n), (this.S9 = t.Ikn));
  }
  SetData(t, e, i) {
    (this.xe = t), (this.v8e = e), (this.S9 = i);
  }
  GetId() {
    return this.xe;
  }
  GetWord() {
    return this.v8e;
  }
  GetType() {
    return this.S9;
  }
  ConvertToPb() {
    const t = new Protocol_1.Aki.Protocol.NBs();
    return (t.Ekn = this.xe), (t.Ikn = this.S9), (t.I3n = this.v8e), t;
  }
}
exports.AdviceContentData = AdviceContentData;
class AdviceEntityData {
  constructor() {
    (this.j8 = 0), (this.M8e = ""), (this.S8e = void 0);
  }
  Phrase(t) {
    (this.S8e = new AdviceData()),
      (this.j8 = t.aFn),
      (this.M8e = t.Rgs),
      this.S8e.Phrase(t.Lgs);
  }
  PhraseVote(t) {
    this.S8e.PhraseUpDownData(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceEntityNotify,
      );
  }
  PhraseContent(t) {
    this.S8e.PhraseData(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAdviceEntityNotify,
      );
  }
  GetPlayerId() {
    return this.j8;
  }
  GetPlayerName() {
    return this.M8e;
  }
  GetAdviceData() {
    return this.S8e;
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
// # sourceMappingURL=AdviceData.js.map
