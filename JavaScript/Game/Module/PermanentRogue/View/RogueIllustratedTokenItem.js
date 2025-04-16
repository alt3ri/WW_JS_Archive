"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueIllustratedTokenItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  RogueResCollectionById_1 = require("../../../../Core/Define/ConfigQuery/RogueResCollectionById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  RogueBattleTokenElement_1 = require("../../RogueBattle/Component/RogueBattleTokenElement"),
  RogueBattleUtils_1 = require("../../RogueBattle/RogueBattleUtils"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine");
class RogueIllustratedTokenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.GainData = void 0),
      (this.OnClickHandle = void 0),
      (this.Mli = void 0),
      (this.gQl = !1),
      (this.RefreshDescText = () => {
        var e;
        this.GainData &&
          (this.gQl
            ? ((e = this.GainData.wac),
              (e =
                ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
                  e.v9n,
                )) &&
                (0 === ModelManager_1.ModelManager.RogueBattleModel.DescMode
                  ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                      this.GetText(4),
                      e.BuffDescSimple,
                    )
                  : LguiUtil_1.LguiUtil.SetLocalTextNew(
                      this.GetText(4),
                      e.BuffDesc,
                      ...e.BuffDescParam,
                    )))
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(4),
                "RogueRes_CollectionEventLock",
              ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [7, UE.UISprite],
    ];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueBattleDescModeChange,
      this.RefreshDescText,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueBattleDescModeChange,
      this.RefreshDescText,
    );
  }
  OnStart() {
    (this.Mli = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      () => new RogueBattleTokenElement_1.RogueBattleTokenElement(),
    )),
      this.GetExtendToggle(5).SetEnable(!1),
      this.GetExtendToggle(5).SetToggleState(2),
      this.GetItem(6).SetUIActive(!1);
  }
  Refresh(t, e, i) {
    var o, r;
    t.wac
      ? ((r = t.wac),
        (o =
          ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
            r.v9n,
          )) &&
          ((this.GainData = t),
          (r = RogueResCollectionById_1.configRogueResCollectionById.GetConfig(
            r.v9n,
          )),
          (r =
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCollectItemState(
              r.IdKey,
            )),
          (this.gQl = r !== Protocol_1.Aki.Protocol.zps.Z6n),
          this.GetText(2).ShowTextNew(
            this.gQl ? o.BuffName : "RogueRes_CollectionEventLock",
          ),
          this.SetTextureByPath(o.BuffIcon, this.GetTexture(1)),
          (r =
            ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetRogueWeeklyQualityConfig(
              o.Quality,
            )) && this.SetTextureByPath(r.TokenBg, this.GetTexture(0)),
          this.GetSprite(7).SetColor(UE.Color.FromHex(r.TokenColor)),
          this.GetItem(8).SetUIActive(6 === o.Quality),
          this.GetItem(9).SetUIActive(5 === o.Quality),
          this.RefreshDescText(),
          (r = new UiAsyncTask_1.UiAsyncTask(
            "RogueBattleTokenItem.Refresh",
            async () => {
              var e =
                RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(
                  t,
                );
              await this.Mli.RefreshByDataAsync(e);
            },
          )),
          this.RunAsyncTask(r)))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RogueBattle",
          34,
          "RogueBattleTokenItem.Refresh data.Proto_RogueResToken is null",
        );
  }
}
exports.RogueIllustratedTokenItem = RogueIllustratedTokenItem;
//# sourceMappingURL=RogueIllustratedTokenItem.js.map
