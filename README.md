# 🆙 Upgrade Compute Module Action

## Overview

This GitHub Action is designed to upgrade the container version of a specific compute module within a Foundry application. It interacts with Foundry's API to fetch the current configuration of a compute module, updates the container version based on the inputs provided, and then applies the update via the Foundry API.

## Prerequisites

Before you use this action, you must have:

- Access to a Foundry application and its API.
- An access token with permissions to query and modify deployed applications in Foundry.

## Inputs

The action requires the following inputs:

- `foundry-url`: The base URL of the Foundry instance. (Required)
- `compute-module-rid`: The resource identifier (RID) of the compute module to be upgraded. (Required)
- `container-name`: The name of the container within the compute module that needs to be upgraded. (Required)
- `container-tag`: The new tag of the container to which the compute module will be upgraded. (Required)
- `access-token`: The access token used for authentication with the Foundry API. This can also be set as an environment variable `FOUNDRY_ACCESS_TOKEN`. (Optional). If you use chrisjeg/auth-to-foundry, you don't need this.

## Environment Variables

- `FOUNDRY_ACCESS_TOKEN`: The access token for Foundry API. This can be used instead of the `access-token` input.

## Usage

To use this action in your workflow, add a step that uses this action and specify the required inputs. Here is an example workflow step:

```yaml
- name: Upgrade Compute Module
  uses: your-org/upgrade-compute-module-action@v1
  with:
    foundry-url: "foundry.example.com"
    compute-module-rid: "rid-of-compute-module"
    container-name: "example-container"
    container-tag: "v2.0.1"
```

## Handling Failures

If the container specified by `container-name` does not exist within the compute module, the action will fail and log an error message indicating that the container was not found.

## Security

Ensure that the access token used by this action has the minimal permissions necessary to perform the upgrade operation. Treat the access token as a sensitive secret and use GitHub Secrets to manage it.

## Contributing

Contributions to this action are welcome. Before contributing, please open an issue to discuss your ideas or coordinate via existing issues.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
