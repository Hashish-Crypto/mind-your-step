# Mind Your Step

A [Cocos Creator](https://www.cocos.com/en/creator) game made with [Typescript](https://www.typescriptlang.org/).

Quick start game from Cocos docs. This game tests the player's reaction ability, and chooses whether to jump one step or
two steps according to traffic conditions.

Play the demo here: [acquati.itch.io/mind-your-step](https://acquati.itch.io/mind-your-step)

## Setup

### Prerequisites for development

Install Cocos Creator [cocos.com/en/creator/download](https://www.cocos.com/en/creator/download)

Install Visual Studio Code: [code.visualstudio.com/download](https://code.visualstudio.com/download)

Install Git Bash: [git-scm.com/download/win](https://git-scm.com/download/win)

Install nvm-windows, choose nvm-setup.zip:
[github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

Open Git Bash as system administrator:

```bash
# Install Node and NPM
nvm install latest
nvm current
nvm use 17.6.0
node -v
npm -v

# Install Yarn
npm install -g yarn
yarn -v
```

### Installing

```bash
git clone https://github.com/Hashish-Crypto/mind-your-step
cd mind-your-step
yarn install

code .
```

Open Cocos Dashboard and add this project.
