"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPhantomCollectConfig = void 0);
const PhantomCollectActivityById_1 = require("../../../../../Core/Define/ConfigQuery/PhantomCollectActivityById");
const PhantomCollectTaskDescById_1 = require("../../../../../Core/Define/ConfigQuery/PhantomCollectTaskDescById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityPhantomCollectConfig extends ConfigBase_1.ConfigBase {
  GetPhantomCollectConfig(e) {
    return PhantomCollectActivityById_1.configPhantomCollectActivityById.GetConfig(
      e,
    );
  }
  GetPhantomCollectTaskDesc(e) {
    return PhantomCollectTaskDescById_1.configPhantomCollectTaskDescById.GetConfig(
      e,
    );
  }
}
exports.ActivityPhantomCollectConfig = ActivityPhantomCollectConfig;
// # sourceMappingURL=ActivityPhantomCollectConfig.js.map
