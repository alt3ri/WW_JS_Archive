"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideDescribeNew = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class GuideDescribeNew {
  constructor(e) {
    (this.UJt = void 0),
      (this.AJt = 1.6),
      (this.UJt = e),
      this.UJt.SetRichText(!0);
  }
  SetUpText(e, ...t) {
    const i = this.UJt;
    const r = ConfigManager_1.ConfigManager.GuideConfig.GetGuideText(e);
    if (t.length === 0) {
      const l = r.split("\n").length - 1;
      i.SetHeight(i.Height + i.size * l),
        void LguiUtil_1.LguiUtil.SetLocalTextNew(i, e);
    } else {
      let n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
      const g = n.split("{");
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
        const s = [];
        for (const _ of t) {
          let e = "";
          let t = 0;
          e =
            _.search("#") >= 0
              ? ((u = _.split("#")), (t = Number(u[0])), u[1])
              : _;
          var u = (
            InputSettingsManager_1.InputSettingsManager.GetActionBinding(e) ??
            InputSettingsManager_1.InputSettingsManager.GetAxisBinding(e)
          )
            ?.GetCurrentPlatformKeyByIndex(t)
            ?.GetKey();
          if (!u) return;
          const o = u.GetKeyName();
          const a = u.GetKeyIconPath();
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
// # sourceMappingURL=GuideDescribeNew.js.map
