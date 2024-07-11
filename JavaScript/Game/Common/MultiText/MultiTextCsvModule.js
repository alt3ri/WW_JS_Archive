"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MultiTextCsvModule = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const MultiTextDefine_1 = require("./MultiTextDefine");
class MultiTextCsvModule {
  constructor() {
    (this.Ude = new Set()), (this.Ade = new Map());
  }
  Pde(e) {
    const t = StringUtils_1.StringUtils.ParseCsvContent(e);
    const i = t[MultiTextDefine_1.CSV_LANG_INDEX];
    for (let e = MultiTextDefine_1.CVS_START_INDEX; e < t.length; e++) {
      const r = t[e];
      if (!(r.length < 2)) {
        const s = r[1];
        if (!StringUtils_1.StringUtils.IsBlank(s)) {
          const o = new Map();
          r.forEach((e, t) => {
            t > 1 &&
              ((e = e.replace(/\\n/g, "\n")),
              o.set(i[t], e ?? "test/NoLocalTextNoLocalTextNoLocalText"));
          }),
            this.Ade.set(s, o);
        }
      }
    }
  }
  RegisterTextLocalConfig(e, t = !1) {
    let i;
    (!t && this.Ude.has(e)) ||
      (this.Ude.add(e),
      (i = ((t = void 0), puerts_1.$ref)(void 0)),
      UE.KuroStaticLibrary.LoadFileToString(i, e),
      (t = (0, puerts_1.$unref)(i)),
      this.Pde(t));
  }
  GetLocalText(e) {
    const t = LanguageSystem_1.LanguageSystem.PackageLanguage;
    const i = this.Ade.get(e);
    return i && i.size > 0 ? i.get(t) : e;
  }
}
exports.MultiTextCsvModule = MultiTextCsvModule;
// # sourceMappingURL=MultiTextCsvModule.js.map
