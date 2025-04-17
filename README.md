![Papillon Labs](https://raw.githubusercontent.com/raphckrman/PapillonLab/refs/heads/rework-ui/.github/assets/banner.svg?token=GHSAT0AAAAAAC35QUUUWDQLXNC425Q4EVBGZ6TKPPQ)

# Bienvenue sur Papillon Labs !
Papillon Labs est un outil conçu pour t'aider à exporter facilement toutes les données de ton compte PRONOTE. Ces données peuvent ensuite être envoyées afin de contribuer à l'amélioration du projet Papillon.

# Principaux atouts
- **Exportation simplifiée des données d'un compte PRONOTE:**: En un clic, exporte les données de ton compte, incluant le nom et prénom, la photo de classe, l'emploi du temps, les notes et moyennes, les absences et retards, ainsi que d'autres données diverses.
- **Contrôle total:** Tes données restent privées tant que tu ne choisis pas de nous les envoyer. Rien ne transite par nos serveurs, sauf si tu décides de les partager.
- **Participe au développement de Papillon:** C'est grâce aux données que nous pouvons améliorer les fonctionnalités exclusives comme Papillon Magic+, ce qui fait tout le charme de Papillon !

# Comment ça fonctionne ?
1. **Connexion:** Connecte-toi avec la méthode qui te convient le plus. Pour l'instant, Papillon Labs supporte la connexion via les identifiants PRONOTE ou via QRCode.
2. **Exportation:** Exporte tes données depuis le tableau de bord de Papillon Labs.
3. **Partage:** Si tu souhaites aider à améliorer Papillon, tu peux envoyer les données exportées directement. Mais souviens-toi, rien n'est partagé à moins que tu choisisses de l'envoyer.

# Installation
```bash
git clone https://github.com/raphckrman/PapillonLab.git
cd ./PapillonLab
cd cors-anywhere
git submodule update --init --recursive
cd ../
docker compose up
```