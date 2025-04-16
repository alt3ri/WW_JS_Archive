"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.exportBranchConfigToJson =
    exports.loadBranchConfigFromJson =
    exports.getAllBranchConfigs =
    exports.getAllPlannedBranchConfigs =
    exports.getAllDepotBranchConfigs =
    exports.allPlannedBranchConfig =
    exports.allDepotBranchConfig =
      void 0);
const File_1 = require("./Misc/File"),
  Util_1 = require("./Misc/Util");
function getAllDepotBranchConfigs() {
  return exports.allDepotBranchConfig;
}
function getAllPlannedBranchConfigs() {
  return exports.allPlannedBranchConfig;
}
(exports.allDepotBranchConfig = [
  {
    Branch: "branch_1.0",
    Stream: "//aki/branch_1.0",
    ShortName: "1.0",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Win64\\branch_1.0",
    IsPublished: !0,
  },
  {
    Branch: "branch_1.1",
    Stream: "//aki/branch_1.1",
    ShortName: "1.1",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.1\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_1.2",
    Stream: "//aki/branch_1.2",
    ShortName: "1.2",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.2\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_1.3",
    Stream: "//aki/branch_1.3",
    ShortName: "1.3",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.3\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_1.4",
    Stream: "//aki/branch_1.4",
    ShortName: "1.4",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_1.4\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_2.0",
    Stream: "//aki/branch_2.0",
    ShortName: "2.0",
    IdSegment: [0, 0],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_2.0\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_2.1",
    Stream: "//aki/branch_2.1",
    ShortName: "2.1",
    IdSegment: [7e5, 749999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_2.1\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !0,
  },
  {
    Branch: "branch_2.2",
    Stream: "//aki/branch_2.2",
    ShortName: "2.2",
    IdSegment: [75e4, 799999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_2.2\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
  {
    Branch: "branch_2.3",
    Stream: "//aki/branch_2.3",
    ShortName: "2.3",
    IdSegment: [8e5, 849999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_2.3\\Win64\\Development\\CN\\Development\\Development\\Package",
    IsPublished: !1,
  },
  {
    Branch: "branch_2.4",
    Stream: "//aki/branch_2.4",
    ShortName: "2.4",
    IdSegment: [85e4, 899999],
    SharedPackageDir:
      "\\\\share.kuro.com\\share\\aki\\Package\\Wuthering_Waves\\branch_2.4\\Win64\\Development\\CN\\Development\\Development\\Package",
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
    { Branch: "branch_2.5", ShortName: "2.5", IdSegment: [3e5, 349999] },
    { Branch: "branch_2.6", ShortName: "2.6", IdSegment: [35e4, 399999] },
    { Branch: "branch_2.7", ShortName: "2.7", IdSegment: [0, 49999] },
    { Branch: "branch_2.8", ShortName: "2.8", IdSegment: [5e4, 99999] },
    { Branch: "development", ShortName: "dev", IdSegment: [5e5, 699999] },
  ]),
  (exports.getAllDepotBranchConfigs = getAllDepotBranchConfigs),
  (exports.getAllPlannedBranchConfigs = getAllPlannedBranchConfigs);
let allBranchConfig = void 0;
function getAllBranchConfigs() {
  return (
    allBranchConfig ||
      ((allBranchConfig = [...exports.allDepotBranchConfig]).pop(),
      allBranchConfig.push(...exports.allPlannedBranchConfig),
      allBranchConfig.pop(),
      allBranchConfig.push(
        exports.allDepotBranchConfig[exports.allDepotBranchConfig.length - 1],
      )),
    allBranchConfig
  );
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
  (0, Util_1.writeJson)(exports.allDepotBranchConfig, e);
}
(exports.getAllBranchConfigs = getAllBranchConfigs),
  (exports.loadBranchConfigFromJson = loadBranchConfigFromJson),
  (exports.exportBranchConfigToJson = exportBranchConfigToJson);
//# sourceMappingURL=BranchConfig.js.map
