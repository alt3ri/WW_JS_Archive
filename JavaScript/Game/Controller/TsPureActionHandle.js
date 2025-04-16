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
      (this.dDa = void 0),
      (this.CDa = void 0),
      (this.gDa = void 0),
      (this.OnPressAction = (t) => {
        this.CDa.Start(),
          this.dDa && this.dDa(this.ZMe, !0, t),
          this.CDa.Stop();
      }),
      (this.OnReleaseAction = (t) => {
        this.gDa.Start(),
          this.dDa && this.dDa(this.ZMe, !1, t),
          this.gDa.Stop();
      });
  }
  Initialize(t) {
    (this.R$e = t),
      (this.CDa = Stats_1.Stat.Create(
        "TsPureActionHandle.OnPressAction",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      )),
      (this.gDa = Stats_1.Stat.Create(
        "TsPureActionHandle.OnReleaseAction",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      ));
  }
  AddActionBinding(t, i) {
    i
      ? ((this.ZMe = t),
        (this.dDa = i),
        (i = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
        cpp_1.FKuroInputInterface.RegisterActionBinding(
          i,
          0,
          this.R$e,
          this,
          this.OnPressAction,
        ),
        cpp_1.FKuroInputInterface.RegisterActionBinding(
          i,
          1,
          this.R$e,
          this,
          this.OnReleaseAction,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Controller", 10, "添加Action输入绑定时，回调不存在", [
          "actionName",
          t,
        ]);
  }
  Reset() {
    (this.R$e = void 0), (this.ZMe = void 0), (this.dDa = void 0);
  }
}
exports.TsPureActionHandle = TsPureActionHandle;
//# sourceMappingURL=TsPureActionHandle.js.map
