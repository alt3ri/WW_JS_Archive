"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  BackgroundCardAll_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardAll"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PlayerTitleById_1 = require("../../../../Core/Define/ConfigQuery/PlayerTitleById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PlayerHeadData_1 = require("../Data/PlayerHeadData"),
  PersonalDefine_1 = require("./PersonalDefine");
class PersonalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UiCachePersonalData = void 0),
      (this.p5i = void 0),
      (this.C3l = new Map()),
      (this.g3l = new Map()),
      (this.X0c = new Map()),
      (this.e6l = (e, t) => {
        var r = e.Lock ? 1 : 0,
          a = t.Lock ? 1 : 0;
        return r != a ? r - a : t.Config.SortIndex - e.Config.SortIndex;
      });
  }
  OnInit() {
    return this.p5i || (this.p5i = new PersonalDefine_1.PersonalInfoData()), !0;
  }
  InitPlayerHeadData(e) {
    this.C3l.clear();
    var t =
      ConfigManager_1.ConfigManager.PersonalConfig.GetAllPlayerHeadConfig();
    if (void 0 !== t) {
      for (const a of t) {
        var r = new PlayerHeadData_1.PlayerHeadData(a);
        this.C3l.set(r.Id, r);
      }
      this.f3l(), this.UpdatePlayerHeadData(e);
    }
  }
  f3l() {
    this.g3l.clear();
    for (var [, e] of this.C3l) {
      var t,
        r = e.Config.RoleSkinId;
      r <= 0 ||
        ((t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(r)) &&
          ModelManager_1.ModelManager.RoleModel.IsMainRole(t.GetRoleId()) &&
          this.g3l.set(e.Id, r));
    }
  }
  UpdatePlayerHeadData(e) {
    for (const t of e) this.UnLockPlayerHeadData(t);
  }
  UnLockPlayerHeadData(e) {
    e = this.GetPlayerHeadData(e);
    void 0 !== e && (e.Lock = !1);
  }
  OnClear() {
    return (
      (this.p5i = void 0),
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem,
      ),
      !0
    );
  }
  GetPersonalInfoData() {
    return this.p5i;
  }
  SetRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e];
      this.p5i.RoleShowList.push(
        new PersonalDefine_1.RoleShowEntry(a.Q6n, a.F6n),
      );
    }
  }
  UpdateRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e],
        i =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            a,
          ).GetLevelData();
      this.p5i.RoleShowList.push(
        new PersonalDefine_1.RoleShowEntry(a, i.GetLevel()),
      );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRoleShowListChange,
    );
  }
  GetRoleShowList() {
    return this.p5i.RoleShowList;
  }
  SetCardShowList(e) {
    this.p5i.CardShowList = e;
  }
  GetCardShowList() {
    return this.p5i.CardShowList;
  }
  SetCurCardId(e) {
    (this.p5i.CurCardId = e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCardChange);
  }
  GetCurCardId() {
    return this.p5i.CurCardId && 0 < this.p5i.CurCardId
      ? this.p5i.CurCardId
      : ConfigManager_1.ConfigManager.FriendConfig.GetDefaultBackgroundCardId();
  }
  SetBirthday(e) {
    (this.p5i.Birthday = e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBirthChange);
  }
  SetBirthdayDisplay(e) {
    (this.p5i.IsBirthdayDisplay = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnBirthDisplayChange,
      );
  }
  SetName(e) {
    this.p5i.Name = e;
  }
  SetPlayerId(e) {
    this.p5i.PlayerId = e;
  }
  SetModifyNameInfo(e, t) {
    (this.p5i.LastModifyNameTime = Number(
      MathUtils_1.MathUtils.LongToBigInt(e),
    )),
      (this.p5i.ModifyName = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnModifyNameStateChange,
      );
  }
  GetBirthday() {
    return this.p5i.Birthday;
  }
  GetBirthdayDisplay() {
    return this.p5i.IsBirthdayDisplay;
  }
  SetSignature(e) {
    (this.p5i.Signature = e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignChange);
  }
  GetSignature() {
    return this.p5i.Signature;
  }
  SetHeadPhotoId(e) {
    (this.p5i.HeadPhotoId = e),
      ModelManager_1.ModelManager.PlayerInfoModel.ChangeNumberProp(4, e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnHeadIconChange,
        e,
      );
  }
  GetHeadPhotoId() {
    var e;
    return (
      this.p5i.HeadPhotoId ||
        ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4)),
        (this.p5i.HeadPhotoId = e)),
      this.p5i.HeadPhotoId
    );
  }
  GetPsnUserId() {
    return this.p5i.PsnUserId;
  }
  SetCardUnlockList(t) {
    this.wha();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e],
        i = this.Bha(a.J7n);
      void 0 === i
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Personal", 58, "初始化卡牌,无效CardId", [
            "cardId",
            a.J7n,
          ])
        : i.RefreshData(a.qSs ?? !1, !0);
    }
  }
  wha() {
    (this.p5i.CardDataList = []),
      BackgroundCardAll_1.configBackgroundCardAll
        .GetConfigList()
        .forEach((e) => {
          this.p5i.CardDataList.push(
            new PersonalDefine_1.PersonalCardData(e.Id, !1, !1),
          );
        });
  }
  Bha(e) {
    for (const t of this.p5i.CardDataList) if (t.CardId === e) return t;
  }
  UpdateCardUnlockList(t, r) {
    var a = this.p5i.CardDataList.length;
    for (let e = 0; e < a; e++) {
      var i = this.p5i.CardDataList[e];
      if (i.CardId === t) {
        (i.IsRead = r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPersonalCardRead,
            t,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPersonalCardRefreshRedDot,
          );
        break;
      }
    }
  }
  AddCardUnlockList(e, t) {
    var r = this.Bha(e);
    void 0 === r
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Personal", 58, "新解锁卡牌,无效CardId", ["cardId", e])
      : (r.RefreshData(t, !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPersonalCardRefreshRedDot,
        ));
  }
  GetCardDataList() {
    return this.p5i.CardDataList;
  }
  GetPersonalCardRedDotState() {
    for (const e of this.p5i.CardDataList)
      if (e.IsUnLock && !e.IsRead) return !0;
    return !1;
  }
  GetPersonalTitleRedDotState() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10082)) {
      if (
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleUnlockRedDot,
          !0,
        )
      )
        return !0;
      var e = LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
      );
      if (e) for (var [, t] of e) if (t) return !0;
    }
    return !1;
  }
  GetPersonalModifyNameState() {
    var e, t;
    return this.p5i.ModifyName !== StringUtils_1.EMPTY_STRING
      ? 1
      : ((e = TimeUtil_1.TimeUtil.GetServerTime()),
        (t =
          CommonParamById_1.configCommonParamById.GetIntConfig("NameModifyCd")),
        this.p5i.LastModifyNameTime + t < e ? 0 : 2);
  }
  SetLevel(e) {
    this.p5i.Level = e;
  }
  SetWorldLevel(e) {
    this.p5i.WorldLevel = e;
  }
  CheckCanShowPersonalTip() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "IndividualizationReddotConditionGroup",
    );
    return (
      !!LevelGeneralController_1.LevelGeneralController.CheckCondition(
        e.toString(),
        void 0,
      ) &&
      (LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShowPersonalTip,
      ) ??
        !0)
    );
  }
  SetPersonalTipState(e) {
    this.CheckCanShowPersonalTip() !== e &&
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShowPersonalTip,
        e,
      );
  }
  GetPlayerHeadData(e, t = !0) {
    var r = this.C3l.get(e);
    return (
      void 0 === r &&
        t &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Personal", 58, "获取玩家头像数据失败", [
          "playerHeadId",
          e,
        ]),
      r
    );
  }
  GetPlayerShowHeadDataList() {
    var e,
      t = [],
      r = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId(),
      a = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(r);
    for ([, e] of this.C3l)
      (this.g3l.has(e.Id) && a !== this.g3l.get(e.Id)) || t.push(e);
    return t.sort(this.e6l), t;
  }
  GetUnlockHeadNum() {
    let e = 0;
    for (const t of this.GetPlayerShowHeadDataList()) t.Lock || e++;
    return e;
  }
  SetSex(e) {
    this.p5i.Sex = e;
  }
  GetSex() {
    return this.p5i.Sex;
  }
  InitPlayerTitleData(e) {
    this.X0c.clear();
    for (const a of e) {
      var t,
        r = new PersonalDefine_1.PersonalPlayerTitleData(a.gsc, a.K6n);
      0 !== a.GNs && r.SetStarLevel(a.GNs),
        0 !== a.yzs &&
          ((t = MathUtils_1.MathUtils.LongToNumber(a.yzs)), r.SetUnlockTime(t)),
        this.X0c.set(a.gsc, r);
    }
    (this.p5i.PlayerTitleDataList = Array.from(this.X0c.values())),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot,
      );
  }
  SetDressedPlayerTitle(e, t = void 0) {
    (this.p5i.CurPlayerTitleId = e), (this.p5i.CurPlayerTitleLevel = t);
    e = this.X0c.get(e);
    e && t && (e.StarLevel = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerTitleChange,
      );
  }
  UpdateUnDressedPlayerTitleList(e) {
    for (const a of e) {
      var t,
        r = this.X0c.get(a.gsc);
      if (!r) return;
      a.GNs && r.SetStarLevel(a.GNs),
        a.K6n !== r.IsUnLock &&
          ((t = MathUtils_1.MathUtils.LongToNumber(a.yzs)),
          r.UnLock(t),
          (r =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
            ) ?? new Map()).set(a.gsc, !0),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
            r,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPlayerTitleUnlock,
          ));
    }
  }
  GetDressedPlayerTitleData() {
    let e = 0;
    return (
      this.p5i.CurPlayerTitleId &&
        0 < this.p5i.CurPlayerTitleId &&
        (e = this.p5i.CurPlayerTitleId),
      this.X0c.get(e)
    );
  }
  GetDressedPlayerTitleId() {
    return this.p5i.CurPlayerTitleId && 0 < this.p5i.CurPlayerTitleId
      ? this.p5i.CurPlayerTitleId
      : 0;
  }
  GetDressedPlayerTitleLevel() {
    return this.p5i.CurPlayerTitleLevel && 0 < this.p5i.CurPlayerTitleLevel
      ? this.p5i.CurPlayerTitleLevel
      : 0;
  }
  GetPlayerTitleData(e) {
    return this.X0c.get(e);
  }
  GetPlayerTitleStarLevel(e) {
    var t = this.X0c.get(e);
    return t
      ? (t.StarLevel ?? 0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Personal", 71, "称号id无效", ["playerTitleId", e]),
        0);
  }
  GetPlayerTitleList() {
    var e = Array.from(this.X0c.values());
    return (
      e.sort((e, t) => {
        var r, a;
        return e.IsUnLock !== t.IsUnLock
          ? Number(t.IsUnLock) - Number(e.IsUnLock)
          : ((r = PlayerTitleById_1.configPlayerTitleById.GetConfig(
              e.PlayerTitleId,
            )),
            (a = PlayerTitleById_1.configPlayerTitleById.GetConfig(
              t.PlayerTitleId,
            )),
            r.SortIndex !== a.SortIndex
              ? a.SortIndex - r.SortIndex
              : t.PlayerTitleId - e.PlayerTitleId);
      }),
      e
    );
  }
  GetUnlockTitleDataCount() {
    let t = 0;
    return (
      this.GetPlayerTitleList().forEach((e) => {
        e.IsUnLock && t++;
      }),
      t
    );
  }
  GetPlayerTitleInfoString(e, t, r = !1) {
    e = PlayerTitleById_1.configPlayerTitleById.GetConfig(e);
    let a = void 0,
      i =
        (e.ActvityName &&
          (a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            e.ActvityName,
          )),
        void 0);
    e.SeasonName &&
      (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.SeasonName));
    e = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.HonorDescription),
      t.toString(),
    );
    if (!a && !i) return e;
    t = r ? "\n" : "";
    let n = "";
    return (n = a && i ? `${a}·${i}——` + t + e : (a || i) + "——" + t + e);
  }
}
exports.PersonalModel = PersonalModel;
//# sourceMappingURL=PersonalModel.js.map
