"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPureActionHandle = void 0);
const cpp_1 = require("cpp"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  StatDefine_1 = require("../Common/StatDefine");
class TsPureActionHandle {
  constructor() {
    (this.R$e = void 0),
      (this.ZMe = void 0),
      (this.Oya = void 0),
      (this.kya = void 0),
      (this.Nya = void 0),
      (this.OnPressAction = (i) => {
        this.Oya && this.Oya(this.ZMe, !0, i);
      }),
      (this.OnReleaseAction = (i) => {
        this.Oya && this.Oya(this.ZMe, !1, i);
      });
  }
  Initialize(i) {
    (this.R$e = i), (this.kya = void 0), (this.Nya = void 0);
  }
  AddActionBinding(i, t) {
    t
      ? ((this.ZMe = i),
        (this.Oya = t),
        (t = FNameUtil_1.FNameUtil.GetDynamicFName(i)),
        cpp_1.FKuroInputInterface.RegisterActionBinding(
          t,
          0,
          this.R$e,
          this,
          this.OnPressAction,
        ),
        cpp_1.FKuroInputInterface.RegisterActionBinding(
          t,
          1,
          this.R$e,
          this,
          this.OnReleaseAction,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Controller", 8, "添加Action输入绑定时，回调不存在", [
          "actionName",
          i,
        ]);
  }
  Reset() {
    (this.R$e = void 0), (this.ZMe = void 0), (this.Oya = void 0);
  }
}
exports.TsPureActionHandle = TsPureActionHandle;
//# sourceMappingURL=TsPureActionHandle.js.map
