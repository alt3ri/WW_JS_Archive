"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecommendQualityModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiManager_1 = require("../../Ui/UiManager");
class RecommendQualityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.QualityRangeMap = void 0),
      (this.nml = void 0),
      (this.sml = 0),
      (this.aml = !1),
      (this.IsNeedApply = !1),
      (this.NeedApplyQuality = 2);
  }
  OnInit() {
    var e;
    return CloudGameManager_1.CloudGameManager.IsCloudGame
      ? ((this.aml = !0),
        void 0 !==
          (e =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv()) &&
          (this.SaveApply(e), !0))
      : Platform_1.Platform.IsPs5Platform()
        ? (this.aml = !0)
        : ((this.aml = LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey
              .IsFinishRecommendQuality,
            !1,
          )),
          this.aml || (this.InitQualityRangeMap(), this.InitQualityList()),
          !0);
  }
  OnClear() {
    return !0;
  }
  InitQualityRangeMap() {
    this.QualityRangeMap = new Map([
      [0, [0, 1, 2]],
      [1, [1, 2, 3]],
      [2, [2, 3]],
      [3, [3]],
    ]);
  }
  InitQualityList() {
    var e =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetQualityRange(),
      e = this.QualityRangeMap?.get(e);
    if (e) {
      this.nml = [];
      const r =
          GameSettingsManager_1.GameSettingsManager.ValidApplyConfigMap.get(
            GameSettingsDefine_1.EFunction.IMAGEQUALITY,
          ),
        n = r?.OptionsName ?? [],
        o =
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv();
      e.forEach((e, t) => {
        var a = "T_LoginSetQuality" + (e + 1),
          a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a),
          i = r?.OptionsValue.indexOf(e) ?? 0,
          i = { Quality: e, Name: n[i] ?? n[0], IsRecommend: o === e, Bg: a };
        this.nml.push(i), i.IsRecommend && (this.sml = t);
      });
    }
  }
  GetQualityList() {
    return this.nml ?? [];
  }
  GetRecommendQualityIndex() {
    return this.sml;
  }
  SaveApply(e) {
    (this.IsNeedApply = !0), (this.NeedApplyQuality = e);
  }
  FinishRecommendQualityShow() {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.IsFinishRecommendQuality,
      !0,
    );
  }
  CheckOpenRecommendQuality() {
    this.aml
      ? UiManager_1.UiManager.CloseView("CreateCharacterView")
      : UiManager_1.UiManager.OpenView("RecommendQualityView");
  }
}
exports.RecommendQualityModel = RecommendQualityModel;
//# sourceMappingURL=RecommendQualityModel.js.map
