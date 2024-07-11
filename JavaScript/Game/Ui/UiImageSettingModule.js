"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiImageSettingModule = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Log_1 = require("../../Core/Common/Log"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../GlobalData"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  UiConfig_1 = require("./Define/UiConfig"),
  UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiImageSettingModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  SetSpriteByPathSync(e, t, i, o, n = void 0) {
    GlobalData_1.GlobalData.World &&
      t &&
      t.IsValid() &&
      (UiConfig_1.UiConfig.TryGetViewInfo(o)?.LoadAsync
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiImageSetting",
              11,
              "该界面不允许同步加载,Sprite改为异步加载",
              ["ViewName", o],
            ),
          this.SetSpriteByPathAsync(e, t, i, n))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiImageSetting", 11, "同步设置Sprite接口", [
              "ViewName",
              o,
            ]),
          (n = ResourceSystem_1.ResourceSystem.Load(
            e,
            UE.LGUISpriteData_BaseObject,
          )),
          t.SetSprite(n, i)));
  }
  SetSpriteByPathAsync(e, i, o, n = void 0) {
    GlobalData_1.GlobalData.World &&
      i &&
      i.IsValid() &&
      (this.CancelResource(i),
      (e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LGUISpriteData_BaseObject,
        (e, t) => {
          this.DeleteResourceHandle(i),
            i.IsValid() &&
              (e && e.IsValid()
                ? (i.SetSprite(e, o), n?.(!0))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "UiImageSetting",
                      11,
                      "设置Sprite失败，图片加载失败",
                      ["图片路径", t],
                    ),
                  n?.(!1)));
        },
        102,
      )),
      this.SetResourceId(i, e));
  }
  async SetSpriteAsync(e, i, o) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LGUISpriteData_BaseObject,
        (e, t) => {
          n.SetResult(),
            this.DeleteResourceHandle(i),
            i.IsValid() &&
              (e && e.IsValid()
                ? i.SetSprite(e, o)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "UiImageSetting",
                    11,
                    "设置Sprite失败，图片加载失败",
                    ["图片路径", t],
                  ));
        },
        102,
      );
      this.SetResourceId(i, e), await n.Promise;
    }
  }
  async SetSpriteTransitionByPath(e, i, o = 5) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const n = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.LGUISpriteData_BaseObject,
        (e, t) => {
          n.SetResult(),
            this.DeleteResourceHandle(i),
            i.IsValid() &&
              (5 === o ? i.SetAllTransitionSprite(e) : i.SetStateSprite(o, e));
        },
        102,
      );
      this.SetResourceId(i, e), await n.Promise;
    }
  }
  SetItemQualityIconSync(e, t, i, o = "BackgroundSprite", n = void 0) {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdSync(e, t.QualityId, i, o, n);
  }
  SetItemQualityIconAsync(e, t, i = "BackgroundSprite", o = void 0) {
    t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.SetQualityIconByIdAsync(e, t.QualityId, i, o);
  }
  lCr(e, t, i) {
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(t),
      e = e.ComponentTags;
    return 0 === e.Num()
      ? t[i]
      : ((i = e.Get(0).toString()),
        "string" !=
        typeof t[
          (e =
            ConfigManager_1.ConfigManager.ComponentConfig.GetQualityConfigParam(
              i,
            ))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiImageSetting",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", i],
              ),
            "")
          : t[e]);
  }
  SetQualityIconByIdSync(e, t, i, o = "BackgroundSprite", n = void 0) {
    t = this.lCr(e, t, o);
    this.SetSpriteByPathSync(t, e, !1, i, n);
  }
  SetQualityIconByIdAsync(e, t, i = "BackgroundSprite", o = void 0) {
    t = this.lCr(e, t, i);
    this.SetSpriteByPathAsync(t, e, !1, o);
  }
  SetTextureByPathSync(e, t, i, o = void 0) {
    GlobalData_1.GlobalData.World &&
      t &&
      t.IsValid() &&
      (UiConfig_1.UiConfig.TryGetViewInfo(i)?.LoadAsync
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiImageSetting",
              11,
              "该界面不允许同步加载,Texture改为异步加载",
              ["ViewName", i],
            ),
          this.SetTextureByPathAsync(e, t, o))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiImageSetting", 11, "同步设置Texture接口", [
              "ViewName",
              i,
            ]),
          (o = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture)),
          t.SetTexture(o)));
  }
  SetTextureByPathAsync(e, i, o = void 0) {
    GlobalData_1.GlobalData.World &&
      i &&
      i.IsValid() &&
      (this.CancelResource(i),
      (e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.Texture,
        (e, t) => {
          this.DeleteResourceHandle(i),
            i.IsValid() &&
              (e && e.IsValid()
                ? (i.SetTexture(e), o?.(!0))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "UiImageSetting",
                      11,
                      "设置Texture失败，图片加载失败",
                      ["图片路径", t],
                    ),
                  o?.(!1)));
        },
        102,
      )),
      this.SetResourceId(i, e));
  }
  async SetTextureAsync(e, i) {
    if (GlobalData_1.GlobalData.World && i && i.IsValid()) {
      this.CancelResource(i);
      const o = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.Texture,
        (e, t) => {
          o.SetResult(),
            this.DeleteResourceHandle(i),
            i.IsValid() &&
              (e && e.IsValid()
                ? i.SetTexture(e)
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "UiImageSetting",
                    11,
                    "设置Texture失败，图片加载失败",
                    ["图片路径", t],
                  ));
        },
        102,
      );
      this.SetResourceId(i, e), await o.Promise;
    }
  }
  _Cr(e, t) {
    var i,
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t),
      e = e.ComponentTags;
    return 0 === e.Num()
      ? t.Icon
      : ((e = e.Get(0).toString()),
        "string" !=
        typeof t[
          (i =
            ConfigManager_1.ConfigManager.ComponentConfig.GetItemConfigParam(e))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiImageSetting",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", e],
              ),
            "")
          : t[i]);
  }
  SetItemIconSync(e, t, i, o = void 0) {
    t = this._Cr(e, t);
    this.SetTextureByPathSync(t, e, i, o);
  }
  SetItemIconAsync(e, t, i = void 0) {
    t = this._Cr(e, t);
    this.SetTextureByPathAsync(t, e, i);
  }
  async SetItemIconTextureAsync(e, t) {
    t = this._Cr(e, t);
    await this.SetTextureAsync(t, e);
  }
  uCr(e, t, i) {
    var t = t.ComponentTags;
    return 0 === t.Num()
      ? e
      : ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
        (i = t.Get(0).toString()),
        "string" !=
        typeof e[
          (t =
            ConfigManager_1.ConfigManager.ComponentConfig.GetRoleConfigParam(i))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiImageSetting",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", i],
              ),
            "")
          : e[t]);
  }
  SetRoleIconSync(e, t, i, o, n) {
    e = this.uCr(e, t, i);
    this.SetTextureByPathSync(e, t, o, n);
  }
  SetRoleIconAsync(e, t, i, o) {
    e = this.uCr(e, t, i);
    this.SetTextureByPathAsync(e, t, o);
  }
  cCr(e, t, i) {
    var t = t.ComponentTags;
    return 0 === t.Num()
      ? e
      : ((e =
          ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(i)),
        (i = t.Get(0).toString()),
        "string" !=
        typeof e[
          (t =
            ConfigManager_1.ConfigManager.ComponentConfig.GetElementConfigParam(
              i,
            ))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiImageSetting",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", i],
              ),
            "")
          : e[t]);
  }
  SetElementIconSync(e, t, i, o) {
    e = this.cCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetElementIcon(e, t, i) {
    e = this.cCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  mCr(e, t, i) {
    var o,
      t = t.ComponentTags;
    return 0 !== t.Num() && i
      ? ((i =
          ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
            i,
          )),
        (t = t.Get(0).toString()),
        "string" !=
        typeof i[
          (o =
            ConfigManager_1.ConfigManager.ComponentConfig.GetMonsterConfigParam(
              t,
            ))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LguiUtil",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", t],
              ),
            "")
          : i[o])
      : e;
  }
  SetMonsterIconSync(e, t, i, o) {
    e = this.mCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetMonsterIconAsync(e, t, i) {
    e = this.mCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  dCr(e, t, i) {
    var o,
      t = t.ComponentTags;
    return 0 !== t.Num() && i
      ? ((i =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
            i,
          )),
        (t = t.Get(0).toString()),
        "string" !=
        typeof i[
          (o =
            ConfigManager_1.ConfigManager.ComponentConfig.GetDungeonEntranceConfigParam(
              t,
            ))
        ]
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "LguiUtil",
                11,
                "配置的表格字段查询到的资源路径不是字符串类型",
                ["配置的表格字段", t],
              ),
            "")
          : i[o])
      : e;
  }
  SetDungeonEntranceIconSync(e, t, i, o) {
    e = this.dCr(e, t, i);
    this.SetTextureByPathSync(e, t, o);
  }
  SetDungeonEntranceIconAsync(e, t, i) {
    e = this.dCr(e, t, i);
    this.SetTextureByPathAsync(e, t);
  }
  SetNiagaraTextureAsync(e, i, o, n, a) {
    GlobalData_1.GlobalData.World &&
      i &&
      i.IsValid() &&
      (this.CancelResource(i),
      (e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.Texture,
        (e, t) => {
          this.DeleteResourceHandle(i),
            i.IsValid() &&
              (e && e.IsValid()
                ? (i.SetNiagaraEmitterCustomTexture(o, n, e), a?.(!0))
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "UiImageSetting",
                      11,
                      "设置Texture失败，图片加载失败",
                      ["图片路径", t],
                    ),
                  a?.(!1)));
        },
        102,
      )),
      this.SetResourceId(i, e));
  }
  SetNiagaraTextureSync(e, t, i, o, n, a = void 0) {
    GlobalData_1.GlobalData.World &&
      t &&
      t.IsValid() &&
      (UiConfig_1.UiConfig.TryGetViewInfo(n)?.LoadAsync
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiImageSetting",
              11,
              "该界面不允许同步加载,Texture改为异步加载",
              ["ViewName", n],
            ),
          this.SetNiagaraTextureAsync(e, t, i, o, a))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("UiImageSetting", 11, "同步设置Texture接口", [
              "ViewName",
              n,
            ]),
          (a = ResourceSystem_1.ResourceSystem.Load(e, UE.Texture)),
          t.SetNiagaraEmitterCustomTexture(i, o, a)));
  }
}
exports.UiImageSettingModule = UiImageSettingModule;
//# sourceMappingURL=UiImageSettingModule.js.map
