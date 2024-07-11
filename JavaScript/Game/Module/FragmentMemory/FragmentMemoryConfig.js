"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ClueContentByGroupId_1 = require("../../../Core/Define/ConfigQuery/ClueContentByGroupId");
const ClueEntranceById_1 = require("../../../Core/Define/ConfigQuery/ClueEntranceById");
const PhotoMemoryActivityById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryActivityById");
const PhotoMemoryCollectById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryCollectById");
const PhotoMemoryCollectByTopicID_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryCollectByTopicID");
const PhotoMemoryTopicAll_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryTopicAll");
const PhotoMemoryTopicById_1 = require("../../../Core/Define/ConfigQuery/PhotoMemoryTopicById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FragmentMemoryConfig extends ConfigBase_1.ConfigBase {
  GetPhotoMemoryTopicById(e) {
    return PhotoMemoryTopicById_1.configPhotoMemoryTopicById.GetConfig(e);
  }
  GetAllPhotoMemoryTopic() {
    return PhotoMemoryTopicAll_1.configPhotoMemoryTopicAll.GetConfigList();
  }
  GetPhotoMemoryCollectConfigListByTopicId(e) {
    return PhotoMemoryCollectByTopicID_1.configPhotoMemoryCollectByTopicID.GetConfigList(
      e,
    );
  }
  GetPhotoMemoryCollectById(e) {
    return PhotoMemoryCollectById_1.configPhotoMemoryCollectById.GetConfig(e);
  }
  GetPhotoMemoryActivityById(e) {
    return PhotoMemoryActivityById_1.configPhotoMemoryActivityById.GetConfig(e);
  }
  GetClueEntrance(e) {
    return ClueEntranceById_1.configClueEntranceById.GetConfig(e);
  }
  GetClueContent(e) {
    return ClueContentByGroupId_1.configClueContentByGroupId.GetConfigList(e);
  }
  GetTopicNotOpenTexturePath() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "FragmentMemoryNotOpenTexture",
    );
  }
  GetTopicNotOpenTextureLightPath() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "FragmentMemoryNotOpenLightTexture",
    );
  }
}
exports.FragmentMemoryConfig = FragmentMemoryConfig;
// # sourceMappingURL=FragmentMemoryConfig.js.map
