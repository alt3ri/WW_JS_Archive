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
    (this.$je = ""),
      (this.Yje = !1),
      (this.Jje = !1),
      (this.zje = !1),
      (this.Zje = "none"),
      (this.eWe = 0),
      (this.tWe = "none"),
      (this.iWe = new Set()),
      (this.oWe = new Set()),
      (this.rWe = -1),
      (this.AreaChanged = () => {
        var t;
        0 < ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID
          ? ((t =
              ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
                ModelManager_1.ModelManager.AreaModel.AreaInfo.WuYinQuID,
              )),
            (this.tWe = t ? (t.IsFinish ? "purified" : "unpurified") : "none"))
          : (this.tWe = "none"),
          this.nWe() || this.sWe();
      }),
      (this.yK = (t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 56, "[BGM]战斗状态变化", [
            "isGameInBattle",
            t,
          ]),
          (this.Yje = t),
          this.Yje ||
            ((this.Jje = !1), (this.eWe = 0), (this.rWe = -1), (this.$je = "")),
          this.nWe() || this.aWe();
      }),
      (this.hWe = () => {
        this.nWe();
      }),
      (this.lWe = (t) => {
        this.oWe.add(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              4,
              "[BGM]仇恨添加OnAggroAdd：",
              ["entityId", t],
              ["AggroSetSize", this.oWe.size],
            ),
          this._We(),
          this.nWe() || this.uWe();
      }),
      (this.cWe = (t) => {
        this.oWe.delete(t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              4,
              "[BGM]仇恨删除OnAggroRemoved：",
              ["entityId", t],
              ["AggroSetSize", this.oWe.size],
            );
      }),
      (this.mWe = () => {
        this.dWe();
      }),
      (this.OnRemoveEntity = (t, e) => {
        this.iWe.has(e.Id) &&
          (this.iWe.delete(e.Id),
          EventSystem_1.EventSystem.RemoveWithTarget(
            e.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.CWe,
          ));
      }),
      (this.CWe = (t, e, i, s, _, o, n) => {
        0 === s.CalculateType &&
          this.gWe(e.Id) &&
          this.Yje &&
          (this.Jje ||
            ((this.Jje = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 56, "[BGM]触发:战斗中首次造成伤害"),
            this.nWe()) ||
            this.fWe());
      }),
      (this.pWe = (t, e) => {
        this.gWe(t) &&
          e.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() &&
          (this.eWe++,
          this.Yje ||
            ("perceived" !== this.Zje &&
              ((t = EntitySystem_1.EntitySystem.Get(t))
                ? (this.vWe(t),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Audio",
                      4,
                      "[BGM]触发:非战斗状态被感知",
                      ["感知者", t.GetComponent(3).Actor.GetName()],
                      ["被感知者", e.GetComponent(3).Actor.GetName()],
                      ["当前感知数量", this.eWe],
                    ),
                  this.nWe() || (this.fWe(), this.uWe()))
                : Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Audio",
                    56,
                    "[BGM]感知增加，但没有获取到实体",
                    ["感知者实体ID", e.Id],
                  ))));
      }),
      (this.MWe = (t, e) => {
        this.gWe(t) &&
          e.Id === Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint() &&
          (this.eWe--,
          this.Yje ||
            (this.eWe <= 0 &&
              "perceived" === this.Zje &&
              ((this.eWe = 0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Audio", 56, "[BGM]触发:感知消失"),
              this.nWe() || (this.fWe(), this.uWe()))));
      });
  }
  Init() {
    this.dde();
  }
  Destroy() {
    this.Cde();
  }
  sWe() {
    "unpurified" === this.tWe
      ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "unpurified"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 56, "[BGM]切换无音区: 进入无音区，未净化"))
      : "purified" === this.tWe
        ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "purified"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 56, "[BGM]切换无音区: 进入无音区，已净化"))
        : (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "none"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 56, "[BGM]切换无音区: 未处在无音区"));
  }
  aWe() {
    this.Yje
      ? (this.fWe(), this.uWe(), this.EWe())
      : TimerSystem_1.TimerSystem.Delay(() => {
          this.Yje
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                56,
                "[BGM]离开战斗但脱战时间过短，已忽略本次脱战",
              )
            : (this.EWe(), this.fWe(), this.uWe());
        }, LEAVE_BATTLE_DELAY_MS);
  }
  fWe() {
    this.Yje
      ? this.Jje && "battle_strong" !== this.Zje
        ? ((this.Zje = "battle_strong"),
          AudioSystem_1.AudioSystem.SetState(
            "battle_music_state",
            "battle_strong",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 56, "[BGM]切换玩家状态: 进入战斗造成伤害", [
              "BGM",
              this._We(),
            ]))
        : "battle_in" !== this.Zje &&
          ((this.Zje = "battle_in"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_in"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 56, "[BGM]切换玩家状态: 进入战斗未造成伤害", [
            "BGM",
            this._We(),
          ])
      : 0 < this.eWe && "perceived" !== this.Zje
        ? ((this.Zje = "perceived"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "perceived"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              56,
              "[BGM]切换玩家状态: 未进入战斗但被感知",
              ["BGM", this._We()],
            ))
        : "none" !== this.Zje &&
          ((this.Zje = "none"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "none"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 56, "[BGM]切换玩家状态: 未遇敌", [
            "BGM",
            this._We(),
          ]);
  }
  nWe() {
    return ModelManager_1.ModelManager.PlotModel.KeepBgAudio
      ? ((this.zje = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Audio",
            56,
            "[BGM]提示: 剧情期间保持原背景音乐，跳过切换",
          ),
        !0)
      : !!this.zje &&
          ((this.zje = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              56,
              "[BGM] 提示: 由于先前被剧情保持了场景音乐，准备更新所有音乐状态",
            ),
          this.sWe(),
          this.aWe(),
          !0);
  }
  EWe() {
    this.Yje
      ? (AudioSystem_1.AudioSystem.SetState("music_group", "battle"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 56, "[BGM]切换战斗状态:战斗"))
      : (AudioSystem_1.AudioSystem.SetState("music_group", "field"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 56, "[BGM]切换战斗状态:非战斗"));
  }
  uWe() {
    var t = this._We();
    AudioSystem_1.AudioSystem.SetState("monster_type", t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 56, "[BGM]切换敌人类型状态:", ["敌人类型", t]);
  }
  _We() {
    return "none" === this.Zje
      ? monsterTypeList[0]
      : (this.oWe.forEach((t) => {
          t = EntitySystem_1.EntitySystem.Get(t);
          t?.Valid && this.vWe(t);
        }),
        "" !== this.$je
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 56, "[BGM]播放MonsterTag包含BGM:", [
                "MonsterTag",
                this.$je,
              ]),
            this.$je)
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Audio", 56, "[BGM]获取最高敌人等级:", [
                "敌人等级",
                this.rWe,
              ]),
            monsterTypeList[this.rWe + 1]));
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
        this.pWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAiSenseEntityLeave,
        this.MWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroAdd,
        this.lWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.cWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.hWe,
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
        this.pWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAiSenseEntityLeave,
        this.MWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroAdd,
        this.lWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.cWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.hWe,
      );
  }
  dWe() {
    this.SWe(), this.iWe.clear(), this.oWe.clear(), this.yWe();
  }
  yWe() {
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      this.iWe.add(t.Id),
        EventSystem_1.EventSystem.AddWithTarget(
          t.Entity,
          EventDefine_1.EEventName.CharDamage,
          this.CWe,
        );
  }
  SWe() {
    if (0 < this.iWe.size) {
      for (const e of this.iWe) {
        var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(e);
        t?.Valid &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            t.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.CWe,
          );
      }
      this.iWe.clear();
    }
  }
  gWe(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return (
      !!t &&
      "Monster" ===
        t.GetComponent(3)?.CreatureData?.GetBaseInfo()?.Category.MainType
    );
  }
  vWe(t) {
    var e,
      i = t.GetComponent(3)?.CreatureData;
    i.GetLivingStatus() !== Protocol_1.Aki.Protocol.HEs.Proto_Dead &&
      ((e = i.GetAttributeComponent()).FightMusic &&
        ((this.$je = e.FightMusic), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Audio",
          56,
          "[BGM]设置怪物配置BGM：",
          ["MonsterTag", this.$je],
          ["SourceEntity", t.Id],
          ["SourceEntityName", t.GetComponent(3).Actor.GetName()],
        ),
      (e = i.GetBaseInfo()).Category.MonsterMatchType > this.rWe) &&
      ((this.rWe = e.Category.MonsterMatchType), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Audio",
        56,
        "[BGM]刷新怪物最高等级：",
        ["MaxLevel", this.rWe],
        ["SourceEntity", t.Id],
        ["SourceEntityName", t.GetComponent(3).Actor.GetName()],
      );
  }
}
exports.AreaAudio = AreaAudio;
//# sourceMappingURL=AreaAudio.js.map
