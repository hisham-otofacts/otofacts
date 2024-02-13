#!/bin/sh

# Install brew if it hasn't already been installed.
if ! command -v brew &> /dev/null
then
    echo "Installing brew"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Install pre-requisite apps if not already installed
brew list git || brew install git
brew list volta || (curl https://get.volta.sh | bash)

# Enable the Volta pnpm support if it isn't already enabled (https://docs.volta.sh/advanced/pnpm)
if ! grep -q "^export VOLTA_FEATURE_PNPM=" ~/.zshrc; then
  echo "export VOLTA_FEATURE_PNPM=1" >> ~/.zshrc
  echo "Added VOLTA_FEATURE_PNPM into .zshrc"
fi