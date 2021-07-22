import { Web3InterfaceAdapter } from "./web3";
import { TezosAdapter } from "./tezos";

import type { InterfaceAdapter, InterfaceAdapterOptions } from "./types";

const getNetworkTypeClass = (networkType = "ethereum") => {
  const supportedEvmNetworks = ["ethereum", "fabric-evm", "quorum"];

  if (supportedEvmNetworks.includes(networkType)) return "evm-like";
  return networkType;
};

export const createInterfaceAdapter = (
  options: InterfaceAdapterOptions
): InterfaceAdapter => {
  const { networkType, provider, network_config } = options;

  switch (getNetworkTypeClass(networkType || network_config?.type)) {
    case "evm-like": {
      return new Web3InterfaceAdapter({
        networkType: networkType,
        provider: provider
      });
    }
    case "tezos": {
      return new TezosAdapter({
        network_config
      });
    }
    default:
      throw Error(`Sorry, "${networkType}" is not supported at this time.`);
  }
};
