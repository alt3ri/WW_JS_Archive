"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JsonConfig = void 0);
const File_1 = require("./File"),
  Util_1 = require("./Util"),
  SAVE_DIR = "Saved/Editor/JsonConfig";
function fillDefault(t, i) {
  for (const o in i) {
    var s = t[o],
      e = i[o];
    void 0 === s
      ? (t[o] = e)
      : "object" == typeof e &&
        ("object" != typeof s
          ? (t[o] = e)
          : e instanceof Array || fillDefault(s, e));
  }
}
class JsonConfig {
  constructor(t, i, s, e) {
    (this.Name = t),
      (this.Path = s || (0, File_1.getProjectPath)(SAVE_DIR) + `/${t}.json`),
      (this.ce = (0, Util_1.deepCopyData)(i)),
      (this.Data = (0, Util_1.readJsonObj)(this.Path, i)),
      this.Data !== i && fillDefault(this.Data, i),
      e && e(this.Data) && this.Save();
  }
  Get(t) {
    return this.Data[t];
  }
  Set(t, i) {
    (this.Data[t] = i), this.Save();
  }
  SetField(t, i, s) {
    var e = this.Data[t];
    e[i] !== s && ((e[i] = s), this.Set(t, e));
  }
  Reset() {
    Object.assign(this.Data, this.ce), this.Save();
  }
  Reload() {
    Object.assign(this.Data, (0, Util_1.readJsonObj)(this.Path, this.ce));
  }
  Save() {
    (0, Util_1.writeJson)(this.Data, this.Path);
  }
}
exports.JsonConfig = JsonConfig;
//# sourceMappingURL=JsonConfig.js.map
