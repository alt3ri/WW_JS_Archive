"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDangoMonopolyConfig = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  DangoMonopolyBoardByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyBoardByGroup"),
  DangoMonopolyBoardById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyBoardById"),
  DangoMonopolyByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyByActivityId"),
  DangoMonopolyGridByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyGridByGroup"),
  DangoMonopolyGridById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyGridById"),
  DangoMonopolyMapPointByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyMapPointByActivityId"),
  DangoMonopolyPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyPropertyById"),
  DangoMonopolyTaskByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyTaskByGroup"),
  DangoMonopolyTaskById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyTaskById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityDangoMonopolyConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.ty1 = void 0), (this.rS1 = !1);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetInfo(o) {
    return DangoMonopolyByActivityId_1.configDangoMonopolyByActivityId.GetConfig(
      o,
    );
  }
  GetBoard(o) {
    return DangoMonopolyBoardById_1.configDangoMonopolyBoardById.GetConfig(o);
  }
  GetBoardList(o) {
    return (
      DangoMonopolyBoardByGroup_1.configDangoMonopolyBoardByGroup.GetConfigList(
        o,
      ) ?? []
    );
  }
  GetTask(o) {
    return DangoMonopolyTaskById_1.configDangoMonopolyTaskById.GetConfig(o);
  }
  GetTaskList(o) {
    return (
      DangoMonopolyTaskByGroup_1.configDangoMonopolyTaskByGroup.GetConfigList(
        o,
      ) ?? []
    );
  }
  GetGrid(o) {
    return DangoMonopolyGridById_1.configDangoMonopolyGridById.GetConfig(o);
  }
  GetGridList(o) {
    return (
      DangoMonopolyGridByGroup_1.configDangoMonopolyGridByGroup.GetConfigList(
        o,
      ) ?? []
    );
  }
  GetProperty(o) {
    return DangoMonopolyPropertyById_1.configDangoMonopolyPropertyById.GetConfig(
      o,
    );
  }
  GetGridPoint(o) {
    return (
      DangoMonopolyMapPointByActivityId_1.configDangoMonopolyMapPointByActivityId.GetConfigList(
        o,
      ) ?? []
    );
  }
  GetBattleConfigPath() {
    return "/Game/Aki/Character/NPC/Tuanzi/CommonConfig/DangoGlobalConfig_Monopoly.DangoGlobalConfig_Monopoly";
  }
  GetActiveDangoAniInfo() {
    return (
      CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "DangoMonopolyActiveDangoAni",
      ) ?? []
    );
  }
  GetIsOpenHintShow() {
    return (
      void 0 === this.ty1 &&
        (this.ty1 =
          CommonParamById_1.configCommonParamById.GetBoolConfig(
            "DangoMonopolyIsOpenHintShow",
          ) ?? !1),
      this.ty1
    );
  }
  SetPushHintState(o) {
    this.rS1 = o;
  }
  GetIsPushHintShow() {
    return !!this.rS1 && !!this.GetIsOpenHintShow();
  }
  GetDangoMoveInTime() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonopolyDangoInTime",
      ) ?? 0
    );
  }
  GetDangoMoveOutTime() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonopolyDangoOutTime",
      ) ?? 0
    );
  }
  GetDangoMoveOutDelayTime() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonopolyDangoOutDelayTime",
      ) ?? 0
    );
  }
  GetDangoChangeCheckTime() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonopolyDangoChangeCheckTime",
      ) ?? 0
    );
  }
}
exports.ActivityDangoMonopolyConfig = ActivityDangoMonopolyConfig;
//# sourceMappingURL=ActivityDangoMonopolyConfig.js.map
