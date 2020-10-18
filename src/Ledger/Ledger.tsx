// @ts-ignore
import TransportU2f from '@ledgerhq/hw-transport-u2f';
// @ts-ignore
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
// @ts-ignore
import AppElrond from '@elrondnetwork/hw-app-elrond';
// @ts-ignore
import platform from 'platform';

export async function getConfiguration(): Promise<boolean> {
    const transport = await getTransport();
    const erdApp = new AppElrond(transport);
    const config = await erdApp.getAppConfiguration();
    return config.contractData === 1;
}

export async function getAccount(): Promise<string> {
    const transport = await getTransport();
    const erdApp = new AppElrond(transport);

    const config = await erdApp.getAppConfiguration();
    const { address } = await erdApp.getAddress(config.accountIndex, config.addressIndex);

    return address;
}

export const isTransportCreationPossible = async () => {
    let webUSBSupported = await TransportWebUSB.isSupported();
    webUSBSupported = webUSBSupported && platform.os.family !== 'Windows' && platform.name !== 'Opera';
    const u2fSupported = await TransportU2f.isSupported();

    return webUSBSupported || u2fSupported;
};

const getTransport = async () => {
    let webUSBSupported = await TransportWebUSB.isSupported();
    webUSBSupported = webUSBSupported && platform.os.family !== 'Windows' && platform.name !== 'Opera';
    if (webUSBSupported) {
        return TransportWebUSB.create();
    }

    return TransportU2f.create();
};
