"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaAudio = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  LEAVE_BATTLE_DELAY_MS = 500,
  monsterMatchTypeLevel = { [0]: 1, 1: 2, 2: 3, 3: 4, 4: 2 },
  monsterMatchTypeState = {
    [0]: "small",
    1: "elite",
    2: "medium",
    3: "boss_common",
    4: "elite",
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
      (this.exl = void 0),
      (this.B6l = ""),
      (this.q6l = void 0),
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
      (this.TDe = void 0),
      (this.yK = (t) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 55, "[BGM]战斗状态变化", [
            "isGameInBattle",
            t,
          ]),
          (this.Yje = t),
          this.Yje ||
            ((this.Jje = !1),
            (this.eWe = 0),
            (this.exl = void 0),
            (this.k6l = ""),
            (this.B6l = ""),
            this.G6l(),
            (this.q6l = void 0)),
          this.nWe() || this.aWe();
      }),
      (this.hWe = () => {
        this.nWe();
      }),
      (this.zwa = (t) => {
        for (const e of t) this.lWe(e);
      }),
      (this.Jwa = (t) => {
        for (const e of t) this.cWe(e);
      }),
      (this.lWe = (t) => {
        this.oWe.add(t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 55, "[BGM] 新增仇恨", ["来源", t]),
          this.oWe.forEach((t) => {
            t = EntitySystem_1.EntitySystem.Get(t);
            t?.Valid && this.vWe(t);
          }),
          this.nWe() || this.uWe();
      }),
      (this.cWe = (t) => {
        this.oWe.delete(t);
      }),
      (this.mWe = () => {
        this.dWe();
      }),
      (this.OnRemoveEntity = (t, e) => {
        this.iWe.has(e.Id) &&
          (this.iWe.delete(e.Id),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            e,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnRemoveEntity,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            e.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.CWe,
          ));
      }),
      (this.CWe = (t, e, i, s, o) => {
        0 === s.DamageData.CalculateType &&
          this.gWe(e.Id) &&
          this.Yje &&
          (this.Jje ||
            ((this.Jje = !0),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Audio", 55, "[BGM]触发:战斗中首次造成伤害"),
            this.nWe()) ||
            this.fWe());
      }),
      (this.O6l = (t, e) => {
        if (this.q6l) {
          for (const i of this.q6l)
            if (i.TagComp?.HasTag(i.TagId)) return void this.F6l(i.Music);
        } else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Audio",
              42,
              "[BGM] Tag变化更新怪物BGM,没有数据,设置默认BGM",
              ["tagId", t],
              ["exist", e],
            );
        this.F6l(this.B6l);
      }),
      (this.pWe = (t, e) => {
        this.gWe(t) &&
          e.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() &&
          (this.eWe++,
          this.Yje ||
            "perceived" === this.Zje ||
            ((t = EntitySystem_1.EntitySystem.Get(t))
              ? (this.vWe(t),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Audio",
                    4,
                    "[BGM]触发:非战斗状态，被敌方怪物感知",
                    ["感知者", t.GetComponent(3).Actor.GetName()],
                    ["被感知者", e.GetComponent(3).Actor.GetName()],
                    ["当前感知数量", this.eWe],
                  ),
                this.nWe() || this.fWe())
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Audio", 55, "[BGM]感知增加，但没有获取到实体", [
                  "感知者实体ID",
                  e.Id,
                ])));
      }),
      (this.MWe = (t, e) => {
        this.gWe(t) &&
          e.Id === Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint() &&
          (this.eWe--, !this.Yje) &&
          this.eWe <= 0 &&
          "perceived" === this.Zje &&
          ((this.eWe = 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 55, "[BGM]触发:感知消失"),
          this.nWe() || (this.fWe(), this.uWe()));
      });
  }
  get k6l() {
    return this.$je;
  }
  set k6l(t) {
    t !== this.$je &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          42,
          "[BGM] 更新怪物BGM",
          ["Old", this.k6l],
          ["New", t],
        ),
      (this.$je = t));
  }
  Init() {
    this.dde();
  }
  Destroy() {
    this.TDe?.Valid() &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), this.Tlh()),
      this.Cde();
  }
  sWe() {
    "unpurified" === this.tWe
      ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "unpurified"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 55, "[BGM]切换无音区: 进入无音区，未净化"))
      : "purified" === this.tWe
        ? (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "purified"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 55, "[BGM]切换无音区: 进入无音区，已净化"))
        : (AudioSystem_1.AudioSystem.SetState("wuyinqu_type", "none"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 55, "[BGM]切换无音区: 未处在无音区"));
  }
  aWe() {
    this.Yje
      ? this.Llh()
      : (this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
          this.Yje
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Audio",
                55,
                "[BGM]离开战斗但脱战时间过短，已忽略本次脱战",
              )
            : this.Tlh(),
            (this.TDe = void 0);
        }, LEAVE_BATTLE_DELAY_MS));
  }
  Llh() {
    this.fWe(),
      this.uWe(),
      this.EWe(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Audio", 42, "[AreaAudio] BGM切换至战斗状态");
  }
  Tlh() {
    this.EWe(),
      this.fWe(),
      this.uWe(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Audio", 42, "[AreaAudio] 离开战斗,BGM切换回常态");
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
            Log_1.Log.Info("Audio", 55, "[BGM]切换玩家状态: 进入战斗造成伤害", [
              "BGM",
              this._We(),
            ]))
        : "battle_in" !== this.Zje &&
          ((this.Zje = "battle_in"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "battle_in"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 55, "[BGM]切换玩家状态: 进入战斗未造成伤害", [
            "BGM",
            this._We(),
          ])
      : 0 < this.eWe && "perceived" !== this.Zje
        ? ((this.Zje = "perceived"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "perceived"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              55,
              "[BGM]切换玩家状态: 未进入战斗但被感知",
              ["BGM", this._We()],
            ))
        : "none" !== this.Zje &&
          ((this.Zje = "none"),
          AudioSystem_1.AudioSystem.SetState("battle_music_state", "none"),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("Audio", 55, "[BGM]切换玩家状态: 未遇敌", [
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
            55,
            "[BGM]提示: 剧情期间保持原背景音乐，跳过切换",
          ),
        !0)
      : !!this.zje &&
          ((this.zje = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Audio",
              55,
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
          Log_1.Log.Info("Audio", 55, "[BGM]切换战斗状态:战斗"))
      : (AudioSystem_1.AudioSystem.SetState("music_group", "field"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Audio", 55, "[BGM]切换战斗状态:非战斗"));
  }
  uWe() {
    var t = this._We();
    AudioSystem_1.AudioSystem.SetState("monster_type", t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Audio",
          55,
          "[BGM] 切换怪物类型状态:",
          ["Group", "monster_type"],
          ["State", t],
        );
  }
  _We() {
    var t;
    return "none" === this.Zje || void 0 === this.exl
      ? "none"
      : 0 < this.k6l.length
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 55, "[BGM] 使用怪物标签状态", [
              "Tag",
              this.k6l,
            ]),
          this.k6l)
        : ((t = monsterMatchTypeState[this.exl]),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Audio", 55, "[BGM] 使用怪物通用状态:", [
              "Type",
              t,
            ]),
          t);
  }
  dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeArea,
      this.AreaChanged,
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
        this.zwa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.Jwa,
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
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this),
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
        this.zwa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAggroRemoved,
        this.Jwa,
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
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
          this,
          t,
          EventDefine_1.EEventName.RemoveEntity,
          this.OnRemoveEntity,
        ),
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
          (EventSystem_1.EventSystem.RemoveWithTarget(
            t.Entity,
            EventDefine_1.EEventName.CharDamage,
            this.CWe,
          ),
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(
            this,
            t,
            EventDefine_1.EEventName.RemoveEntity,
            this.OnRemoveEntity,
          ));
      }
      this.iWe.clear();
    }
  }
  gWe(t) {
    var e,
      t = EntitySystem_1.EntitySystem.Get(t);
    return !(
      !t ||
      !Global_1.Global.BaseCharacter ||
      ((e = t.GetComponent(3)?.CreatureData),
      !(t = t.GetComponent(3)?.Actor)) ||
      2 !==
        CampUtils_1.CampUtils.GetCampRelationship(
          t.Camp,
          Global_1.Global.BaseCharacter.Camp,
        ) ||
      "Monster" !== e?.GetBaseInfo()?.Category.MainType
    );
  }
  vWe(t) {
    var e = t.GetComponent(3),
      i = e?.CreatureData;
    e &&
      i?.GetLivingStatus() !== Protocol_1.Aki.Protocol.JEs.Proto_Dead &&
      (void 0 === (i = i?.GetBaseInfo()?.Category.MonsterMatchType)
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Audio",
            55,
            "[BGM] 无效的怪物类型",
            ["怪物类型", i],
            ["实体ID", t.Id],
          )
        : (!this.exl ||
            monsterMatchTypeLevel[i] > monsterMatchTypeLevel[this.exl]) &&
          (this.N6l(e), (this.exl = i), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Audio",
            55,
            "[BGM] 已记录怪物最高等级",
            ["MaxLevel", monsterMatchTypeLevel[i]],
            ["MonsterType", this.exl],
            ["SourceEntity", t.Id],
            ["SourceEntityName", e?.Actor.GetName()],
          ));
  }
  N6l(t) {
    var e,
      i = t.CreatureData.GetAttributeComponent(),
      s = t.Entity.GetComponent(203);
    if (i.FightMusic) (this.B6l = i.FightMusic), (this.k6l = i.FightMusic);
    else if (i.FightMusics) {
      (this.B6l = ""),
        this.q6l ? (this.G6l(), (this.q6l.length = 0)) : (this.q6l = []);
      for (const o of i.FightMusics.Element)
        o.ActivateTag
          ? (e = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(
              o.ActivateTag,
            )) &&
            (this.q6l.push({ TagId: e.TagId, Music: o.FightMusic, TagComp: s }),
            s?.AddTagAddOrRemoveListener(e.TagId, this.O6l))
          : (this.B6l = o.FightMusic);
      this.k6l = this.B6l;
    }
  }
  F6l(t) {
    this.k6l !== t && ((this.k6l = t), this.uWe());
  }
  G6l() {
    if (this.q6l)
      for (const t of this.q6l)
        t.TagComp && t.TagComp.RemoveTagAddOrRemoveListener(t.TagId, this.O6l);
  }
}
exports.AreaAudio = AreaAudio;
//# sourceMappingURL=AreaAudio.js.map
