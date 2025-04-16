"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RichTextUtils = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  ModelManager_1 = require("../Manager/ModelManager");
class RichTextUtils {
  static Vih(e) {
    e = e.split(" ");
    const r = {};
    return (
      e.forEach((e) => {
        var [e, t] = e.split("=");
        r[e] = t;
      }),
      r
    );
  }
  static Initialize() {
    UE.UIText.SetTsGameRichTextDelegate(
      (0, puerts_1.toManualReleaseDelegate)(RichTextUtils.hVa),
    );
  }
  static Destroy() {
    UE.UIText.SetTsGameRichTextDelegate(void 0),
      (0, puerts_1.releaseManualReleaseDelegate)(RichTextUtils.hVa);
  }
}
((exports.RichTextUtils = RichTextUtils).lVa = () =>
  ModelManager_1.ModelManager.PlayerInfoModel?.GetAccountName() ?? ""),
  (RichTextUtils._Va = () => {
    var e = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
    return 1 === e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_He_Text")
      : 0 === e
        ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_She_Text")
        : "";
  }),
  (RichTextUtils.uVa = (e) => {
    var t = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender();
    return 1 === t ? e.Get(0) : 0 === t ? e.Get(1) : "";
  }),
  (RichTextUtils.Hih = (e) => {
    (e = e.Get(0)), (e = RichTextUtils.Vih(e));
    return Info_1.Info.IsInTouch()
      ? StringUtils_1.StringUtils.IsBlank(e.Touch)
        ? "TouchParamError"
        : e.Touch
      : Info_1.Info.IsInGamepad()
        ? StringUtils_1.StringUtils.IsBlank(e.Gamepad)
          ? "GamepadParamError"
          : e.Gamepad
        : StringUtils_1.StringUtils.IsBlank(e.PC)
          ? "PCParamError"
          : e.PC;
  }),
  (RichTextUtils.jih = (e) => {
    var t;
    return e.IsValidIndex(1)
      ? ((t = e.Get(0)),
        (e = Number(e.Get(1))),
        (t = RichTextUtils.Vih(t)),
        1 < e ? t.P : t.S)
      : "ParamError";
  }),
  (RichTextUtils.cVa = {
    PlayerName: RichTextUtils.lVa,
    TA: RichTextUtils._Va,
    SexShowName: RichTextUtils.uVa,
    Ipt: RichTextUtils.Hih,
    Sap: RichTextUtils.jih,
  }),
  (RichTextUtils.hVa = (e, t) => {
    var r = RichTextUtils.cVa[e];
    return r
      ? r(t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TextUtil", 10, "找不到对应的富文本方法", [
            "RichType",
            e,
          ]),
        "NoFunc");
  });
//# sourceMappingURL=RichTextUtils.js.map
