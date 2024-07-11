"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSelectItem = exports.CommonElementItem = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CommonElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.Vyt = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
    ];
  }
  Refresh(t, e, i) {
    this.Update(t), this.RefreshPanel();
  }
  Update(t) {
    this.Vyt = t;
  }
  RefreshPanel() {
    var t,
      e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(this.Vyt);
    e &&
      ((t = UE.Color.FromHex(e.ElementColor)),
      this.GetSprite(0).SetColor(t),
      this.SetTextureByPath(e.Icon5, this.GetTexture(1)));
  }
}
exports.CommonElementItem = CommonElementItem;
class CommonSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RogueGainEntry = void 0),
      (this.jso = void 0),
      (this.E_i = void 0),
      (this.ClickCallBack = void 0),
      (this.Wso = () => {
        return new CommonElementItem();
      }),
      (this.Kso = (t) => {
        this.ClickCallBack?.(1 === t ? this : void 0);
      });
  }
  SetClickCallBack(t) {
    this.ClickCallBack = t;
  }
  OnStart() {
    this.E_i = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.Wso,
    );
  }
  Refresh(t, e, i) {
    this.Update(t);
  }
  Update(t) {
    t.RoguelikeGainDataType === Protocol_1.Aki.Protocol.u3s.Proto_CommonBuff &&
      ((this.RogueGainEntry = t), this.Fq());
  }
  Fq() {
    var t = this.RogueGainEntry.GetSortElementInfoArrayByCount();
    t.length <= 0 ||
      ((this.jso = t[0]),
      (t = new Array(this.jso.Count).fill(this.jso.ElementId)),
      this.E_i?.RefreshByDataAsync(t).then(() => {
        this.RefreshPanel();
      }));
  }
  SetToggleUnDetermined() {
    this.GetExtendToggle(5).SetToggleState(2);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[5, this.Kso]]);
  }
  IsSelect() {
    return 1 === this.GetExtendToggle(5).GetToggleState();
  }
  RefreshPanel() {
    this.RogueGainEntry && (this.eOt(), this.Qso());
  }
  eOt() {
    this.GetItem(6).SetUIActive(this.RogueGainEntry.IsNew);
    var t,
      e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(
        this.RogueGainEntry.ConfigId,
      );
    e &&
      (this.GetText(2).ShowTextNew(e.BuffName),
      0 === ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel()
        ? this.GetText(4).ShowTextNew(e.BuffDescSimple)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            e.BuffDesc,
            ...e.BuffDescParam,
          ),
      this.SetTextureByPath(e.BuffIcon, this.GetTexture(1)),
      (t =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueQualityConfigByQualityId(
          e.Quality,
        )) && this.SetTextureByPath(t.TokenBg, this.GetTexture(0)),
      this.GetSprite(7).SetColor(UE.Color.FromHex(t.TokenColor)),
      this.GetItem(9).SetUIActive(5 === e.Quality),
      this.GetItem(8).SetUIActive(6 === e.Quality));
  }
  Qso() {
    var t = new Array(this.jso.Count).fill(this.jso.ElementId);
    this.E_i?.RefreshByDataAsync(t);
  }
}
exports.CommonSelectItem = CommonSelectItem;
//# sourceMappingURL=CommonSelectItem.js.map
