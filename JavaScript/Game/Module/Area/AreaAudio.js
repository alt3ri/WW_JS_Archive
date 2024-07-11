"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAudio = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LEAVE_BATTLE_DELAY_MS = 500,
  monsterTypeList = {
    [0]: "none",
    1: "small",
    2: "medium",
    3: "elite",
    4: "boss_common",
  };
class AreaAudio {
  constructor() {
    (this.GHe = ""),
      (this.NHe = !1),
      (this.OHe = !1),
      (this.kHe = !1),
      (this.FHe = "none"),
      (this.VHe = 0),
      (this.HHe = "none"),
      (this.jHe = new Set()),
      (this.WHe = new Set()),
      (this.KHe = -1),
      (this.AreaChanged = () => {
        var t;
        0 < ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID
          ? ((t =
              ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
                ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID,
              )),
            (this.HHe = t ? (t.IsFinish ? "purified" : "unpurified") : "none"))
          : (this.HHe = "none"),
          this.QHe() || this.XHe();
      }),
      (this.yK = (t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 28, "[BGM]战斗状态变化", [
            "isGameInBattle",
            t,
          ]),
          (this.NHe = t),
          this.NHe ||
            ((this.OHe = !1), (this.VHe = 0), (this.KHe = -1), (this.GHe = "")),
          this.QHe() || this.$He();
      }),
      (this.YHe = () => {
        this.QHe();
      }),
      (this.JHe = (t) => {
        this.WHe.add(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              4,
              "[BGM]仇恨添加OnAggroAdd：",
              ["entityId", t],
              ["AggroSetSize", this.WHe.size],
            ),
          this.zHe(),
          this.QHe() || this.ZHe();
      }),
      (this.eje = (t) => {
        this.WHe.delete(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              4,
              "[BGM]仇恨删除OnAggroRemoved：",
              ["entityId", t],
              ["AggroSetSize", this.WHe.size],
            );
      }),
      (this.tje = () => {
        this.ije();
      }),
      (this.OnRemoveEntity = (t, e) => {
        this.jHe.has(e.Id) &&
          (this.jHe.delete(e.Id),
          EventSystem_1.EventSystem.RemoveWithTarget(
            e.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.oje,
          ));
      }),
      (this.oje = (t, e, i, s, _, o, n) => {
        0 === s.CalculateType &&
          this.rje(e.Id) &&
          this.NHe &&
          (this.OHe ||
            ((this.OHe = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 28, "[BGM]触发:战斗中首次造成伤害"),
            this.QHe()) ||
            this.nje());
      }),
      (this.sje = (t, e) => {
        this.rje(t) &&
          e.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() &&
          (this.VHe++,
          this.NHe ||
            ("perceived" !== this.FHe &&
              ((t = EntitySystem_1.EntitySystem.Get(t))
                ? (this.aje(t),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Audio",
                      4,
                      "[BGM]触发:非战斗状态被感知",
                      ["感知者", t.GetComponent(3).Actor.GetName()],
                      ["被感知者", e.GetComponent(3).Actor.GetName()],
                      ["当前感知数量", this.VHe],
                    ),
                  this.QHe() || (this.nje(), this.ZHe()))
                : Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Audio",
                    28,
                    "[BGM]感知增加，但没有获取到实体",
                    ["感知者实体ID", e.Id],
                  ))));
      }),
      (this.hje = (t, e) => {
        this.rje(t) &&
          e.Id === Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint() &&
          (this.VHe--,
          this.NHe ||
            (this.VHe <= 0 &&
              "perceived" === this.FHe &&
              ((this.VHe = 0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Audio", 28, "[BGM]触发:感知消失"),
              this.QHe() || (this.nje(), this.ZHe()))));
      });
  }
  Init() {
    this.dde();
  }
  Destroy() {
    this.Cde();
  }
  XHe() {
    "unpurified" === this.HHe
      ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "unpurified"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 28, "[BGM]切换无音区: 进入无音区，未净化"))
      : "purified" === this.HHe
        ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "purified"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 28, "[BGM]切换无音区: 进入无音区，已净化"))
        : (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "none"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 28, "[BGM]切换无音区: 未处在无音区"));
  }
  $He() {
    this.NHe
      ? (this.nje(), this.ZHe(), this.lje())
      : TimerSystem_1.TimerSystem.Delay(() => {
          this.NHe
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                28,
                "[BGM]离开战斗但脱战时间过短，已忽略本次脱战",
              )
            : (this.lje(), this.nje(), this.ZHe());
        }, LEAVE_BATTLE_DELAY_MS);
  }
  nje() {
    this.NHe
      ? this.OHe && "battle_strong" !== this.FHe
        ? ((this.FHe = "battle_strong"),
          AudioSystem_1.AudioSystem.SetState(
            "battle_music_state",
            "battle_strong",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 28, "[BGM]切换玩家状态: 进入战斗造成伤害", [
              "BGM",
              this.zHe(),
            ]))
        : "battle_in" !== this.FHe &&
          ((this.FHe = "battle_in"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_in"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 28, "[BGM]切换玩家状态: 进入战斗未造成伤害", [
            "BGM",
            this.zHe(),
          ])
      : 0 < this.VHe && "perceived" !== this.FHe
        ? ((this.FHe = "perceived"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "perceived"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              28,
              "[BGM]切换玩家状态: 未进入战斗但被感知",
              ["BGM", this.zHe()],
            ))
        : "none" !== this.FHe &&
          ((this.FHe = "none"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "none"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 28, "[BGM]切换玩家状态: 未遇敌", [
            "BGM",
            this.zHe(),
          ]);
  }
  QHe() {
    return ModelManager_1.ModelManager.PlotModel.KeepBgAudio
      ? ((this.kHe = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Audio",
            28,
            "[BGM]提示: 剧情期间保持原背景音乐，跳过切换",
          ),
        !0)
      : !!this.kHe &&
          ((this.kHe = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              28,
              "[BGM] 提示: 由于先前被剧情保持了场景音乐，准备更新所有音乐状态",
            ),
          this.XHe(),
          this.$He(),
          !0);
  }
  lje() {
    this.NHe
      ? (AudioSystem_1.AudioSystem.SetState("music_group", "battle"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 28, "[BGM]切换战斗状态:战斗"))
      : (AudioSystem_1.AudioSystem.SetState("music_group", "field"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 28, "[BGM]切换战斗状态:非战斗"));
  }
  ZHe() {
    var t = this.zHe();
    AudioSystem_1.AudioSystem.SetState("monster_type", t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 28, "[BGM]切换敌人类型状态:", ["敌人类型", t]);
  }
  zHe() {
    return "none" === this.FHe
      ? monsterTypeList[0]
      : (this.WHe.forEach((t) => {
          t = EntitySystem_1.EntitySystem.Get(t);
          t?.Valid && this.aje(t);
        }),
        "" !== this.GHe
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 28, "[BGM]播放MonsterTag包含BGM:", [
                "MonsterTag",
                this.GHe,
              ]),
            this.GHe)
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 28, "[BGM]获取最高敌人等级:", [
                "敌人等级",
                this.KHe,
              ]),
            monsterTypeList[this.KHe + 1]));
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeArea,
      this.AreaChanged,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.yK,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAiSenseEntityEnter,
        this.sje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAiSenseEntityLeave,
        this.hje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.tje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroAdd,
        this.JHe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.eje,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.YHe,
      );
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeArea,
      this.AreaChanged,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.OnRemoveEntity,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBattleStateChanged,
        this.yK,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAiSenseEntityEnter,
        this.sje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAiSenseEntityLeave,
        this.hje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.tje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroAdd,
        this.JHe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.eje,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.YHe,
      );
  }
  ije() {
    this._je(), this.jHe.clear(), this.WHe.clear(), this.uje();
  }
  uje() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      this.jHe.add(t.Id),
        EventSystem_1.EventSystem.AddWithTarget(
          t.Entity,
          EventDefine_1.EEventName.CharDamage,
          this.oje,
        );
  }
  _je() {
    if (0 < this.jHe.size) {
      for (const e of this.jHe) {
        var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(e);
        t?.Valid &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            t.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.oje,
          );
      }
      this.jHe.clear();
    }
  }
  rje(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!t &&
      "Monster" ===
        t.GetComponent(3)?.CreatureData?.GetBaseInfo()?.Category.MainType
    );
  }
  aje(t) {
    var e,
      i = t.GetComponent(3)?.CreatureData;
    i.GetLivingStatus() !== Protocol_1.Aki.Protocol.Rvs.Proto_Dead &&
      ((e = i.GetAttributeComponent()).FightMusic &&
        ((this.GHe = e.FightMusic), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Audio",
          28,
          "[BGM]设置怪物配置BGM：",
          ["MonsterTag", this.GHe],
          ["SourceEntity", t.Id],
          ["SourceEntityName", t.GetComponent(3).Actor.GetName()],
        ),
      (e = i.GetBaseInfo()).Category.MonsterMatchType > this.KHe) &&
      ((this.KHe = e.Category.MonsterMatchType), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Audio",
        28,
        "[BGM]刷新怪物最高等级：",
        ["MaxLevel", this.KHe],
        ["SourceEntity", t.Id],
        ["SourceEntityName", t.GetComponent(3).Actor.GetName()],
      );
  }
}
exports.AreaAudio = AreaAudio;
//# sourceMappingURL=AreaAudio.js.map
