"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CsvRegistry = exports.ECsvName = void 0);
const IGlobal_1 = require("../../Interface/IGlobal"),
  Init_1 = require("../../Interface/Init"),
  BranchDefine_1 = require("../BranchDefine"),
  Config_1 = require("../Config"),
  EventSystem_1 = require("../Misc/EventSystem"),
  File_1 = require("../Misc/File"),
  Log_1 = require("../Misc/Log"),
  Util_1 = require("../Misc/Util"),
  BattleTagConfigCsv_1 = require("./BattleTagConfigCsv"),
  BlueprintCsv_1 = require("./BlueprintCsv"),
  BtStateConflictCheckWhiteList_1 = require("./BtStateConflictCheckWhiteList"),
  BuffCsv_1 = require("./BuffCsv"),
  BulletCsv_1 = require("./BulletCsv"),
  CipherGameplay_1 = require("./CipherGameplay"),
  CustomSeqCsv_1 = require("./CustomSeqCsv"),
  DataLayerCsv_1 = require("./DataLayerCsv"),
  DungeonRewardWhiteListCsv_1 = require("./DungeonRewardWhiteListCsv"),
  EntityPerformanceAttributeCsv_1 = require("./EntityPerformanceAttributeCsv"),
  ExcelFormatCsv_1 = require("./ExcelFormatCsv"),
  ExtendedEntityCsv_1 = require("./ExtendedEntityCsv"),
  FaceExpressionCSV_1 = require("./FaceExpressionCSV"),
  FlowTemplateCsv_1 = require("./FlowTemplateCsv"),
  GlobalConfigCsv_1 = require("./GlobalConfigCsv"),
  InteractAudioMaterialCsv_1 = require("./InteractAudioMaterialCsv"),
  LevelsConfigCsv_1 = require("./LevelsConfigCsv"),
  MonsterDisplay_1 = require("./MonsterDisplay"),
  MontageCsv_1 = require("./MontageCsv"),
  MorseCodeCsv_1 = require("./MorseCodeCsv"),
  OccupationCsv_1 = require("./OccupationCsv"),
  PlayerStateRestrictionCsv_1 = require("./PlayerStateRestrictionCsv"),
  PlotHandBookCsv_1 = require("./PlotHandBookCsv"),
  RandomPrefabCsv_1 = require("./RandomPrefabCsv"),
  RegionMpcCsv_1 = require("./RegionMpcCsv"),
  SetEntityVisibleWhiteListCsv_1 = require("./SetEntityVisibleWhiteListCsv"),
  SexFormat_1 = require("./SexFormat"),
  SignalBreakCsv_1 = require("./SignalBreakCsv"),
  SkyboxCsv_1 = require("./SkyboxCsv"),
  SpecialHateAndSenseCsv_1 = require("./SpecialHateAndSenseCsv"),
  StandbyTagCsv_1 = require("./StandbyTagCsv"),
  TagCsv_1 = require("./TagCsv"),
  TalkerCsv_1 = require("./TalkerCsv"),
  TalkIconCsv_1 = require("./TalkIconCsv"),
  TelecomCsv_1 = require("./TelecomCsv"),
  TidTextCsv_1 = require("./TidTextCsv"),
  TimbreAkEvent_1 = require("./TimbreAkEvent"),
  TimbreCsv_1 = require("./TimbreCsv"),
  UniversalTone_1 = require("./UniversalTone"),
  VarConfigCsv_1 = require("./VarConfigCsv");
