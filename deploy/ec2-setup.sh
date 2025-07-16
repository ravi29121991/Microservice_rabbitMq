#!/bin/bash

# Exit on error
set -e

echo "🛠️ Updating system..."
sudo yum update -y

echo "🐳 Installing Docker..."
sudo yum install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user

echo "🔧 Installing Docker Compose plugin (latest)..."
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
mkdir -p ~/.docker/cli-plugins/
curl -SL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

echo "✅ Docker Compose version:"
docker compose version
