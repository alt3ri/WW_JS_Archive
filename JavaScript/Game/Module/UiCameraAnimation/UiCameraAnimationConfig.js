
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UiCameraAnimationConfig=void 0;const ChildUiCameraMappingAll_1=require("../../../Core/Define/ConfigQuery/ChildUiCameraMappingAll"),ChildUiCameraMappingByViewName_1=require("../../../Core/Define/ConfigQuery/ChildUiCameraMappingByViewName"),UiCameraMappingAll_1=require("../../../Core/Define/ConfigQuery/UiCameraMappingAll"),UiCameraMappingByViewName_1=require("../../../Core/Define/ConfigQuery/UiCameraMappingByViewName"),UiShowByViewName_1=require("../../../Core/Define/ConfigQuery/UiShowByViewName"),ConfigBase_1=require("../../../Core/Framework/ConfigBase"),DataTableUtil_1=require("../../../Core/Utils/DataTableUtil");class UiCameraAnimationConfig extends ConfigBase_1.ConfigBase{GetViewConfig(e){return UiShowByViewName_1.configUiShowByViewName.GetConfig(e)}GetUiCameraAnimationConfig(e){return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(16,e)}GetUiCameraAnimationBlendData(e){return DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(15,e)}GetUiCameraMappingConfig(e){return UiCameraMappingByViewName_1.configUiCameraMappingByViewName.GetConfig(e)}GetChildUiCameraMappingConfig(e){return ChildUiCameraMappingByViewName_1.configChildUiCameraMappingByViewName.GetConfig(e)}GetAllUiCameraMappingConfig(){return UiCameraMappingAll_1.configUiCameraMappingAll.GetConfigList()}GetAllChildUiCameraMappingConfig(){return ChildUiCameraMappingAll_1.configChildUiCameraMappingAll.GetConfigList()}}exports.UiCameraAnimationConfig=UiCameraAnimationConfig;
//# sourceMappingURL=UiCameraAnimationConfig.js.map