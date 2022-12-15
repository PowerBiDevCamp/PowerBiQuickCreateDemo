import { Configuration, PopupRequest } from "@azure/msal-browser";

const TenantId = "11111111-1111-1111-1111-111111111111";
const ClientId = "22222222-2222-2222-2222-222222222222";

export const msalConfig: Configuration = {
    auth: {
        clientId: ClientId,
        authority: "https://login.microsoftonline.com/" + TenantId,
        redirectUri: "/",
        postLogoutRedirectUri: "/",          
    }
};

export const PowerBiPermissionScopes: string[] = [
    "https://analysis.windows.net/powerbi/api/Dataset.ReadWrite.All",
    "https://analysis.windows.net/powerbi/api/Report.ReadWrite.All",
    "https://analysis.windows.net/powerbi/api/Report.Read.All",
    "https://analysis.windows.net/powerbi/api/Workspace.ReadWrite.All",
    "https://analysis.windows.net/powerbi/api/Workspace.Read.All",
    "https://analysis.windows.net/powerbi/api/Content.Create"
  ];

export const PowerBiLoginRequest: PopupRequest = {
    scopes: PowerBiPermissionScopes
};