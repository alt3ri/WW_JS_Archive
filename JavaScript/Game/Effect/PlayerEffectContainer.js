"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerEffectContainer = void 0);
const EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  ModelManager_1 = require("../Manager/ModelManager"),
  SceneTeamDefine_1 = require("../Module/SceneTeam/SceneTeamDefine"),
  EffectSystem_1 = require("./EffectSystem"),
  PLAYER_EFFECT_LRU_CAPACITY = 200;
class PlayerEffectContainer {
  constructor() {
    (this.Bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.bpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.qpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.Gpe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.Npe = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.Ope = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.xwn = new Array(SceneTeamDefine_1.SCENE_TEAM_MAX_NUM)),
      (this.kpe = () => {
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          this.Ope[e] = this.Npe[e];
        var t,
          i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var n = i[e],
            r = n?.EntityHandle;
          n?.IsMyRole() && r ? (this.Npe[e] = r.Id) : (this.Npe[e] = 0);
        }
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          (this.Gpe[e] = -1), (this.xwn[e] = !1);
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          (this.qpe[e] = e),
            0 < this.Ope[e] &&
              -1 < (t = this.Fpe(this.Ope[e])) &&
              ((this.Gpe[t] = e), (this.xwn[e] = !0));
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          this.xwn[e] || this.Bpe[e].Clear();
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var s,
            a = this.Gpe[e];
          if (-1 < a) {
            let t = -1;
            for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
              if (this.qpe[e] === a) {
                t = e;
                break;
              }
            e !== t &&
              -1 < t &&
              ((s = this.Bpe[t]),
              (this.Bpe[t] = this.Bpe[e]),
              (this.Bpe[e] = s),
              (s = this.qpe[t]),
              (this.qpe[t] = this.qpe[e]),
              (this.qpe[e] = s),
              (s = this.bpe[t]),
              (this.bpe[t] = this.bpe[e]),
              (this.bpe[e] = s));
          }
        }
      });
  }
  Initialize() {
    for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
      (this.Bpe[e] = EffectSystem_1.EffectSystem.CreateEffectLru(
        PLAYER_EFFECT_LRU_CAPACITY,
      )),
        (this.bpe[e] = e);
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUpdateSceneTeam,
      this.kpe,
    );
  }
  Clear() {
    for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; -1 < e; e--)
      this.Bpe[e].Clear();
    (this.Bpe.length = 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.kpe,
      );
  }
  ClearPool() {
    for (let e = SceneTeamDefine_1.SCENE_TEAM_MAX_NUM - 1; -1 < e; e--)
      this.Bpe[e].Clear();
  }
  CheckGetCondition(e) {
    return -1 < this.Vpe(e);
  }
  GetLruHitRate(e) {
    e = this.Vpe(e);
    return e < 0 ? 0 : this.Bpe[e].HitRate;
  }
  GetPlayerEffectPoolSize(e) {
    return this.Bpe[e].Size;
  }
  Fpe(t) {
    if (ModelManager_1.ModelManager.CharacterModel.IsValid(t))
      for (let e = 0; e < this.Npe.length; e++) if (t === this.Npe[e]) return e;
    return -1;
  }
  Vpe(e) {
    return !e?.EntityId ||
      (e = this.Fpe(e.EntityId)) < 0 ||
      e >= this.Bpe.length
      ? -1
      : e;
  }
  CreateEffectHandleFromPool(e, t) {
    var i = this.Vpe(t);
    if (!(i < 0))
      return (
        (e = this.Bpe[i].Create(e)),
        (i = this.bpe[i]),
        e && ((e.CreateSource = 2 + i), (e.SourceEntityId = t.EntityId)),
        e
      );
  }
  GetEffectHandleFromPool(e, t) {
    var i = this.Vpe(t);
    if (!(i < 0))
      return (i = this.Bpe[i].Get(e)) && (i.SourceEntityId = t.EntityId), i;
  }
  PutEffectHandleToPool(e) {
    var t = e.SourceEntityId,
      t = this.Fpe(t);
    if (t < 0) {
      if (0 < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
        var i = e.CreateSource - 2;
        let t = 0;
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          if (this.bpe[e] === i) {
            t = e;
            break;
          }
        this.Bpe[t].RemoveExternal(e);
      }
      return !1;
    }
    return (
      (e.SourceEntityId = -1),
      this.Bpe[t].Put(e.GetEffectSpec().GetProxyHandle())
    );
  }
  LruRemoveExternal(e) {
    var t = e.SourceEntityId,
      t = this.Fpe(t);
    if (t < 0) {
      if (0 < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM) {
        var i = e.CreateSource - 2;
        let t = 0;
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++)
          if (this.bpe[e] === i) {
            t = e;
            break;
          }
        return this.Bpe[t].RemoveExternal(e);
      }
      return !1;
    }
    return (e.SourceEntityId = -1), this.Bpe[t].RemoveExternal(e);
  }
}
exports.PlayerEffectContainer = PlayerEffectContainer;
//# sourceMappingURL=PlayerEffectContainer.js.map
