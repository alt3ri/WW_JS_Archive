"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditTeamData = void 0);
const MultiTextLang_1 = require("../../../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../../../Core/Utils/StringUtils"),
  LevelGeneralCommons_1 = require("../../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  BusinessDefine_1 = require("../BusinessDefine"),
  CharacterData_1 = require("./CharacterData");
class EditTeamData {
  constructor(e, t, a) {
    (this.Id = e),
      (this.Type = t),
      (this.UnLockCondition = a),
      (this.CharacterDataList = []),
      (this.jGi = 1),
      (this.IsOwn = !1);
    for (let e = 1; e <= BusinessDefine_1.CHARACTER_MAX; e++)
      this.CharacterDataList.push(new CharacterData_1.CharacterData(e));
  }
  get Level() {
    return this.jGi;
  }
  get Name() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel,
      t = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.Id,
      );
    return (1 === t.Type && 1 === e.GetPlayerGender()) ||
      (2 === t.Type && 0 === e.GetPlayerGender())
      ? e.GetAccountName()
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
  }
  GetCharacterDataList() {
    return this.CharacterDataList;
  }
  SetCharacterDataList(e) {
    this.CharacterDataList[0].SetCurrentValue(e.PGs),
      this.CharacterDataList[1].SetCurrentValue(e.UGs),
      this.CharacterDataList[2].SetCurrentValue(e.wGs),
      (this.jGi = e.P6n);
  }
  SetCharacterDataByEditTeamData(e) {
    this.CharacterDataList[0].SetCurrentValue(
      e.CharacterDataList[0].CurrentValue,
    ),
      this.CharacterDataList[1].SetCurrentValue(
        e.CharacterDataList[1].CurrentValue,
      ),
      this.CharacterDataList[2].SetCurrentValue(
        e.CharacterDataList[2].CurrentValue,
      ),
      (this.jGi = e.Level);
  }
  GetAllCharacterValue() {
    let e = 0;
    for (const t of this.CharacterDataList) e += t.CurrentValue;
    return e;
  }
  GetTeamDataUnLockState() {
    if (this.IsOwn) return 2;
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
      this.Id,
    );
    if (1 === e.JumpType) {
      if (
        0 !==
        ModelManager_1.ModelManager.MoonChasingTaskModel.GetMainLineState(
          e.JumpParam,
        )
      )
        return 1;
    } else if (2 === e.JumpType)
      if (
        0 !==
        ModelManager_1.ModelManager.MoonChasingTaskModel.GetBranchLineState(
          e.JumpParam,
        )
      )
        return 1;
    return 0;
  }
  GetUnLockConditionDesc() {
    var e = this.GetTeamDataUnLockState();
    return 2 === e
      ? StringUtils_1.EMPTY_STRING
      : 0 === e &&
          2 ===
            ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
              this.Id,
            ).JumpType
        ? (e =
            ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingIdByRoleId(
              this.Id,
            )) <= 0
          ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "Moonfiesta_InviteCondition2",
            )
          : ((e =
              ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
                e,
              )),
            StringUtils_1.StringUtils.Format(
              MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "Moonfiesta_InviteCondition1",
              ),
              e.GetBuildingName(),
            ))
        : ((e =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              this.UnLockCondition,
            )),
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e));
  }
}
exports.EditTeamData = EditTeamData;
//# sourceMappingURL=EditTeamData.js.map
