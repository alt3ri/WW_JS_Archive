"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPureKeyHandle = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  ModelManager_1 = require("../Manager/ModelManager"),
  LogReportModel_1 = require("../Module/LogReport/LogReportModel"),
  HotKeyViewDefine_1 = require("../Module/UiNavigation/HotKeyViewDefine");
class TsPureKeyHandle {
  constructor() {
    (this.R$e = void 0),
      (this.Hya = void 0),
      (this.OnPressAnyKey = (e) => {
        Info_1.Info.IsBuildShipping
          ? (ModelManager_1.ModelManager.PlatformModel.OnPressAnyKey(e),
            LogReportModel_1.LogReportModel.RecordOperateTime(),
            this.Hya.PressAnyKey(e))
          : this.R$e.OnPressAnyKey(e);
      }),
      (this.OnReleaseAnyKey = (e) => {
        Info_1.Info.IsBuildShipping
          ? this.Hya.ReleaseAnyKey(e)
          : this.R$e.OnReleaseAnyKey(e);
      });
  }
  Initialize(e, i) {
    (this.R$e = e), (this.Hya = i);
  }
  Reset() {
    (this.R$e = void 0), (this.Hya = void 0);
  }
  BindKey() {
    cpp_1.FKuroInputInterface.RegisterKeyBinding(
      new UE.InputChord(
        new UE.Key(
          FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
        ),
        !1,
        !1,
        !1,
        !1,
      ),
      0,
      this.R$e,
      this,
      this.OnPressAnyKey,
    ),
      cpp_1.FKuroInputInterface.RegisterKeyBinding(
        new UE.InputChord(
          new UE.Key(
            FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.ANY_KEY),
          ),
          !1,
          !1,
          !1,
          !1,
        ),
        1,
        this.R$e,
        this,
        this.OnReleaseAnyKey,
      );
  }
}
exports.TsPureKeyHandle = TsPureKeyHandle;
//# sourceMappingURL=TsPureKeyHandle.js.map
