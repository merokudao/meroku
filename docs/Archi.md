# Architecture

![Architecture](./Screenshot%202022-11-24%20at%2011.51.58%20AM.png)

# dApp Registry

Public, verifiable, trusted registry of dApps.
Schema for dApp specification
Now:: Github hosted, Managed by community using PRs. Eventually: On Chain DAO

# Packaging Engine

- Takes a dApp and attempts to convert it into compatible dApp
- Takes a compatible dApp and creates its package for dApp Store.
- Specification of packaged format.
- Github/WebHook Integration for source updates
- Made available as Cloud SaaS and OSS CLI
- Supported dApp packaging frameworks
  - JS ex ReactJs, NextJs etc
  - Mobile frameworks ex: React Native, Kotlin etc
  - PWAs
  - APKs

# Build Cache

- Caches the builds created by Packaging Engine
- Available as Cloud SaaS and OSS CLI

# Runtime Engine

- Installs dApp onto the device depending on the dApp source package type
- APK apps are installed natively on the phone (Android only)
- PWA apps are “installed” on the device (iOS, Android, Mac, Windows)
- Vanilla JS apps can be “Added to Home Screen” for a seemingly native experience. (iOS, Android), and made available inside the main app (Mac, Windows)
- Executes a dApp in it’s sandboxed environment on the device
- Injects “web3 & authenticated login” context in the app
  - Via “in browser” wallets ex Bitpack (iOS, Android, Mac, Windows)
  - Via any other wallet app installed on device (iOS, Android)

# NFT & Digital Assets API

- Privacy First. Zero Knowledge NFT & Digital Assets API.
- Most dApps will need to know “does this address have this NFT in X qty?” and other boolean questions. They usually depend on Alchemy & others for their answers. Since these dApps are now running in a “web3 & auth context pre-injected”, they can get these answers using this “NFT & Digital Assets” API of the dApp store directly.
- Zero Knowledge based proofs for a cryptographically correct and verifiable answer to such questions above.
- API Specification, essentially a Query Language for NFT & Digital Assets

# Purchase & Payments

- Fiat to Crypto on-ramp with selected providers in selected geographies
- Primary Protocol commission on every sale (5-10%). Goes to the protocol. (How will this be implemented??)
- Secondary Protocol commission on every sale (configurable). Goes to the implementer of the protocol.

# Gamification

- Common APIs to display and compare activity milestones across dApps. Think like PlayStation shows your in-game medals in your profile & compares it with your friends.

# Ad network

- Privacy First, Zero Knowledge Ad network
- Built on top of “Zero Knowledge Advertisement” paper
- Possible Partnership with Profila?

# Recommendations

- Standard ML Model to recommend interesting dApps
- Eventual Path to decentralization: A moonshot

# Analytics

- MPC based Analytics

# Parental Control & Governance
- Standard parental controls, as seen in Apple App Store or Google Play Store
- Governance Engine for fine tune access control to dApps depending on local laws


# Notes

- Where does it gets the “web3 context” from?
- Account linking via wallet



# Collaterals:

- Dev Education on making compatible dApps
- Community around moderation
