
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ActivityCollectionConfig=void 0;const GatherActivityAll_1=require("../../../../../Core/Define/ConfigQuery/GatherActivityAll"),GatherActivityById_1=require("../../../../../Core/Define/ConfigQuery/GatherActivityById"),ConfigBase_1=require("../../../../../Core/Framework/ConfigBase");class ActivityCollectionConfig extends ConfigBase_1.ConfigBase{GetActivityCollectionConfig(e){return GatherActivityById_1.configGatherActivityById.GetConfig(e)}GetAllActivityCollectionConfig(){return GatherActivityAll_1.configGatherActivityAll.GetConfigList()}}exports.ActivityCollectionConfig=ActivityCollectionConfig;
//# sourceMappingURL=ActivityCollectionConfig.js.map