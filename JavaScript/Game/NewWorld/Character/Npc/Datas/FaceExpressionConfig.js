"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FaceExpressionConfig = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const FaceExpressionDataById_1 = require("../../../../../Core/Define/ConfigQuery/FaceExpressionDataById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
class FaceExpressionConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.MZo = void 0), (this.SZo = !1);
  }
  OnInit() {
    return (this.MZo = new Map()), !0;
  }
  OnClear() {
    return !(this.MZo = void 0);
  }
  GetFaceExpressionConfig(i) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      const r = FaceExpressionDataById_1.configFaceExpressionDataById.GetConfig(
        i,
        !1,
      );
      if (!r || !r.FaceExpression) return;
      let e = void 0;
      return (
        r.MaleVariant && (e = JSON.parse(r.MaleVariant)),
        {
          Id: r.Id,
          FaceExpression: JSON.parse(r.FaceExpression),
          MaleVariant: e,
        }
      );
    }
    return this.EZo(), this.MZo.get(i);
  }
  EZo() {
    if (!this.SZo) {
      this.SZo = !0;
      let e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfig.FaceExpressionConfigPath,
      );
      if (
        (PublicUtil_1.PublicUtil.IsUseTempData() ||
          (e = (0, PublicUtil_1.getConfigPath)(
            IGlobal_1.globalConfigTemp.FaceExpressionConfigPath,
          )),
        UE.BlueprintPathsLibrary.FileExists(e))
      ) {
        var i = (0, puerts_1.$ref)("");
        var i =
          (UE.KuroStaticLibrary.LoadFileToString(i, e),
          (i = (0, puerts_1.$unref)(i)),
          JSON.parse(i));
        for (const r of i) r && !this.MZo.has(r.Id) && this.MZo.set(r.Id, r);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            51,
            "[FaceExpressionConfig] 不存在FaceExpressionConfig.json文件。",
            ["Path", e],
          );
    }
  }
}
exports.FaceExpressionConfig = FaceExpressionConfig;
// # sourceMappingURL=FaceExpressionConfig.js.map
