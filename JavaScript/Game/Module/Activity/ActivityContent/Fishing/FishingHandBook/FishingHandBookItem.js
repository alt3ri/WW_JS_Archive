"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../FishingDefine");
class FishingHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickToggleCallBack = void 0),
      (this.ETt = 0),
      (this.kqe = () => {
        this.OnClickToggleCallBack?.(
          this.ETt,
          this.GetExtendToggle(0),
          this.GridIndex,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  Refresh(e, i, t) {
    this.ETt = e;
    var n,
      r,
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(
        this.ETt,
      );
    e &&
      ((r = (n =
        !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(
          this.ETt,
        ))
        ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "FishingLockItemName",
          )
        : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "Fishing_ArchiveTitle",
        e.IllustratedNum + "",
        r,
      ),
      this.SetTextureByPath(e.Icon, this.GetTexture(4)),
      this.$A_(!n),
      this.GetExtendToggle(0).SetToggleState(i ? 1 : 0),
      (r = e.Quality),
      (i =
        ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
          r,
        )?.BackgroundSprite),
      this.SetSpriteByPath(i, this.GetSprite(5), !1),
      (e = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord,
        this.ETt,
      )),
      n ? this.GetItem(3).SetUIActive(!1) : this.GetItem(3).SetUIActive(!e));
  }
  Clear() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.FinishGuideStepByEvent,
      "FishingHandBookItem",
    );
  }
  OnSelected(e) {
    this.GetItem(3).SetUIActive(!1),
      e && this.GetExtendToggle(0).SetToggleState(1, !0);
  }
  $A_(e) {
    e
      ? this.GetTexture(4).SetCustomMaterialScalarParameter(
          FishingDefine_1.materialProgressName,
          1,
        )
      : this.GetTexture(4).SetCustomMaterialScalarParameter(
          FishingDefine_1.materialProgressName,
          0,
        );
  }
}
exports.FishingHandBookItem = FishingHandBookItem;
//# sourceMappingURL=FishingHandBookItem.js.map
