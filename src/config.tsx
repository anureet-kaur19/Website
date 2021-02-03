import { object, string, boolean, array, InferType } from "yup";
//@ts-ignore
export const networks: NetworkType[] = [
  //@ts-ignore
  {
    id: "mainnet",
    chainId: "1",
    name: "Mainnet",
    adapter: "api",
    apiUrl: "https://internal-api.elrond.com",
    theme: "light",
    erdLabel: "EGLD",
    walletAddress: "https://wallet.elrond.com/",
    explorerAddress: "https://explorer.elrond.com/",
    auctionContract:
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l",
    stakingContract:
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7",
    delegationContract:
      "erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt",
    hookWhitelist: [
      "erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt"
    ],
    accessToken: true
  },
  //@ts-ignore
  {
    default: true,
    id: "testnet",
    name: "Testnet",
    chainId: "T",
    adapter: "api",
    apiUrl: "https://testnet-api.elrond.com",
    theme: "testnet",
    erdLabel: "xEGLD",
    walletAddress: "https://testnet-wallet.elrond.com/",
    explorerAddress: "https://testnet-explorer.elrond.com/",
    auctionContract:
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst77y4l",
    stakingContract:
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqllls0lczs7",
    delegationContract:
      "erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx",
    esdtContract:
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u"
  }
];

export const elrondApps = [
  {
    id: "main-site",
    name: "Main site",
    to: "https://elrond.com/"
  },
  {
    id: "wallet",
    name: "Wallet",
    to: "" // fetched from config
  },
  {
    id: "explorer",
    name: "Explorer",
    to: "" // fetched from config
  },
  {
    id: "bridge",
    name: "Bridge",
    to: "https://bridge.elrond.com/"
  },
  {
    id: "docs",
    name: "Docs",
    to: "https://docs.elrond.com/"
  }
];

export const transactionSize: number = 20;
export const metaChainShardId: number = 4294967295;
export const decimals: number = 3;
export const denomination: number = 18;
export const gasLimit: string = "50000";
export const tokenGasLimit: string = "500000";
export const maxGasLimit: string = "750000000";
export const gasPrice: string = "1000000000";
export const gasPerDataByte: number = 1500;
export const numInitCharactersForScAddress: number = 13;
export const refreshRate: number = 6000;
export const version: number = 1;
export const timeout: number = 10 * 1000;
export const buyUrl = "https://buy.elrond.com";
// export const buyUrl =
//   'https://buy.moonpay.io/?apiKey=pk_live_wEDFuQkYokTiDDwgMZ6HWxclImBpoul5&currencyCode=EGLD&colorCode=%231B46C2&showAllCurrencies=false';
export const rampBuyUrl = "https://ri-widget-staging.firebaseapp.com/";
export const rampApiKey = "p3fnpbh8qqb2bghsddvxc4af2dno2yqsaoggkupf";
export const delegationBlogPostUrl =
  "https://elrond.com/blog/more-elrond-staking-is-coming/";

export const delegationContractData = {
  claim: {
    gasLimit: "250000000",
    data: "claimRewards"
  },
  delegate: {
    gasLimit: "250000000",
    data: "stake"
  },
  initializeWithdrawal: {
    gasLimit: "250000000",
    data: "unStake@" // unStake@hex.encode(valueToBeUnStaked),
  },
  unBond: {
    gasLimit: "250000000",
    data: "unBond"
  }
};

export const stakingContractData = {
  claim: {
    gasLimit: "6000000",
    data: "claim"
  },
  changeRewardAddress: {
    gasLimit: "6000000",
    data: "changeRewardAddress@" // changeRewardAddress@hex.Encode(bech32Decode(address_starting_with_erd))
  }
};

const networkBaseSchema = object({
  default: boolean(),
  id: string()
    .defined()
    .required(),
  chainId: string()
    .defined()
    .required(),
  erdLabel: string()
    .defined()
    .required(),
  name: string()
    .defined()
    .required(),
  faucet: boolean(),
  theme: string(),
  delegationContract: string(),
  esdtContract: string(),
  auctionContract: string(),
  stakingContract: string(),
  walletAddress: string(),
  explorerAddress: string(),
  hookWhitelist: array().of(string()),
  accessToken: boolean()
}).required();

export const adapterSchema = object({
  adapter: string()
    .defined()
    .oneOf(["api", "elastic"])
    .required(),
  apiUrl: string().when("adapter", {
    is: "api",
    then: string().required()
  }),
  elasticUrl: string().when("adapter", {
    is: "elastic",
    then: string().required()
  }),
  proxyUrl: string().when("adapter", {
    is: "elastic",
    then: string().required()
  })
}).required();

const schema = networkBaseSchema.concat(adapterSchema);

export type NetworkType = InferType<typeof schema>;

networks.forEach(network => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
