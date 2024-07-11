"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BubbleConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  BubbleDataByActionGuid_1 = require("../../../Core/Define/ConfigQuery/BubbleDataByActionGuid"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../Common/PublicUtil");
class BubbleConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.uvr = void 0);
  }
  OnInit() {
    return (this.uvr = new Map()), !0;
  }
  OnClear() {
    return !(this.uvr = void 0);
  }
  cvr(e) {
    e = BubbleDataByActionGuid_1.configBubbleDataByActionGuid.GetConfig(e, !1);
    if (e) return e;
  }
  GetBubbleData(e) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this.uvr.get(e)) {
        const t = this.cvr(e);
        if (!t) return;
        var i = JSON.parse(t.Params);
        this.uvr.set(e, i);
      }
      const t = this.uvr.get(e);
      return t ? t : void 0;
    }
    this.ver();
    const t = this.uvr.get(e);
    if (t) return t;
  }
  ver() {
    let e = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.BubbleConfigPath,
    );
    if (
      (PublicUtil_1.PublicUtil.IsUseTempData() ||
        (e = (0, PublicUtil_1.getConfigPath)(
          IGlobal_1.globalConfigTemp.BubbleConfigPath,
        )),
      UE.BlueprintPathsLibrary.FileExists(e))
    ) {
      var i,
        t = (0, puerts_1.$ref)(""),
        t =
          (UE.KuroStaticLibrary.LoadFileToString(t, e),
          (t = (0, puerts_1.$unref)(t)),
          JSON.parse(t));
      for (const r of t)
        r.ActionGuid &&
          (i = r.Params) &&
          !this.uvr.has(r.ActionGuid) &&
          this.uvr.set(r.ActionGuid, i);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          51,
          "[CharacterFlowDynamic] 不存在BubbleConfig.json文件。",
          ["Path", e],
        );
  }
}
exports.BubbleConfig = BubbleConfig;
//# sourceMappingURL=BubbleConfig.js.map
