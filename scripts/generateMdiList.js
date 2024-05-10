import fetch from 'node-fetch'
import fs from 'fs'

// URL du fichier JSON
const jsonURL = 'https://cdn.jsdelivr.net/npm/@mdi/svg/meta.json'

// Fonction pour récupérer et filtrer les données JSON
const fetchAndFilterJSON = async () => {
  try {
    // Récupérer les données JSON depuis l'URL
    const response = await fetch(jsonURL)
    const jsonData = await response.json()

    // Filtrer les données pour ne garder que les icônes non obsolètes
    const filteredIcons = jsonData.filter(icon => !icon.deprecated)

    const mdiNames = filteredIcons.map(icon => 'mdi-' + icon.name)
    const mdiListJSON = JSON.stringify(mdiNames, null, 2)

    // Écrire le JSON filtré dans un fichier mdiList.json
    fs.writeFileSync('./src/assets/mdiList.json', mdiListJSON)

    console.log('Fichier mdiList.json généré avec succès.')
  } catch (error) {
    console.error('Une erreur est survenue :', error)
  }
}

// Appeler la fonction pour exécuter le script
fetchAndFilterJSON()
