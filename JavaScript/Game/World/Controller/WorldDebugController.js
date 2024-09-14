"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldDebugController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WorldDebugModel_1 = require("../Model/WorldDebugModel");
class WorldDebugController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
        ModelManager_1.ModelManager.WorldDebugModel.EnableDebug &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddEntity,
          WorldDebugController.GUe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          WorldDebugController.zpe,
        )),
      !0
    );
  }
  static OnClear() {
    return (
      UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
        ModelManager_1.ModelManager.WorldDebugModel.EnableDebug &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddEntity,
          WorldDebugController.GUe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          WorldDebugController.zpe,
        )),
      !0
    );
  }
  static Xpr() {
    var e = ModelManager_1.ModelManager.WorldDebugModel.AoiNpcSet.size,
      o = ModelManager_1.ModelManager.WorldDebugModel.AoiMonsterSet.size,
      t = e + o,
      l =
        0 < (l = t - WorldDebugModel_1.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT)
          ? l
          : 0,
      a = ModelManager_1.ModelManager.WorldDebugModel.AoiVisionSet.size,
      n = 0 < (n = a - WorldDebugModel_1.FIGHTING_AOI_VISION_MAX_COUNT) ? n : 0;
    if (
      !(
        ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size <=
          WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT && 0 == n
      )
    ) {
      var _ = Global_1.Global.BaseCharacter?.K2_GetActorLocation(),
        _ = `
        主控玩家当前位置：X:${_?.X} Y:${_?.Y} Z:${_?.Z}

        区域类型:战斗区域

        幻像数量上限:${WorldDebugModel_1.FIGHTING_AOI_VISION_MAX_COUNT}    幻像数量:${a}    幻像超出数量:${n}

        NPC+Monster数量上限:${WorldDebugModel_1.FIGHTING_AOI_NPC_MONSTER_MAX_COUNT}    NPC数量:${e}    Monster数量:${o}    NPC+Monster数量:${t}     NPC+Monster超出数量:${l}

        `,
        d = new Array();
      for (const D of ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet) {
        var u = D.Entity.GetComponent(0),
          M = u.GetCreatureDataId(),
          g = this.$pr(u.GetEntityType()),
          i = u.GetBaseInfo()?.TidName,
          M = {
            CreatureDataId: M,
            EntityType: g ?? "",
            PbDataId: u.GetPbDataId(),
            Name: u.GetPbEntityInitData()
              ? (u.GetPbEntityInitData().Name ?? "")
              : i ||
                (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  u.GetRoleConfig().Name,
                ) ??
                  ""),
          };
        d.push(M);
      }
      d.sort((e, r) => (e.EntityType > r.EntityType ? 1 : -1));
      let r = "实体数据如下:\n";
      for (let e = 0; e < d.length; ++e) {
        var s = d[e];
        r += `索引:${e}, 类型:${s.EntityType},CreatureDataId:${s.CreatureDataId}, PbDataId:${s.PbDataId}, Name:${s.Name}
`;
      }
      a =
        `战斗区域单位超出上限值${WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT}    当前总数量:${ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size}    总数超出数量:${ModelManager_1.ModelManager.WorldDebugModel.AoiTotalSet.size - WorldDebugModel_1.FIGHTING_TOTAL_MAX_COUINT}
${_}
` + r;
      Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, a);
    }
  }
  static $pr(e) {
    switch (e) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
        return "角色";
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        return "怪物";
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        return "NPC";
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        return "幻像";
      default:
        return;
    }
  }
}
((exports.WorldDebugController = WorldDebugController).GUe = (e, r, o) => {
  var t;
  r &&
    ((t = r.Entity.GetComponent(0)),
    ModelManager_1.ModelManager.WorldDebugModel.AddEntity(t.GetEntityType(), r),
    WorldDebugController.Xpr());
}),
  (WorldDebugController.zpe = (e, r) => {
    var o;
    r &&
      ((o = r.Entity.GetComponent(0)),
      ModelManager_1.ModelManager.WorldDebugModel.RemoveEntity(
        o.GetEntityType(),
        r,
      ));
  });
//# sourceMappingURL=WorldDebugController.js.map
