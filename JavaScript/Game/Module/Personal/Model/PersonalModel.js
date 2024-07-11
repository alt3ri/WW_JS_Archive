"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  BackgroundCardAll_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardAll"),
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
  PersonalDefine_1 = require("./PersonalDefine");
class PersonalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UiCachePersonalData = void 0),
      (this.p5i = void 0);
  }
  OnInit() {
    return this.p5i || (this.p5i = new PersonalDefine_1.PersonalInfoData()), !0;
  }
  OnClear() {
    return !(this.p5i = void 0);
  }
  GetPersonalInfoData() {
    return this.p5i;
  }
  SetRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var i = t[e];
      this.p5i.RoleShowList.push(
        new PersonalDefine_1.RoleShowEntry(i.O6n, i.P6n),
      );
    }
  }
  UpdateRoleShowList(t) {
    this.p5i.RoleShowList = [];
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var i = t[e],
        n =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
            i,
          ).GetLevelData();
      this.p5i.RoleShowList.push(
        new PersonalDefine_1.RoleShowEntry(i, n.GetLevel()),
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
  SetCardUnlockList(t) {
    this.zna();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var i = t[e],
        n = this.Zna(i.V7n);
      void 0 === n
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Personal", 59, "初始化卡牌,无效CardId", [
            "cardId",
            i.V7n,
          ])
        : n.RefreshData(i.ASs ?? !1, !0);
    }
  }
  zna() {
    (this.p5i.CardDataList = []),
      BackgroundCardAll_1.configBackgroundCardAll
        .GetConfigList()
        .forEach((e) => {
          this.p5i.CardDataList.push(
            new PersonalDefine_1.PersonalCardData(e.Id, !1, !1),
          );
        });
  }
  Zna(e) {
    for (const t of this.p5i.CardDataList) if (t.CardId === e) return t;
  }
  UpdateCardUnlockList(t, r) {
    var i = this.p5i.CardDataList.length;
    for (let e = 0; e < i; e++) {
      var n = this.p5i.CardDataList[e];
      if (n.CardId === t) {
        (n.IsRead = r),
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
    var r = this.Zna(e);
    void 0 === r
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Personal", 59, "新解锁卡牌,无效CardId", ["cardId", e])
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
  TryHidePersonalTip() {
    this.CheckCanShowPersonalTip() &&
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ShowPersonalTip,
        !1,
      );
  }
}
exports.PersonalModel = PersonalModel;
//# sourceMappingURL=PersonalModel.js.map
