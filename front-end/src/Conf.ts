// Address of the mock services (bluetooth)
export const mockServicesAddr: string = "http://localhost:3002";
// How frequent to broadcast the Empemeral ID
export const bluetoothBroadcastPeriodMilliseconds: number = 10000;
// If re-attempt reconnection to Mock bluetooth if connection is lost
// Easier for testing if false; in production set to true
export const bluetoothReconnection: boolean = false;
// Clear browser local storage (Slowvid keys only) at startup
export const clearLocalStorageOnStartup: boolean = true;

export const checkCloseContactFlagPeriodMilliseconds: number = 10000;
//remove when issues #23 and #25 are implemented
export const deviceId: string = "deviceId";