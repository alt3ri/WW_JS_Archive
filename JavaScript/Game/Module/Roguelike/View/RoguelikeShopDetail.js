"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeShopDetail = exports.RoguelikeShopAttrItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  AsyncTask_1 = require("../../../World/Task/AsyncTask"),
  TaskSystem_1 = require("../../../World/Task/TaskSystem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeController_1 = require("../RoguelikeController"),
  CommonSelectItem_1 = require("./CommonSelectItem");
class RoguelikeShopAttrItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
    ];
  }
  Update(e) {
    var i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueAffixConfig(
      e.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.AffixDesc),
      this.GetItem(1).SetUIActive(e.IsUnlock);
  }
}
exports.RoguelikeShopAttrItem = RoguelikeShopAttrItem;
class RoguelikeShopDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Lho = []),
      (this.E_i = void 0),
      (this.Wso = () => {
        return new CommonSelectItem_1.CommonElementItem();
      }),
      (this.nho = () => {
        RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
          6,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UITexture],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[7, this.nho]]);
  }
  OnStart() {
    this.E_i = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(11),
      this.Wso,
    );
  }
  Refresh(s) {
    var e = new AsyncTask_1.AsyncTask(
      "RoguelikeShopDetail.Refresh",
      async () => {
        if (s.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.qDs) {
          var e =
              ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(
                s.ConfigId,
              ),
            i =
              (LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(0),
                e.PokemonName,
              ),
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(
                e.PhantomItem,
              ));
          if (!i) return !0;
          var t =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
              i.SkillId,
            );
          if (!t) return !0;
          i =
            ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomSkillDescExByPhantomSkillIdAndQuality(
              i.SkillId,
              e.Quality,
            );
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            t.DescriptionEx,
            ...i,
          ),
            this.GetItem(4).SetUIActive(!0);
          const r = [];
          s.AffixEntryList.forEach((e, i) => {
            this.Lho[i] ||
              ((this.Lho[i] = new RoguelikeShopAttrItem()),
              r.push(
                this.Lho[i].CreateThenShowByActorAsync(
                  LguiUtil_1.LguiUtil.CopyItem(
                    this.GetItem(5),
                    this.GetItem(4),
                  ).GetOwner(),
                ),
              ));
          }),
            await Promise.all(r),
            s.AffixEntryList.forEach((e, i) => {
              this.Lho[i].Update(e);
            });
        } else {
          e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
            s.ConfigId,
          );
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.BuffName),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(3),
              e.BuffDesc,
              ...e.BuffDescParam,
            ),
            this.GetItem(4).SetUIActive(!1);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "RoguelikeShopItemType" + s.RoguelikeGainDataType.toString(),
        );
        var t = s.IsDiscounted() ? s.CurrentPrice : s.OriginalPrice,
          i =
            ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(
              s.ShopItemCoinId,
            ),
          e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(
            s.ShopItemCoinId,
          ),
          e =
            (s.IsDiscounted()
              ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(10),
                  "RogueShopOriginPriceDiscount",
                  s.OriginalPrice.toString(),
                )
              : this.GetText(10).SetText(""),
            this.GetText(9).SetText(t.toString()),
            (this.GetText(9).useChangeColor = e < t),
            this.SetTextureByPath(i?.IconSmall ?? "", this.GetTexture(8)),
            this.GetItem(6).SetUIActive(!s.IsSell),
            this.GetButton(7).RootUIComp.SetUIActive(!s.IsSell),
            s.GetSortElementInfoArrayByCount());
        return (
          0 < e.length &&
            ((t = e[0]),
            (i = new Array(t.Count).fill(t.ElementId)),
            await this.E_i?.RefreshByDataAsync(i)),
          !0
        );
      },
    );
    TaskSystem_1.TaskSystem.AddTask(e), TaskSystem_1.TaskSystem.Run();
  }
}
exports.RoguelikeShopDetail = RoguelikeShopDetail;
//# sourceMappingURL=RoguelikeShopDetail.js.map
