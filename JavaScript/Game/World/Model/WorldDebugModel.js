"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldDebugModel =
    exports.TOTAL_MAX_COUINT =
    exports.AOI_NPC_MONSTER_MAX_COUNT =
    exports.AOI_VISION_MAX_COUNT =
    exports.AOI_SUMMON_MAX_COUNT =
    exports.AOI_ROLE_MAX_COUNT =
    exports.AOI_WEAPON_MAX_COUNT =
    exports.FIGHTING_TOTAL_MAX_COUINT =
    exports.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT =
    exports.FIGHTING_AOI_VISION_MAX_COUNT =
    exports.FIGHTING_AOI_SUMMON_MAX_COUNT =
    exports.FIGHTING_AOI_ROLE_MAX_COUNT =
    exports.FIGHTING_AOI_WEAPON_MAX_COUNT =
      void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GlobalData_1 = require("../../GlobalData");
(exports.FIGHTING_AOI_WEAPON_MAX_COUNT = 4),
  (exports.FIGHTING_AOI_ROLE_MAX_COUNT = 4),
  (exports.FIGHTING_AOI_SUMMON_MAX_COUNT = 4),
  (exports.FIGHTING_AOI_VISION_MAX_COUNT = 4),
  (exports.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT = 50),
  (exports.FIGHTING_TOTAL_MAX_COUINT = 97),
  (exports.AOI_WEAPON_MAX_COUNT = 6),
  (exports.AOI_ROLE_MAX_COUNT = 4),
  (exports.AOI_SUMMON_MAX_COUNT = 4),
  (exports.AOI_VISION_MAX_COUNT = 4),
  (exports.AOI_NPC_MONSTER_MAX_COUNT = 50),
  (exports.TOTAL_MAX_COUINT = 95);
class WorldDebugModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GEr = !0),
      (this.AoiTotalSet = new Set()),
      (this.AoiSummonSet = new Set()),
      (this.AoiVisionSet = new Set()),
      (this.AoiMonsterSet = new Set()),
      (this.AoiNpcSet = new Set()),
      (this.AoiRoleSet = new Set());
  }
  set EnableDebug(t) {
    this.GEr = t;
  }
  get EnableDebug() {
    return this.GEr;
  }
  AddSummonEntity(t) {
    t && (this.AoiSummonSet.add(t), this.AoiTotalSet.add(t));
  }
  AddVisionEntity(t) {
    t && (this.AoiVisionSet.add(t), this.AoiTotalSet.add(t));
  }
  AddMonsterEntity(t) {
    t && (this.AoiMonsterSet.add(t), this.AoiTotalSet.add(t));
  }
  AddNpcEntity(t) {
    t && (this.AoiNpcSet.add(t), this.AoiTotalSet.add(t));
  }
  AddRoleEntity(t) {
    t && (this.AoiRoleSet.add(t), this.AoiTotalSet.add(t));
  }
  RemoveSummonEntity(t) {
    t && (this.AoiSummonSet.delete(t), this.AoiTotalSet.delete(t));
  }
  AddEntity(t, e) {
    if (e)
      switch (t) {
        case Protocol_1.Aki.Protocol.wks.Proto_Player:
          this.AddRoleEntity(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Monster:
          this.AddMonsterEntity(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Npc:
          this.AddNpcEntity(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Vision:
          this.AddVisionEntity(e);
      }
  }
  RemoveEntity(t, e) {
    if (e)
      switch (t) {
        case Protocol_1.Aki.Protocol.wks.Proto_Player:
          this.AoiRoleSet.delete(e), this.AoiTotalSet.delete(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Monster:
          this.AoiMonsterSet.delete(e), this.AoiTotalSet.delete(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Npc:
          this.AoiNpcSet.delete(e), this.AoiTotalSet.delete(e);
          break;
        case Protocol_1.Aki.Protocol.wks.Proto_Vision:
          this.AoiVisionSet.delete(e), this.AoiTotalSet.delete(e);
      }
  }
  OnLeaveLevel() {
    return (
      UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
        this.EnableDebug &&
        (this.AoiTotalSet.clear(),
        this.AoiSummonSet.clear(),
        this.AoiVisionSet.clear(),
        this.AoiMonsterSet.clear(),
        this.AoiNpcSet.clear(),
        this.AoiRoleSet.clear()),
      !0
    );
  }
}
exports.WorldDebugModel = WorldDebugModel;
//# sourceMappingURL=WorldDebugModel.js.map
