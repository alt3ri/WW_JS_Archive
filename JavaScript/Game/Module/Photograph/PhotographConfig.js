"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographConfig = void 0);
const PhotoMontageById_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageById");
const PhotoMontageByRoleId_1 = require("../../../Core/Define/ConfigQuery/PhotoMontageByRoleId");
const PhotoSetupAll_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupAll");
const PhotoSetupByValueType_1 = require("../../../Core/Define/ConfigQuery/PhotoSetupByValueType");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const PhotographDefine_1 = require("./PhotographDefine");
class PhotographConfig extends ConfigBase_1.ConfigBase {
  GetPhotoMontageConfig(e) {
    return PhotoMontageById_1.configPhotoMontageById.GetConfig(e);
  }
  GetPhotoMontageConfigListByRoleId(e) {
    return PhotoMontageByRoleId_1.configPhotoMontageByRoleId.GetConfigList(e);
  }
  GetPhotoSetupConfig(e) {
    return PhotoSetupByValueType_1.configPhotoSetupByValueType.GetConfig(e);
  }
  GetAllPhotoSetupConfig() {
    return PhotoSetupAll_1.configPhotoSetupAll.GetConfigList();
  }
  GetDepthDistanceDefaultValue() {
    const e = this.GetPhotoSetupConfig(4);
    return e ? e.ValueRange[2] : PhotographDefine_1.DEFAULT_FOCAL_LENTGH;
  }
  GetDepthOfFieldRadiusDefaultValue() {
    const e = this.GetPhotoSetupConfig(5);
    return e ? e.ValueRange[2] : PhotographDefine_1.DEFAULT_APERTURE;
  }
}
exports.PhotographConfig = PhotographConfig;
// # sourceMappingURL=PhotographConfig.js.map
