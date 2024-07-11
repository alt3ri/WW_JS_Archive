"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcConfigModel = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
class NpcConfigModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.jZ = void 0);
  }
  OnInit() {
    return this.XZ(), !0;
  }
  XZ() {
    this.jZ = new Map();
    let e = (0, PublicUtil_1.getConfigPath)(
      IGlobal_1.globalConfig.MontageConfigPath,
    );
    PublicUtil_1.PublicUtil.IsUseTempData() ||
      (e = (0, PublicUtil_1.getConfigPath)(
        IGlobal_1.globalConfigTemp.MontageConfigPath,
      ));
    let t = (0, puerts_1.$ref)("");
    if (
      (UE.KuroStaticLibrary.LoadFileToString(t, e),
      (t = (0, puerts_1.$unref)(t)))
    )
      for (const r of JSON.parse(t).Montages) this.jZ.set(r.Id, r);
  }
  GetMontageConfig(e) {
    return this.jZ.get(e);
  }
}
exports.NpcConfigModel = NpcConfigModel;
// # sourceMappingURL=NpcConfigModel.js.map
