"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotHandBookChildItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
class PlotHandBookChildItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = void 0) {
    super(),
      (this.kZt = void 0),
      (this.Lei = 0),
      (this.ati = (e) => {
        const t = this.kZt.Config;
        if (this.kZt.IsLock)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "CurPlotHandBookLock",
          ),
            this.GetTog()?.SetToggleStateForce(0, !1, !0);
        else {
          this.kZt.IsNew &&
            HandBookController_1.HandBookController.SendIllustratedReadRequest(
              7,
              t.Id,
            );
          var i = t.Type,
            o = ConfigCommon_1.ConfigCommon.ToList(
              ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(
                i,
              ),
            ),
            r =
              (o.sort(this.aei),
              ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfig(
                i,
              )),
            n = o.length,
            s = [],
            a = [],
            l = [],
            h = [],
            g = [],
            _ = [];
          for (let e = 0; e < n; e++) {
            const t = o[e];
            var u,
              d = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
                7,
                t.Id,
              );
            d &&
              ((u =
                ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender()),
              s.push(1 === u ? t.MaleTexture : t.FemaleTexture),
              g.push(d.CreateTime),
              a.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  t.Descrtption,
                ),
              ),
              l.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name),
              ),
              h.push(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  r.TypeDescription,
                ),
              ),
              _.push(t.Id));
          }
          i = new HandBookDefine_1.HandBookPhotoData();
          (i.DescrtptionText = a),
            (i.TypeText = h),
            (i.NameText = l),
            (i.HandBookType = 7),
            (i.Index = this.Lei),
            (i.TextureList = s),
            (i.DateText = g),
            (i.ConfigId = _),
            UiManager_1.UiManager.OpenView("HandBookPhotoView", i);
        }
      }),
      (this.OnHandBookRead = (e, t) => {
        7 === e &&
          t === this.kZt?.Config?.Id &&
          this.GetItem(2)?.SetUIActive(!1);
      }),
      (this.aei = (e, t) => e.Id - t.Id),
      e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[4, this.ati]]),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnHandBookRead,
        this.OnHandBookRead,
      );
  }
  Refresh(e, t, i) {
    (this.kZt = e), (this.Lei = i);
    var i = this.kZt.Config,
      o = e.IsNew,
      e = e.IsLock,
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    this.SetTextureByPath(
      1 === r ? i.MaleTexture : i.FemaleTexture,
      this.GetTexture(0),
    ),
      this.GetText(1).ShowTextNew(i.Name),
      this.GetItem(2).SetUIActive(o),
      this.GetItem(3).SetUIActive(e),
      this.GetTexture(0).SetUIActive(!e),
      this.GetTog()?.SetEnable(!e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnHandBookRead,
      this.OnHandBookRead,
    ),
      (this.kZt = void 0),
      (this.Lei = 0);
  }
  GetTog() {
    return this.GetExtendToggle(4);
  }
  GetData() {
    return this.kZt;
  }
  GetIsUnlock() {
    return !!this.kZt && !this.kZt.IsLock;
  }
}
exports.PlotHandBookChildItem = PlotHandBookChildItem;
//# sourceMappingURL=PlotHandBookChildItem.js.map
