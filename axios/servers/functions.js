
global.generateUUID = () => {
  let uuid = '';
  const possibleChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  for (let i = 0; i < 2; i++) {
    uuid += possibleChars[Math.floor(Math.random() * (25 - 0 + 1) + 0)]; // Limit to only letters
  }

  for (let i = 0; i < 4; i++) {
    uuid += Math.floor(Math.random() * (9 - 0 + 1) + 0); // Use all possible characters
  }
  return uuid;
}

global.GetUserById = (playerId) => {
  const uuid = ids[playerId];
  if (uuid)
    return users[uuid];

  // Le joueur est inconnu pourtant il à l'air d'être présent sur le serveur
  // On l'éjecte pour éviter les problèmes
  // DropPlayer(id, "Désolé, une erreur s'est produite : la synchronisation a échoué.")
}

global.initPlayer = (playerId) => {
  let licence;
  for (let i = 0; i < GetNumPlayerIdentifiers(playerId); i++) {
    const identifier = GetPlayerIdentifier(playerId, i).split(':');
    if (identifier[0] == "license")
      licence = identifier[1];
  }

  let player;
  for (const [key, value] of Object.entries(users)) {
    if (value.licence == licence) {
      player = value;
    }
  }

  if (player) {
    player.id = playerId;
    player.ped = GetPlayerPed(playerId);
    ids[player.id] = player.uuid;
    return;
  }
  DropPlayer(playerId, "Votre synchronisation a échoué")
}

global.rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

global.generatePlateNumber = () => {
  let plateNumber = '';

  // Générer 4 lettres aléatoires
  for (let i = 0; i < 4; i++) {
    plateNumber += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // Ajouter un espace
  plateNumber += ' ';

  // Générer 3 chiffres aléatoires
  for (let i = 0; i < 3; i++) {
    plateNumber += Math.floor(Math.random() * 10);
  }

  return plateNumber;
}
