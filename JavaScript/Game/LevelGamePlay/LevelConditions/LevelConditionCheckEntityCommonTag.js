
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LevelConditionCheckEntityCommonTag=void 0;const UE=require("ue"),EntitySystem_1=require("../../../Core/Entity/EntitySystem"),ModelManager_1=require("../../Manager/ModelManager"),LevelGeneralBase_1=require("../LevelGeneralBase");class LevelConditionCheckEntityCommonTag extends LevelGeneralBase_1.LevelConditionBase{Check(e,r){var t=UE.KismetStringLibrary.Conv_StringToInt64(e.LimitParams.get("CreatureGen")),n=parseInt(e.LimitParams.get("EntityConfigId")),a=e.LimitParams.get("EntityCommonTag"),e=new Array;ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(t,e);for(const i of e){var o=i.Entity.GetComponent(0);if(o.GetPbDataId()===n)if(!i.Entity.GetComponent(177)?.ContainsTagByName(a))return!1}return!0}CheckNew(e,r){if(!e)return!1;let t=!1;var n=ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.EntityId);return n&&(n=EntitySystem_1.EntitySystem.GetComponent(n.Id,177))&&(t=n.HasTag(e.TagId)),e.IsContain?t:!t}}exports.LevelConditionCheckEntityCommonTag=LevelConditionCheckEntityCommonTag;
//# sourceMappingURL=LevelConditionCheckEntityCommonTag.js.map