"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exportBranchConfigToJson =
    exports.loadBranchConfigFromJson =
    exports.getAllPlannedBranchConfigs =
    exports.getAllBranchConfigs =
    exports.allPlannedBranchConfig =
    exports.allBranchConfig =
      void 0);
const File_1 = require("./Misc/File"),
  Util_1 = require("./Misc/Util");
function getAllBranchConfigs() {
  return exports.allBranchConfig;
}
function getAllPlannedBranchConfigs() {
  return exports.allPlannedBranchConfig;
}
function getBranchConfigJsonPath() {
  return (0, File_1.getProjectPath)(
    "TypeScript/Src/UniverseEditor/Config/BranchConfig.json",
  );
}
function loadBranchConfigFromJson() {
  var e = getBranchConfigJsonPath();
  return (0, Util_1.readJsonObj)(e, []);
}
function exportBranchConfigToJson() {
  var e = getBranchConfigJsonPath();
  (0, Util_1.writeJson)(exports.allBranchConfig, e);
}
(exports.allBranchConfig = [
  {
    Branch: "branch_1.0",
    Stream: "//aki/branch_1.0",
    ShortName: "1.0",
    IdSegment: [8e5, 899999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Win64\\branch_1.0",
    IsPublished: !1,
  },
  {
    Branch: "branch_1.1",
    Stream: "//aki/branch_1.1",
    ShortName: "1.1",
    IdSegment: [9e5, 999999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.1\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
  {
    Branch: "branch_1.2",
    Stream: "//aki/branch_1.2",
    ShortName: "1.2",
    IdSegment: [7e5, 749999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.2\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
  {
    Branch: "branch_1.3",
    Stream: "//aki/branch_1.3",
    ShortName: "1.3",
    IdSegment: [75e4, 799999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.3\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
  {
    Branch: "development",
    Stream: "//aki/development",
    ShortName: "dev",
    IdSegment: [0, 699999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\development\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
]),
  (exports.allPlannedBranchConfig = [
    { Branch: "branch_1.4", ShortName: "1.4" },
    { Branch: "branch_2.0", ShortName: "2.0" },
    { Branch: "branch_2.1", ShortName: "2.1" },
    { Branch: "branch_2.2", ShortName: "2.2" },
    { Branch: "development", ShortName: "dev" },
  ]),
  (exports.getAllBranchConfigs = getAllBranchConfigs),
  (exports.getAllPlannedBranchConfigs = getAllPlannedBranchConfigs),
  (exports.loadBranchConfigFromJson = loadBranchConfigFromJson),
  (exports.exportBranchConfigToJson = exportBranchConfigToJson);
//# sourceMappingURL=BranchConfig.js.map
