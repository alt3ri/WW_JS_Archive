"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridTakeView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MapRoguePopupBase_1 = require("./Components/MapRoguePopupBase");
class MapRogueGridTakeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpIncId = 0),
      (this.BgItem = void 0),
      (this.RewardLayout = void 0),
      (this.d2t = () => {
        return new RewardItem();
      }),
      (this.XTt = () => {
        ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(
          this.OpIncId,
          (e) => {
            e && this.CloseMe();
          },
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIVerticalLayout],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.BgItem = new MapRoguePopupBase_1.MapRoguePopupBase()),
      await this.BgItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.BgItem.OnMaskClick = this.XTt),
      this.BgItem.SetMaskButtonVisible(!0);
  }
  OnStart() {
    this.RewardLayout = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(4),
      this.d2t,
    );
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    if (e) {
      this.OpIncId = e;
      e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(e);
      if (e) {
        e = e.Data.nac?.mac;
        if (e) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(2),
            "RogueRes_Block_Level",
            e.fr1,
          ),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              "RogueRes_Block_Level",
              e.gr1,
            );
          var i = [];
          for (const s of e.Cr1) {
            var t,
              r =
                ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectById(
                  s,
                );
            r &&
              (t =
                ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEffectTagById(
                  r.Tag,
                )) &&
              ((r = t.IsRatio
                ? r.DescIntParam + "%"
                : r.DescIntParam.toString()),
              (t = { TitleId: t.Text, Value: r }),
              i.push(t));
          }
          this.RewardLayout?.RefreshByData(i);
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) return this.BgItem?.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.MapRogueGridTakeView = MapRogueGridTakeView;
class RewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e, i, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TitleId),
      this.GetText(2).SetText(e.Value);
  }
}
//# sourceMappingURL=MapRogueGridTakeView.js.map
