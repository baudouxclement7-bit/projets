# Twitch Guardian

Bot de modération Twitch multi-streamers. Il tourne en même temps que Hermes sur ce Mac et ne modère que les chaînes explicitement autorisées.

## MVP inclus

- filtre de mots bloqués et liens ;
- timeout automatique de 5 minutes ;
- liste séparée de règles par streamer ;
- tableau de bord local (`http://127.0.0.1:3400`) ;
- aperçu d'une décision de modération via API ;
- le bot ne rejoint que les chaînes de `AUTHORIZED_CHANNELS`.

## Règle d'accès

Pour ajouter un streamer :

1. Il ajoute **le compte Twitch du bot** comme modérateur depuis son chat : `/mod NOM_DU_BOT`.
2. Tu ajoutes son pseudo à `AUTHORIZED_CHANNELS`.
3. Tu redémarres le bot.

Le bot ne doit jamais être ajouté à une chaîne sans ton accord.

## Démarrage local

```bash
cd /Users/clement/Jarvis/twitch-guardian
cp .env.example .env
npm start
```

Sans identifiants Twitch, le tableau de bord démarre mais le bot de chat reste désactivé.

## Connexion Twitch à faire une fois

1. Crée une application sur <https://dev.twitch.tv/console/apps> et note son Client ID / Client Secret dans `.env`.
2. Connecte le **compte du bot** avec les permissions `chat:read` et `chat:edit`.
3. Mets le JSON de jeton obtenu dans `TWITCH_TOKEN_DATA` et les chaînes dans `AUTHORIZED_CHANNELS`.
4. Vérifie que le compte du bot est modérateur dans chaque chaîne.

`TWITCH_TOKEN_DATA`, le secret Twitch et `.env` ne doivent jamais être partagés ou commités.

## Tests

```bash
npm test
```
