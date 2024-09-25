import { app as o, BrowserWindow as i, shell as d } from "electron";
import { fileURLToPath as f } from "node:url";
import n from "node:path";
const a = n.dirname(f(import.meta.url)), r = "kosmik-instant";
process.env.APP_ROOT = n.join(a, "..");
const s = process.env.VITE_DEV_SERVER_URL, P = n.join(process.env.APP_ROOT, "dist-electron"), l = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? n.join(process.env.APP_ROOT, "public") : l;
let e;
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    const t = process.argv[1];
    t && o.setAsDefaultProtocolClient(r, process.execPath, [
      n.resolve(t)
    ]);
  }
} else
  o.setAsDefaultProtocolClient(r);
function c() {
  e = new i({
    icon: n.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: n.join(a, "preload.mjs"),
      scrollBounce: !0,
      partition: "persist:electron",
      nodeIntegrationInSubFrames: !0,
      contextIsolation: !0,
      webviewTag: !0,
      defaultEncoding: "utf-8",
      nodeIntegration: !1,
      navigateOnDragDrop: !0,
      safeDialogs: !0,
      devTools: !0
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), s ? e.loadURL(s) : e.loadFile(n.join(l, "index.html")), e.webContents.setWindowOpenHandler(({ url: t }) => (t.startsWith("https:") && d.openExternal(t), { action: "deny" }));
}
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("open-url", (t, p) => {
  e == null || e.webContents.send("auth-code", p);
});
o.on("activate", () => {
  i.getAllWindows().length === 0 && c();
});
const u = o.requestSingleInstanceLock();
u ? (o.on("second-instance", () => {
  e && (e.isMinimized() && e.restore(), e.focus());
}), o.whenReady().then(() => {
  c();
})) : o.quit();
export {
  P as MAIN_DIST,
  l as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
