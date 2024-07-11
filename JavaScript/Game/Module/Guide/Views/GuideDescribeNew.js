"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideDescribeNew = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LINKER = "+";
class GuideDescribeNew {
  constructor(t) {
    (this.Uzt = void 0),
      (this.Azt = 1.6),
      (this.LTa = new InputKeyDisplayData_1.InputKeyDisplayData()),
      (this.Uzt = t),
      this.Uzt.SetRichText(!0);
  }
  SetUpText(t, ...e) {
    var i = this.Uzt,
      r = ConfigManager_1.ConfigManager.GuideConfig.GetGuideText(t);
    if (0 === e.length) {
      const g = r.split("\n").length - 1;
      i.SetHeight(i.Height + i.size * g),
        void LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    } else {
      var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t),
        s = n.split("{");
      if (s.length - 1 !== e.length)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            17,
            "按钮的数量与通配符的数量不一致！",
            ["出错的文本", n],
            ["通配符数量", s.length - 1],
            ["按钮数量", e.length],
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
      else {
        var u,
          a = [];
        for (const o of e) {
          let t = "",
            e = 0;
          t =
            0 <= o.search("#")
              ? ((u = o.split("#")), (e = Number(u[0])), u[1])
              : o;
          let i = "",
            r = void 0,
            n = void 0;
          if (
            ((InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
              this.LTa,
              t,
            ) ||
              InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(
                this.LTa,
                t,
              )) &&
              ((r = this.LTa.GetDisplayKeyNameList(e)),
              (n = this.LTa.GetDisplayKeyIconPathList(e))),
            void 0 === r || void 0 === n)
          )
            return;
          1 === r.length
            ? (i = this.DTa(r[0], n[0]))
            : 2 === r.length &&
              (i = "" + this.DTa(r[0], n[0]) + LINKER + this.DTa(r[1], n[1])),
            a.push(i);
        }
        const g = r.split("\n").length - 1;
        n = a.length ? this.Azt : 1;
        i.SetHeight(i.Height + i.size * g * n),
          LguiUtil_1.LguiUtil.SetLocalTextNew(i, t, ...a);
      }
    }
  }
  DTa(t, e) {
    return StringUtils_1.StringUtils.IsEmpty(e) ? `(${t})` : `<texture=${e}/>`;
  }
}
exports.GuideDescribeNew = GuideDescribeNew;
//# sourceMappingURL=GuideDescribeNew.js.map
