export interface Device {
    id: number;
    name: string;
    model: string;
    uuid: string;
    os: string;
    ip: string;
    position: string;
    config: string;
    capabilities: string;
    agentInfo: string;
    latestAgentInfo: string;
    plugins: string;
    tags: string;
    status: number;
    importType: number;
    resolution: string;
    isApprove: number;
    secret: string;
    userName: string;
    createTime: number;
    updateTime: number;
    activeTime: number;
    lastHeartBeat: number;
    screenshotUrl: string;
    ucUserId: number;
    angle: number;
    deleted: boolean;
}

export interface DeviceDetail {
    id: number;
    name: string;
    model: string;
    uuid: string;
    os: string;
    ip: string;
    position: string;
    config: string;
    capabilities: string;
    agentInfo: string;
    latestAgentInfo: string;
    plugins: string;
    tags: string;
    status: number;
    importType: number;
    resolution: string;
    isApprove: number;
    secret: string;
    userName: string;
    createTime: number;
    updateTime: number;
    activeTime: number;
    lastHeartBeat: number;
    screenshotUrl: string;
    ucUserId: number;
    angle: number;
    deleted: boolean;
}

export class DevicePage {
    constructor(public count: number, public payload: Device[]) {}
}

export interface ApkInfo {
    apkfile: string;
    versionCode: string;
    versionName: string;
}

export interface DeviceCommand {
    command: string;
    keepState: boolean;
    parameter: any;
    type: string;
    uuid: string;
}
