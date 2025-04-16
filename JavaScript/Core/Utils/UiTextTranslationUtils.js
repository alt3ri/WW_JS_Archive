"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiTextTranslationUtils = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../Common/Log"),
  ConfigDefine_1 = require("../Define/ConfigDefine"),
  MultiTextLang_1 = require("../Define/ConfigQuery/MultiTextLang"),
  PrefabRichTextDataById_1 = require("../Define/ConfigQuery/PrefabRichTextDataById"),
  PrefabTextItemByItemId_1 = require("../Define/ConfigQuery/PrefabTextItemByItemId"),
  Macro_1 = require("../Preprocessor/Macro");
class UiTextTranslationUtils {
  static Kz(e) {
    1 === e.overflowType && (e.bBestFit = !0);
  }
  static Lhc(e, t) {
    var i = PrefabRichTextDataById_1.configPrefabRichTextDataById.GetConfig(e);
    i
      ? i.IsIncludeGameText
        ? (t.SetGameRichText(!0), t.SetRichText(!0))
        : i.IsIncludeRichText && t.SetRichText(!0)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("TextLanguageSearch", 10, "查询富文本信息异常", [
          "文本id",
          e,
        ]);
  }
  static Initialize() {
    UE.UIText.SetTextTranslateDelegate(
      (0, puerts_1.toManualReleaseDelegate)(
        UiTextTranslationUtils.TranslateText,
      ),
    ),
      UE.UIText.SetLocalTextDelegate(
        (0, puerts_1.toManualReleaseDelegate)(UiTextTranslationUtils.iIr),
      ),
      UE.UIText.SetLocalTextNewDelegate(
        (0, puerts_1.toManualReleaseDelegate)(UiTextTranslationUtils.whc),
      );
  }
  static Destroy() {
    UE.UIText.SetTextTranslateDelegate(void 0),
      UE.UIText.SetLocalTextDelegate(void 0),
      UE.UIText.SetLocalTextNewDelegate(void 0),
      (0, puerts_1.releaseManualReleaseDelegate)(
        UiTextTranslationUtils.TranslateText,
      ),
      (0, puerts_1.releaseManualReleaseDelegate)(UiTextTranslationUtils.iIr),
      (0, puerts_1.releaseManualReleaseDelegate)(UiTextTranslationUtils.whc);
  }
}
(exports.UiTextTranslationUtils = UiTextTranslationUtils),
  ((_a = UiTextTranslationUtils).AkiFontData = void 0),
  (UiTextTranslationUtils.TranslateText = (t) => {
    if (t.TranslateId) {
      let e = void 0;
      (e =
        0 !== t.TranslateId
          ? PrefabTextItemByItemId_1.configPrefabTextItemByItemId.GetConfig(
              BigInt(t.TranslateId),
            )
          : e) && (UiTextTranslationUtils.Kz(t), t.ShowTextNew(e.Text));
    } else t.text = "";
  }),
  (UiTextTranslationUtils.iIr = (e, t, i) => {
    let a = void 0;
    return (
      (a = (0, ConfigDefine_1.getLangInterface)(e)?.GetLocalText(t)),
      i
        ? (void 0 === a &&
            ((a = i.GetText()), Log_1.Log.CheckWarn()) &&
            Log_1.Log.Warn(
              "TextLanguageSearch",
              10,
              "[GetLocalText]配置表文本获取失败，文本控件显示自身文本",
              ["控件Id", i.TranslateId],
              ["控件自身文本", a],
            ),
          a !== i.GetText() && UiTextTranslationUtils.Kz(i))
        : void 0 === a &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TextLanguageSearch",
            10,
            "[GetLocalText]格式化字符串传入的表名与文本id无效",
            ["表名", e],
            ["文本id", t],
          ),
      a
    );
  }),
  (UiTextTranslationUtils.TextShowTranslateId = !1),
  (UiTextTranslationUtils.whc = (e, t, i) => {
    if (_a.TextShowTranslateId) return t.TranslateId.toString();
    _a.Lhc(e, t);
    let a = void 0;
    return (
      (a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      i
        ? (void 0 === a &&
            ((a = t.GetText()), Log_1.Log.CheckWarn()) &&
            Log_1.Log.Warn(
              "TextLanguageSearch",
              10,
              "[GetLocalTextNew]预制体固定文本多语言切换失败，该文本控件Id还没有收集到，将显示预制体上的文本",
              ["控件Id", t.TranslateId],
              ["控件自身文本", a],
            ),
          a !== t.GetText() && UiTextTranslationUtils.Kz(t))
        : void 0 === a &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TextLanguageSearch",
            10,
            "[GetLocalTextNew]格式化字符串传入的表名与文本id无效",
            ["文本id", e],
          ),
      a
    );
  }),
  (UiTextTranslationUtils.GmReplaceText = (e) => {
    _a.AkiFontData && e.SetFont(_a.AkiFontData);
  });
//# sourceMappingURL=UiTextTranslationUtils.js.map
