#!/usr/bin/env bash
sudo apt update && sudo apt install curl -y
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.profile 
nvm install v18
npm install -g @vue/cli
nvm --version
npm --version
vue --version