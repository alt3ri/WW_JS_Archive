"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncCommon = void 0;
const cpp_1 = require("cpp");
const EntityHelper_1 = require("../Core/Entity/EntityHelper");
const FNameUtil_1 = require("../Core/Utils/FNameUtil");
class AsyncCommon {
  static GetEntitiesInRangeWithLocation(
    location,
    distance,
    entityType,
    result,
    bResetArray = true,
  ) {
    if (bResetArray) {
      result.length = 0;
    }
    const entities = new Array();
    for (let i = 0; i < 6; i++) {
      if (entityType & (1 << i)) {
        cpp_1.FKuroGameBudgetAllocatorInterface.GetEntitiesInRangeWithLocationInMultiThread(
          location,
          distance,
          FNameUtil_1.FNameUtil.GetDynamicFName(
            EntityHelper_1.globalEntityTypeQueryName[i],
          ),
          entities,
        );
        for (const entityInfo of entities) {
          result.push(entityInfo);
        }
        entities.length = 0;
      }
    }
  }
}
exports.AsyncCommon = AsyncCommon;
//# sourceMappingURL=AsyncCommon.js.map
