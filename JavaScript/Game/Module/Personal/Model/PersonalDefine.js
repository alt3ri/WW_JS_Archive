"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.playerTitleQualityToColor =
    exports.PersonalInfoData =
    exports.RoleShowEntry =
    exports.PersonalPlayerTitleData =
    exports.PersonalCardData =
    exports.STOP_AUDIO_EVENT_NAME =
    exports.MAX_NAME_LENGTH =
    exports.MAX_SIGN_LENGTH =
      void 0);
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager");
(exports.MAX_SIGN_LENGTH = 40),
  (exports.MAX_NAME_LENGTH = 12),
  (exports.STOP_AUDIO_EVENT_NAME = "stop_gacha_role_audio");
class PersonalCardData {
  constructor(t, e, r) {
    (this.CardId = 0),
      (this.IsRead = !1),
      (this.IsUnLock = !1),
      (this.CardId = t),
      (this.IsRead = e),
      (this.IsUnLock = r);
  }
  RefreshData(t, e) {
    (this.IsRead = t), (this.IsUnLock = e);
  }
}
exports.PersonalCardData = PersonalCardData;
class PersonalPlayerTitleData {
  constructor(t, e) {
    (this.PlayerTitleId = 0),
      (this.StarLevel = void 0),
      (this.IsUnLock = !1),
      (this.UnlockTime = void 0),
      (this.PlayerTitleId = t),
      (this.IsUnLock = e),
      this.IsUnLock &&
        void 0 ===
          (e =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
            ) ?? new Map()).get(t) &&
        (e.set(t, !0),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
          e,
        ));
  }
  UnLock(t) {
    (this.IsUnLock = !0), (this.UnlockTime = t);
  }
  SetStarLevel(t) {
    this.StarLevel = t;
  }
  SetUnlockTime(t) {
    this.UnlockTime = t;
  }
  GetIsShowRedDot() {
    return (
      (
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleRecord,
        ) ?? new Map()
      ).get(this.PlayerTitleId) ?? !1
    );
  }
}
exports.PersonalPlayerTitleData = PersonalPlayerTitleData;
class RoleShowEntry {
  constructor(t, e) {
    (this.Q6n = t), (this.F6n = e);
  }
}
exports.RoleShowEntry = RoleShowEntry;
class PersonalInfoData {
  constructor() {
    (this.RoleShowList = []),
      (this.CardShowList = []),
      (this.CurCardId = void 0),
      (this.jI1 = 0),
      (this.IsBirthdayDisplay = !1),
      (this.CardDataList = []),
      (this.Signature = ""),
      (this.HeadPhotoId = void 0),
      (this.IsOtherData = !1),
      (this.Level = 0),
      (this.WorldLevel = 0),
      (this.Name = ""),
      (this.PlayerTitleDataList = []),
      (this.CurPlayerTitleId = void 0),
      (this.CurPlayerTitleLevel = void 0),
      (this.Sex = 0),
      (this.PlayerId = 0),
      (this.LastModifyNameTime = 0),
      (this.ModifyName = StringUtils_1.EMPTY_STRING),
      (this.PsnUserId = void 0),
      (this.PsnOnlineId = void 0);
  }
  GetUnlockCardDataCount() {
    let e = 0;
    return (
      this.CardDataList.forEach((t) => {
        t.IsUnLock && e++;
      }),
      e
    );
  }
  GetCardList(e) {
    let t = this.CardDataList;
    return (
      (t = t.filter((t) => !!e || t.IsUnLock)).sort((t, e) => {
        var r, s;
        return t.IsUnLock !== e.IsUnLock
          ? Number(e.IsUnLock) - Number(t.IsUnLock)
          : ((r = BackgroundCardById_1.configBackgroundCardById.GetConfig(
              t.CardId,
            )),
            (s = BackgroundCardById_1.configBackgroundCardById.GetConfig(
              e.CardId,
            )),
            r.SortIndex !== s.SortIndex
              ? s.SortIndex - r.SortIndex
              : e.CardId - t.CardId);
      }),
      t
    );
  }
  get Birthday() {
    return this.jI1;
  }
  set Birthday(t) {
    (ModelManager_1.ModelManager.BirthdayModel.ResetYear = t / 1e4),
      (this.jI1 = t % 1e4),
      t < 1e4 && (this.jI1 = 0);
  }
}
(exports.PersonalInfoData = PersonalInfoData),
  (exports.playerTitleQualityToColor = {
    [0]: "FFF7A0FF",
    1: "D3DEFFFF",
    2: "B19370FF",
  });
//# sourceMappingURL=PersonalDefine.js.map
