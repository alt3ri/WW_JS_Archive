"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RichTextUtils = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelManager_1 = require("../Manager/ModelManager");
class RichTextUtils {
  static Initialize() {
    UE.UIText.SetTsGameRichTextDelegate(
      (0, puerts_1.toManualReleaseDelegate)(RichTextUtils.I5a),
    );
  }
  static Destroy() {
    UE.UIText.SetTsGameRichTextDelegate(void 0),
      (0, puerts_1.releaseManualReleaseDelegate)(RichTextUtils.I5a);
  }
}
((exports.RichTextUtils = RichTextUtils).T5a = () =>
  ModelManager_1.ModelManager.PlayerInfoModel?.GetAccountName() ?? ""),
  (RichTextUtils.L5a = () => {
    var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
    return 1 === e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_He_Text")
      : 0 === e
        ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_She_Text")
        : "";
  }),
  (RichTextUtils.A5a = (e) => {
    var t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
    return 1 === t ? e.Get(0) : 0 === t ? e.Get(1) : "";
  }),
  (RichTextUtils.D5a = {
    PlayerName: RichTextUtils.T5a,
    TA: RichTextUtils.L5a,
    SexShowName: RichTextUtils.A5a,
  }),
  (RichTextUtils.I5a = (e, t) => {
    var i = RichTextUtils.D5a[e];
    return i
      ? i(t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TextUtil", 11, "找不到对应的富文本方法", [
            "RichType",
            e,
          ]),
        "NoFunc");
  });
//# sourceMappingURL=RichTextUtils.js.map
