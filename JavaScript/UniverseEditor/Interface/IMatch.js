"use strict";
let EMatchRoleType, EBulletPenetrationType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.sceneInteractionEffectConfig =
    exports.sceneInteractionStateConfig =
    exports.EBulletPenetrationType =
    exports.EMatchRoleType =
    exports.controlMatchConfig =
    exports.entityPlotBindingConfig =
      void 0),
  (exports.entityPlotBindingConfig = {
    Liufangzhe: "流放者",
    Wuguanzhe: "无冠者",
    BOSS: "BOSS",
    HUABIAO: "华表",
    Dungeon_Entry: "副本入口",
    Seq_Player: "Seq_Player",
    Seq_Boss1: "Seq_Boss1",
    Seq_Boss2: "Seq_Boss2",
    Seq_Monster1: "Seq_Monster1",
    Seq_Monster2: "Seq_Monster2",
    Seq_Monster3: "Seq_Monster3",
    Seq_Monster4: "Seq_Monster4",
    Seq_Monster5: "Seq_Monster5",
    Seq_NPC1: "Seq_NPC1",
    Seq_NPC2: "Seq_NPC2",
    Seq_NPC3: "Seq_NPC3",
    Seq_NPC4: "Seq_NPC4",
    Seq_NPC5: "Seq_NPC5",
  }),
  (exports.controlMatchConfig = {
    "关卡.Common.被控物.电池": !0,
    "关卡.Common.被控物.控物拼图": !0,
    "关卡.Common.被控物.控物壁画": !0,
    "关卡.Common.被控物.控物管道": !0,
    "关卡.Common.被控物.共鸣装置": !0,
    "关卡.Common.被控物.怪物扭蛋": !0,
    "关卡.Common.被控物.递质原液": !1,
    "关卡.Common.被控物.爆炸桶": !1,
    "关卡.Common.被控物.爆裂鸣晶": !1,
    "关卡.Common.被控物.战斗可控物": !1,
    "关卡.Common.被控物.悲叹花种": !0,
    "关卡.Common.被控物.鸣化递质": !1,
    "关卡.Common.被控物.脉冲装置": !0,
    "关卡.Common.被控物.副本开启道具": !0,
    "关卡.Common.被控物.爆炸长矛": !1,
    "关卡.Common.被控物.重力方块": !1,
    "关卡.Common.被控物.爆炸果实": !1,
    "关卡.Common.被控物.光线传导水晶": !0,
  }),
  (function (e) {
    (e.Player = "Player"), (e.Phantom = "Phantom");
  })(
    (EMatchRoleType = exports.EMatchRoleType || (exports.EMatchRoleType = {})),
  ),
  (function (e) {
    (e.Penetrable = "Penetrable"), (e.Impenetrable = "Impenetrable");
  })(
    (EBulletPenetrationType =
      exports.EBulletPenetrationType || (exports.EBulletPenetrationType = {})),
  ),
  (exports.sceneInteractionStateConfig = {
    0: "State1",
    1: "State2",
    2: "State3",
    3: "State4",
    4: "State5",
    5: "State6",
    6: "State7",
    7: "State8",
    8: "State9",
    9: "State10",
    10: "State11",
    11: "State12",
    12: "State13",
    13: "State14",
    14: "State15",
    15: "State16",
    16: "State17",
    17: "State18",
    18: "State19",
    19: "State20",
    20: "ConcealedState",
    21: "Error",
    22: "MAX",
  }),
  (exports.sceneInteractionEffectConfig = {
    0: "Effect0",
    1: "Effect1",
    2: "Effect2",
    3: "Effect3",
    4: "Effect4",
    5: "Effect5",
    6: "Effect6",
    7: "Effect7",
    8: "Effect8",
    9: "Effect9",
    10: "Error",
    11: "MAX",
  });
// # sourceMappingURL=IMatch.js.map
