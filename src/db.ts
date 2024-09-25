import {init} from "@instantdb/react";

export const INSTANT_APP_ID = "app-id";

export const db = init({ appId: INSTANT_APP_ID, devtool: false })

