
![KwickBit logo](https://raw.githubusercontent.com/kwickbit/.github/main/resources/logos/kwickbit-logo-default-positive-16_9.png)
# Kwickbit Frontend Application V0
---
[![CI](https://github.com/kwickbit/kwickbit_frontend_v0/actions/workflows/push_workflow.yml/badge.svg?branch=main&event=push)](https://github.com/kwickbit/kwickbit_frontend_v0/actions/workflows/push_workflow.yml)

This repository contains the frontend application for Kwickbit, built with Next.js and TypeScript. The application is served as static code with no server-side rendering.

<div style="text-align: center">
  <img src="https://raw.githubusercontent.com/kwickbit/.github/main/resources/screenshots/kwickbit_frontend_v0/login_page.png" alt="Login page" width="49%" />
  <img src="https://raw.githubusercontent.com/kwickbit/.github/main/resources/screenshots/kwickbit_frontend_v0/transactions_page.png" alt="Transactions page" width="49%%" />
</div>
<div style="text-align: center">
  <img src="https://raw.githubusercontent.com/kwickbit/.github/main/resources/screenshots/kwickbit_frontend_v0/transaction_detail_to_publish.png" alt="Transaction detail page" width="49%" />
  <img src="https://raw.githubusercontent.com/kwickbit/.github/main/resources/screenshots/kwickbit_frontend_v0/integrations_page.png" alt="Integrations page" width="49%%" />
</div>

## Development Setup

### Prerequisites

- Node.js version 18 and npm version 9.6.7 or above.
- Docker and docker-compose.

### Setup Instructions

1. Clone the repository.
2. Navigate to the project directory.
3. Ensure that you have the correct versions of Node and npm installed:

    ```bash
    node --version
    npm --version
    ```

4. Run `npm install` to install the necessary dependencies.
5. (Optional) Modify the `.env.development` file with appropriate environment variables if needed.
6. (Optional) Create a Docker network if it doesn't exist:

    ```bash
    docker network create kwickbit_network
    ```

7. To start the development server, simply run:

    ```bash
    docker-compose up --build
    ```

Using `docker-compose` will ensure that your application updates automatically as you make changes to the source code. It also facilitates connection with other services, such as the backend, when they are also running with docker-compose.

## Deployment

### Method 1: GitHub UI Deployment

1. Navigate to the "Actions" tab in the repository.
2. Select the deploy workflow from the left sidebar.
3. Above the list of past runs, click the "Run workflow" button.
4. Select a branch and provide the input environment value (default is "dev").
5. This will deploy the built code to an S3 bucket, which is backed by a CloudFront distribution.

### Method 2: AWS CLI Deployment

1. Make sure you have AWS CLI credentials.
2. Create a file named `vault_credentials.yml.enc` inside the `deploy/ansible` directory with the following content:

    ```yaml
    vault_aws_access_key: <secret_access>
    vault_aws_secret_key: <secret_key>
    vault_aws_account_id_dev: <account_id>
    ```

    Replace `<secret_access>` and `<secret_key>` with the appropriate AWS credentials.
3. Install the required dependencies with:
   ```bash
    pip install ansible boto3 botocore
    ansible-galaxy collection install community.aws
    ```
4. Run the following command from the root of the repository:
    ```bash
    ansible-playbook deploy/ansible/playbooks/build_and_deploy_to_s3.yml -i deploy/ansible/inventories/dev/ -e@deploy/ansible/vault_credentials.yml.enc
    ```
> **Note:** It's recommended to run Ansible within a virtual environment. You can use tools like [pyenv](https://github.com/pyenv/pyenv) and [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv). Set up the virtual environment using `pyenv shell ansible3.10`.


## Continuous Integration

GitHub Actions CI is configured for this repository. On every push and merge request, it will run linting checks and unit tests to ensure code quality.


## Secret Variables in GitHub Actions:

When defining secret environment variables in GitHub Actions for AWS, follow the naming convention below:

- `AWS_ACCESS_KEY_ID_<ENV>`
- `AWS_SECRET_ACCESS_KEY_<ENV>`
- `AWS_ACCOUNT_ID_<ENV>`

Where `<ENV>` is the environment name as defined at the Ansible level (`dev`, `staging`, `prod`, etc.).
For example, `AWS_ACCESS_KEY_ID_DEV` is valid, but `AWS_ACCESS_KEY_ID` or `AWS_ACCESS_KEY_ID_DEVELOPMENT` are not.


## Environment Variables in Next.js

When working with Next.js, there are some specific practices to be aware of regarding environment variables:

### Exposing Variables to the Browser

Any environment variables that you want to expose to the browser, including from within the Next.js application itself, should be prefixed with `NEXT_PUBLIC_`.

For instance, to expose the variable `API_URL` to your Next.js application on the browser side, you should rename it to `NEXT_PUBLIC_API_URL` in your `.env` files.

### Usage:

```javascript
console.log(process.env.NEXT_PUBLIC_API_URL);
```

### Environment Variables for Local Development:

- You **should** modify and commit the `.env.development` file as this holds configuration specific to the development environment.

- **DO NOT** modify or commit the local `.env.production` file. This is reserved for local testing of production configurations and should not contain any environment-specific settings.

### Environment Variables for Deployment

For dev, production, staging or any environment deployed on the cloud, you should only modify and commit the `.env.production.<env>` files that are located in `deploy/ansible/inventories/<env>/resources/`

Like `.env.production.dev` or `.env.production.prod`.
These files hold configurations specific to their respective environments.

> ⚠️ **Important:** Always ensure that sensitive data remains confidential and secure. While `.env.development` and `.env.production.<env>` files are intended to be committed to this repository, they should **never** contain any secrets or sensitive information.


### Important:

- Ensure you've correctly set up your `.env.development`, or other `.env` configuration files with the necessary variables.

- Remember to restart your Next.js development server whenever you make changes to your environment variables to ensure they're picked up correctly.

