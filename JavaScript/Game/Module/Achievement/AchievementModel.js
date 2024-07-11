"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const AchievementData_1 = require("./AchievementData");
const RECENT_FINISHED_LIST_LENGTH = 5;
const showFunctionList = [1];
class AchievementModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectCategory = void 0),
      (this.CurrentSelectGroup = void 0),
      (this.CurrentSelectAchievementId = 0),
      (this.AchievementSearchState = !1),
      (this.CurrentSearchText = ""),
      (this.CurrentFinishAchievementArray = new Array()),
      (this.CurrentCacheSearchData = void 0),
      (this.Mbe = new Map()),
      (this.Sbe = new Map()),
      (this.Ebe = new Array()),
      (this.ybe = new Map()),
      (this.Ibe = new Map()),
      (this.Tbe = new Map()),
      (this.Lbe = new Array()),
      (this.Dbe = new Array()),
      (this.Rbe = (e, t) => t.GetFinishTime() - e.GetFinishTime());
  }
  Ube(e) {
    const t = new Array();
    ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupAchievementList(
      e,
    ).forEach((e) => {
      e = this.GetAchievementData(e.Id);
      t.push(e);
    }),
      this.Sbe.set(e, t);
  }
  Abe(e) {
    const t =
      ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementCategoryGroups(
        e,
      );
    const i = new Array();
    t.forEach((e) => {
      e = this.GetAchievementGroupData(e.Id);
      i.push(e);
    }),
      this.ybe.set(e, i);
  }
  Pbe() {
    (this.Ebe = new Array()),
      ConfigManager_1.ConfigManager.AchievementConfig.GetAllAchievementCategory().forEach(
        (e) => {
          const t = new AchievementData_1.AchievementCategoryData(e.Id);
          showFunctionList.includes(e.FunctionType) && this.Ebe.push(t);
        },
      );
  }
  xbe(e) {
    this.Lbe.includes(e) || this.Lbe.push(e);
  }
  wbe(e) {
    this.Dbe.includes(e) || this.Dbe.push(e);
  }
  Bbe(e) {
    var t = this.Lbe.indexOf(e);
    var t = (t >= 0 && this.Lbe.splice(t, 1), this.Dbe.indexOf(e));
    t >= 0 && this.Dbe.splice(t, 1);
  }
  bbe() {
    this.Lbe.sort(this.Rbe);
  }
  qbe() {
    this.Dbe.sort(this.Rbe);
  }
  Gbe(e) {
    let t;
    const i = new AchievementData_1.AchievementData(e);
    i.IfSingleAchievement() ||
      ((t = i.GetNextLink()) > 0 && this.GetAchievementData(t).SetLastLink(e)),
      this.Ibe.set(e, i);
  }
  Nbe(e) {
    const t = new AchievementData_1.AchievementGroupData(e);
    this.Tbe.set(e, t);
  }
  PhraseBaseData(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Achievement", 28, "Achievement PhraseBaseData response"),
      (this.Lbe = new Array()),
      (this.Dbe = new Array()),
      this.Ibe.clear(),
      e.Nms.forEach((e) => {
        this.GetAchievementGroupData(e.Oms.Ekn).Phrase(e.Oms),
          e.kms.forEach((e) => {
            const t = this.GetAchievementData(e.Ekn);
            t.Phrase(e),
              t.GetFinishState() === 1
                ? this.xbe(t)
                : t.GetFinishState() === 2 && this.wbe(t);
          });
      }),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAchievementDataNotify,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshAchievementRedPoint,
      );
  }
  OnAchievementProgressNotify(e) {
    const t = this.GetAchievementData(e.Ekn);
    const i = t.GetFinishState();
    var e = (t.Phrase(e), t.GetFinishState());
    e !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Achievement",
          28,
          "OnAchievementGroupProgressNotify",
          ["id", t.GetId()],
          ["currentState", e],
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshAchievementRedPoint,
      )),
      this.Bbe(t),
      t.GetFinishState() === 1
        ? this.xbe(t)
        : t.GetFinishState() === 2 && this.wbe(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAchievementDataNotify,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
        t.GetId(),
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAchievementGroupDataNotify,
        t.GetGroupId(),
      );
  }
  OnAchievementGroupProgressNotify(e) {
    const t = this.GetAchievementGroupData(e.Oms.Ekn);
    const i = t.GetFinishState();
    var e = (t.Phrase(e.Oms), t.GetFinishState());
    e !== i &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshAchievementRedPoint,
      ),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Achievement",
        28,
        "OnAchievementGroupProgressNotify",
        ["id", t.GetId()],
        ["currentState", e],
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAchievementGroupDataNotify,
        t.GetId(),
      );
  }
  GetGroupAchievements(e, t = !0) {
    let i = this.Sbe.get(e);
    if ((i || (this.Ube(e), (i = this.Sbe.get(e))), !t)) return i;
    const r = new Array();
    for (let e = 0; e < i.length; e++)
      i[e].GetShowState()
        ? r.push(i[e])
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Achievement",
            28,
            "GetGroupAchievements not Show",
            ["id", i[e].GetId()],
            ["MaxProgress", i[e].GetMaxProgress()],
          );
    return r;
  }
  GetAchievementCategoryIndex(t) {
    return this.GetAchievementCategoryArray().findIndex(
      (e) => e.GetId() === t.GetId(),
    );
  }
  GetAchievementCategoryGroups(e) {
    let t = this.ybe.get(e);
    t || (this.Abe(e), (t = this.ybe.get(e)));
    const i = new Array();
    return (
      t.forEach((e) => {
        e.GetShowState() && i.push(e);
      }),
      i.sort((e, t) => e.GetSort() - t.GetSort()),
      i
    );
  }
  GetAchievementData(t) {
    if (!this.Ibe.get(t))
      try {
        this.Gbe(t);
      } catch (e) {
        e instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack("Achievement", 59, "成就初始化异常", e, [
              "id",
              t,
            ])
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Achievement", 59, "成就初始化异常", ["error", e]);
      }
    return this.Ibe.get(t);
  }
  GetAchievementCategoryArray() {
    return this.Ebe.length === 0 && this.Pbe(), this.Ebe;
  }
  GetCategory(t) {
    const i = this.GetAchievementCategoryArray();
    let r = void 0;
    for (let e = 0; e < i.length; e++) i[e].GetId() === t && (r = i[e]);
    return r;
  }
  GetAchievementGroupData(e) {
    if (e) return this.Tbe.has(e) || this.Nbe(e), this.Tbe.get(e);
  }
  GetRecentFinishedAchievementList() {
    let t;
    let i;
    const r = new Array();
    this.bbe();
    for (
      let e = 0;
      e < this.Lbe.length && r.length < RECENT_FINISHED_LIST_LENGTH;
      e++
    )
      r.includes(this.Lbe[e].GetId()) ||
        (this.Lbe[e].GetShowState() &&
          ((t = this.GetAchievementGroupData(this.Lbe[e].GetGroupId())),
          (t =
            ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
              t.GetCategory(),
            )),
          showFunctionList.includes(t)) &&
          r.push(this.Lbe[e].GetId()));
    if (r.length < RECENT_FINISHED_LIST_LENGTH) {
      this.qbe();
      for (
        let e = 0;
        e < this.Dbe.length && r.length < RECENT_FINISHED_LIST_LENGTH;
        e++
      )
        r.includes(this.Dbe[e].GetId()) ||
          (this.Dbe[e].GetShowState() &&
            ((i = this.GetAchievementGroupData(this.Dbe[e].GetGroupId())),
            (i =
              ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
                i.GetCategory(),
              )),
            showFunctionList.includes(i)) &&
            r.push(this.Dbe[e].GetId()));
    }
    return r;
  }
  GetAchievementRedPointState() {
    const t = this.GetAchievementCategoryArray();
    for (let e = 0; e < t.length; e++)
      if (this.GetCategoryRedPointState(t[e].GetId())) return !0;
    return !1;
  }
  GetCategoryRedPointState(e) {
    const t = this.GetAchievementCategoryGroups(e);
    if (t)
      for (let e = 0; e < t.length; e++)
        if (t[e].SmallItemRedPoint()) return !0;
    return !1;
  }
  GetCategoryStarNum(e) {
    let t = 0;
    for (const i of this.GetAchievementCategoryGroups(e))
      for (const r of this.GetGroupAchievements(i.GetId())) t += r.GetMaxStar();
    return t;
  }
  GetCategoryObtainStarNum(e) {
    let t = 0;
    for (const i of this.GetAchievementCategoryGroups(e))
      for (const r of this.GetGroupAchievements(i.GetId()))
        t += r.GetFinishedStar();
    return t;
  }
  GetAllObtainStarNum() {
    const e = this.GetAchievementCategoryArray();
    if (void 0 === e) return 0;
    let t = 0;
    for (const i of e) t += this.GetCategoryObtainStarNum(i.GetId());
    return t;
  }
  GetFinishedAchievementNum() {
    let e = 0;
    return (e += this.Dbe.length) + this.Lbe.length;
  }
  GetAchievementAllStar() {
    let t = 0;
    return (
      this.GetAchievementCategoryArray().forEach((e) => {
        t += this.GetCategoryStarNum(e.GetId());
      }),
      t
    );
  }
  GetAchievementFinishedStar() {
    let t = 0;
    return (
      this.Dbe.forEach((e) => {
        t += e.GetAchievementConfigStar();
      }),
      this.Lbe.forEach((e) => {
        t += e.GetAchievementConfigStar();
      }),
      t
    );
  }
  RefreshSearchResult() {
    const e = this.GetAchievementCategoryArray();
    (this.Mbe = new Map()),
      e.forEach((e) => {
        const t = this.Obe(e.GetId(), this.CurrentSearchText);
        Array.from(t.keys()).length > 0 && this.Mbe.set(e, t);
      });
  }
  GetSearchResult() {
    return this.Mbe;
  }
  GetSearchResultIfNull() {
    let e = !0;
    for (const t of this.Mbe.values()) {
      for (const i of t.values())
        if (i.length > 0) {
          e = !1;
          break;
        }
      if (!e) break;
    }
    return e;
  }
  Obe(e, t) {
    const i = new Map();
    const r = this.GetAchievementCategoryGroups(e);
    for (let e = 0; e < r.length; e++) {
      const n = this.GetGroupAchievements(r[e].GetId());
      const s = new Array();
      n.forEach((e) => {
        (e.GetTitle() && e.GetDesc()) ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Achievement",
              28,
              "成就分类找不到名称",
              ["id", e.GetId()],
              ["title", e.GetTitle()],
              ["desc", e.GetDesc()],
            )),
          (e.GetTitle()?.includes(t) || e.GetDesc()?.includes(t)) && s.push(e);
      }),
        s.length > 0 && i.set(r[e], s);
    }
    return i;
  }
  GetSearchResultData(e) {
    const r = new Array();
    for (const t of e.keys())
      e.get(t).forEach((e, t) => {
        const i = new AchievementData_1.AchievementSearchData();
        (i.AchievementSearchGroupData =
          new AchievementData_1.AchievementSearchGroupData()),
          (i.AchievementSearchGroupData.AchievementGroupData = t),
          (i.AchievementSearchGroupData.AchievementDataLength = e.length),
          r.push(i),
          e.forEach((e) => {
            const t = new AchievementData_1.AchievementSearchData();
            (t.AchievementData = e), r.push(t);
          });
      });
    return r;
  }
  IsHideAchievementGroup(e) {
    (e = this.GetAchievementGroupData(e)?.GetCategory()),
      (e =
        ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
          e,
        ));
    return !showFunctionList.includes(e);
  }
}
(exports.AchievementModel = AchievementModel).SortByTabIndex = (e, t) =>
  t.GetFinishSort() - e.GetFinishSort();
// # sourceMappingURL=AchievementModel.js.map
