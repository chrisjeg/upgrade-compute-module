// GPT Generated types
export type ComputeModuleDefinition = {
  runtimeParameters: RuntimeParameters;
  computationParameters: ComputationParameters;
};

type ImageTagOrDigest = {
  type: "tag";
  tag: string;
};

type ImagePullMetadataFoundryArtifacts = {
  artifactsRepoRid: string;
};

type ImagePullMetadata = {
  type: "foundryArtifacts";
  foundryArtifacts: ImagePullMetadataFoundryArtifacts;
};

type Image = {
  name: string;
  tagOrDigest: ImageTagOrDigest;
  imagePullMetadata: ImagePullMetadata;
};

type LogFormatPlaintext = {};

type LogFormat = {
  type: "plaintext";
  plaintext: LogFormatPlaintext;
};

type LogOutputSourceStdout = {
  includeStderr: true;
};

type LogOutputSource = {
  type: "stdout";
  stdout: LogOutputSourceStdout;
};

type TelemetrySpec = {
  logFormat: LogFormat;
  logOutputSource: LogOutputSource;
};

type Container = {
  name: string;
  image: Image;
  additionalConfig: {
    env: any[];
    resources: any[];
    volumeMounts: any[];
  };
  telemetrySpec: TelemetrySpec;
};

type FoundryContainerizedApplication = {
  containers: Container[];
  volumes: any[];
};

type ComputationParamsV1 = {
  foundryDataAccess: boolean;
  foundryContainerizedApplication: FoundryContainerizedApplication;
  runtime: "COMPUTE_MODULE_RUNTIME_V1";
  computeModuleInputs: any[];
};

type ComputationParameters = {
  computationParamsV1: ComputationParamsV1;
  type: "computationParamsV1";
};

type ScalingConfig = {
  minReplicas: number;
  maxReplicas: number;
};

type RuntimeParamsV1 = {
  scalingConfig: ScalingConfig;
  foundryServiceAccess: any[];
  networkPolicies: any[];
};

type RuntimeParameters = {
  runtimeParamsV1: RuntimeParamsV1;
  type: "runtimeParamsV1";
};
