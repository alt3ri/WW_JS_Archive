"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DarkCoastDeliveryData = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  PreloadConfigStatementPart1_1 = require("../../Preload/PreloadConfigStatementPart1"),
  DarkCoastDeliveryLevelData_1 = require("./DarkCoastDeliveryLevelData"),
  MingSuController_1 = require("./MingSuController"),
  MingSuInstance_1 = require("./MingSuInstance");
class DarkCoastDeliveryData extends MingSuInstance_1.MingSuInstance {
  constructor(e) {
    super(e),
      (this.cHa = []),
      this.DragonPoolConfig.DarkCoastDeliveryList.forEach((e, t) => {
        var e =
          ConfigManager_1.ConfigManager.CollectItemConfig.GetDarkCoastDeliveryById(
            e,
          );
        void 0 !== e &&
          ((e = new DarkCoastDeliveryLevelData_1.DarkCoastDeliveryLevelData(
            e,
            this.DragonPoolConfig.Goal[t],
            this.DragonPoolConfig.DropIds[t],
          )),
          this.cHa.push(e));
      });
  }
  SetDragonPoolLevel(t) {
    super.SetDragonPoolLevel(t),
      this.cHa.forEach((e) => {
        e.SetIsUnLockState(t);
      });
  }
  SetLevelGainList(t) {
    this.cHa.forEach((e) => {
      e.SetReceiveRewardState(t >= e.Id);
    });
  }
  RefreshLevelDataState(e, t) {
    for (const i of e) {
      var r = this.GetLevelData(i);
      r && r.SetDefeatedGuardState(!0);
    }
    for (const n of t) {
      var a = this.GetLevelData(n);
      a && a.SetReceivedGuardRewardState(!0);
    }
  }
  GetLevelData(t) {
    return this.cHa.find((e) => e.Id === t);
  }
  GetLevelDataList() {
    return this.cHa;
  }
  GetCurLevelTexturePath() {
    return this.GetLevelTexturePath(this.DragonPoolLevel);
  }
  GetLevelTexturePath(e) {
    e = this.GetLevelData(e);
    return void 0 !== e
      ? e.Config.LevelTexture
      : PreloadConfigStatementPart1_1.configCommonParamById.GetStringConfig(
          "DarkShoreDefaultLevel",
        );
  }
  GetActivityRewardViewData() {
    return { DataPageList: [{ DataList: this.mHa() }] };
  }
  mHa() {
    var e = [],
      t =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "DarkShoreRewardGet",
        ),
      r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "DarkShoreRewardNotAchieved",
      );
    for (const o of this.cHa) {
      var a = o.GetRewardItems(),
        i = o.GetDarkCoastDeliveryRewardState(),
        n = 1 === i ? t : r,
        a = {
          RewardList: a,
          NameText: StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "DarkCoastDelivery_Reward",
            ),
            o.Id.toString(),
          ),
          RewardState: i,
          RewardButtonRedDot: 1 === i,
          RewardButtonText: n,
          ClickFunction: () => {
            MingSuController_1.MingSuController.SendMingSuHandRewardRequest(
              this.DragonPoolId,
            );
          },
        };
      e.push(a);
    }
    return e;
  }
  GetRewardRedDotState() {
    for (const e of this.cHa)
      if (1 === e.GetDarkCoastDeliveryRewardState()) return !0;
    return !1;
  }
}
exports.DarkCoastDeliveryData = DarkCoastDeliveryData;
//# sourceMappingURL=DarkCoastDeliveryData.js.map
