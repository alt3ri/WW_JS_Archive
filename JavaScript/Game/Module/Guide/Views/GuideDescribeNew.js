"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideDescribeNew = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class GuideDescribeNew {
  constructor(e) {
    (this.UJt = void 0),
      (this.AJt = 1.6),
      (this.UJt = e),
      this.UJt.SetRichText(!0);
  }
  SetUpText(e, ...t) {
    var i = this.UJt,
      r = ConfigManager_1.ConfigManager.GuideConfig.GetGuideText(e);
    if (0 === t.length) {
      const l = r.split("\n").length - 1;
      i.SetHeight(i.Height + i.size * l),
        void LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
    } else {
      var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
        g = n.split("{");
      if (g.length - 1 !== t.length)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "按钮的数量与通配符的数量不一致！",
            ["出错的文本", n],
            ["通配符数量", g.length - 1],
            ["按钮数量", t.length],
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
      else {
        var s = [];
        for (const _ of t) {
          let e = "",
            t = 0;
          e =
            0 <= _.search("#")
              ? ((u = _.split("#")), (t = Number(u[0])), u[1])
              : _;
          var u = (
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(e) ??
            InputSettingsManager_1.InputSettingsManager.GetAxisBinding(e)
          )
            ?.GetCurrentPlatformKeyByIndex(t)
            ?.GetKey();
          if (!u) return;
          var o = u.GetKeyName(),
            a = u.GetKeyIconPath();
          if (StringUtils_1.StringUtils.IsEmpty(a)) return;
          s.push(a ? `<texture=${a}/>` : `(${o})`);
        }
        const l = r.split("\n").length - 1;
        n = s.length ? this.AJt : 1;
        i.SetHeight(i.Height + i.size * l * n),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, e, ...s);
      }
    }
  }
}
exports.GuideDescribeNew = GuideDescribeNew;
//# sourceMappingURL=GuideDescribeNew.js.map
