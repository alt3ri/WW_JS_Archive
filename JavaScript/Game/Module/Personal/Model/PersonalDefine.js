"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalInfoData =
    exports.RoleShowEntry =
    exports.PersonalCardData =
    exports.STOP_AUDIO_EVENT_NAME =
    exports.MAX_NAME_LENGTH =
    exports.MAX_SIGN_LENGTH =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
(exports.MAX_SIGN_LENGTH = 40),
  (exports.MAX_NAME_LENGTH = 12),
  (exports.STOP_AUDIO_EVENT_NAME = "stop_gacha_role_audio");
class PersonalCardData {
  constructor(t, s, o) {
    (this.CardId = 0),
      (this.IsRead = !1),
      (this.IsUnLock = !1),
      (this.CardId = t),
      (this.IsRead = s),
      (this.IsUnLock = o);
  }
  RefreshData(t, s) {
    (this.IsRead = t), (this.IsUnLock = s);
  }
}
exports.PersonalCardData = PersonalCardData;
class RoleShowEntry {
  constructor(t, s) {
    (this.O6n = t), (this.P6n = s);
  }
}
exports.RoleShowEntry = RoleShowEntry;
class PersonalInfoData {
  constructor() {
    (this.RoleShowList = []),
      (this.CardShowList = []),
      (this.CurCardId = void 0),
      (this.Birthday = 0),
      (this.IsBirthdayDisplay = !1),
      (this.CardDataList = []),
      (this.Signature = ""),
      (this.HeadPhotoId = void 0),
      (this.IsOtherData = !1),
      (this.Level = 0),
      (this.WorldLevel = 0),
      (this.Name = ""),
      (this.PlayerId = 0),
      (this.LastModifyNameTime = 0),
      (this.ModifyName = StringUtils_1.EMPTY_STRING);
  }
  GetUnlockCardDataCount() {
    let s = 0;
    return (
      this.CardDataList.forEach((t) => {
        t.IsUnLock && s++;
      }),
      s
    );
  }
}
exports.PersonalInfoData = PersonalInfoData;
//# sourceMappingURL=PersonalDefine.js.map
