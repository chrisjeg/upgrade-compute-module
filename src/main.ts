import * as core from "@actions/core";
import axios from "axios";
import { ComputeModuleDefinition } from "./types";

const getDeployedAppApi = (foundryUrl: string, deployedAppRid: string) =>
  `https://${foundryUrl}/contour-backend-multiplexer/api/deployed-apps/${deployedAppRid}`;

async function upgradeComputeModule() {
  try {
    const foundryUrl = core.getInput("foundry-url", {
      required: true,
    });
    const computeModuleRid = core.getInput("compute-module-rid", {
      required: true,
    });
    const containerName = core.getInput("container-name", {
      required: true,
    });
    const containerTag = core.getInput("container-tag", {
      required: true,
    });
    const accessToken =
      core.getInput("access-token") ?? process.env.FOUNDRY_ACCESS_TOKEN;

    const deployedAppApi = getDeployedAppApi(foundryUrl, computeModuleRid);

    core.info(
      `🔍 Getting existing compute module configuration for ${computeModuleRid}`
    );
    const currentModuleResponse = await axios.get<ComputeModuleDefinition>(
      deployedAppApi,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const currentModule = currentModuleResponse.data;
    const container =
      currentModule.computationParameters.computationParamsV1.foundryContainerizedApplication.containers.find(
        (module) => module.name === containerName
      );
    if (container == null) {
      core.setFailed(
        `❌ Container ${containerName} not found in the existing compute module configuration`
      );
      return;
    }
    core.info(
      `🔍 Found existing container ${containerName} at version ${container.image.tagOrDigest.tag}`
    );

    core.info(
      `🔁 Upgrading container ${containerName} to version ${containerTag}`
    );
    container.image.tagOrDigest.tag = containerTag;
    await axios.post(deployedAppApi, currentModule, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    core.info(
      `✅ Container ${containerName} upgraded to version ${containerTag}`
    );
  } catch (error) {
    core.setFailed(`🔒 Failed to get token: ${error.message}`);
  }
}

upgradeComputeModule();