var ECsvName;
!(function (e) {
  (e.Global = "q.全局配置"),
    (e.Talker = "d.对话人"),
    (e.CustomSeq = "z.自定义序列"),
    (e.BaseBlueprint = "j.基础蓝图"),
    (e.ExtendedEntity = "s.实体"),
    (e.ExcelFormat = "e.Excel通配符"),
    (e.DescText = "w.文本"),
    (e.StandbyTag = "d.待机动作"),
    (e.Map = "d.地图"),
    (e.TidText = "w.文本"),
    (e.Var = "b.变量"),
    (e.Occupation = "z.占用组定义"),
    (e.Buff = "b.Buff"),
    (e.Bullet = "z.子弹"),
    (e.GameplayTag = "g.GameplayTag"),
    (e.EntityPerformanceAttribute = "s.实体表现属性"),
    (e.FlowTemplate = "y.演出模板"),
    (e.Montage = "m.蒙太奇"),
    (e.ABPMontage = "a.ABP蒙太奇映射表"),
    (e.ABPOverlayMontage = "a.ABP叠加蒙太奇映射表"),
    (e.FaceExpression = "b.表情"),
    (e.SexFormat = "x.性别通配符"),
    (e.SpecialHateAndSense = "t.特殊仇恨感知"),
    (e.InteractAudioMaterial = "j.交互材质音频"),
    (e.CipherGameplay = "m.密码锁"),
    (e.Skybox = "t.天空盒"),
    (e.MonsterDisplay = "g.怪物信息展示"),
    (e.Telecom = "t.通讯"),
    (e.TalkIcon = "d.对话选项图标"),
    (e.RandomPrefab = "s.随机预制体"),
    (e.DataLayer = "d.DataLayer"),
    (e.BattleTagConfig = "z.战斗事件"),
    (e.MultiText = "w.文本库"),
    (e.SignalBreakData = "x.信号破译谱面配置"),
    (e.SignalBreakConfig = "x.信号破译玩法配置"),
    (e.RegionMpc = "q.区域Mpc配置"),
    (e.PlayerStateRestriction = "w.玩家状态限制"),
    (e.MorseCode = "m.捕获信号玩法配置"),
    (e.MorseCodeDifficulty = "m.捕获信号玩法难度"),
    (e.Timbre = "y.音色"),
    (e.UniversalTone = "t.通用语气事件"),
    (e.TimbreAkEvent = "y.音色语音事件映射"),
    (e.DungeonRewardWhiteList = "f.副本掉落白名单"),
    (e.SetEntityVisibleWhiteList = "s.设置实体可见性白名单"),
    (e.PlotHandBook = "j.剧情图鉴"),
    (e.BtStateConflictCheckWhiteList = "x.行为树冲突检查白名单");
})((ECsvName = exports.ECsvName || (exports.ECsvName = {})));
const configs = [
  {
    Name: ECsvName.Global,
    Path: "q.全局配置",
    CsvLoaderClass: GlobalConfigCsv_1.GlobalConfigCsvLoader,
    CsvClass: GlobalConfigCsv_1.GlobalConfigCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#WKFPdvCywohqR4xGm17c8eRlnph",
  },
  {
    Name: ECsvName.Talker,
    Path: "d.对话人",
    CsvLoaderClass: TalkerCsv_1.TalkerCsvLoader,
    CsvClass: TalkerCsv_1.TalkerCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/OoHmw5T8NinAwMkGdnQczN3hnRg",
  },
  {
    Name: ECsvName.BaseBlueprint,
    Path: "j.基础蓝图",
    CsvLoaderClass: BlueprintCsv_1.BlueprintCsvLoader,
    CsvClass: BlueprintCsv_1.BlueprintCsv,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.ExtendedEntity,
    Path: "s.实体/s.实体",
    CsvLoaderClass: ExtendedEntityCsv_1.ExtendedEntityCsvLoader,
    CsvClass: ExtendedEntityCsv_1.ExtendedEntityCsv,
    Hide: !0,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.CustomSeq,
    Path: "z.自定义序列",
    CsvLoaderClass: CustomSeqCsv_1.CustomSeqCsvLoader,
    CsvClass: CustomSeqCsv_1.CustomSeqCsv,
    Hide: !0,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.ExcelFormat,
    Path: "e.Excel通配符",
    CsvLoaderClass: ExcelFormatCsv_1.ExcelFormatCsvLoader,
    CsvClass: ExcelFormatCsv_1.ExcelFormatCsv,
    Hide: !0,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.StandbyTag,
    Path: "d.待机表演",
    CsvLoaderClass: StandbyTagCsv_1.StandbyTagCsvLoader,
    CsvClass: StandbyTagCsv_1.StandbyTagCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/BJomw3rI5iROBFkiW13cUWQMnPS",
  },
  {
    Name: ECsvName.Map,
    Path: "d.可视化编辑地图",
    CsvLoaderClass: LevelsConfigCsv_1.LevelsConfigCsvLoader,
    CsvClass: LevelsConfigCsv_1.LevelsConfigCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/wikcnm5HCMxINsxmb9jCXP20oNf#DeqQdkQqgo2YGexymiwctbXlnuh",
  },
  {
    Name: ECsvName.Var,
    Path: "b.变量列表",
    CsvLoaderClass: VarConfigCsv_1.VarConfigCsvLoader,
    CsvClass: VarConfigCsv_1.VarConfigCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PvJfw4kY2iHwaQkJPaWc7mGEnVf#XUY2ddghVoF5HmxoINbcSCd1nBY",
  },
  {
    Name: ECsvName.Occupation,
    Path: "z.占用组配置",
    CsvLoaderClass: OccupationCsv_1.OccupationCsvLoader,
    CsvClass: OccupationCsv_1.OccupationCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/WSCxwdQSciOFVBkr0uxcjQJbnWg",
  },
  {
    Name: ECsvName.Buff,
    Path: "z.Buff配置",
    CsvLoaderClass: BuffCsv_1.BuffCsvLoader,
    CsvClass: BuffCsv_1.BuffCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#HrZ3dGkvpoTQLHxBeNZc5SHBnBh",
  },
  {
    Name: ECsvName.Bullet,
    Path: "z.子弹配置",
    CsvLoaderClass: BulletCsv_1.BulletCsvLoader,
    CsvClass: BulletCsv_1.BulletCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#NywTd0s2WoxBMCxzpRGc4eCznPd",
  },
  {
    Name: ECsvName.GameplayTag,
    Path: "t.Tag配置",
    CsvLoaderClass: TagCsv_1.TagCsvLoader,
    CsvClass: TagCsv_1.TagCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/OACQwboAMiwQTGkpqpycUb6lndh",
  },
  {
    Name: ECsvName.EntityPerformanceAttribute,
    Path: "s.实体表现属性",
    CsvLoaderClass:
      EntityPerformanceAttributeCsv_1.EntityPerformanceAttributeCsvLoader,
    CsvClass: EntityPerformanceAttributeCsv_1.EntityPerformanceAttributeCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#GgCpdTF6CoAGepx7RnOcqjHPnxg",
  },
  {
    Name: ECsvName.TidText,
    Path: "w.文本",
    CsvLoaderClass: TidTextCsv_1.TidTextListCsvLoader,
    CsvClass: TidTextCsv_1.TidTextCsv,
    Hide: !0,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.FlowTemplate,
    Path: "f.演出模板配置",
    CsvLoaderClass: FlowTemplateCsv_1.FlowTemplateCsvLoader,
    CsvClass: FlowTemplateCsv_1.FlowTemplateCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/UgPGwq9PiiZF41kPFkTcfWuHnDc#Ivf1dIxW9or27KxUZDBc3tuFnSb",
  },
  {
    Name: ECsvName.Montage,
    Path: "m.蒙太奇配置",
    CsvLoaderClass: MontageCsv_1.MontageCsvLoader,
    CsvClass: MontageCsv_1.MontageCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/UgPGwq9PiiZF41kPFkTcfWuHnDc#PwYmdoOD8odAhXxtXZkc2WSxn4d",
  },
  {
    Name: ECsvName.ABPMontage,
    Path: "a.ABP蒙太奇映射表",
    CsvLoaderClass: MontageCsv_1.AbpMontageCsvLoader,
    CsvClass: MontageCsv_1.AbpMontageCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#UYujdgZxaooqOmxwDAVcRmz1n9g",
  },
  {
    Name: ECsvName.ABPOverlayMontage,
    Path: "a.ABP叠加蒙太奇映射表",
    CsvLoaderClass: MontageCsv_1.AbpMontageCsvLoader,
    CsvClass: MontageCsv_1.AbpOverlayMontageCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#doxcnM4a3b1rqE1L1beY0DwPcPf",
  },
  {
    Name: ECsvName.FaceExpression,
    Path: "b.表情",
    CsvLoaderClass: FaceExpressionCSV_1.FaceExpressionCsvLoader,
    CsvClass: FaceExpressionCSV_1.FaceExpressionCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#URlvdnDn1o4Fccx8RVrcsDvpnVd",
  },
  {
    Name: ECsvName.SexFormat,
    Path: "x.性别通配符表",
    CsvLoaderClass: SexFormat_1.SexFormatCsvLoader,
    CsvClass: SexFormat_1.SexFormatCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#SUFZdxzfboU8F3xQruFcxISdnOb",
  },
  {
    Name: ECsvName.SpecialHateAndSense,
    Path: "t.特殊仇恨感知",
    CsvLoaderClass: SpecialHateAndSenseCsv_1.SpecialHateAndSenseCsvLoader,
    CsvClass: SpecialHateAndSenseCsv_1.SpecialHateAndSenseCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/GSYbwSgJOiu02GkZag2cRT0XnRc#J89fd0MgyonGtAxG3khcNmMinMf",
  },
  {
    Name: ECsvName.InteractAudioMaterial,
    Path: "y.音频/j.交互材质音频",
    CsvLoaderClass: InteractAudioMaterialCsv_1.InteractAudioMaterialCsvLoader,
    CsvClass: InteractAudioMaterialCsv_1.InteractAudioMaterialCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/GSYbwSgJOiu02GkZag2cRT0XnRc#IHnVdRs19oQxrAxfVo1czDtOnee",
  },
  {
    Name: ECsvName.Timbre,
    Path: "y.音频/y.音色",
    CsvLoaderClass: TimbreCsv_1.TimbreCsvLoader,
    CsvClass: TimbreCsv_1.TimbreCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/MGcFwfmSjiGsdSkEBnucZLPVnMf#Gq3ddSGfPoL7RixsDVycTClKnQc",
  },
  {
    Name: ECsvName.UniversalTone,
    Path: "y.音频/t.通用语音台本",
    CsvLoaderClass: UniversalTone_1.UniversalToneCsvLoader,
    CsvClass: UniversalTone_1.UniversalToneCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/MGcFwfmSjiGsdSkEBnucZLPVnMf#DXDWdKPbMoS9rhxD9xocrrmnnbg",
  },
  {
    Name: ECsvName.TimbreAkEvent,
    Path: "y.音频/y.音色语音事件映射",
    CsvLoaderClass: TimbreAkEvent_1.TimbreAkEventCsvLoader,
    CsvClass: TimbreAkEvent_1.TimbreAkEventCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/MGcFwfmSjiGsdSkEBnucZLPVnMf#KyrDdJc8Fo9uUCxz41ncTSyQnnf",
  },
  {
    Name: ECsvName.CipherGameplay,
    Path: "u.UI玩法/m.密码锁",
    CsvLoaderClass: CipherGameplay_1.CipherGameplayCsvLoader,
    CsvClass: CipherGameplay_1.CipherGameplayCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PXIvwr3VGiX7XLkWZKwc19oXnwd#HriqdZGAzoPJy5xJKKicEJy4nfd",
  },
  {
    Name: ECsvName.Skybox,
    Path: "t.天空盒配置",
    CsvLoaderClass: SkyboxCsv_1.SkyboxCsvLoader,
    CsvClass: SkyboxCsv_1.SkyboxCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#Ehvpdde9Po45YOxXMcNchJLUn3g",
  },
  {
    Name: ECsvName.MonsterDisplay,
    Path: "g.怪物展示面板",
    CsvLoaderClass: MonsterDisplay_1.MonsterDisplayCsvLoader,
    CsvClass: MonsterDisplay_1.MonsterDisplayCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/IL2qwaX3eiERFkkjYa8cXoJXn2c",
  },
  {
    Name: ECsvName.Telecom,
    Path: "t.通讯",
    CsvLoaderClass: TelecomCsv_1.TeleComCsvLoader,
    CsvClass: TelecomCsv_1.TeleComCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/ZWdOwcKaIimNz6kP5XScB8oynke",
  },
  {
    Name: ECsvName.TalkIcon,
    Path: "d.对话选项图标",
    CsvLoaderClass: TalkIconCsv_1.TalkIconCsvLoader,
    CsvClass: TalkIconCsv_1.TalkIconCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#Hth4dkSUEodbTLxES75cONOfnUf",
  },
  {
    Name: ECsvName.DataLayer,
    Path: "d.DataLayer",
    CsvLoaderClass: DataLayerCsv_1.DataLayerCsvLoader,
    CsvClass: DataLayerCsv_1.DataLayerCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#Lkt2dxwRMoZXVWxq27ScYqYDnBc",
  },
  {
    Name: ECsvName.RandomPrefab,
    Path: "s.随机预制体",
    CsvLoaderClass: RandomPrefabCsv_1.RandomPrefabCsvLoader,
    CsvClass: RandomPrefabCsv_1.RandomPrefabCsv,
    Hide: !0,
    HelpUrl: " ",
  },
  {
    Name: ECsvName.BattleTagConfig,
    Path: "z.战斗事件",
    CsvLoaderClass: BattleTagConfigCsv_1.BattleTagConfigCsvLoader,
    CsvClass: BattleTagConfigCsv_1.BattleTagConfigCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/J9b9wG0SOiJheZkl3p1cmnGRnvc",
  },
  {
    Name: ECsvName.SignalBreakData,
    Path: "x.信号破译谱面配置",
    CsvLoaderClass: SignalBreakCsv_1.SignalBreakCsvLoader,
    CsvClass: SignalBreakCsv_1.SignalBreakCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PXIvwr3VGiX7XLkWZKwc19oXnwd#C8FWdwIXqolW0Uxz618ca3xXnHc",
  },
  {
    Name: ECsvName.SignalBreakConfig,
    Path: "x.信号破译玩法配置",
    CsvLoaderClass: SignalBreakCsv_1.SignalBreakConfigCsvLoader,
    CsvClass: SignalBreakCsv_1.SignalBreakConfigCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PXIvwr3VGiX7XLkWZKwc19oXnwd#C8FWdwIXqolW0Uxz618ca3xXnHc",
  },
  {
    Name: ECsvName.RegionMpc,
    Path: "q.区域Mpc",
    CsvLoaderClass: RegionMpcCsv_1.RegionMpcCsvLoader,
    CsvClass: RegionMpcCsv_1.RegionMpcCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/BijGwN0rMiM6ELkw9dec6fCNnKc#W7aGdb7GNonxRtxA9q0c0GoIn9b",
  },
  {
    Name: ECsvName.PlayerStateRestriction,
    Path: "w.玩家状态限制",
    CsvLoaderClass: PlayerStateRestrictionCsv_1.PlayerStateRestrictionCsvLoader,
    CsvClass: PlayerStateRestrictionCsv_1.PlayerStateRestrictionCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#YqXAdGxgWom7QvxKz9yckYuXnvd",
  },
  {
    Name: ECsvName.MorseCode,
    Path: "m.捕获信号玩法配置",
    CsvLoaderClass: MorseCodeCsv_1.MorseCodeCsvLoader,
    CsvClass: MorseCodeCsv_1.MorseCodeCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PXIvwr3VGiX7XLkWZKwc19oXnwd#TuSZdPH6doLg8OxqE3Gce814nkJ",
  },
  {
    Name: ECsvName.MorseCodeDifficulty,
    Path: "m.捕获信号玩法难度",
    CsvLoaderClass: MorseCodeCsv_1.MorseCodeDifficultyCsvLoader,
    CsvClass: MorseCodeCsv_1.MorseCodeDifficultyCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PXIvwr3VGiX7XLkWZKwc19oXnwd#TuSZdPH6doLg8OxqE3Gce814nkJ",
  },
  {
    Name: ECsvName.DungeonRewardWhiteList,
    Path: "f.副本掉落白名单",
    CsvLoaderClass: DungeonRewardWhiteListCsv_1.DungeonRewardWhiteListCsvLoader,
    CsvClass: DungeonRewardWhiteListCsv_1.DungeonRewardWhiteListCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/PmQmwmm2ciTVBNkMUnscF6QvnNe#FzDUd7U5Roy18TxL1xZcZTI1nge",
  },
  {
    Name: ECsvName.SetEntityVisibleWhiteList,
    Path: "s.设置实体可见性白名单",
    CsvLoaderClass:
      SetEntityVisibleWhiteListCsv_1.SetEntityVisibleWhiteListCsvLoader,
    CsvClass: SetEntityVisibleWhiteListCsv_1.SetEntityVisibleWhiteListCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/BzcrwBOPuijgNxkQ9MJcqRGSnRc",
  },
  {
    Name: ECsvName.PlotHandBook,
    Path: "j.剧情图鉴",
    CsvLoaderClass: PlotHandBookCsv_1.PlotHandBookCsvLoader,
    CsvClass: PlotHandBookCsv_1.PlotHandBookCsv,
    HelpUrl:
      "https://kurogame.feishu.cn/wiki/QPnWwIv1wiCw7hkLHp0cVcZYnkD#M13Ad5wwToDu5JxJXw8cwqjUn3c",
  },
  {
    Name: ECsvName.BtStateConflictCheckWhiteList,
    Path: "x.行为树冲突检查白名单",
    CsvLoaderClass:
      BtStateConflictCheckWhiteList_1.BtStateConflictCheckWhiteListCsvLoader,
    CsvClass: BtStateConflictCheckWhiteList_1.BtStateConflictCheckWhiteListCsv,
    HelpUrl: "https://kurogame.feishu.cn/wiki/YQ4JwSl2Lizxivkw1qscaajAn3e",
  },
];
(0, Init_1.isUe5)() ||
  (configs.splice(
    configs.findIndex((e) => e.Name === ECsvName.BaseBlueprint),
    1,
  ),
  configs.splice(
    configs.findIndex((e) => e.Name === ECsvName.ExtendedEntity),
    1,
  ));
class CsvRegistry {
  constructor() {
    (this.$ = new Map()),
      (this.vqn = new Map()),
      (this.H = new Map()),
      (this.J = new Map()),
      (this.K = new Map()),
      (this.ee = new Map()),
      (this.CsvTable = new Map()),
      (this.te = (0, File_1.getProjectPath)(IGlobal_1.globalConfig.CsvFileDir)),
      configs.forEach((e) => {
        this.$.set(e.Name, e),
          this.vqn.set(e.Name, e.HelpUrl),
          this.H.set(e.CsvClass, e),
          this.CsvTable.set(e.Name, this.oe(e.Path));
      });
  }
  static get Instance() {
    return void 0 === this.m && (this.m = new CsvRegistry()), this.m;
  }
  ne(e, s) {
    return this.te + `/${e}/${s}.csv`;
  }
  oe(e) {
    if (e.endsWith(".json")) {
      var s = (0, Util_1.getWorkspaceBranch)(),
        s = (0, Util_1.readJsonObj)(this.ne(e, s));
      if (!s) throw new Error(`Can not load csv table for path [${e}]`);
      const a = [];
      return (
        s.forEach((e) => {
          a.push({
            Segment: e.Segment,
            TableName: e.CsvPath.split("/").pop().replace(".csv", ""),
            TablePath: e.CsvPath,
          });
        }),
        a
      );
    }
    s = (0, Util_1.getWorkspaceBranch)();
    return [
      {
        Segment: (0, BranchDefine_1.getBranchSegment)(s),
        TableName: e,
        TablePath: e,
      },
    ];
  }
  ie(e) {
    let s = this.J.get(e.Name);
    return s || ((s = new e.CsvLoaderClass()), this.J.set(e.Name, s)), s;
  }
  GetLoaderByName(e) {
    return this.ie(this.GetCsvConfig(e));
  }
  GetPath(e, s, a) {
    if (a) return this.ne(a, s);
    a = this.CsvTable.get(e);
    if (!a) throw new Error(`Can not find csv table for name [${e}]`);
    if (a.length <= 0) throw new Error(`Table list is empty for name [${e}]`);
    return this.ne(a[0].TablePath, s);
  }
  GetAllBranchPaths(e) {
    var s = this.CsvTable.get(e);
    if (!s) throw new Error(`Can not find csv table for name [${e}]`);
    if (s.length <= 0) throw new Error(`Table list is empty for name [${e}]`);
    const a = this.te + "/" + s[0].TablePath;
    return (0, File_1.listFiles)(a, ".csv", !0).map(
      (e) => a + "/" + (0, File_1.getFileName)(e),
    );
  }
  GetTables(e) {
    var s = this.CsvTable.get(e);
    if (s) return s;
    throw new Error(`Can not find csv table for name [${e}]`);
  }
  Exist(e) {
    return this.$.has(e);
  }
  GetCsvConfig(e) {
    var s = this.$.get(e);
    if (s) return s;
    throw new Error(`Can not find csv config for name [${e}]`);
  }
  GetCsvHelpUrl(e) {
    var s = this.vqn.get(e);
    if (s) return s;
    throw new Error(`Can not find csv help url for name [${e}]`);
  }
  Load(e, s, a) {
    var t = this.ie(this.GetCsvConfig(e)),
      s = s ?? this.GetTables(e)[0].TablePath,
      a = a ?? (0, Util_1.getWorkspaceBranch)();
    let i = this.ne(s, a);
    (0, File_1.existFile)(i) ||
      a === (0, Util_1.getWorkspaceBranch)() ||
      (0, BranchDefine_1.isReachBranch)(a) ||
      ((s = (0, File_1.getDirName)((0, File_1.getDir)(i))),
      (i = t.GetOtherBranchCsvPath(s, a)));
    s = t.LoadCsv(i);
    return (s.Tables = this.GetTables(e)), s;
  }
  Save(e, s, a) {
    var t,
      i,
      r = this.$.get(e);
    r
      ? this.CsvTable.get(e)
        ? ((t = this.ie(r)),
          (i = this.ne(a, s.Branch)),
          t.SaveCsv(s, i),
          this.RefreshCsvData(r.CsvClass),
          (0, Log_1.log)(`Save csv: [${i}] [${a}]`),
          EventSystem_1.editorEventDispatcher.Dispatch("SaveCsvEditor", e))
        : (0, Log_1.error)(`Can not save csv for table [${a}]`)
      : (0, Log_1.error)(`Can not save csv for name [${e}]`);
  }
  GetCsv(e) {
    if (this.K.has(e)) return this.K.get(e);
    let s = this.K.get(e);
    if (!s) {
      var a = this.H.get(e);
      if (!a) throw new Error(`No config for csvClass [${e.name}]`);
      (s = new a.CsvClass()).Bind(this.Load(a.Name)),
        this.K.set(e, s),
        this.ee.set(s.Name, s);
    }
    return s;
  }
  GetCsvByName(e) {
    if (this.ee.has(e)) return this.ee.get(e);
    var s = this.$.get(e);
    if (s) return this.GetCsv(s.CsvClass);
    throw new Error(`No config for csvName [${e}]`);
  }
  GetCsvClassByName(e) {
    var s = this.$.get(e);
    if (s) return s.CsvClass;
    throw new Error(`No config for csvName [${e}]`);
  }
  RefreshCsvData(e) {
    var s = this.H.get(e);
    if (!s) throw new Error(`No config for csvClass [${e.name}]`);
    var a = new s.CsvClass();
    a.Bind(this.Load(s.Name)), this.K.set(e, a), this.ee.set(a.Name, a);
  }
  GetAllCsvRows(e, s = !1) {
    var e = this.GetCsv(e),
      a = [];
    a.push(...e.Rows);
    for (const t of e.OtherBranchCsv)
      ((0, Util_1.isNodeJsPlatform)() ||
        (0, Util_1.isPipelineEnv)() ||
        (0, BranchDefine_1.isReachBranch)(
          t.Branch,
          Config_1.Config.Instance.Get("PlannedBranch"),
        ) ||
        s) &&
        a.push(...t.Rows);
    return a;
  }
  GetCsvClass(e) {
    return this.$.get(e).CsvClass;
  }
  static Refresh() {
    this.m = void 0;
  }
}
exports.CsvRegistry = CsvRegistry;
//# sourceMappingURL=CsvRegistry.js.map
